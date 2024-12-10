'use client'

import { languages } from '@/db/schema'
import { Card } from './card'

type Props = {
  languages: (typeof languages.$inferSelect)[]
  activeCourseId: number
}

export const List = ({ languages, activeCourseId }: Props) => {
  return (
    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
      {languages.map((language) => (
        <Card
          key={language.id}
          id={language.id}
          language={language.language}
          imageSrc={language.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={language.id === activeCourseId}
        />
      ))}
    </div>
  )
}
