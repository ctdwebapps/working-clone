import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '../db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding database')

    await db.delete(schema.companies)
    await db.delete(schema.languages)
    await db.delete(schema.classes)
    await db.delete(schema.students)
    await db.delete(schema.courses)
    await db.delete(schema.modules)
    await db.delete(schema.lessons)
    await db.delete(schema.coursesToModules)
    await db.delete(schema.modulesToLessons)

    //INSERT LANGUAGES
    await db.insert(schema.languages).values([
      {
        id: 1,
        language: 'English',
        languageCode: 'en',
        imageSrc: '/en.svg',
      },
      {
        id: 2,
        language: 'Thai',
        languageCode: 'th',
        imageSrc: '/th.svg',
      },
      {
        id: 3,
        language: 'Chinese',
        languageCode: 'zh',
        imageSrc: '/zh.svg',
      },
      {
        id: 4,
        language: 'Japanese',
        languageCode: 'ja',
        imageSrc: '/ja.svg',
      },
      {
        id: 5,
        language: 'French',
        languageCode: 'fr',
        imageSrc: '/fr.svg',
      },
      {
        id: 6,
        language: 'Korean',
        languageCode: 'ko',
        imageSrc: '/ko.svg',
      },

      {
        id: 7,
        language: 'Spanish',
        languageCode: 'es',
        imageSrc: '/es.svg',
      },

      {
        id: 8,
        language: 'German',
        languageCode: 'de',
        imageSrc: '/de.svg',
      },
      {
        id: 9,
        language: 'Italian',
        languageCode: 'it',
        imageSrc: '/it.svg',
      },
    ])

    //INSERT COMPANIES
    await db.insert(schema.companies).values([
      {
        id: 1,
        companyName: 'Frasers',
      },
      {
        id: 2,
        companyName: 'KTB',
      },
      {
        id: 3,
        companyName: 'Siemens',
      },
      {
        id: 4,
        companyName: 'Chubb',
      },
      {
        id: 5,
        companyName: 'Isuzu',
      },
    ])

    //INSERT COURSES
    await db.insert(schema.courses).values([
      {
        id: 1,
        courseName: 'Business Communication',
        level: 'Elementary',
        courseDescription:
          'In this course you will develop skills for polite and effective communication in English with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 1,
      },
      {
        id: 2,
        courseName: 'Introduction to Negotiating in English',
        level: 'Pre-intermediate',
        courseDescription:
          'This course introduces you to the essential skills for effective communication in the business world. Through practical exercises and real-life scenarios, you will develop foundational abilities in writing, speaking, and interacting with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 1,
      },
      {
        id: 3,
        courseName: 'Beginner Thai',
        level: 'Beginner',
        courseDescription:
          'This course introduces you to the essential skills for effective communication in the business world. Through practical exercises and real-life scenarios, you will develop foundational abilities in writing, speaking, and interacting with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 2,
      },
      {
        id: 4,
        courseName: 'Elementary Japanese',
        level: 'Elementary',
        courseDescription:
          'This course introduces you to the essential skills for effective communication in the business world. Through practical exercises and real-life scenarios, you will develop foundational abilities in writing, speaking, and interacting with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 4,
      },
      {
        id: 5,
        courseName: 'Professional Presentations',
        level: 'Upper-intermediate',
        courseDescription:
          'This course introduces you to the essential skills for effective communication in the business world. Through practical exercises and real-life scenarios, you will develop foundational abilities in writing, speaking, and interacting with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 1,
      },
      {
        id: 6,
        courseName: 'German Greetings',
        level: 'Beginner',
        courseDescription:
          'This course introduces you to the essential skills for effective communication in the business world. Through practical exercises and real-life scenarios, you will develop foundational abilities in writing, speaking, and interacting with colleagues and clients.',
        courseLengthInHours: 40,
        languageId: 8,
      },
    ])

    //INSERT CLASSES
    await db.insert(schema.classes).values([
      {
        id: 1,
        classNumber: 'OL1111',
        courseId: 1,
        companyId: 1,
        languageId: 1,
      },
      {
        id: 2,
        classNumber: 'OL2222',
        courseId: 4,
        companyId: 1,
        languageId: 4,
      },
      {
        id: 3,
        classNumber: 'OL3333',
        courseId: 2,
        companyId: 2,
        languageId: 1,
      },
      {
        id: 4,
        classNumber: 'OL4444',
        courseId: 3,
        companyId: 2,
        languageId: 2,
      },
      {
        id: 5,
        classNumber: 'OL5555',
        courseId: 5,
        companyId: 2,
        languageId: 1,
      },
      {
        id: 6,
        classNumber: 'OL6666',
        courseId: 1,
        companyId: 3,
        languageId: 1,
      },
      {
        id: 7,
        classNumber: 'OL7777',
        courseId: 5,
        companyId: 4,
        languageId: 1,
      },
      {
        id: 8,
        classNumber: 'OL8888',
        courseId: 2,
        companyId: 4,
        languageId: 1,
      },
      {
        id: 9,
        classNumber: 'OL9999',
        courseId: 4,
        companyId: 5,
        languageId: 4,
      },
      {
        id: 10,
        classNumber: 'OL1234',
        courseId: 3,
        companyId: 5,
        languageId: 2,
      },
      {
        id: 11,
        classNumber: 'OL2345',
        courseId: 5,
        companyId: 5,
        languageId: 1,
      },
      {
        id: 12,
        classNumber: 'OL3456',
        courseId: 2,
        companyId: 5,
        languageId: 1,
      },
      {
        id: 13,
        classNumber: 'OL1258',
        courseId: 6,
        companyId: 2,
        languageId: 8,
      },
    ])

    //INSERT students
    await db.insert(schema.students).values([
      {
        id: 'user_2p3jBCmXzekcAFKfm8Jgm5hfHfm',
        studentName: 'Richard B',
        email: 'richard@inlinguabangkok.com',
        companyId: 1,
        classId: 1,
      },
    ])

    //INSERT MODULES
    await db.insert(schema.modules).values([
      {
        id: 1,
        moduleName: 'Telephoning',
        moduleType: 'Communication',
        level: 'Elementary',
        moduleObjectives:
          'In this module you will learn how to communicate on the telephone clearly and effectively.',
        imageSrc: '/learn.jpg',
        languageId: 1,
      },
      {
        id: 2,
        moduleName: 'Presentations',
        moduleType: 'Communication',
        level: 'Upper-intermediate',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 3,
        moduleName: 'Using your voice for clarity and impact',
        moduleType: 'Communication',
        level: 'Upper-intermediate',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 4,
        moduleName: 'Meetings',
        moduleType: 'Communication',
        level: 'Pre-intermediate',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 5,
        moduleName: 'Basic Japanese Conversation',
        moduleType: 'Communication',
        level: 'Elementary',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 4,
        imageSrc: '/learn.jpg',
      },
      {
        id: 6,
        moduleName: 'Meeting People in Thai',
        moduleType: 'Communication',
        level: 'Beginner',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 2,
        imageSrc: '/learn.jpg',
      },
      {
        id: 7,
        moduleName: 'Negotiating',
        moduleType: 'Communication',
        level: 'Pre-intermediate',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 8,
        moduleName: 'Meeting New People',
        moduleType: 'Communication',
        level: 'Elementary',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 9,
        moduleName: 'Reporting on Progress',
        moduleType: 'Communication',
        level: 'Elementary',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 10,
        moduleName: 'Numbers & Time',
        moduleType: 'Communication',
        level: 'Elementary',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 1,
        imageSrc: '/learn.jpg',
      },
      {
        id: 11,
        moduleName: 'Thai Food',
        moduleType: 'Communication',
        level: 'Beginner',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 2,
        imageSrc: '/learn.jpg',
      },
      {
        id: 12,
        moduleName: 'กี่โมงแล้ว?',
        moduleType: 'Communication',
        level: 'Beginner',
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        languageId: 2,
        imageSrc: '/learn.jpg',
      },
      {
        id: 13,
        moduleName: 'Guten Tag',
        moduleType: 'Communication',
        languageId: 8,
        moduleObjectives:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo',
        level: 'Beginner',
        imageSrc: '/learn.jpg',
      },
    ])

    //INSERT classes to courses to modules
    await db.insert(schema.coursesToModules).values([
      {
        courseId: 1,
        moduleId: 1,
      },
      {
        courseId: 1,
        moduleId: 8,
      },
      {
        courseId: 1,
        moduleId: 9,
      },
      {
        courseId: 1,
        moduleId: 10,
      },
      {
        courseId: 2,
        moduleId: 2,
      },
      {
        courseId: 6,
        moduleId: 3,
      },
      {
        courseId: 2,
        moduleId: 7,
      },
      {
        courseId: 2,
        moduleId: 5,
      },
      {
        courseId: 2,
        moduleId: 6,
      },
      {
        courseId: 2,
        moduleId: 11,
      },
      {
        courseId: 2,
        moduleId: 12,
      },
      {
        courseId: 2,
        moduleId: 13,
      },
    ])

    console.log('Seeding finished')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database')
  }
}

// call the function
main()
