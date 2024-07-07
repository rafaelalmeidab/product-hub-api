
const crypto = require('crypto');

function createMD5Hash(string) {
  const hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}

function comparePassword(normalString, md5String) {
  const md5NormalString = createMD5Hash(normalString);
  return md5NormalString === md5String;
}

module.exports = {
  createMD5Hash,
  comparePassword
};