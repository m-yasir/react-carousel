import { CarouselBlocksContainer, CarouselContainer } from "./styles";
import CarouselBlock from "./CarouselBlock";

import { BlockDetail } from "../../types/carousel";
import { pickRandom } from "../../utils/carousel";

import useLog from "../../hooks/useLog";

import { CarouselNavigation } from "./CarouselNavigation";
import useCarousel from "../../hooks/useCarousel";

function Carousel() {
	const [
		slideNext,
		slidePrev,
		carouselItems,
		carouselDisplayItems,
		currentOffset
	] = useCarousel();

	useLog(currentOffset, "CAROUSEL_OFFSET");
	useLog(carouselDisplayItems, "CAROUSEL_DISPLAY");

	const mapCarouselBlock = ({ title, images }: BlockDetail, idx: number) => {
		return (
			<CarouselBlock key={idx} title={title} url={pickRandom(images)} />
		);
	};

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
