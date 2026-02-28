export default function EmployeeCard({ employee }) {
    const { initials, name, title, team, joinDate, leaveBalance } = employee;

    const teamColors = {
        'Engineering': 'bg-action/8 text-action',
        'Design': 'bg-purple-50 text-purple-700',
        'People Ops': 'bg-emerald-50 text-emerald-700',
        'Analytics': 'bg-amber-50 text-amber-800',
        'Marketing': 'bg-pink-50 text-pink-700',
        'Finance': 'bg-cyan-50 text-cyan-700',
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-action transition-default group">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-action/8 text-action flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-action group-hover:text-white transition-default">
                {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-text-main truncate">{name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${teamColors[team] || 'bg-primary text-text-muted'}`}>
                        {team}
                    </span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">{title}</p>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4 text-xs text-text-muted shrink-0">
                <span>Joined: <strong className="text-text-main">{joinDate}</strong></span>
                <span className="w-px h-4 bg-border" />
                <span>Balance: <strong className="text-text-main">{leaveBalance}d</strong></span>
            </div>
        </div>
    );
}
