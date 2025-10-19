# Quantum UI React Implementation

![License](https://img.shields.io/badge/license-MIT-blue) ![NPM Version](https://img.shields.io/npm/v/@quantum-ui/react) ![Status](https://img.shields.io/badge/status-Active-green)

**React renderer for QUIML (Quantum User Interface Markup Language)**

---

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
This repository provides the React (JavaScript) implementation for QUIML, a declarative, extensible UI framework for cross-platform applications. It renders QUIML YAML files into React components, supporting web-based UIs with React v19.2. This is a standalone implementation adhering to the QUIML v1.1 specification— it does not share code with other platform implementations but guarantees consistent functionality and APIs.

For the core QUIML specification, see [quantum-ui-spec](https://github.com/quantum-ai-suite/quantum-ui-spec). Part of the Quantum AI Suite ecosystem by [Sly Technologies Inc.](https://slytechs.com).

## Installation
Install via NPM:

```bash
npm install @quantum-ui/react
```

Requires React v19.2 or higher. For full setup, include a YAML parser like js-yaml:

```bash
npm install js-yaml
```

## Usage
1. **Load QUIML File**:
   ```javascript
   import { QUIML } from '@quantum-ui/react';
   import yaml from 'js-yaml';
   
   // Load and parse QUIML YAML
   const quimlData = yaml.load(yourQuimlYamlString);
   
   // Render in your app
   function App() {
     return <QUIML data={quimlData} />;
   }
   ```

2. **Controller Integration**:
   QUIML supports JavaScript controllers. Define one in your QUIML file and implement it:

   ```yaml
   quiml: 1.1
   controllers:
     - name: MainController
       language: javascript
       script: mainController.js
   ```

   In `mainController.js`:
   ```javascript
   export default class MainController {
     init() { /* Initialization */ }
     handleClick(event) { /* Event handler */ }
   }
   ```

3. **Advanced Features**:
   - Hybrid Styling: Supports inline, QUIML-CSS sections, and external CSS.
   - Canvas Module: Includes WebGL/Three.js for 2D/3D graphics.
   - AI Integration: Build-time prompt compilation for dynamic UIs.

For examples, see [quantum-ui-examples](https://github.com/quantum-ai-suite/quantum-ui-examples).

## Features
- **Cross-Platform Fidelity**: Renders QUIML to native React components with v19.2 support.
- **Extensibility**: Register custom types/attributes via `QUIML.registerType`.
- **Performance**: Optimized with D3.js v7.9.0 and Three.js r172 for graphics.
- **AI-Ready**: WebSocket/GraphQL for real-time updates; prompt-based generation.

## Contributing
Contributions welcome for open-source QUIML implementations! See [Contributing Guidelines](CONTRIBUTING.md).

- **Issues**: File at [quantum-community-hub Issues](https://github.com/quantum-ai-suite/quantum-community-hub/issues) with `quiml-react` label.
- **Discussions**: Join at [Quantum AI Suite Discussions](https://github.com/orgs/quantum-ai-suite/discussions).
- **Documentation**: [Quantum UI Wiki](https://github.com/quantum-ai-suite/quantum-community-hub/wiki).

Follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License
Licensed under the MIT License. See [LICENSE](LICENSE).

## Contact
- **Website**: [quantumsuite.ai](https://quantumsuite.ai)
- **Email**: ui-team@quantumsuite.ai
- **Twitter**: [@QuantumSuiteAI](https://twitter.com/QuantumSuiteAI)
- **Discord**: [Join our Discord](https://discord.gg/quantumsuite)

Built by the Quantum AI Suite Team – Revolutionizing business with AI-driven tools.
