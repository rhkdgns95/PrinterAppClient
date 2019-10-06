import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 5px;
    padding-left: 5px;
    &::after {  
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -5px;
        height: 85%;
        width: 1.5px;
        border-radius: 50%;
        background-color: #3fc0ca;
    }
`;

const Text = styled.p`
    font-weight: bold;
    padding-bottom: 6px;
    font-size: 14px;
`;
const Data = styled.p`
    color: darkgray;
    font-size: 13px;
    padding-bottom: 3px;
    border-bottom: 1px solid #dfdfdf;
`;

interface IProps {
    text: string;
    value: string;
    className: string;
}
const ConfirmText: React.FC<IProps> = ({
    text,
    value,
    className
}) => (
    <Container className={className}>
        <Text>{ text }</Text>
        <Data>{ value === "" ? "..." : value}</Data>
    </Container>
);

export default ConfirmText;