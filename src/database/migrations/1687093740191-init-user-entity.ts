import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUserEntity1687093740191 implements MigrationInterface {
    name = 'InitUserEntity1687093740191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`email\` varchar(80) NOT NULL, \`username\` varchar(60) NOT NULL, \`password\` varchar(60) NOT NULL, \`fullname\` varchar(120) NOT NULL, \`dob\` date NULL, \`gender\` enum ('1', '2', '3') NULL DEFAULT '3', \`status\` enum ('0', '1') NULL DEFAULT '0', UNIQUE INDEX \`uq_user_email\` (\`email\`), UNIQUE INDEX \`uq_user_username\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`uq_user_username\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`uq_user_email\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
