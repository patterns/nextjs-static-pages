import Link from 'next/link';


export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Page changes in progress...</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Users</Link></p>
                <p><Link href="/courses">Manage Courses</Link></p>
            </div>
        </div>
    );
}
