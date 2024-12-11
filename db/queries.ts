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
