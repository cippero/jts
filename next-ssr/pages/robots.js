import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Robots = (props) => (
    <div>
        <h1>Robots</h1>
        <Link href='/'>
            <button>Home</button>
        </Link>
        <Link href='/about'>
            <button>About</button>
        </Link>
        <ul>
            {props.robots.map(robot => (
                <li key={robot.id}>
                    <Link href={`/robots/${robot.id}`}>
                        <a>{robot.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

Robots.getInitialProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return {
        robots: data
    }
}

export default Robots