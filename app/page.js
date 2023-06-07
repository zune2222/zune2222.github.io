import Image from 'next/image'
export default function Home() {
  return (
    <div className='flex flex-col p-3 min-h-screen justify-start items-center'>
		<div className='flex-initial rounded-lg shadow-xl w-full h-96 p-3 mb-3  bg-gradient-to-r from-cyan-500 to-blue-500'>
			asdf
		</div>
		<div className='flex-initial rounded-full shadow-xl w-16 h-16 p-3 mb-3  bg-gradient-to-r from-cyan-500 to-blue-500'>
			<Image src={require("../src/img/airplane.png")} className='w-10 h-10'/>
		</div>
	</div>
  )
}
