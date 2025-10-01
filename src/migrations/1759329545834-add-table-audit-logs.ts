import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableAuditLogs1759329545834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "audit_logs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                "user_email" character varying,
                "action" character varying NOT NULL,
                "entity" character varying NOT NULL,
                "entity_id" character varying,
                "old_value" json,
                "new_value" json,
                "ip_address" character varying,
                "user_agent" character varying,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                CONSTRAINT "PK_2e9b1b3b1e0b0b6b2b1b3b1e0b0" PRIMARY KEY ("id")
            )
        `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "audit_logs"
        `)
    }

}
