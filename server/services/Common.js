const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          reject(err);
        }
        resolve(hashedPassword);
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.compareHashedPassword = (password, hashedPasswordFromDatabase) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.compare(password, hashedPasswordFromDatabase, (err, result) => {
        if (err) {
          reject(false);
        }
        resolve(result);
      });
    } catch (error) {
      reject(false);
    }
  });
};
