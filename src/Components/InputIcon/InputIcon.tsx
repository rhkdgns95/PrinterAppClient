import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 210px;
`;

const FormInput = styled.input`
    width: 100%;
    border: 1px solid #dfdfdf;
    padding: 12.5px 15px;
    padding-left: 40px;
    color: dimgray;
    transition: .3s;
    border-radius: 3px;
    & ~ svg {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%) rotateY(0deg);
        fill: #dfdfdf;
    }
    &::placeholder {
        padding-left: 2px;
        color: #d1d1d1;
        font-size: 12px;
    }
    &:focus {
        outline: none;
        border: 1px solid #3bcfbf;
        & ~ svg {
            transition: .5s;
            fill: #3bcfbf;
            transform: translateY(-50%) rotateY(360deg);
        }
    }
    &.active {
        transition: .2s;
        & ~ svg {
            fill: #3bcfbf;
        }
    }
`;

interface IProps {
    svgPath: string;
    value: string;
    name: string;
    placeholder: string;
    type?: "text" | "password";
    className?: string;
    onChange: any;
}
const InputIcon: React.FC<IProps> = ({
    svgPath,
    name,
    value,
    placeholder,
    type="text",
    className,
    onChange
}) => (
    <Container className={className}>
        <FormInput type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} className={className}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d={svgPath}/>
        </svg>
    </Container>
);

export default InputIcon;