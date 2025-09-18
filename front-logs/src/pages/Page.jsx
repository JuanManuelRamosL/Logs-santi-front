import { useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambiar a tu backend Vercel

export default function Page({ path }) {
  useEffect(() => {
    axios.post(`${API_URL}/track`, { path }).catch(console.error);
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Página {path}</h1>
      <p>Visita registrada ✅</p>
    </div>
  );
}
