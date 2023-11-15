import { WasmModuleParams } from '../../../types';
import { Image } from './Image';
import { ImageScanner } from './ImageScanner';
import type { ImageData } from './types';

export const initZBar = (params: WasmModuleParams) => {
  const defaultScannerPromise = ImageScanner.create(params);

  const scanImage = async (image: Image, scanner?: ImageScanner) => {
    if (scanner === undefined) {
      scanner = await defaultScannerPromise;
    }
    const res = scanner.scan(image);
    if (res < 0) {
      throw Error('Scan Failed');
    }
    if (res === 0) return [];

    return image.getSymbols();
  };

  const scanRGBABuffer = async (buffer: ArrayBuffer, width: number, height: number, scanner?: ImageScanner) => {
    const image = await Image.createFromRGBABuffer(width, height, buffer);
    const res = await scanImage(image, scanner);
    image.destroy();

    return res;
  };

  const scanImageData = async (image: ImageData, scanner?: ImageScanner) => {
    const promise = await scanRGBABuffer(image.data.buffer, image.width, image.height, scanner);

    return promise;
  };

  return {
    scanImageData,
  };
};
