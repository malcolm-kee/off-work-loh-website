import { ChakraProvider } from '@chakra-ui/react';
import { OverlayContainer } from '@react-aria/overlays';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { SSRProvider } from 'react-aria';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<SSRProvider>
			<SessionProvider session={session}>
				<ChakraProvider>
					<OverlayContainer>
						<QueryClientProvider client={queryClient}>
							<Component {...pageProps} />
						</QueryClientProvider>
					</OverlayContainer>
				</ChakraProvider>
			</SessionProvider>
		</SSRProvider>
	);
}

export default MyApp;
