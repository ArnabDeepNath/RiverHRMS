import PriorityActions from '../components/PriorityActions';
import PresenceList from '../components/PresenceList';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { currentUser, role } = useAuth();

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Greeting */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {currentUser?.name?.split(' ')[0]}
                </h1>
                <p className="text-sm text-text-muted mt-1">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Leave Balance</p>
                    <p className="text-2xl font-bold text-text-main mt-1">{currentUser?.leaveBalance}<span className="text-sm font-normal text-text-muted ml-1">days</span></p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4">
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Role</p>
                    <p className="text-2xl font-bold text-text-main mt-1 capitalize">{role}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 col-span-2 sm:col-span-1">
                    <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Team</p>
                    <p className="text-2xl font-bold text-text-main mt-1">{currentUser?.team}</p>
                </div>
            </div>

            {/* Priority Actions */}
            <PriorityActions />

            {/* Presence List */}
            <PresenceList />
        </div>
    );
}
