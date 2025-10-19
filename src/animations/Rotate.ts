export const Rotate = {
  initial: { rotate: 0 },
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, repeatType: 'loop' as const },
};