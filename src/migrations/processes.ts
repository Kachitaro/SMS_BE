import { SmsApplication } from '../application';
import {seedBranch} from './00100-seed-branch';

export interface Process {
  name: string;
  func: (app: SmsApplication) => Promise<void>;
}
export const processes: Process[] = [seedBranch];
