import { useEffect, useRef } from 'react'
import { TECH_DETAILS } from '../data'

/**
 * Parse [bracketed] words as highlighted spans in the tech's color.
 * e.g. "I use [React] daily" → "I use " + <span color>React</span> + " daily"
 */
function RichText({ text, color }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]$/)
        if (match) return <span key={i} style={{ color }}>{match[1]}</span>
        return part
      })}
    </>
  )
}

export default function TechPanel({ techKey, onClose }) {
  const panelRef = useRef(null)
  const data = TECH_DETAILS[techKey]

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (!e.target.closest('[data-tech-trigger]')) onClose()
      }
    }
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 50)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler) }
  }, [onClose])

  if (!data) return null

  const cols = Math.min(data.projects.length, 3)

  return (
    <div
      ref={panelRef}
      style={{
        border: `2px solid ${data.color}`,
        borderRadius: '16px',
        padding: '2.2rem 2.5rem 2.5rem',
        margin: '1.5rem 0',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        animation: 'panel-in 0.22s ease',
      }}
    >
      <style>{`
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Title ──────────────────────────────────────────────────────── */}
      <h2 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'underline',
        textDecorationColor: data.color,
        textUnderlineOffset: '4px',
        marginBottom: '1.1rem',
      }}>
        {data.label}
      </h2>

      {/* ── Description with [highlighted] terms ───────────────────────── */}
      <p style={{
        fontSize: '0.84rem',
        lineHeight: 1.95,
        color: '#ccc',
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 2rem',
      }}>
        <RichText text={data.summary} color={data.color} />
      </p>

      {/* ── Project cards ──────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1.1rem',
      }}>
        {data.projects.map(({ name, href, img, desc }) => (
          <a
            key={name}
            href={href || '#'}
            target={href && href !== '#' ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              border: `2px solid ${data.color}`,
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'block',
              position: 'relative',
              aspectRatio: '4 / 3',
              textDecoration: 'none',
              transition: 'transform 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.025)'
              const overlay = e.currentTarget.querySelector('.desc-overlay')
              if (overlay) overlay.style.transform = 'translateY(0)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              const overlay = e.currentTarget.querySelector('.desc-overlay')
              if (overlay) overlay.style.transform = 'translateY(100%)'
            }}
          >
            {/* Image or tinted placeholder */}
            {img
              ? <img
                  src={img}
                  alt={name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    background: '#000',
                  }}
                />
              : <div style={{ width: '100%', height: '100%', background: `${data.color}0f` }} />
            }

            {/* Title gradient overlay (always visible at top) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.85rem',
              right: '0.85rem',
              fontWeight: 700,
              fontSize: '0.82rem',
              lineHeight: 1.3,
              color: '#fff',
            }}>
              {name}
            </div>

            {/* Hover description — slides up from bottom */}
            {desc && (
              <div
                className="desc-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.88)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.9rem 1rem',
                  fontSize: '0.72rem',
                  lineHeight: 1.65,
                  color: '#ddd',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.25s ease',
                }}
              >
                {desc}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
