export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const debounce = <T>(cb: (args: T) => void, delay = 500) => {
  let timeout: NodeJS.Timeout;

  return (args: T) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(args);
    }, delay);
  };
};
