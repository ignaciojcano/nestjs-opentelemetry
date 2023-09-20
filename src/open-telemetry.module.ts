import { Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './open-telemetry.module-definition';

@Module({
  providers: [
    // {
    //   provide: getAnalyticsToken(),
    //   inject: [MODULE_OPTIONS_TOKEN],
    //   useFactory: (options: AnalyticsSettings) => new Analytics(options),
    // },
  ],
  exports: [],
})
export class SegmentAnalyticsModule extends ConfigurableModuleClass {}
