'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function Information() {
  const { language } = useLanguage();

  return (
    <>
      <section className="intro intro-photos">
        <div className="photos-grid">
          <img src="/assets/photo-1.jpg" alt="Foto 1" className="info-photo" />
          <img src="/assets/photo-2.jpg" alt="Foto 2" className="info-photo" />
        </div>
      </section>

      <section className="info">
        <div className="info-left">
          <div className="side-photos-grid">
            <img src="/assets/photo-3.jpg" alt="Foto 3" className="info-photo" />
            <img src="/assets/photo-4.jpg" alt="Foto 4" className="info-photo" />
          </div>
        </div>

        <div className="info-right">
          <div className="info-block">
            <p>{translations[language].sobreText}</p>
          </div>

          <div className="info-block">
            <h2 className="section-label">{translations[language].experiencia}</h2>
            <div className="experience-list">
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">{translations[language].cargo}</span>
                  <span className="experience-year">2024 · <span>{translations[language].presente}</span></span>
                </div>
                <span className="experience-company">Company Name</span>
              </div>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">{translations[language].cargo}</span>
                  <span className="experience-year">2021 · 2024</span>
                </div>
                <span className="experience-company">Company Name</span>
              </div>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">{translations[language].cargo}</span>
                  <span className="experience-year">2018 · 2021</span>
                </div>
                <span className="experience-company">Company Name</span>
              </div>
            </div>
          </div>

          <div className="info-block">
            <h2 className="section-label">{translations[language].servicos}</h2>
            <ul className="plain-list">
              <li><span>{translations[language].designDeProduto}</span></li>
              <li><span>{translations[language].designSystems}</span></li>
              <li><span>{translations[language].interacao}</span></li>
              <li><span>{translations[language].pesquisa}</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
