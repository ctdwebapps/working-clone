import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: text('language').notNull().unique(),
  languageCode: text('language_code').notNull(),
  imageSrc: text('image_src').notNull(),
})

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  companyName: text('company_name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  classNumber: text('class_number').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  studentname: text('student_name').notNull().unique(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const studentProgress = pgTable('student_progess', {
  id: serial('id').primaryKey(),
  point: integer('points').notNull().default(0),
  hearts: integer('hearts').notNull().default(5),
  //student id
})

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  courseName: text('course_name').notNull(),
  level: text('level').notNull(),
  courseDescription: text('course_description'),
  courseLengthInHours: integer('course_length_in_hours').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  moduleName: text('module_name').notNull().unique(),
  moduleType: text('module_type').notNull(),
  level: text('level').notNull(),
  moduleObjectives: text('module_objectives').notNull(),
  imageSrc: text('image_src').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  lessonName: text('lesson_name').notNull(),
  lessonObjectives: text('lesson_objectives').notNull(),
  level: text('level').notNull(),
  lessonsContent: jsonb('lesson_content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
