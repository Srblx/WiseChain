// Interfaces
import { User } from './auth/auth.interface';

export interface Articles {
  id: string;
  title: string;
  summary: string;
  img: string;
  created_at: string;
  user: User;
  sequence_article: SequenceArticle[];
  category: {
    name: string;
  };
}

export interface SequenceArticle {
  id: string;
  index: number;
  title: string;
  containt: string;
  img: string;
}
