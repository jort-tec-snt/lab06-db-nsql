import User from "../models/User.js";

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findAll() {
    return User.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }
}

export default new UserRepository();