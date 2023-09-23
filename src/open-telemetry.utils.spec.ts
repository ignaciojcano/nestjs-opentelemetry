import {
  OPEN_TELEMETRY_METRICS_API,
  OPEN_TELEMETRY_SDK_INSTANCE,
  OPEN_TELEMETRY_TRACE_API,
} from './open-telemetry.constants';
import {
  getOTelMetricsService,
  getOTelSDKToken,
  getOTelTraceService,
} from './open-telemetry.utils';

describe('utils', () => {
  describe('getOTelSDKToken', () => {
    it('should return OPEN_TELEMETRY_SDK_INSTANCE', () => {
      expect(getOTelSDKToken()).toBe(OPEN_TELEMETRY_SDK_INSTANCE);
    });
  });
  describe('getOTelTraceService', () => {
    it('should return OPEN_TELEMETRY_TRACE_API', () => {
      expect(getOTelTraceService()).toBe(OPEN_TELEMETRY_TRACE_API);
    });
  });
  describe('getOTelMetricsService', () => {
    it('should return OPEN_TELEMETRY_METRICS_API', () => {
      expect(getOTelMetricsService()).toBe(OPEN_TELEMETRY_METRICS_API);
    });
  });
});
