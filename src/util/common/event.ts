type CustomEventListenerOptions = Partial<{
  // ms
  delay: number;
  interval: number;
  until: number;
  shouldStop(): boolean;
}>;

const wait = async (delay = 1) => new Promise((resolve) => setTimeout(resolve, delay));

export const customEventListener = (
  node: HTMLElement,
  test: () => boolean,
  callback: () => void,
  options: CustomEventListenerOptions = {}
) => {
  const { delay, interval, until, shouldStop } = options;
  const untilDate = until && Date.now() + until;
  (async () => {
    if (delay) await wait(delay);
    let stop = false;
    while (!stop) {
      if (untilDate && Date.now() < untilDate) {
        stop = true;
        break;
      }
      if (shouldStop && (stop = shouldStop())) {
        stop = true;
        break;
      }
      if (!test()) {
        await wait(interval);
      } else {
        break;
      }
    }
    if (!stop) {
      callback();
    }
  })();
};
