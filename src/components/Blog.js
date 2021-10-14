import PropTypes from "prop-types";
import React from "react";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
