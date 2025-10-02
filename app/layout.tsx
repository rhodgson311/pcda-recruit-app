import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'PCDA Coach Portal',
  description: 'Free portal for college coaches to view PCDA player updates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <strong>PCDA Coach Portal</strong>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
