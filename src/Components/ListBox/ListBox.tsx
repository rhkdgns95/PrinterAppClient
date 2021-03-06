import React from "react";
import styled from "../../Styles/typed-components";
import RecordTable from "../RecordTable";
import FileItem from "../FileItem";
import { useMainContext } from "../../Routes/Main/MainProvider";
import { getTime } from "../../Utils/getTime";
import AutoCheckbox from "../AutoCheckbox";
import SpinnerPolling from "../SpinnerPolling";

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
    min-height: 200px;
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
const TextBar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin: 0 auto;
    width: 87%;
    padding-bottom: 10px;
`;
const SearchText = styled.span`
    color: #5c8b96;
    font-size: 12px;
    margin-right: 5px;
`;
const GetFileImage = (path: string) => {
    
    // rawFile.send(null);
}

const ListBox = () => {
    const { dataGetDocs, loadingGetDocs, autoSearch } = useMainContext();
    // if(loadingGetDocs) {
    //     return <div>Loading...</div>
    // }
    
    // const filePath = "C:/Users/rhkdg/Desktop/project/web/printerApp/server/src/core/src/lib/temp/1111110193126152692214016673154244150.jpg";
    const filePath = "localhost/";
    // C:/Users/rhkdg/Desktop/project/web/printerApp/server/src/core/src/lib/temp/1111110193126152692214016673154244150.jpg
    GetFileImage(filePath);
    // console.log("dataGetDocs: ", dataGetDocs);
    return (
        <Container>
            <Title>File List</Title>
            <TextBar>
                {
                    autoSearch.checked && (
                        <>
                            <SearchText>Searching...</SearchText>
                            <SpinnerPolling />
                        </>
                    )
                }
                <AutoCheckbox label={"auto"}/>
            </TextBar>
            <FileBoxScroll>
                {
                    (loadingGetDocs || !dataGetDocs) ? (
                            <FileBox>
                                
                            </FileBox>
                        ) : (
                        <>
                            <FileBox>
                            {
                                 dataGetDocs && dataGetDocs.GetDocs.docs.map((doc, key) => (
                                    <FileItemExtended
                                        key={key}
                                        no={key}
                                        title={doc.title}
                                        // imgPath={"/tmp.png"}    
                                        accepted={doc.accepted}
                                        imgPath={doc.preview_path}
                                        date={getTime(doc.accepted + "")}
                                    />
                                ))
                            }
                            </FileBox>
                            {
                                dataGetDocs && dataGetDocs.GetDocs.docs.length <= 0 && (
                                    <Empty>
                                        <EmptyText>No file request.</EmptyText>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"/></svg>
                                    </Empty>
                                )
                            }
                        </>
                    )
                }
                
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