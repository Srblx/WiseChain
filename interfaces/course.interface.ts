export interface Course {
  id: string;
  mainTitle: string;
  description: string;
  img: string;
  content: string;
  difficulty: string;
  sequences: Sequence[];
  category: {
    id: string;
    name: string;
  };
  category_id: string;
  tools: Tool[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Sequence {
  // id: string;
  // index: number;
  title: string;
  content: string;
  img?: string | undefined;
  course_id?: string;
}


export interface Tool {
  id?: string;
  name: string;
  link: string;
  img: string;
}

export interface Category {
  id: string;
  name: string;
}