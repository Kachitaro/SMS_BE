import {Entity, model, property} from '@loopback/repository';

@model()
export class Courses extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
    index: true,
  })
  id: number;

  @property({
    type: "number",
    required: true,
  })
  languagesId: number;

  @property({
    type: "number",
    required: true,
  })
  levelId: number;

  @property({
    type: "number",
    required: true,
  })
  categoryId: number;

  @property({
    type: "number",
    required: true,
  })
  lessons: number;

  @property({
    type: "string",
    required: true,
  })
  description?: string;

  @property({
    type: "string",
    required: true,
  })
  term?: string;

  constructor(data?: Partial<Courses>) {
    super(data);
  }
}

export interface CoursesRelations {
  // describe navigational properties here
}

export type CoursesWithRelations = Courses & CoursesRelations;
