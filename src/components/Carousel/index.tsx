import { useCallback, useEffect, useState } from "react";

import {
	BlockContainer,
	BlockImageContainer,
	BlockTitle,
	CarouselBlocksContainer,
	CarouselContainer,
	CarouselNavigationContainer
} from "./styles";

import { BlockDetail } from "../../types/carousel";
import { pickRandom } from "../../utils/carousel";
import { Button, Icon } from "semantic-ui-react";
import { getCarousel } from "../../api/carousel";

import useLog from "../../hooks/useLog";

interface CarouselBlockProps {
	title: string;
	url: string;
}

const BLOCK_DIMENSIONS = {
	width: 260,
	height: 400
};

function CarouselBlock(props: CarouselBlockProps) {
	const { title, url } = props;
	const { height, width } = BLOCK_DIMENSIONS;
	return (
		<BlockContainer>
			<BlockTitle>{title}</BlockTitle>
			<BlockImageContainer width={width} height={height}>
				<img alt={title} src={url} width={width} height={height} />
			</BlockImageContainer>
		</BlockContainer>
	);
}

// It is assumed there would be at least one image for each block.
const defaultCarousels: BlockDetail[] = [
	{
		title: "First Block",
		images: [
			"https://www.joblo.com/assets/images/joblo/posters/2020/10/archenemyposter.jpg",
			"https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
			"https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/2017-bestposter-split.jpg"
		]
	},
	{
		title: "Second Block",
		images: [
			"https://i.pinimg.com/originals/a2/5b/4a/a25b4ae8e03c4b2ebd06d861a082956a.jpg",
			"https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758",
			"https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg"
		]
	},
	{
		title: "Third Block",
		images: [
			"https://cdn.shopify.com/s/files/1/0969/9128/products/1917_-_Sam_Mendes_-_Hollywood_War_Film_Classic_English_Movie_Poster_8ebc60d6-7299-4918-80db-989d0f188018.jpg?v=1582781093",
			"https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/2017-bestposter-split.jpg",
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf58e44b-e80e-40f3-ab01-8c8650a8aae9/ddb4731-6a5204fc-8245-4fcb-8c87-dd181c081790.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvY2Y1OGU0NGItZTgwZS00MGYzLWFiMDEtOGM4NjUwYThhYWU5XC9kZGI0NzMxLTZhNTIwNGZjLTgyNDUtNGZjYi04Yzg3LWRkMTgxYzA4MTc5MC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MaGazJDZ2em3lUU3aBt_aVGa_C927CTaEnvyUDS2JMk"
		]
	},
	{
		title: "Fourth Block",
		images: [
			"https://etcanada.com/wp-content/uploads/2018/05/dr-seuss-the-grinch-grc_adv1sheet_grinchface_rgb_2_rgb.jpg?quality=80&strip=all&w=605",
			"https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2",
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf58e44b-e80e-40f3-ab01-8c8650a8aae9/ddb4731-6a5204fc-8245-4fcb-8c87-dd181c081790.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvY2Y1OGU0NGItZTgwZS00MGYzLWFiMDEtOGM4NjUwYThhYWU5XC9kZGI0NzMxLTZhNTIwNGZjLTgyNDUtNGZjYi04Yzg3LWRkMTgxYzA4MTc5MC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MaGazJDZ2em3lUU3aBt_aVGa_C927CTaEnvyUDS2JMk"
		]
	},
	{
		title: "Fifth Block",
		images: [
			"https://www.joblo.com/assets/images/joblo/posters/2020/10/archenemyposter.jpg",
			"https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
			"https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/2017-bestposter-split.jpg"
		]
	},
	{
		title: "Sixth Block",
		images: [
			"https://i.pinimg.com/originals/a2/5b/4a/a25b4ae8e03c4b2ebd06d861a082956a.jpg",
			"https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758",
			"https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg"
		]
	},
	{
		title: "Seventh Block",
		images: [
			"https://cdn.shopify.com/s/files/1/0969/9128/products/1917_-_Sam_Mendes_-_Hollywood_War_Film_Classic_English_Movie_Poster_8ebc60d6-7299-4918-80db-989d0f188018.jpg?v=1582781093",
			"https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/2017-bestposter-split.jpg",
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf58e44b-e80e-40f3-ab01-8c8650a8aae9/ddb4731-6a5204fc-8245-4fcb-8c87-dd181c081790.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvY2Y1OGU0NGItZTgwZS00MGYzLWFiMDEtOGM4NjUwYThhYWU5XC9kZGI0NzMxLTZhNTIwNGZjLTgyNDUtNGZjYi04Yzg3LWRkMTgxYzA4MTc5MC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MaGazJDZ2em3lUU3aBt_aVGa_C927CTaEnvyUDS2JMk"
		]
	},
	{
		title: "Eighth Block",
		images: [
			"https://etcanada.com/wp-content/uploads/2018/05/dr-seuss-the-grinch-grc_adv1sheet_grinchface_rgb_2_rgb.jpg?quality=80&strip=all&w=605",
			"https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2",
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf58e44b-e80e-40f3-ab01-8c8650a8aae9/ddb4731-6a5204fc-8245-4fcb-8c87-dd181c081790.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvY2Y1OGU0NGItZTgwZS00MGYzLWFiMDEtOGM4NjUwYThhYWU5XC9kZGI0NzMxLTZhNTIwNGZjLTgyNDUtNGZjYi04Yzg3LWRkMTgxYzA4MTc5MC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MaGazJDZ2em3lUU3aBt_aVGa_C927CTaEnvyUDS2JMk"
		]
	},
];

