const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = "your-encryption-key"; // Replace with your secure encryption key

function encryptString(text) {
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptString(encryptedText) {
  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

/* let user = decryptString("d0abf2ee77ab55cf3399c4803dad8cb9");
let pass = decryptString("e916c81b9abf1adeb79ba47a5ac64364");

console.log("USER: " + user);
console.log("PASS: " + pass); */

module.exports = { encryptString, decryptString };
