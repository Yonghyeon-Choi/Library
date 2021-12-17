import axios from "axios";
import {serverURL} from "./serverURL";

const API_URL = serverURL + "/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          if(response.data.roles[0] === 'ROLE_ADMIN') {
            localStorage.setItem("adminToken", true);
          } else if(response.data.roles[0] === 'ROLE_USER'){
            localStorage.setItem("userToken", true);
          }
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
  }

  register(username, email, password, organ) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
