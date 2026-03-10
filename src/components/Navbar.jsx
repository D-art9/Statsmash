import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <header className={`navbar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
            <nav className="navbar">
                <Link to="/" className="nav-brand text-display" style={{ textDecoration: 'none' }}>
                    <span className="brand-stat">STAT</span>
                    <span className="brand-smash">SMASH</span>
                </Link>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                    </NavLink>
                    <NavLink to="/ask" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        The Court
                    </NavLink>
                    <NavLink to="/architecture" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Under The Hood
                    </NavLink>
                    <NavLink to="/feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Feedback
                    </NavLink>
                </div>
            </nav>
            <button
                className="nav-toggle-tab"
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand Header" : "Collapse Header"}
            >
                {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
        </header>
    );
};

export default Navbar;
