import { useNavigate } from 'react-router-dom';

export default function QuickActionBar({ onRequestLeave, onClockToggle, clockedIn }) {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 animate-slide-up">
            <div className="flex items-center gap-2 bg-surface border border-border rounded-2xl px-3 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                {/* Request Leave */}
                <button
                    onClick={onRequestLeave}
                    className="flex items-center gap-2 px-4 py-2 bg-action text-white text-sm font-medium rounded-xl hover:bg-action-hover transition-default"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="hidden sm:inline">Request Leave</span>
                </button>

                {/* Clock In/Out */}
                <button
                    onClick={onClockToggle}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-default border ${clockedIn
                        ? 'bg-danger/8 text-danger border-danger/20 hover:bg-danger/15'
                        : 'bg-success/8 text-success border-success/20 hover:bg-success/15'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="hidden sm:inline">{clockedIn ? 'Clock Out' : 'Clock In'}</span>
                </button>

                {/* Search Directory */}
                <button
                    onClick={() => navigate('/directory')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border text-text-muted hover:text-text-main hover:border-text-muted transition-default"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="hidden sm:inline">Search</span>
                </button>
            </div>
        </div>
    );
}
