'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'WORK', href: '/work' },
  { label: 'OBSERVATIONS', href: '/observations' },
  { label: 'PROCESS', href: '/process' },
  { label: 'LABS', href: '/labs' },
  { label: 'ABOUT', href: '/about' },
  { label: 'ASK', href: '/ask' },
];

export function Navigation() {
  const pathname = usePathname();

  const isWork = pathname === '/work';
  const isObservations = pathname === '/observations';
  const isProcess = pathname === '/process';
  const isLabs = pathname === '/labs';
  const isAsk = pathname === '/ask';
  const isDarkWorld = isWork || isObservations || isProcess || isLabs || isAsk;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md transition-colors duration-300 ${
        isAsk
          ? 'bg-[#0A0B0D]/90 border-b border-[#C084FC]/20 text-white'
        : isLabs
          ? 'bg-[#041310]/90 border-b border-[#10B981]/20 text-white'
        : isProcess
          ? 'bg-[#06101B]/85 border-b border-[#38BDF8]/20 text-white'
          : isObservations
          ? 'bg-[#08090B]/85 border-b border-white/10 text-white'
          : isWork
          ? 'bg-[#0C0E14]/85 border-b border-white/10 text-white'
          : 'bg-[#FAF7F2]/90 border-b border-neutral-200/60 text-[#11100F]'
      }`}
    >
      <nav
        className="h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Brand Identity / Return to Cover */}
        <Link
          href="/"
          className={`font-sans font-bold text-xs md:text-sm tracking-[0.16em] uppercase transition-opacity hover:opacity-80 ${
            isDarkWorld ? 'text-white' : 'text-[#11100F]'
          }`}
        >
          SHUBH MEHROTRA
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navItems.map((item) => {
            const isAbout = pathname === '/about';
            const isActive =
              (item.href === '/work' && isWork) ||
              (item.href === '/observations' && isObservations) ||
              (item.href === '/process' && isProcess) ||
              (item.href === '/labs' && isLabs) ||
              (item.href === '/ask' && isAsk) ||
              (item.href === '/about' && isAbout);

            let activeClasses = '';
            if (isActive) {
              if (isAsk) {
                activeClasses = 'text-[#C084FC] font-bold border-b-2 border-[#C084FC] pb-1';
              } else if (isLabs) {
                activeClasses = 'text-[#10B981] font-bold border-b-2 border-[#10B981] pb-1';
              } else if (isProcess) {
                activeClasses = 'text-[#38BDF8] font-bold border-b-2 border-[#38BDF8] pb-1';
              } else if (isObservations) {
                activeClasses = 'text-[#F59E0B] font-bold border-b-2 border-[#F59E0B] pb-1';
              } else if (isWork) {
                activeClasses = 'text-[#38BDF8] font-bold border-b-2 border-[#38BDF8] pb-1';
              } else {
                activeClasses = 'text-[#11100F] font-bold border-b-2 border-[#11100F] pb-1';
              }
            } else {
              activeClasses = isDarkWorld
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-700 hover:text-[#2563EB]';
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`font-mono text-xs tracking-[0.14em] uppercase transition-colors ${activeClasses}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Global Live Status Indicator & Cmd+K Hint */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', {
                key: 'k',
                metaKey: true,
                bubbles: true,
              });
              window.dispatchEvent(event);
            }}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded border ${
              isDarkWorld 
                ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white' 
                : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900'
            } transition-colors font-mono text-[10px] tracking-widest`}
            title="Open Command Palette"
          >
            <span className="opacity-70">⌘</span>
            <span>K</span>
          </button>
          
          <div
            className={`flex items-center gap-2 font-mono text-xs tracking-[0.14em] font-semibold ${
              isDarkWorld ? 'text-neutral-300' : 'text-[#11100F]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isAsk
                  ? 'bg-[#C084FC]'
                : isLabs
                  ? 'bg-[#10B981]'
                : isProcess
                  ? 'bg-[#38BDF8]'
                  : isObservations
                  ? 'bg-[#F59E0B]'
                  : isWork
                  ? 'bg-[#38BDF8]'
                  : 'bg-[#16A34A]'
              }`}
              aria-hidden="true"
            />
            BUILDING
          </div>
        </div>
      </nav>
    </header>
  );
}
