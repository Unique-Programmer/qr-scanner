import { WasmModuleParams } from '../../../types';
import { CppObject } from './CppObject';
import { Image } from './Image';
import { Symbol } from './Symbol';
import { ZBarSymbolType, ZBarConfigType } from './enum';
import { getInstance } from './instance';

export class ImageScanner extends CppObject {
  static async create(params: WasmModuleParams): Promise<ImageScanner> {
    const inst = await getInstance(params);
    const ptr = inst._ImageScanner_create();

    return new this(ptr, inst);
  }

  destroy(): void {
    this.checkAlive();
    this.inst._ImageScanner_destory(this.ptr);
    this.ptr = 0;
  }

  setConfig(sym: ZBarSymbolType, conf: ZBarConfigType, value: number): number {
    this.checkAlive();
    return this.inst._ImageScanner_set_config(this.ptr, sym, conf, value);
  }

  enableCache(enable = true): void {
    this.checkAlive();
    this.inst._ImageScanner_enable_cache(this.ptr, enable);
  }

  recycleImage(image: Image): void {
    this.checkAlive();
    this.inst._ImageScanner_recycle_image(this.ptr, image.getPointer());
  }

  getResults() {
    this.checkAlive();
    const res = this.inst._ImageScanner_get_results(this.ptr);

    return Symbol.createSymbolsFromPtr(res, this.inst.HEAPU8.buffer);
  }

  scan(image: Image): number {
    this.checkAlive();
    return this.inst._ImageScanner_scan(this.ptr, image.getPointer());
  }
}
