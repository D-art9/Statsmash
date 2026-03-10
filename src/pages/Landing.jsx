import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Crown, Youtube, ExternalLink, Play } from 'lucide-react';
import './Landing.css';

const MOCK_SCORES = [
    { id: 1, away: 'LAL', awayScore: 108, home: 'DEN', homeScore: 114, status: 'FINAL' },
    { id: 2, away: 'BOS', awayScore: 120, home: 'MIA', homeScore: 118, status: 'FINAL' },
    { id: 3, away: 'GSW', awayScore: 132, home: 'PHX', homeScore: 127, status: 'OT' }
];

const ALL_TIME_RECORDS = [
    {
        category: "ALL-TIME POINTS",
        rank1: { name: "LeBron James", id: 2544, value: "40,078", team: "LAL" },
        rank2: { name: "Kareem Abdul-Jabbar", id: 76003, value: "38,387", team: "LAL" },
        rank3: { name: "Karl Malone", id: 252, value: "36,928", team: "UTH" },
        unit: "PTS",
        color: "var(--nba-red)"
    },
    {
        category: "ALL-TIME ASSISTS",
        rank1: { name: "John Stockton", id: 304, value: "15,806", team: "UTH" },
        rank2: { name: "Jason Kidd", id: 101108, value: "12,091", team: "NJN" },
        rank3: { name: "LeBron James", id: 2544, value: "11,000+", team: "LAL" },
        unit: "AST",
        color: "var(--nba-blue)"
    },
    {
        category: "ALL-TIME REBOUNDS",
        rank1: { name: "Wilt Chamberlain", id: 76375, value: "23,924", team: "PHI" },
        rank2: { name: "Bill Russell", id: 77427, value: "21,620", team: "BOS" },
        rank3: { name: "Kareem Abdul-Jabbar", id: 76003, value: "17,440", team: "LAL" },
        unit: "REB",
        color: "var(--nba-gold)"
    }
];

