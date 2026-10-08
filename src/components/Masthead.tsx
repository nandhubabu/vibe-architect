'use client';

import React, { useEffect, useState } from 'react';
import styles from './Masthead.module.css';

export function Masthead() {
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
          <div className={styles.qlooBadge}>
            <span className={styles.dot} />
            <span>{qlooMode}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
