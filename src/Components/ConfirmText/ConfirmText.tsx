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
    display: flex;
    align-items: center;
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
const Job = styled.span`
    color: #c1cccb;
    font-size: 11px;
    font-weight: 400;
    margin-left: auto;
`;
interface IProps {
    text: string;
    value: string;
    className: string;
    job: "PDF" | "SendEmail" | "Redirect" | "RESTFul" | "";
}
const ConfirmText: React.FC<IProps> = ({
    text,
    value,
    className,
    job
}) => (
    <Container className={className}>
        <Text>{ text } <Job> { job }</Job></Text>
        <Data>{ value === "" ? "-" : value}</Data>
    </Container>
);

export default ConfirmText;