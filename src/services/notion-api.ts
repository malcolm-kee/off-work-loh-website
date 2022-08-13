import { Client } from '@notionhq/client';
import {
	PageObjectResponse,
	PropertyItemObjectResponse,
	RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { createFsCache } from 'lib/fs-cache';
import * as path from 'node:path';
import * as process from 'node:process';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

const pageCache = createFsCache<PageData[]>(path.join(process.cwd(), '.db.notion.pages'), true);

export const notionClient = new Client({
	auth: process.env.NOTION_API_KEY,
});

const thirdPatyNotion = new NotionAPI({
	activeUser: process.env.NOTION_ACTIVE_USER,
	authToken: process.env.NOTION_TOKEN_V2,
});

const extractRichTextContent = (richText: RichTextItemResponse) =>
	richText.type === 'text' ? richText.text.content : '';

const mapPropResult = (propResult: PropertyItemObjectResponse) => {
	if (propResult.type === 'title') {
		return extractRichTextContent(propResult.title);
	}

	if (propResult.type === 'rich_text') {
		return extractRichTextContent(propResult.rich_text);
	}
};

export interface PageProperties {
	Slug: string;
	Label: string;
	Keywords: string;
	Name: string;
}

export interface PageData {
	id: string;
	props: PageProperties;
}

export const getPages = async (): Promise<Array<PageData>> => {
	const cachedPages = await pageCache.read();

	if (cachedPages && cachedPages.length > 0) {
		return cachedPages;
	}

	const { results } = await notionClient.databases.query({
		database_id: '370d0547898d40df864b9ea8097f2c33',
	});

	const pages = await Promise.all(
		(results as Array<PageObjectResponse>).map(async (row) => {
			const props = await Promise.all(
				Object.entries(row.properties).map(async ([prop, { id }]) => {
					const propResult = await notionClient.pages.properties.retrieve({
						page_id: row.id,
						property_id: id,
					});

					const result = propResult.object === 'list' ? propResult.results[0] : undefined;
					const value = result ? mapPropResult(result) : undefined;

					return {
						prop,
						value,
					};
				})
			);

			const propsObject = props.reduce(
				(result, { prop, value }) => ({
					...result,
					[prop]: value,
				}),
				{}
			);

			return {
				id: row.id,
				props: propsObject as PageProperties,
			};
		})
	);

	await pageCache.write(pages);

	return pages;
};

export interface PageDetails {
	recordMap: ExtendedRecordMap;
}

export const getPageDetails = async (slug: string): Promise<PageDetails> => {
	const pages = (await pageCache.read()) || [];

	const data = pages.find((page) => page.props.Slug === slug);

	const recordMap = await thirdPatyNotion.getPage(data!.id);

	return {
		recordMap,
	};
};
