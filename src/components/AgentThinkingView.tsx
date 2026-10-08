'use client';

import React from 'react';
import styles from './AgentThinkingView.module.css';
import { AgentStepLog } from '@/lib/agent/tools';

interface AgentThinkingViewProps {
  steps: AgentStepLog[];
  isComplete: boolean;
}

export function AgentThinkingView({ steps, isComplete }: AgentThinkingViewProps) {
  if (steps.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.pulseDot} />
          <span>{isComplete ? 'CULTURAL SYNTHESIS COMPLETE' : 'AGENTIC CULTURAL REASONING IN PROGRESS'}</span>
        </div>
        <span className={styles.statusText}>
          {isComplete ? 'BLUEPRINT READY' : `${steps.length} STAGES TRAVERSED`}
        </span>
      </div>

      <div className={styles.stepList}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.stepItem}>
            <div className={styles.stepNumber}>0{idx + 1}</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{step.step}</div>
              <div className={styles.stepDetail}>{step.detail}</div>
              {step.data ? (
                <div className={styles.dataPreview}>
                  {Array.isArray(step.data)
                    ? step.data.map((d: { name: string }) => d.name).join(' • ')
                    : JSON.stringify(step.data)}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
