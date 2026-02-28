import { useState, useMemo } from 'react';
import { leaveRequests } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Requests() {
    const { currentUser, role, canApprove, canViewAllRequests } = useAuth();
    const [activeTab, setActiveTab] = useState('all');

    const requests = useMemo(() => {
        let list = canViewAllRequests
            ? leaveRequests
            : leaveRequests.filter(r => r.employeeId === currentUser.id);

        if (activeTab !== 'all') {
            list = list.filter(r => r.status === activeTab);
        }

        return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    }, [activeTab, canViewAllRequests, currentUser.id]);

    const tabs = [
        { key: 'all', label: 'All' },
        { key: 'pending', label: 'Pending' },
        { key: 'approved', label: 'Approved' },
        { key: 'rejected', label: 'Rejected' },
    ];

    const statusClasses = {
        pending: 'badge-pending',
        approved: 'badge-approved',
        rejected: 'badge-rejected',
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-2xl font-bold text-text-main mb-1">Requests</h1>
            <p className="text-sm text-text-muted mb-6">
                {canViewAllRequests ? 'All leave requests across your team' : 'Your leave request history'}
            </p>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-surface border border-border rounded-xl mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-default whitespace-nowrap ${activeTab === tab.key
                                ? 'bg-action text-white'
                                : 'text-text-muted hover:text-text-main'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Requests List */}
            {requests.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                    <p className="text-sm">No requests found.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {requests.map((req, idx) => (
                        <div
                            key={req.id}
                            className="bg-surface border border-border rounded-xl p-4 hover:border-action/30 transition-default animate-fade-in"
                            style={{ animationDelay: `${idx * 40}ms` }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm font-bold text-text-main">{req.employeeName}</h3>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusClasses[req.status]}`}>
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                                        <span className="font-medium">{req.type}</span>
                                        <span className="w-px h-3 bg-border" />
                                        <span>{formatDate(req.startDate)} — {formatDate(req.endDate)}</span>
                                        <span className="w-px h-3 bg-border" />
                                        <span>{req.days} day{req.days > 1 ? 's' : ''}</span>
                                    </div>
                                    {req.reason && (
                                        <p className="text-xs text-text-muted mt-2 italic">{req.reason}</p>
                                    )}
                                </div>

                                {canApprove && req.status === 'pending' && req.employeeId !== currentUser.id && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button className="px-3 py-1.5 text-xs font-medium text-success bg-success/8 rounded-lg hover:bg-success/15 transition-default">
                                            Approve
                                        </button>
                                        <button className="px-3 py-1.5 text-xs font-medium text-danger bg-danger/8 rounded-lg hover:bg-danger/15 transition-default">
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>

                            {req.reviewedBy && (
                                <p className="text-[10px] text-text-muted mt-3 pt-2 border-t border-border/50">
                                    Reviewed by <span className="font-semibold">{req.reviewedBy}</span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
