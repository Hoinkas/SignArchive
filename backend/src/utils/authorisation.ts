const argon2 = require('argon2')

export async function hashPassword(password: string) {
  const options = {
    type: argon2.argon2id, // Variant of Argon2
    memoryCost: 65536, // 64 MiB
    timeCost: 2, // 2 passes
    parallelism: 4, // 4 threads
    hashLength: 32, // 32 bytes output
    saltLength: 16 // 16 bytes salt
    // You can also provide your own salt:
    // salt: crypto.randomBytes(16)
  }

  try {
    // Hash the password (salt is generated automatically by default)
    const hash = await argon2.hash(password, options)
    return hash
  } catch (err) {
    console.error('Error hashing password:', err)
    throw err
  }
}

// Example usage
// hashPassword('super_secret_password')
//   .then((hash) => console.log('Hashed password:', hash))
//   .catch((err) => console.error(err))
// This will produce something like:
// $argon2id$v=19$m=65536,t=3,p=4$G8NYSxrA+UMGHJbZVIXXXQ$UrHyBcYfCEms+92QVzGmfYqrWtH54WJY9FuROBQi/X8

export async function verifyPassword(storedHash: string, providedPassword: string) {
  try {
    const isValid = await argon2.verify(storedHash, providedPassword)
    return isValid
  } catch (err) {
    console.error('Error during password verification:', err)
    return false
  }
}

// Example usage
// const storedHash = '$argon2id$v=19$m=65536,t=3,p=4$G8NYSxrA+UMGHJbZVIXXXQ$UrHyBcYfCEms+92QVzGmfYqrWtH54WJY9FuROBQi/X8';

// verifyPassword(storedHash, 'super_secret_password')
//     .then(isValid => {
//         if (isValid) {
//             console.log('Password is correct!');
//         } else {
//             console.log('Password is incorrect!');
//         }
//     })
//     .catch(err => console.error(err));
