'use client';

import React, { useState } from 'react';
import styles from './PromptHero.module.css';

interface PromptHeroProps {
  onSynthesize: (prompt: string) => void;
  isLoading: boolean;
}

const CURATED_SEEDS = [
  'Rooftop dinner for 8 architects who love Wes Anderson, natural wine, and Radiohead',
  'Late-night rainy Tokyo listening bar with Miles Davis, whisky, and raw denim',
  'Sunday morning creative salon with Studio Ghibli, pour-over coffee, and lofi beats',
  'Nordic cabin retreat pairing Brian Eno ambient soundscapes with hearth fire and foraged tea',
];

export function PromptHero({ onSynthesize, isLoading }: PromptHeroProps) {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && !isLoading) {
      onSynthesize(inputVal.trim());
    }
  };

  const handleSelectSeed = (seed: string) => {
    setInputVal(seed);
    if (!isLoading) {
      onSynthesize(seed);
    }
  };

  return (
    <section className={styles.hero}>
      <span className={styles.kicker}>CULTURAL GROUNDING ENGINE • 250M+ ENTITIES</span>
      <h1 className={styles.headline}>
        Design the <em>cultural atmosphere</em> for any space, evening, or moment.
      </h1>
      <p className={styles.description}>
        Generic AI guesses. Vibe Architect traverses Qloo’s taste affinity graph to connect what people listen to, drink, wear, and watch into a single, cohesive cultural blueprint.
      </p>

      <form onSubmit={handleSubmit} className={styles.inputWrapper}>
        <input
          id="moment-prompt"
          name="moment-prompt"
          aria-label="Describe your moment, guests, or space"
          type="text"
          className={styles.input}
          placeholder="Describe your moment, guests, or space (e.g. 'A candlelit vinyl listening party with Chet Baker and amaro')..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className={styles.submitBtn} disabled={isLoading || !inputVal.trim()}>
          {isLoading ? 'Synthesizing...' : 'Synthesize Atmosphere'}
        </button>
      </form>

      <div className={styles.suggestionsSection}>
        <span className={styles.suggestionsLabel}>Or explore curated cultural moments:</span>
        <div className={styles.pillGrid}>
          {CURATED_SEEDS.map((seed, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.pill}
              onClick={() => handleSelectSeed(seed)}
              disabled={isLoading}
            >
              &ldquo;{seed}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
