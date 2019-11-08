import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid #2196f3;
    border-radius: 50%;
    animation: ${keyframes => Ripple} linear 2s infinite;
    background: linear-gradient(90deg, rgba(22,158,190,1) 0%, rgba(57,55,179,1) 50%, rgba(22,158,190,1) 100%);
    & > .ripple {
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 15px;
            height: 15px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: #e8ebef;
        }
        & > div {
            position: absolute;
            width: 8px;
            height: 8px;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: #e8ebef;
            &:nth-of-type(1) {
            }
            &:nth-last-of-type(1) {
                top: 100%;
            }
        }
    }
`;
const Wrapper = styled.div``;
const Ripple = keyframes`
    0% {
        transform: rotate(0dege);
    }
    100% {
        transform: rotate(-360deg);
    }
`;
const SpinnerPolling = () => {
    return (
        <Container>
            <Wrapper className="ripple">
                <div></div>
                <div></div>
            </Wrapper>
        </Container>
    )
};

export default SpinnerPolling;