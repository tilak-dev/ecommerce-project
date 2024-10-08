import bcryptjs from "bcryptjs";

export const passwordHasher = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const passwordCompare = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};
