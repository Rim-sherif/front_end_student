import api from '../config';
import type { ApiResponse, IQuiz } from '../types';

export const quizService = {
  getAllQuizzes: async (): Promise<ApiResponse<IQuiz[]>> => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  getQuizById: async (id: string): Promise<ApiResponse<IQuiz>> => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  createQuiz: async (quiz: Omit<IQuiz, '_id'>): Promise<ApiResponse<IQuiz>> => {
    const response = await api.post('/quizzes', quiz);
    return response.data;
  },

  updateQuiz: async (id: string, quiz: Partial<IQuiz>): Promise<ApiResponse<IQuiz>> => {
    const response = await api.put(`/quizzes/${id}`, quiz);
    return response.data;
  },

  deleteQuiz: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  }
}; 