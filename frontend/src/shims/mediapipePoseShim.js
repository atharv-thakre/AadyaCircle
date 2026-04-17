// Build-time shim for pose-detection's optional MediaPipe runtime import.
// This app uses MoveNet (tfjs runtime), so this class should never be instantiated.
export class Pose {
    constructor() {
        throw new Error('MediaPipe Pose runtime is not enabled in this build.');
    }
}
