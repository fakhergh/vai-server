import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { TokenPayload } from '@interfaces/auth.interface';

export function generate(payload: string | object | Buffer): string {
  const expiresIn = '7d';

  return sign(payload, SECRET_KEY, { expiresIn });
}

export function decode(token: string) {
  return verify(token, SECRET_KEY) as TokenPayload;
}
