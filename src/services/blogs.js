import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.post(baseUrl, blog, config);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default { getAll, setToken, addBlog };
