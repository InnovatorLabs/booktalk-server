import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const checkPassword = (aPassword: string, password: string) => {
  return bcrypt.compare(aPassword, password);
};
