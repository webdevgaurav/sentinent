import axios from "axios";
import { BASE_URL } from "../../config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function refreshToken(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/refreshToken")
      .then((res) => {
        if (res.data.message === "Token generated successfully") {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        resolve(false);
      });
  });
}

export function isLoggedIn(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/auth/status")
      .then((res) => {
        if (res.data.loggedIn) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(async (error) => {
        if (
          error.response.data.message ===
          "Authentication failed. Access token expired"
        ) {
          const isGenerated = await refreshToken();
          resolve(isGenerated);
        } else {
          resolve(false);
        }
      });
  });
}
