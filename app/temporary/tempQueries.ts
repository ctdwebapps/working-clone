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
