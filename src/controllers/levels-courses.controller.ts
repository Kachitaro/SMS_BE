import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from "@loopback/repository";
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from "@loopback/rest";
import { Courses, Levels } from "../models";
import { LevelsRepository } from "../repositories";

export class LevelsCoursesController {
  constructor(
    @repository(LevelsRepository) protected levelsRepository: LevelsRepository
  ) {}

  @get("/levels", {
    responses: {
      "200": {
        description: "Array of Levels model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Levels) },
          },
        },
      },
    },
  })
  async find(@param.filter(Levels) filter?: Filter<Levels>): Promise<Levels[]> {
    return this.levelsRepository.find(filter);
  }

  @post("/levels", {
    responses: {
      "200": {
        description: "Levels model instance",
        content: { "application/json": { schema: getModelSchemaRef(Levels) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Levels, {
            title: "NewLevels",
          }),
        },
      },
    })
    levels: Levels
  ): Promise<Levels> {
    console.log(levels);
    return this.levelsRepository.create(levels);
  }

  @patch("/levels/{id}/courses", {
    responses: {
      "200": {
        description: "Levels.Courses PATCH success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Courses, { partial: true }),
        },
      },
    })
    courses: Partial<Courses>,
    @param.query.object("where", getWhereSchemaFor(Courses))
    where?: Where<Courses>
  ): Promise<Count> {
    return this.levelsRepository.courses(id).patch(courses, where);
  }

  @del("/levels/{id}/courses", {
    responses: {
      "200": {
        description: "Levels.Courses DELETE success count",
        content: { "application/json": { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Courses))
    where?: Where<Courses>
  ): Promise<Count> {
    return this.levelsRepository.courses(id).delete(where);
  }
}
