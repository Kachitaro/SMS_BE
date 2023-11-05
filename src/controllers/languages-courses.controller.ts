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
  Languages,
  Courses,
} from '../models';
import {LanguagesRepository} from '../repositories';

export class LanguagesCoursesController {
  constructor(
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) { }

  @get('/languages/{id}/courses', {
    responses: {
      '200': {
        description: 'Array of Languages has many Courses',
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
    return this.languagesRepository.courses(id).find(filter);
  }

  @post('/languages/{id}/courses', {
    responses: {
      '200': {
        description: 'Languages model instance',
        content: {'application/json': {schema: getModelSchemaRef(Courses)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Languages.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {
            title: 'NewCoursesInLanguages',
            exclude: ['id'],
            optional: ['languagesId']
          }),
        },
      },
    }) courses: Omit<Courses, 'id'>,
  ): Promise<Courses> {
    return this.languagesRepository.courses(id).create(courses);
  }

  @patch('/languages/{id}/courses', {
    responses: {
      '200': {
        description: 'Languages.Courses PATCH success count',
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
    return this.languagesRepository.courses(id).patch(courses, where);
  }

  @del('/languages/{id}/courses', {
    responses: {
      '200': {
        description: 'Languages.Courses DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.languagesRepository.courses(id).delete(where);
  }
}
