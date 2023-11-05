import {Entity, model, property, hasMany} from '@loopback/repository';
import {Courses} from './courses.model';

@model()
export class Categories extends Entity {
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

  @hasMany(() => Courses, {keyTo: 'categoryId'})
  courses: Courses[];

  constructor(data?: Partial<Categories>) {
    super(data);
  }
}

export interface CategoriesRelations {
  // describe navigational properties here
}

export type CategoriesWithRelations = Categories & CategoriesRelations;
