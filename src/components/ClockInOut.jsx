import { useState, useEffect } from 'react';

export default function ClockInOut({ isOpen, onClose }) {
    const [clockedIn, setClockedIn] = useState(() => {
        return localStorage.getItem('stoichrm_clocked_in') === 'true';
    });
    const [clockInTime, setClockInTime] = useState(() => {
        return localStorage.getItem('stoichrm_clock_in_time') || null;
    });
    const [elapsed, setElapsed] = useState('00:00:00');

    useEffect(() => {
        let interval;
        if (clockedIn && clockInTime) {
            interval = setInterval(() => {
                const diff = Date.now() - parseInt(clockInTime);
                const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
                const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
                const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
                setElapsed(`${hrs}:${mins}:${secs}`);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [clockedIn, clockInTime]);

    const handleToggle = () => {
        if (clockedIn) {
            setClockedIn(false);
            localStorage.setItem('stoichrm_clocked_in', 'false');
            localStorage.removeItem('stoichrm_clock_in_time');
            setElapsed('00:00:00');
        } else {
            const now = Date.now().toString();
            setClockedIn(true);
            setClockInTime(now);
            localStorage.setItem('stoichrm_clocked_in', 'true');
            localStorage.setItem('stoichrm_clock_in_time', now);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-surface border border-border rounded-2xl w-full max-w-sm p-6 animate-scale-in text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold text-text-main mb-6">Time Tracker</h2>

                {/* Timer Display */}
                <div className="mb-6">
                    <p className="text-5xl font-bold text-text-main tracking-tight font-mono">{elapsed}</p>
                    <p className="text-sm text-text-muted mt-2">
                        {clockedIn ? 'Session active' : 'Not clocked in'}
                    </p>
                </div>

                {/* Toggle */}
                <button
                    onClick={handleToggle}
                    className={`w-full py-3 font-semibold text-sm rounded-xl transition-default ${clockedIn
                            ? 'bg-danger text-white hover:bg-danger/90'
                            : 'bg-success text-white hover:bg-success/90'
                        }`}
                >
                    {clockedIn ? 'Clock Out' : 'Clock In'}
                </button>

                <button
                    onClick={onClose}
                    className="mt-3 w-full py-2.5 text-sm font-medium text-text-muted hover:text-text-main transition-default"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
