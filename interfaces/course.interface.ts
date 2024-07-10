export interface Course {
  id: string;
  main_title: string;
  description: string;
  img: string;
  content: string;
  sequences: Sequence[];
  tools: Tool[];
}

export interface Sequence {
  id: string;
  index: number;
  title: string;
  containt: string;
  img: string | null;
}

export interface Tool {
  id: string;
  name: string;
  link: string;
  img: string;
}
