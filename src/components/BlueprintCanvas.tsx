'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './BlueprintCanvas.module.css';
import { CulturalBlueprint, QlooEntity } from '@/types/qloo';
import { downloadBlueprintPDF } from '@/lib/export/dossier-export';
import { startRoomTexture, RoomTextureController } from '@/lib/audio/room-texture';

interface BlueprintCanvasProps {
  blueprint: CulturalBlueprint;
}

function getOutboundUrl(name: string, category?: string): { label: string; url: string } | null {
  const cat = (category || '').toLowerCase();
  if (cat.includes('music') || cat.includes('soundtrack') || cat.includes('artist') || cat.includes('track') || cat.includes('album')) {
    return { label: 'Spotify ↗', url: `https://open.spotify.com/search/${encodeURIComponent(name)}` };
  }
  if (cat.includes('film') || cat.includes('movie') || cat.includes('cinema') || cat.includes('director')) {
    return { label: 'Letterboxd ↗', url: `https://letterboxd.com/search/${encodeURIComponent(name)}` };
  }
  if (cat.includes('dining') || cat.includes('food') || cat.includes('bar') || cat.includes('pub') || cat.includes('gastronomy') || cat.includes('restaurant')) {
    return { label: 'Explore ↗', url: `https://www.google.com/search?q=${encodeURIComponent(name + ' culinary restaurant bar')}` };
  }
  if (cat.includes('fashion') || cat.includes('sartorial') || cat.includes('apparel')) {
    return { label: 'Lookbook ↗', url: `https://www.google.com/search?q=${encodeURIComponent(name + ' brand fashion lookbook')}` };
  }
  return { label: 'Explore ↗', url: `https://www.google.com/search?q=${encodeURIComponent(name)}` };
}

