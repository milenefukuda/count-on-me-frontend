import axios from "axios";

const apiURL = {
  development: "http://localhost:3000",
  production: "LINK DA API DEPLOYADA AQUI",
};

const api = axios.create({ baseURL: apiURL[process.env.NODE_ENV] });

export { api };
