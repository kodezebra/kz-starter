import { nanoid } from "nanoid";

export const createId = (size = 10) => nanoid(size);