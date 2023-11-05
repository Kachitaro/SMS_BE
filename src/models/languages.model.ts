import { Entity, model, property, hasMany} from "@loopback/repository";
import {Courses} from './courses.model';

@model()
export class Languages extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
    index: true,
  })
  id: number;

  @property({
    type: "string",
  })
  name?: string;

  @hasMany(() => Courses)
  courses: Courses[];

  constructor(data?: Partial<Languages>) {
    super(data);
  }
}

export interface LanguagesRelations {
  // describe navigational properties here
}

export type LanguagesWithRelations = Languages & LanguagesRelations;
