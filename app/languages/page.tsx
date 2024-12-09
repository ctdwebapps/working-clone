import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Languages = () => {
  return (
    <div>
      <h1>Languages</h1>
      <Button>
        <Link href='/course'>English</Link>
      </Button>
    </div>
  )
}

export default Languages
