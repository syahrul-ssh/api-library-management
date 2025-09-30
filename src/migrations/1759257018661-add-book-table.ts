import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookTable1759257018661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "isbn" character varying NOT NULL,
                "description" character varying,
                "publisher" character varying NOT NULL,
                "published_year" integer NOT NULL,
                "category" character varying NOT NULL,
                "total_copies" integer NOT NULL DEFAULT 1,
                "available_copies" integer NOT NULL DEFAULT 1,
                "cover_image" character varying,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                CONSTRAINT "PK_0b0e4e403e4087a40f37b7c1bb9" PRIMARY KEY ("id")
            )
        `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "books"
        `)
    }

}
