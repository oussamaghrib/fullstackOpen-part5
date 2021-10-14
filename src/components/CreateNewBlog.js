import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes, { string } from "prop-types";
const CreateNewBlog = ({ setBlogs, showWhenVisible }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

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

  return (
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
      </form>
    </div>
  );
};

CreateNewBlog.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  blogUrl: PropTypes.string,
  setBlogs: PropTypes.func,
  showWhenVisible: string,
};

export default CreateNewBlog;
