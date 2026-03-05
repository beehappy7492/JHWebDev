import { useState, useEffect } from 'react'
import { lazy, Suspense } from 'react'
import { BIRTH_DATE, YOUR_NAME, TECH_LINKS, BOTTOM_LINKS } from './data'
import TechPanel from './components/TechPanel'

// Lazy-load Three.js clusters so they don't block the initial paint
const Sphere = lazy(() => import('./components/Sphere'))

// ─── Real-time age ────────────────────────────────────────────────────────────
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

function useAge() {
  const [age, setAge] = useState(() =>
    ((Date.now() - BIRTH_DATE.getTime()) / MS_PER_YEAR).toFixed(9)
  )
  useEffect(() => {
    const iv = setInterval(() => {
      setAge(((Date.now() - BIRTH_DATE.getTime()) / MS_PER_YEAR).toFixed(9))
    }, 100)
    return () => clearInterval(iv)
  }, [])
  return age
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    position: 'relative',
    zIndex: 1,
    // No min-height — page shrinks to content so WELCOME shows fully below it
    width: '96vw',
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '5vh',
    paddingBottom: '5rem',
    userSelect: 'none',
    background: '#000',
  },
  heading: {
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontWeight: 700,
    letterSpacing: '0.06em',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  bio: {
    fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
    fontWeight: 400,
    lineHeight: 1.9,
    textAlign: 'center',
    maxWidth: '640px',
    padding: '0 1rem',
  },
  hint: {
    fontSize: '0.78rem',
    color: '#555',
    marginTop: '0.3rem',
    textAlign: 'center',
  },
  techBtn: (color, active) => ({
    color,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: active ? 700 : 400,
    textDecoration: active ? 'underline' : 'none',
    textUnderlineOffset: '3px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    transition: 'opacity 0.15s',
  }),
  divider: {
    width: '100%',
    maxWidth: '860px',
    height: '1px',
    background: '#222',
    margin: '0.5rem 0',
  },
  bottom: {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
    lineHeight: 2.1,
    textAlign: 'center',
    color: '#ccc',
    padding: '0 1rem',
  },
  link: (color = '#777') => ({
    color,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  }),
}

export default function App() {
  const age = useAge()
  const [openTech, setOpenTech] = useState(null)

  const toggle = (key) => setOpenTech(prev => (prev === key ? null : key))

  const hintText = openTech ? '(click again to exit)' : '(click to view details)'

  return (
    <>
      {/* ── Background particle clusters ────────────────────────────────── */}
      <Suspense fallback={null}>
        <Sphere />
      </Suspense>

      <div style={S.page}>

        {/* ── Name ─────────────────────────────────────────────────────── */}
        <h1 style={S.heading}>{YOUR_NAME}</h1>

        {/* ── Bio ──────────────────────────────────────────────────────── */}
        <p style={S.bio}>
          {`I'm a `}
          <span style={{ color: '#fff', fontWeight: 700 }}>{age}</span>
          {` year-old developer`}
          <br />
          {`who uses `}
          {TECH_LINKS.map(({ key, label, color }, i) => {
            const isLast = i === TECH_LINKS.length - 1
            const isSecondLast = i === TECH_LINKS.length - 2
            return (
              <span key={key}>
                <button
                  data-tech-trigger="true"
                  style={S.techBtn(color, openTech === key)}
                  onClick={() => toggle(key)}
                >
                  {label}
                </button>
                {isLast ? '.' : isSecondLast ? ', and ' : ', '}
              </span>
            )
          })}
        </p>

        <p style={S.hint}>{hintText}</p>

        {/* ── Expandable tech panel ─────────────────────────────────────── */}
        {openTech && (
          <TechPanel
            key={openTech}
            techKey={openTech}
            onClose={() => setOpenTech(null)}
          />
        )}

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div style={S.divider} />

        {/* ── Bottom links ─────────────────────────────────────────────── */}
        <div style={S.bottom}>
          <p>
            Check out my{' '}
            {BOTTOM_LINKS.github
              ? <a href={BOTTOM_LINKS.github} style={S.link('#6db33f')} target="_blank" rel="noreferrer">GitHub</a>
              : <span style={{ color: '#444' }}>GitHub</span>
            }
.
          </p>
          <p>
            I was last seen working on{' '}
            <a href={BOTTOM_LINKS.lastProject.href} style={S.link('#777')} target="_blank" rel="noreferrer">
              {BOTTOM_LINKS.lastProject.name}
            </a>.
          </p>
          <p>
            Business inquiry?{' '}
            <a href={`mailto:${BOTTOM_LINKS.email}`} style={S.link('#c084fc')}>Email me!</a>
          </p>
        </div>

      </div>
    </>
  )
}
