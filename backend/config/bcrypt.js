// This file will hash passwords using bcrypt
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const bcryptPepper = process.env.BCRYPT_PEPPER;

function addPepper(plainTextPassword) {
  return `${plainTextPassword}${bcryptPepper}`;
}

export async function hashPassword(plainTextPassword) {
  try {
    const toHash = addPepper(plainTextPassword);
    return bcrypt.hash(toHash, bcryptSaltRounds);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
}

export async function comparePassword(plainTextPassword, hashedPassword) {
  try {
    const toCheck = addPepper(plainTextPassword);
    return bcrypt.compare(toCheck, hashedPassword);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw new Error('Password comparison failed');
  }
}

// Express middleware to hash password before saving user
export function hashPasswordMiddleware(field = 'password') {
  return async (req, _res, next) => {
    try {
      if (
        req.body &&
        typeof req.body[field] === 'string' &&
        req.body[field].length > 0
      ) {
        req.body[field] = await hashPassword(req.body[field]);
      }
    } catch (error) {
      next(error);
    }
  };
}
