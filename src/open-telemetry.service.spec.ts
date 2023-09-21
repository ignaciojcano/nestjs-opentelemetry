import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { OpenTelemetryService } from './open-telemetry.service';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getOTelSDKToken } from './open-telemetry.utils';

describe('OpenTelemetryService', () => {
  let otelService: OpenTelemetryService;
  let sdkMock: DeepMocked<NodeSDK>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OpenTelemetryService],
    })
      .useMocker((token) => {
        if (token === getOTelSDKToken()) {
          return createMock<NodeSDK>();
        }
        return createMock(token);
      })
      .compile();

    otelService = moduleRef.get<OpenTelemetryService>(OpenTelemetryService);
    sdkMock = moduleRef.get<DeepMocked<NodeSDK>>(getOTelSDKToken());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(otelService).toBeDefined();
  });

  describe('onApplicationShutdown', () => {
    it('should call sdk.shutdown', async () => {
      await otelService.onApplicationShutdown();
      expect(sdkMock.shutdown).toBeCalled();
    });
  });
});
