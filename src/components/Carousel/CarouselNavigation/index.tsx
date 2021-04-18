import { Button, Icon } from "semantic-ui-react";
import { VISIBLE_BLOCKS } from "../../../constants";
import { CarouselNavigationContainer } from "./styles";

interface CarouselNavigationProps {
	currentOffset: number;
	total: number;
	slideNext: () => void;
	slidePrev: () => void;
}

export function CarouselNavigation(props: CarouselNavigationProps) {
	const { currentOffset, slideNext, slidePrev, total } = props;
	return (
		<CarouselNavigationContainer>
			<Button onClick={slidePrev} disabled={currentOffset === 0}>
				<Icon name="arrow left" />
			</Button>
			<Button
				onClick={slideNext}
				disabled={currentOffset + VISIBLE_BLOCKS >= total}
			>
				<Icon name="arrow right" />
			</Button>
		</CarouselNavigationContainer>
	);
}
