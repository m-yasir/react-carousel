import { ICarouselBlock } from "@typings/global";
import { BlockContainer, CarouselContainer } from "./styles";

function CarouselBlock() {
    return <BlockContainer />
}

const defaultCarousels: ICarouselBlock[] = [
    {
        title: "First Block",
        images: [
            '../../assets/images/movie-1.jpeg',
            '../../assets/images/movie-2.jpeg',
            '../../assets/images/movie-3.jpeg'
        ]
    },
    {
        title: "Second Block",
        images: [
            '../../assets/images/movie-4.jpeg',
            '../../assets/images/movie-5.jpeg',
            '../../assets/images/movie-6.jpeg'
        ]
    },
    {
        title: "Third Block",
        images: [
            '../../assets/images/movie-1.jpeg',
            '../../assets/images/movie-7.jpeg',
            '../../assets/images/movie-8.jpeg'
        ]
    },
    {
        title: "Fourth Block",
        images: [
            '../../assets/images/movie-2.jpeg',
            '../../assets/images/movie-5.jpeg',
            '../../assets/images/movie-8.jpeg'
        ]
    },
];

function Carousel() {
    return <CarouselContainer>
        {defaultCarousels.map(() => {
            return <CarouselBlock />
        })}
    </CarouselContainer>;
}

export default Carousel;
