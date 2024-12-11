import { getLanguages, getStudentClass } from '@/db/queries'
import { auth } from '@clerk/nextjs/server'
import { getClassesByCompany, getStudent, getStudents } from './tempQueries'

const Temporary = async () => {
  const { userId } = await auth()

  const classes = await getClassesByCompany(1)

  // const languages = await getLanguages()
  // const studentClass = await getStudentClass(userId)
  // // console.log(studentClass.language.languageCode)
  // const activeLanguage = studentClass?.language.languageCode
  // console.log(activeLanguage)

  // const students = await getStudents()
  // const student = await getStudent(userId)

  return (
    <div>
      <h1 className='text-2xl'>Temporary</h1>
      {/* <p className='text-xl'>User Id</p>
      {userId}
      <p className='text-xl'>Languages</p>
      {JSON.stringify(languages)}
      <p className='text-xl'>Students</p>
      {JSON.stringify(students)}
      <p className='text-xl'>One Student</p>
      {JSON.stringify(student)} */}
      {/* <p className='text-xl'>Student class</p>
      {JSON.stringify(studentClass)} */}
      <p className='text-xl'>Class by company</p>
      {JSON.stringify(classes)}
    </div>
  )
}

export default Temporary
