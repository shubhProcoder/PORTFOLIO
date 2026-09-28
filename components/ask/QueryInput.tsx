'use client';

import { useState, useRef, useEffect } from 'react';

interface QueryInputProps {
  initialValue: string;
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryInput({ initialValue, onSubmit, isLoading }: QueryInputProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div className="w-full max-w-[800px]">
      <div className="mb-4">
        <span
          className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#5A564F]"
          style={{ fontFamily: 'var(--font-machine)' }}
        >
          SYSTEM QUERY CONSOLE
        </span>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative flex flex-col pt-4 pb-2 px-4"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'transparent',
            transition: 'border-color 0.2s',
          }}
          onFocus={() => {
            const el = inputRef.current?.parentElement;
            if (el) el.style.borderColor = 'rgba(192, 132, 252, 0.4)';
          }}
          onBlur={() => {
            const el = inputRef.current?.parentElement;
            if (el) el.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          <div className="flex items-center gap-4 mb-2">
            <span
              className="text-[10px] tracking-widest text-[#C084FC]"
              style={{ fontFamily: 'var(--font-machine)' }}
              aria-hidden="true"
            >
              01
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-[#8B8680]"
              style={{ fontFamily: 'var(--font-machine)' }}
            >
              QUERY
            </span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your query..."
            aria-label="Ask a question about the portfolio"
            className="w-full bg-transparent outline-none text-base md:text-lg mb-6 pl-8"
            style={{
              color: '#FAF7F2',
              fontFamily: 'var(--font-sans)',
              caretColor: '#C084FC',
            }}
            disabled={isLoading}
            autoFocus
          />

          <div className="flex justify-end border-t border-white/5 pt-3">
            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="text-[11px] tracking-[0.15em] uppercase transition-colors"
              style={{
                color: value.trim() ? '#C084FC' : '#5A564F',
                fontFamily: 'var(--font-machine)',
                fontWeight: 600,
                cursor: value.trim() ? 'pointer' : 'default',
                opacity: isLoading ? 0.7 : 1,
              }}
              aria-label="Execute query"
              onMouseEnter={e => {
                if (value.trim()) (e.target as HTMLElement).style.color = '#E9D5FF';
              }}
              onMouseLeave={e => {
                if (value.trim()) (e.target as HTMLElement).style.color = '#C084FC';
              }}
            >
              {isLoading ? '[ EXECUTING... ]' : '[ EXECUTE ↗ ]'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
