// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ajuste se for rodar em dispositivo físico
});

export default api;
