// No-op shim for webgpu backend import path.
// The app uses webgl/cpu explicitly, so this prevents noisy Windows adapter warnings.
export class WebGPUBackend {}

export const webgpu_util = {
    flatDispatchLayout: () => ({}),
    computeDispatch: () => []
};
