import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //AuthorizationヘッダーでBearerトークンとして提示されたトークンを処理
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
