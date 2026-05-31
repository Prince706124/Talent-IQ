import axiosInstance from "../lib/axios";

const buildHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sessionApi = {
  createSession: async (data, token) => {
    const response = await axiosInstance.post("/sessions", data, {
      headers: buildHeaders(token),
    });
    return response.data;
  },

  getActiveSessions: async (token) => {
    const response = await axiosInstance.get("/sessions/active", {
      headers: buildHeaders(token),
    });
    return response.data;
  },
  getMyRecentSessions: async (token) => {
    const response = await axiosInstance.get("/sessions/my-recent", {
      headers: buildHeaders(token),
    });
    return response.data;
  },

  getSessionById: async (id, token) => {
    const response = await axiosInstance.get(`/sessions/${id}`, {
      headers: buildHeaders(token),
    });
    return response.data;
  },

  joinSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`, null, {
      headers: buildHeaders(token),
    });
    return response.data;
  },
  leaveSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/leave`, null, {
      headers: buildHeaders(token),
    });
    return response.data;
  },
  endSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`, null, {
      headers: buildHeaders(token),
    });
    return response.data;
  },
  getStreamToken: async (token) => {
    const response = await axiosInstance.get(`/chat/token`, {
      headers: buildHeaders(token),
    });
    return response.data;
  },
};
