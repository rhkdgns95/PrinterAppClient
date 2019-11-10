import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 210px;
    &.textarea {
        padding: 20px 0;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        font-family: 'Source Code Pro', monospace;
        &.active {
            transition: .2s;
            border: 1px solid #00bcd4;
            &.edit {
                border: 1px solid #dfdfdf;
            }
        }
    }
    &.edit {
        width: 70%;
        transition: .3s;
        & > textarea {
            font-size: 12px;
            color: #232323;
        }
        &.no-update {
            & > textarea {
                color: #c3c3c3;
                background-color: #f0f0f0;
            }
        }
    }
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
    &.active {
        transition: .2s;
        border: 1px solid #00bcd4;
        & ~ svg {
            fill: #00bcd4;
        }
    }
    &:focus {
        outline: none;
        border: 1px solid #3f51b5;
        & ~ svg {
            transition: .5s;
            fill: #3f51b5;
            transform: translateY(-50%) rotateY(360deg);
        }
    }
`;
const FormText = styled.textarea`
    width: 100%;
    border: 1px solid #dfdfdf;
    padding: 10px;
    max-height: 80px;
    color: dimgray;
    transition: .3s;
    border-radius: 3px;
    resize: none;
    height: 150px;
    color: #6c6c6c;
    ::-webkit-scrollbar {
        width: 10px;
      }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 20px;
    }   
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #becede;
        border-radius: 20px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:active {
        background: ${props => props.theme.blueColor};
        cursor: pointer;
    }

    &::placeholder {
        padding-left: 2px;
        color: #d1d1d1;
        font-size: 12px;
    }
    &.text-func {
        padding-left: 20px;
        outline: none;
        border: none;
    }
    &:not(.text-func) {
        &.active {
            transition: .2s;
            border: 1px solid #00bcd4;
            &.edit {
                border: 1px solid #dfdfdf;
            }
        }
        &.no-update {
            &:focus {
                border: 1px solid #dfdfdf;
                outline: none;
            }
        }
        &:not(.no-update):focus {
            outline: none;
            border: 1px solid #3f51b5;
            &.edit {
                border: 1px solid darkgray;
            }
        }
    }
    
`;
const FuctionStart = styled.div`
    position: absolute;
    top: 3px;
    left: 3px;
    color: #a4a4a4;
    font-size: 13px;
    background-color: white;
    z-index: 2;
`;
const FunctionEnd = styled.div`
    position: absolute;
    bottom: 3px; 
    left: 3px;
    color: #a4a4a4;
    font-size: 13px;
    background-color: white;
    z-index: 2;
`;
interface IProps {
    svgPath: string;
    value: string;
    name: string;
    placeholder: string;
    type?: "text" | "password" | "textarea";
    className?: string;
    onChange: any;
    isFunction?: boolean;
}
const InputIcon: React.FC<IProps> = ({
    svgPath,
    name,
    value,
    placeholder,
    type="text",
    className,
    onChange,
    isFunction
}) => {
    const funcStart = `(doc) => { `;
    const funcEnd = `};`
    return (
        <Container className={`${className} ${isFunction ? "textarea" : ""}`}>
            {
                type === "textarea" ? (
                    <>
                        { isFunction && <FuctionStart>{ funcStart }</FuctionStart> } 
                        <FormText placeholder={isFunction ? "CODE..." : "DATA..."} onChange={onChange} name={name} value={value} className={`${className!.indexOf("no-update") != -1 ? "no-update" : className } ${isFunction ? "text-func" : ""}`} autoComplete={"off"}/>
                        { isFunction && <FunctionEnd>{ funcEnd }</FunctionEnd>}
                    </>
                ) : (
                    <>
                        <FormInput type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} className={className} autoComplete={"off"}/>        
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d={svgPath}/>
                        </svg>
                    </>
                )
            }
            
            
        </Container>
    );
}

export default InputIcon;