import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log({ error });
    return {
      valid: false,
      //@ts-ignore
      expired: (error.message = "jwt expired"),
      decoded: null,
    };
  }
}