const getNextUpdateDate = () => {
    // Assuming 'today' is the epoch when this interval starts
    const epoch = new Date('2026-03-07T00:00:00');
    const today = new Date();
    // Prevent negative diffs if timezone differences occur
    const diff = Math.max(0, today - epoch);
    const daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
    // Calculate days until the next 3rd day interval
    let daysToNextUpdate = 3 - (daysSince % 3);
    if (daysToNextUpdate === 0) daysToNextUpdate = 3;

    const targetDate = new Date(today.getTime() + (daysToNextUpdate * 24 * 60 * 60 * 1000));
    return `${targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

const Landing = () => {
    const navigate = useNavigate();
    const [ytStats, setYtStats] = useState({ subs: '...', videos: '...' });

    useEffect(() => {
        const fetchYT = async () => {
            try {
                const res = await fetch('http://localhost:8000/youtube/stats');
                if (!res.ok) throw new Error("API failed");
                const data = await res.json();

                // Only update if we actually got stats back
                if (data.subscriberCount && data.videoCount) {
                    setYtStats({
                        subs: data.subscriberCount,
                        videos: data.videoCount
                    });
                }
            } catch (err) {
                console.error("Error loading YT stats:", err);
                // Keep the '...' or set to '--' on error so it doesn't stay blank
                setYtStats({ subs: '--', videos: '--' });
            }
        };
        fetchYT();
    }, []);

    return (
        <div className="landing-page">
            <div className="hero-section">
                <div className="hero-content animate-slide-up">
                    <div className="badge text-mono">
                        <Activity size={18} className="icon-pulse" />
                        LIVE RAG ENGINE ACTIVE
                    </div>
                    <h1 className="hero-headline text-display">
                        ASK THE<br />
                        <span className="primary-gradient-text">HARDWOOD</span><br />
                        ANYTHING.
                    </h1>
                    <p className="hero-subline text-mono">
                        Every stat. Every season. Every legend.<br />
                        Settle debates, dig up records, and prove your friends wrong.
                    </p>
                    <button className="cta-button text-display" onClick={() => navigate('/ask')}>
                        START DIGGING <ArrowRight size={28} />
                    </button>
                </div>

                {/* Right side visuals: Scrolling Players + Court */}
                <div className="hero-visuals animate-slide-in-right">
                    {/* Vertical scrolling players */}
                    <div className="scrolling-players-container">
                        <div className="scrolling-players">
                            {[2544, 201939, 201142, 203507, 203999, 1629029, 1628369, 203954, 1628983].map(id => (
                                <img key={id} src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`} alt="NBA Player" className="player-scroll-img" />
                            ))}
                        </div>
                        <div className="scrolling-players" aria-hidden="true">
                            {[2544, 201939, 201142, 203507, 203999, 1629029, 1628369, 203954, 1628983].map(id => (
                                <img key={`dup-${id}`} src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`} alt="NBA Player" className="player-scroll-img" />
                            ))}
                        </div>
                    </div>

                    {/* Abstract basketball court visual element */}
                    <div className="court-visual">
                        <div className="court-lines">
                            <div className="paint-area"></div>
                            <div className="three-point-arc"></div>
                            <div className="free-throw-circle"></div>
                        </div>
                    </div>
                </div>

                {/* Right side visuals: Latest Scores */}
                <div className="scores-panel animate-slide-up">
                    <div className="scores-header">
                        <h2 className="text-display">LATEST SCORES</h2>
                        <div className="update-badge text-mono">
                            <Calendar size={14} /> REFRESH CYCLE: EVERY 3 DAYS
                        </div>
                        <div className="next-update text-mono">
                            NEXT DATA PULL: <span className="primary-gradient-text">{getNextUpdateDate()}</span>
                        </div>
                    </div>

                    <div className="scores-list">
                        {MOCK_SCORES.map(game => (
                            <div key={game.id} className="score-card">
                                <div className="score-team">
                                    <span className="team-name text-display">{game.away}</span>
                                    <span className="team-score text-mono">{game.awayScore}</span>
                                </div>
                                <div className="score-divider text-mono">@</div>
                                <div className="score-team">
                                    <span className="team-name text-display">{game.home}</span>
                                    <span className="team-score text-mono">{game.homeScore}</span>
                                </div>
                                <div className="score-status text-mono">{game.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All-Time Records Section */}
            <div className="alltime-section">
                <div className="alltime-header">
                    <Crown size={28} color="var(--nba-gold)" />
                    <h2 className="text-display">ALL-TIME RECORDS</h2>
                    <span className="update-badge text-mono"><Calendar size={13} /> NEXT UPDATE: {getNextUpdateDate()}</span>
                </div>
                <div className="alltime-grid">
                    {ALL_TIME_RECORDS.map((record, i) => (
                        <div key={i} className="alltime-card" style={{ '--record-color': record.color }}>
                            <div className="alltime-category text-mono">{record.category}</div>
                            {[record.rank1, record.rank2, record.rank3].map((player, rank) => (
                                <div key={rank} className={`alltime-row ${rank === 0 ? 'alltime-row--gold' : ''}`}>
                                    <span className="alltime-rank text-mono">#{rank + 1}</span>
                                    <img
                                        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
                                        alt={player.name}
                                        className="alltime-thumb"
                                    />
                                    <span className="alltime-name">{player.name}</span>
                                    <span className="alltime-value text-mono" style={{ color: record.color }}>
                                        {player.value} {record.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* YouTube Channel Section */}
            <div className="yt-section">
                <div className="yt-inner">
                    {/* Left: Channel Card */}
                    <div className="yt-channel-card">
                        <div className="yt-avatar-wrap">
                            <img
                                src="https://yt3.googleusercontent.com/1aqLPBAWjkNSGUUFgCV1Kp24tDOro_ePC218-NrXUGDV2Qd9LsVNwesK9Vuw5moRUopczW9g=s160-c-k-c0x00ffffff-no-rj"
                                alt="Notakid avatar"
                                className="yt-avatar"
                            />
                            <div className="yt-live-dot" />
                        </div>
                        <div className="yt-channel-info">
                            <h2 className="text-display yt-channel-name">NOTAKID</h2>
                            <span className="text-mono yt-handle">@notakid3106</span>
                            <p className="yt-bio">
                                Had a channel. Got terminated. Back on the grind.
                                NBA takes, debates, and the kind of analysis that actually holds up.
                            </p>
                            <div className="yt-stats text-mono">
                                <div className="yt-stat">
                                    <span className="yt-stat-val">{ytStats.subs}</span>
                                    <span className="yt-stat-label">SUBSCRIBERS</span>
                                </div>
                                <div className="yt-stat-divider" />
                                <div className="yt-stat">
                                    <span className="yt-stat-val">{ytStats.videos}</span>
                                    <span className="yt-stat-label">VIDEOS</span>
                                </div>
                            </div>
                            <a
                                href="https://www.youtube.com/@notakid3106"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="yt-subscribe-btn text-display"
                            >
                                <Youtube size={22} /> VISIT CHANNEL <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Featured video placeholders */}
                    <div className="yt-videos">
                        <div className="yt-videos-label text-mono">LATEST DROPS</div>
                        {[
                            {
                                title: "Rings Don't Decide NBA Legacies — Narratives Do",
                                url: "https://www.youtube.com/shorts/p35n3EEno5Y",
                                thumb: "https://i.ytimg.com/vi/p35n3EEno5Y/oardefault.jpg"
                            },
                            {
                                title: "Brandon Williams CLUTCH Three Seals Mavs Victory! 🔥",
                                url: "https://www.youtube.com/shorts/TzQ9U25gSkM",
                                thumb: "https://i.ytimg.com/vi/TzQ9U25gSkM/oardefault.jpg"
                            },
                            {
                                title: "MAVS DROP 144 ON JAZZ! Klay Goes VINTAGE 🔥",
                                url: "https://www.youtube.com/shorts/HAhdImj28sM",
                                thumb: "https://i.ytimg.com/vi/HAhdImj28sM/oardefault.jpg"
                            },
                        ].map((video, i) => (
                            <a
                                key={i}
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="yt-video-card"
                            >
                                <div className="yt-thumb">
                                    <img src={video.thumb} alt={video.title} className="yt-thumb-img" />
                                </div>
                                <div className="yt-video-info">
                                    <p className="yt-video-title">{video.title}</p>
                                    <span className="text-mono yt-video-meta">NOTAKID · youtube.com/shorts</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="marquee-container text-mono">
                <div className="marquee">
                    <span>[INGEST] Player Stats: L. James (LAL) updated successfully.</span>
                    <span>[VECTOR] 12,045 new game logs indexed.</span>
                    <span>[QUERY] "Highest TS% in 2016" -{">"} Answer found in 42ms.</span>
                    <span>[INGEST] Player Stats: S. Curry (GSW) updated successfully.</span>
                    <span>[API] Connection to stats.nba.com established.</span>
                    <span>[INGEST] Player Stats: L. James (LAL) updated successfully.</span>
                    <span>[VECTOR] 12,045 new game logs indexed.</span>
                    <span>[QUERY] "Highest TS% in 2016" -{">"} Answer found in 42ms.</span>
                </div>
            </div>
        </div>
    );
};

export default Landing;
