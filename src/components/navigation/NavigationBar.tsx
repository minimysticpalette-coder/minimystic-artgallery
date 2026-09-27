'use client';

import { useLayoutEffect, useState, useSyncExternalStore } from 'react';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import { siteConfig } from '@/config/site';
import { cloudinaryBrandAssets } from '@/lib/media';

const themeChangeEvent = 'site-theme-change';

function subscribeToTheme(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(themeChangeEvent, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}

function getThemeSnapshot() {
  try {
    return window.localStorage.getItem('theme') === 'dark';
  } catch {
    return false;
  }
}

function getServerThemeSnapshot() {
  return false;
}

export function NavigationBar() {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  useLayoutEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextIsDark = !isDark;
    try {
      window.localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    } catch {
      // The active tab still changes theme when storage is unavailable.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  function closeMenus() {
    setMenuOpen(false);
    setSocialOpen(false);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href="#home" aria-label="Mini Mystic Palette home" onClick={closeMenus}>
          <CloudinaryImage
            asset={cloudinaryBrandAssets.logo}
            alt="Mini Mystic Palette"
            widths={[64, 128]}
            sizes="58px"
          />
        </a>
        <nav id="primary-navigation" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          <a className="active" href="#home" onClick={closeMenus}>Home</a>
          <a href="#gallery" onClick={closeMenus}>Gallery</a>
          <a href="#about" onClick={closeMenus}>About</a>
          <a href="#process" onClick={closeMenus}>Process</a>
          <a href="#contact" onClick={closeMenus}>Contact</a>
        </nav>
        <div className="header-tools">
          <button
            className={`theme-toggle${isDark ? ' active' : ''}`}
            type="button"
            aria-label="Toggle dark mode"
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <span className="toggle-track"><span className="toggle-thumb" /></span>
            <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
          </button>
          <div className={`social${socialOpen ? ' open' : ''}`}>
            <button
              className="social-toggle"
              type="button"
              aria-label="Toggle social links"
              aria-expanded={socialOpen}
              onClick={() => setSocialOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 14.5-4.5-4.5 1.4-1.4 3.1 3.1 3.1-3.1 1.4 1.4Z" /></svg>
            </button>
            <div className="social-links">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A5.8 5.8 0 1 1 6.2 13 5.8 5.8 0 0 1 12 7.2Zm0 2A3.8 3.8 0 1 0 15.8 13 3.8 3.8 0 0 0 12 9.2Zm6.2-3.1a1.3 1.3 0 1 1-1.3-1.3 1.3 1.3 0 0 1 1.3 1.3Z" /></svg>
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.7a2.8 2.8 0 0 0-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29.3 29.3 0 0 0 2 12a29.3 29.3 0 0 0 .4 4.3 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29.3 29.3 0 0 0 22 12a29.3 29.3 0 0 0-.4-4.3ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.3-.5 6.7 5.6 6.7-5.6H5.3Zm13.2 2.1-6.3 5.2a1 1 0 0 1-1.2 0L5.5 8.1v9.4c0 .3.2.5.5.5h12c.3 0 .5-.2.5-.5V8.1Z" /></svg>
              </a>
            </div>
          </div>
          <button
            className="menu"
            type="button"
            aria-label="Toggle menu"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i /><i />
          </button>
        </div>
      </div>
    </header>
  );
}
