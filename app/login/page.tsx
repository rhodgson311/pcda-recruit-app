'use client';
import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('Sending magic link...');
    setError(null);
    const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: origin + '/dashboard' }
    });
    if (error) setError(error.message);
    else setStatus('Check your email for the sign-in link.');
  }

  return (
    <div className="stack">
      <h1>Login or Register</h1>
      <form onSubmit={onSubmit} className="stack">
        <input
          type="email"
          placeholder="you@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{padding: '10px', borderRadius: 8, border: '1px solid #ddd'}}
        />
        <button className="btn" type="submit">Email me a magic link</button>
      </form>
      {status && <div className="small">{status}</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      <p className="small">Use your school email if possible.</p>
    </div>
  );
}
