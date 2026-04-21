import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .hover-reveal')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-orange pointer-events-none z-[9999] hidden md:block"
        style={{
          translateX: useSpring(cursorX, { damping: 15, stiffness: 400 }),
          translateY: useSpring(cursorY, { damping: 15, stiffness: 400 }),
          x: 12,
          y: 12,
        }}
      />
    </>
  );
}
