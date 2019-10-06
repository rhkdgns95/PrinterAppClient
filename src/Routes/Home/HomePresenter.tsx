import React from "react";
import styled from "../../Styles/typed-components";
import Spinner from "../../Components/Spinner";
import DetailsPage from "../../Components/DetailPage";
import Main from "../../Components/Main";
import { GetAllGrouping } from "../../Types/resolvers";
import { Grouping } from "../../Types/types";

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    max-height: 800px;
    max-width: 1100px;
    background-color: white;
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
    getGroupList: GetAllGrouping | null;
    handleUpdateGroup: (updatedGroup: Grouping) => void;
    handleDeleteGroup: (deletedGrouping: Grouping) => void;
}
const HomePresenter: React.FC<IProps> = ({
    loading,
    isDetails,
    getGroupList,
    handleUpdateGroup,
    handleDeleteGroup
}) => (
    <React.Fragment>
        {
            loading && <SpinnerExtended className={"load"}/>
        }
        <Container className={loading ? "" : "active"}>
            <Wrapper>
                <ScrollScreen className={isDetails ? "active" : ""}>
                    <MainExtended className={loading ? "page-main" : "active"} getGroupList={getGroupList} handleDeleteGroup={handleDeleteGroup}/>
                    <DetailsPageExtended className={"page-details"} handleUpdateGroup={handleUpdateGroup}/>
                </ScrollScreen>
            </Wrapper>
        </Container>
    </React.Fragment>
);

export default HomePresenter;