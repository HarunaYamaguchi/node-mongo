import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //AuthorizationヘッダーでBearerトークンとして提示されたトークンを処理
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //500以上はGoogleログイン

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //googleユーザーの区別のため
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
