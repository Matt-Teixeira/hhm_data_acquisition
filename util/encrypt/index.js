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

// Example usage

/* 
philips_mr_user_1: 'remote'
philips_mr_pass_1: 'manager'
philips_mr_user_2: 'remote'
philips_mr_pass_2: 'Manager'
philips_mr_user_3: 'remote'
philips_mr_pass_3: 'MANAGER'
*/
/*  
const plainText = 'MANAGER';
const encryptedText = encryptString(plainText);
console.log('Encrypted:', encryptedText);
const decryptedText = decryptString(encryptedText);
console.log('Decrypted:', decryptedText);  
 */

module.exports = { encryptString, decryptString };
