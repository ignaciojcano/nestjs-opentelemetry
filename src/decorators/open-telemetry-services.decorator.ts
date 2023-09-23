import { Inject } from '@nestjs/common';
import {
  getOTelMetricsService,
  getOTelTraceService,
} from '../open-telemetry.utils';

export const InjectOtelMetrics = (): ReturnType<typeof Inject> =>
  Inject(getOTelMetricsService());

export const InjectOtelTrace = (): ReturnType<typeof Inject> =>
  Inject(getOTelTraceService());
