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

/*
let user = decryptString("5ca00ad0c8ac54d2746e9afaa0df329f");
let pass = decryptString("7f7fc85e3ae2943738b6f0f9659c63e7");

console.log("USER: " + user);
console.log("PASS: " + pass);
*/

module.exports = { encryptString, decryptString };
