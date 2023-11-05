import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Levels,
  Courses,
} from '../models';
import {LevelsRepository} from '../repositories';

export class LevelsCoursesController {
  constructor(
    @repository(LevelsRepository) protected levelsRepository: LevelsRepository,
  ) { }

  @get('/levels/{id}/courses', {
    responses: {
      '200': {
        description: 'Array of Levels has many Courses',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Courses)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Courses>,
  ): Promise<Courses[]> {
    return this.levelsRepository.courses(id).find(filter);
  }

  @post('/levels/{id}/courses', {
    responses: {
      '200': {
        description: 'Levels model instance',
        content: {'application/json': {schema: getModelSchemaRef(Courses)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Levels.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {
            title: 'NewCoursesInLevels',
            exclude: ['id'],
            optional: ['levelId']
          }),
        },
      },
    }) courses: Omit<Courses, 'id'>,
  ): Promise<Courses> {
    return this.levelsRepository.courses(id).create(courses);
  }

  @patch('/levels/{id}/courses', {
    responses: {
      '200': {
        description: 'Levels.Courses PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {partial: true}),
        },
      },
    })
    courses: Partial<Courses>,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.levelsRepository.courses(id).patch(courses, where);
  }

  @del('/levels/{id}/courses', {
    responses: {
      '200': {
        description: 'Levels.Courses DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.levelsRepository.courses(id).delete(where);
  }
}
