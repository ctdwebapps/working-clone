import { db } from '@/db/drizzle'
import { companies, students } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getStudents = cache(async () => {
  const data = await db.query.students.findMany()
  return data
})

export const getStudent = cache(async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.id, userId),
  })
  return data
})

export const getStudentLanguage = cache(async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.id, userId),
    with: {
      class: {
        with: {
          language: true,
        },
      },
    },
  })

  return data
})

export const getClassesByCompany = cache(async (companyId: number) => {
  const data = await db.query.companies.findMany({
    where: eq(companies.id, companyId),
    with: {
      classes: true,
    },
  })
  return data
})

//******************************************** */
//Query: show the students course name and list the modules for that course fro clicking
export const getStudentCourseAndModules = cache(async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.id, userId), // Fetch the specific student by ID
    with: {
      class: {
        with: {
          course: {
            with: {
              modules: true, // Include modules related to the course
            },
          },
        },
      },
    },
  })
  return data
  // Extract course and modules
  // const course = data?.class?.course
  // const modules = course?.modules || []
  // return { course, modules }
})

export const tryStudentCourseWithMods = cache(async (userId: string) => {
  const data = await db.query.students.findFirst({
    where: eq(students.id, userId),
    with: {
      class: {
        with: {
          course: {
            with: {
              modules: true,
            },
          },
        },
      },
    },
  })
  return data
})
