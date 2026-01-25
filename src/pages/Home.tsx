import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Home = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <div className="page-content">
      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>{t('home.title')}</h1>
      <p className="subtitle">{t('home.subtitle')}</p>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('interactions', { count })}
        </button>
        <p>
          <Trans i18nKey="edit_instruction">
            Edit <code>src/pages/Home.tsx</code> to customize this page.
          </Trans>
        </p>
      </div>
    </div>
  );
};

export default Home;
