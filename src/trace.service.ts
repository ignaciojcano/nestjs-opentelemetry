import { trace, Tracer } from '@opentelemetry/api';
import { Inject, Injectable } from '@nestjs/common';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';
import { OPEN_TELEMETRY_OPTIONS } from './open-telemetry.constants';

@Injectable()
export class TraceService {
  constructor(
    @Inject(OPEN_TELEMETRY_OPTIONS) private options: OpenTelemetryModuleOptions,
  ) {}

  public getTracer(
    {
      name,
      version,
    }: {
      name?: string;
      version?: string;
    } = {
      name: this.options.traceDefaultName || 'default',
      version: this.options.defaultVersion,
    },
  ): Tracer {
    return trace.getTracer(name, version);
  }
}
