import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="page-content">
      <h1>{t('about.title')}</h1>
      <div className="card">
        <p className="subtitle">{t('about.description')}</p>
        <p className="read-the-docs">
          {t('powered_by')}
        </p>
      </div>
    </div>
  );
};

export default About;
