const Module = () => {
  return <div>Module Page</div>
}

export default Module

///////////////////////////////////////////////////////////////////////////

// import { getModuleById } from '@/db/queries/queries'
// import { notFound } from 'next/navigation'
// import { Card } from './card'

// type Props = {
//   params: { id: number }
// }

// const ModulePage = async ({ params }: Props) => {
//   const moduleData = await getModuleById(params.id)

//   if (!module) {
//     notFound()
//   }

//   return (
//     <div>
//       <h1 className='text-3xl'>{moduleData?.name}</h1>
//       <h3 className='text-lg'>{moduleData?.objectives}</h3>
//       <h2 className='text-2xl mt-5'>Lessons:</h2>

//       <div className='grid lg:grid-cols-3 md:grid-cols-2 max-w-screen-xl mx-auto gap-1'>
//         {moduleData?.lessons.map((lesson) => (
//           <Card
//             title={lesson.name}
//             key={lesson.id}
//             image={'/images/telephone.png'}
//             progress={10}
//             id={lesson.id}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ModulePage

////////////////////////////////////////////////////////////

//This would be a card.tsx component in the same [id] folder
// 'use client'

// import Image from 'next/image'
// import { useRouter } from 'next/navigation'

// type Props = {
//   image: string // URL for the image
//   title: string // Title text
//   progress: number // Progress value (0 to 100)
//   id: number // Unique ID for the module (or dynamic route parameter)
// }

// export const Card = ({ image, title, progress, id }: Props) => {
//   const router = useRouter()

//   const handleCardClick = () => {
//     router.push('/lessons') // Redirects to the dynamic route for the module
//   }

//   return (
//     <div
//       className='max-w-sm shadow-lg rounded-lg overflow-hidden border m-4 cursor-pointer'
//       onClick={handleCardClick}
//     >
//       {/* Image */}
//       <div className='h-40 overflow-hidden flex justify-center'>
//         <Image
//           src={image}
//           alt='Image'
//           width={150}
//           height={100}
//           className='mt-4 '
//         />
//       </div>

//       {/* Title */}
//       <div className='p-4'>
//         <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>

//         {/* Progress Bar */}
//         <div className='mt-4'>
//           <div className='w-full bg-gray-200 rounded-full h-3'>
//             <div
//               className='bg-blue-300 h-3 rounded-full'
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className='text-sm text-gray-600 mt-2'>{progress}% Complete</p>
//         </div>
//       </div>
//     </div>
//   )
// }
