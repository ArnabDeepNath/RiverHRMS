import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
    const { currentUser, role, switchRole } = useAuth();
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);

    const roles = ['admin', 'manager', 'employee'];

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-2xl font-bold text-text-main mb-1">Settings</h1>
            <p className="text-sm text-text-muted mb-8">Profile & preferences</p>

            {/* Profile Section */}
            <section className="bg-surface border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-5">Profile</h2>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-action/10 text-action flex items-center justify-center text-lg font-bold">
                        {currentUser?.initials}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-main">{currentUser?.name}</h3>
                        <p className="text-sm text-text-muted">{currentUser?.title}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">Team</label>
                        <div className="px-3 py-2.5 text-sm text-text-main bg-primary border border-border rounded-xl">
                            {currentUser?.team}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">Joined</label>
                        <div className="px-3 py-2.5 text-sm text-text-main bg-primary border border-border rounded-xl">
                            {currentUser?.joinDate}
                        </div>
                    </div>
                </div>
            </section>

            {/* Role Switcher (Demo) */}
            <section className="bg-surface border border-border rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Role (Demo Switcher)</h2>
                    <span className="text-[10px] font-medium text-text-muted bg-primary px-2 py-1 rounded-full">For testing</span>
                </div>
                <p className="text-xs text-text-muted mb-4">Switch roles to preview different dashboard views and permissions.</p>
                <div className="flex gap-2">
                    {roles.map((r) => (
                        <button
                            key={r}
                            onClick={() => switchRole(r)}
                            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-default capitalize ${role === r
                                    ? 'bg-action text-white'
                                    : 'bg-primary border border-border text-text-muted hover:text-text-main hover:border-text-muted'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </section>

            {/* Notification Preferences */}
            <section className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-5">Notifications</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text-main">Email Notifications</p>
                            <p className="text-xs text-text-muted mt-0.5">Receive updates via email</p>
                        </div>
                        <button
                            onClick={() => setEmailNotifs(!emailNotifs)}
                            className={`relative w-11 h-6 rounded-full transition-default ${emailNotifs ? 'bg-action' : 'bg-border'
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-default ${emailNotifs ? 'left-[22px]' : 'left-0.5'
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="w-full h-px bg-border" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text-main">Push Notifications</p>
                            <p className="text-xs text-text-muted mt-0.5">In-browser push alerts</p>
                        </div>
                        <button
                            onClick={() => setPushNotifs(!pushNotifs)}
                            className={`relative w-11 h-6 rounded-full transition-default ${pushNotifs ? 'bg-action' : 'bg-border'
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-default ${pushNotifs ? 'left-[22px]' : 'left-0.5'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
