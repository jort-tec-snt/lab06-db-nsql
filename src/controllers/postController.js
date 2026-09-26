import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  async index(req, res) {
    try {
      const posts = await postService.getPosts();
      res.render("posts/index", { posts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async createForm(req, res) {
    try {
      const users = await userRepository.findAll();

      res.render("posts/form", {
        title: "Nuevo Post",
        post: {},
        users,
        action: "/posts",
        error: null,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    try {
      await postService.createPost(req.body.userId, req.body);
      res.redirect("/posts");
    } catch (error) {
      const users = await userRepository.findAll();

      res.status(400).render("posts/form", {
        title: "Nuevo Post",
        post: req.body,
        users,
        action: "/posts",
        error: error.message,
      });
    }
  }

  async editForm(req, res) {
    try {
      const [post, users] = await Promise.all([
        postService.getPostById(req.params.id),
        userRepository.findAll(),
      ]);

      res.render("posts/form", {
        title: "Editar Post",
        post,
        users,
        action: `/posts/${post._id}`,
        error: null,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  async update(req, res) {
    try {
      await postService.updatePost(req.params.id, req.body.userId, req.body);
      res.redirect("/posts");
    } catch (error) {
      const users = await userRepository.findAll();

      res.status(400).render("posts/form", {
        title: "Editar Post",
        post: { ...req.body, _id: req.params.id },
        users,
        action: `/posts/${req.params.id}`,
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts");
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}

export default new PostController();