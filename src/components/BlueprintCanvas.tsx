'use client';

import React, { useState } from 'react';
import styles from './BlueprintCanvas.module.css';
import { CulturalBlueprint, QlooEntity } from '@/types/qloo';

interface BlueprintCanvasProps {
  blueprint: CulturalBlueprint;
}

function EntityListSection({ entities }: { entities: QlooEntity[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Enforce strict top 3 (curated) or top 5 (expanded maximum)
  const cappedEntities = (entities || []).slice(0, 5);
  const visible = isExpanded ? cappedEntities : cappedEntities.slice(0, 3);
  const hasMore = cappedEntities.length > 3;

  return (
    <div>
      <div className={styles.entityList}>
        {visible.map((ent, idx) => (
          <div key={idx} className={styles.entityItem}>
            <div className={styles.entityHeader}>
              <span className={styles.entityName}>{ent.name}</span>
              <span className={styles.entityAffinity}>
                {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
              </span>
            </div>
            {ent.description && <p className={styles.entityDesc}>{ent.description}</p>}
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          className={styles.expandToggle}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded
            ? '▲ Show Top 3 Curated'
            : `+ Show Top 5 Correlates (${cappedEntities.length} Total)`}
        </button>
      )}
    </div>
  );
}

export function BlueprintCanvas({ blueprint }: BlueprintCanvasProps) {
  const { categories, culturalDNA } = blueprint;

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
            <EntityListSection entities={categories.soundtrack.entities} />
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
            <EntityListSection entities={categories.gastronomy.entities} />
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
            <EntityListSection entities={categories.cinema.entities} />
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
            <EntityListSection entities={categories.sartorial.entities} />
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.footerDot} />
            <span>MATERIALS: {categories.sartorial.materialsAndPalette.slice(0, 4).join(', ')}</span>
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
            <EntityListSection entities={categories.spaces.entities} />
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
