import { getZBarWasmModuleParams } from '../../../helpers/utils';
import { WasmModuleParams } from '../../../types';
import { ZBarInstance } from './ZBarInstance';
import { instantiate } from './zbar';

let wasmInstance: any;

export const getInstance = async (params: WasmModuleParams = getZBarWasmModuleParams()): Promise<ZBarInstance> => {
  if (!wasmInstance) {
    wasmInstance = await instantiate(params);
  }

  if (!wasmInstance) {
    throw Error('WASM was not loaded');
  }

  return wasmInstance;
};
