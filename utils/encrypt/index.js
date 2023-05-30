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
ge_cv_user_1: 'DLService'
ge_cv_pass_1: 'HEROIC'
ge_cv_user_2: 'DL_Service'
ge_cv_pass_2: 'HEROIC'
*/
/*  
const plainText = 'HEROIC';
const encryptedText = encryptString(plainText);
console.log('Encrypted:', encryptedText);
const decryptedText = decryptString(encryptedText);
console.log('Decrypted:', decryptedText); 

 */
module.exports = { encryptString, decryptString };
