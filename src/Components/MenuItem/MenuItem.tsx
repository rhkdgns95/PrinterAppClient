import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    // &:hover {
    //     & > .preview {
    //         height: fit-content;
    //         opacity: 1;
    //         & > img {
    //             height: auto;
    //             width: 100%;
    //             max-width: 480px;
    //         }
    //     }
    // }
    color: white;
    text-shadow: 0 2px 2px rgba(0,0,0,.24);
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 0;
    padding-left: 100px;
    padding-right: 85px;
`;
const No = styled.span`
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: white;
    color: white;
    border-radius: 50%;
`;
const Title = styled.h4`
    margin: 0;
    font-size: 14px;
`;
const Date = styled.span`
    justify-self: flex-end;
    margin-left: auto;
    font-size: 11px;
`;
const Preview = styled.div`
    position: relative;
    width: 100%;
    opacity: 0; 
    height: 0;   
    transition: .3s;
    background-color: #e0dee3;
    
    & img {
        display: block;
        width: 0;
        height: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0,.42);
    }
`;
const Photo = styled.img`
    display: block;
    margin: 0 auto;
`;
const PreivewCheck = styled.input`
    position: absolute;
    width: 0;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    &:checked { 
        & ~ div {
            color: #3bedff;
            & span {
                color: #3bedff;
                &.preview-no {
                    // color: #00acb5;
                }
            }
        }
        & ~ label {
            & svg {
                fill: #3bedff;
                transform: rotateZ(-90deg);
            }
        }
        & ~ .preview {
            height: fit-content;
            padding: 20px 0;
            opacity: 1;
            & > img {
                height: auto;
                width: 90%;
                // max-width: 480px;
                max-width: 380px;
            }
        }
    }
`;
const PreviewLabel = styled.label`
    position: absolute;
    z-index: 2;
    top: 25px;
    right: 21px;
    transform: translateY(-50%);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & svg {
        fill: white;
        transition: .3s;
        transform: rotateZ(90deg);
    }
`;
interface IProps {
    className: string;
    no: number;
    title: string;
    date: string;
    imgPath: string;
}

const MenuItem: React.FC<IProps> = ({
    className,
    no,
    title,
    date,
    imgPath
}) => (
    <Container className={className}>
        <PreivewCheck type={"checkbox"} id={`preview__${no}`}/>
        <PreviewLabel htmlFor={`preview__${no}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        </PreviewLabel>
        <Wrapper>
            <No className={"preview-no"}>{ no }</No>
            <Title>{ title }</Title>
            <Date>{ date }</Date>
        </Wrapper>
        <Preview className={"preview"}>
            <Photo src={imgPath}/>
        </Preview>
        
    </Container> 
);

export default MenuItem;