import { useState, useMemo, useRef, useEffect } from 'react';
import { employees } from '../data/mockData';
import EmployeeCard from '../components/EmployeeCard';

const BATCH_SIZE = 8;

export default function Directory() {
    const [search, setSearch] = useState('');
    const [teamFilter, setTeamFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const loaderRef = useRef(null);

    const teams = useMemo(() => ['All', ...new Set(employees.map(e => e.team))], []);

    const filtered = useMemo(() => {
        return employees.filter(emp => {
            const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                emp.title.toLowerCase().includes(search.toLowerCase());
            const matchTeam = teamFilter === 'All' || emp.team === teamFilter;
            return matchSearch && matchTeam;
        });
    }, [search, teamFilter]);

    const visible = filtered.slice(0, visibleCount);

    // Lazy load via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filtered.length) {
                    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filtered.length));
                }
            },
            { threshold: 0.1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, filtered.length]);

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-2xl font-bold text-text-main mb-1">Directory</h1>
            <p className="text-sm text-text-muted mb-6">{employees.length} employees</p>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or title..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setVisibleCount(BATCH_SIZE);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl focus:outline-none focus:border-action focus:ring-1 focus:ring-action/20 transition-default placeholder:text-text-muted/60"
                    />
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {teams.map(team => (
                        <button
                            key={team}
                            onClick={() => {
                                setTeamFilter(team);
                                setVisibleCount(BATCH_SIZE);
                            }}
                            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-default ${teamFilter === team
                                ? 'bg-action text-white'
                                : 'bg-surface border border-border text-text-muted hover:text-text-main'
                                }`}
                        >
                            {team}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {visible.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                    <p className="text-sm">No employees match your search.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {visible.map((emp, idx) => (
                        <div key={emp.id} style={{ animationDelay: `${idx * 40}ms` }} className="animate-fade-in">
                            <EmployeeCard employee={emp} />
                        </div>
                    ))}
                </div>
            )}

            {/* Lazy loader sentinel */}
            {visibleCount < filtered.length && (
                <div ref={loaderRef} className="flex justify-center py-6">
                    <div className="w-6 h-6 border-2 border-border border-t-action rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
