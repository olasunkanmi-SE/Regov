import axios from "axios";
import { baseURL } from "../constants";

export const userApi = axios.create({
  baseURL: baseURL,
});

export const eventApi = axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
