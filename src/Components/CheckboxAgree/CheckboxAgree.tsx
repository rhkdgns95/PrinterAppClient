import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    margin: 0 auto;
    width: fit-content;
    margin-top: 15px;
    &::before,
    &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: green;
        transition: background-color .5s, width .3s;
    }
    &::before {
        bottom: auto;
        top: -8px;
        left: auto;
        right: 0;
    }
    &:hover {
        &::before,
        &::after {
            width: 100%;
            background-color: ${props => props.theme.greenColor};
            
        }
    }
`;
const InputChecked = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 0;
    pointer-events: none;
    &:focus {
        outline: none;
    }
    
    &:checked {
        & ~ label {
            color: #009688;
            & svg {
                opacity: 1;
                fill: #009688;
            }
            & div {
                border: 1px solid #009688;
            }
        }
    }
`;
const Label = styled.label`
    position: relative;
    padding-left: 37px;
    font-size: 14px;
    color: #dfdfdf;
    cursor: pointer;
`;
const IconBox = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    display: flex;
    justify-content: center;    
    align-items: center;
    padding: 5px;
    border: 1px solid #dfdfdf;
    & svg {
        transition: .3s;
        opacity: 0;
        fill: #dfdfdf;
    }
`

interface IProps {
    checked: boolean;
    text: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxAgree: React.FC<IProps> = ({
    checked,
    text,
    onChange
}) => (
    <Container>
        <InputChecked type={"checkbox"} onChange={onChange} checked={checked} id={"agree_checked"}/>
        <Label htmlFor={"agree_checked"}>
            <IconBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg>
            </IconBox>
            { text }
        </Label>
    </Container>
);

export default CheckboxAgree;