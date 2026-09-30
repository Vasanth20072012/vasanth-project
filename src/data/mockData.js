export const sampleJobRoles = [
  {
    id: 'job-ml-data',
    title: 'Senior Product Data Scientist / ML Engineer',
    department: 'Core Intelligence & Product Growth',
    description: 'We are looking for a product-minded machine learning professional who can transform complex business ambiguity into high-leverage production ML and analytics solutions. Essential signals: Strong Python, SQL, causal inference/experimentation, verifiable growth trajectory, and ability to transfer adjacent engineering knowledge to business framing.',
    weights: { skill_match: 0.30, test_score: 0.20, growth_signals: 0.25, skill_adjacency: 0.25 },
  },
  {
    id: 'job-fullstack',
    title: 'Staff Full-Stack AI Engineer',
    department: 'Platform Architecture & Applied AI',
    description: 'Looking for a high-velocity engineer capable of bridging distributed backend services with intuitive generative user interfaces. Strong TypeScript, React, Python, vector systems, and rapid technical adaptability required.',
    weights: { skill_match: 0.35, test_score: 0.15, growth_signals: 0.30, skill_adjacency: 0.20 },
  },
]

export const initialAnalysis = {
  job: {
    id: 'j1',
    title: 'Senior Product Data Scientist / ML Engineer',
    description: 'We are looking for a product-minded data professional who can turn complex business questions into reliable machine learning and analytics solutions. Strong Python, SQL, communication, and a growth mindset are essential.',
    weights: { skill_match: 0.30, test_score: 0.20, growth_signals: 0.25, skill_adjacency: 0.25 },
    jd_filenames: ['Job_Spec_Senior_Data_Scientist.pdf'],
  },
  candidates: [
    {
      id: 'c1',
      name: 'Rahul Kumar',
      role_title: 'Analytics Lead & Applied ML Practitioner',
      archetype: 'High-Velocity Generalist Leader',
      resume_filename: 'Rahul_Kumar_Resume.pdf',
      analyzed_at: '2026-09-22T10:00:00Z',
      avatar_seed: 'RK',
      summary: 'Proven analytics lead who evolved from dashboard automation to spearheading cross-functional forecasting systems. Exceptional growth velocity with high transferable modeling capability.',
      sub_scores: {
        skill_match: 78,
        test_score: 82,
        growth_signals: 92,
        skill_adjacency: 85,
      },
      tags: ['Fast-Track Lead', 'Forecasting', 'High Transferability'],
      skill_match_detail: {
        matched_skills: ['Python', 'SQL', 'Machine Learning', 'Scikit-learn', 'Tableau'],
        relevant_skills: ['Product Analytics', 'Demand Forecasting', 'Cross-functional Collaboration'],
        gaps: ['Distributed Training', 'PyTorch/CUDA'],
        reasoning: [
          { claim: 'Production Python & SQL Delivery', evidence: 'Built demand forecasting models and enterprise SQL queries supporting $12M quarterly inventory decisions.' },
          { claim: 'Direct Model-to-Product Impact', evidence: 'Partnered directly with product teams to ship 14% improvement in forecast accuracy.' }
        ]
      },
      test_score_detail: {
        certifications: ['Google Advanced Data Analytics Professional', 'IBM Applied Data Science Capstone'],
        tests: ['Machine Learning Systems Assessment — 88%', 'SQL Performance Diagnostics — 92%'],
        reasoning: [
          { claim: 'Verified Statistical Foundation', evidence: 'Completed Google Advanced Data Analytics with highest quartile capstone project review.' }
        ]
      },
      growth_signals_detail: {
        timeline: [
          { date: '2021', role: 'Junior Data Analyst', company: 'LogiData Tech', complexity: 'Automated 40+ recurring reports using Python and Airflow.' },
          { date: '2023', role: 'Senior Data Analyst', company: 'LogiData Tech', complexity: 'Owned demand forecasting algorithms and ran stakeholder discovery for 3 product squads.' },
          { date: '2025', role: 'Analytics Lead', company: 'HyperMetrics', complexity: 'Promoted in 14 months to lead a 3-person pod delivering production ML services.' }
        ],
        reasoning: [
          { claim: 'Accelerated Career Velocity', evidence: 'Progressed from report automation to strategic lead in 4 years, beating typical median of 7 years.' },
          { claim: 'Compound Leadership Scope', evidence: 'Transitioned individual contributor work into mentorship and hiring accountability.' }
        ]
      },
      skill_adjacency_detail: {
        candidate_has: ['Demand Forecasting', 'Causal Impact Analysis', 'A/B Experimentation', 'Tableau Storytelling'],
        job_requires: ['Predictive ML', 'Business Problem Framing', 'Executive Communication'],
        transferability_score: 88,
        reasoning: [
          { claim: 'Seamless Transition from Forecasting to ML', evidence: 'Time-series forecasting utilizes the identical feature engineering and residual loss minimizations required by the core ML requirements.' },
          { claim: 'Stakeholder Fluency', evidence: 'Demonstrated history of translating ambiguity into concrete technical specifications.' }
        ]
      },
      interview_guide: [
        {
          category: 'Skill Transferability',
          question: 'In your forecasting work at LogiData, how did you handle out-of-distribution shifts, and how would you apply those heuristics to our customer churn prediction models?',
          look_for: 'Clarity on covariate shift, validation splits, and understanding of model decay.'
        },
        {
          category: 'Leadership & Velocity',
          question: 'You progressed rapidly to lead a 3-person team. What was the steepest learning curve when shifting from individual model authoring to peer code reviews and architectural oversight?',
          look_for: 'Self-awareness, ability to delegate, and focus on code maintainability.'
        }
      ],
      resume_text: `Rahul Kumar
Data Scientist & Analytics Lead
Contact: rahul.kumar@example.com | Bengaluru, India

Summary:
Product-minded data professional with 5+ years of experience bridging analytics, predictive modeling, and executive decision-making. Built demand forecasting systems in Python/SQL and led high-performing analytics teams.

Experience:
- Analytics Lead | HyperMetrics (2025 – Present)
  * Headed 3-person analytics team delivering real-time predictive models.
  * Partnered with product and engineering VP to deploy anomaly detection on transaction pipelines.
- Senior Data Analyst | LogiData Tech (2023 – 2025)
  * Built automated demand forecasting pipeline driving 14% waste reduction.
  * Authored clean SQL models and scheduled Airflow DAGs.
- Junior Data Analyst | LogiData Tech (2021 – 2023)
  * Automated 40+ manual Excel processes using Python scripts.

Skills & Certifications:
- Languages: Python, SQL, R
- Frameworks: Scikit-learn, Pandas, NumPy, Statsmodels, FastAPI
- Tools: Tableau, Airflow, Git, Docker
- Google Advanced Data Analytics Certificate`
    },
    {
      id: 'c2',
      name: 'Maya Patel',
      role_title: 'Senior ML Engineer & Systems Specialist',
      archetype: 'Technical Depth Specialist',
      resume_filename: 'Maya_Patel_Resume.docx',
      analyzed_at: '2026-09-22T10:02:00Z',
      avatar_seed: 'MP',
      summary: 'Deep infrastructure and ML engineering specialist with strong hands-on AWS, Docker, and NLP pipeline deployment track record. Highest verified technical benchmark.',
      sub_scores: {
        skill_match: 88,
        test_score: 91,
        growth_signals: 84,
        skill_adjacency: 79,
      },
      tags: ['Top Technical Match', 'MLOps Specialist', 'AWS Certified'],
      skill_match_detail: {
        matched_skills: ['Python', 'Machine Learning', 'AWS', 'Docker', 'NLP', 'Model Monitoring'],
        relevant_skills: ['FastAPI', 'Kubernetes', 'CI/CD Pipelines'],
        gaps: ['Product Experimentation', 'User Discovery'],
        reasoning: [
          { claim: 'Production Grade Engineering', evidence: 'Architected automated model retraining and drift detection pipelines processing 2M daily requests on AWS.' },
          { claim: 'High Systems Reliability', evidence: 'Maintained 99.9% uptime for B2B SaaS inference microservices.' }
        ]
      },
      test_score_detail: {
        certifications: ['AWS Certified Machine Learning – Specialty', 'TensorFlow Developer Certificate'],
        tests: ['ML Systems Practical Architecture — 94%', 'Distributed Python Coding — 89%'],
        reasoning: [
          { claim: 'Top Decile Engineering Validation', evidence: 'Achieved 94% on simulated high-concurrency model deployment test.' }
        ]
      },
      growth_signals_detail: {
        timeline: [
          { date: '2022', role: 'Software Engineer (Data)', company: 'CognitiveScale', complexity: 'Built data ingest microservices in Python & Docker.' },
          { date: '2024', role: 'Machine Learning Engineer', company: 'Veritas AI', complexity: 'Shipped production transformer NLP models for customer ticket classification.' },
          { date: '2026', role: 'Senior ML Engineer & Mentor', company: 'Veritas AI', complexity: 'Spearheaded ML platform refactor reducing inference latency by 45%.' }
        ],
        reasoning: [
          { claim: 'Steady Deep Technical Climb', evidence: 'Demonstrated continuous architectural ownership progression across enterprise platforms.' }
        ]
      },
      skill_adjacency_detail: {
        candidate_has: ['NLP Transformer Architectures', 'MLOps Infrastructure', 'Cloud Microservices'],
        job_requires: ['Business Analytics', 'Product Metric Framing'],
        transferability_score: 79,
        reasoning: [
          { claim: 'Strong Systems Anchor to Business Metric Instrumentation', evidence: 'Deep instrumentation knowledge enables rapid setup of business KPI tracking alongside latency metrics.' }
        ]
      },
      interview_guide: [
        {
          category: 'Product & Business Alignment',
          question: 'Your engineering depth is impressive. When building models, how do you decide whether a 2% improvement in F1-score is worth the added compute cost and inference latency for product users?',
          look_for: 'Commercial pragmatism over purely academic optimization.'
        }
      ],
      resume_text: `Maya Patel
Senior ML Engineer
Contact: maya.patel@example.com | Hyderabad, India

Summary:
Specialized ML Engineer with 4.5+ years building and deploying scalable machine learning systems in production. Expert in Python, AWS infrastructure, containerization, and real-time model monitoring.

Experience:
- Senior ML Engineer | Veritas AI (2024 – Present)
  * Built NLP classification pipeline serving 2M daily requests on AWS ECS/Fargate.
  * Reduced P99 latency from 180ms to 98ms through ONNX quantization.
- Software Engineer (Data) | CognitiveScale (2022 – 2024)
  * Built internal ETL services and Kafka consumers.
  * Containerized internal analytics tools with Docker.

Certifications:
- AWS Certified Machine Learning – Specialty (2024)
- TensorFlow Developer Certificate (2023)`
    },
    {
      id: 'c3',
      name: 'Aisha Williams',
      role_title: 'Staff Product Analyst & Experimentation Architect',
      archetype: 'Product Impact & Experimentation Specialist',
      resume_filename: 'Aisha_Williams_Profile.pdf',
      analyzed_at: '2026-09-22T10:04:00Z',
      avatar_seed: 'AW',
      summary: 'Exceptional product strategist with the highest skill adjacency and business empathy score. Translates messy user behaviors into rigorous causal tests and machine learning inputs.',
      sub_scores: {
        skill_match: 82,
        test_score: 76,
        growth_signals: 88,
        skill_adjacency: 93,
      },
      tags: ['Highest Adjacency', 'Causal Testing', 'Product Mindset'],
      skill_match_detail: {
        matched_skills: ['SQL', 'Python', 'A/B Testing', 'Product Analytics', 'Looker'],
        relevant_skills: ['User Cohort Analysis', 'dbt Data Modeling', 'Feature Engineering'],
        gaps: ['Deep Neural Networks', 'Low-level C++ / CUDA'],
        reasoning: [
          { claim: 'Unmatched Product-to-Data Translation', evidence: 'Designed 50+ experimental rollouts resulting in $4.2M annualized GMV expansion.' },
          { claim: 'Rigorous Causal Methodologies', evidence: 'Implemented synthetic control groups and cuped variance reduction methods in Python.' }
        ]
      },
      test_score_detail: {
        certifications: ['dbt Analytics Engineering Fundamentals', 'Reforge Growth & Experimentation Series'],
        tests: ['Product Analytics & Experiment Design Case — 89%', 'SQL Practical Assessment — 85%'],
        reasoning: [
          { claim: 'Empirical Experimentation Rigor', evidence: 'Consistently validated on statistical methodology tests and clean dbt workflows.' }
        ]
      },
      growth_signals_detail: {
        timeline: [
          { date: '2021', role: 'Reporting Analyst', company: 'ShopPulse', complexity: 'Managed Looker explores and company KPI dashboards.' },
          { date: '2023', role: 'Product Data Analyst', company: 'ShopPulse', complexity: 'Embedded with Search squad to design ranking test evaluation metrics.' },
          { date: '2025', role: 'Senior Product Analyst', company: 'FinFlow Marketplace', complexity: 'Formulated end-to-end experiment strategy across 4 cross-functional squads.' }
        ],
        reasoning: [
          { claim: 'Rapid Domain Authority Growth', evidence: 'Evolved from reporting analyst into the strategic owner of testing across an entire marketplace.' }
        ]
      },
      skill_adjacency_detail: {
        candidate_has: ['A/B Experimentation', 'Customer Journey Mapping', 'Causal Inference', 'dbt'],
        job_requires: ['Machine Learning', 'Business Problem Framing', 'Forecasting'],
        transferability_score: 93,
        reasoning: [
          { claim: 'Direct Feature Ideation Superiority', evidence: 'Product analysts with causal experimentation mastery construct significantly more predictive feature representations than pure engineers.' }
        ]
      },
      interview_guide: [
        {
          category: 'Technical Modeling Expansion',
          question: 'You excel at experimentation and feature design. When building an automated classifier rather than an A/B test, what safeguards do you implement against data leakage?',
          look_for: 'Clear grasp of temporal split vs random k-fold validation.'
        }
      ],
      resume_text: `Aisha Williams
Product Data Analyst & Experimentation Lead
Contact: aisha.williams@example.com | London, UK

Summary:
Product data leader with 5 years driving user experimentation and quantitative discovery. Deep expertise in SQL, Python, dbt, and translating user friction into concrete metrics.

Experience:
- Senior Product Analyst | FinFlow Marketplace (2025 – Present)
  * Architected measurement framework for merchant onboarding flow.
  * Formulated A/B testing standards for 4 squads.
- Product Analyst | ShopPulse (2023 – 2025)
  * Built search ranking evaluation suite in Python.
- Reporting Analyst | ShopPulse (2021 – 2023)
  * Standardized Looker metrics across finance and marketing.

Certifications:
- dbt Certified Developer
- Reforge Growth & Experimentation Series`
    },
    {
      id: 'c4',
      name: 'Daniel Lee',
      role_title: 'BI Analyst & Aspiring ML Practitioner',
      archetype: 'Disciplined Upskiller',
      resume_filename: 'Daniel_Lee_Resume.pdf',
      analyzed_at: '2026-09-22T10:06:00Z',
      avatar_seed: 'DL',
      summary: 'Solid business intelligence specialist with structured operational instincts. Actively transitioning into machine learning via guided capstones and certifications.',
      sub_scores: {
        skill_match: 67,
        test_score: 73,
        growth_signals: 79,
        skill_adjacency: 74,
      },
      tags: ['Upskilling', 'SQL Expert', 'BI Specialist'],
      skill_match_detail: {
        matched_skills: ['SQL', 'Power BI', 'Excel', 'Data Modeling'],
        relevant_skills: ['Operational Analytics', 'Python (Transitioning)'],
        gaps: ['Production ML Deployment', 'Advanced Algorithms'],
        reasoning: [
          { claim: 'Reliable Enterprise Data Core', evidence: 'Architected automated executive reporting pipelines used daily by C-suite executives.' }
        ]
      },
      test_score_detail: {
        certifications: ['Microsoft Power BI Data Analyst (PL-300)', 'Coursera Machine Learning Specialization'],
        tests: ['SQL Query Optimization — 84%', 'Python Core Basics — 72%'],
        reasoning: [
          { claim: 'Committed to Upskilling Path', evidence: 'Completed verified ML curriculum with multiple portfolio repositories.' }
        ]
      },
      growth_signals_detail: {
        timeline: [
          { date: '2022', role: 'Junior BI Analyst', company: 'Apex Logistics', complexity: 'Maintained operational supply chain dashboards.' },
          { date: '2024', role: 'BI Analyst II', company: 'Apex Logistics', complexity: 'Spearheaded migration of legacy spreadsheets to automated Power BI models.' },
          { date: '2026', role: 'Senior Analytics Specialist', company: 'Apex Logistics', complexity: 'Piloting predictive demand forecasting using Python.' }
        ],
        reasoning: [
          { claim: 'Consistent Discipline', evidence: 'Consistently delivered flawless data integrity while independently studying predictive analytics.' }
        ]
      },
      skill_adjacency_detail: {
        candidate_has: ['Supply Chain Operations', 'Data Modeling', 'Executive Reporting'],
        job_requires: ['Machine Learning', 'Product Analytics'],
        transferability_score: 74,
        reasoning: [
          { claim: 'Strong Business Intuition', evidence: 'Operational domain context ensures candidate won’t build theoretically correct but practically useless models.' }
        ]
      },
      interview_guide: [
        {
          category: 'Learning Velocity',
          question: 'Walk us through a machine learning concept that you struggled with initially during your self-study, and how you eventually mastered and implemented it in code.',
          look_for: 'Grit, problem-solving persistence, and authentic hands-on curiosity.'
        }
      ],
      resume_text: `Daniel Lee
Business Intelligence & Data Analyst
Contact: daniel.lee@example.com | Singapore

Summary:
Analytics specialist with 4+ years delivering data pipelines and business dashboards for operations and finance. Actively advancing skills in Python and machine learning algorithms.

Experience:
- Senior Analytics Specialist | Apex Logistics (2024 – Present)
  * Automated data pipelines connecting ERP to Power BI.
  * Authored optimized SQL stored procedures reducing query runtimes by 60%.
- Junior BI Analyst | Apex Logistics (2022 – 2024)
  * Managed KPI reporting for warehouse logistics.

Skills:
- SQL (Advanced), Power BI, Python, Excel
- Certifications: Microsoft Certified Data Analyst (PL-300)`
    }
  ]
}
