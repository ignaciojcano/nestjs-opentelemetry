import { OPEN_TELEMETRY_SDK_INSTANCE } from './open-telemetry.constants';
import { getOTelSDKToken } from './open-telemetry.utils';

describe('utils', () => {
  describe('getOTelSDKToken', () => {
    it('should return OPEN_TELEMETRY_SDK_INSTANCE', () => {
      expect(getOTelSDKToken()).toBe(OPEN_TELEMETRY_SDK_INSTANCE);
    });
  });
});
