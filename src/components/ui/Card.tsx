import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm',
        onClick && 'cursor-pointer hover:border-gray-700 hover:bg-gray-900/80 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};