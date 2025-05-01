import axios from "axios";

const jwtTocken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQHdhdHNvby5jb20iLCJpYXQiOjE3NDYwODAzMjMsImV4cCI6MTc0NjEwMTkyM30.pqYVRCAoEFmkEQT0dmVHEOuf8yDCyfzjUfXx4Tv3KQk";

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
