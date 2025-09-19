import fs from 'node:fs/promises'

export const deleteFile = async (filePath: string): Promise<void> => await fs.unlink(filePath)

export const listFiles = async (path: string): Promise<string[]> => await fs.readdir(path, 'utf-8')

export const readFile = async (uri: string): Promise<string> => await fs.readFile(uri, 'utf-8')

export const writeFile = async (uri: string, contents: string): Promise<void> =>
	await fs.writeFile(uri, contents, 'utf-8')
