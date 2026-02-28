import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LeaveModal({ isOpen, onClose }) {
    const { currentUser } = useAuth();
    const [leaveType, setLeaveType] = useState('Annual');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const types = ['Annual', 'Sick', 'Personal'];

    const calculateDays = useCallback(() => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return diff > 0 ? diff : 0;
    }, [startDate, endDate]);

    const requestedDays = calculateDays();
    const remaining = (currentUser?.leaveBalance || 0) - requestedDays;

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app this would call an API
        alert(`Leave request submitted!\nType: ${leaveType}\nDates: ${startDate} to ${endDate}\nDays: ${requestedDays}`);
        onClose();
        setStartDate('');
        setEndDate('');
        setLeaveType('Annual');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-text-main">Request Leave</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary transition-default text-text-muted"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Leave Type — Segmented Control */}
                    <div>
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">Type</label>
                        <div className="flex gap-1 p-1 bg-primary rounded-xl">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setLeaveType(type)}
                                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-default ${leaveType === type
                                            ? 'bg-action text-white shadow-sm'
                                            : 'text-text-muted hover:text-text-main'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="w-full px-3 py-2.5 text-sm text-text-main bg-primary border border-border rounded-xl focus:outline-none focus:border-action focus:ring-1 focus:ring-action/20 transition-default"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate}
                                required
                                className="w-full px-3 py-2.5 text-sm text-text-main bg-primary border border-border rounded-xl focus:outline-none focus:border-action focus:ring-1 focus:ring-action/20 transition-default"
                            />
                        </div>
                    </div>

                    {/* Balance Preview */}
                    {requestedDays > 0 && (
                        <div className={`flex items-center justify-between p-3 rounded-xl text-sm ${remaining >= 0 ? 'bg-success/5 text-success' : 'bg-danger/5 text-danger'
                            }`}>
                            <span className="font-medium">Remaining balance after this:</span>
                            <span className="font-bold text-lg">{remaining}d</span>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={requestedDays <= 0 || remaining < 0}
                        className="w-full py-3 bg-action text-white font-semibold text-sm rounded-xl hover:bg-action-hover disabled:opacity-40 disabled:cursor-not-allowed transition-default"
                    >
                        Submit Request · {requestedDays > 0 ? `${requestedDays} day${requestedDays > 1 ? 's' : ''}` : 'Select dates'}
                    </button>
                </form>
            </div>
        </div>
    );
}
