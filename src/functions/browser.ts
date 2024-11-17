export const copyToClipboard = async (data: any) => {
  let isCopyDone = false;

  try {
    if (window.isSecureContext && window.navigator.clipboard && data) {
      await window.navigator.clipboard.writeText(data);
      isCopyDone = true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = data;
      textArea.setAttribute(
        "style",
        "position: fixed;top:-999999px;left:-999999px;opacity:0;",
      );
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      isCopyDone = await new Promise((resolve, reject) => {
        const execDone = document.execCommand("copy");
        textArea.remove();

        if (execDone) {
          resolve(true);
        } else {
          reject();
        }
      });
    }

    return isCopyDone;
  } catch {
    return isCopyDone;
  }
};

// Type definition for the throttle function
type ThrottleFunction = <T extends (...args: any[]) => void>(
  func: T,
  limit: number,
) => (...args: Parameters<T>) => void;

// Custom throttle function without `this`
export const throttle: ThrottleFunction = (func, limit) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return (...args: Parameters<typeof func>) => {
    if (!lastRan) {
      func(...args); // No `this` needed here
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args); // Again, no `this` used
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};
