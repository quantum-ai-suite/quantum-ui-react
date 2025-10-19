import { parseQuiml } from './core/parser';
import { renderQuiml } from './core/renderer';
import { registerType } from './core/registry'; // Import registerType

export const QUIML = {
  load: (quimlString: string) => {
    const node = parseQuiml(quimlString);
    return renderQuiml(node);
  },
  registerType, // Export the function
};