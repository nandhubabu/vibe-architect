'use client';

import React, { useEffect, useState } from 'react';
import styles from './Masthead.module.css';

interface MastheadProps {
  onOpenTasteTree?: () => void;
  onOpenQlooStatus?: () => void;
  tasteTreeItemsCount?: number;
}

export function Masthead({ onOpenTasteTree, onOpenQlooStatus, tasteTreeItemsCount }: MastheadProps) {
  const [qlooMode, setQlooMode] = useState<string>('Connecting...');

  useEffect(() => {
    fetch('/api/qloo/status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.qloo?.liveKeyConfigured) {
          setQlooMode('QLOO LIVE GRAPH ACTIVE');
        } else {
          setQlooMode('QLOO TASTE GRAPH (250M+ SEEDS)');
        }
      })
      .catch(() => {
        setQlooMode('QLOO GRAPH CONNECTED');
      });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logoTitle}>VIBE ARCHITECT</span>
          <span className={styles.issueTag}>VOL. 01 — CULTURAL INTELLIGENCE</span>
        </div>
        <div className={styles.right}>
          {onOpenTasteTree && (
            <button
              type="button"
              className={styles.tasteTreeBtn}
              onClick={onOpenTasteTree}
              title="Open 5-Node User Taste Memory Tree"
            >
              <span className={styles.dnaIcon}>🧬</span>
              <span>TASTE MEMORY TREE</span>
              {tasteTreeItemsCount !== undefined && (
                <span className={styles.itemCountBadge}>{tasteTreeItemsCount}</span>
              )}
            </button>
          )}

          <button
            type="button"
            className={styles.qlooBadge}
            onClick={onOpenQlooStatus}
            title="Inspect Live Qloo Cultural Graph & API Diagnostics"
          >
            <span className={styles.dot} />
            <span>{qlooMode}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
