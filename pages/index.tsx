import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/perfil";
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      setError("Erro na conexão com o servidor");
    }
  };

  return (
    <main style={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      <div style={{ maxWidth: 400, width: "100%", padding: 20, background: "#fff", borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin} style={{ width: "100%", padding: 10, background: "#1877f2", color: "#fff", border: "none", borderRadius: 5 }}>Entrar</button>
      </div>
    </main>
  );
}
