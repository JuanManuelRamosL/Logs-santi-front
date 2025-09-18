import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambiar a tu backend Vercel

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/logs`);
        setLogs(res.data);
      } catch (error) {
        console.error("Error obteniendo logs:", error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000); // cada 2s
    return () => clearInterval(interval);
  }, []);

  // Contador total y por página
  const total = logs.length;
  const counts = logs.reduce((acc, log) => {
    acc[log.path] = (acc[log.path] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Logs en vivo (Total: {total})
      </h1>
      <div className="mb-4">
        {Object.entries(counts).map(([page, count]) => (
          <div key={page}>{page}: {count} visitas</div>
        ))}
      </div>
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono h-[400px] overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id}>
            [{new Date(log.created_at).toLocaleTimeString()}] {log.path} - {log.ip}
          </div>
        ))}
      </div>
    </div>
  );
}
