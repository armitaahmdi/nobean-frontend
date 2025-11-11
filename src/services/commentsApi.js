import { api } from './api';

const base = '/comments';

export const fetchComments = ({ entityType, entityId }) => {
  const params = `?section_type=${encodeURIComponent(entityType)}&section_id=${encodeURIComponent(entityId)}`;
  return api.get(`${base}${params}`);
};

export const fetchReplies = ({ commentId, entityType, entityId }) => {
  const params = `?section_type=${encodeURIComponent(entityType)}&section_id=${encodeURIComponent(entityId)}`;
  return api.get(`${base}/${commentId}/replies${params}`);
};

export const createComment = ({ text, entityType, entityId, parentId = null }) => {
  const body = {
    text,
    section_type: entityType,
    section_id: entityId,
    parent_comment_id: parentId,
  };
  return api.post(`${base}`, body);
};

export const likeComment = (commentId) => api.post(`${base}/${commentId}/like`, {});
export const dislikeComment = (commentId) => api.post(`${base}/${commentId}/dislike`, {});
export const reportComment = (commentId, reason) => api.post(`${base}/${commentId}/report`, { reason });

export const updateComment = (commentId, text) => api.put(`${base}/${commentId}`, { text });
export const deleteComment = (commentId) => api.delete(`${base}/${commentId}`);

// تایید یا رد کامنت (برای ادمین)
export const moderateComment = (commentId, action) => api.post(`${base}/${commentId}/moderate`, { action });


