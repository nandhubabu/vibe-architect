'use client';

import React from 'react';
import styles from './BlueprintCanvas.module.css';
import { CulturalBlueprint } from '@/types/qloo';

interface BlueprintCanvasProps {
  blueprint: CulturalBlueprint;
}

export function BlueprintCanvas({ blueprint }: BlueprintCanvasProps) {
  const { categories, sensory, culturalDNA } = blueprint;

  return (
    <article className={styles.canvasContainer}>
      {/* Editorial Masthead Meta */}
      <div className={styles.mastheadMeta}>
        <div>
          <h2 className={styles.blueprintTitle}>{blueprint.title}</h2>
          <p className={styles.blueprintSubtitle}>{blueprint.editorialSubtitle}</p>
        </div>
        <div className={styles.affinityScoreBox}>
          <span className={styles.scoreValue}>{culturalDNA.qlooAffinityScore}%</span>
          <span className={styles.scoreLabel}>QLOO TASTE GRAPH COHERENCE</span>
        </div>
      </div>

      {/* Narrative & Curator Analysis */}
      <div className={styles.overviewSection}>
        <div className={styles.narrativeText}>
          {blueprint.narrativeOverview}
        </div>
        <div className={styles.curatorBox}>
          <span className={styles.curatorTitle}>CURATORIAL METHODOLOGY</span>
          <p className={styles.curatorText}>{blueprint.curatorNotes}</p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className={styles.cardsGrid}>
        {/* Soundtrack */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardCategory}>
              <span>01 • ACOUSTIC ARCHITECTURE</span>
              <span>MUSIC</span>
            </div>
            <h3 className={styles.cardTheme}>{categories.soundtrack.theme}</h3>
            <div className={styles.entityList}>
              {categories.soundtrack.entities.map((ent, idx) => (
                <div key={idx} className={styles.entityItem}>
                  <div className={styles.entityHeader}>
                    <span className={styles.entityName}>{ent.name}</span>
                    <span className={styles.entityAffinity}>
                      {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                    </span>
                  </div>
                  <p className={styles.entityDesc}>{ent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>PACING: {categories.soundtrack.tempo}</span>
          </div>
        </div>

        {/* Gastronomy */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardCategory}>
              <span>02 • GASTRONOMY & LIBATIONS</span>
              <span>DINING</span>
            </div>
            <h3 className={styles.cardTheme}>{categories.gastronomy.concept}</h3>
            <div className={styles.entityList}>
              {categories.gastronomy.entities.map((ent, idx) => (
                <div key={idx} className={styles.entityItem}>
                  <div className={styles.entityHeader}>
                    <span className={styles.entityName}>{ent.name}</span>
                    <span className={styles.entityAffinity}>
                      {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                    </span>
                  </div>
                  <p className={styles.entityDesc}>{ent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>PAIRING: {categories.gastronomy.wineOrCocktailPairing}</span>
          </div>
        </div>

        {/* Cinema */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardCategory}>
              <span>03 • VISUAL & CINEMATIC TONE</span>
              <span>CINEMA</span>
            </div>
            <h3 className={styles.cardTheme}>{categories.cinema.aestheticTone}</h3>
            <div className={styles.entityList}>
              {categories.cinema.entities.map((ent, idx) => (
                <div key={idx} className={styles.entityItem}>
                  <div className={styles.entityHeader}>
                    <span className={styles.entityName}>{ent.name}</span>
                    <span className={styles.entityAffinity}>
                      {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                    </span>
                  </div>
                  <p className={styles.entityDesc}>{ent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>VISUAL MOTIF: {categories.cinema.visualMotif}</span>
          </div>
        </div>

        {/* Sartorial */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardCategory}>
              <span>04 • SARTORIAL & MATERIAL PALETTE</span>
              <span>FASHION</span>
            </div>
            <h3 className={styles.cardTheme}>{categories.sartorial.dressCode}</h3>
            <div className={styles.entityList}>
              {categories.sartorial.entities.map((ent, idx) => (
                <div key={idx} className={styles.entityItem}>
                  <div className={styles.entityHeader}>
                    <span className={styles.entityName}>{ent.name}</span>
                    <span className={styles.entityAffinity}>
                      {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                    </span>
                  </div>
                  <p className={styles.entityDesc}>{ent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>MATERIALS: {categories.sartorial.materialsAndPalette.join(', ')}</span>
          </div>
        </div>

        {/* Spatial Architecture */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardCategory}>
              <span>05 • SPATIAL ARCHITECTURE</span>
              <span>ATMOSPHERE</span>
            </div>
            <h3 className={styles.cardTheme}>{categories.spaces.architecturalAtmosphere}</h3>
            <div className={styles.entityList}>
              {categories.spaces.entities.map((ent, idx) => (
                <div key={idx} className={styles.entityItem}>
                  <div className={styles.entityHeader}>
                    <span className={styles.entityName}>{ent.name}</span>
                    <span className={styles.entityAffinity}>
                      {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                    </span>
                  </div>
                  <p className={styles.entityDesc}>{ent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>LIGHTING: {categories.spaces.ambientLighting}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
