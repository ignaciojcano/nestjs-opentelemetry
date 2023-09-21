import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { InjectOtelSDK } from './decorators/open-telemetry-sdk.decorator';

@Injectable()
export class OpenTelemetryService implements OnApplicationShutdown {
  constructor(@InjectOtelSDK() private sdk: NodeSDK) {}

  async onApplicationShutdown(): Promise<void> {
    await this.sdk.shutdown();
  }
}
