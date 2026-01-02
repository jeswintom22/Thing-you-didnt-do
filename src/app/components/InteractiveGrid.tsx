'use client';

import { useState, memo } from 'react';
import { FearType } from '../types';

interface GridItemProps {
  title: string;
  description: string;
  count: number;
  color: string;
}

function GridItem({ title, description, count, color }: GridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isInteractive = isHovered || isFocused;

  return (
    <article
      className={`relative bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-2 ${color} overflow-hidden focus-within:scale-105 focus-within:shadow-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="button"
      aria-label={`${title} category with ${count} avoidances. ${description}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed text-sm">{description}</p>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-1">{count}</div>
            <p className="text-sm text-gray-400">Avoidances</p>
          </div>
          {isInteractive && (
            <div className="text-white font-bold animate-pulse text-lg">
              EXPLORE →
            </div>
          )}
        </div>
      </div>
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-opacity duration-300 ${isInteractive ? 'opacity-100' : 'opacity-0'}`}></div>
    </article>
  );
}

const InteractiveGridComponent = memo(function InteractiveGrid({ entries }: { entries: any[] }) {
  const rejectionCount = entries.filter(e => e.category === 'rejection').length;
  const uncertaintyCount = entries.filter(e => e.category === 'uncertainty').length;
  const effortCount = entries.filter(e => e.category === 'effort').length;

  const items = [
    {
      title: 'Rejection',
      description: 'Avoiding things due to fear of rejection or disapproval.',
      count: rejectionCount,
      color: 'border-red-500',
    },
    {
      title: 'Uncertainty',
      description: 'Avoiding decisions or actions due to unknown outcomes.',
      count: uncertaintyCount,
      color: 'border-yellow-500',
    },
    {
      title: 'Effort',
      description: 'Avoiding tasks that require significant time or energy.',
      count: effortCount,
      color: 'border-green-500',
    },
  ];

  return (
    <section className="mb-12" aria-labelledby="fear-categories">
      <header className="text-center mb-8">
        <h2 id="fear-categories" className="text-3xl font-bold text-white mb-2">Fear Categories</h2>
        <p className="text-gray-400 text-lg">Explore your avoidance patterns</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item) => (
          <GridItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
});

InteractiveGridComponent.displayName = 'InteractiveGrid';

export default InteractiveGridComponent;