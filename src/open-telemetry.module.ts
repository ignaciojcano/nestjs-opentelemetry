import { Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './open-telemetry.module-definition';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';
import { OpenTelemetryService } from './open-telemetry.service';
import {
  getOTelMetricsService,
  getOTelSDKToken,
  getOTelTraceService,
} from './open-telemetry.utils';
import { metrics, trace } from '@opentelemetry/api';
import {
  OPEN_TELEMETRY_METRICS_API,
  OPEN_TELEMETRY_SDK_INSTANCE,
  OPEN_TELEMETRY_TRACE_API,
} from './open-telemetry.constants';

@Module({
  providers: [
    {
      provide: getOTelSDKToken(),
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: OpenTelemetryModuleOptions) => options.sdk,
    },
    {
      provide: getOTelMetricsService(),
      useValue: metrics,
    },
    {
      provide: getOTelTraceService(),
      useValue: trace,
    },
    OpenTelemetryService,
  ],
  exports: [
    OpenTelemetryService,
    OPEN_TELEMETRY_TRACE_API,
    OPEN_TELEMETRY_METRICS_API,
    OPEN_TELEMETRY_SDK_INSTANCE,
  ],
})
export class OpenTelemetryModule extends ConfigurableModuleClass {}
