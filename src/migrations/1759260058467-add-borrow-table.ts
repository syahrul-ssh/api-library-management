import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBorrowTable1759260058467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "borrowings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "book_id" uuid NOT NULL REFERENCES "books" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                "user_id" uuid NOT NULL REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                "borrow_date" timestamp NOT NULL DEFAULT now(),
                "due_date" timestamp NOT NULL,
                "return_date" timestamp,
                "status" character varying NOT NULL,
                "fee" numeric NOT NULL DEFAULT 0,
                "notes" character varying,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                CONSTRAINT "PK_4d9f9c0f9b2b8f1e4d9f9c0f9b2" PRIMARY KEY ("id")
            )
        `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "borrowings"
        `)
    }

}
