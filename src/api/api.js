import axios from "axios";

const apiURL = {
  development: `${process.env.REACT_APP_API_URL}`,
  production: `${process.env.REACT_APP_API_URL}`,
};

const api = axios.create({ baseURL: apiURL[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');
  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }
  return config;
});

export { api };
