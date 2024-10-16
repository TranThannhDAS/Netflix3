import axios from "axios";

const AxiosJava = axios.create({
  baseURL: "http://localhost:5227",
});

export default AxiosJava;

