import { Workflow } from '@/components/Workflow'

export default function home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-start pt-12 pb-12 md:pt-24 md:pb-24'>
      <Workflow />
    </div>
  )
}
