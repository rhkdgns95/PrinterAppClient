import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const Container = styled.div`
    &,
    &::after,
    &::before {
        width: 1em;
        height: 4em;
        background: #ffffff;
        animation: ${keyframes => LoadEffect} 1s infinite ease-in-out;
    }
    &::after,
    &::before {
        content: '';
        position: absolute;
        top: 0;
    }
    &::before {
        left: -1.5em;
        animation-delay: -0.32s;
    }
    &::after {
        left: 1.5em;
        animation-delay: 0.32s;
    }
    color: #ffffff;
    text-indent: -9999em;
    margin: 0 auto;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;
`;
const LoadEffect = keyframes`
    0%,
    80%,
    100% {
        box-shadow: 0 0;
        height: 4em;
    }
    40% {
        box-shadow: 0 -2em;
        height: 5em;
    }
`;
interface IProps {
    className?: string;
}
const Spinner: React.FC<IProps> = ({className}) => <Container className={className} />;
export default Spinner;