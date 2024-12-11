// import { StickyWrapper } from '@/components/stickyWrapper'
import { UserProgress } from '@/components/userProgress'
import { getStudentLanguage } from '@/db/queries'
import { auth } from '@clerk/nextjs/server'

const Course = async () => {
  const { userId } = await auth()

  // console.log(userId)
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <UserProgress
        // activeCourse={{ title: 'English', imageSrc: '/en.svg' }}
        activeCourse={{ title: 'English', imageSrc: '/en.svg' }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    </div>
  )
}

export default Course
