const db = require("../models");

class BlogController {
  index = async (req, res) => {
    const blogs = await db.blog.findAll();
    res.status(200).json({
      message: "success get all blogs",
      data: blogs,
    });
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

  show = async (req, res) => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    const blog = await db.blog.findOne({
      where: { id, user_id },
    });
    if (!blog) {
      return res.status(401).json({
        message: "blog not found",
      });
    }

    return res.status(200).json({
      message: "success get blog",
      data: blog,
    });
  };

  update = async (req, res) => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;
    const { title, body } = req.body;

    const blog = await db.blog.update(
      {
        title,
        body,
      },
      {
        where: { id, user_id },
      }
    );
    if (!blog) {
      return res.status(401).json({
        message: "update blog failed",
      });
    }

    return res.status(200).json({
      message: "success update blog",
    });
  };

  delete = async (req, res) => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    await db.blog.destroy({
      where: { id, user_id },
    });

    return res.status(200).json({
      message: "success delete blog",
    });
  };
}

module.exports = new BlogController();
