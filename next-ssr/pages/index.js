import Link from 'next/link';
import Image from '../components/image';

const Index = () => (
    <div>
        <h1>SSR Magician</h1>
        <Link href='/about'>
            <button>About</button>
        </Link>
        <Link href='/robots'>
            <button>Robots</button>
        </Link>
        {/* <a href="/about">About</a> */}
        <Image />
    </div>
);

export default Index