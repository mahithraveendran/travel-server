import jwt, { Secret } from "jsonwebtoken";

interface IPayload {
  id: string;
  email: string;
}

export const generateToken = (
  payload: IPayload,
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn });
};
