import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";
import GroupCard from "../GroupCard";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import { Grouping } from "../../Types/types";
import { GetAllGrouping } from "../../Types/resolvers";
import Menubar from "../Menubar";
import BackgroundEffects from "../BackgroundEffects";

const Container = styled.div`
    position: relative;
`;
const CardList = styled.div`
    display: flex;
`;
const TopTitle = styled.h2`
    text-align: center;
    color: #2d62fd;
    font-size: 14px;
    margin: 0;
    padding-top: 30px;
`;
const MiddleTitle = styled.h5`
    text-align: center;
    font-size: 20px;
    color: #7b7b7b;
    margin: 0;
    margin: 15px 0;
`;
const BottomTitle = styled.h3`
    position: relative;
    width: fit-content;
    text-align: center;
    margin: 0 auto;
    font-size: 14px;
    color: #dfdfdf;
    padding: 6px 0;
    overflow: hidden;
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
        animation: ${keyframes => EffectBefore} 5s ease-in-out 2s infinite alternate;
    }
    &::after {
        top: auto;
        left: auto;
        right: 0;
        transform: translateX(100%);
        bottom: -1px;
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
    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: darkgray;
    }
`;
const GroupCardExtended = styled(GroupCard)`
    margin-left: 20px;
`;
const AddGroupButton = styled.button`
    background-color: transparent;
    border: 3px dotted #dfdfdf;
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
        border: 3px dotted #ff9800;
        background-color: #feeee0;
        & svg {
            fill: #ff9800;
            
        }
    }
    
`;
interface IProps {
    className?: string
    getGroupList: GetAllGrouping | null;
    handleDeleteGroup: (deletedGrouping: Grouping) => void;
}
const Main: React.FC<IProps> = ({
    className,
    getGroupList,
    handleDeleteGroup
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
    console.log("THis is Main, groupingList: ", groups);
    return (
        <Container className={className}>
            <Menubar 
                className={selectedCardIndex > -1 ? "active" : ""}
                toggleDetails={toggleDetails}
                onCancelCardIndex={onCancelCardIndex}
                handleDeleteGroup={handleDeleteGroup}
                selectedGrouping={selectedGrouping}
            />
            <BackgroundEffects/>
            <TopTitle>PREVIEW</TopTitle>
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