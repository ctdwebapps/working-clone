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

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  classNumber: text('class_number').notNull().unique(),
  languageId: integer('language_id').references(() => languages.id, {
    onDelete: 'cascade',
  }),
  companyId: integer('company_id').references(() => companies.id, {
    onDelete: 'cascade',
  }),
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'cascade', // Prevent deletion if linked to a class
  }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const students = pgTable('students', {
  id: text('id').primaryKey(),
  studentName: text('student_name').notNull().unique(),
  email: text('email').notNull().unique(),
  companyId: integer('company_id')
    .references(() => companies.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  classId: integer('class_id')
    .references(() => classes.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// export const studentProgress = pgTable('student_progess', {
//   id: serial('id').primaryKey(),
//   point: integer('points').notNull().default(0),
//   hearts: integer('hearts').notNull().default(5),
//   studentId: text('student_id')
//     .references(() => students.id)
//     .notNull(),
// })

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  courseName: text('course_name').notNull(),
  level: text('level').notNull(),
  courseDescription: text('course_description'),
  courseLengthInHours: integer('course_length_in_hours').notNull(),
  languageId: integer('language_id')
    .notNull()
    .references(() => languages.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }), // Correct reference to languages table
  createdAt: timestamp('created_at').defaultNow(),
})

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  moduleName: text('module_name').notNull().unique(),
  moduleType: text('module_type').notNull(),
  level: text('level').notNull(),
  moduleObjectives: text('module_objectives').notNull(),
  imageSrc: text('image_src').notNull(),
  languageId: integer('language_id')
    .notNull()
    .references(() => languages.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }), // Each module belongs to one language
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'cascade', // Delete modules if the course is deleted
  }),
  createdAt: timestamp('created_at').defaultNow(),
})

// export const lessons = pgTable('lessons', {
//   id: serial('id').primaryKey(),
//   lessonName: text('lesson_name').notNull(),
//   lessonObjectives: text('lesson_objectives').notNull(),
//   level: text('level').notNull(),
//   lessonsContent: jsonb('lesson_content').notNull(),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// })

//*************RELATIONS ************************ */
//language relations
export const languagesRelations = relations(languages, ({ many }) => ({
  courses: many(courses), // Defines the relation between languages and courses
  //modules: many(modules), // One language can have many modules
  //lessons: many(lessons), // One language can have many lessons
}))

//companies relations
export const companiesRelations = relations(companies, ({ many }) => ({
  classes: many(classes),
  students: many(students),
}))

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
  course: one(courses, {
    fields: [classes.courseId],
    references: [courses.id], // Add this
  }),
  students: many(students), //a class can have many students
}))

export const studentsRelations = relations(students, ({ one }) => ({
  company: one(companies, {
    fields: [students.companyId],
    references: [companies.id],
  }),
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}))

export const coursesRelations = relations(courses, ({ one, many }) => ({
  language: one(languages, {
    fields: [courses.languageId],
    references: [languages.id],
  }),
  modules: many(modules),
}))

// Update `modulesRelations`
export const modulesRelations = relations(modules, ({ one }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
}))
