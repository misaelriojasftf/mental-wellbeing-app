import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1716166990354 implements MigrationInterface {
    name = 'Base1716166990354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."activity_category_enum" AS ENUM('Relaxation', 'Self-Esteem', 'Productivity', 'Physical Health', 'Social Connection')`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "category" "public"."activity_category_enum" NOT NULL DEFAULT 'Relaxation', "duration" integer NOT NULL, "difficulty" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_activities" ("id" SERIAL NOT NULL, "completed" boolean NOT NULL DEFAULT false, "completedAt" TIMESTAMP, "userId" integer, "activityId" integer, CONSTRAINT "PK_00ddd2c4f7ab18bd50d705c3b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_activities" ADD CONSTRAINT "FK_901baf50c84bcbbac97771a2c86" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_activities" ADD CONSTRAINT "FK_a7e235e45a529b2e9dbc736c44f" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_activities" DROP CONSTRAINT "FK_a7e235e45a529b2e9dbc736c44f"`);
        await queryRunner.query(`ALTER TABLE "users_activities" DROP CONSTRAINT "FK_901baf50c84bcbbac97771a2c86"`);
        await queryRunner.query(`DROP TABLE "users_activities"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TYPE "public"."activity_category_enum"`);
    }

}
