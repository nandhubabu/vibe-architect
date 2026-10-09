'use client';

import React, { useState } from 'react';
import styles from './RemixPanel.module.css';

interface RemixPanelProps {
  onRemix: (adjustments: { energy: number; era: number; intimacy: number }) => void;
  onShare: () => void;
  onExportMarkdown?: () => void;
  isRemixing: boolean;
}

export function RemixPanel({ onRemix, onShare, onExportMarkdown, isRemixing }: RemixPanelProps) {
  const [energy, setEnergy] = useState(40);
  const [era, setEra] = useState(50);
  const [intimacy, setIntimacy] = useState(70);
  const [copied, setCopied] = useState(false);

  const handleApply = () => {
    onRemix({ energy, era, intimacy });
  };

  const handleShareClick = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={styles.panel}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Editorial Calibration</h3>
          </div>
          <span className={styles.kicker}>FINE-TUNE CULTURAL HARMONICS</span>
        </div>

        <div className={styles.slidersGrid}>
          {/* Slider 1: Energy */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderLabels}>
              <span>MEDITATIVE / AMBIENT</span>
              <span>KINETIC / RHYTHMIC</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className={styles.rangeInput}
              disabled={isRemixing}
            />
          </div>

          {/* Slider 2: Era */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderLabels}>
              <span>MID-CENTURY HERITAGE</span>
              <span>CONTEMPORARY AVANT-GARDE</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={era}
              onChange={(e) => setEra(Number(e.target.value))}
              className={styles.rangeInput}
              disabled={isRemixing}
            />
          </div>

          {/* Slider 3: Intimacy */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderLabels}>
              <span>CLOISTERED ENCOUNTER</span>
              <span>VIBRANT SALON</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intimacy}
              onChange={(e) => setIntimacy(Number(e.target.value))}
              className={styles.rangeInput}
              disabled={isRemixing}
            />
          </div>
        </div>

        <div className={styles.actions}>
          {onExportMarkdown && (
            <button
              type="button"
              onClick={onExportMarkdown}
              className={styles.exportBtn}
              title="Download full curatorial spec sheet as Markdown"
            >
              📄 Download Spec Sheet (.md)
            </button>
          )}
          <button type="button" onClick={handleShareClick} className={styles.shareBtn}>
            {copied ? '✓ Deep-Link Copied' : '🔗 Copy Shareable Link'}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className={styles.remixBtn}
            disabled={isRemixing}
          >
            {isRemixing ? 'Calibrating...' : 'Apply Calibration'}
          </button>
        </div>
      </div>
    </section>
  );
}
