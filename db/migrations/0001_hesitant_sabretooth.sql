ALTER TABLE "students" DROP CONSTRAINT "students_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;