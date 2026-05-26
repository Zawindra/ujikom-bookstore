// SIMPAN TOKEN + USER DATA
export function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

// AMBIL TOKEN
export function getToken() {
  return localStorage.getItem("token");
}

// MENGECEK LOGIN
export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

// AMBIL USER
export function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}

// CEK ROLE ADMIN
export function isAdmin() {
  const u = getUser();
  return u && u.role === "admin";
}

// ROLE USER
export function isUser() {
  const u = getUser();
  return u && u.role === "user";
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// CART FUNCTIONS (baru, tidak ganggu fungsi lama)
export function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function clearCart() {
  localStorage.removeItem("cart");
}
