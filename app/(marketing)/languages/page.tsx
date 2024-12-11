import { getLanguages, getStudentLanguage } from '@/db/queries'
import { List } from './list'
import { auth } from '@clerk/nextjs/server'
import { Loader2 } from 'lucide-react'

const Languages = async () => {
  const { userId } = await auth()

  // Check if the userId is null or undefined, and handle the case accordingly
  if (!userId) {
    return <div>Error: You must be logged in to view this page.</div>
  }

  // Fetch all languages and student class in parallel
  const [languages, studentClass] = await Promise.all([
    getLanguages(),
    getStudentLanguage(userId), // Fetch student class to determine active language
  ])

  const activeLanguage = studentClass?.class.language.languageCode

  // Handle empty states and loading
  if (!languages?.length) {
    return (
      <div className='h-full flex items-center justify-center text-neutral-600 text-center'>
        <p>No languages available. Please contact your administrator.</p>
      </div>
    )
  }

  if (!studentClass) {
    return (
      <div className='h-full flex items-center justify-center text-neutral-600 text-center'>
        <p>
          You are not assigned to a class yet. Please inform your teacher or
          course organizer.
        </p>
      </div>
    )
  }

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto lg:min-w-[800px]'>
      {/* Loading state */}
      {!languages && (
        <div className='flex items-center justify-center h-full'>
          <Loader2 className='animate-spin text-neutral-500' />
          <span className='ml-2'>Loading languages...</span>
        </div>
      )}

      <h1 className='text-2xl font-bold mt-10 text-neutral-700'>
        Choose a language that you&apos;re currently studying
      </h1>
      <List languages={languages} activeLanguage={activeLanguage} />
    </div>
  )
}

export default Languages
