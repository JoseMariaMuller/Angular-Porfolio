export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;  
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}