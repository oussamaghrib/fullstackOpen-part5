import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateNewBlog from "./components/CreateNewBlog";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [postBlogVisible, setPostBlogVisible] = useState(false);

  const hideWhenVisible = postBlogVisible === false ? "" : "none";
  const showWhenVisible = postBlogVisible === true ? "" : "none";

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await userService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (user === null || user === undefined) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <h4 style={{ display: "inline-block", marginRight: "0.75%" }}>
        {user.username} is logged in{" "}
      </h4>
      <button onClick={handleLogout}>logout</button>
      <div style={{ display: hideWhenVisible }}>
        <button
          onClick={() => {
            setPostBlogVisible(true);
          }}
        >
          create new blog
        </button>
      </div>
      <CreateNewBlog
        postBlogVisible={postBlogVisible}
        showWhenVisible={showWhenVisible}
        setBlogs={setBlogs}
      ></CreateNewBlog>
      <div>
        <button
          style={{ display: showWhenVisible }}
          onClick={() => {
            setPostBlogVisible(false);
          }}
        >
          cancel
        </button>{" "}
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
