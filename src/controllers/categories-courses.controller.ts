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
  Categories,
  Courses,
} from '../models';
import {CategoriesRepository} from '../repositories';

export class CategoriesCoursesController {
  constructor(
    @repository(CategoriesRepository) protected categoriesRepository: CategoriesRepository,
  ) { }

  @get('/categories/{id}/courses', {
    responses: {
      '200': {
        description: 'Array of Categories has many Courses',
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
    return this.categoriesRepository.courses(id).find(filter);
  }

  @post('/categories/{id}/courses', {
    responses: {
      '200': {
        description: 'Categories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Courses)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categories.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {
            title: 'NewCoursesInCategories',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) courses: Omit<Courses, 'id'>,
  ): Promise<Courses> {
    return this.categoriesRepository.courses(id).create(courses);
  }

  @patch('/categories/{id}/courses', {
    responses: {
      '200': {
        description: 'Categories.Courses PATCH success count',
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
    return this.categoriesRepository.courses(id).patch(courses, where);
  }

  @del('/categories/{id}/courses', {
    responses: {
      '200': {
        description: 'Categories.Courses DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.categoriesRepository.courses(id).delete(where);
  }
}
