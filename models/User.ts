import { DataTypes, Model } from "../deps.ts";

export class User extends Model {
  static table = "user";

  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 16,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 32,
    },
    aliasname: {
      type: DataTypes.STRING,
      allowNull: true,
      length: 16,
    },
  };
}
