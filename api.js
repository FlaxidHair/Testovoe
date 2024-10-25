import axios from "axios";

const apiUser = axios.create({
  baseURL: "https://retoolapi.dev/wHFLgA/data",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getUsers() {
    return apiUser.get("/");
  },
  getUsersActive() {
    return apiUser.get("?status=true");
  },
  getUsersInActiveList() {
    return apiUser.get("?status=false");
  },
  getSearchUser(params) {
    return apiUser.get("/", { params });
  },
  createUser(data) {
    return apiUser.post("/", data);
  },
  updateUser(id, data) {
    return apiUser.put(`/${id}`, data);
  },
  deleteUser(id) {
    return apiUser.delete(`/${id}`);
  },
};
