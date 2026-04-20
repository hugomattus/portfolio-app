'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function Information() {
  const { language } = useLanguage();

  return (
    <>
      <section className="intro intro-photos">
        <div className="photos-grid">
          <img src="/assets/Infomações/foto 1.png" alt="Foto 1" className="info-photo" />
          <img src="/assets/photo-2.jpg" alt="Foto 2" className="info-photo" />
        </div>
      </section>

      <section className="info">
        <div className="info-left">
        </div>

        <div className="info-right">
          <div className="info-block">
            <p>{translations[language].sobreText}</p>
            <nav className="social" style={{ marginTop: '16px' }}>
              <a href="mailto:contatouxmello@gmail.com">contatouxmello@gmail.com</a>
            </nav>
          </div>

          <div className="info-block">
            <h2 className="section-label">{translations[language].experiencia}</h2>
            <div className="experience-list">
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">Product Designer</span>
                  <span className="experience-year">2022 · <span>{translations[language].presente}</span></span>
                </div>
                <span className="experience-company">Freelancer</span>
              </div>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">Product Designer</span>
                  <span className="experience-year">2024 · <span>{translations[language].presente}</span></span>
                </div>
                <span className="experience-company">Orbit</span>
              </div>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="experience-role">Product Designer</span>
                  <span className="experience-year">2025</span>
                </div>
                <span className="experience-company">FTEAM</span>
              </div>
            </div>
          </div>

          <div className="info-block">
            <h2 className="section-label">{translations[language].servicos}</h2>
            <ul className="plain-list">
              <li><span>{translations[language].pesquisaDiscovery}</span></li>
              <li><span>{translations[language].wireframesProto}</span></li>
              <li><span>{translations[language].designInterfaceProduto}</span></li>
              <li><span>{translations[language].designVisual}</span></li>
              <li><span>{translations[language].prototipIA}</span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
