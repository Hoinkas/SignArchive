import * as argon2 from 'argon2';

export async function hashPassword(password: string) {
  const options: argon2.HashOptions = {
    type: argon2.argon2id, // Variant of Argon2
    memoryCost: 65536, // 64 MiB
    timeCost: 2, // 2 passes
    parallelism: 4, // 4 threads
    hashLength: 32, // 32 bytes output
  }

  try {
    const hash = await argon2.hash(password, options)
    return hash
  } catch (err) {
    console.error('Error hashing password:', err)
    throw err
  }
}

export async function verifyPassword(storedHash: string, providedPassword: string) {
  try {
    const isValid = await argon2.verify(storedHash, providedPassword)
    return isValid
  } catch (err) {
    console.error('Error during password verification:', err)
    return false
  }
}