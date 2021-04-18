import { API_METHODS } from "../types/global";

/**
 * @description custom fetch wrapper to handle simple response nuances
 */
export async function _fetch<T>(
	url: string,
	method: API_METHODS = "GET",
	body?: any,
	headers: HeadersInit = {}
): Promise<T> {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(url, {
				body,
				headers: {
					"Content-Type": "application/json",
					...headers
				},
				method
			});
			if (response.ok) {
				resolve(response.json());
			}
			throw new Error(`Error ${response.status}: Could not fetch data`);
		} catch (err) {
			reject(err);
		}
	});
}
