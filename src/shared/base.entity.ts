import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

// https://github.com/typeorm/typeorm/issues/873
// bigint -> string

export abstract class BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;
  @Column({
    type: 'timestamp',
  })
  createdAt: Date;
  @Column({
    type: 'timestamp',
  })
  updatedAt: Date;

  // https://typeorm.io/#/listeners-and-subscribers
  @BeforeInsert()
  beforeInsertBaseEntity() {
    // allow user generate custom id and createdAt,updatedAt value
    this.id = this.id ?? uuidv4();
    this.createdAt = this.createdAt ?? new Date();
    this.updatedAt = this.updatedAt ?? new Date();
  }

  @BeforeUpdate()
  beforeUpdateBaseEntity() {
    this.updatedAt = this.updatedAt ?? new Date();
  }
}
