import { NodeSDK } from '@opentelemetry/sdk-node';

export interface OpenTelemetryModuleOptions {
  sdk: NodeSDK;
  traceDefaultName?: string;
  meterDefaultName?: string;
  defaultVersion?: string;
}
