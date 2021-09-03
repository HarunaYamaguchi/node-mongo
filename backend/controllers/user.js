import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "ユーザーが存在しません。" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    //元のパスワードと入力されたパスワードが一致しているか確認

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "無効なパスワードです。" });
    }

    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existUser, token });
  } catch (error) {
    res.status(500).json({ message: "何らかのエラーが発生しました" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "ユーザーはもうすでに存在しております。" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "パスワードが一致しません" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); //パスワードのハッシュ化
    const result = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "何らかのエラーが発生しました" });
  }
};
