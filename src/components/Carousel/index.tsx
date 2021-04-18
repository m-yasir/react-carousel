import { useCallback, useEffect, useState } from "react";

import { CarouselBlocksContainer, CarouselContainer } from "./styles";
import CarouselBlock from "./CarouselBlock";

import { getCarousel } from "../../api/carousel";
import { BlockDetail } from "../../types/carousel";
import { pickRandom } from "../../utils/carousel";

import useLog from "../../hooks/useLog";

import { DEFAULT_CAROUSELS, VISIBLE_BLOCKS } from "../../constants";
import { CarouselNavigation } from "./CarouselNavigation";

function Carousel() {
	const [carouselItems, setCarouselItems] = useState<BlockDetail[]>(
		// Setting carousel as it is and using pickRandom in the component which would change image on each render for the sake of simplicity
		// We could pre process and set random image url before rendering
		DEFAULT_CAROUSELS
	);
	const [carouselDisplayItems, setCarouselDisplayItems] = useState<
		BlockDetail[]
	>([]);
	const [currentOffset, setCurrentOffset] = useState<number>(0);

	useLog(currentOffset, "CAROUSEL_OFFSET");
	useLog(carouselDisplayItems, "CAROUSEL_DISPLAY");

	const mapCarouselBlock = ({ title, images }: BlockDetail, idx: number) => {
		return (
			<CarouselBlock key={idx} title={title} url={pickRandom(images)} />
		);
	};

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

	const takeCarouselItems = useCallback(
		(offset: number, n: number) => {
			return carouselItems.slice(offset, n);
		},
		[carouselItems]
	);

	// TODO: Uncomment if API replaced in api/carousel.ts
	// useEffect(() => {
	// 	function fetchCarousel() {
	// 		getCarousel()
	// 			.then((response) => {
	// 				setCarouselItems(response);
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 			});
	// 	}
	// 	fetchCarousel();
	// }, []);

	// TODO: Do Something when carousel slides, like animation
	useEffect(() => {}, [currentOffset]);
	// Initialise component
	useEffect(() => {
		setCarouselDisplayItems(DEFAULT_CAROUSELS.slice(0, VISIBLE_BLOCKS));
	}, []);

	return (
		<CarouselContainer>
			<CarouselBlocksContainer>
				{carouselDisplayItems.map(mapCarouselBlock)}
			</CarouselBlocksContainer>
			<CarouselNavigation
				currentOffset={currentOffset}
				slideNext={slideNext}
				slidePrev={slidePrev}
				total={carouselItems.length}
			/>
		</CarouselContainer>
	);
}

export default Carousel;
