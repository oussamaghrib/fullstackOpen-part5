import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [user, setUser] = useState(null);
  const [postBlogVisible, setPostBlogVisible] = useState(false);

  const showWhenVisible = postBlogVisible === true ? "" : "none";
  const hideWhenVisible = postBlogVisible === false ? "" : "none";

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

  const postBlog = async (e) => {
    e.preventDefault();

    const blogObject = {
      title,
      author,
      url: blogUrl,
    };
    try {
      await blogService.addBlog(blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setTitle("");
      setAuthor("");
      setBlogUrl("");
    } catch (e) {
      console.log(e);
    }
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
      <div style={{ display: showWhenVisible }}>
        <h3> Create New </h3>

        <form onSubmit={postBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              value={blogUrl}
              name="title"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">post a blog</button>
          <div>
            <button
              onClick={() => {
                setPostBlogVisible(false);
              }}
            >
              cancel
            </button>{" "}
          </div>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
