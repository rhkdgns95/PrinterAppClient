import React from "react";
import styled from "../../Styles/typed-components";
import { useMainContext } from "../../Routes/Main/MainProvider";

const Container = styled.div`
    justify-self: flex-end;
    margin-left: auto;
`;

const CheckInput = styled.input`
    position: absolute;
    top: -100px;
    left: -100px
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
    z-index: -99;
    &:active,
    &:focus {
        outline: none;
        border: 0;
    }
    &:checked {
        & ~ label {
            color: #3988a6;
            & > div {
                border: 1px solid #3988a6;
                & svg {
                    opacity: 1;
                    fill: #3988a6;
                }
            }
            & svg {
                opacity: 1;
            }
        }
    }
`;

const Label = styled.label`
    width: fit-content;
    margin-left: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #939393;
    font-size: 13px;
    transition: .3s;
    justify-content: flex-end;
`;
const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid #939393;
    border-radius: 3px;
    transition: .3s;
    & svg {
        transition: .3s;
        opacity: 0;
        fill: #939393;
    }
`;
interface IProps {
    label: string;
}
const AutoCheckbox: React.FC<IProps> = ({
    label
}) => {
    const { autoSearch } = useMainContext();
    return (
        <Container>
            <CheckInput type={"checkbox"} id={"input_auto"} {...autoSearch}  />
            <Label htmlFor={"input_auto"}>
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                </Icon>
                { label }
            </Label>
            
        </Container>
    )
};

export default AutoCheckbox;