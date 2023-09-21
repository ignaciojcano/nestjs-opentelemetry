import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Tracer, trace } from '@opentelemetry/api';
import { TraceService } from './trace.service';
import { OPEN_TELEMETRY_OPTIONS } from './open-telemetry.constants';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';

describe('TraceService', () => {
  let traceService: TraceService;
  let otelTraceSpy: jest.SpyInstance<Tracer>;
  let moduleOptions: DeepMocked<OpenTelemetryModuleOptions>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TraceService],
    })
      .useMocker((token) => {
        if (token === OPEN_TELEMETRY_OPTIONS) {
          return createMock<OpenTelemetryModuleOptions>({
            traceDefaultName: undefined,
            defaultVersion: undefined,
          });
        }
        return createMock(token);
      })
      .compile();

    traceService = moduleRef.get<TraceService>(TraceService);
    moduleOptions = moduleRef.get<OpenTelemetryModuleOptions>(
      OPEN_TELEMETRY_OPTIONS,
    );
    otelTraceSpy = jest.spyOn(trace, 'getTracer');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(traceService).toBeDefined();
  });

  describe('getTracer', () => {
    it('should return a Tracer with defaults', () => {
      const tracer = traceService.getTracer();
      expect(tracer).toBeDefined();
      expect(otelTraceSpy).toBeCalledWith('default', undefined);
    });

    it('should return a Trace with module defaults', () => {
      moduleOptions.traceDefaultName = 'Default Trace';
      moduleOptions.defaultVersion = '800';
      const tracer = traceService.getTracer();
      expect(tracer).toBeDefined();
      expect(otelTraceSpy).toBeCalledWith('Default Trace', '800');
    });

    it('should return a Tracer with the given options', () => {
      const tracer = traceService.getTracer({
        name: 'Test',
        version: '55',
      });
      expect(tracer).toBeDefined();
      expect(otelTraceSpy).toBeCalledWith('Test', '55');
    });
  });
});
