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
