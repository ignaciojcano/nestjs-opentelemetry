import { Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './open-telemetry.module-definition';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';
import { OpenTelemetryService } from './open-telemetry.service';
import { getOTelSDKToken } from './open-telemetry.utils';
import { TraceService } from './trace.service';
import { MetricsService } from './metrics.service';
import { OPEN_TELEMETRY_OPTIONS } from './open-telemetry.constants';

@Module({
  providers: [
    {
      provide: getOTelSDKToken(),
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: OpenTelemetryModuleOptions) => options.sdk,
    },
    {
      provide: OPEN_TELEMETRY_OPTIONS,
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: OpenTelemetryModuleOptions) => options,
    },
    OpenTelemetryService,
    TraceService,
    MetricsService,
  ],
  exports: [OpenTelemetryService, TraceService, MetricsService],
})
export class OpenTelemetryModule extends ConfigurableModuleClass {}
