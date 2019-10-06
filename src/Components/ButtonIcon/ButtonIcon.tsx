import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.button`
    position: relative;
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    color: white;
    transition: .3s;
    cursor: pointer;
    border-radius: 30px;
    font-size: 12px;
    &:focus {
        outline: none;
    }
    & svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 18px;
        transition: .3s;
        fill: white;
    }
    &.left {
        padding-left: 25px;
        background-color: #d41a59;
        border: 2px solid #d41a59;
    }
    
    &.right {
        padding-right: 25px;
        background-color: #2588f8;
        border: 2px solid #2588f8;
        & svg {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: auto;
            right: 18px;
            transition: .3s;
        }
    }
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0px 3px 6px rgba(0,0,0,.42);
        &.left {
            color: #d41a59;
            background-color: white;
            & svg {
                left: 11px;
                transition-delay: .1s;
                fill: #d41a59;
            }
        }
        &.right {
            color: #2588f8;
            background-color: white;
            & svg {
                transition-delay: .1s;
                right: 11px;
                fill: #2588f8;
            }
        }
    }
    &:not(:nth-of-type(1)) {
        margin-left: 15px;
    }
`;
interface IProps {
    step: "left" | "right"
    value: string;
    onClick: () => void;
}
const ButtonIcon: React.FC<IProps> = ({
    step,
    value,
    onClick
}) => (
    <Container className={step === "left" ? "left" : "right"} onClick={e => {e.preventDefault(); onClick();}}>
        {
            step === "left" ? (
                <React.Fragment>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                    {value}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {value}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                </React.Fragment>
            )
        }
    </Container>
)
export default ButtonIcon;