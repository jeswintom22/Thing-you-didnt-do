'use client';

import { useState } from 'react';
import { FearType } from '../types';

interface GridItemProps {
  title: string;
  description: string;
  count: number;
  color: string;
}

function GridItem({ title, description, count, color }: GridItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-2 ${color} overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="text-3xl font-bold text-blue-400">{count}</div>
        <p className="text-sm text-gray-400">Avoidances</p>
        {isHovered && (
          <div className="absolute bottom-4 right-4 text-white font-bold animate-pulse">
            EXPLORE →
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function InteractiveGrid({ entries }: { entries: any[] }) {
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
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Fear Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <GridItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}