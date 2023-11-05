import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Categories, CategoriesRelations, Courses} from '../models';
import {CoursesRepository} from './courses.repository';

export class CategoriesRepository extends DefaultCrudRepository<
  Categories,
  typeof Categories.prototype.id,
  CategoriesRelations
> {

  public readonly courses: HasManyRepositoryFactory<Courses, typeof Categories.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>,
  ) {
    super(Categories, dataSource);
    this.courses = this.createHasManyRepositoryFactoryFor('courses', coursesRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
