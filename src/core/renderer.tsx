import React, { forwardRef } from 'react';
import { motion } from 'motion/react'; // Use the new motion package
import VerticalBox from '../components/VerticalBox';
import Label from '../components/Label';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Card from '../components/Card';
import Text3D from '../components/Text3D';

const componentMap: Record<string, React.ComponentType<any>> = {
  VerticalBox,
  Label,
  TextField,
  Button,
  Divider,
  Card,
  Text3D,
};

// Animation variants
const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  pulse: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' as const },
  },
  slide: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, repeatType: 'loop' as const },
  },
};

// Create motion components with forwardRef
const MotionText3D = motion.create(Text3D); // New API simplifies this
const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);
const MotionDiv = motion.div;

export function renderQuiml(node: any): React.ReactElement {
  console.log('Rendering node:', node, 'Components:', node.components);
  
  const renderComponent = (comp: any): React.ReactElement => {
    const fullKey = Object.keys(comp)[0];
    const [type, id] = fullKey.split('#');
    const normalizedType = Object.keys(componentMap).find(key => key.toLowerCase() === type.toLowerCase()) || type;
    const props = comp[fullKey] || {};
    const Comp = componentMap[normalizedType];
    if (!Comp) {
      console.warn(`Unknown component type: ${type}`, comp);
      return null;
    }
    const children = props.components ? props.components.map((child: any, index: number) => 
      renderComponent(child)
    ) : undefined;
    const anim = props.anim;
    const MotionComp = anim ? {
      Text3D: MotionText3D,
      Button: MotionButton,
      Card: MotionCard,
    }[normalizedType] || MotionDiv : Comp;

    const animationProps = anim ? {
      variants: animationVariants,
      initial: 'initial',
      animate: anim.type ? (Array.isArray(anim.type) ? anim.type.map(t => t.toLowerCase()).some(t => ['fade', 'slide', 'pulse', 'rotate'].includes(t)) ? 'animate' : undefined : ['fade', 'slide', 'pulse', 'rotate'].includes(anim.type.toLowerCase()) ? 'animate' : undefined) : undefined,
      transition: anim.duration ? { duration: parseFloat(anim.duration) / 1000 } : anim.rotateDuration ? { duration: parseFloat(anim.rotateDuration) / 1000 } : undefined,
      whileHover: anim.type && (Array.isArray(anim.type) ? anim.type.map(t => t.toLowerCase()).includes('rotate') : anim.type.toLowerCase() === 'rotate') ? 'animate' : undefined,
    } : {};
    console.log(`Component: ${fullKey}, Animation props:`, animationProps); // Debug animation props

    return React.createElement(
      MotionComp,
      { 
        ...props,
        ...animationProps,
        key: id || Math.random().toString(36).substr(2, 9),
        onClick: props.event?.onClick ? () => {
          if (props.event?.onClick) {
            const [controllerName, method] = props.event.onClick.split('.');
            const controller = window[controllerName] as any;
            if (controller && typeof controller[method] === 'function') {
              controller[method]();
            } else {
              console.error(`Controller method ${controllerName}.${method} not found`, controller);
            }
          }
        } : undefined,
      },
      children
    );
  };
  
  const elements = (node.components || []).map((comp: any, index: number) => 
    renderComponent(comp)
  ).filter(Boolean);
  
  console.log('Rendered elements:', elements);
  return <>{elements}</>;
}