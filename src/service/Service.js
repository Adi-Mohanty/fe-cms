import axios from "axios";

const jwtTocken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQHdhdHNvby5jb20iLCJpYXQiOjE3NDU5OTY2NjAsImV4cCI6MTc0NjAxODI2MH0.Ef2vF9m6WSCP-32GBtEfNAcKfbNNiXf8iyhAWs7Qf-o";

const apiService = {
  get: async (url, params = {}) => {
    try {
      const response = await axios.get(url, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default apiService;
