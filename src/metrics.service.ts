import { Meter, MeterOptions, metrics } from '@opentelemetry/api';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './open-telemetry.module-definition';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';

@Injectable()
export class MetricsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: OpenTelemetryModuleOptions,
  ) {}

  public getMeter({
    name,
    version,
    options,
  }: {
    name?: string;
    version?: string;
    options?: MeterOptions;
  }): Meter {
    const meterName = name || this.options.traceDefaultName || 'default';
    const meterVersion = version || this.options.defaultVersion;
    return metrics.getMeter(meterName, meterVersion, options);
  }
}
