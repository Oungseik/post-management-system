import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export const hash = (data: string) => bcrypt.hash(data, SALT_ROUND);

export const compare = bcrypt.compare;
