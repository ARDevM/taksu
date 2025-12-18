import api from "../api/axios";

const AUTH_KEY = "taksu_auth";

/**
 * Simpan auth (token + user + role optional)
 */
export const saveAuth = ({ token, user, role }) => {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ token, user, role })
  );
};

/**
 * Ambil seluruh auth data
 */
export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};


export const getUser = () => {
  return getAuth()?.user ?? null;
};

export const isLoggedIn = () => {
  return !!getAuth()?.token;
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (err) {
  } finally {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/";
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
