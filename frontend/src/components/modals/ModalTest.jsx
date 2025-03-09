import { XMarkIcon } from '@heroicons/react/24/outline'

export const ModalTest = () => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center backdrop-blur-xs">
        <div className="bg-white w-[50%] px-8 py-6 rounded-lg shadow-xl">
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>This is the modal header</h1>
                <div>
                    <div className='text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200'>
                        <XMarkIcon className='w-8 h-8'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
