import yaml from 'js-yaml';
import { preprocessQuiml } from '../utils/preprocessor';

export function parseQuiml(input: string) {
  const preprocessed = preprocessQuiml(input);
  const parsed = yaml.load(preprocessed) as any;
  return {
    ...parsed,
    components: parsed.components || (Array.isArray(parsed) ? parsed : [parsed]),
  };
}