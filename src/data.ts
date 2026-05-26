/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service, Experience } from './types.ts';

export const HERO_DATA = {
  name: "Fenohasina Andrinirina",
  title: "Symfony Backend Engineer / API Platform Expert",
  subtitle: "Je conçois et développe des architectures backend hautement performantes, scalables et sécurisées pour des applications critiques.",
  stats: [
    { value: "8+", label: "Années d'expérience" },
    { value: "35+", label: "Projets livrés" },
    { value: "99.8%", label: "SLA des APIs" },
    { value: "100%", label: "Clients satisfaits" }
  ]
};

export const SERVICES_DATA: Service[] = [
  {
    id: "sf-api",
    title: "Symfony & API Platform",
    description: "Conception d'APIs REST et GraphQL ultra-rapides, auto-documentées (Swagger/Redoc), avec gestion fine de la sérialisation, filtres dynamiques, et hydratation personnalisée.",
    iconName: "Cpu",
    tech: ["Symfony 6/7", "API Platform 3", "GraphQL", "Mercure", "Sulu CMS"]
  },
  {
    id: "arch-micro",
    title: "Architecture Backend & Microservices",
    description: "Modélisation d'architectures découplées à forte tolérance aux pannes. Implémentation du Symfony Messenger, CQRS, et de bus de messages distribués pour un traitement asynchrone robuste.",
    iconName: "Network",
    tech: ["RabbitMQ", "Kafka", "Docker", "CQRS", "Event Sourcing"]
  },
  {
    id: "laravel",
    title: "Laravel Core Development",
    description: "Développement d'applications et de portails métiers performants basés sur le framework Laravel. Maîtrise d'Eloquent, des Job queues, de Laravel Nova, Octane et d'intégrations complexes.",
    iconName: "Zap",
    tech: ["Laravel 10/11", "Eloquent ORM", "Livewire", "Horizon", "Sanctum"]
  },
  {
    id: "drupal-wp",
    title: "Drupal & WordPress Integration",
    description: "Conception de socles Headless CMS pour connecter vos applications frontend. Création de modules custome sur-mesure et de pipelines complexes de migration de données massives.",
    iconName: "Dribbble",
    tech: ["Drupal 9/10", "Headless CMS", "WordPress REST API", "WP CLI", "Twig"]
  },
  {
    id: "security",
    title: "Sécurité & Authentification JWT / OAuth",
    description: "Mise en place de protocoles de sécurité robustes : flux OAuth2 multi-tenants, authentification JWT sans état, clés d'API sécurisées, protection CORS avancée, et chiffrement à clé publique.",
    iconName: "Shield",
    tech: ["OAuth2 / OpenID Connect", "JWT Lexik", "Symfony Security", "Rate Limiting"]
  },
  {
    id: "performance",
    title: "Optimisation de Performance & SQL",
    description: "Audit et debugging d'applications lentes. Réduction drastique des requêtes N+1 via Doctrine, indexation fine PostgreSQL/MySQL, cache Redis multicouche, et profils HTTP d'exécution.",
    iconName: "Gauge",
    tech: ["Doctrine Optimization", "Redis Cache", "PostgreSQL", "Blackfire.io", "Varnish"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    slug: "contab",
    title: "Contab",
    client: "Contab Corp",
    role: "Architecte & Développeur Backend Principal",
    period: "2024 - 2025",
    category: "SaaS Financier",
    shortDescription: "SaaS de comptabilité et de gestion de trésorerie automatisé intégrant le rapprochement bancaire automatique en temps réel.",
    fullDescription: "Contab est une plateforme SaaS permettant aux PME d'automatiser leur gestion financière intégrale. En connectant de nombreuses banques partenaires via des APIs Open Banking standardisées (DSP2), l'application télécharge, catégorise et rapproche automatiquement les flux de transactions avec les factures et reçus émis.",
    stack: ["Symfony 7", "API Platform 3", "React", "PostgreSQL", "Redis", "Docker", "Sentry", "Bridges DSP2"],
    problematic: "Traiter de façon asynchrone, sécurisée et transactionnelle des millions de lignes financières quotidiennes sans surcharge système, tout en assurant un rapprochement automatique précis à plus de 98% malgré les fluctuations de libellés bancaires.",
    solution: "Mise en place d'une architecture orientée événements à l'aide de Symfony Messenger pour découpler la synchronisation bancaire du thread principal de l'utilisateur. Utilisation d'un algorithme de fuzzy matching (Levensthein) et régularisation statistique vectorisée stockée en cache Redis. Optimisation des transactions PostgreSQL avec verrous pessimistes logiciels pour éviter les doublons lors des exécutions parallèles de webhooks.",
    features: [
      "Synchronisation automatique avec les banques de l'UE via l'API Bridger DSP2",
      "Algorithme heuristique intelligent de rapprochement automatique de factures",
      "Système de génération de PDF d'états comptables réglementaires (Bilan, Compte de Résultat)",
      "Gestion multi-devises et taux de change mis à jour automatiquement en temps-réel",
      "Tableau de bord de trésorerie dynamique avec graphs financiers prévisionnels interactifs",
      "Export comptable aux formats universels (FEC, Sage, CEGID, Quadratus)"
    ],
    metrics: [
      { label: "Temps de chargement moyen", value: "< 120ms" },
      { label: "Précision rapprochement", value: "99.2%" },
      { label: "Volume de transactions", value: "14 M€+" },
      { label: "Traitement parallèle", value: "1,500/sec" }
    ],
    accentColor: "emerald"
  },
  {
    slug: "pazzi-control-center",
    title: "Pazzi Control Center",
    client: "Ekim Automations",
    role: "Ingénieur Backend Senior",
    period: "2023 - 2024",
    category: "Supervision IoT",
    shortDescription: "Système de supervision, de télémétrie en direct et d'orchestration de robots de restauration autonome.",
    fullDescription: "Pazzi Control Center est la tour de contrôle industrielle chargée de surveiller les kiosques de cuisine robotisés autonomes. Le centre de contrôle gère l'envoi d'instructions de recettes complexes, le monitoring thermique des fours, l'état d'usure des verrues pneumatiques et la gestion globale de l'inventaire des ingrédients en temps réel.",
    stack: ["Symfony 6", "RabbitMQ", "Node-RED", "InfluxDB", "Grafana", "WebSockets", "PHPUnit", "Docker Swarm"],
    problematic: "Collecter, indexer et réagir en moins de 100ms à des flux de télémétries massifs envoyés par des capteurs de température, moteurs pas-à-pas et automates industriels PLC, tout en maintenant un historique d'activité complet pour l'auditabilité réglementaire.",
    solution: "Déploiement d'un bus de messages RabbitMQ hautement disponible contenant des files d'attente prioritaires. Les messages de télémétrie légère sont consommés par un worker Symfony optimisé qui indexe les métriques de séries temporelles dans InfluxDB sans bloquer l'application. Symfony gère également les cas d'erreur bloquants (ex. : alarme de secours) en envoyant une commande prioritaire d'arrêt d'urgence directement au contrôleur matériel local via des protocoles TCP bas niveau.",
    features: [
      "Tableau de bord de supervision de flotte de robots 3D en temps réel",
      "Consommation asynchrone des télémétries PLC (100+ mesures par seconde par robot)",
      "Alertes de maintenance prédictives basées sur des déviations thermiques répétitives",
      "Mise à jour à distance sécurisée du firmware des robots via canaux cryptés (OTA)",
      "Orchestration dynamique de recettes : synchronisation entre le bras robot et le four",
      "Génération automatique de bons de réapprovisionnement pour les équipes de logistique"
    ],
    metrics: [
      { label: "Latence commandes IoT", value: "< 45ms" },
      { label: "Disponibilité système", value: "99.99%" },
      { label: "Points de donnée indexés", value: "2.4 Md+" },
      { label: "Temps d'arrêt matériel", value: "-45%" }
    ],
    accentColor: "blue"
  },
  {
    slug: "tkblue",
    title: "TKBLUE",
    client: "TK'Blue Alliance",
    role: "Expert Refonte & Optimisation Laravel",
    period: "2022 - 2023",
    category: "Eco-Tech européenne",
    shortDescription: "Calculateur d'empreintes GES de flottes de transport poids lourds pour la notation environnementale européenne.",
    fullDescription: "TK'Blue Alliance est la principale agence d'évaluation d'impact environnemental spécialisée pour le transport de marchandises en Europe. La plateforme permet aux expéditeurs mondiaux de calculer, valoriser et certifier les économies de CO2 et d'oxydes d'azote réalisées grâce à leurs choix logistiques intermodaux.",
    stack: ["Laravel 10", "VueJS", "Docker", "PostgreSQL", "Elasticsearch", "TailwindCSS", "Redis", "OpenStreetMaps Routing API"],
    problematic: "Calculer dynamiquement l'itinéraire exact parmi plus de 50 000 trajets multimodaux, appliquer des algorithmes de physique thermique de combustion de fioul, et générer les rapports d'empreinte carbone pour des millions de lignes d'ordres de transport mensuels en réduisant les coûts d'infrastructure.",
    solution: "Réécriture complète des requêtes d'algorithmes de transport avec des requêtes SQL réformées (Common Table Expressions) et intégration de requêtes géospatiales directes. Stockage des constantes d'émissions des moteurs par catégorie de véhicules en mémoire Redis. Implémentation d'Elasticsearch pour la recherche textuelle hyper active de villes et de zones intermodales.",
    features: [
      "Moteur d'estimation d'impact carbone (CO2, NOx, Particules Fines) conforme au standard ISO 14083",
      "Module d'importation automatique en masse (fichiers CSV/Excel volumineux de plus de 500k lignes)",
      "Attestation éco-responsable certifiée pour les rapports RSE et les douanes",
      "Calculateurs géographiques multicartes d'itinéraires intermodaux optimaux (Fer, Route, Barge, Air)",
      "Espace de certification pour les transporteurs routiers inscrits",
      "Interface d'analyse de données multicritères pour les cabinets de conseil"
    ],
    metrics: [
      { label: "Temps d'import logistique", value: "3h -> 4min" },
      { label: "Vitesse calcul CO2", value: "de 5s à 50ms" },
      { label: "Emissions répertoriées", value: "1.2 M tonnes" },
      { label: "Données logistiques", value: "450 Go" }
    ],
    accentColor: "cyan"
  },
  {
    slug: "breizhgo",
    title: "BreizhGo Portal",
    client: "Région Bretagne",
    role: "Architecte & Intégrateur Senior Drupal",
    period: "2021 - 2022",
    category: "Portail Public",
    shortDescription: "Portail officiel d'information voyageur et de vente du réseau de transport public en Bretagne.",
    fullDescription: "BreizhGo regroupe tous les modes de déplacement public gérés par la Région Bretagne (TER, autocars interurbains, liaisons maritimes vers les îles). Le site fournit des informations d'itinéraires, des grilles horaires de passage complexes et un système de billetterie centralisé.",
    stack: ["Drupal 9/10", "Symfony Core", "MySQL", "OpenTransport API (GTFS)", "Varnish Cache", "Axe RGAA Validator"],
    problematic: "Unifier des formats d'horaires extrêmement diversifiés provenant de dizaines d'exploitants locaux hétérogènes, tout en offrant une interface hyper résiliente pendant les pics de rentrée scolaire et respectant les normes strictes d'accessibilité numérique de l'État.",
    solution: "Création d'un module Drupal personnalisé effectuant la désérialisation de flux GTFS (General Transit Feed Specification) dans un schéma relationnel ultra performant. Couche de mise en cache agressive au niveau Varnish et Redis en amont pour servir 98% des requêtes anonymes directement sans consultation Web de base SQL. Audit approfondi et intégration de l'accessibilité niveau AA (100% au test RGAA).",
    features: [
      "Calculateur d'itinéraires intermodal ultra-complet de porte à porte connecté aux bases régionales",
      "Système d'abonnements scolaires en ligne : inscription complète avec téléversement de documents",
      "Diffusion en temps-réel des perturbations (accidents, grèves) par notification SMS et email",
      "Système de billetterie en ligne sans friction intégrant les passerelles bancaires d'État",
      "Fiches horaires dynamiques personnalisées selon les désirs de l'usager",
      "100% de conformité au Référentiel Général d'Amélioration de l'Accessibilité (RGAA)"
    ],
    metrics: [
      { label: "Utilisateurs mensuels", value: "1.8 Millions" },
      { label: "Disponibilité sous pic", value: "100.0%" },
      { label: "Score accessibilité", value: "96.5% RGAA" },
      { label: "Temps de réponse Varnish", value: "12ms" }
    ],
    accentColor: "amber"
  },
  {
    slug: "camele-eau",
    title: "CAMELE EAU",
    client: "Syndicat Mixte d'Eau Potable",
    role: "Architecte SIG & Backend Lead",
    period: "2020 - 2021",
    category: "Système d'Information Géographique",
    shortDescription: "SIG sur-mesure pour la surveillance, la recherche de fuites et la géolocalisation des réseaux d'eau potable.",
    fullDescription: "CAMELE EAU est un outil professionnel de pointe destiné aux techniciens de maintenance pour cartographier, inspecter et analyser la santé des conduites d'alimentation d'eau et des collecteurs d'assainissement.",
    stack: ["Symfony 5", "API Platform", "PostgreSQL / PostGIS", "Leaflet JS", "Docker", "Geonames API"],
    problematic: "Manipuler en temps réel des couches géospatiales vectorielles extrêmement denses et des centaines de milliers de vannes, embranchements et canalisations directement sur le terrain sur des terminaux mobiles à connexion faible.",
    solution: "Utilisation des données spatiales géoréférencées via PostGIS dans PostgreSQL. Optimisation de l'API via la création de GeoJSON dynamiques pré-compilés et découpés en tuiles géographiques vectorielles intelligentes. Utilisation d'un cache client avec Service Worker pour gérez les zones blanches (mode hors-ligne complet de saisie).",
    features: [
      "Visualisation cartographique interactive multicouche haute définition (fonds de plan IGN, OSM)",
      "Formulaire d'inspection sur mobile avec prises de photos géoréférencées hors-ligne complètes",
      "Génération automatique d'itinéraires d'inspection logique basé sur la pression et l'âge des conduits",
      "Synchronisation automatique bidirectionnelle dès la détection de couverture réseau mobile",
      "Export de rapports au format shapefile de CAO (.shp, GeoJSON, KML) pour bureaux d'études",
      "Tableau d'analyse scientifique du rendement de réseau (détection automatique de fuites de pression)"
    ],
    metrics: [
      { label: "Objets cartographiés", value: "150,000+" },
      { label: "Saisie hors-ligne", value: "Agréée 100%" },
      { label: "Vitesse d'affichage", value: "< 350ms" },
      { label: "Temps économisé", value: "3h/jour/agent" }
    ],
    accentColor: "indigo"
  },
  {
    slug: "fassi",
    title: "Espace Client FASSI",
    client: "Fassi France",
    role: "Architecte Logiciel Senior Symfony",
    period: "2019 - 2020",
    category: "B2B & E-Commerce",
    shortDescription: "Portail distributeurs et espace de commande de pièces détachées sur schémas de grue interactifs.",
    fullDescription: "Portail et boutique de commandes inter-entreprises sécurisée pour le réseau de revendeurs, concessionnaires et clients de grues Fassi. Ce portail offre un catalogue interactif d'identification de pièces de rechange directement via des schémas CAO explosés hyper interactifs.",
    stack: ["Symfony 5", "Sylius Core", "SGBD Oracle DB", "Webpack Encore", "Sass", "GraphQL"],
    problematic: "Interfacer une plateforme e-commerce moderne avec un système d'information industriel historique contenant plus de 30 ans de plans de grues d'ingénierie et un ERP AS400 très difficile à synchroniser.",
    solution: "Création d'une couche middleware d'abstraction construite avec Symfony qui convertit les files de données Oracle DB en documents JSON normalisés asynchrones. Indexation en base Redis avec clés de hachage. Intégration de schémas techniques SVG interactifs où chaque boulon, joint ou vérin est cliquable et renvoie instantanément à sa disponibilité de stock réelle dans l'ERP.",
    features: [
      "Visualisation 2D interactive de schémas techniques éclatés (CAD SVG interactifs)",
      "Recherche rapide par numéro de série de grue avec historique de fabrication sur-mesure",
      "Processus de validation de garantie constructeur guidé de A à Z avec téléversements multimédia",
      "Calcul des tarifs pro personnalisés en fonction des clauses d'accords distributeurs existants",
      "Prise en charge de la logistique globale : calcul des frais de port express selon poids de grue",
      "Connexion complète en temps réel de stocks de l'AS400 via requêtes planifiées en file DB"
    ],
    metrics: [
      { label: "Références de pièces", value: "350,000+" },
      { label: "Ventes e-commerce pro", value: "+30% / an" },
      { label: "Erreurs de commandes", value: "Divisées par 5" },
      { label: "Synchronisation stock", value: "Toutes les 15s" }
    ],
    accentColor: "red"
  }
];

export const TIMELINE_DATA: Experience[] = [
  {
    id: "exp1",
    role: "Architecte & Ingénieur Backend Indépendant / Expert Symfony",
    company: "Freelance",
    period: "2021 - Présent",
    description: "Accompagnement de startups technologiques, de grands comptes, et de syndicats territoriaux sur la conception d'architectures asynchrones critiques et la refonte d'APIs complexes.",
    achievements: [
      "Mise en place d'architectures distribuées Symfony Messenger / RabbitMQ / Kafka pour des dispatchs en temps réel.",
      "Amélioration des performances d'APIs clés de 40% (mise en cache fine Doctrine, Redis, et Varnish).",
      "Garantie de l'évolutivité et de l'auditabilité avec des patterns CQRS d'Event Sourcing.",
      "Mentorat d'équipes de développement sur l'implémentation de bonnes pratiques SOLID et Clean Code."
    ],
    tech: ["Symfony 6 & 7", "API Platform 3", "Laravel 10", "RabbitMQ", "PostgreSQL", "Docker", "Sulu CMS"]
  },
  {
    id: "exp2",
    role: "Ingénieur d'Études & Développement Senior",
    company: "Esokia (Agence Digitale)",
    period: "2018 - 2021",
    description: "Direction technique sur les projets Symfony, Drupal Headless et Laravel d'envergure. Supervision des équipes de développeurs et choix technologiques.",
    achievements: [
      "Création du module central de désérialisation de flux géospatiaux (GTFS) pour le projet régional BreizhGo sous Drupal.",
      "Intégration d'ERP industriels historiques (AS400) vers de nouveaux écosystèmes web via middlewares Symfony.",
      "Définition et animation du catalogue de composants applicatifs réutilisables d'agence."
    ],
    tech: ["Symfony Core", "Drupal 9", "AS400 Interface Middleware", "Doctrine", "Vanish Cache", "CI/CD GitLab"]
  },
  {
    id: "exp3",
    role: "Développeur PHP / Symfomy",
    company: "Soft Solutions France",
    period: "2016 - 2018",
    description: "Développement d'outils métiers complexes de gestion interne d'entreprise et d'immobilier d'entreprise.",
    achievements: [
      "Développement de modules ERP internes Symfony pour le suivi RH et la facturation client.",
      "Création d'APIs REST de synchronisation avec des plateformes d'annonces immobilières tierces (SeLoger, Leboncoin).",
      "Écriture approfondie de tests unitaires et d'intégration avec PHPUnit."
    ],
    tech: ["Symfony 2 & 3", "Doctrine", "MySQL", "PHPUnit", "Twig", "Bootstrap", "jQuery"]
  }
];

export const SKILLS_BADGES = [
  { name: "Symfony Core", category: "Framework" },
  { name: "API Platform 3", category: "API" },
  { name: "PHP 8.3/8.4", category: "Langage" },
  { name: "Laravel Core", category: "Framework" },
  { name: "Drupal Headless", category: "CMS" },
  { name: "Docker & Swarm", category: "DevOps" },
  { name: "RabbitMQ / Messenger", category: "Message Broker" },
  { name: "PostgreSQL / PostGIS", category: "SGBD" },
  { name: "Redis Cache Multi-couche", category: "Cache" },
  { name: "GraphQL & REST", category: "API" },
  { name: "Blackfire.io & Varnish", category: "Performance" },
  { name: "CI / CD Pipelines", category: "DevOps" },
  { name: "PHPUnit & TDD", category: "Code Quality" },
  { name: "React FE Integration", category: "Frontend" }
];
