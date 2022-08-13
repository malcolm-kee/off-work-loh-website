import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';

export const createFsCache = <Data>(path: string, isJson: boolean) => {
	return {
		write: (data: Data) =>
			fs.writeFile(path, isJson ? JSON.stringify(data) : (data as unknown as string), 'utf-8'),
		read: async (): Promise<Data | undefined> => {
			if (!existsSync(path)) {
				return undefined;
			}

			const fileContent = await fs.readFile(path, 'utf-8');

			return isJson ? JSON.parse(fileContent) : fileContent;
		},
	};
};
