import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";
import GroupCard from "../GroupCard";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import { Grouping } from "../../Types/types";
import { GetAllGrouping } from "../../Types/resolvers";
import Menubar from "../Menubar";
import { Link } from "react-router-dom";

const Container = styled.div`
    position: relative;  
`;
const CardList = styled.div`
    display: flex;
`;
const TopTitle = styled.h2`
    text-align: center;
    color: white;
    font-size: 14px;
    margin: 0;
    padding-top: 68px;
    text-shadow: 0 2px 4px rgba(0,0,0,.42);
`;
const MiddleTitle = styled.h5`
    text-align: center;
    font-size: 20px;
    color: #b8a4c9;
    color: #a6d3fa;
    margin: 0;
    margin: 15px 0;
    text-shadow: 0 2px 4px rgba(0,0,0,.32);
`;
const BottomTitle = styled.h3`
    position: relative;
    width: fit-content;
    text-align: center;
    margin: 0 auto;
    font-size: 14px;
    color: white;
    padding: 6px 0;
    overflow: hidden;
    text-shadow: 0 2px 4px rgba(0,0,0,.32);
    &::after,
    &::before {
        content: "";
        position: absolute;
        z-index: 1;
        width: 30px;
        top: -1px;
        left: 0;
        transform: translateX(-100%);
        height: 3px;
        background-color: rgba(75,250,155,.4);
        box-shadow: 0 2px 4px rgba(0,250,250,.42);
        animation: ${keyframes => EffectBefore} 5s ease-in-out 2s infinite alternate;
    }
    &::after {
        top: auto;
        left: auto;
        right: 0;
        transform: translateX(100%);
        bottom: -1px;
        box-shadow: 0 -2px 4px rgba(0,250,250,.42);
        animation: ${keyframes => EffectAfter} 5s ease-in-out 2s infinite alternate;
    }
`;
const EffectBefore = keyframes`
    0% { 
        left: 0;
        transform: translateX(-100%);
        opacity: 1;
    } 
    50% {
        opacity: 0;
    }
    100% { 
        left: 100%;
        transform: translateX(0);
        opacity: 1;
    }
`;
const EffectAfter = keyframes`
    0% { 
        right: 0;
        transform: translateX(100%);
        opacity: 0;
    } 
    50% {
        opacity: 1;
    }
    100% { 
        opacity: 0;
        right: 100%;
        transform: translateX(0);
    }
`;
const BackgroundEffect = keyframes`
    0% {
        left: 0;
        transform: translateX(-100%);
        background-color: rgba(250,250,0,.24);
    }
    50% {    
        // left: 100%;
        background-color: rgba(250,250,250,0);
    }
    100% {
        left: 100%;
        transform: translateX(0);
        background-color: rgba(250,250,0,.24);
    }
`;
const BottomTitleWrapper = styled.span`
    position: relative;
    z-index: 2;
`;
const MainTitle = styled.h5`
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 50px auto 80px auto;
    font-size: 16px;
    color: #5fffa6;
    text-shadow: 0 2px 4px rgba(0,0,0,.32);
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -9px;
        width: 50%;
        height: 1px;
        border-radius: 50%;
        background-color: #5fffa6;
    }
`;
const GroupCardExtended = styled(GroupCard)`
    margin-left: 20px;
`;
const AddGroupButton = styled.button`
    background-color: transparent;
    border: 3px solid rgba(250,250,250,.06);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    width: 180px;
    height: 180px;
    margin-left: 20px;
    transition: .2s;
    cursor: pointer;
    & svg {
        fill: #dfdfdf;
        transition: .2s;
    }
    &:focus {
        outline: none;
    }
    &:hover {
        border: 3px solid #5fffa6;
        background-color: #3d5697;
        & svg {
            // fill: #ff9800;
            fill: #5fffa6;            
        }
    }  
`;
const FileBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;    
    display: flex;
    width: 100%;
    align-items: center;
    padding: 7px 12.5px;
    background-color: rgba(0,20,30,.22);
`;
const FileIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    & svg {
        fill: white;
    }
    &.link-main {
        justify-self: flex-end;
        margin-left: auto;
        &:hover {
            & svg {
                fill: #3ed5ce;
            }
        }
    }
`;
const FileTitle = styled.span`
    font-size: 12px;
    padding-bottom: 3px;
    color: white;
`;
interface IProps {
    className?: string;
    currentFile: string;
    getGroupList: GetAllGrouping | null;
    handleDeleteGroup: (deletedGrouping: Grouping) => void;
    handleStartForGrouping: () => any;
}
const Main: React.FC<IProps> = ({
    currentFile,
    className,
    getGroupList,
    handleDeleteGroup,
    handleStartForGrouping
}) => {
    const { 
        toggleCreateModal, 
        handleClickCardIndex, 
        selectedCardIndex, 
        toggleDetails,
        onCancelCardIndex,
        handleSelectedGrouping,
        handleTmpGrouping,
        selectedGrouping
    } = useHomeContext();
    let groups: Grouping[] | null;
    if(getGroupList) {
        groups = getGroupList.groups.groupList;
    } else {
        groups = null;
    }
    return (
        <Container className={className}>
            <FileBox>
                <FileIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 9.185l7 6.514v6.301h-14v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h18v-9.172l-9-8.375zm2 14.547h-4v-6h4v6zm10-8.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"/></svg>
                </FileIcon>
                <FileIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                </FileIcon>
                <FileTitle>{ currentFile }</FileTitle>
                <FileIcon className={"link-main"}>
                    <Link to={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 2v20h14v-2h-12v-16h12v-2h-14zm18 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/></svg>
                    </Link>
                </FileIcon>
            </FileBox>
            <Menubar 
                className={selectedCardIndex > -1 ? "active" : ""}
                toggleDetails={toggleDetails}
                handleStartForGrouping={handleStartForGrouping}
                onCancelCardIndex={onCancelCardIndex}
                handleDeleteGroup={handleDeleteGroup}
                selectedGrouping={selectedGrouping}
            />
            <TopTitle>PREVIEW </TopTitle>
            <MiddleTitle>Choose your desired Grouping</MiddleTitle>
            <BottomTitle>
                <BottomTitleWrapper>Create a Grouping for the Printer Middleware</BottomTitleWrapper>
            </BottomTitle>
            <MainTitle>GROUPING</MainTitle>
            <CardList>
                {
                    groups && (
                            groups.map((group, key) => {
                                return (
                                    <GroupCardExtended 
                                        className={key === selectedCardIndex ? "active" : "card"}
                                        groupName={group.groupName}
                                        id={key}
                                        key={key}
                                        handleClickCardIndex={ (e) => { handleClickCardIndex(key); handleSelectedGrouping(group); handleTmpGrouping(group); }}
                                    />
                                )
                            }
                        )     
                    )
                }
                {
                    !groups && (
                        <div>그룹핑 없음 (디자인 수정예정..)</div>
                    )
                }
                
                <AddGroupButton onClick={e => {e.preventDefault(); toggleCreateModal();}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                </AddGroupButton>
            </CardList>
            
        </Container>
    )
};

export default Main;