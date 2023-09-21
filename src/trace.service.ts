import { trace, Tracer } from '@opentelemetry/api';
import { Inject, Injectable } from '@nestjs/common';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './open-telemetry.module-definition';

@Injectable()
export class TraceService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: OpenTelemetryModuleOptions,
  ) {}

  public getTracer({
    name,
    version,
  }: {
    name?: string;
    version?: string;
  }): Tracer {
    const tracerName = name || this.options.traceDefaultName || 'default';
    const tracerVersion = version || this.options.defaultVersion;
    return trace.getTracer(tracerName, tracerVersion);
  }
}
