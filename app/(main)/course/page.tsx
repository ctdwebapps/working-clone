// import { StickyWrapper } from '@/components/stickyWrapper'
import { UserProgress } from '@/components/userProgress'

const Course = () => {
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <UserProgress
        activeCourse={{ title: 'English', imageSrc: '/en.svg' }}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
      />
    </div>
  )
}

export default Course
