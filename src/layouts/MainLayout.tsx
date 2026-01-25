import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'kh' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update URL query parameter using react-router
    setSearchParams({ lng: newLang });
  };

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('nav.home')}</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('nav.about')}</NavLink>
        </div>
        <div className="language-switcher">
          <button className="btn-secondary" onClick={toggleLanguage}>
            {t('switch_language')}
          </button>
        </div>
      </nav>
      
      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <p className="read-the-docs">
          © 2026 LMS Portal. {t('powered_by')}
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
