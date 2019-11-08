import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    &:nth-of-type(1) {
        margin-top: 5px;
    }
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #dfdfdf;
    background-color: white;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.24);
    transition: .3s;
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 3px 6px rgba(0,0,0,.32);
    }
`;
const Bg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    background-color: black;
`;
const ImgBox = styled.div`
    position: relative;
    z-index: 2;
    width: 40px;
    height: 40px;
    margin-left: 15px;
    &:hover {
        width: 259px;
        padding-bottom: 100%;
        height: 0;
        margin: 0 auto;
        & > div {
            width: 100%;
            height: 100%;
            padding: inherit;
            margin-top: 17px;
            transition: margin .3s;
            // transition: padding-bottom .3s;
        }
        & ~ div {
            &.bg {
                transform: scale(1);
            }
            &:not(.bg) {
                display: none;
                transition: .3s;
                opacity: 0;
            }
        }
    }
`;
const TextBox = styled.div` 
    position: relative;
    padding: 5px;
    flex: 3;
    height: 100%;
    padding: 13px;
    padding-left: 10px;
`;
interface IImg {
    imgPath: string;
}
const Img = styled.div<IImg>`
    width: 100%;
    height: 100%;
    background: url('${props => props.imgPath}');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 6px;
    box-shadow: 0 0.5px 2px rgba(0,0,0,.9);
`;
const No = styled.h5`
    margin: 0;
    color: #838383;
    font-weight: 400;
    font-size: 15px;
`;
const Title = styled.h3`
    margin: 0;
    margin-top: 8px;
    color: #838383;
    font-size: 12px;
    font-weight: 400;
`;
const Date = styled.h3`
    position: absolute;
    bottom: 14px;
    right: 17px;
    display: flex;
    align-items: center;
    margin: 0;
    font-weight: 400;
    font-size: 10px;
    color: #8f8d8d;
    & svg {
        fill: #539ad3;
        margin-right: 6px;
    }
`;
const SelectedButton = styled(Link)`
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
    border: 1px solid #24a7ce;
    padding: 15px;
    border-radius: 50%;
    background-color: #24a7ce;
    transition: .3s;
    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: white;
        transition: .3s;
    }
    &:hover {
        background: white;
        & svg {
            fill: #24a7ce;
        }
    }
`;

interface IProps {
    no: number;
    imgPath: string;
    title: string;
    date: string;
    accepted: number;
}
const FileItem: React.FC<IProps> = ({
    no,
    imgPath,
    title,
    date,
    accepted
}) => {
    const currentFile: string = title;
    return (
        <Container>
            <ImgBox>
                <Img imgPath={imgPath}/>
            </ImgBox>
            <TextBox>
                <No>No. { no }</No>
                <Title>{ title }</Title>
                <Date>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>
                    { date }
                </Date>
                <SelectedButton to={{
                    pathname: "/home",
                    state: {
                        currentFile,
                        accepted
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
                </SelectedButton>
            </TextBox>
            <Bg className={"bg"}/>
        </Container>
    );
};

export default FileItem;