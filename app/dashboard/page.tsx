'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

type Update = { id: string; month: string; title: string; summary_md: string; status: string };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setEmail(user.email ?? null);
      const { data } = await supabase
        .from('updates')
        .select('id, month, title, summary_md, status')
        .eq('status', 'published')
        .order('month', { ascending: false });
      setUpdates(data || []);
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div className="stack">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <strong>Coach Dashboard</strong>
            <div className="small">{email}</div>
          </div>
          <button className="btn" onClick={signOut}>Sign out</button>
        </div>
      </div>

      {updates.length === 0 && <p>No published updates yet.</p>}

      {updates.map(u => (
        <div className="card" key={u.id}>
          <div className="small">{new Date(u.month).toLocaleDateString(undefined, { month:'long', year:'numeric' })}</div>
          <h2 style={{margin:'8px 0'}}>{u.title || 'Monthly Update'}</h2>
          <p>{u.summary_md}</p>
          <Link className="btn" href="#">Read more (coming soon)</Link>
        </div>
      ))}
    </div>
  );
}
