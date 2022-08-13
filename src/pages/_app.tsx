import { ChakraProvider } from '@chakra-ui/react';
import { OverlayContainer } from '@react-aria/overlays';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from 'components/header';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { SSRProvider } from 'react-aria';
import 'react-notion-x/src/styles.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<SSRProvider>
			<SessionProvider session={session}>
				<ChakraProvider>
					<OverlayContainer>
						<QueryClientProvider client={queryClient}>
							<Header />
							<Component {...pageProps} />
							<footer></footer>
						</QueryClientProvider>
					</OverlayContainer>
				</ChakraProvider>
			</SessionProvider>
		</SSRProvider>
	);
}

export default MyApp;
