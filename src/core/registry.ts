interface TypeDefinition {
  baseType?: string;
  attributes: Record<string, { default?: any; apply?: (el: any, val: any) => void }>;
}

const typeRegistry: Record<string, TypeDefinition> = {
  VerticalBox: { attributes: { style: { default: {} }, children: { default: [] } } },
  Label: { attributes: { text: { default: '' }, style: { default: {} } } },
  Button: { attributes: { text: { default: '' }, style: { default: {} }, onClick: { default: undefined } } },
};

export function registerType(type: string, definition: TypeDefinition) {
  typeRegistry[type] = definition;
}

export function getTypeDefinition(type: string): TypeDefinition {
  return typeRegistry[type] || { attributes: {} };
}