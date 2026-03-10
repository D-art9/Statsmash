import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader, Zap, Activity, Info, ChevronRight, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './Court.css';

const Court = () => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState(null);
    const [feed, setFeed] = useState([
        { type: 'system', text: 'LOG::CORE_INITIALIZED // READY_FOR_QUERY' }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [feed, isSearching]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const currentQuery = query.trim();
        if (!currentQuery) return;

        setIsSearching(true);
        setQuery(''); // Clear input for next query

        // Add user query to feed
        setFeed(prev => [...prev, { type: 'user', text: currentQuery }]);

        try {
            const response = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: currentQuery }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
            setFeed(prev => [...prev, { type: 'result', data: data }]);
        } catch (error) {
            console.error('Error searching:', error);
            const errorData = {
                playerName: "ERROR",
                playerImage: "https://cdn.nba.com/headshots/nba/latest/1040x760/logoman.png",
                stat: "CONNECTION_FAILED",
                answer: "The StatSmash uplink is down. Make sure the backend server (FastAPI) is running on port 8000.",
                confidence: "0%",
                time: "0ms"
            };
            setResult(errorData);
            setFeed(prev => [...prev, { type: 'result', data: errorData }]);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="court-container">
            {/* LEFT: Analytics Feed */}
            <div className="chat-timeline">
                <div className="timeline-header">
                    <div className="header-orb"></div>
                    <h2 className="text-display">ANALYTICS FEED</h2>
                    <span className="text-mono gold-label">UPLINK_01</span>
                </div>

                <div className="messages-stream">
                    {feed.map((msg, index) => {
                        if (msg.type === 'system') {
                            return (
                                <div key={index} className="timeline-msg system">
                                    <Activity size={12} className="gold" />
                                    <span className="text-mono">{msg.text}</span>
                                </div>
                            );
                        }
                        if (msg.type === 'user') {
                            return (
                                <div key={index} className="timeline-msg user">
                                    <User size={12} />
                                    <span className="text-mono">&gt; {msg.text}</span>
                                </div>
                            );
                        }
                        if (msg.type === 'result') {
                            return (
                                <div key={index} className="timeline-msg result animate-pop-in">
                                    <div className="msg-header">
                                        <div className="scout-tag">
                                            <Info size={10} />
                                            <span className="text-mono">SCOUT_INTELLIGENCE</span>
                                        </div>
                                        <span className="text-tiny opacity-50">{msg.data.time}</span>
                                    </div>
                                    <div className="markdown-content text-body">
                                        <ReactMarkdown>{msg.data.answer}</ReactMarkdown>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}

                    {isSearching && (
                        <div className="timeline-msg system">
                            <Loader size={12} className="gold spin" />
                            <span className="text-mono">PULLING_ARCHIVES...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSearch} className="brutal-input-container">
                    <div className="input-prefix text-mono">&gt;</div>
                    <input
                        type="text"
                        className="brutal-input text-mono"
                        placeholder="INPUT_QUERY_HERE..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit" className="brutal-btn" disabled={isSearching}>
                        {isSearching ? <Loader className="spin" size={18} /> : <ChevronRight size={18} />}
                    </button>
                </form>
            </div>

            {/* RIGHT: Focus Area */}
            <div className="focus-area">
                <div className="focus-grid-overlay"></div>
                {!result && !isSearching ? (
                    <div className="focus-placeholder">
                        <div className="glitch-logo">STATSMASH</div>
                        <div className="status-container">
                            <div className="status-dot pulse"></div>
                            <p className="text-mono opacity-50">LISTENING_FOR_FEED</p>
                        </div>
                    </div>
                ) : (
                    <div className="focus-content">
                        <div className={`player-reveal ${result ? 'active' : ''}`}>
                            {result && (
                                <>
                                    <div className="player-card-wrapper">
                                        <div className="player-card">
                                            <div className="card-accents">
                                                <div className="corner-tl"></div>
                                                <div className="corner-tr"></div>
                                                <div className="corner-bl"></div>
                                                <div className="corner-br"></div>
                                            </div>
                                            <div className="card-inner">
                                                <img src={result.playerImage} alt={result.playerName} className="player-img" />
                                                <div className="player-name-plate">
                                                    <h1 className="text-display player-title">{result.playerName.toUpperCase()}</h1>
                                                    <div className="stat-tag text-mono">{result.stat}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="reveal-metadata">
                                        <div className="meta-box">
                                            <span className="label">ACCURACY</span>
                                            <span className="value gold">{result.confidence}</span>
                                        </div>
                                        <div className="meta-box">
                                            <span className="label">LATENCY</span>
                                            <span className="value">{result.time}</span>
                                        </div>
                                        <div className="meta-box">
                                            <span className="label">VECTOR_MODEL</span>
                                            <span className="value">SBERT_MINILM_L6</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {isSearching && (
                                <div className="searching-overlay">
                                    <div className="loader-ring"></div>
                                    <h2 className="text-display animate-pulse mt-4">PULLING_ARCHIVES</h2>
                                    <div className="scan-line"></div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Court;