// Blocks in view
const VISIBLE_BLOCKS = 4;
const OFFSET = 4;

function Carousel() {
    const [carouselItems, setCarouselItems] = useState<BlockDetail[]>(defaultCarousels);
    const [carouselDisplayItems, setCarouselDisplayItems] = useState<BlockDetail[]>(
        // Setting carousel as it is and using pickRandom in the component which would change image on each render for the sake of simplicity
        // We could pre process and set random image url before rendering
        []
    );
    const [currentOffset, setCurrentOffset] = useState<number>(0);

    useLog(currentOffset, "CAROUSEL_OFFSET");
    useLog(carouselDisplayItems, "CAROUSEL_DISPLAY");

	const mapCarouselBlock = ({ title, images }: BlockDetail, idx: number) => {
		return (
			<CarouselBlock key={idx} title={title} url={pickRandom(images)} />
		);
	};

	const slideNext = () => {
        const offset = currentOffset + OFFSET;
		setCurrentOffset(offset);
        setCarouselDisplayItems(takeCarouselItems(offset, VISIBLE_BLOCKS + offset))
	};

	const slidePrev = () => {
		const offset = currentOffset - OFFSET;
		setCurrentOffset(offset);
        setCarouselDisplayItems(takeCarouselItems(offset, VISIBLE_BLOCKS - offset))
	};

    const takeCarouselItems = useCallback((offset: number, n: number) => {
        return carouselItems.slice(offset, n);
    }, [carouselItems]);

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
        setCarouselDisplayItems(defaultCarousels.slice(0, VISIBLE_BLOCKS));
    }, []);

	return (
		<CarouselContainer>
			<CarouselBlocksContainer>
				{carouselDisplayItems.map(mapCarouselBlock)}
			</CarouselBlocksContainer>
			<CarouselNavigationContainer>
				<Button onClick={slidePrev} disabled={currentOffset === 0}>
					<Icon name="arrow left" />
				</Button>
				<Button
					onClick={slideNext}
					disabled={
						currentOffset + VISIBLE_BLOCKS === carouselItems.length
					}
				>
					<Icon name="arrow right" />
				</Button>
			</CarouselNavigationContainer>
		</CarouselContainer>
	);
}

export default Carousel;
