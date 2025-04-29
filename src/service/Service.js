import axios from "axios";

const jwtTocken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGYuYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3NDU4MzQ0NjQsImV4cCI6MTc0NTg0MTY2NH0.d8YqQptpg5HPjtkswOqe0U0NRTLlQuajQG8PhB04RgU";

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
