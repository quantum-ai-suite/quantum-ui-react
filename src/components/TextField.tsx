import React, { useState, useEffect } from 'react';

const TextField: React.FC<{ 
  placeholder: string; 
  style?: React.CSSProperties; 
  bindings?: any[]; 
  secure?: boolean 
}> = ({ placeholder, style, bindings, secure }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (bindings) {
      bindings.forEach(binding => {
        if (binding.source && binding.target === 'text') {
          const [controllerName, prop] = binding.source.split('.');
          const controller = window[controllerName] as any;
          if (controller && prop) {
            setValue(controller[prop] || '');
          }
        }
      });
    }
  }, [bindings]);
  const updateController = (newValue: string) => {
    if (bindings) {
      bindings.forEach(binding => {
        if (binding.source && binding.target === 'text') {
          const [controllerName, prop] = binding.source.split('.');
          const controller = window[controllerName] as any;
          if (controller && prop) {
            if (typeof controller[`set${prop.charAt(0).toUpperCase() + prop.slice(1)}`] === 'function') {
              controller[`set${prop.charAt(0).toUpperCase() + prop.slice(1)}`](newValue);
            } else {
              controller[prop] = newValue;
            }
          }
        }
      });
    }
  };
  return <input 
    type={secure ? 'password' : 'text'} 
    placeholder={placeholder} 
    style={{ ...style, backgroundColor: style?.bg || '#333333', color: style?.color || '#FFFFFF' }} 
    value={value} 
    onChange={e => {
      const newValue = e.target.value;
      setValue(newValue);
      updateController(newValue);
    }}
  />;
};

export default TextField;