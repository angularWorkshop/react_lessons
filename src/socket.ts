interface FakeSocketOptions {
  onMessage: (message: string) => void;
}

const lifecycleEvents: string[] = [];

export function resetSocketLifecycleEvents(): void {
  lifecycleEvents.length = 0;
}

export function getSocketLifecycleEvents(): string[] {
  return [...lifecycleEvents];
}

export function createFakeSocket(url: string, options: FakeSocketOptions): {
  disconnect: () => void;
} {
  lifecycleEvents.push(`connect:${url}`);

  const intervalId = window.setInterval(() => {
    options.onMessage(`Ping from ${url}`);
  }, 1000);

  return {
    disconnect: () => {
      window.clearInterval(intervalId);
      lifecycleEvents.push(`disconnect:${url}`);
    },
  };
}
