import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 30px;
    height: 20px;
    border-radius: 30px;
    background-color: white;
    display: flex;
    // overflow: hidden;
`;

const ToggleInput = styled.input`
    position: absolute;
    top: -100px;
    left: -100px;
    pointer-events: none;
    opacity: 0;
    &:checked {
        & ~ label {
            // background-color: blue;
            border: 1.5px solid #00bcd4;
            & > div {
                left: 15px;
                background-color: #00bcd4;
            }
        }
    }
`;
const Bar = styled.label`
    width: 100%;
    height: 100%;
    border: 1.5px solid #dfdfdf;
    cursor: pointer;
    border-radius: 30px;
    transition: .3s;
`;
const Circle = styled.div`
    position: absolute;
    top: 50%;
    width: 10px;
    height: 10px;
    background-color: #dfdfdf;
    transform: translateY(-50%);
    left: 4px;
    border-radius: 30px;
    transition: .3s;
`;
const Text = styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 110%;
    white-space: nowrap;
    font-size: 10px;
    color: #8b8b8b;

`;
interface IProps {
    text: string;
    className: string;
    onChange: () => {}
}
const ToggleBtn: React.FC<IProps> = ({
    text,
    className,
    onChange
}) => {
    return (
        <Container className={className}>
            <ToggleInput type={"checkbox"} id={"toggle_btn"} onChange={e => onChange()}/>
            <Bar htmlFor={"toggle_btn"}>
                <Circle />
            </Bar>
            <Text>{ text }</Text>
        </Container>
    );
};

export default ToggleBtn;