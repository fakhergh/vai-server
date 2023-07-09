import { genSalt, hash } from 'bcryptjs';

/**
 * @method hashPassword
 * @param {string} password
 * @returns {Promise<string>} result
 * @description this result is the hashed password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(password, salt);
}
