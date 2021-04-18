import { BlockDetail } from "../types/carousel";
import { _fetch } from "../utils/global";

/**
 * @description returns carousel data from the endpoint as in exercise description.
 */
export async function getCarousel() {
	return _fetch<BlockDetail[]>("https://jsonplaceholder.typicode.com/photos");
}
