import { cache } from 'react'
import { db } from '@/db/drizzle'

//get languages for /languages page
export const getLanguages = cache(async () => {
  const data = await db.query.languages.findMany()
  return data
})
