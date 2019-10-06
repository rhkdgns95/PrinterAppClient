import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`

`;
const InputCheckbox = styled.input`
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
            color: #03bdd4;
            & div {
                border: 1px solid #03bdd4;
                background-color: #03bdd4;
            }
            & svg {
                opacity: 1;
                fill: white;
            }
        }
    }
`;
const Label = styled.label`
    position: relative;
    color: darkgray;
    padding-left: 1px;
    cursor: pointer;
    font-size: 12px;
`;

const LabelIcon = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    background-color: white;
    transition: .3s;
    padding: 3px;
    
    & svg {
        opacity: 0;
    }
`;
interface IProps {
    name: string;
    text: string;
    className: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxText: React.FC<IProps> = ({
    text,
    name,
    className,
    checked,
    onChange,
}) => (
    <Container className={className}>
        <InputCheckbox type={"checkbox"} id={`label_${name}`} onChange={onChange} checked={checked} name={name}/>
        <Label htmlFor={`label_${name}`}>
            <LabelIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z"/></svg>
            </LabelIcon>
            { text }
        </Label>
        
    </Container>
);

export default CheckboxText;