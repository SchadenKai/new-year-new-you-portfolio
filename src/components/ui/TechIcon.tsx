import React from 'react';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiFastapi, 
  SiPostgresql, SiFirebase, SiDocker, SiAmazon, SiGooglecloud, SiTerraform, 
  SiAnsible, SiGithubactions, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiOpenai, SiJupyter, SiMysql, SiVercel, SiKubernetes
} from 'react-icons/si';
import { FaDatabase, FaRobot, FaBrain, FaCode, FaServer, FaCloud } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

export const TechIcons: Record<string, React.ElementType> = {
  // Frontend
  "ReactJS": SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "TailwindCSS": SiTailwindcss,
  "Ionic": SiReact, // No specific Ionic icon in some versions, using React as fallback or generic
  "HTML": FaCode,
  
  // Backend
  "Python": SiPython,
  "FastAPI": SiFastapi,
  "Node.js (Express)": FaServer,
  "Express.js": FaServer,
  "PHP": FaCode,
  "SQLAlchemy": FaDatabase,
  "SQLModel": FaDatabase,
  "Pydantic": FaCode,
  "PydanticAI": FaRobot,

  // AI/ML
  "LangChain": FaBrain, // Generic AI
  "LangGraph": FaBrain,
  "LangSmith": FaBrain,
  "RAG Systems": FaBrain,
  "PyTorch": SiPytorch,
  "Scikit-learn": SiScikitlearn,
  "Pandas": SiPandas,
  "Numpy": SiNumpy,
  "Openai": SiOpenai,
  "OpenAI API": SiOpenai,
  "Jupyter Notebook": SiJupyter,
  "Computer Vision": FaBrain,
  "Deep Learning": FaBrain,
  "Adversarial Training": FaBrain,
  
  // Database
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Firestore": SiFirebase,
  "Firebase": SiFirebase,
  "Supabase": FaDatabase,

  // DevOps
  "Docker": SiDocker,
  "Terraform": SiTerraform,
  "Ansible": SiAnsible,
  "GitHub Actions": SiGithubactions,
  "AWS": SiAmazon,
  "Google Cloud": SiGooglecloud,
  "Azure": FaCloud,
  "Hetzner": FaCloud,
  "Traefik": FaCloud, // Fallback
  "Kubernetes": SiKubernetes,
  
  // Categories
  "AI & Machine Learning": FaBrain,
  "Back-end Development": FaServer,
  "Front-end Development": FaCode,
  "DevOps & Cloud": FaCloud,
  "Database": FaDatabase,
  "Vercel": SiVercel,
  
  // Generic
  "IoT": FaCloud,
};

type Props = {
  name: string;
  className?: string;
};

export function TechIcon({ name, className }: Props) {
  // Normalize name for lookup (optional, but good for robust matching)
  // For now simple lookup
  const Icon = TechIcons[name] || FaCode; // Fallback to Code icon
  
  return <Icon className={className} />;
}
