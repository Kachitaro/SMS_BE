import { SmsApplication } from '../application';
import {seedBranch} from './00100-seed-branch';
import {seedLevel} from './00100-seed-levels';

export interface Process {
  name: string;
  func: (app: SmsApplication) => Promise<void>;
}
export const processes: Process[] = [seedBranch, seedLevel];
