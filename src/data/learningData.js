export const userProfile = {
  name: "Sarwvidya",
  handle: "codewithsarvy",
  role: "Full-Stack Java & React Developer",
  bio: "Hi! I'm Sarwvidya. I build scalable backend microservices with Java & Spring Boot, create sleek responsive frontends with React, and curate clean notes for lifelong engineering learners. Welcome to my personal vault.",
  github: "https://github.com/codewithsarvy",
  linkedin: "https://linkedin.com/in/codewithsarvy",
  tags: ["Java 21", "Spring Boot", "React 19", "Kafka", "PostgreSQL", "System Design", "Docker"]
};

export const learningTopics = [
  {
    id: "core-java",
    title: "Core Java",
    color: "#f59e0b",
    tag: "Backend Core",
    chaptersCount: "7 chapters",
    description: "OOPs architecture, JVM memory model, Collections internals, Concurrency, and modern Java 8-21 features.",
    graphic: "java",
    docCategory: "/docs/category/core-java",
    chapters: [
      { 
        id: "oops", 
        title: "OOPs Concepts & Principles",
        docPath: "/docs/core-java/oops-concepts"
      },
      { 
        id: "memory-jvm", 
        title: "JVM Internals & Memory Model",
        docPath: "/docs/core-java/jvm-memory-model"
      },
      { 
        id: "strings", 
        title: "Strings, StringBuilder & Pool",
        docPath: "/docs/category/core-java"
      },
      { 
        id: "collections", 
        title: "Collections Framework Internals",
        docPath: "/docs/category/core-java"
      },
      { 
        id: "multithreading", 
        title: "Multithreading & Concurrency",
        docPath: "/docs/category/core-java"
      },
      { 
        id: "streams-lambdas", 
        title: "Streams API & Lambdas",
        docPath: "/docs/category/core-java"
      },
      { 
        id: "exception-handling", 
        title: "Exception Handling Best Practices",
        docPath: "/docs/category/core-java"
      }
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    color: "#6366f1",
    tag: "Core CS",
    chaptersCount: "6 chapters",
    description: "Algorithmic patterns, Big-O complexity, dynamic programming, binary trees, and graph traversals.",
    graphic: "dsa",
    docCategory: "/docs/category/data-structures--algorithms",
    chapters: [
      { 
        id: "complexity", 
        title: "Time & Space Complexity (Big-O)",
        docPath: "/docs/dsa/time-space-complexity"
      },
      { 
        id: "arrays-pointers", 
        title: "Arrays, Two Pointers & Sliding Window",
        docPath: "/docs/category/data-structures--algorithms"
      },
      { 
        id: "linked-lists", 
        title: "Linked Lists & Fast/Slow Pointers",
        docPath: "/docs/category/data-structures--algorithms"
      },
      { 
        id: "trees-bst", 
        title: "Trees & Binary Search Trees",
        docPath: "/docs/category/data-structures--algorithms"
      },
      { 
        id: "graphs", 
        title: "Graphs & Traversals (BFS/DFS)",
        docPath: "/docs/category/data-structures--algorithms"
      },
      { 
        id: "dynamic-programming", 
        title: "Dynamic Programming Patterns",
        docPath: "/docs/category/data-structures--algorithms"
      }
    ]
  },
  {
    id: "spring-boot",
    title: "Spring Boot & Microservices",
    color: "#10b981",
    tag: "Enterprise",
    chaptersCount: "5 chapters",
    description: "RESTful architecture, Spring Data JPA, Hibernate optimization, Spring Security 6 JWT, and Kafka.",
    graphic: "spring",
    docCategory: "/docs/category/spring-boot--microservices",
    chapters: [
      { 
        id: "spring-core", 
        title: "Spring Core & Inversion of Control",
        docPath: "/docs/spring-boot/spring-core-ioc"
      },
      { 
        id: "spring-rest", 
        title: "RESTful APIs & Controller Advice",
        docPath: "/docs/category/spring-boot--microservices"
      },
      { 
        id: "spring-jpa", 
        title: "Spring Data JPA & Hibernate",
        docPath: "/docs/category/spring-boot--microservices"
      },
      { 
        id: "spring-security", 
        title: "Spring Security 6 & JWT Auth",
        docPath: "/docs/category/spring-boot--microservices"
      },
      { 
        id: "microservices", 
        title: "Microservices & Apache Kafka",
        docPath: "/docs/category/spring-boot--microservices"
      }
    ]
  },
  {
    id: "react-js",
    title: "React.js & Frontend",
    color: "#06b6d4",
    tag: "Modern UI",
    chaptersCount: "5 chapters",
    description: "Component architecture, React 19 hooks, custom hooks, global state management, and modern CSS styling.",
    graphic: "react",
    docCategory: "/docs/category/reactjs--frontend",
    chapters: [
      { 
        id: "modern-js", 
        title: "Modern JavaScript (ES6+)",
        docPath: "/docs/react/modern-javascript"
      },
      { 
        id: "react-basics", 
        title: "Components, Props & JSX",
        docPath: "/docs/category/reactjs--frontend"
      },
      { 
        id: "react-hooks", 
        title: "Essential Hooks (useState, useEffect, useRef)",
        docPath: "/docs/category/reactjs--frontend"
      },
      { 
        id: "state-management", 
        title: "State Management & Context",
        docPath: "/docs/category/reactjs--frontend"
      },
      { 
        id: "performance", 
        title: "Performance & Custom Hooks",
        docPath: "/docs/category/reactjs--frontend"
      }
    ]
  },
  {
    id: "system-design",
    title: "System Design & Databases",
    color: "#a855f7",
    tag: "Architecture",
    chaptersCount: "4 chapters",
    description: "Database B-Tree indexing, distributed caching with Redis, load balancing, and CAP theorem tradeoffs.",
    graphic: "system-design",
    docCategory: "/docs/category/system-design--databases",
    chapters: [
      { 
        id: "sql-indexing", 
        title: "Relational DBs & B-Tree Indexing",
        docPath: "/docs/system-design/sql-indexing"
      },
      { 
        id: "caching-redis", 
        title: "Caching Strategies & Redis",
        docPath: "/docs/category/system-design--databases"
      },
      { 
        id: "scalability", 
        title: "Scalability & Load Balancing",
        docPath: "/docs/category/system-design--databases"
      },
      { 
        id: "cap-theorem", 
        title: "CAP Theorem & Distributed Consensus",
        docPath: "/docs/category/system-design--databases"
      }
    ]
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    color: "#f43f5e",
    tag: "DevOps",
    chaptersCount: "4 chapters",
    description: "Git branching strategies, Docker multi-stage builds, CI/CD automated pipelines, and cloud deployment.",
    graphic: "devops",
    docCategory: "/docs/category/devops--tools",
    chapters: [
      { 
        id: "git", 
        title: "Git Workflows & Rebasing",
        docPath: "/docs/devops/git-workflows"
      },
      { 
        id: "docker", 
        title: "Docker & Containerization",
        docPath: "/docs/category/devops--tools"
      },
      { 
        id: "cicd", 
        title: "CI/CD with GitHub Actions",
        docPath: "/docs/category/devops--tools"
      },
      { 
        id: "linux-basics", 
        title: "Linux & Shell Basics",
        docPath: "/docs/category/devops--tools"
      }
    ]
  },
  {
    id: "machine-learning",
    title: "Machine Learning & Deep Learning",
    color: "#0ea5e9",
    tag: "AI / ML",
    chaptersCount: "8 modules",
    description: "Master neural networks, LLMs, computer vision, and classical machine learning algorithms.",
    graphic: "llms",
    docCategory: "/docs/category/machine-learning--deep-learning",
    chapters: [
      {
        id: "intro-maths",
        title: "Intro & Maths",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "classical-ml",
        title: "Classical Machine Learning",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "dl-foundations",
        title: "Deep Learning Foundations",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "cv",
        title: "Computer Vision",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "nlp",
        title: "NLP & Sequence Models",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "transformers",
        title: "Transformers",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "llms",
        title: "Large Language Models",
        docPath: "/docs/category/machine-learning--deep-learning"
      },
      {
        id: "gen-ai",
        title: "Generative AI Engineering",
        docPath: "/docs/category/machine-learning--deep-learning"
      }
    ]
  }
];

export const featuredProjects = [];
