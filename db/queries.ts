import { cache } from 'react'
import { db } from '@/db/drizzle'
import { students } from './schema'
import { eq } from 'drizzle-orm'

//get languages for /languages page
export const getLanguages = cache(async () => {
  const data = await db.query.languages.findMany()
  return data
})

//get student's language from their class
export const getStudentClass = cache(async (userId: string) => {
  if (!userId) {
    return null
  }
  const studentClass = await db.query.students.findFirst({
    where: eq(students.id, userId),
    with: {
      class: {
        with: {
          language: true,
        },
      },
    },
  })
  // Check if the student is enrolled in a class, and return the class or null if not enrolled
  if (!studentClass || !studentClass.class) {
    return null
  }

  return studentClass.class // Return the class associated with the student
})
