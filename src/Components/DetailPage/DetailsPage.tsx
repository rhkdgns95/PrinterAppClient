import React from "react";
import styled from "../../Styles/typed-components";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import CheckboxDetails from "../CheckboxDetails";
import InputDetails from "../InputDetails/InputDetails";
import JobList from "../JobList";
import { Grouping } from "../../Types/types";
import EditButton from "../EditButton";
import CheckedDetailsText from "../CheckedDetailsText";
import { toast } from "react-toastify";

const Container = styled.div`
    position: relative;
    padding: 30px;
`;
const Header = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    padding-left: 80px;
`;
const HeaderWrapper = styled.div`
    
`;
const HeaderTitle = styled.h1`
    display: flex;
    white-space: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 20px;
    color: #1754ff;
    flex-flow: column;
    transition: .2s;
    & span {
        margin-top: 10px;
    }
    &.active {
        color: #009688;
        & span {
        }
    }
`;
const SubTitle = styled.span`
    font-size: 15px;
    color: #7e7f88;
    margin: 0;
`;
const Box = styled.div`
    position: relative;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;
`;
const Wrapper = styled.div`
    // background-color: #f4f7fd;
    padding: 30px 30px
    margin-bottom: 20px;    
    width: 49%;
    &:first-child {
        
    }
    &:last-child {
        margin-top: -110px;
    }
`;

const CheckboxCell = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: row wrap;
    & > div {
        width: 150px;
        height: 150px;
        margin-right: 5px;
        margin-bottom: 60px;
    }
`;

const InputDetailsExtended = styled(InputDetails)`
    margin-bottom: 10px;
`;
const JobListExtended = styled(JobList)`
    width: flex;
    
`;
const JobListWrapper = styled.div`
    &.active {
        display: flex;
        width: 100%;
        justify-content: space-between;
        & > div {
            width: 48%;    
        }
    }
`;
const ExitButton = styled.div`    
    position: absolute;
    top: 10px;
    left: 20px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        fill: #d7d7d7;
        transition: .3s;
        transform: rotateZ(-180deg);
    }
    &:hover {
        & svg {
            fill: ${props => props.theme.blueColor};
            transform: rotateZ(-90deg);
        }
    }      
`;
const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    &:not(:nth-of-type(1)) {
        & > button {
            margin-left: 15px;
        }
    }
