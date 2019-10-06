import React from "react";
import styled from "../../Styles/typed-components";
import GroupCard from "../GroupCard";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import { Grouping } from "../../Types/types";
import { GetAllGrouping } from "../../Types/resolvers";
import Menubar from "../Menubar";

const Container = styled.div`
    position: relative;
`;
const CardList = styled.div`
    display: flex;
`;
const TopTitle = styled.h2`
    text-align: center;
    color: #8b8b8b;
    margin: 0;
    padding: 30px 0;
`;
const MiddleTitle = styled.h5`
    text-align: center;
`;
const BottomTitle = styled.h3`
    text-align: center;
    color: #8b8b8b;
    padding: 30px 0;
    margin: 0;
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
            <TopTitle>Printer Middel Ware</TopTitle>
            <MiddleTitle>Middle Title</MiddleTitle>
            <BottomTitle>Bottom Title</BottomTitle>
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