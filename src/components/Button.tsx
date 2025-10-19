import React, { forwardRef } from 'react';

interface ButtonProps {
  text: string;
  style?: any; // Using 'any' to handle both QUIML style format and React.CSSProperties
  event?: { onClick?: string };
  onClick?: () => void; // Support both event binding and direct onClick
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ text, style, event, onClick }, ref) => {
  const handleClick = () => {
    // First check for direct onClick prop (from motion animation wrapper)
    if (onClick) {
      onClick();
      return;
    }
    
    // Then check for event binding
    if (event?.onClick) {
      const [controllerName, method] = event.onClick.split('.');
      const controller = window[controllerName] as any;
      if (controller && typeof controller[method] === 'function') {
        controller[method]();
      } else {
        console.error(`Controller method ${controllerName}.${method} not found`, controller);
      }
    }
  };
  
  // Convert QUIML style properties to CSS
  const computedStyle: React.CSSProperties = {
    backgroundColor: style?.bg || style?.backgroundColor || '#00AEEF',
    color: style?.color || '#000000',
    borderRadius: typeof style?.borderRadius === 'number' 
      ? `${style.borderRadius}px` 
      : style?.borderRadius || '4px',
    padding: typeof style?.padding === 'number'
      ? `${style.padding}px`
      : style?.padding || '8px 16px',
    border: 'none',
    cursor: 'pointer',
    fontSize: style?.fontSize || '16px',
    fontWeight: style?.fontWeight || 'normal',
    ...style // Spread any additional CSS properties
  };
  
  return (
    <button ref={ref} style={computedStyle} onClick={handleClick}>
      {text}
    </button>
  );
});

Button.displayName = 'Button';
import { motion } from "motion/react";

export default Button;