import { CAROUSEL_IMAGE_DIMENSIONS } from "../../../constants";
import { BlockContainer, BlockImageContainer, BlockTitle } from "./styles";

interface CarouselBlockProps {
	title: string;
	url: string;
}

function CarouselBlock(props: CarouselBlockProps) {
	const { title, url } = props;
	const { height, width } = CAROUSEL_IMAGE_DIMENSIONS;
	return (
		<BlockContainer>
			<BlockTitle>{title}</BlockTitle>
			<BlockImageContainer>
				<img alt={title} src={url} width={width} height={height} />
			</BlockImageContainer>
		</BlockContainer>
	);
}

export default CarouselBlock;
