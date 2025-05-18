import api from '../config';
import type { ApiResponse, IAnnouncement } from '../types';

export const announcementService = {
  getAllAnnouncements: async (): Promise<ApiResponse<IAnnouncement[]>> => {
    const response = await api.get('/announcements');
    return response.data;
  },

  getAnnouncementById: async (id: string): Promise<ApiResponse<IAnnouncement>> => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },

  createAnnouncement: async (announcement: Omit<IAnnouncement, '_id'>): Promise<ApiResponse<IAnnouncement>> => {
    const response = await api.post('/announcements', announcement);
    return response.data;
  },

  updateAnnouncement: async (id: string, announcement: Partial<IAnnouncement>): Promise<ApiResponse<IAnnouncement>> => {
    const response = await api.put(`/announcements/${id}`, announcement);
    return response.data;
  },

  deleteAnnouncement: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  }
}; 