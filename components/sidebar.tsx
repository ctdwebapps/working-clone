import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarItem } from '@/components/sidebarItem'
import { ClerkLoading, ClerkLoaded, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className
      )}
    >
      <Link href='/course'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image src='/inlingua.svg' height={40} width={40} alt='inlingua' />
          <h1 className='text-2xl font-extrabold tracking-wide'>inLingo</h1>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem label='My Courses' href='/course' iconSrc='/course.svg' />
        <SidebarItem
          label='Leaderboard'
          href='/leaderboard'
          iconSrc='/leaderboard.svg'
        />
        <SidebarItem
          label='My Performance'
          href='/performance'
          iconSrc='/performance.svg'
        />
        <SidebarItem label='Vocab Builder' href='/vocab' iconSrc='/vocab.svg' />
        <SidebarItem label='Learning Tips' href='/tips' iconSrc='/tips.svg' />
      </div>
      <div className='p-4'>
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: 'initial' } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  )
}
