'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, MapPin } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackTitle?: string;
  fallbackGradient?: string;
}

export function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fallbackTitle,
  fallbackGradient = 'from-emerald-950 via-stone-900 to-slate-900',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br ${fallbackGradient} ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <div className="w-12 h-12 mb-3 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Compass className="w-6 h-6 text-amber-300 animate-spin-slow" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-amber-200">
          {fallbackTitle || alt || 'Bengal Odyssey Expedition'}
        </p>
        <span className="text-xs text-stone-300 mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-400" />
          West Bengal, India
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-stone-800/40 animate-pulse" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          referrerPolicy="no-referrer"
          className={`transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative inline-block overflow-hidden" style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-800/40 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width || 600}
        height={height || 400}
        priority={priority}
        referrerPolicy="no-referrer"
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
