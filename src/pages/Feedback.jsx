import React, { useState } from 'react';
import { Send, MessageSquare, Star, CheckCircle } from 'lucide-react';
import './Feedback.css';

const nbaPlayers = [
    { id: 'lebron', name: 'LeBron James', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png' },
    { id: 'steph', name: 'Stephen Curry', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png' },
    { id: 'kd', name: 'Kevin Durant', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png' },
    { id: 'luka', name: 'Luka Doncic', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png' },
    { id: 'giannis', name: 'Giannis Antetokounmpo', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png' },
    { id: 'wemby', name: 'Victor Wembanyama', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png' },
    { id: 'kyrie', name: 'Kyrie Irving', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png' },
    { id: 'jayson', name: 'Jayson Tatum', img: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png' }
];

const Feedback = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'FEATURE_REQ',
        message: '',
        rating: 5,
        playerId: 'lebron'
    });

    const selectedPlayer = nbaPlayers.find(p => p.id === formData.playerId) || nbaPlayers[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for future DB connection
        console.log('Feedback submitted:', formData);
        setSubmitted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                category: 'FEATURE_REQ',
                message: '',
                rating: 5,
                playerId: 'lebron'
            });
        }, 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="feedback-page locker-room">
            {/* Ambient Background Effects */}
            <div className="ambient-grid"></div>
            <div className="scanner-line"></div>

            <div className="scout-hub">
                <header className="scout-header">
                    <div className="header-top">
                        <div className="live-status">
                            <span className="dot pulse"></span>
                            <span className="text-mono">RELAY ACTIVE</span>
                        </div>
                        <div className="scout-id text-mono">ID: 08-SS-2026</div>
                    </div>
                    <h1 className="text-display title-glitch" data-text="SCOUTING REPORT">SCOUTING REPORT</h1>
                    <p className="subtitle text-mono">FEEDBACK & FIELD ANALYSIS // [STATS.NBA.INPUT]</p>
                </header>

                {submitted ? (
                    <div className="transmission-success">
                        <div className="terminal-log">
                            <p className="text-mono">[SYSTEM] UPLOADING FEEDBACK...</p>
                            <p className="text-mono">[SYSTEM] PACKET VERIFIED.</p>
                            <p className="text-mono">[SYSTEM] SECURE RELAY ESTABLISHED.</p>
                            <h2 className="text-display">TRANSMISSION RECEIVED</h2>
                            <div className="terminal-bar"></div>
                            <p className="text-mono">YOUR SCOUTING REPORT HAS BEEN INDEXED IN THE STATSMASH VAULT.</p>
                        </div>
                    </div>
                ) : (
                    <form className="scout-form" onSubmit={handleSubmit}>
                        <div className="form-main-area">
                            {/* Left Side: "Press Pass" / ID Card Style */}
                            <div className="scout-profile">
                                <div className="profile-photo">
                                    <img
                                        src={selectedPlayer.img}
                                        alt={selectedPlayer.name}
                                        className="agent-img"
                                    />
                                    <div className="photo-overlay"></div>
                                </div>
                                <div className="profile-details">
                                    <div className="input-wrap">
                                        <label className="text-mono">SELECT AGENT</label>
                                        <select
                                            name="playerId"
                                            value={formData.playerId}
                                            onChange={handleChange}
                                            className="agent-select"
                                        >
                                            {nbaPlayers.map(player => (
                                                <option key={player.id} value={player.id}>
                                                    {player.name.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-wrap">
                                        <label className="text-mono">SCOUT NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="ENTER CALLSIGN"
                                            required
                                        />
                                    </div>
                                    <div className="input-wrap">
                                        <label className="text-mono">CONTACT RELAY</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="EMAIL (OPTIONAL)"
                                        />
                                    </div>
                                </div>
                                <div className="scout-rank">
                                    <label className="text-mono">INTEL TYPE</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option>FEATURE_REQ</option>
                                        <option>DATA_BUG</option>
                                        <option>UI_FEEDBACK</option>
                                        <option>GENERAL_TAKE</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Side: The "Transcript" Area */}
                            <div className="scout-intel">
                                <div className="intel-header">
                                    <span className="text-mono">[TRANSCRIPT_LOG]</span>
                                    <div className="rating-selector">
                                        <span className="text-mono">IMPORTANCE:</span>
                                        <div className="stars">
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    className={formData.rating >= num ? 'active' : ''}
                                                    onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                                                >
                                                    <Star size={18} fill={formData.rating >= num ? "var(--nba-gold)" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="TYPE YOUR ANALYSIS HERE... BREAK DOWN THE DATA, REPORT BUGS, OR SUGGEST THE NEXT BIG FEATURE."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="scout-submit-btn text-display">
                            <Send size={24} /> INITIALIZE UPLOAD
                        </button>
                    </form>
                )}

                <footer className="scout-footer text-mono">
                    STATSMASH // INTELLIGENCE DIVISION // CORE_V1.0.0
                </footer>
            </div>
        </div>
    );
};

export default Feedback;
