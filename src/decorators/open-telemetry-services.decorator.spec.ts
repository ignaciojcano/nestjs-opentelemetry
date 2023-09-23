import { Inject } from '@nestjs/common';
import {
  InjectOtelMetrics,
  InjectOtelTrace,
} from './open-telemetry-services.decorator';
import {
  OPEN_TELEMETRY_METRICS_API,
  OPEN_TELEMETRY_TRACE_API,
} from '../open-telemetry.constants';

jest.mock('@nestjs/common');

describe('Service Decorators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('InjectOtelMetrics', () => {
    it('should call Inject with OPEN_TELEMETRY_SDK_INSTANCE', () => {
      InjectOtelMetrics();
      expect(Inject).toBeCalledWith(OPEN_TELEMETRY_METRICS_API);
    });
  });

  describe('InjectOtelTrace', () => {
    it('should return OPEN_TELEMETRY_TRACE_API', () => {
      InjectOtelTrace();
      expect(Inject).toBeCalledWith(OPEN_TELEMETRY_TRACE_API);
    });
  });
});
