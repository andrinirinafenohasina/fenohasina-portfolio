import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// In-Memory simple rate limiter for the email contact API (max 3 contact requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

function contactFormRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  if (!record || (now - record.lastReset > RATE_LIMIT_WINDOW_MS)) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return next();
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: "Trop de requêtes. Veuillez patienter une minute avant d'envoyer un nouveau formulaire.",
      logs: ["ERROR: Rate limit exceeded for IP: " + ip, "SECURITY: Connection throttled."]
    });
  }

  record.count++;
  return next();
}

// Health check API
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Contact endpoint
app.post("/api/contact", contactFormRateLimiter, async (req, res) => {
  const { name, email, subject, message, budget, confirmation, website } = req.body;
  const clientLogs: string[] = [];

  clientLogs.push("SF_EVENT: Received post payload at /api/contact");

  // 1. Honeypot check (website should be empty)
  if (website && website.trim() !== "") {
    clientLogs.push("SECURITY: Honeypot field was filled. Dropping request silently.");
    // Respond with a dummy success to trick standard spambots
    return res.status(200).json({
      success: true,
      message: "Form submitted successfully (silent filter)",
      logs: clientLogs
    });
  }

  // 2. Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: "Le nom est invalide." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "L'adresse e-mail est invalide." });
  }

  if (!subject || subject.trim().length < 3) {
    return res.status(400).json({ success: false, error: "Veuillez saisir un sujet valide (minimum 3 caract\u00E8res)." });
  }

  if (!message || message.trim().length < 15) {
    return res.status(400).json({ success: false, error: "Le message doit contenir au moins 15 caract\u00E8res." });
  }

  clientLogs.push("VALIDATOR: Fields parsed. Name: '" + name + "', Email: '" + email + "'");

  try {
    let transporter: nodemailer.Transporter;
    let isTestAccount = false;
    let etherealUrl = "";

    // 3. Configure mail transporter based on credentials presence
    const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (hasSmtpConfig) {
      clientLogs.push("MAILER: Initializing authenticated SMTP transporter...");
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      clientLogs.push("MAILER: No SMTP credentials in .env. Creating safe temporary Ethereal test account...");
      const testAccount = await nodemailer.createTestAccount();
      isTestAccount = true;
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      clientLogs.push("ETHEREAL: Generated test mailbox " + testAccount.user);
    }

    // 4. Build standard templates
    // Template matching strictly:
    // Nouvelle demande depuis le portfolio
    // Nom : {{name}}
    // Email : {{email}}
    // Sujet : {{subject}}
    // Message :
    // {{message}}
    const adminEmailText = `Nouvelle demande depuis le portfolio

Nom : ${name}
Email : ${email}
Sujet : ${subject}
Budget indicatif : ${budget || "Non spécifié"}

Message :
${message}`;

    const adminMailOptions = {
      from: hasSmtpConfig ? `"${name}" <${process.env.SMTP_SENDER_EMAIL || process.env.SMTP_USER}>` : `"${name}" <${email}>`,
      to: "andrinirinafenohasina@gmail.com",
      replyTo: email,
      subject: `[Portfolio] - ${subject}`,
      text: adminEmailText,
    };

    clientLogs.push("MAILER: Dispatching notification to andrinirinafenohasina@gmail.com...");
    const adminInfo = await transporter.sendMail(adminMailOptions);
    clientLogs.push("MAILER: Notification dispatch successful! MessageID: " + adminInfo.messageId);

    if (isTestAccount) {
      etherealUrl = nodemailer.getTestMessageUrl(adminInfo) || "";
      clientLogs.push("ETHEREAL: Inspect email delivery at: " + etherealUrl);
    }

    // 5. Build confirmation transaction if selected
    if (confirmation) {
      clientLogs.push("MAILER: Active automatic confirmation enabled. Building receipt dispatch...");
      const confirmationMailOptions = {
        from: hasSmtpConfig ? `"Fenohasina Andrinirina" <${process.env.SMTP_SENDER_EMAIL || process.env.SMTP_USER}>` : '"Fenohasina Andrinirina" <andrinirinafenohasina@gmail.com>',
        to: email,
        subject: `Accusé de réception - ${subject}`,
        text: `Bonjour ${name},

J'ai bien reçu votre briefing concernant le projet : "${subject}".

Je l'examine avec attention et je vous recontacterai d'ici les prochaines 24 heures pour planifier notre cadrage technique.

Voici un récapitulatif des détails transmis :
- Budget mentionné : ${budget || "Non spécifié"}
- Votre message de briefing :
"${message}"

Merci pour votre confiance.

Cordialement,
Fenohasina Andrinirina
Ingénieur Backend Freelance Expert
andrinirinafenohasina@gmail.com`,
      };

      const confirmInfo = await transporter.sendMail(confirmationMailOptions);
      clientLogs.push("MAILER: Auto-confirmation dispatched successfully. ID: " + confirmInfo.messageId);
    }

    clientLogs.push("PIPELINE: Submission completed! Status CODE 201");

    return res.status(200).json({
      success: true,
      message: "Votre message a été transmis avec succès !",
      isTestAccount,
      etherealUrl,
      logs: clientLogs
    });

  } catch (error: any) {
    console.error("Backend contact form error:", error);
    clientLogs.push("ERROR: Technical failure in mailing daemon. Details: " + (error.message || "Unknown error"));
    return res.status(500).json({
      success: false,
      error: "Une erreur interne est survenue lors de l'envoi de l'e-mail. Veuillez réessayer ou contacter directement par e-mail.",
      logs: clientLogs
    });
  }
});

// Configure Vite middleware or static serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    clientSideViteMiddleware();
  } else {
    clientSideStaticServeProduction();
  }
}

async function clientSideViteMiddleware() {
  console.log("SERVER: Mounting Vite live-reload middleware...");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

function clientSideStaticServeProduction() {
  console.log("SERVER: Launching server in production mode. Binding static directories...");
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  // SPA Fallback: serve index.html for all other entries
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

initServer().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER: Daemon status ONLINE binding to port ${PORT}`);
  });
}).catch(err => {
  console.error("SERVER: Failed to boot microservices: ", err);
});
