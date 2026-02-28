// ─── Employees ───────────────────────────────────────────────
export const employees = [
    { id: 1, name: 'Arjun Mehta', initials: 'AM', title: 'Engineering Lead', team: 'Engineering', joinDate: 'Jan 2023', leaveBalance: 14, role: 'manager' },
    { id: 2, name: 'Priya Sharma', initials: 'PS', title: 'Product Designer', team: 'Design', joinDate: 'Mar 2023', leaveBalance: 12, role: 'employee' },
    { id: 3, name: 'Rohan Gupta', initials: 'RG', title: 'Backend Developer', team: 'Engineering', joinDate: 'Jun 2023', leaveBalance: 10, role: 'employee' },
    { id: 4, name: 'Sneha Iyer', initials: 'SI', title: 'HR Manager', team: 'People Ops', joinDate: 'Feb 2022', leaveBalance: 8, role: 'admin' },
    { id: 5, name: 'Vikram Desai', initials: 'VD', title: 'Frontend Developer', team: 'Engineering', joinDate: 'Aug 2023', leaveBalance: 15, role: 'employee' },
    { id: 6, name: 'Ananya Reddy', initials: 'AR', title: 'Data Analyst', team: 'Analytics', joinDate: 'Nov 2023', leaveBalance: 11, role: 'employee' },
    { id: 7, name: 'Karan Singh', initials: 'KS', title: 'DevOps Engineer', team: 'Engineering', joinDate: 'Apr 2024', leaveBalance: 16, role: 'employee' },
    { id: 8, name: 'Meera Nair', initials: 'MN', title: 'Content Strategist', team: 'Marketing', joinDate: 'Sep 2023', leaveBalance: 9, role: 'employee' },
    { id: 9, name: 'Rahul Joshi', initials: 'RJ', title: 'QA Engineer', team: 'Engineering', joinDate: 'Jan 2024', leaveBalance: 13, role: 'employee' },
    { id: 10, name: 'Divya Kapoor', initials: 'DK', title: 'Marketing Lead', team: 'Marketing', joinDate: 'Jul 2022', leaveBalance: 7, role: 'manager' },
    { id: 11, name: 'Amit Patel', initials: 'AP', title: 'Finance Analyst', team: 'Finance', joinDate: 'May 2024', leaveBalance: 18, role: 'employee' },
    { id: 12, name: 'Nisha Verma', initials: 'NV', title: 'UX Researcher', team: 'Design', joinDate: 'Oct 2023', leaveBalance: 10, role: 'employee' },
    { id: 13, name: 'Sanjay Kumar', initials: 'SK', title: 'VP Engineering', team: 'Engineering', joinDate: 'Jan 2021', leaveBalance: 5, role: 'admin' },
    { id: 14, name: 'Pooja Bhatt', initials: 'PB', title: 'Recruiter', team: 'People Ops', joinDate: 'Dec 2023', leaveBalance: 12, role: 'employee' },
];

// ─── Users (for role switching demo) ─────────────────────────
export const userProfiles = {
    admin: { ...employees.find(e => e.id === 4), role: 'admin' },
    manager: { ...employees.find(e => e.id === 1), role: 'manager' },
    employee: { ...employees.find(e => e.id === 5), role: 'employee' },
};

// ─── Leave Requests ──────────────────────────────────────────
export const leaveRequests = [
    { id: 1, employeeId: 5, employeeName: 'Vikram Desai', type: 'Annual', startDate: '2026-02-14', endDate: '2026-02-16', days: 3, status: 'pending', reason: 'Family event', submittedAt: '2026-02-10' },
    { id: 2, employeeId: 2, employeeName: 'Priya Sharma', type: 'Sick', startDate: '2026-02-10', endDate: '2026-02-11', days: 2, status: 'approved', reason: 'Unwell', submittedAt: '2026-02-09', reviewedBy: 'Sneha Iyer' },
    { id: 3, employeeId: 3, employeeName: 'Rohan Gupta', type: 'Personal', startDate: '2026-02-18', endDate: '2026-02-18', days: 1, status: 'pending', reason: 'Personal errand', submittedAt: '2026-02-11' },
    { id: 4, employeeId: 8, employeeName: 'Meera Nair', type: 'Annual', startDate: '2026-02-20', endDate: '2026-02-24', days: 5, status: 'rejected', reason: 'Vacation', submittedAt: '2026-02-05', reviewedBy: 'Divya Kapoor' },
    { id: 5, employeeId: 6, employeeName: 'Ananya Reddy', type: 'Sick', startDate: '2026-02-12', endDate: '2026-02-12', days: 1, status: 'approved', reason: 'Doctor appointment', submittedAt: '2026-02-11', reviewedBy: 'Sneha Iyer' },
    { id: 6, employeeId: 9, employeeName: 'Rahul Joshi', type: 'Annual', startDate: '2026-02-25', endDate: '2026-02-27', days: 3, status: 'pending', reason: 'Short trip', submittedAt: '2026-02-12' },
    { id: 7, employeeId: 11, employeeName: 'Amit Patel', type: 'Personal', startDate: '2026-02-17', endDate: '2026-02-17', days: 1, status: 'pending', reason: 'Bank work', submittedAt: '2026-02-12' },
];

// ─── Presence (Out Today) ────────────────────────────────────
export const presenceList = [
    { employeeId: 2, name: 'Priya Sharma', initials: 'PS', returnDate: 'Feb 12' },
    { employeeId: 6, name: 'Ananya Reddy', initials: 'AR', returnDate: 'Feb 13' },
    { employeeId: 14, name: 'Pooja Bhatt', initials: 'PB', returnDate: 'Feb 14' },
];

// ─── Pending Actions ─────────────────────────────────────────
export const pendingActions = {
    admin: [
        { id: 1, type: 'leave_approval', label: 'Leave Request', employee: 'Vikram Desai', detail: 'Annual · Feb 14–16', leaveRequestId: 1 },
        { id: 2, type: 'leave_approval', label: 'Leave Request', employee: 'Rohan Gupta', detail: 'Personal · Feb 18', leaveRequestId: 3 },
        { id: 3, type: 'leave_approval', label: 'Leave Request', employee: 'Rahul Joshi', detail: 'Annual · Feb 25–27', leaveRequestId: 6 },
        { id: 4, type: 'leave_approval', label: 'Leave Request', employee: 'Amit Patel', detail: 'Personal · Feb 17', leaveRequestId: 7 },
    ],
    manager: [
        { id: 1, type: 'leave_approval', label: 'Leave Request', employee: 'Vikram Desai', detail: 'Annual · Feb 14–16', leaveRequestId: 1 },
        { id: 2, type: 'leave_approval', label: 'Leave Request', employee: 'Rohan Gupta', detail: 'Personal · Feb 18', leaveRequestId: 3 },
        { id: 3, type: 'leave_approval', label: 'Leave Request', employee: 'Rahul Joshi', detail: 'Annual · Feb 25–27', leaveRequestId: 6 },
    ],
    employee: [],
};
