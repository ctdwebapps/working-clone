CREATE TABLE "classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_number" text NOT NULL,
	"language_id" integer,
	"company_id" integer,
	"course_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "classes_class_number_unique" UNIQUE("class_number")
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "companies_company_name_unique" UNIQUE("company_name")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_name" text NOT NULL,
	"level" text NOT NULL,
	"course_description" text,
	"course_length_in_hours" integer NOT NULL,
	"language_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"language" text NOT NULL,
	"language_code" text NOT NULL,
	"image_src" text NOT NULL,
	CONSTRAINT "languages_language_unique" UNIQUE("language")
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_name" text NOT NULL,
	"module_type" text NOT NULL,
	"level" text NOT NULL,
	"module_objectives" text NOT NULL,
	"image_src" text NOT NULL,
	"language_id" integer NOT NULL,
	"course_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "modules_module_name_unique" UNIQUE("module_name")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" text PRIMARY KEY NOT NULL,
	"student_name" text NOT NULL,
	"email" text NOT NULL,
	"company_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "students_student_name_unique" UNIQUE("student_name"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;