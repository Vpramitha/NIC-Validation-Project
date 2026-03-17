import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/nic"
});

// Add interceptor to include token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Upload files
export const uploadFiles = (formData) => {
  return API.post("/upload", formData)
    .then((response) => {
      console.log("Upload successful:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Upload failed:", error);
      throw error;
    });
};

// Get all NICs
export const getAllNICs = () => {
  return API.get("/all")
    .then(res => res.data)
    .catch(error => { throw error; });
};

// Get NICs by file
export const getNICsByFile = (filename) => {
  return API.get(`/file/${filename}`)
    .then(res => res.data)
    .catch(error => { throw error; });
};

// Get summary
export const getSummary = async () => {
  try {
    const response = await API.get("/summary");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};