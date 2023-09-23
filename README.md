<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[OpenTelemetry](https://github.com/open-telemetry/opentelemetry-js) module for [Nest](https://github.com/nestjs/nest)

## Installation

```bash
npm install @icano/nestjs-opentelemetry @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/auto-instrumentations-node @opentelemetry/api @opentelemetry/sdk-metrics
```

## Getting Started

With installation out of the way, we now need to configure OpenTelemetry and our NestJS Application.

Lets first create an `instrumentation.ts` this is where we will configure the OpenTelemetry SDK, lets go ahead and create this in our `src` directory next to the `main.ts`. The file below is just an example, which makes all our outputs go to console and makes use of the `@opentelemetry/auto-instrumentations-node` to get some default nodejs instrumentations.

```ts
/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

export const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
```

With our `instrumentations.ts` created, please ensure that the `NodeSDK` is exported, as we will actually start it in our `main.ts` and also use it in our `app.module.ts` when we init the `OpenTelemetryModule`.

Ensure that the `NodeSDK` is started at the top of the `bootstrap` function, and make sure to enable NestJS Shutdown Hooks `app.enableShutdownHooks()` this will allow the module to shutdown the `NodeSDK` and ensure data is sent over when the NestJS app is shutdown.

```ts
/*main.ts*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sdk } from './instrumentation';

async function bootstrap() {
  sdk.start();
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
```

With the `NodeSDK` started, now we just need to setup the `OpenTelemetryModule` in our `AppModule`, and pass in the `NodeSDK` to ensure that we call the `shutdown` method when the NestJS app shutsdown.

```ts
/*app.module.ts*/
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sdk } from './instrumentation';
import { OpenTelemetryModule } from '@icano/nestjs-opentelemetry';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [OpenTelemetryModule.forRoot({ sdk })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

With this, you've got a starting point that you can work with, next steps would be to improve your `instrumentation.ts` to use the correct exporters depending on where you will send the data to (Prometheus, Jagger, GCP....), as well as defining the `instrumentations` you will need, as `@opentelemetry/auto-instrumentations-node` has a lot of things, but not everything, for example it has no out of the box instrumentation for `nest-commander`

### Custom Metrics & Traces

The OpenTelemetry metrics and traces API has been exposed via custom providers, to get access to them you can inject them into any of the services where you will need them. You could also access them through the `@opentelemetry/api` `metrics, trace` global instances, but by injecting them it allows for easier testing aftewards.

```ts
/*app.service.ts*/
import {
  InjectOtelMetrics,
  InjectOtelTrace,
} from '@icano/nestjs-opentelemetry';
import { Injectable } from '@nestjs/common';
import { TraceAPI, MetricsAPI } from '@opentelemetry/api';

@Injectable()
export class AppService {
  constructor(
    @InjectOtelTrace() private trace: TraceAPI,
    @InjectOtelMetrics() private metrics: MetricsAPI,
  ) {}
  getHello(): string {
    // create a counter
    const counter = this.metrics
      .getMeterProvider()
      .getMeter('default')
      .createCounter('GetHello', {
        description: 'the times that getHello was called',
      });
    counter.add(1);

    // access trace to create custom span
    const trace = this.trace.getTracer('default');
    trace.startSpan('custom');
    return 'Hello World!';
  }
}
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
