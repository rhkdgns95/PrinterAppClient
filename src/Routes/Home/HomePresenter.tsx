import React from "react";
import styled from "../../Styles/typed-components";
import Spinner from "../../Components/Spinner";
import DetailsPage from "../../Components/DetailPage";
import Main from "../../Components/Main";
import { GetAllGrouping } from "../../Types/resolvers";
import { Grouping } from "../../Types/types";
import BackgroundEffects from "../../Components/BackgroundEffects";

const Container = styled.div`
    // z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    max-height: 800px;
    max-width: 1100px;
    // background-color: white;
    background: linear-gradient(0deg, rgba(100,127,196,1) 0%, rgba(60,77,121,1) 80%);
    transform: translate(-50%, -50%) scale(.8);
    box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0,.42);
    opacity: 0;
    transition: opacity .7s, transform .3s ease-in-out;
    &.active {
        opacity: 1;
        // top: 50%;
        transform: translate(-50%, -50%) scale(1);
    }
   
`;
const Effect = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    left: 18%;
    top: 4%;
    transition: .7s, opacity .6s;
    opacity: 0;
    transition-timing-function: ease-in-out;
    transition-delay: 1s;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,.14);
    border-radius: 50%;
    // box-shadow: inset 1px 1px 10px rgba(0,0,0,.34);
    
`;
const EffectExtendedTop = styled(Effect)`
    &.active {
        opacity: .4;
        width: 250px;
        height: 250px;
    }
`;
const EffectExtendedMiddle = styled(Effect)`
    top: 94%;
    left: 40%;
    transition-delay: .9s;
    &.active {
        opacity: .4;
        width: 100px;
        height: 100px;
    }
`;
const EffectExtendedBottom = styled(Effect)`
    top: 100%;
    left: 100%;
    transition-delay: 1.1s;
    &.active {
        opacity: .4;
        width: 150px;
        height: 150px;
    }
`;
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
`;
const ScrollScreen = styled.div`
    position: relative;
    width: 100%;
    height: 200%;
    transition: transform .7s ease-in-out;
    transform: translateY(0);
    & > div {
        &:nth-of-type(1) {
            opacity: 1;
        }
        &:nth-of-type(2) {
            opacity: 0;
        }
    }
    &.active {
        transform: translateY(-50%);
        & > div {
            &:nth-of-type(1) {
                opacity: 0;
            }
            &:nth-of-type(2) {
                opacity: 1;
            }
        }
    }
`;
const MainExtended = styled(Main)`
    width: 100%;
    height: 50%;
    transition: opacity .5s;
`;
const DetailsPageExtended = styled(DetailsPage)`
    width: 100%;
    height: 50%;
    transition: opacity .5s;
`;
const SpinnerExtended = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

interface IProps {
    loading: boolean;
    isDetails: boolean;
    currentFile: string;
    getGroupList: GetAllGrouping | null;
    handleUpdateGroup: (updatedGroup: Grouping) => void;
    handleDeleteGroup: (deletedGrouping: Grouping) => void;
}
const HomePresenter: React.FC<IProps> = ({
    loading,
    isDetails,
    currentFile,
    getGroupList,
    handleUpdateGroup,
    handleDeleteGroup
}) => (
    <React.Fragment>
        {
            loading && <SpinnerExtended className={"load"}/>
        }
        {/* <BackgroundEffects/> */}
        <EffectExtendedTop className={loading ? "" : "active"}/>
        <EffectExtendedMiddle className={loading ? "" : "active"}/>
        <EffectExtendedBottom className={loading ? "" : "active"}/>
        <Container className={loading ? "" : "active"}>
            <Wrapper>
                <ScrollScreen className={isDetails ? "active" : ""}>
                    <MainExtended className={loading ? "page-main" : "active"} getGroupList={getGroupList} handleDeleteGroup={handleDeleteGroup} currentFile={currentFile}/>
                    <DetailsPageExtended className={isDetails ? "active" : "page-details"} handleUpdateGroup={handleUpdateGroup}/>
                </ScrollScreen>
            </Wrapper>
            
        </Container>
        
    </React.Fragment>
);

export default HomePresenter;