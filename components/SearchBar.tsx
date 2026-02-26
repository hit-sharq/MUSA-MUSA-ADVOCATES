"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: "blog" | "practice-area" | "team"
  url: string
  excerpt?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
          setIsOpen(true)
        }
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchContent, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog":
        return "📝"
      case "practice-area":
        return "⚖️"
      case "team":
        return "👥"
      default:
        return "📄"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "blog":
        return "Blog Post"
      case "practice-area":
        return "Practice Area"
      case "team":
        return "Team Member"
      default:
        return "Page"
    }
  }

  return (
    <div ref={searchRef} style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search our website..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem 0.75rem 2.5rem",
            border: "2px solid #e2e8f0",
            borderRadius: "25px",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1a365d"
            query.length >= 2 && setIsOpen(true)
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666",
            fontSize: "1.2rem",
          }}
        >
          🔍
        </div>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #1a365d",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "400px",
            overflowY: "auto",
            marginTop: "0.5rem",
          }}
        >
          {results.length === 0 && !isLoading && (
            <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
              {query.length >= 2 ? "No results found" : "Start typing to search..."}
            </div>
          )}

          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              onClick={() => {
                setIsOpen(false)
                setQuery("")
              }}
              style={{
                display: "block",
                padding: "1rem",
                borderBottom: "1px solid #f7fafc",
                textDecoration: "none",
                color: "inherit",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f7fafc"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{getTypeIcon(result.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", color: "#1a365d", marginBottom: "0.25rem" }}>{result.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.25rem" }}>
                    {getTypeLabel(result.type)}
                  </div>
                  {result.excerpt && (
                    <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.4" }}>{result.excerpt}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
