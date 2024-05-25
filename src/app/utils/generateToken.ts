import jwt, { Secret } from "jsonwebtoken";

interface IPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: IPayload,
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn });
};
