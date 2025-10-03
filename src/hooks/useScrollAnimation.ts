'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  // Always return isVisible as true to disable scroll animations
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<T>(null);

  // No intersection observer needed since animations are disabled
  return { ref, isVisible };
}

export function useStaggeredAnimation(itemCount: number, delay: number = 100) {
  // Show all items immediately without delays
  const visibleItems = Array.from({ length: itemCount }, (_, i) => i);
  const { ref, isVisible } = useScrollAnimation();

  return { ref, visibleItems, isVisible };
}
