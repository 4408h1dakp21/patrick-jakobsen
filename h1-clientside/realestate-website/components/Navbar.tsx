import { Menu, Sheet, Stars, X } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <header>
            <nav className='w-full h-[60px] bg-transparent p-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center gap-2' >
                        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                        <h1 className='text-white text-xl font-bold'>House´s</h1>
                    </div>

                    <div className='flex items-center justify-center gap-2 text-black text-sm bg-white p-2 rounded-full cursor-pointer'>
                        <Menu className='text-black size-4'/>
                        Menu
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
