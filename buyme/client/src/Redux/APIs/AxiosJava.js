import axios from "axios";

const AxiosJava = axios.create({
  baseURL: "http://localhost:8080",
});

export default AxiosJava;

