// src/utils/preprocessor.ts
export function preprocessQuiml(inputText: string): string {
  let lines = inputText.split('\n');
  let outputLines: string[] = [];

  const expandFlowMapping = (mappingStr: string, indentLevel: number): string[] => {
    mappingStr = mappingStr.trim().slice(1, -1).trim();
    const pairs = mappingStr.split(/,\s*(?![^{]*})/);
    const lines: string[] = [];
    
    for (let pair of pairs) {
      if (pair.includes(':')) {
        let [key, value] = pair.split(':', 2);
        key = key.trim();
        value = value.trim();
        
        // Handle nested objects
        if (value.startsWith('{')) {
          const subLines = expandFlowMapping(value, indentLevel + 2);
          lines.push(' '.repeat(indentLevel) + key + ':');
          lines.push(...subLines);
          continue;
        }
        
        // Quote values with # or CSS values like 40px
        if (value.includes('#') || value.match(/^\d+px$/)) {
          value = `"${value}"`;
        }
        
        lines.push(' '.repeat(indentLevel) + key + ': ' + value);
      }
    }
    return lines;
  };

  for (let line of lines) {
    // Handle component definitions with #id
    line = line.replace(/^(\s*)-\s*(\w+#\w+):/, '$1- "$2":');
    
    // Expand inline { ... } style objects
    const match = line.match(/^(\s*)([^:]+):\s*\{(.*)\}$/);
    if (match) {
      const [_, indent, key, mapping] = match;
      outputLines.push(indent + key + ':');
      const expanded = expandFlowMapping('{' + mapping + '}', indent.length + 2);
      outputLines.push(...expanded);
    } else {
      // Quote values with # (for colors) but not comments
      if (line.includes(':') && !line.trim().startsWith('#')) {
        const colonIndex = line.indexOf(':');
        const keyPart = line.substring(0, colonIndex);
        let valuePart = line.substring(colonIndex + 1).trim();
        
        // Quote color values and pixel values
        if (valuePart.match(/^#[0-9A-Fa-f]{6}$/) || valuePart.match(/^\d+px$/)) {
          valuePart = `"${valuePart}"`;
          line = keyPart + ': ' + valuePart;
        }
      }
      outputLines.push(line);
    }
  }
  
  return outputLines.join('\n');
}