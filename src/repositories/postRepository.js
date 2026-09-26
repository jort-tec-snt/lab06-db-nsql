import Post from "../models/Post.js";

class PostRepository {
  async create(postData) {
    return Post.create(postData);
  }

  async findAll() {
    return Post.find()
      .populate("user", "name lastName email")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return Post.findById(id).populate("user", "name lastName email");
  }

  async findByUser(userId) {
    return Post.find({ user: userId })
      .populate("user", "name lastName email")
      .sort({ createdAt: -1 });
  }

  async update(postId, postData) {
    return Post.findByIdAndUpdate(
      postId,
      { ...postData, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).populate("user", "name lastName email");
  }

  async delete(postId) {
    return Post.findByIdAndDelete(postId);
  }
}

export default new PostRepository();