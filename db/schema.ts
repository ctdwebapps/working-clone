import { relations } from 'drizzle-orm'
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

//companies relations
export const companiesRelations = relations(companies, ({ many }) => ({
  classes: many(classes),
}))

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  classNumber: text('class_number').notNull().unique(),
  languageId: integer('language_id').references(() => languages.id, {
    onDelete: 'restrict',
  }),
  companyId: integer('company_id').references(() => companies.id, {
    onDelete: 'restrict',
  }),
  createdAt: timestamp('created_at').defaultNow(),
})

//classes relations
export const classesRelations = relations(classes, ({ one, many }) => ({
  language: one(languages, {
    fields: [classes.languageId],
    references: [languages.id],
  }),
  company: one(companies, {
    fields: [classes.companyId],
    references: [companies.id],
  }),
  students: many(students), //a class can have many students
}))

export const students = pgTable('students', {
  id: text('id').primaryKey(),
  studentName: text('student_name').notNull().unique(),
  email: text('email').notNull().unique(),
  companyId: integer('company_id')
    .references(() => companies.id)
    .notNull(),
  classId: integer('class_id')
    .references(() => classes.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const studentsRelations = relations(students, ({ one }) => ({
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}))

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
