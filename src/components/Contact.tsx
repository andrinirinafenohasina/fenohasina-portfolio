/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, MessageSquare, Send, CheckCircle, AlertCircle, Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: '5k-15k',
    message: '',
    confirmation: false,
    website: '' // Spam honeypot
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [stdout, setStdout] = useState<string[]>([]);
  const [etherealUrl, setEtherealUrl] = useState<string>('');
  const [submissionError, setSubmissionError] = useState<string>('');

  // Validation hook
  useEffect(() => {
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (touched.name && formData.name.trim().length === 0) {
      newErrors.name = 'Merci de renseigner votre nom.';
    } else if (touched.name && formData.name.trim().length < 2) {
      newErrors.name = 'Votre nom doit contenir au moins 2 caractères.';
    }

    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim().length === 0) {
        newErrors.email = 'L\'adresse e-mail est requise.';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
      }
    }

    if (touched.subject) {
      if (formData.subject.trim().length === 0) {
        newErrors.subject = 'Le sujet de discussion est requis.';
      } else if (formData.subject.trim().length < 3) {
        newErrors.subject = 'Le sujet doit faire au moins 3 caractères.';
      }
    }

    if (touched.message && formData.message.trim().length === 0) {
      newErrors.message = 'Merci de préciser les contours de votre besoin.';
    } else if (touched.message && formData.message.trim().length < 15) {
      newErrors.message = 'Veuillez rédiger un message d\'au moins 15 caractères.';
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleBlur = (field: 'name' | 'email' | 'subject' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBudgetSelect = (val: string) => {
    setFormData(prev => ({ ...prev, budget: val }));
  };

  const isFormValid = 
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.subject.trim().length >= 3 &&
    formData.message.trim().length >= 15;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger validations across all fields
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) return;

    setFormState('loading');
    setSubmissionError('');
    setEtherealUrl('');
    setStdout(['INFRA_API: Connecting gateway endpoint /api/contact...']);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Stream delivery logs to visual terminal widget
        const logs = data.logs || [
          'VALIDATOR: Form validates successfully.',
          'MAILER: Deliver message to andrinirinafenohasina@gmail.com.',
          'PIPELINE: Delivery confirmed.'
        ];

        if (data.etherealUrl) {
          setEtherealUrl(data.etherealUrl);
        }

        logs.forEach((logLine: string, index: number) => {
          setTimeout(() => {
            setStdout(prev => [...prev, logLine]);
          }, (index + 1) * 350);
        });

        // Set success state once logs are printed
        setTimeout(() => {
          setFormState('success');
        }, logs.length * 350 + 200);

      } else {
        const errorMsg = data.error || 'Une erreur est survenue lors de l\'envoi.';
        setSubmissionError(errorMsg);

        const errorLogs = data.logs || [
          'ERROR: Server rejected delivery request.',
          `ERROR_DETAILS: ${errorMsg}`
        ];

        errorLogs.forEach((logLine: string, index: number) => {
          setTimeout(() => {
            setStdout(prev => [...prev, logLine]);
          }, (index + 1) * 350);
        });

        setTimeout(() => {
          setFormState('idle');
        }, errorLogs.length * 350 + 500);
      }
    } catch (err: any) {
      console.error(err);
      const offlineMsg = 'Le serveur est injoignable. Veuillez vérifier votre connexion.';
      setSubmissionError(offlineMsg);
      
      const offlineLogs = [
        'NETWORK: Connection lost or gateway timeout.',
        `ERROR: ${err.message || 'Server connection failed'}`,
        'RECOVERY: Attempting offline buffer storage...'
      ];

      offlineLogs.forEach((logLine, index) => {
        setTimeout(() => {
          setStdout(prev => [...prev, logLine]);
        }, (index + 1) * 350);
      });

      setTimeout(() => {
        setFormState('idle');
      }, offlineLogs.length * 350 + 500);
    }
  };

  // Prefilled link parameters for WhatsApp
  const wsTextEncoded = encodeURIComponent(
    `Bonjour Fenohasina, je souhaite vous contacter au sujet d'un besoin Symfony / API Platform en freelance.`
  );

  return (
    <section id="contact" className="relative py-25 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Contact & Briefing
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Cadrons ensemble vos besoins backend
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Une idée de startup, un besoin urgent de renfort technique ou une refonte d'API ? Prenez contact dès maintenant pour planifier un rendez-vous gratuit de 30 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column Contacts & Availability Indicators */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Ambient Availability Card */}
            <div className="p-6 rounded-2xl glass-card border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10">
              <div className="flex items-center space-x-3.5 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Cadrage et disponibilité
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Actuellement disponible pour des missions à temps plein ou partiel (Régie ou Forfait). Délai de réponse aux demandes par e-mail : &lt; 24h.
              </p>
            </div>

            {/* Structured CTA buttons */}
            <div className="flex flex-col space-y-4">
              
              {/* Direct Mail */}
              <a
                href="mailto:andrinirinafenohasina@gmail.com"
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/20 dark:border-white/5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300 transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span>andrinirinafenohasina@gmail.com</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 group-hover:translate-x-0.5 transition-transform">Écrire</span>
              </a>

              {/* LinkedIn Gateway */}
              <a
                href="https://www.linkedin.com/in/andrinirina-fenohasina-bb5a34105/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/20 dark:border-white/5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300 transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-3">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn Profile</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 group-hover:translate-x-0.5 transition-transform">Suivre</span>
              </a>

              {/* WhatsApp direct ping */}
              <a
                href={`https://wa.me/33600000000?text=${wsTextEncoded}`} // Fallback template link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200/20 dark:border-white/5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300 transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp direct</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 group-hover:translate-x-0.5 transition-transform font-bold text-emerald-500">EN DIRECT</span>
              </a>

            </div>

          </div>

          {/* Right Column Contact Form */}
          <div className="lg:col-span-8">
            <div className="relative p-6 sm:p-10 rounded-2xl glass-card border border-zinc-200/60 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              <AnimatePresence mode="wait">
                {formState === 'idle' && (
                  <motion.form
                    key="form-idle"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    
                    {/* Two Input Rows (Name, Email) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name Input Frame */}
                      <div className="relative">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                          Nom complet
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          placeholder="Jean Dupont"
                          className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[#030303]/40 text-zinc-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all ${
                            touched.name && errors.name
                              ? 'border-red-500 focus:ring-red-500'
                              : formData.name.length >= 2
                              ? 'border-indigo-500/50 focus:ring-indigo-500'
                              : 'border-zinc-200 dark:border-white/5 focus:ring-indigo-500 focus:border-indigo-500/50'
                          }`}
                        />
                        {touched.name && errors.name && (
                          <div className="absolute right-3 top-[39px] flex items-center text-red-500" title={errors.name}>
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                        {touched.name && errors.name && (
                          <span className="block text-[10px] text-red-500 mt-1.5 font-sans font-medium">{errors.name}</span>
                        )}
                      </div>

                      {/* Email Input Frame */}
                      <div className="relative">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                          Adresse E-mail pro
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('email')}
                          placeholder="jean@entreprise.com"
                          className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[#030303]/40 text-zinc-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all ${
                            touched.email && errors.email
                              ? 'border-red-500 focus:ring-red-500'
                              : touched.email && !errors.email
                              ? 'border-indigo-500/50 focus:ring-indigo-500'
                              : 'border-zinc-200 dark:border-white/5 focus:ring-indigo-500 focus:border-indigo-500/50'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <div className="absolute right-3 top-[39px] flex items-center text-red-500" title={errors.email}>
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                        {touched.email && errors.email && (
                          <span className="block text-[10px] text-red-500 mt-1.5 font-sans font-medium">{errors.email}</span>
                        )}
                      </div>

                    </div>

                    {/* Honeypot Spam Protection (sr-only, absolute, hidden from human eye) */}
                    <div className="sr-only absolute opacity-0 pointer-events-none -z-50 overflow-hidden h-0 w-0">
                      <label className="block text-xs font-mono font-bold text-zinc-400">Website URL (leave empty)</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        autoComplete="off"
                        tabIndex={-1}
                        placeholder="http://example.com"
                      />
                    </div>

                    {/* Subject Input Frame (Sujet) */}
                    <div className="relative">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                        Sujet de discussion
                      </label>
                      <input
                        id="subject-input"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('subject')}
                        placeholder="Ex: Demande de renfort technique Symfony"
                        className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[#030303]/40 text-zinc-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all ${
                          touched.subject && errors.subject
                            ? 'border-red-500 focus:ring-red-500'
                            : formData.subject.length >= 3
                            ? 'border-indigo-500/50 focus:ring-indigo-500'
                            : 'border-zinc-200 dark:border-white/5 focus:ring-indigo-500 focus:border-indigo-500/50'
                        }`}
                      />
                      {touched.subject && errors.subject && (
                        <div className="absolute right-3 top-[39px] flex items-center text-red-500" title={errors.subject}>
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                      {touched.subject && errors.subject && (
                        <span className="block text-[10px] text-red-500 mt-1.5 font-sans font-medium">{errors.subject}</span>
                      )}
                    </div>

                    {/* Budget selectors layout */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                        Enveloppe budgétaire indicative du projet
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'lt-5k', val: '< 5K€', desc: 'Prestation courte' },
                          { id: '5k-15k', val: '5k - 15k€', desc: 'SaaS / MVP Core' },
                          { id: '15k-30k', val: '15k - 30k€', desc: 'Architecture complète' },
                          { id: 'gt-30k', val: '30k€ +', desc: 'Accompagnement annuel' }
                        ].map((budgetOption) => {
                          const isSelected = formData.budget === budgetOption.id;
                          return (
                            <button
                              id={`budget-${budgetOption.id}`}
                              key={budgetOption.id}
                              type="button"
                              onClick={() => handleBudgetSelect(budgetOption.id)}
                              className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-white dark:border-white dark:text-zinc-950 shadow-md shadow-indigo-500/10'
                                  : 'border-zinc-200 dark:border-white/5 bg-white/20 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                              }`}
                            >
                              <span className="text-xs font-semibold block">{budgetOption.val}</span>
                              <span className={`text-[9px] block mt-1 leading-tight ${isSelected ? 'text-zinc-200 dark:text-zinc-500' : 'text-zinc-400'}`}>
                                {budgetOption.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="relative">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                        Décrivez brièvement vos attentes techniques
                      </label>
                      <textarea
                        id="message-textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('message')}
                        rows={4}
                        placeholder="Quels sont les socles à construire, la stack attendue et les contraintes de livraison ?"
                        className={`w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[#030303]/40 text-zinc-800 dark:text-white text-sm focus:outline-none focus:ring-1 transition-all ${
                          touched.message && errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : formData.message.length >= 15
                            ? 'border-indigo-500/50 focus:ring-indigo-500'
                            : 'border-zinc-200 dark:border-white/5 focus:ring-indigo-500 focus:border-indigo-500/50'
                        }`}
                      />
                      {touched.message && errors.message && (
                        <span className="block text-[10px] text-red-500 mt-1 font-sans font-medium">{errors.message}</span>
                      )}
                    </div>

                    {/* Auto-confirmation Checkbox Option */}
                    <div className="flex items-start space-x-3 bg-zinc-50/50 dark:bg-zinc-950/20 p-3.5 rounded-xl border border-zinc-200/50 dark:border-white/5">
                      <input
                        id="confirmation-checkbox"
                        type="checkbox"
                        name="confirmation"
                        checked={formData.confirmation}
                        onChange={handleInputChange}
                        className="mt-0.5 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-700 rounded dark:bg-[#030303]/60 cursor-pointer"
                      />
                      <label htmlFor="confirmation-checkbox" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 select-none cursor-pointer leading-tight">
                        Recevoir une copie de ce briefing et un accusé de réception automatique par e-mail
                      </label>
                    </div>

                    {/* Server Error Alert Banner */}
                    {submissionError && (
                      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start space-x-3 text-red-500">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-semibold">Échec de transmission</span>
                          <span className="block text-[11px] font-medium opacity-90 mt-0.5 leading-relaxed">{submissionError}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Section CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
                      <span className="text-[10px] font-mono text-zinc-400 leading-tight font-medium">
                        🔒 Formulaire chiffré en continu SSL. <br />Vos données de briefing restent confidentielles.
                      </span>
                      
                      <button
                        id="submit-form-button"
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide text-white transition-all ${
                          isFormValid 
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/10 cursor-pointer hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-95' 
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                        }`}
                      >
                        Soumettre le Briefing
                        <Send className="ml-2 w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.form>
                )}

                {/* Submitting Loading transition (With simulated live backend logs) */}
                {formState === 'loading' && (
                  <motion.div
                    key="form-loading"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-stretch py-10 min-h-[300px] justify-center"
                  >
                    <div className="text-center mb-6">
                      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-white">
                        Traitement de la demande en cours...
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Dispatching microservices events. Les logs d'exécution s'afficheront ci-dessous.
                      </p>
                    </div>

                    {/* Console Logger view */}
                    <div className="bg-[#030303] p-4 rounded-xl border border-white/5 font-mono text-[10px] text-indigo-400 h-44 overflow-y-auto space-y-1 select-all select-text">
                      {stdout.map((line, idx) => (
                        <div key={idx} className="flex">
                          <span className="text-zinc-600 select-none mr-2.5">$</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Success Card view */}
                {formState === 'success' && (
                  <motion.div
                    key="form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center flex flex-col items-center justify-center min-h-[350px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-550/10 dark:bg-indigo-500/10 border-2 border-indigo-500 flex items-center justify-center mb-6 text-indigo-500">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white leading-tight mb-3">
                      Briefing envoyé avec succès !
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Merci <strong>{formData.name}</strong>. Vos coordonnées, briefing de projet et attentes techniques ont été transmis directement à mon CRM personnel. Je planifie notre appel de cadrage technique d'ici quelques heures.
                    </p>

                    {etherealUrl && (
                      <div className="mt-6 p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 text-center max-w-md">
                        <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
                          ⚙️ Le serveur fonctionne en bac à sable (Ethereal SMTP Sandbox). Vous pouvez visualiser la livraison réelle du mail de briefing ainsi que de l'accusé de réception automatique :
                        </p>
                        <a
                          href={etherealUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white cursor-pointer shadow-md shadow-indigo-500/10 transition-all font-mono"
                        >
                          <Play className="w-3.5 h-3.5 mr-1.5 shrink-0 animate-pulse" />
                          Consulter l'e-mail envoyé
                        </a>
                      </div>
                    )}

                    <div className="mt-8 flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ name: '', email: '', subject: '', budget: '5k-15k', message: '', confirmation: false, website: '' });
                          setTouched({ name: false, email: false, subject: false, message: false });
                          setFormState('idle');
                        }}
                        className="px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
