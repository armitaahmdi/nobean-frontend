import { api } from './api';

const base = '/notifications';

export const fetchNotifications = (params = {}) => {
  const { limit = 20, unread_only = false } = params;
  const queryString = new URLSearchParams({ 
    limit: limit.toString(), 
    unread_only: unread_only.toString() 
  }).toString();
  return api.get(`${base}?${queryString}`);
};

export const markNotificationAsRead = (notificationId) => {
  return api.post(`${base}/${notificationId}/read`, {});
};

export const markAllNotificationsAsRead = () => {
  return api.post(`${base}/read-all`, {});
};

