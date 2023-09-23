import { Inject } from '@nestjs/common';
import { InjectOtelSDK } from './open-telemetry-sdk.decorator';
import { OPEN_TELEMETRY_SDK_INSTANCE } from '../open-telemetry.constants';

jest.mock('@nestjs/common');

describe('Service Decorators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('InjectOtelSDK', () => {
    it('should call Inject with OPEN_TELEMETRY_SDK_INSTANCE', () => {
      InjectOtelSDK();
      expect(Inject).toBeCalledWith(OPEN_TELEMETRY_SDK_INSTANCE);
    });
  });
});
