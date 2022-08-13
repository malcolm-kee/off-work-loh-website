import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { getPageDetails, getPages, PageDetails } from 'services/notion-api';
import { NotionPage } from '../components/notion-page';

interface Params extends ParsedUrlQuery {
	slug: string;
}

interface PageProps {
	page: PageDetails;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const pages = await getPages();

	return {
		paths: pages.map((page) => ({
			params: {
				slug: page.props.Slug,
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({ params }) => {
	const page = await getPageDetails(params!.slug);

	return {
		props: {
			page,
		},
	};
};

export default function Page({ page: { recordMap } }: PageProps) {
	return <NotionPage recordMap={recordMap} />;
}
