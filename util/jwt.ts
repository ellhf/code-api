import { create, Payload, verify } from "../deps.ts";
import { JWT_ALGORITHM, JWT_HEADER, JWT_SECRET } from "../config.ts";

export async function createToken(payload: Payload) {
  return await create(JWT_HEADER, payload, JWT_SECRET);
}

export async function verifyToken(token: string) {
  return await verify(token, JWT_SECRET, JWT_ALGORITHM);
}
