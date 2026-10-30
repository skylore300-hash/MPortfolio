import { useEffect, useState } from 'react'
import portfolioWallpaper from './assets/image_simpson_compressee.jpg'
import './App.css'

type AppId = 'about' | 'projects' | 'skills' | 'experience' | 'education' | 'contact' | 'cv' | 'interests'
type WindowState = { id: AppId; minimized: boolean; maximized: boolean }

const appInfo: Record<AppId, { title: string; eyebrow: string; body: string; icon: string; color: string }> = {
  about: { title: 'À propos', eyebrow: 'MON PROFIL', body: 'Salut, moi c’est Sierra. Je suis développeur web et j’aime imaginer des expériences numériques utiles, soignées et accessibles. Ce portfolio prend la forme de mon écran d’accueil : explore les applis pour en découvrir davantage.', icon: '👤', color: '#4e9bff' },
  projects: { title: 'Mes projets', eyebrow: 'GALERIE', body: 'Une sélection de projets réalisés avec React, Laravel, Node.js et les outils du web. Chaque projet est une occasion d’apprendre, de résoudre un problème et de donner vie à une idée.', icon: '🖼️', color: '#ff6d78' },
  skills: { title: 'Compétences', eyebrow: 'BOÎTE À OUTILS', body: 'React · TypeScript · JavaScript · HTML · CSS · Tailwind CSS · Node.js · Laravel · Git. Je continue à enrichir ma boîte à outils au fil des projets.', icon: '⚙️', color: '#f4a340' },
  experience: { title: 'Expérience', eyebrow: 'MON PARCOURS', body: 'Cette section présentera mes expériences professionnelles, stages et missions. Je pourrai y détailler les rôles occupés, les responsabilités et les réalisations principales.', icon: '💼', color: '#3787d8' },
  education: { title: 'Formation', eyebrow: 'APPRENTISSAGE', body: 'Cette section accueillera mon parcours de formation, mes diplômes et mes certifications. Les détails pourront être ajoutés au fil de la personnalisation du portfolio.', icon: '🎓', color: '#bd79e8' },
  contact: { title: 'Me contacter', eyebrow: 'RESTONS EN CONTACT', body: 'Tu as une idée, une opportunité ou simplement envie de discuter ? Écris-moi et parlons de ton prochain projet.', icon: '✉️', color: '#1fc99a' },
  cv: { title: 'Mon CV', eyebrow: 'PARCOURS', body: 'Retrouve mon parcours, mes expériences et ma formation dans mon CV. Tu peux le consulter ou le télécharger au format PDF.', icon: '📄', color: '#9a79ff' },
  interests: { title: 'Centres d’intérêt', eyebrow: 'UN PEU PLUS SUR MOI', body: 'Un espace pour partager mes passions, mes inspirations et les sujets qui nourrissent ma curiosité, côté création comme côté technologie.', icon: '✨', color: '#e5a83b' },
}

