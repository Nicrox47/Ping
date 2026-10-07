export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string) {
  return password.length >= 8;
}

export function validateName(name: string) {
  return name.trim().length >= 2;
}
