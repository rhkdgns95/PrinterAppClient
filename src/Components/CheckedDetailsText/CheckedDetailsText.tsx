import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    padding-left: 30px;
    padding-bottom: 5px;
`;
const Icon = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    border: 1.5px solid #dfdfdf;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    & svg {
        transition: .25s;
        opacity: 0;
        fill: #dfdfdf;
    }
`;
const InputChecked = styled.input`
    position: absolute;
    z-index: -1;
    width: 0;
    pointer-events: none;
    opacity: 0;
    &:foucs {
        outline: none;
    }
    &:checked {
        & ~ label {
            color: #868686;
        }
        & ~ div {
            border: 1px solid #868686;
            & svg {
                transform: translateY(0);
                fill: #868686;
                opacity: 1;
            }
        }
    }
    &.active {
        & ~ label {
            cursor: pointer;
            color: black;
        }
        & ~ div {
            border: 1px solid black;
            
        }
        &:checked {
            & ~ label {
                color: #16aea0;
            }
            & ~ div {
                border: 1px solid #16aea0;
                & svg {
                    fill: #16aea0;
                    opacity: 1;
                }
            }
        }
    }
`;
const Label = styled.label`
    position: relative;
    font-size: 13.5px;
    color: #dfdfdf;
`;
interface IProps {
    className,
    name: string;
    text: string;
    checked: boolean;
    onChange: any;
    readOnly: boolean;
}
const CheckedDetailsText: React.FC<IProps> = ({
    className,
    name,
    text,
    checked,
    onChange,
    readOnly
}) => (
    <Container className={className + "_cell"}>
        <InputChecked className={className} name={name} id={`${name}_input_details`} type={"checkbox"} checked={checked} onChange={onChange} readOnly={readOnly}/>
        <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
        </Icon>
        <Label htmlFor={`${name}_input_details`}>
            { text }
        </Label>
    </Container>
);

export default CheckedDetailsText;