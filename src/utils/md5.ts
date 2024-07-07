import crypto from 'crypto';

export function createMD5Hash(string: string): string {
  const hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}

export function comparePassword(normalString: string, md5String: string): boolean {
  const md5NormalString = createMD5Hash(normalString);
  return md5NormalString === md5String;
}