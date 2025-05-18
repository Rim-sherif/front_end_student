export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface IQuiz {
  _id?: string;
  title: string;
  description: string;
  questions: IQuestion[];
  timeLimit: number;
  passingScore: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnnouncement {
  _id?: string;
  title: string;
  content: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
}; 