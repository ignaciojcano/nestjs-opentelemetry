import {
  OPEN_TELEMETRY_METRICS_API,
  OPEN_TELEMETRY_SDK_INSTANCE,
  OPEN_TELEMETRY_TRACE_API,
} from './open-telemetry.constants';

export function getOTelSDKToken() {
  return OPEN_TELEMETRY_SDK_INSTANCE;
}

export function getOTelTraceService() {
  return OPEN_TELEMETRY_TRACE_API;
}

export function getOTelMetricsService() {
  return OPEN_TELEMETRY_METRICS_API;
}