function DesktopIcon({ id }: { id: AppId }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<AppId, React.ReactNode> = {
    about: <><circle cx="12" cy="8" r="3.2" /><path d="M5.8 20c.4-3.5 2.5-5.3 6.2-5.3s5.8 1.8 6.2 5.3" /></>,
    projects: <><path d="M3.5 7.5h6l2 2h9v9.8a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7Z" /><path d="M3.5 7.5V5.8a1.8 1.8 0 0 1 1.8-1.8h4l2.2 2h7.3a1.7 1.7 0 0 1 1.7 1.5" /></>,
    skills: <><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4m9.2 9.2L18 18m0-12-1.4 1.4m-9.2 9.2L6 18" /><circle cx="12" cy="12" r="5.1" /><circle cx="12" cy="12" r="1.6" /></>,
    experience: <><rect x="3.5" y="7" width="17" height="13" rx="2" /><path d="M9 7V5.4a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 5.4V7m-11.5 5h17M10 12v2h4v-2" /></>,
    education: <><path d="m2.8 9 9.2-5 9.2 5-9.2 5Z" /><path d="M6 11v5.1c3.8 2.8 8.2 2.8 12 0V11m3.2-2v6" /></>,
    contact: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
    cv: <><path d="M6 3.5h8l4 4v13H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" /><path d="M14 3.8v4h4M8 12h8M8 15.5h8" /></>,
    interests: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9Z" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[id]}</svg>
}

function AppGlyph({ id }: { id: AppId }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<AppId, React.ReactNode> = {
    about: <><circle cx="12" cy="8" r="3.2" /><path d="M5.8 20c.4-3.5 2.5-5.3 6.2-5.3s5.8 1.8 6.2 5.3" /></>,
    projects: <><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M7.5 16.5 11 12l2.2 2.5 1.5-1.7 2.8 3.7M8.5 8.5h.01" /></>,
    skills: <><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4m9.2 9.2L18 18m0-12-1.4 1.4m-9.2 9.2L6 18" /><circle cx="12" cy="12" r="5.1" /></>,
    experience: <><rect x="3.5" y="7" width="17" height="13" rx="2" /><path d="M9 7V5.4A1.4 1.4 0 0 1 10.4 4h3.2A1.4 1.4 0 0 1 15 5.4V7m-11.5 5h17" /></>,
    education: <><path d="m2.8 9 9.2-5 9.2 5-9.2 5Z" /><path d="M6 11v5c3.8 2.8 8.2 2.8 12 0v-5m3.2-2v6" /></>,
    contact: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
    cv: <><path d="M6 3.5h8l4 4v13H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" /><path d="M14 3.8v4h4M8 12h8M8 15.5h8" /></>,
    interests: <><path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[id]}</svg>
}

function App() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [startOpen, setStartOpen] = useState(false)
  const [appDrawerOpen, setAppDrawerOpen] = useState(false)
  const [time, setTime] = useState(() => new Date())
  const [page, setPage] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.matchMedia('(max-width: 899px)').matches)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)')
    const updateLayout = () => setIsMobileLayout(media.matches)
    media.addEventListener('change', updateLayout)
    return () => media.removeEventListener('change', updateLayout)
  }, [])

  const clock = time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const date = time.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

  const openApp = (id: AppId) => {
    setActiveApp(id)
    setWindows((current) => {
      const existing = current.find((item) => item.id === id)
      return existing
        ? [...current.filter((item) => item.id !== id), { ...existing, minimized: false }]
        : [...current, { id, minimized: false, maximized: false }]
    })
    setStartOpen(false)
    setAppDrawerOpen(false)
  }

  const minimizeApp = (id: AppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized: true } : item))
    setActiveApp(null)
  }

  const toggleMaximize = (id: AppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, maximized: !item.maximized } : item))
  }

  const closeApp = (id: AppId) => {
    setWindows((current) => current.filter((item) => item.id !== id))
    setActiveApp(null)
  }

  return (
    <main className="desktop" onTouchStart={(event) => setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY })} onTouchEnd={(event) => {
      if (!touchStart) return
      const deltaX = event.changedTouches[0].clientX - touchStart.x
      const deltaY = event.changedTouches[0].clientY - touchStart.y
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 65) setPage(deltaX < 0 ? 1 : 0)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 65 && isMobileLayout && !activeApp) {
        if (deltaY < 0 && touchStart.y > window.innerHeight * 0.5) setAppDrawerOpen(true)
        if (deltaY > 0 && appDrawerOpen && touchStart.y < window.innerHeight * 0.45) setAppDrawerOpen(false)
      }
      setTouchStart(null)
    }}>
      <div className="wallpaper" aria-hidden="true" style={{ backgroundImage: `url(${portfolioWallpaper})` }}><div className="orb" /></div>
      <header className="status-bar mobile-only">
        <span>{clock}</span>
        <div className="status-icons" aria-label="Réseau connecté, batterie chargée">
          <svg viewBox="0 0 25 20" aria-hidden="true"><path d="M2 6.5a15 15 0 0 1 21 0M5.5 10a10 10 0 0 1 14 0M9.2 13.5a5 5 0 0 1 6.6 0M12.5 17h.01" /></svg>
          <span className="signal"><i /><i /><i /><i /></span>
          <span className="battery"><i /> 94</span>
        </div>
      </header>

      <section className="clock-widget mobile-only" aria-label="Heure et date">
        <div className="big-time">{clock}</div>
        <div className="big-date">{date}</div>
      </section>

      <section className={`home-screen mobile-only page-${page} ${isMobileLayout && activeApp ? 'home-hidden' : ''} ${appDrawerOpen ? 'drawer-open' : ''}`} aria-label="Applications du portfolio">
        <div className="dock">
          <button className="app-shortcut" aria-label="Téléphone" onClick={() => openApp('contact')}><span className="app-icon phone"><svg viewBox="0 0 24 24"><path d="M6.6 2.8 9.5 2l2.1 5-2.1 1.8a15 15 0 0 0 5.7 5.7l1.8-2.1 5 2.1-.8 2.9a3 3 0 0 1-3.4 2.2A19.6 19.6 0 0 1 2.4 6.2a3 3 0 0 1 2.2-3.4Z" /></svg></span></button>
          <button className="app-shortcut" aria-label="Projets" onClick={() => openApp('projects')}><span className="app-icon messages"><span>●</span></span></button>
          <button className="app-shortcut" aria-label="Compétences" onClick={() => openApp('skills')}><span className="app-icon maps"><span>⌖</span></span></button>
          <button className="app-shortcut" aria-label="À propos" onClick={() => openApp('about')}><span className="app-icon chrome"><span /></span></button>
        </div>
      </section>

      {appDrawerOpen && isMobileLayout && !activeApp && <section className="app-drawer mobile-only" aria-label="Toutes les applications">
        <div className="drawer-handle" />
        <header className="drawer-header"><h2>Applications</h2><button onClick={() => setAppDrawerOpen(false)} aria-label="Fermer le menu">×</button></header>
        <div className="drawer-search"><span>⌕</span><span>Rechercher une application</span></div>
        <div className="drawer-grid">{(['about', 'projects', 'skills', 'experience', 'education', 'cv', 'interests', 'contact'] as AppId[]).map((id) => <button key={id} className="app-shortcut" onClick={() => openApp(id)}><span className="app-icon drawer-app-icon" style={{ '--app-accent': appInfo[id].color } as React.CSSProperties}><AppGlyph id={id} /></span><span>{appInfo[id].title}</span></button>)}</div>
      </section>}

      <div className={`page-dots mobile-only ${isMobileLayout && activeApp ? 'home-hidden' : ''}`} aria-label={`Page ${page + 1} sur 2`}><button className={page === 0 ? 'selected' : ''} onClick={() => setPage(0)} aria-label="Page principale" /><button className={page === 1 ? 'selected' : ''} onClick={() => setPage(1)} aria-label="Deuxième page" /></div>

      <button className={`search-widget mobile-only ${isMobileLayout && activeApp ? 'home-hidden' : ''}`} onClick={() => openApp('contact')} aria-label="Ouvrir les contacts">
        <span className="search-mark"><i /><i /><i /><i /><b /></span>
        <span className="widget-help">?</span>
        <span className="sun">☼</span>
        <span className="widget-date">{time.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
      </button>
      <button className={`gesture-bar mobile-only ${activeApp ? 'app-home-gesture' : ''}`} aria-label={activeApp ? 'Retour à l’accueil' : 'Balayer vers le haut pour ouvrir les applications'} onClick={() => { if (activeApp) setActiveApp(null) }}><span /></button>

      <section className="windows-desktop" aria-label="Bureau du portfolio">
        {(['about', 'projects', 'skills', 'experience', 'education', 'cv', 'contact', 'interests'] as AppId[]).map((id) => <button key={id} className="desktop-shortcut" onDoubleClick={() => openApp(id)} onClick={() => setActiveApp(id)}><span className={`shortcut-glyph shortcut-${id}`} style={{ '--app-accent': appInfo[id].color } as React.CSSProperties}><DesktopIcon id={id} /></span><span>{appInfo[id].title}</span></button>)}
        {windows.filter((item) => !item.minimized).map((item) => (
          <section key={item.id} className={`windows-window ${item.maximized ? 'maximized' : ''} ${activeApp === item.id ? 'focused' : ''}`} onMouseDown={() => setActiveApp(item.id)} role="dialog" aria-labelledby={`win-${item.id}`} style={{ '--app-accent': appInfo[item.id].color } as React.CSSProperties}>
            <header className="window-titlebar"><span className="titlebar-icon">{appInfo[item.id].icon}</span><span id={`win-${item.id}`}>{appInfo[item.id].title}</span><div className="window-controls"><button aria-label="Réduire" onClick={() => minimizeApp(item.id)}>−</button><button aria-label="Agrandir" onClick={() => toggleMaximize(item.id)}>□</button><button className="window-close" aria-label="Fermer" onClick={() => closeApp(item.id)}>×</button></div></header>
            <div className="window-menu"><span>Fichier</span><span>Modifier</span><span>Affichage</span><span>Aide</span></div>
            <div className="window-content"><div className="content-heading"><span className="content-icon">{appInfo[item.id].icon}</span><div><p>{appInfo[item.id].eyebrow}</p><h2>{appInfo[item.id].title}</h2></div></div><p className="content-body">{appInfo[item.id].body}</p>
              {item.id === 'projects' && <div className="project-list"><article><img src="/src/assets/netikash.png" alt="Aperçu du projet Netikash" /><div><strong>Netikash</strong><span>Interface web · Laravel</span></div></article><article><img src="/src/assets/TLC.png" alt="Aperçu du projet TLC" /><div><strong>TLC</strong><span>Projet web · React</span></div></article><article><img src="/src/assets/kamehouse.png" alt="Aperçu du projet Kame House" /><div><strong>Kame House</strong><span>Projet créatif</span></div></article></div>}
              {item.id === 'skills' && <div className="skill-chips">{['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind', 'Node.js', 'Laravel', 'Git'].map((skill) => <span key={skill}>{skill}</span>)}</div>}
              {item.id === 'experience' && <div className="timeline-note"><span>01</span><div><strong>Expériences à compléter</strong><p>Ajoute ici tes postes, stages ou missions, avec les dates et les réalisations importantes.</p></div></div>}
              {item.id === 'education' && <div className="timeline-note"><span>🎓</span><div><strong>Formation à compléter</strong><p>Ajoute tes établissements, diplômes, certifications et dates de formation.</p></div></div>}
              {item.id === 'interests' && <div className="skill-chips"><span>Création numérique</span><span>Développement web</span><span>Design</span><span>Technologie</span></div>}
              {item.id === 'contact' && <a className="desktop-action" href="mailto:hello@sierra.dev">M’envoyer un e-mail <span>↗</span></a>}
              {item.id === 'cv' && <><a className="desktop-action" href="/Sierra-Kaluba-CV.pdf" target="_blank" rel="noreferrer">Ouvrir mon CV <span>↗</span></a><a className="desktop-action secondary-action" href="/Sierra-Kaluba-CV.pdf" download>Télécharger le PDF <span>↓</span></a></>}
            </div>
          </section>
        ))}
      </section>

      <footer className="taskbar">
        <button className={`start-button ${startOpen ? 'pressed' : ''}`} aria-label="Ouvrir le menu Démarrer" onClick={() => setStartOpen((open) => !open)}><svg className="windows-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4.2 10.5 3v8H2zm10 8.1h10v8.4L12 19.2zM2 12.5h8.5v8L2 19.3zm10-9.7L22 1v9.7H12z" /></svg></button>
        <button className="taskbar-search" onClick={() => setStartOpen(true)}><span>⌕</span> Rechercher</button>
        <div className="taskbar-apps">{windows.map((item) => <button key={item.id} className={`task-app ${activeApp === item.id && !item.minimized ? 'active' : ''}`} title={appInfo[item.id].title} onClick={() => item.minimized ? openApp(item.id) : setActiveApp(activeApp === item.id ? null : item.id)}><AppGlyph id={item.id} /></button>)}</div>
        <div className="taskbar-tray"><span>⌃</span><span>◉</span><span>◖</span><div>{clock}<small>{time.toLocaleDateString('fr-FR')}</small></div></div>
      </footer>
      {startOpen && <><button className="start-dismiss" aria-label="Fermer le menu Démarrer" onClick={() => setStartOpen(false)} /><section className="start-menu"><div className="start-search">⌕ <span>Rechercher une application</span></div><div className="start-heading"><strong>Épinglé</strong><span>Toutes les applications ›</span></div><div className="pinned-apps">{(['about', 'projects', 'skills', 'experience', 'education', 'cv', 'contact', 'interests'] as AppId[]).map((id) => <button key={id} onClick={() => openApp(id)}><span className="pinned-icon" style={{ '--app-accent': appInfo[id].color } as React.CSSProperties}><AppGlyph id={id} /></span>{appInfo[id].title}</button>)}</div><div className="start-profile"><span className="profile-avatar">SK</span><strong>Sierra Kaluba</strong><span>⏻</span></div></section></>}

      {activeApp && isMobileLayout && <div className="app-overlay mobile-only">
        <section className="app-window" role="dialog" aria-modal="true" aria-labelledby="app-title" style={{ '--app-accent': appInfo[activeApp].color } as React.CSSProperties}>
          <div className="window-handle" />
          <button className="close-app" onClick={() => setActiveApp(null)} aria-label="Retour à l’accueil">⌂</button>
          <div className="window-icon"><AppGlyph id={activeApp} /></div>
          <p className="window-eyebrow">{appInfo[activeApp].eyebrow}</p>
          <h1 id="app-title">{appInfo[activeApp].title}</h1>
          <p className="window-copy">{appInfo[activeApp].body}</p>
          {activeApp === 'contact' && <a className="action-link" href="mailto:hello@sierra.dev">M’envoyer un e-mail <span>↗</span></a>}
          {activeApp === 'cv' && <a className="action-link" href="/Sierra-Kaluba-CV.pdf" target="_blank" rel="noreferrer">Ouvrir mon CV <span>↗</span></a>}
          {activeApp === 'projects' && <div className="mobile-project-list"><article><img src="/src/assets/netikash.png" alt="Aperçu du projet Netikash" /><strong>Netikash</strong></article><article><img src="/src/assets/TLC.png" alt="Aperçu du projet TLC" /><strong>TLC</strong></article><article><img src="/src/assets/kamehouse.png" alt="Aperçu du projet Kame House" /><strong>Kame House</strong></article></div>}
        </section>
      </div>}
    </main>
  )
}

export default App
