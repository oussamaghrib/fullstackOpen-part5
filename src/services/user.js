import axios from "axios";
const baseUrl = "/api/login";

const login = async (cred) => {
  try {
    const res = await axios.post(baseUrl, cred);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default { login };
