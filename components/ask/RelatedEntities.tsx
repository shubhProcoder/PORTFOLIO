'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { RelatedEntity } from '@/lib/knowledge/types';

interface RelatedEntitiesProps {
  entities: RelatedEntity[];
}

const TYPE_COLORS: Record<string, string> = {
  PROJECT: '#C084FC',
  THINKING: '#F59E0B',
  LAB: '#10B981',
  JOURNEY: '#38BDF8',
  NOW: '#F472B6',
  PERSON: '#FAF7F2',
  TECHNOLOGY: '#6366F1',
};

export function RelatedEntities({ entities }: RelatedEntitiesProps) {
  // Group by relationship type for a more graph-like readout
  const grouped = entities.reduce(
    (acc, entity) => {
      const rel = entity.relationshipType || 'RELATED';
      if (!acc[rel]) acc[rel] = [];
      acc[rel].push(entity);
      return acc;
    },
    {} as Record<string, RelatedEntity[]>,
  );

  return (
    <section className="px-6 md:px-12 py-8 max-w-[1200px] mx-auto">
      {/* Section label */}
      <div className="mb-8">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: '#C084FC', fontFamily: 'var(--font-machine)' }}
        >
          RELATED KNOWLEDGE GRAPH
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        {Object.entries(grouped).map(([rel, items]) => (
          <div key={rel} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
            <span
              className="text-[11px] tracking-[0.15em] uppercase md:w-32 flex-shrink-0 text-[#8B8680] pt-1"
              style={{ fontFamily: 'var(--font-machine)' }}
            >
              {rel}
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {items.map(entity => (
                <Link
                  key={entity.id}
                  href={entity.route}
                  className="group flex flex-col"
                >
                  <span
                    className="text-[10px] tracking-wider uppercase mb-0.5"
                    style={{ color: TYPE_COLORS[entity.type] || '#5A564F', fontFamily: 'var(--font-machine)' }}
                  >
                    {entity.type}
                  </span>
                  <span
                    className="text-sm transition-colors text-[#D4D0C8] group-hover:text-white"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {entity.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
