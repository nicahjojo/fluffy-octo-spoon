// lib/auth.js
export function isAdmin(user) {
  return user?.role === "admin";
}
