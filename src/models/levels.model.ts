import {Entity, model, property, hasMany} from '@loopback/repository';
import {Courses} from './courses.model';

@model()
export class Levels extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    index: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    length: 2,
  })
  code?: string;

  @hasMany(() => Courses, {keyTo: 'levelId'})
  courses: Courses[];

  constructor(data?: Partial<Levels>) {
    super(data);
  }
}

export interface LevelsRelations {
  // describe navigational properties here
}

export type LevelsWithRelations = Levels & LevelsRelations;
