import { Routes, Route, Link } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

function NotFound() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      <div className="border border-dashed border-cardline rounded-md py-10 px-6 text-center text-ink-soft text-sm">
        That page isn&rsquo;t on file.{' '}
        <Link to="/" className="text-teal underline">
          Return to the roster.
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UsersProvider>
      <div className="min-h-screen flex flex-col">
        <header className="bg-ink text-paper border-b-4 border-brass">
          <div className="max-w-[1080px] mx-auto px-6 py-5 flex items-baseline justify-between gap-4 flex-wrap">
            <Link
              to="/"
              className="font-display text-2xl md:text-[28px] font-bold tracking-tight text-paper no-underline inline-flex items-baseline gap-2.5"
            >
              Register
              
            </Link>
            <span className="font-mono text-xs text-slate-400 tracking-wide">
              Collect the data
            </span>
          </div>
        </header>

        <main className="flex-1 py-10 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </UsersProvider>
  );
}
