import { useCallback, useEffect, useState } from "react";
import { getCarousel } from "../api/carousel";
import { DEFAULT_CAROUSELS, VISIBLE_BLOCKS } from "../constants";
import { BlockDetail } from "../types/carousel";
import { take } from "../utils/carousel";

type UseCarouselReturn = [() => void, () => void, BlockDetail[], BlockDetail[], number];

/**
 * @description Contains logic to allow "Carousel" component to operate the carousel.
 */
function useCarousel(): UseCarouselReturn {
    const [carouselItems, setCarouselItems] = useState<BlockDetail[]>(
		// Setting carousel as it is and using pickRandom in the component which would change image on each render for the sake of simplicity
		// We could pre process and set random image url before rendering
		DEFAULT_CAROUSELS
	);
	const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [carouselDisplayItems, setCarouselDisplayItems] = useState<BlockDetail[]>([]);
    const takeCarouselItems = useCallback(
		(offset: number, n: number) => {
			return take(carouselItems, offset, n);
		},
		[carouselItems]
	);

    // Handles Navigation for sliding carousel forward
	const slideNext = () => {
		const offset = currentOffset + VISIBLE_BLOCKS;
		const next = offset + VISIBLE_BLOCKS;
		let items = takeCarouselItems(offset, next);
		// copy items ahead if there are not enough items in array
		// NOTE: The next buttons will be disabled after this.
		if (next > carouselItems.length) {
			items = items.concat(
				takeCarouselItems(0, next - carouselItems.length)
			);
		}
		setCurrentOffset(offset);
		setCarouselDisplayItems(items);
	};

	// Handles Navigation for sliding carousel backwards
	const slidePrev = () => {
		const offset = currentOffset - VISIBLE_BLOCKS;
		setCarouselDisplayItems(takeCarouselItems(offset, currentOffset));
		setCurrentOffset(offset);
	};
    
    // TODO: Uncomment if API replaced in api/carousel.ts
	// useEffect(() => {
	// 	function fetchCarousel() {
	// 		getCarousel()
	// 			.then((response) => {
	// 				setCarouselItems(response);
	// 				setCarouselDisplayItems(take(response, 0, VISIBLE_BLOCKS))
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 			});
	// 	}
	// 	fetchCarousel();
	// }, []);
    
    // Set Initial display Items
    useEffect(() => {
		setCarouselDisplayItems(take(DEFAULT_CAROUSELS, 0, VISIBLE_BLOCKS));
	}, []);
    
    return [slideNext, slidePrev, carouselItems, carouselDisplayItems, currentOffset]
}

export default useCarousel;
