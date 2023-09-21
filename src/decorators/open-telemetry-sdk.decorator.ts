import { Inject } from '@nestjs/common';
import { getOTelSDKToken } from '../open-telemetry.utils';

export const InjectOtelSDK = (): ReturnType<typeof Inject> =>
  Inject(getOTelSDKToken());
