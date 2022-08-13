import type { NextPage } from 'next';
import Head from 'next/head';
import { LoginLogoutButton } from '../components/login-logout-button';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Off Work Loh</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="py-12 text-center">
				<h1 className="text-7xl font-bold text-gray-600 mb-12">Off Work Loh</h1>
				<p>
					<LoginLogoutButton />
				</p>
			</main>
		</>
	);
};

export default Home;
