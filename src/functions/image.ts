// export const getBlurDataUrl = async (source: string) => {
//   try {
//     const buffer = await fetch(source).then(async (response) => {
//       return Buffer.from(await response.arrayBuffer());
//     });

//     const { base64 } = await getPlaiceholder(buffer, { size: 10 });
//     return base64;
//   } catch (error) {
//     console.error(error);
//   }
// };

// TOTO: Remove
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: any, e2: any, e3: any) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: any, g: any, b: any) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
