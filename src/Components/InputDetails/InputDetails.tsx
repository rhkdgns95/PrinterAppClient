import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    &.active {
        & input {
            padding-left: 10px;
            padding-top: 21px;
            padding-bottom: 5px;
            font-size: 11px;
        }
        & label {
            font-size: 9px;
            top: 30%;
            color: #a2a2a2;
        }
    }
`;
const Label = styled.label`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 10px;
    margin-bottom: 3px;
    color: #bdbdbd;
    transition: .3s;
    pointer-events: none;
`;
const Input = styled.input`
    border: 1px solid #dfdfdf;
    padding: 12px 7px;
    font-size: 13px;
    width: 100%;
    border-radius: 3px;
    transition: background-color .2s;
    
    &:focus {
        outline: none;
    }
    &:not(:read-only) {
        &:focus {
            border: 1px solid darkgray;
            & ~ label {  
                color: black;
            }
        }
    }
    &:read-only {
        background-color: #f0f0f0;
    }
`
interface IProps {
    className: string;
    title: string;
    value: string;
    name: string;
    type?: string;
    readOnly: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDetails: React.FC<IProps> = ({
    className,
    title,
    name,
    value,
    type="text",
    readOnly,
    onChange
}) => (
    <Container className={value === "" ? className : `${className} active`}>
        <Input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        autoComplete={"off"}
        />
        <Label>
            { title }
        </Label>
    </Container>
);

export default InputDetails;