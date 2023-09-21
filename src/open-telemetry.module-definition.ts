import { ConfigurableModuleBuilder } from '@nestjs/common';
import { OpenTelemetryModuleOptions } from './interfaces/module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<OpenTelemetryModuleOptions>()
    .setClassMethodName('forRoot')
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
