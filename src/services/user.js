import axios from "axios";
const baseUrl = "/api/login";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async (cred) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.post(baseUrl, cred, config);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default { login, setToken };
