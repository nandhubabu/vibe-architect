'use client';

import React, { useState } from 'react';
import styles from './TasteTreeDrawer.module.css';
import {
  TasteNodeCategory,
  UserTasteTree,
  TasteNodeItem,
} from '@/types/qloo';
import {
  updateCategoryWeight,
  addTasteItem,
  removeTasteItem,
  setAutoLearnEnabled,
  resetTasteTree,
  importSearchKeywords,
  SAMPLE_BROWSER_SEARCH_LOG,
} from '@/lib/taste-tree/memory';

interface TasteTreeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasteTree: UserTasteTree;
  onUpdateTree: (tree: UserTasteTree) => void;
}

const CATEGORY_ORDER: TasteNodeCategory[] = [
  'music',
  'film',
  'dining',
  'fashion',
  'atmosphere',
];

export function TasteTreeDrawer({
  isOpen,
  onClose,
  tasteTree,
  onUpdateTree,
}: TasteTreeDrawerProps) {
  const [searchLogInput, setSearchLogInput] = useState('');
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<
    Record<TasteNodeCategory, { name: string; priority: 'high' | 'medium' | 'low' }>
  >({
    music: { name: '', priority: 'high' },
    film: { name: '', priority: 'high' },
    dining: { name: '', priority: 'high' },
    fashion: { name: '', priority: 'medium' },
    atmosphere: { name: '', priority: 'high' },
  });

  if (!isOpen) return null;

  const handlePriorityClick = (category: TasteNodeCategory, weight: number) => {
    const updated = updateCategoryWeight(tasteTree, category, weight);
    onUpdateTree(updated);
  };

  const handleRemove = (category: TasteNodeCategory, itemId: string) => {
    const updated = removeTasteItem(tasteTree, category, itemId);
    onUpdateTree(updated);
  };

  const handleAddItem = (category: TasteNodeCategory) => {
    const target = newItems[category];
    if (!target.name.trim()) return;

    const weightMap = { high: 5, medium: 3, low: 1 };
    const updated = addTasteItem(
      tasteTree,
      category,
      target.name.trim(),
      target.priority,
      weightMap[target.priority],
      'user_defined'
    );
    onUpdateTree(updated);

    setNewItems((prev) => ({
      ...prev,
      [category]: { name: '', priority: target.priority },
    }));
  };

  const handleToggleAutoLearn = () => {
    const nextVal = !tasteTree.autoLearnEnabled;
    const updated = setAutoLearnEnabled(tasteTree, nextVal);
    onUpdateTree(updated);
  };

  const handleReset = () => {
    if (confirm('Reset your taste tree back to the curated baseline?')) {
      const reset = resetTasteTree();
      onUpdateTree(reset);
      setImportFeedback('Reset to curated baseline.');
      setTimeout(() => setImportFeedback(null), 3000);
    }
  };

  const handleExtractFromSearch = () => {
    if (!searchLogInput.trim()) return;
    const { updatedTree, addedCount } = importSearchKeywords(
      tasteTree,
      searchLogInput
    );
    onUpdateTree(updatedTree);
    setSearchLogInput('');
    setImportFeedback(
      `Extracted & categorized ${addedCount} taste signals across your 5 nodes.`
    );
    setTimeout(() => setImportFeedback(null), 4000);
  };

  const handleSimulateBrowserSync = () => {
    setSearchLogInput(SAMPLE_BROWSER_SEARCH_LOG);
    const { updatedTree, addedCount } = importSearchKeywords(
      tasteTree,
      SAMPLE_BROWSER_SEARCH_LOG
    );
    onUpdateTree(updatedTree);
    setImportFeedback(
      `Simulated browser history sync: Categorized ${addedCount} cultural signals into your tree!`
    );
    setTimeout(() => setImportFeedback(null), 4500);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Masthead Header */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.sectionTag}>5-NODE CULTURAL MEMORY ENGINE</span>
            <h2 className={styles.drawerTitle}>User Taste Profile</h2>
            <p className={styles.drawerSubtitle}>
              Persistent taste memory tree prioritized across music, cinema, gastronomy,
              fashion, and spatial architecture. Guides all autonomous synthesis.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close Taste Memory Tree"
          >
            ESC • CLOSE
          </button>
        </div>

        {/* Global Controls */}
        <div className={styles.controlBar}>
          <div className={styles.toggleContainer}>
            <span className={styles.toggleLabel}>Auto-Learn from Blueprints:</span>
            <button
              type="button"
              className={`${styles.toggleButton} ${
                tasteTree.autoLearnEnabled ? styles.toggleActive : styles.toggleInactive
              }`}
              onClick={handleToggleAutoLearn}
            >
              {tasteTree.autoLearnEnabled ? '● ACTIVE (LEARNING ON)' : '○ MUTED'}
            </button>
          </div>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset to Baseline
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.contentScroll}>
          {/* Browser Search Ingestion */}
          <div className={styles.ingestionCard}>
            <div className={styles.ingestionHeader}>
              <div>
                <h3 className={styles.ingestionTitle}>
                  Browser Search & Cultural History Ingestion
                </h3>
                <p className={styles.ingestionDesc}>
                  Connect or paste your recent search queries, discovered artists, or bookmarked places
                  to automatically classify them into your 5 taste nodes with priority weights.
                </p>
              </div>
            </div>

            <textarea
              className={styles.ingestionInput}
              value={searchLogInput}
              onChange={(e) => setSearchLogInput(e.target.value)}
              placeholder="Paste search queries or artist discoveries (e.g., 'natural wine lower east side', 'Alice Coltrane vinyl', 'brutalist concrete lighting', 'Wong Kar-wai film stock')..."
            />

            <div className={styles.ingestionActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleExtractFromSearch}
              >
                Extract & Categorize Signals
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleSimulateBrowserSync}
              >
                ✨ Simulate Browser History Sync
              </button>
            </div>

            {importFeedback && (
              <div className={styles.ingestionToast}>
                <span>✓</span>
                <span>{importFeedback}</span>
              </div>
            )}
          </div>

          {/* 5-Node Taste Tree Cards */}
          <div className={styles.nodesList}>
            {CATEGORY_ORDER.map((catKey) => {
              const node = tasteTree.nodes[catKey];
              if (!node) return null;

              const priorityLabel =
                node.priorityWeight === 5
                  ? '5x (Dominant)'
                  : node.priorityWeight === 4
                  ? '4x (High)'
                  : node.priorityWeight === 3
                  ? '3x (Balanced)'
                  : node.priorityWeight === 2
                  ? '2x (Subtle)'
                  : '1x (Minimal)';

              return (
                <div key={node.id} className={styles.nodeCard}>
                  {/* Node Header with Priority Meter */}
                  <div className={styles.nodeHeader}>
                    <div className={styles.nodeTitleBox}>
                      <span className={styles.nodeIcon}>{node.icon}</span>
                      <div>
                        <h4 className={styles.nodeTitle}>{node.title}</h4>
                        <p className={styles.nodeSubtitle}>{node.subtitle}</p>
                      </div>
                    </div>

                    <div className={styles.priorityBox}>
                      <span className={styles.priorityLabel}>
                        PRIORITY: {priorityLabel}
                      </span>
                      <div className={styles.priorityDots}>
                        {[1, 2, 3, 4, 5].map((w) => (
                          <button
                            key={w}
                            type="button"
                            className={`${styles.dotBtn} ${
                              w <= node.priorityWeight ? styles.dotFilled : ''
                            }`}
                            onClick={() => handlePriorityClick(catKey, w)}
                            title={`Set priority weight to ${w}/5`}
                            aria-label={`Set ${node.title} priority to ${w}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Items list (capped to top 5) */}
                  <div className={styles.itemList}>
                    {node.items.map((item) => {
                      const priorityClass =
                        item.priority === 'high'
                          ? styles.priorityHigh
                          : item.priority === 'medium'
                          ? styles.priorityMed
                          : styles.priorityLow;

                      return (
                        <div key={item.id} className={styles.itemRow}>
                          <div className={styles.itemLeft}>
                            <span className={styles.itemName}>{item.name}</span>
                          </div>

                          <div className={styles.itemBadges}>
                            <span className={`${styles.priorityBadge} ${priorityClass}`}>
                              {item.priority} ({item.weight}x)
                            </span>
                            <span className={styles.sourceBadge}>[{item.source}]</span>
                            <button
                              type="button"
                              className={styles.itemRemove}
                              onClick={() => handleRemove(catKey, item.id)}
                              title="Remove item from taste tree"
                              aria-label={`Remove ${item.name}`}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Anchor Form */}
                  <div className={styles.addItemForm}>
                    <input
                      type="text"
                      className={styles.addInput}
                      placeholder={`Add anchor for ${node.title}...`}
                      value={newItems[catKey].name}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          [catKey]: { ...prev[catKey], name: e.target.value },
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem(catKey);
                        }
                      }}
                    />
                    <select
                      className={styles.addSelect}
                      value={newItems[catKey].priority}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          [catKey]: {
                            ...prev[catKey],
                            priority: e.target.value as 'high' | 'medium' | 'low',
                          },
                        }))
                      }
                    >
                      <option value="high">High (5x)</option>
                      <option value="medium">Med (3x)</option>
                      <option value="low">Low (1x)</option>
                    </select>
                    <button
                      type="button"
                      className={styles.addBtn}
                      onClick={() => handleAddItem(catKey)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerNote}>
            PERSISTED LOCALLY • INJECTED INTO AGENT SYNTHESIS REASONING
          </span>
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
