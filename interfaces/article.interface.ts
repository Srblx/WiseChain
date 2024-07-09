// Interfaces 
import { User } from "./auth/auth.interface";

export interface Articles {
  id: string;
  title: string;
  summary: string;
  img: string;
  created_at: string;
  user: User;
  category: {
    name: string;
  };
  SequencesArticle: SequenceArticle[];
}

export interface SequenceArticle {
  id: string;
  index: number;
  title: string;
  content: string;
  img: string;
}
