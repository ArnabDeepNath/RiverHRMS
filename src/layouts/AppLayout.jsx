import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import QuickActionBar from '../components/QuickActionBar';
import LeaveModal from '../components/LeaveModal';
import ClockInOut from '../components/ClockInOut';

export default function AppLayout() {
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [clockModalOpen, setClockModalOpen] = useState(false);
    const [clockedIn] = useState(() => {
        return localStorage.getItem('stoichrm_clocked_in') === 'true';
    });

    const handleClockToggle = () => {
        setClockModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="md:ml-56 pb-40 md:pb-24 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
                <Outlet />
            </main>

            {/* Quick Action Bar */}
            <QuickActionBar
                onRequestLeave={() => setLeaveModalOpen(true)}
                onClockToggle={handleClockToggle}
                clockedIn={clockedIn}
            />

            {/* Mobile Bottom Nav */}
            <BottomNav />

            {/* Modals */}
            <LeaveModal isOpen={leaveModalOpen} onClose={() => setLeaveModalOpen(false)} />
            <ClockInOut isOpen={clockModalOpen} onClose={() => setClockModalOpen(false)} />
        </div>
    );
}
