import { DataSource } from 'typeorm';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { getTypeORMConfiguration } from './database.helpers';
import { TYPEORM_EX_CUSTOM_REPOSITORY } from './database.decorator';
import ENTITIES from './entities';
import REPOSITORIES from './repositories';
import { DB_LOGGING, DB_TYPE, DB_URI } from '@shared/environment';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return TypeOrmModule.forRoot(
      getTypeORMConfiguration({
        entities: ENTITIES,
        type: DB_TYPE,
        url: DB_URI,
        logging: DB_LOGGING,
      }),
    );
  }
  static forFeature(entities = []): DynamicModule {
    const providers: Provider[] = [];
    console.error('providers', providers, REPOSITORIES, entities);
    for (const repository of REPOSITORIES) {
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository,
      );

      if (!entity) {
        continue;
      }
      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource) => {
          const baseRepository = dataSource.getRepository(entity);

          return new repository(
            baseRepository.target as any,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }
    return {
      module: DatabaseModule,
      imports: [],
      providers: providers,
      exports: providers,
    };
  }
}
