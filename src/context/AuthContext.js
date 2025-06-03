import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const login = ({ username, role }) => {
    setUser({ username, role });
  };

  // Perbaikan: Register ke backend
  const register = async (email, username, password, role) => {
    setAuthError(null);
    try {
      const response = await fetch("/api/users/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          role, // kirim role ke backend
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        setAuthError(err.message || "Gagal register");
        return false;
      }
      return true;
    } catch (err) {
      setAuthError("Gagal register: " + err.message);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
