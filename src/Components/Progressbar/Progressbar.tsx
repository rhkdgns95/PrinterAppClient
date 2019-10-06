import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #b2c6c8;
    transition: .3s;
    &.active {
        & > div {
            background-color: #21d2ae;
            & > .progress-name {
                font-weight: bold;
                color: #21d2ae;
            }
        }
    }
    &.wait {
        & > div {
            background-color: transparent;
        }
    }
    &.next {
        & > div {
            color: #8c8c8c;
            background-color: white;
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    border-radius: 50%;
    height: 80%;
    background-color: transparent;
    color: white;
    transition: .3s;
`;
const Name = styled.div`
    position: absolute;
    bottom: -22px;
    left: 50%;
    font-size: 11px;
    color: #959090;
    transition: .3s;
    transform: translateX(-50%);
`;
interface IProps {
    num: number;
    name: string;
    className: string;
}

const Progressbar: React.FC<IProps> = ({
    num,
    name,
    className
}) => (
    <Container className={className}>
        <Wrapper>
            { num }
            <Name className={"progress-name"}>{name}</Name>
        </Wrapper>
    </Container>
);

export default Progressbar;