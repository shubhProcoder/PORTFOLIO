'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

type Command = {
  id: string;
  title: string;
  category: string;
  icon?: string;
  action: () => void;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Define commands
  const commands: Command[] = [
    { id: 'nav-home', title: 'Home', category: 'Navigation', icon: '⌂', action: () => router.push('/') },
    { id: 'nav-work', title: 'Work & Projects', category: 'Navigation', icon: '⌘', action: () => router.push('/work') },
    { id: 'nav-about', title: 'About Me', category: 'Navigation', icon: '👤', action: () => router.push('/about') },
    { id: 'nav-now', title: 'What I\'m doing now', category: 'Navigation', icon: '⚡', action: () => router.push('/now') },
    { id: 'nav-ask', title: 'Ask Knowledge Engine', category: 'Navigation', icon: '🔍', action: () => router.push('/ask') },
    
    { id: 'ext-github', title: 'GitHub', category: 'External', icon: '↗', action: () => window.open('https://github.com/shubhProcoder', '_blank') },
    { id: 'ext-linkedin', title: 'LinkedIn', category: 'External', icon: '↗', action: () => window.open('https://linkedin.com/', '_blank') }, // User didn't specify, leave empty or base
    { id: 'ext-email', title: 'Send Email', category: 'External', icon: '✉', action: () => window.location.href = 'mailto:shubh2008mehrotra@gmail.com' },
    
    { id: 'sys-copy', title: 'Copy Portfolio URL', category: 'System', icon: '⎘', action: () => {
      navigator.clipboard.writeText(window.location.href);
      setIsOpen(false);
      // Optional: Toast notification here
    } },
    { id: 'sys-source', title: 'View Source Code', category: 'System', icon: '</>', action: () => window.open('https://github.com/shubhProcoder/PORTFOLIO', '_blank') },
  ];

  // Filter commands
  const filteredCommands = query === '' 
    ? commands 
    : commands.filter(cmd => 
        cmd.title.toLowerCase().includes(query.toLowerCase()) || 
        cmd.category.toLowerCase().includes(query.toLowerCase())
      );

  // Group commands by category for rendering
  const groups = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Flatten for keyboard navigation
  const flattenedList = Object.values(groups).flat();

  useEffect(() => {
    // Reset selected index when query changes
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery(''); // Reset query when closing
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % flattenedList.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flattenedList.length) % flattenedList.length);
    } else if (e.key === 'Enter' && flattenedList.length > 0) {
      e.preventDefault();
      flattenedList[selectedIndex].action();
      if (!flattenedList[selectedIndex].id.startsWith('ext-')) {
         setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/50"
          >
            {/* Input */}
            <div className="flex items-center border-b border-white/10 px-4">
              <span className="text-white/40 mr-2">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-4 text-sm text-white placeholder-white/40 focus:outline-none font-sans"
              />
              <div className="flex items-center gap-1 text-[10px] text-white/30 font-machine ml-2">
                <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">ESC</span>
                <span>to close</span>
              </div>
            </div>

            {/* Command List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
              {Object.keys(groups).length === 0 ? (
                <div className="py-12 text-center text-sm text-white/40 font-sans">
                  No commands found for "{query}"
                </div>
              ) : (
                Object.entries(groups).map(([category, items]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="mb-1 px-3 py-1 text-[10px] font-medium tracking-wider text-white/30 uppercase font-machine">
                      {category}
                    </div>
                    <div className="space-y-1">
                      {items.map((cmd) => {
                        const globalIndex = flattenedList.findIndex(c => c.id === cmd.id);
                        const isSelected = globalIndex === selectedIndex;
                        
                        return (
                          <div
                            key={cmd.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                              isSelected 
                                ? 'bg-white/10 text-white' 
                                : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                            }`}
                            onClick={() => {
                              cmd.action();
                              if (!cmd.id.startsWith('ext-')) {
                                setIsOpen(false);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div className="flex items-center gap-3">
                              {cmd.icon && <span className="text-white/40 w-4 text-center">{cmd.icon}</span>}
                              <span className="font-sans">{cmd.title}</span>
                            </div>
                            {isSelected && (
                              <span className="text-[10px] text-white/30 font-machine">Enter ↵</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-white/10 bg-[#080808] px-4 py-2 flex justify-between items-center text-[10px] text-white/30 font-machine">
               <div className="flex gap-4">
                 <span><kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to navigate</span>
                 <span><kbd className="font-sans">↵</kbd> to select</span>
               </div>
               <div>
                  Shubh Mehrotra OS
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