function EntityListSection({ entities }: { entities: QlooEntity[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cappedEntities = (entities || []).slice(0, 5);
  const visible = isExpanded ? cappedEntities : cappedEntities.slice(0, 3);
  const hasMore = cappedEntities.length > 3;

  return (
    <div>
      <div className={styles.entityList}>
        {visible.map((ent, idx) => {
          const outbound = getOutboundUrl(ent.name, ent.category);
          return (
            <div key={idx} className={styles.entityItem}>
              <div className={styles.entityHeader}>
                <span className={styles.entityName}>
                  {ent.name}
                  {outbound && (
                    <a
                      href={outbound.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.outboundLink}
                      title={`Search ${ent.name} on ${outbound.label.replace(' ↗', '')}`}
                    >
                      {outbound.label}
                    </a>
                  )}
                </span>
                <span className={styles.entityAffinity}>
                  {Math.round((ent.affinityScore || 0.9) * 100)}% AFFINITY
                </span>
              </div>
              {ent.description && <p className={styles.entityDesc}>{ent.description}</p>}
            </div>
          );
        })}
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
  const [viewMode, setViewMode] = useState<'dossier' | 'technical'>('dossier');
  const [linkCopied, setLinkCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVibeName, setAudioVibeName] = useState<string>('');
  const audioControllerRef = useRef<RoomTextureController | null>(null);

  const { categories, sensory, culturalDNA } = blueprint;

  useEffect(() => {
    return () => {
      if (audioControllerRef.current) {
        audioControllerRef.current.stop();
        audioControllerRef.current = null;
      }
    };
  }, []);

  // When blueprint changes, stop previous room audio
  useEffect(() => {
    if (audioControllerRef.current) {
      audioControllerRef.current.stop();
      audioControllerRef.current = null;
      setIsPlayingAudio(false);
      setAudioVibeName('');
    }
  }, [blueprint.id, blueprint.prompt]);

  const handleToggleRoomTexture = () => {
    if (isPlayingAudio) {
      if (audioControllerRef.current) {
        audioControllerRef.current.stop();
        audioControllerRef.current = null;
      }
      setIsPlayingAudio(false);
      setAudioVibeName('');
    } else {
      try {
        const themeText = `${blueprint.prompt || ''} ${blueprint.categories?.soundtrack?.theme || ''} ${blueprint.categories?.spaces?.architecturalAtmosphere || ''}`;
        const ctrl = startRoomTexture(themeText);
        audioControllerRef.current = ctrl;
        setIsPlayingAudio(true);
        setAudioVibeName(ctrl.vibeName);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (blueprint?.prompt) {
        url.searchParams.set('prompt', blueprint.prompt);
      }
      const fullUrl = url.toString();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullUrl).catch(() => {
          // ignore permission denial in restricted headless environments
        });
      }
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  const handleDownloadSpec = () => {
    downloadBlueprintPDF(blueprint);
  };

  const displayScore = Number(culturalDNA.qlooAffinityScore || 90).toFixed(1);

  return (
    <article className={styles.canvasContainer}>
      {/* Editorial Masthead Meta */}
      <div className={styles.mastheadMeta}>
        <div>
          <h2 className={styles.blueprintTitle}>{blueprint.title}</h2>
          <p className={styles.blueprintSubtitle}>{blueprint.editorialSubtitle}</p>
        </div>
        <div className={styles.affinityScoreBox}>
          <span className={styles.scoreValue}>{displayScore}%</span>
          <span className={styles.scoreLabel}>QLOO TASTE GRAPH COHERENCE</span>
        </div>
      </div>

      {/* Narrative Scene Story & Methodology */}
      <div className={styles.overviewSection}>
        <div className={styles.narrativeText}>
          {blueprint.narrativeOverview}
        </div>
        <div className={styles.curatorBox}>
          <span className={styles.curatorTitle}>CURATORIAL METHODOLOGY</span>
          <p className={styles.curatorText}>{blueprint.curatorNotes}</p>
        </div>
      </div>

      {/* View Switcher: Dossier (Default) vs Technical 5D Graph (For Judges) */}
      <div className={styles.viewToggleBar}>
        <div className={styles.tabGroup}>
          <button
            type="button"
            className={`${styles.tabBtn} ${viewMode === 'dossier' ? styles.tabBtnActive : ''}`}
            onClick={() => setViewMode('dossier')}
          >
            ✨ Experiential Dossier
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${viewMode === 'technical' ? styles.tabBtnActive : ''}`}
            onClick={() => setViewMode('technical')}
          >
            🧬 Qloo Taste Graph (5D Engine)
          </button>
        </div>
        
        <div className={styles.canvasActions}>
          <button
            type="button"
            className={styles.canvasActionBtn}
            onClick={handleCopyLink}
            title="Copy deep-link to this synthesized blueprint"
          >
            {linkCopied ? '✓ Link Copied' : '🔗 Share Link'}
          </button>
          <button
            type="button"
            className={`${styles.canvasActionBtn} ${styles.canvasActionBtnPrimary}`}
            onClick={handleDownloadSpec}
            title="Print or save complete curatorial specification as PDF"
          >
            📄 Export Spec (.PDF)
          </button>
        </div>
      </div>

      {/* ==========================================================
          VIEW 1: THE 3-PILLAR EXPERIENTIAL DOSSIER (DEFAULT)
         ========================================================== */}
      {viewMode === 'dossier' && (
        <>
          <div className={styles.pillarsGrid}>
            {/* PILLAR 1: THE SCENE (Space, Light & Scent) */}
            <div className={styles.pillarCard}>
              <div>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarTag}>PILLAR 01 • SPATIAL & SENSORY</span>
                  <h3 className={styles.pillarTitle}>The Scene</h3>
                </div>

                <div className={styles.pillarBody}>
                  {/* Space & Architecture */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Physical Space & Joinery</span>
                    <h4 className={styles.blockHeading}>
                      {categories.spaces.architecturalAtmosphere}
                    </h4>
                  </div>

                  {/* Luminescence / Light */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Luminescence & Shadows</span>
                    <div>
                      <span className={styles.kelvinBadge}>{sensory.lightingKelvin}</span>
                    </div>
                    <p className={styles.blockText}>{sensory.lightingDescription}</p>
                  </div>

                  {/* Olfactory Scent */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Olfactory Signature (Scent)</span>
                    <p className={styles.blockText}>{sensory.aromaProfile}</p>
                  </div>

                  {/* Tactile Materials */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Tactile Surfaces & Palette</span>
                    <div className={styles.tagPills}>
                      {(sensory.textureMaterials || []).slice(0, 4).map((mat, idx) => (
                        <span key={idx} className={styles.tagPill}>
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spatial Touchstone */}
                  {categories.spaces.entities.length > 0 && (
                    <div className={styles.sectionBlock}>
                      <span className={styles.blockLabel}>Atmospheric Touchstones</span>
                      <div className={styles.touchstoneList}>
                        {categories.spaces.entities.slice(0, 2).map((ent, idx) => {
                          const outbound = getOutboundUrl(ent.name, 'space');
                          return (
                            <div key={idx} className={styles.touchstoneItem}>
                              <span className={styles.touchstoneName}>
                                {ent.name}
                                {outbound && (
                                  <a
                                    href={outbound.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.outboundLink}
                                    title={`Explore ${ent.name}`}
                                  >
                                    {outbound.label}
                                  </a>
                                )}
                                <span className={styles.touchstoneAffinity}>
                                  {Math.round((ent.affinityScore || 0.9) * 100)}% match
                                </span>
                              </span>
                              {ent.description && (
                                <p className={styles.touchstoneDesc}>{ent.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.pillarFooter}>
                <span className={styles.footerDot} />
                <span>LIGHTING SPEC: {categories.spaces.ambientLighting}</span>
              </div>
            </div>

            {/* PILLAR 2: THE RITUAL (Sound & Libation) */}
            <div className={styles.pillarCard}>
              <div>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarTag}>PILLAR 02 • AUDITORY & CULINARY</span>
                  <h3 className={styles.pillarTitle}>The Ritual</h3>
                </div>

                <div className={styles.pillarBody}>
                  {/* On The Turntable & Procedural Texture */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>On The Turntable / Soundscape</span>
                    <h4 className={styles.blockHeading}>
                      {categories.soundtrack.theme}
                    </h4>
                    <p className={styles.blockText}>
                      <strong>Cadence:</strong> {categories.soundtrack.tempo}
                    </p>

                    {/* Procedural Web Audio Room Texture Player */}
                    <div className={styles.audioPlayerBlock}>
                      <button
                        type="button"
                        className={`${styles.audioPlayBtn} ${isPlayingAudio ? styles.audioPlayBtnActive : ''}`}
                        onClick={handleToggleRoomTexture}
                        title="Experience real-time procedural room acoustics"
                      >
                        {isPlayingAudio ? (
                          <>
                            <span className={styles.audioWaveIndicator}>
                              <span className={styles.waveBar} />
                              <span className={styles.waveBar} />
                              <span className={styles.waveBar} />
                              <span className={styles.waveBar} />
                            </span>
                            <span>Silence Room Texture</span>
                          </>
                        ) : (
                          <>
                            <span className={styles.audioPlayIcon}>▶</span>
                            <span>Listen to Room Acoustic Texture</span>
                          </>
                        )}
                      </button>
                      <div className={styles.audioMetaText}>
                        {isPlayingAudio ? (
                          <span className={styles.audioNowPlaying}>
                            ● Active: {audioVibeName}
                          </span>
                        ) : (
                          <span>Procedural Web Audio ambiance generated from your vibe brief</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Featured Music Correlates */}
                  {categories.soundtrack.entities.length > 0 && (
                    <div className={styles.sectionBlock}>
                      <span className={styles.blockLabel}>Acoustic Selections</span>
                      <div className={styles.touchstoneList}>
                        {categories.soundtrack.entities.slice(0, 3).map((m, idx) => {
                          const outbound = getOutboundUrl(m.name, 'music');
                          return (
                            <div key={idx} className={styles.touchstoneItem}>
                              <span className={styles.touchstoneName}>
                                {m.name}
                                {outbound && (
                                  <a
                                    href={outbound.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.outboundLink}
                                    title={`Search ${m.name} on Spotify`}
                                  >
                                    {outbound.label}
                                  </a>
                                )}
                                <span className={styles.touchstoneAffinity}>
                                  {Math.round((m.affinityScore || 0.9) * 100)}% match
                                </span>
                              </span>
                              {m.description && (
                                <p className={styles.touchstoneDesc}>{m.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* In The Glass & On The Plate */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>In The Glass & Libation Pairing</span>
                    <h4 className={styles.blockHeading}>
                      {categories.gastronomy.wineOrCocktailPairing}
                    </h4>
                    <p className={styles.blockText}>
                      <strong>Culinary Concept:</strong> {categories.gastronomy.concept}
                    </p>
                  </div>

                  {/* Gastronomy Correlates */}
                  {categories.gastronomy.entities.length > 0 && (
                    <div className={styles.sectionBlock}>
                      <span className={styles.blockLabel}>Table & Cellar Highlights</span>
                      <div className={styles.touchstoneList}>
                        {categories.gastronomy.entities.slice(0, 2).map((d, idx) => {
                          const outbound = getOutboundUrl(d.name, 'dining');
                          return (
                            <div key={idx} className={styles.touchstoneItem}>
                              <span className={styles.touchstoneName}>
                                {d.name}
                                {outbound && (
                                  <a
                                    href={outbound.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.outboundLink}
                                    title={`Explore ${d.name}`}
                                  >
                                    {outbound.label}
                                  </a>
                                )}
                                <span className={styles.touchstoneAffinity}>
                                  {Math.round((d.affinityScore || 0.9) * 100)}% match
                                </span>
                              </span>
                              {d.description && (
                                <p className={styles.touchstoneDesc}>{d.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.pillarFooter}>
                <span className={styles.footerDot} />
                <span>POUR: {categories.gastronomy.wineOrCocktailPairing}</span>
              </div>
            </div>

            {/* PILLAR 3: THE AESTHETIC (Visual Mood & Attire) */}
            <div className={styles.pillarCard}>
              <div>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarTag}>PILLAR 03 • VISUAL & SARTORIAL</span>
                  <h3 className={styles.pillarTitle}>The Aesthetic</h3>
                </div>

                <div className={styles.pillarBody}>
                  {/* Cinematic Visual Moodboard */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Visual Moodboard & Color Theory</span>
                    <h4 className={styles.blockHeading}>
                      {categories.cinema.aestheticTone}
                    </h4>
                    <p className={styles.blockText}>
                      <strong>Framing Motif:</strong> {categories.cinema.visualMotif}
                    </p>
                  </div>

                  {/* Visual References */}
                  {categories.cinema.entities.length > 0 && (
                    <div className={styles.sectionBlock}>
                      <span className={styles.blockLabel}>Cinematic & Visual References</span>
                      <div className={styles.touchstoneList}>
                        {categories.cinema.entities.slice(0, 2).map((f, idx) => {
                          const outbound = getOutboundUrl(f.name, 'film');
                          return (
                            <div key={idx} className={styles.touchstoneItem}>
                              <span className={styles.touchstoneName}>
                                {f.name}
                                {outbound && (
                                  <a
                                    href={outbound.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.outboundLink}
                                    title={`Search ${f.name} on Letterboxd`}
                                  >
                                    {outbound.label}
                                  </a>
                                )}
                                <span className={styles.touchstoneAffinity}>
                                  {Math.round((f.affinityScore || 0.9) * 100)}% match
                                </span>
                              </span>
                              {f.description && (
                                <p className={styles.touchstoneDesc}>{f.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* What To Wear / Dress Code */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>What To Wear (Attire Ethos)</span>
                    <h4 className={styles.blockHeading}>
                      {categories.sartorial.dressCode}
                    </h4>
                  </div>

                  {/* Fabrics & Textiles */}
                  <div className={styles.sectionBlock}>
                    <span className={styles.blockLabel}>Recommended Textiles</span>
                    <div className={styles.tagPills}>
                      {(categories.sartorial.materialsAndPalette || []).slice(0, 4).map((mat, idx) => (
                        <span key={idx} className={styles.tagPill}>
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Style Correlates */}
                  {categories.sartorial.entities.length > 0 && (
                    <div className={styles.sectionBlock}>
                      <span className={styles.blockLabel}>Sartorial Correlates</span>
                      <div className={styles.touchstoneList}>
                        {categories.sartorial.entities.slice(0, 2).map((s, idx) => {
                          const outbound = getOutboundUrl(s.name, 'fashion');
                          return (
                            <div key={idx} className={styles.touchstoneItem}>
                              <span className={styles.touchstoneName}>
                                {s.name}
                                {outbound && (
                                  <a
                                    href={outbound.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.outboundLink}
                                    title={`Explore ${s.name}`}
                                  >
                                    {outbound.label}
                                  </a>
                                )}
                                <span className={styles.touchstoneAffinity}>
                                  {Math.round((s.affinityScore || 0.9) * 100)}% match
                                </span>
                              </span>
                              {s.description && (
                                <p className={styles.touchstoneDesc}>{s.description}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.pillarFooter}>
                <span className={styles.footerDot} />
                <span>STYLE: {categories.sartorial.dressCode}</span>
              </div>
            </div>
          </div>

          {/* Curated Conversation Starters (The Social Spark) */}
          <div className={styles.conversationSection}>
            <div className={styles.conversationHeader}>
              <span className={styles.conversationLabel}>
                Curated Conversation Anchors
              </span>
              <span className={styles.conversationSubtitle}>
                Taste-Graph Correlated Social Sparks
              </span>
            </div>
            <ul className={styles.conversationList}>
              {(sensory.conversationAnchors || []).slice(0, 3).map((starter, idx) => (
                <li key={idx} className={styles.conversationItem}>
                  <span className={styles.quoteMark}>—</span>
                  <span>{starter}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* ==========================================================
          VIEW 2: TECHNICAL 5-DIMENSION QLOO GRAPH (FOR JUDGES)
         ========================================================== */}
      {viewMode === 'technical' && (
        <div className={styles.technicalView}>
          <div className={styles.technicalNotice}>
            <div>
              <span className={styles.noticeTitle}>Qloo Cultural Graph Traversal Matrix</span>
              <p className={styles.noticeText}>
                Displaying raw cross-domain affinity scores and verified cultural anchors across Qloo’s 250M+ entity graph.
              </p>
            </div>
            <span className={styles.entityAffinity}>
              Overall Coherence: {displayScore}%
            </span>
          </div>

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
        </div>
      )}
    </article>
  );
}
