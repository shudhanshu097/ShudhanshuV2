import { assetPath } from "@/lib/asset-path";

export type Project = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  problem: string;
  data: string[];
  analysis: string[];
  result: string[];
  tools: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "tea-stall",
    title: "Monte Carlo Queuing Simulation",
    tag: "Simulation",
    summary:
      "Modeled a campus tea stall as a single-server FIFO queue using real transaction data and Monte Carlo simulation.",
    problem:
      "A campus tea stall runs on one server during rush hours. Can the current setup handle demand — and when does the queue break?",
    data: [
      "150+ real customer transactions observed across product mix, payment modes, and customer segments.",
      "Probability range tables built for products — Cigarettes 30.7%, College Students 38.7%.",
      "Raw data captured inter-arrival time, service time, waiting time, and revenue per transaction.",
    ],
    analysis: [
      "135 customers simulated via Monte Carlo random number generation in Excel.",
      "Total simulated revenue: ₹4,735 · Average revenue per customer: ₹35.",
      "54% of customers experience zero wait under normal load; rush periods create bottlenecks with one server.",
    ],
    result: [
      "Adding one additional server during rush hours would dramatically reduce waiting time.",
      "Most transactions complete in 1–2 minutes — system is efficient off-peak but fragile at peak.",
      "Data-backed staffing recommendation for the campus tea stall operations team.",
    ],
    tools: ["Excel", "Monte Carlo Simulation", "Probability Tables", "PCT Group 12"],
    accent: "from-amber-500/20 to-orange-600/10",
  },
  {
    slug: "siren-care",
    title: "Marketing Strategy Audit — Siren Care",
    tag: "Strategy",
    summary:
      "Comprehensive STP, competitive positioning, and SWOT analysis of a smart-sock diabetic foot ulcer prevention startup.",
    problem:
      "Diabetic foot care is a $43B+ silent crisis — 589M diabetics today, projected 853M by 2050. How should Siren Care position against entrenched competitors?",
    data: [
      "Competitive landscape mapped: Siren Care vs Podimetrics vs Orpyx vs Traditional Podiatry.",
      "Compared monitoring type, compliance rates, and insurance coverage across all players.",
      "Siren uniquely occupies high compliance + continuous monitoring — no competitor achieves both.",
    ],
    analysis: [
      "STP audit: segmentation by medical condition is strong, but '400M diabetics' TAM framing is too broad.",
      "B2C at $30/month is a barrier for 60%+ of diabetics; Medicare coverage is the strategic unlock.",
      "SWOT: 68% DFU reduction and 83% amputation risk reduction clinically validated; single-product reliance is a weakness.",
    ],
    result: [
      "Reposition from 'sock company' to smart-fabric health platform.",
      "Build a clinical data network effect through pharma and academic partnerships.",
      "Expand targeting to pre-diabetics and South/Southeast Asian markets.",
    ],
    tools: ["STP Framework", "SWOT", "Competitive Mapping", "Market Sizing"],
    accent: "from-violet-500/20 to-purple-600/10",
  },
  {
    slug: "olist",
    title: "Olist Brazilian E-Commerce Analysis",
    tag: "Analytics",
    summary:
      "Analyzed 100,000+ order records from the Olist public dataset to uncover customer, delivery, and revenue patterns.",
    problem:
      "Brazilian e-commerce marketplace Olist handles massive order volume — where are the bottlenecks in delivery performance and customer satisfaction?",
    data: [
      "100,000+ order records processed using Python (Pandas, NumPy).",
      "RFM segmentation applied to identify high-value customer cohorts.",
      "Delivery delay correlation with review scores isolated to find satisfaction drivers.",
    ],
    analysis: [
      "Revenue and order distribution mapped across product categories and Brazilian states.",
      "Geographic and category-level growth opportunities surfaced from the data.",
      "High-value customer segments identified for targeted retention strategies.",
    ],
    result: [
      "Targeted retention strategies recommended for high-RFM customer cohorts.",
      "Key delivery delay drivers identified as primary satisfaction risk factors.",
      "Category and state-level growth opportunities mapped for business action.",
    ],
    tools: ["Python", "Pandas", "NumPy", "RFM Segmentation", "Kaggle"],
    accent: "from-cyan-500/20 to-blue-600/10",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export const siteConfig = {
  name: "Shudhanshu Jaiswal",
  role: "Data & Business Analytics",
  institute: "IPM @ IIM Jammu",
  personalEmail: "shudhanshuj097@gmail.com",
  collegeEmail: "ipm25125@iimj.ac.in",
  phone: "+91 6306785451",
  resumePath: assetPath("/resume/Shudhanshu_Jaiswal_CV.pdf"),
  avatar: assetPath("/photos/portrait.png"),
  heroPortrait: assetPath("/photos/portrait.png"),
  photos: [
    assetPath("/photos/hero-tree.jpg"),
    assetPath("/photos/hero-dog-v2.jpg"),
    assetPath("/photos/hero-hiker.jpg"),
    assetPath("/photos/hero-peaks.jpg"),
  ],
};
