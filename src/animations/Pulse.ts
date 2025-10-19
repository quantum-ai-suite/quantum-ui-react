export const Pulse = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.05, 1] },
  transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' as const },
};