import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Levels, LevelsRelations, Courses} from '../models';
import {CoursesRepository} from './courses.repository';

export class LevelsRepository extends DefaultCrudRepository<
  Levels,
  typeof Levels.prototype.id,
  LevelsRelations
> {

  public readonly courses: HasManyRepositoryFactory<Courses, typeof Levels.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>,
  ) {
    super(Levels, dataSource);
    this.courses = this.createHasManyRepositoryFactoryFor('courses', coursesRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
