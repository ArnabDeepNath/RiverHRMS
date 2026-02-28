import { useAuth } from '../context/AuthContext';
import { pendingActions } from '../data/mockData';

export default function PriorityActions() {
    const { role, canApprove } = useAuth();
    const actions = pendingActions[role] || [];

    if (actions.length === 0) {
        return (
            <div className="bg-surface border border-border rounded-2xl p-6 animate-fade-in">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Priority Actions</h2>
                <div className="flex flex-col items-center py-8 text-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-40">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <p className="text-sm">All clear — no pending actions.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Priority Actions</h2>
                <span className="text-xs font-bold text-action bg-action/8 px-2.5 py-1 rounded-full">{actions.length}</span>
            </div>
            <div className="space-y-3">
                {actions.map((action, index) => (
                    <div
                        key={action.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-action/30 transition-default group"
                        style={{ animationDelay: `${index * 60}ms` }}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-warning/10 text-warning flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-text-main truncate">
                                    {action.label}: <span className="text-text-main">{action.employee}</span>
                                </p>
                                <p className="text-xs text-text-muted mt-0.5">{action.detail}</p>
                            </div>
                        </div>
                        {canApprove && (
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                                <button className="px-3 py-1.5 text-xs font-medium text-success bg-success/8 rounded-lg hover:bg-success/15 transition-default">
                                    Approve
                                </button>
                                <button className="px-3 py-1.5 text-xs font-medium text-danger bg-danger/8 rounded-lg hover:bg-danger/15 transition-default">
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
