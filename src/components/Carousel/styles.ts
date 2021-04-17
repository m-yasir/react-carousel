import styled from "styled-components";

export const CarouselBlocksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 5%;
`;

export const BlockContainer = styled.div``;

export const BlockTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`;

export const BlockImageContainer = styled.div<{ width: number, height: number }>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: #e8e8e8;
    border: 2px solid #c9c9c9;
`;

export const CarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CarouselNavigationContainer = styled.div`
    margin: 50px;
    display: flex;
    justify-content: center;
`;
