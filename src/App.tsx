import React from 'react';
import { QUIML } from '../src';
import quimlFile from '../examples/simple-login.quiml?raw';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

function App() {
  const content = QUIML.load(quimlFile);
  console.log('Rendered content:', content);
  return <ErrorBoundary>{content}</ErrorBoundary>;
}

export default App;