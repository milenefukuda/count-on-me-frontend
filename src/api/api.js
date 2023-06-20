import axios from "axios";

const apiURL = {
  development: "http://localhost:4000",
  production: "LINK DA API DEPLOYADA AQUI",
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
