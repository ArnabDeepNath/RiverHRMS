import { presenceList } from '../data/mockData';

export default function PresenceList() {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 animate-fade-in">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Out Today</h2>
            {presenceList.length === 0 ? (
                <p className="text-sm text-text-muted py-4 text-center">Everyone is in today.</p>
            ) : (
                <div className="space-y-3">
                    {presenceList.map((person) => (
                        <div
                            key={person.employeeId}
                            className="flex items-center justify-between py-2"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary text-text-muted flex items-center justify-center text-xs font-bold">
                                    {person.initials}
                                </span>
                                <span className="text-sm font-medium text-text-main">{person.name}</span>
                            </div>
                            <span className="text-xs text-text-muted font-medium">
                                Returns {person.returnDate}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
