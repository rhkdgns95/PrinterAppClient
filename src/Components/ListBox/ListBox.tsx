import React from "react";
import styled from "../../Styles/typed-components";
import RecordTable from "../RecordTable";
import FileItem from "../FileItem";

const Container = styled.div`
    background-color: #e8ebef;
`;
const Title = styled.h3`
    text-align: center;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0,0,0,.12);
    margin-top: 40px;
    margin-bottom: 50px;
    color: #2d72dd;
`;
const FileBoxScroll = styled.div`
    width: 87%; 
    margin: 0 auto;
    max-height: 330px;
    padding-right: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 5px;
      }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 20px;
    }   
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #24a7ce;
        border-radius: 20px;
        transition: .3s;
        cursor: pointer;
        &:hover {
            background: #57b2e8;
        }
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:active {
        background: ${props => props.theme.blueColor};
        cursor: pointer;
    }
`;
const FileBox = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
    padding-left: 5px;
`;

const FileItemExtended = styled(FileItem)`
    
`;
const Empty = styled.div`
    display: block;
    margin: 10px;
    position: relative;
    padding: 50px;
    background-color: white;
    color: #aeaeae;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .5;
        fill: #dfdfdf;
    }
`;
const EmptyText = styled.span`
    position: relative;
    z-index: 2;
    text-shadow: 0 1px 1px rgba(0,0,0,.1);
`;
const ListBox = () => {
    return (
        <Container>
            <Title>File List</Title>
            <FileBoxScroll>
                <FileBox>
                    <FileItemExtended 
                        no={1}
                        title={"Tmp File"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={2}
                        title={"Todo"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={3}
                        title={"My List"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={4}
                        title={"Null File"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={5}
                        title={"Test file"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={6}
                        title={"RealTime file"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                    <FileItemExtended 
                        no={7}
                        title={"DataBase file"}
                        imgPath={"https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                        date={"2013-02-11"}
                    />
                </FileBox>
                {/* 파일리스트가 없는경우.... */}
                {/* <Empty>
                    <EmptyText>No file request.</EmptyText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"/></svg>
                </Empty> */}
            </FileBoxScroll>
        </Container>
    )
};

export default ListBox;