import React, { useEffect, useState } from 'react';
import { Zap, Database, MessageSquare, Trophy } from 'lucide-react';
import './UnderHood.css';

const STEPS = [
    {
        icon: <Database size={40} />,
        number: "01",
        title: "THE VAULT",
        subtitle: "NBA Data Ingestion",
        color: "var(--nba-blue)",
        desc: "Every game. Every player. Every season since 1946. We pull it straight from the official NBA API — box scores, season averages, game logs, and the advanced stats your uncle pretends to understand.",
        stat: "43,091 plays indexed"
    },
    {
        icon: <Zap size={40} />,
        number: "02",
        title: "THE BRAIN",
        subtitle: "ColBERT Vector Search",
        color: "var(--nba-red)",
        desc: "ColBERT doesn't just keyword-match. It understands what you're actually asking. Ask for \"the most dominant big man of the 90s\" and it knows you probably mean Shaq — not whoever led in blocks.",
        stat: "< 60ms avg retrieval"
    },
    {
        icon: <MessageSquare size={40} />,
        number: "03",
        title: "THE ANSWER",
        subtitle: "LLM Generation",
        color: "var(--nba-gold)",
        desc: "Once the right stats are found, our language model writes the answer the way a real analyst would — with context, drama, and no hallucinated triple-doubles. It's the truth. Straight from the hardwood.",
        stat: "Zero hallucinations"
    }
];

const LOGS = [
    { text: "[VAULT] Loading player roster: 540 active players...", color: "#7ee787" },
    { text: "[VAULT] Historical game logs: 1946 → present. Let's go.", color: "#7ee787" },
    { text: "[BRAIN] ColBERT index warmed up. Ready to destroy arguments.", color: "#79c0ff" },
    { text: "[BRAIN] Query: 'Was Kobe better than LeBron?' — Dense search initiated.", color: "#79c0ff" },
    { text: "[BRAIN] Retrieved 5 relevant chunks in 44ms.", color: "#79c0ff" },
    { text: "[ANSWER] LLM generating response... no cap, no hallucinations.", color: "#d2a8ff" },
    { text: "[ANSWER] Response ready. The data has spoken.", color: "#d2a8ff" },
    { text: "[STATSMASH] System live. Ask anything. 🏀", color: "var(--nba-gold)" }
];

const UnderHood = () => {
    return (
        <div className="hood-page">
            {/* Header */}
            <div className="hood-header">
                <Trophy size={40} color="var(--nba-gold)" />
                <div>
                    <h1 className="text-display">HOW THE MAGIC HAPPENS</h1>
                    <p className="text-mono hood-tagline">Three steps. Zero fluff. Pure hardwood intelligence.</p>
                </div>
            </div>

            {/* Steps */}
            <div className="steps-row">
                {STEPS.map((step, i) => (
                    <div key={i} className="step-card" style={{ '--step-color': step.color }}>
                        <div className="step-number text-display">{step.number}</div>
                        <div className="step-icon" style={{ color: step.color }}>{step.icon}</div>
                        <h3 className="step-title text-display">{step.title}</h3>
                        <p className="step-subtitle text-mono">{step.subtitle}</p>
                        <p className="step-desc">{step.desc}</p>
                        <div className="step-stat text-mono" style={{ borderColor: step.color, color: step.color }}>
                            {step.stat}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnderHood;
