import { getLanguages } from '@/db/queries'
import { List } from './list'

const Languages = async () => {
  const languages = await getLanguages()
  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
      <h1 className='text-2xl font-bold text-neutral-700'>
        Select the language you are studying
      </h1>
      {/* {JSON.stringify(languages)} */}
      <List languages={languages} activeCourseId={1} />
    </div>
  )
}

export default Languages
