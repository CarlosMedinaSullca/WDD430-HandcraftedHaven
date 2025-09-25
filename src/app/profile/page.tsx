import Image from 'next/image';

export default function Page() {
    function MyProducts() {
        return <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">My products</button>
    }
    return <>
    <div>
        <Image
        src=""
        width={1000}
        height={760}
        className='rounded-xl outline outline-black/5 dark:bg-slate-800'
        alt='background artisan image'
        />
        <div><Image
        src=""
        width={100}
        height={100}
        className=""
        alt=""
        />
        <h1 className='text-black'>Carlos Medina</h1>
        <MyProducts
        />
        </div>
    </div>
    </>
}