const { scrypt, randomBytes, timingSafeEqual } = require('crypto');

const keylen = 64;

// hashes the password and returns the derived key using crypto.scrypt
const hash = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = randomBytes(16).toString("hex");
        scrypt(password, salt, keylen, (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

// compares the password with the hash
const compare = async (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const keyBuffer = Buffer.from(key, "hex");
        scrypt(password, salt, keylen, (err, derivedKey) => {
            if (err) reject(err);
            resolve(timingSafeEqual(keyBuffer, derivedKey));
        });
    });
};

exports.hash = hash;
exports.compare = compare;