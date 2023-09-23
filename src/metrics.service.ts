import { Meter, MeterOptions, metrics } from '@opentelemetry/api';
import { Inject, Injectable } from '@nestjs/common';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';
import { OPEN_TELEMETRY_OPTIONS } from './open-telemetry.constants';

@Injectable()
export class MetricsService {
  constructor(
    @Inject(OPEN_TELEMETRY_OPTIONS) private options: OpenTelemetryModuleOptions,
  ) {}

  public getMeter(
    {
      name,
      version,
      options,
    }: {
      name?: string;
      version?: string;
      options?: MeterOptions;
    } = {
      name: this.options.meterDefaultName || 'default',
      version: this.options.defaultVersion,
    },
  ): Meter {
    return metrics.getMeterProvider().getMeter(name, version, options);
  }
}
