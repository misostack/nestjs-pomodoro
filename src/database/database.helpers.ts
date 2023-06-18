import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DefaultNamingStrategy, Table, ValueTransformer } from 'typeorm';

const camelToSnakeCase = (str) =>
  str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/^_/, '');

function parseName(
  prefix: string,
  tableOrName: Table | string,
  columnNames: string | string[],
  _referencedTablePath: string,
  _referencedColumnNames: string | string[],
) {
  const tableName =
    tableOrName instanceof Table ? tableOrName.name : tableOrName;
  const columnName = Array.isArray(columnNames)
    ? columnNames.join('_')
    : columnNames;
  const refTableName = _referencedTablePath ? _referencedTablePath : '';
  const refColumnName = Array.isArray(_referencedColumnNames)
    ? _referencedColumnNames.join('_')
    : _referencedColumnNames;

  return `${prefix}_${tableName}${columnName ? `_${columnName}` : ''}${
    refTableName ? `_${refTableName}` : ''
  }${refColumnName ? `_${refColumnName}` : ''}`;
}

export class CustomNamingStrategy extends DefaultNamingStrategy {
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[],
  ): string {
    return parseName(
      'fk',
      tableOrName,
      columnNames,
      _referencedTablePath,
      _referencedColumnNames,
    );
  }
  // columnName(
  //   propertyName: string,
  //   customName: string,
  //   embeddedPrefixes: string[],
  // ): string {
  //   return customName ? customName : camelToSnakeCase(propertyName);
  // }
}

export const bigintTransformer: ValueTransformer = {
  to: (entityValue: bigint) => entityValue,
  from: (databaseValue: string | null): bigint | null =>
    databaseValue === null ? null : BigInt(databaseValue),
};

export const getTypeORMConfiguration = ({
  entities,
  type,
  url,
  logging,
}: {
  entities: any;
  type: any;
  url: string;
  logging: any;
}) => {
  const values: Partial<TypeOrmModuleOptions> = {
    type,
    url,
    logging,
    synchronize: false,
    namingStrategy: new CustomNamingStrategy(),
    entities,
    poolSize: 10,
  };
  return values;
};
