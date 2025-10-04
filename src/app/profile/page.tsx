import Image from 'next/image';
import { NavBar } from '../components/navBar';

export default function Page() {
    function MyProducts() {
        return <button className="absolute bottom-5 right-10 bg-green-500 p-2 rounded-lg border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">My products</button>
    }
    // Removed duplicate ListOfProducts function
    // Removed duplicate Stories function
    function ListOfProducts() {
        return <div className='border-2 border-red-600 h-[50rem] overflow-y-scroll no-scrollbar'>
            <ul className='grid gap-6'>
                <li>
                    <p>name of product</p>
                    <Image
                        src="https://cdn.pixabay.com/photo/2020/03/13/04/06/handmade-4926870_960_720.jpg"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                    
                    />
                </li>
                <li>
                    <p className='text-black'>name of product</p>
                    <Image
                        src="https://cdn.pixabay.com/photo/2020/03/13/04/06/handmade-4926870_960_720.jpg"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                    
                    />
                </li>
                <li>
                    <p className='text-black'>name of product</p>
                    <Image
                        src="https://cdn.pixabay.com/photo/2020/03/13/04/06/handmade-4926870_960_720.jpg"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                    
                    />
                </li>

            </ul>
        </div>
    }
    function Stories() {
        return <div className='border-2 border-indigo-600 h-[50rem] overflow-y-auto no-scrollbar'>
            <ul className='grid gap-6 m-2'>
                <li className='border-2 border-red-400 p-2'>
                    <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur sit provident totam voluptates vitae accusantium ab, aperiam quia earum ex qui pariatur, distinctio exercitationem odio. Asperiores nobis velit corporis!</p>
                        <Image
                        src="https://cdn.pixabay.com/photo/2015/08/20/21/52/straw-basket-898203_1280.jpg"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                        />
                </li>
                <li>
                        <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur sit provident totam voluptates vitae accusantium ab, aperiam quia earum ex qui pariatur, distinctio exercitationem odio. Asperiores nobis velit corporis!</p>
                        <Image
                        src="https://pixabay.com/photos/straw-basket-wicker-basket-898203/"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                        />
                </li>
                <li>
                    <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur sit provident totam voluptates vitae accusantium ab, aperiam quia earum ex qui pariatur, distinctio exercitationem odio. Asperiores nobis velit corporis!</p>
                        <Image
                        src="https://pixabay.com/photos/straw-basket-wicker-basket-898203/"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                        />
                </li>
                <li>
                    <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur sit provident totam voluptates vitae accusantium ab, aperiam quia earum ex qui pariatur, distinctio exercitationem odio. Asperiores nobis velit corporis!</p>
                        <Image
                        src="https://pixabay.com/photos/straw-basket-wicker-basket-898203/"
                        width={500}
                        height={500}
                        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
                        alt='background artisan image'
                        />
                </li>
            </ul>
            
        </div>
    }
    return <>
    <NavBar/>
    <div className='relative bg-[url("https://cdn.pixabay.com/photo/2022/04/21/14/31/pottery-7147634_960_720.jpg")] h-[30rem] w-full bg-cover bg-center'>
        <div className='absolute bottom-10 left-10 flex flex-col items-center'>
            <Image
        src="https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_1280.jpg"
        width={200}
        height={200}
        className=""
        alt="profile picture"
        />
        <h1 className='text-black'>Carlos Medina</h1>
        </div>
        <MyProducts
        />
    </div>
    <div className='grid grid-cols-2'>
        <Stories/>
        <ListOfProducts/>
    </div>
   
    </>
}