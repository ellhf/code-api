import { Context } from "../deps.ts";
import { User } from "../models/User.ts";

export default {
  async getAllUsers(ctx: Context) {
    ctx.state.data = await User.all();
  },
  async addUser(ctx: Context) {
    const { username, password, aliasname } = ctx.state.body;
    ctx.state.data = await User.create({
      username,
      password,
      aliasname,
    });
  },
  async getUserById(ctx: Context) {
    ctx.state.data = (await User.where("id", ctx.state.params.id).all())[0];
  },
  async updateUserById(ctx: Context) {
    const { id } = ctx.state.params;
    const { username, password, aliasname } = ctx.state.body;
    ctx.state.data = await User.where("id", id).update({
      username,
      password,
      aliasname,
    });
  },
  async deleteUserById(ctx: Context) {
    const { id } = ctx.state.params;
    ctx.state.data = await User.deleteById(id);
  },
};
