import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableUsers1759254943233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "full_name" character varying NOT NULL,
                "phone_number" character varying,
                "address" character varying,
                "role" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `)
    }

}
