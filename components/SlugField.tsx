"use client"

import { useEffect, useRef, useState } from "react"
import { slugify } from "@/lib/slugify"

interface SlugFieldProps {
  source: string
  value: string
  onChange: (slug: string) => void
  prefix?: string
  id?: string
  placeholder?: string
}

export default function SlugField({
  source,
  value,
  onChange,
  prefix = "",
  id = "slug",
  placeholder = "auto-generated-from-title",
}: SlugFieldProps) {
  const [auto, setAuto] = useState(true)
  const lastSource = useRef(source)

  useEffect(() => {
    if (auto && source !== lastSource.current) {
      lastSource.current = source
      onChange(slugify(source))
    } else {
      lastSource.current = source
    }
  }, [source, auto, onChange])

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        URL Slug
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {prefix && (
          <span style={{ color: "#64748b", fontSize: "0.9rem", whiteSpace: "nowrap" }}>{prefix}</span>
        )}
        <input
          type="text"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setAuto(false)
            onChange(slugify(e.target.value))
          }}
          className="form-input"
          style={{ fontFamily: "monospace" }}
        />
      </div>
      <small style={{ color: "#64748b", marginTop: "0.5rem", display: "block" }}>
        Used in the page URL. Auto-generated from the title — edit it only if you need a custom link.
      </small>
    </div>
  )
}