`;
interface IProps {
    className: string;
    handleUpdateGroup: (updatedGroup: Grouping) => void;
}
const DetailsPage: React.FC<IProps> = ({
    className,
    handleUpdateGroup
}) => {
    const { toggleDetails, tmpGrouping  }: { toggleDetails: any, tmpGrouping: Grouping} = useHomeContext();
    const { 
        isUpdate, 
        toggleIsUpdate, 
        selectedGrouping, 
        handleTmpGrouping, 
        handleSelectedGrouping,
        handleChangeTmpGrouping,
        handleTextChangeTmpGrouping,
        handleChangeTmpRestfulCheckbox
     } = useHomeContext();
    const { groupName, pdf,  redirect,  restful, sendEmail } = tmpGrouping;
    const handleEditButton = () => {   
        // handleTmpGrouping(selectedGrouping);
        toggleIsUpdate();
    }
    const handleUpdateButton = () => {
        // update쿼리 실행시키기.
        handleSelectedGrouping(tmpGrouping);
        handleUpdateGroup(tmpGrouping);
        // handleSelectedGrouping(tmpGrouping);
        toggleIsUpdate();
        toast.info(`Group '${tmpGrouping.groupName}' updated.`);
    }
    
    console.log("Detail Pages: ", tmpGrouping);
    return (    
        <Container className={className}>
            <ExitButton onClick={e => { 
                toggleDetails(); 
                setTimeout(() => {
                    // css 스타일로 인하여
                    if(isUpdate) {
                        handleTmpGrouping(selectedGrouping);
                    }
                    toggleIsUpdate(false);
                }, 500);  
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </ExitButton>
            <Header>
                <HeaderWrapper>
                    <HeaderTitle className={isUpdate ? "active" : ""}>
                        {
                            isUpdate ? (
                                <React.Fragment>
                                    Group Edit <SubTitle>[{ groupName }]</SubTitle>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    Group Details <SubTitle>[{ groupName }]</SubTitle>
                                </React.Fragment>
                            )
                        }
                    </HeaderTitle>
                </HeaderWrapper>
            </Header>
            <Box>
                <Wrapper>
                    {/* <Title>Grouping Options</Title> */}
                    <CheckboxCell>
                        <CheckboxDetails className={isUpdate ? "active" : ""} name={"pdf"} text={"PDF"} type={"pdf"} readOnly={!isUpdate} checked={pdf.isChecked} onChange={isUpdate ? handleChangeTmpGrouping : () => {}}/>
                        <CheckboxDetails className={isUpdate ? "active" : ""} name={"sendEmail"} text={"Send Email"} type={"sendEmail"} readOnly={!isUpdate} checked={sendEmail.isChecked} onChange={isUpdate ? handleChangeTmpGrouping : () => {}}/>
                        <CheckboxDetails className={isUpdate ? "active" : ""} name={"restful"} text={"RESTFul"} type={"restful"} readOnly={!isUpdate} checked={restful.isChecked} onChange={isUpdate ? handleChangeTmpGrouping : () => {}}/>
                        <CheckboxDetails className={isUpdate ? "active" : ""} name={"redirect"} text={"Redirect"} type={"redirect"} readOnly={!isUpdate} checked={redirect.isChecked} onChange={isUpdate ? handleChangeTmpGrouping : () => {}}/>
                    </CheckboxCell>
                    <ButtonBox>
                        <EditButton type={isUpdate ? "update" : "edit"} onClick={isUpdate ? handleUpdateButton : handleEditButton }/>
                        <EditButton type={isUpdate ? "cancel" : "no-cancel"} onClick={isUpdate ? () => { handleTmpGrouping(selectedGrouping); toggleIsUpdate(); } : () => {} }/>
                    </ButtonBox>
                    
                </Wrapper>
                <Wrapper>
                    {/* <Title>Grouping Details</Title> */}
                    <JobListExtended type={"pdf"} className={isUpdate ? "active" : "details-job"} title={"PDF"}>
                        <JobListWrapper className={"active"}>
                            <InputDetailsExtended className={"input-details"} title={"File Name"} value={pdf.fileName} name={"fileName"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                            <InputDetailsExtended className={"input-details"} title={"File Path"} value={pdf.filePath} name={"filePath"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                        </JobListWrapper>
                    </JobListExtended>
                    <JobListExtended type={"sendEmail"} className={isUpdate ? "active" : "details-job"} title={"Send Email"}>
                        <JobListWrapper className={"active"}>
                            <InputDetailsExtended className={"input-details"} title={"Email"} value={sendEmail.email} name={"email"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                            <InputDetailsExtended className={"input-details"} title={"Password"} type={"password"} value={sendEmail.password} name={"password"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                        </JobListWrapper>
                        <JobListWrapper className={"active"}>
                            <InputDetailsExtended className={"input-details"} title={"Mail Title"} value={sendEmail.mailTitle} name={"mailTitle"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                            <InputDetailsExtended className={"input-details"} title={"Mail Content"} value={sendEmail.mailContent} name={"mailContent"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                        </JobListWrapper>
                    </JobListExtended>
                    <JobListExtended type={"redirect"} className={isUpdate ? "active" : "details-job"} title={"Redirect"}>
                        <JobListWrapper className={"active"}>
                            <InputDetailsExtended className={"input-details"} title={"IP Address"} value={redirect.ipAddress} name={"ipAddress"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                            <InputDetailsExtended className={"input-details"} title={"Port"} value={redirect.port} name={"port"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                        </JobListWrapper>
                    </JobListExtended>
                    <JobListExtended type={"restful"} className={isUpdate ? "active" : "details-job"} title={"RESTFul"}>
                        <JobListWrapper className={"active"}>
                            <CheckedDetailsText className={isUpdate ? "active" : ""} name={"isLogging"} text={"로깅여부"} checked={restful.isLogging} onChange={isUpdate ? handleChangeTmpRestfulCheckbox : () => {}} readOnly={!isUpdate}/>
                            <CheckedDetailsText className={isUpdate ? "active" : ""} name={"isSendFile"} text={"파일전송 여부"} checked={restful.isSendFile} onChange={isUpdate ? handleChangeTmpRestfulCheckbox : () => {}} readOnly={!isUpdate}/>
                        </JobListWrapper>
                        <InputDetailsExtended className={"input-details"} title={"Port"} value={restful.data} name={"data"} onChange={isUpdate ? handleTextChangeTmpGrouping : () => {}} readOnly={!isUpdate}/>
                    </JobListExtended>
                </Wrapper>
            </Box>
        </Container>
    )
};

export default DetailsPage;