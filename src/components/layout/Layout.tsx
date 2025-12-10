import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-20 min-h-screen lg:ml-24">
        <div className="container max-w-7xl px-4 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
