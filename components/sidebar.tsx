'use client';
import Image from "next/image";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Pill,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/reports', label: 'Health Reports', icon: FileText },
  { href: '/articles', label: 'Article Management', icon: Pill },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/analytics', label: 'Revenue Analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-50 to-blue-50 border-r border-blue-100 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-blue-100">
          <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src="/logo.jpg"
            alt="MediCare logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="font-bold text-xl text-gray-900 tracking-tight">
          HealthcareNow
        </h1>
    </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-blue-50'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 bg-blue-50 space-y-3">
        {/* User Info */}
        {user && (
          <div className="px-4 py-2 rounded-lg bg-blue-100">
            <p className="text-xs text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-900 truncate">{user.email}</p>
          </div>
        )}
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 cursor-pointer transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
