import { FeedWrapper } from '@/components/feed-wrapper'
import { Header } from './header'
import { getStudentCourseAndModules } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Card } from './card'
import { auth } from '@clerk/nextjs/server'

const Course = async () => {
  const { userId } = await auth()

  // If userId is missing, redirect to login page
  if (!userId) {
    redirect('/') // Redirect to login page
  }

  const modulesForStudent = await getStudentCourseAndModules(userId)
  console.log(modulesForStudent)
  const modules = modulesForStudent.class.course.modules
  // console.log(modules)

  // Fallback UI if no course data is found
  if (!modulesForStudent) {
    return <div>No course or modules available</div>
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <FeedWrapper>
        <Header
          flag={modulesForStudent.class.language.imageSrc}
          points={100}
          hearts={5}
        />
        <div className='mt-8'>
          <h1 className='text-3xl'>
            {modulesForStudent?.class.course?.courseName} Course
          </h1>
          <h2 className='text-2xl'>{modulesForStudent?.class.course?.level}</h2>
          <h3 className='text-lg'>
            {modulesForStudent?.class.course?.courseDescription}
          </h3>
          {/* <h2 className='text-2xl mt-5'>Modules:</h2> */}
          {/* {JSON.stringify(modulesForStudent)} */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 max-w-screen-xl mx-auto gap-1'>
            {modules.map((module) => (
              // <p key={module.id}>{module.moduleName}</p>
              <Card
                title={module.moduleName}
                key={module.id}
                image={module.imageSrc} //need to change the images for each module
                progress={50}
                id={module.id}
              />
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default Course
