// src/core/controller.ts
export class QuimlController {
  private state: Record<string, any> = {};

  constructor(script: string) {
    // Eval or sandbox the script (use new Function for safety)
    const func = new Function('state', script);
    func(this.state);
  }

  // Expose methods for events/bindings
  invoke(method: string, ...args: any[]) {
    if (typeof this.state[method] === 'function') {
      this.state[method](...args);
    }
  }
}

// In renderer, wire events: onClick={() => controller.invoke('submit')}