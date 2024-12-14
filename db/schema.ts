import { relations } from 'drizzle-orm'
import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
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
  createdAt: timestamp('created_at').defaultNow(),
})

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  lessonName: text('lesson_name').notNull(),
  lessonObjectives: text('lesson_objectives').notNull(),
  level: text('level').notNull(),
  languageId: integer('language_id')
    .notNull()
    .references(() => languages.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  lessonsContent: jsonb('lesson_content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

//***************JUNCTION TABLES*********************** */
export const coursesToModules = pgTable(
  'courses_to_modules',
  {
    courseId: integer('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    moduleId: integer('module_id')
      .notNull()
      .references(() => modules.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey(table.courseId, table.moduleId), // Composite primary key
  })
)

// modules to lessons (many to many)
export const modulesToLessons = pgTable(
  'modules_to_lessons',
  {
    moduleId: integer('module_id')
      .notNull()
      .references(() => modules.id, { onDelete: 'cascade' }),
    lessonId: integer('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey(table.moduleId, table.lessonId), // Composite primary key
  })
)

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
  // modules: many(modules),
  classes: many(classes), // One course can belong to many classes
  coursesToModules: many(coursesToModules),
}))

// Update `modulesRelations`
export const modulesRelations = relations(modules, ({ many }) => ({
  coursesToModules: many(coursesToModules), // Relation to the junction table
  lessons: many(modulesToLessons), // Relation to the lessons (if applicable)
}))

// Student Progress Relations
// export const studentProgressRelations = relations(
//   studentProgress,
//   ({ one }) => ({
//     student: one(students, {
//       fields: [studentProgress.studentId],
//       references: [students.id],
//     }),
//     module: one(modules, {
//       fields: [studentProgress.moduleId],
//       references: [modules.id],
//     }),
//     lesson: one(lessons, {
//       fields: [studentProgress.lessonId],
//       references: [lessons.id],
//     }),
//   })
// )

// junction table courses to modules relations
export const coursesToModulesRelations = relations(
  coursesToModules,
  ({ one }) => ({
    course: one(courses, {
      fields: [coursesToModules.courseId],
      references: [courses.id],
    }),
    module: one(modules, {
      fields: [coursesToModules.moduleId],
      references: [modules.id],
    }),
  })
)

// junction table modules to lessons relations
export const modulesToLessonsRelations = relations(
  modulesToLessons,
  ({ one }) => ({
    module: one(modules, {
      fields: [modulesToLessons.moduleId],
      references: [modules.id],
    }),
    lesson: one(lessons, {
      fields: [modulesToLessons.lessonId],
      references: [lessons.id],
    }),
  })
)
