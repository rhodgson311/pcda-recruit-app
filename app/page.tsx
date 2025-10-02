import Link from 'next/link';

export default function Home() {
  return (
    <div className="stack">
      <h1>Welcome, Coaches 👋</h1>
      <p>Register with your email to access monthly player updates, spotlights, and highlight links — free.</p>
      <div className="stack">
        <Link className="btn" href="/login">Get Access (Login/Register)</Link>
        <Link className="btn" href="/dashboard">View Dashboard</Link>
      </div>
      <p className="small">You must be logged in to view dashboard content.</p>
    </div>
  );
}
