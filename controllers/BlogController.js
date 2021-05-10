const db = require("../models");

class BlogController {
  index = async (req, res) => {
    res.send("index blog page");
  };
  create = async (req, res) => {
    const { id, username } = req.app.locals.credential;
    const { title, body } = req.body;

    const blog = await db.blog.create({
      user_id: id,
      title,
      body,
      author: username,
    });
    if (!blog) {
      return res.status(401).json({
        message: "failed to create blog",
      });
    }

    return res.status(200).json({
      message: "success created blog",
      data: blog,
    });
  };
  show = async (req, res) => {};
  update = async (req, res) => {};
  delete = async (req, res) => {};
}

module.exports = new BlogController();
