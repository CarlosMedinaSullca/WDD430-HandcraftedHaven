import Image from 'next/image';
import { NavBar } from '../components/navBar';

export default function Page() {
    function MyProducts() {
        return <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">My products</button>
    }
    function ListOfProducts() {
        return <div className='h-200 border-2 border-red-600 h-200 overflow-y-scroll scrollbar-hide scrollbar-none'>
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
        return <div className=' border-2 border-indigo-600 h-200 overflow-auto scrollbar-hide scrollbar-none'>
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
    <div className='relative border-2 border-indigo-600'>
        
        <Image
        src="https://cdn.pixabay.com/photo/2015/07/31/15/02/merry-christmas-869221_1280.jpg"
        width={1000}
        height={460}
        className='rounded-xl outline outline-black/5 dark:bg-slate-800 '
        alt='background artisan image'
        />
        <div className='absolute bottom-5 left-10'><Image
        src="https://cdn.pixabay.com/photo/2021/07/02/03/18/culture-6380757_960_720.jpg"
        width={150}
        height={150}
        className=""
        alt=""
        />
        <h1 className='text-black'>Carlos Medina</h1>
        <MyProducts
        />
        </div>
    </div>
    <div className='grid grid-cols-2'>
        <Stories/>
        <ListOfProducts/>
    </div>
    </>
}