import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image src='/inlingua.svg' alt='mascot' width={40} height={40} />
          <h1 className='text-2xl font-extrabold tracking-wide'>inLingo</h1>
        </div>
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal' forceRedirectUrl='/languages'>
              {/* <SignInButton mode='modal'> */}
              <Button size='lg' variant='ghost'>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}
