'use client';

import React from 'react';
import styles from './SensoryDetailsGrid.module.css';
import { SensoryDetails } from '@/types/qloo';

interface SensoryDetailsGridProps {
  sensory: SensoryDetails;
}

export function SensoryDetailsGrid({ sensory }: SensoryDetailsGridProps) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.titleArea}>
          <h3 className={styles.heading}>Tactile & Sensory Architecture</h3>
          <span className={styles.badge}>PHYSICAL AMBIENCE</span>
        </div>

        <div className={styles.grid}>
          {/* Lighting */}
          <div className={styles.sensoryCell}>
            <span className={styles.cellLabel}>01 • LUMINESCENCE</span>
            <span className={styles.cellValue}>{sensory.lightingKelvin}</span>
            <p className={styles.cellDesc}>{sensory.lightingDescription}</p>
          </div>

          {/* Aroma */}
          <div className={styles.sensoryCell}>
            <span className={styles.cellLabel}>02 • OLFACTORY PROFILE</span>
            <span className={styles.cellValue}>Aromatic Notes</span>
            <p className={styles.cellDesc}>{sensory.aromaProfile}</p>
          </div>

          {/* Tactile Materials */}
          <div className={styles.sensoryCell}>
            <span className={styles.cellLabel}>03 • MATERIAL SURFACES</span>
            <span className={styles.cellValue}>Tactile Palette</span>
            <div className={styles.tags}>
              {sensory.textureMaterials.map((mat, idx) => (
                <span key={idx} className={styles.tag}>
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Conversation Starters */}
        <div className={styles.conversationSection}>
          <span className={styles.conversationLabel}>
            CURATED CONVERSATION ANCHORS (TASTE GRAPH CORRELATED)
          </span>
          <ul className={styles.conversationList}>
            {sensory.conversationAnchors.map((starter, idx) => (
              <li key={idx} className={styles.conversationItem}>
                <span className={styles.quoteMark}>—</span>
                <span>{starter}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
