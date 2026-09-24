// Selected work. Historical projects (001-004) verified from sithil.me.
// Newer AI projects (005-007) as described directly by Sithil — no GitHub links
// published yet, so "repo" is left null rather than guessed.
export const projects = [
  {
    id: "001",
    slug: "financial-management-system",
    category: "Microservices",
    tag: "MICRO",
    title: "Financial Management System",
    summary:
      "A comprehensive personal finance platform built on a microservice architecture — React frontend, Spring Boot services, and dual-database sync between a local SQLite store and a central Oracle database.",
    stack: ["React", "Spring Boot", "Oracle DB", "SQLite", "REST APIs"],
    repo: "https://github.com/SithilSemitha/Financial-System-Back-End",
    repoFrontend: "https://github.com/SithilSemitha/Financial-System-Front-End",
    demo: null,
    architecture: ["REACT", "API GATEWAY", "SPRING BOOT SERVICES", "ORACLE DB", "SQLITE"],
    architectureNote: "Oracle DB and SQLite stay in sync — SQLite handles local/offline reads and writes, reconciling back to the central Oracle instance.",
    problem:
      "Personal finance tracking tools are either too simplistic (spreadsheets) or too heavyweight (enterprise accounting software), and few handle offline-first usage gracefully.",
    objective:
      "Build a finance platform that works locally without a constant connection, while still centralizing data for reporting and multi-device access.",
    implementation:
      "The frontend is a React SPA talking to a set of independent Spring Boot services (accounts, transactions, budgets) behind a lightweight API gateway. Each service owns its own data access layer; a central Oracle database is the system of record, while a local SQLite database mirrors relevant data for offline resilience and fast local queries.",
    challenges:
      "Keeping the local SQLite store and the central Oracle DB consistent without heavyweight distributed-transaction machinery — solved with a reconciliation pass that resolves conflicts using timestamps and per-record versioning.",
    result:
      "A working microservice-based finance platform with a clean separation between local and central persistence, demonstrating practical offline-first architecture.",
    learned:
      "Where eventual consistency is an acceptable trade-off, and how to design service boundaries so each Spring Boot service stays independently deployable.",
  },
  {
    id: "002",
    slug: "pizza-mania",
    category: "Mobile / Payments",
    tag: "MOBILE",
    title: "Pizza Mania",
    summary:
      "An Android food-ordering app with real-time ordering, Google Maps location detection, Stripe payments, and an admin dashboard for order and inventory management.",
    stack: ["Android", "Java", "Firebase", "Google Maps API", "Stripe API"],
    repo: "https://github.com/SithilSemitha/Pizza-Mania",
    demo: null,
    architecture: ["ANDROID CLIENT", "FIREBASE (AUTH / REALTIME DB)", "GOOGLE MAPS API", "STRIPE API", "ADMIN DASHBOARD"],
    architectureNote: "Firebase Realtime Database drives live order status; Stripe handles payment capture independently of the order-state pipeline.",
    problem:
      "Small food vendors need ordering apps that handle live order tracking and payments without the overhead of a custom backend.",
    objective:
      "Ship a full ordering experience — browse, order, pay, track — backed entirely by managed services to keep infrastructure minimal.",
    implementation:
      "Native Android app in Java. Firebase provides authentication and a realtime database for order state; the Google Maps API detects and displays delivery location; Stripe handles payment capture. A companion admin view manages incoming orders and inventory levels.",
    challenges:
      "Keeping order status updates responsive across the customer app and the admin dashboard simultaneously — addressed with Firebase's realtime listeners instead of polling.",
    result:
      "A functioning ordering flow from cart to payment to delivery tracking, with a working admin-side inventory view.",
    learned:
      "How far managed backend services (Firebase, Stripe) can take a mobile MVP before a custom backend becomes necessary.",
  },
  {
    id: "003",
    slug: "fos-me",
    category: "Microservices",
    tag: "MICRO",
    title: "FOS ME",
    summary:
      "A scalable food ordering platform split into independent services for authentication, menu management, order processing, and delivery tracking behind a single API gateway.",
    stack: ["Spring Boot", "Next.js", "API Gateway", "MySQL", "REST APIs"],
    repo: "https://github.com/SithilSemitha/Food-Ordering-System",
    demo: null,
    architecture: ["NEXT.JS", "API GATEWAY", "AUTH SERVICE", "MENU SERVICE", "ORDER SERVICE", "DELIVERY SERVICE", "MYSQL"],
    architectureNote: "Each service owns its own MySQL schema; the gateway is the single entry point the Next.js frontend talks to.",
    problem:
      "A single monolithic ordering service becomes a bottleneck once auth, menu, ordering, and delivery each need independent scaling and release cycles.",
    objective:
      "Decompose the ordering system into services that can be developed, deployed, and scaled independently.",
    implementation:
      "Four Spring Boot services — auth, menu, order, delivery — sit behind an API gateway that routes and authenticates requests. The Next.js frontend consumes the gateway exclusively, never talking to services directly.",
    challenges:
      "Coordinating an order that spans multiple services (menu lookup, order creation, delivery assignment) without a shared database — handled with synchronous REST calls orchestrated at the gateway/order-service layer.",
    result:
      "A working modular food ordering system where each service can be modified independently without redeploying the whole platform.",
    learned:
      "The operational cost of microservices — service discovery, inter-service auth, and coordinated deploys — versus the benefit of independent scaling.",
  },
  {
    id: "004",
    slug: "techspace",
    category: "ERP / Enterprise Software",
    tag: "FEATURED",
    title: "TechSpace",
    badge: "BEST PROJECT AWARD",
    summary:
      "A large-scale apparel export management system covering raw material procurement, production, HR, finance, and international client sales — awarded Best Project of the Academic Year.",
    stack: ["PHP", "MySQL", "Apache", "Bootstrap", "JavaScript"],
    repo: "https://github.com/SithilSemitha/techspace-backend-frontend",
    demo: null,
    architecture: ["BOOTSTRAP UI", "PHP APPLICATION LAYER", "APACHE", "MYSQL"],
    architectureNote: "A modular PHP application layer with separate modules per business function — procurement, production, HR, finance, sales.",
    problem:
      "Apparel exporters coordinate procurement, production, HR, and international sales across disconnected spreadsheets and manual processes.",
    objective:
      "Build a single ERP system that gives each department — procurement, production, HR, finance, sales — a shared source of truth.",
    implementation:
      "A modular PHP application backed by MySQL, with each business function (procurement, production tracking, HR, finance, client sales) implemented as its own module sharing a common data layer and Bootstrap-based UI.",
    challenges:
      "Modeling a production pipeline that spans procurement through to export sales in a single relational schema without the system becoming unmanageable — solved by keeping module boundaries close to real departmental boundaries.",
    result:
      "A full ERP covering the export lifecycle end-to-end, recognized as Best Project of the Academic Year for its scale and technical depth.",
    learned:
      "How to scope and structure a large, multi-department system as a team, and how much requirements discovery matters before implementation on a project this size.",
  },
  {
    id: "005",
    slug: "ai-code-assistant",
    category: "LLM / Developer Tools",
    tag: "AI",
    title: "AI Code Assistant",
    summary:
      "A locally-run coding assistant built on Ollama, combining code understanding with context retrieval to give AI-assisted suggestions without sending code to a third party.",
    stack: ["Ollama", "Local LLM", "Context Retrieval", "Python"],
    repo: null,
    demo: null,
    architecture: ["CODEBASE", "CONTEXT RETRIEVAL", "LOCAL LLM (OLLAMA)", "SUGGESTIONS / EXPLANATIONS"],
    architectureNote: "Runs entirely against a locally-hosted model — no code leaves the machine.",
    problem:
      "Cloud-based AI coding assistants require sending source code to a third-party API, which isn't acceptable for private or sensitive codebases.",
    objective:
      "Explore how far a fully local LLM setup can go for code understanding and assistance, with zero external calls.",
    implementation:
      "Ollama serves a local model. A context-retrieval layer indexes the relevant parts of the codebase and feeds targeted context into each prompt, rather than relying on the model's training data alone.",
    challenges:
      "Local models are smaller and slower than hosted frontier models — retrieval quality matters far more to get useful answers out of a constrained model.",
    result:
      "A working local assistant that can answer questions about a codebase and suggest changes without any network dependency.",
    learned:
      "Practical limits of local LLMs for code tasks, and how much retrieval quality compensates for smaller model size.",
  },
  {
    id: "006",
    slug: "board-meeting-ai",
    category: "Generative AI / RAG",
    tag: "AI",
    title: "Board Meeting AI",
    summary:
      "A retrieval-augmented assistant for board papers — OCR and document processing feed embeddings into a searchable store, so users can query meeting documents by text or voice.",
    stack: ["RAG", "OCR", "Embeddings", "PostgreSQL", "LLMs", "Voice Interaction"],
    repo: null,
    demo: null,
    architecture: ["BOARD PAPERS", "PDF / OCR", "DOCUMENT PROCESSING", "EMBEDDINGS", "DATABASE SEARCH", "LLM", "TEXT / VOICE"],
    architectureNote: "PostgreSQL stores both structured metadata and vector embeddings used for retrieval before generation.",
    problem:
      "Board papers and meeting transcripts pile up as scanned PDFs that are slow to search manually when someone needs a specific decision or figure.",
    objective:
      "Let users ask natural-language questions about board documents and meeting history and get grounded answers with sources.",
    implementation:
      "Incoming board papers go through OCR and document processing, are chunked and embedded, and stored in PostgreSQL alongside metadata. Queries retrieve the most relevant chunks before an LLM generates a grounded answer, deliverable as text or voice.",
    challenges:
      "OCR quality on scanned board documents varies a lot — cleaning and chunking strategy had a bigger impact on answer quality than the choice of LLM.",
    result:
      "A working RAG pipeline that turns a folder of scanned board papers into a queryable knowledge base.",
    learned:
      "How much retrieval-pipeline quality (OCR, chunking, embedding strategy) determines RAG output quality, more than model choice.",
  },
  {
    id: "007",
    slug: "agrifleet",
    category: "Algorithms / Optimization",
    tag: "ALGO",
    title: "AgriFleet",
    summary:
      "A route-optimization system for farm fleet logistics comparing exact and heuristic approaches — Held-Karp, Nearest Neighbor, and a Genetic Algorithm with weighted farm selection.",
    stack: ["Held-Karp", "Nearest Neighbor", "Genetic Algorithm", "Python"],
    repo: "https://github.com/SithilSemitha/agrifleet-backend-core-service",
    repoFrontend: "https://github.com/SithilSemitha/agrifleet-frontend",
    demo: null,
    architecture: ["FARM LOCATIONS + WEIGHTS", "DISTANCE MATRIX", "HELD-KARP / NEAREST NEIGHBOR / GENETIC ALGORITHM", "OPTIMIZED ROUTE"],
    architectureNote: "Held-Karp gives an exact baseline for small fleets; the Genetic Algorithm scales to larger ones where exact solving becomes infeasible.",
    problem:
      "Routing a fleet between weighted farm locations is a variant of the Travelling Salesman Problem — exact solutions are only feasible at small scale.",
    objective:
      "Compare exact and heuristic TSP approaches on realistic fleet sizes and measure the accuracy/performance trade-off.",
    implementation:
      "Held-Karp provides an exact dynamic-programming solution for small instances. Nearest Neighbor gives a fast greedy baseline. A Genetic Algorithm — tournament selection, ordered crossover, mutation, and elitism — searches for near-optimal routes on larger fleets where Held-Karp becomes computationally infeasible.",
    challenges:
      "Tuning the Genetic Algorithm's fitness function to properly weight both distance and farm priority, and choosing mutation/crossover rates that avoid premature convergence.",
    result:
      "A working comparison across three algorithms, showing where exact solving stops being practical and heuristic search takes over.",
    learned:
      "Hands-on trade-offs between exact and heuristic optimization — the Genetic Algorithm's elitism setting mattered more to solution quality than expected.",
  },
];
