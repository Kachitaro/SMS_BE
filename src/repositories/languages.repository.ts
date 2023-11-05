import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Languages, LanguagesRelations, Courses} from '../models';
import {CoursesRepository} from './courses.repository';

export class LanguagesRepository extends DefaultCrudRepository<
  Languages,
  typeof Languages.prototype.id,
  LanguagesRelations
> {

  public readonly courses: HasManyRepositoryFactory<Courses, typeof Languages.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>,
  ) {
    super(Languages, dataSource);
    this.courses = this.createHasManyRepositoryFactoryFor('courses', coursesRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
