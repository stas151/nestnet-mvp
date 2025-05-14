import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);
      const res = await axios.post("http://localhost:8000/auth/token", form);
      setToken(res.data.access_token);
      setError("");
    } catch (e) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex flex-col items-center justify-center font-mono">
      <h1 className="text-4xl font-bold mb-8 neon">NestNet Login</h1>
      {!token ? (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-80">
          <input
            className="w-full mb-4 p-2 bg-gray-700 border border-purple-500 rounded outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full mb-4 p-2 bg-gray-700 border border-purple-500 rounded outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
          <button
            onClick={login}
            className="w-full bg-purple-600 hover:bg-purple-800 transition p-2 rounded shadow-lg font-bold tracking-wide"
          >
            Войти
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">Добро пожаловать, агент NestNet.</p>
          <p className="text-sm text-green-400 break-all">Token: {token}</p>
        </div>
      )}
    </div>
  );
}