import Link from 'next/link';

const About = () => (
    <div>
        <h1>About</h1>
        <Link href='/'>
            <button>Home</button>
        </Link>
        <Link href='/robots'>
            <button>Robots</button>
        </Link>
    </div>
);

export default About