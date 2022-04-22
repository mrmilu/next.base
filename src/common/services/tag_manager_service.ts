declare global {
  interface Window {
    dataLayer: Array<unknown>;
  }
}

export class TagManagerService {
  private readonly dataLayer: Array<unknown> | null = null;

  constructor() {
    if (typeof window !== "undefined" && !window.dataLayer) {
      this.dataLayer = window.dataLayer || [];
    }
  }

  sendEvent(name: string, parameters?: Record<string, string>): void {
    console.log(name);
    if (this.dataLayer) {
      this.dataLayer.push({ event: name, ...parameters });
    }
  }
}
