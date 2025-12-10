import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Bookmark, LogIn, LogOut, User } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/movies', icon: Film, label: 'Movies' },
  { path: '/tv', icon: Tv, label: 'TV Series' },
  { path: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
];

export function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-20 flex-col items-center bg-sidebar py-8 lg:w-24">
      {/* Logo */}
      <Link to="/" className="mb-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Film className="h-5 w-5 text-primary-foreground" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="absolute left-full ml-4 hidden whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-lg group-hover:block">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Auth Section */}
      <div className="mt-auto flex flex-col items-center gap-4">
        {isAuthenticated ? (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
              location.pathname === '/login'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <LogIn className="h-5 w-5" />
          </Link>
        )}
      </div>
    </aside>
  );
}
