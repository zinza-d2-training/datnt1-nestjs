import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
export function comparePassword(
  password: string,
  hashedPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
