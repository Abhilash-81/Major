export const checkValid = (password, email) => {
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isPasswordValid)
    return "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailRegex) return "Email is not valid";
  return null;
};
