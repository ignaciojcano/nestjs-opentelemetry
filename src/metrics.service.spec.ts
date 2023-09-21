import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Meter, metrics } from '@opentelemetry/api';
import { MetricsService } from './metrics.service';
import { OPEN_TELEMETRY_OPTIONS } from './open-telemetry.constants';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';

describe('MetricsService', () => {
  let metricsService: MetricsService;
  let otelMetricsSpy: jest.SpyInstance<Meter>;
  let moduleOptions: DeepMocked<OpenTelemetryModuleOptions>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MetricsService],
    })
      .useMocker((token) => {
        if (token === OPEN_TELEMETRY_OPTIONS) {
          return createMock<OpenTelemetryModuleOptions>({
            meterDefaultName: undefined,
            defaultVersion: undefined,
          });
        }
        return createMock(token);
      })
      .compile();

    metricsService = moduleRef.get<MetricsService>(MetricsService);
    moduleOptions = moduleRef.get<OpenTelemetryModuleOptions>(
      OPEN_TELEMETRY_OPTIONS,
    );
    otelMetricsSpy = jest.spyOn(metrics, 'getMeter');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(metricsService).toBeDefined();
  });

  describe('getMeter', () => {
    it('should return a Meter with defaults', () => {
      const tracer = metricsService.getMeter();
      expect(tracer).toBeDefined();
      expect(otelMetricsSpy).toBeCalledWith('default', undefined, undefined);
    });

    it('should return a Meter with module defaults', () => {
      moduleOptions.meterDefaultName = 'Default Meter';
      moduleOptions.defaultVersion = '800';
      const tracer = metricsService.getMeter();
      expect(tracer).toBeDefined();
      expect(otelMetricsSpy).toBeCalledWith('Default Meter', '800', undefined);
    });

    it('should return a Meter with the given options', () => {
      const tracer = metricsService.getMeter({
        name: 'Test',
        version: '55',
        options: {},
      });
      expect(tracer).toBeDefined();
      expect(otelMetricsSpy).toBeCalledWith('Test', '55', {});
    });
  });
});
