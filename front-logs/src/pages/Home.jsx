"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "./home.css"

const API_URL = "https://logs-back.onrender.com" // Cambiar a tu backend Vercel

export default function Home() {
  const [logs, setLogs] = useState([])
 const [clearing, setClearing] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)


  const handleClearLogs = async () => {
    const ok = window.confirm("¿Seguro que deseas eliminar todos los logs?")
    if (!ok) return

    try {
      setClearing(true)
      setErrorMsg(null)
      await axios.post(
        `${API_URL}/clear-logs`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      )
      await fetchLogs()
    } catch (error) {
      console.error("Error eliminando logs:", error)
      setErrorMsg("Ocurrió un error eliminando los logs.")
    } finally {
      setClearing(false)
    }
  }

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/logs`)
        setLogs(res.data)
      } catch (error) {
        console.error("Error obteniendo logs:", error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 2000) // cada 2s
    return () => clearInterval(interval)
  }, [])

  

  // Contador total y por página
  const total = logs.length
  const counts = logs.reduce((acc, log) => {
    acc[log.path] = (acc[log.path] || 0) + 1
    return acc
  }, {})

  return (
    <div className="logs-container">
      <div className="header-section">
        <h1 className="main-title">
          <span className="title-icon">📊</span>
          Logs en Tiempo Real
          <span className="total-badge">{total}</span>
        </h1>
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>Conectado</span>
        </div>
        
          <button
            className={`danger-button ${clearing ? "is-loading" : ""}`}
            onClick={handleClearLogs}
            disabled={clearing}
            aria-busy={clearing}
          >
            {clearing ? "Borrando..." : "Borrar logs"}
          </button>
      </div>

      <div className="stats-grid">
        {Object.entries(counts).map(([page, count]) => (
          <div key={page} className="stat-card">
            <div className="stat-path">{page}</div>
            <div className="stat-count">{count}</div>
            <div className="stat-label">visitas</div>
          </div>
        ))}
      </div>

      <div className="logs-terminal">
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="control-dot red"></div>
            <div className="control-dot yellow"></div>
            <div className="control-dot green"></div>
          </div>
          <div className="terminal-title">Terminal de Logs</div>
        </div>
        <div className="terminal-content">
          {logs.map((log, index) => (
            <div key={log.id} className="log-entry" style={{ animationDelay: `${index * 0.05}s` }}>
              <span className="log-timestamp">[{new Date(log.created_at).toLocaleTimeString()}]</span>
              <span className="log-path">{log.path}</span>
              <span className="log-separator">-</span>
              <span className="log-ip">{log.ip}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="no-logs">
              <div className="loading-spinner"></div>
              <span>Esperando logs...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
