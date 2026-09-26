import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
  normalizeHashtags(hashtags = "") {
    if (Array.isArray(hashtags)) {
      return hashtags.map((tag) => tag.trim()).filter(Boolean);
    }

    return hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  async getPosts() {
    return postRepository.findAll();
  }

  async getPostById(id) {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  }

  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return postRepository.create({
      title: postData.title,
      content: postData.content,
      hashtags: this.normalizeHashtags(postData.hashtags),
      imageUrl: postData.imageUrl,
      user: user._id,
    });
  }

  async updatePost(postId, userId, postData) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const post = await postRepository.update(postId, {
      title: postData.title,
      content: postData.content,
      hashtags: this.normalizeHashtags(postData.hashtags),
      imageUrl: postData.imageUrl,
      user: user._id,
    });

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  }

  async deletePost(postId) {
    const post = await postRepository.delete(postId);

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  }
}

export default new PostService();