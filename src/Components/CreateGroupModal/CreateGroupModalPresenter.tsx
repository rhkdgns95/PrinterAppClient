import React, { ChangeEventHandler } from "react";
import styled from "../../Styles/typed-components";
import GroupCheckbox from "../GroupCheckbox/GroupCheckbox";
import { Grouping } from "../../Types/types";
import Progressbar from "../Progressbar";
import ButtonIcon from "../ButtonIcon";
import InputIcon from "../InputIcon";
import FormCard from "../FormCard";
import CheckboxText from "../CheckboxText";
import ConfirmText from "../ConfirmText";
import CheckboxResult from "../CheckboxResult";
import CheckboxResultText from "../CheckboxResultText";
import CheckboxAgree from "../CheckboxAgree";

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    height: 0;
    border-radius: 50%;
    transform: scale(0) rotate(90deg);
    opacity: 0;
    transition: 0s;
    // background-color: white;
    background-color: black;
    &.active {
        transition: .5s;
        left: auto;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        transform: scale(1) rotate(0deg);
        // background-color: rgba(0,0,0,.9);
        background-color: rgba(90,50,40,.4);
        width: 100%;
        opacity: 1;
        & > div {
            opacity: 1;
        }
    }
`;
const Wrapper = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
    max-height: 800px;
    max-width: 1100px;
    background-color: white;
    opacity: 0;
    transition: .3s;
    transition-delay: .8s;
    overflow: hidden;
`;

const WrapperTitle = styled.h3`
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
    color: #13ac9e;
    text-shadow: 0 1px 2px rgba(0,0,0,.11)
`;
const Screen = styled.div`
    width: 300%;
    height: 100%;
    display: flex;
    transition: .4s;
    transition-timing-function: cubic-bezier(1,.44,0,.57);
    &.active {
        transform: translateX(-33.3333%);
        
    }
    &.active-2 {
        transform: translateX(-66.6666%);
    }
`;
const WrapperStandard = styled.div`
    padding-top: 100px;
    width: 33.3333%;
    height: 100%;
    opacity: .1;
    transition: opacity .4s;
    &.active {
        opacity: 1
    }
`;
const WrapperChoiceJob = styled(WrapperStandard)`
    
`;
const WrapperDetailsJob = styled(WrapperStandard)`

`;
const WrapperConfirm = styled(WrapperStandard)`

`;
const GroupList = styled.div`
    width: 100%;
    display: flex;
    max-width: 900px;
    margin: 0 auto;
    margin-top: 60px;
    justify-content: space-around;
`;  
const CloseBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    & svg {
        fill: #dfdfdf;
    }
    &:focus {
        outline: none;
    }
    &:hover {
        & svg {
            fill: black;
        }
    }
`;
const ProgressCell = styled.div`
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ProgressBarExtended = styled(Progressbar)`
    position: relative;
    &:not(:nth-of-type(1)) {
        margin-left: 130px;
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 100%;
            height: 2px;
            width: 130px;
            background-color: #b2c6c8;
        }
    }
`;
const ButtonCell = styled.div`
    position: absolute;
    display: flex;
    left: 0;
    bottom: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
`;
const GroupNameCell = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0 30px 0;
`;
const DetailsInputCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FormCardExtended = styled(FormCard)`
    &:not(:nth-of-type(1)) {
        margin-left: 15px;
    }
`;
const InputIconExtended = styled(InputIcon)`
    margin-bottom: 7px;
`;
const CheckboxTextExtended = styled(CheckboxText)`
    margin-left: 25px;
    margin-top: 12px;
`;
const CheckBoxResultCell = styled.div`
    display: flex;
    margin: 10px auto 10px auto;
    max-width: 700px
    align-items: center;
    // justify-content: space-between;
    justify-content: flex-start;
`;
const CheckboxResultCellWrapper = styled.div`
    // justify-self: flex-end;
    margin-left: 45px;
`;

const ConfirmTextCell = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
        width: 45%;
        margin: 0;
        margin-bottom: 7px;
        &.group-name,
        &.email {
            width: 100%;
        }
    }
    flex-flow: row wrap;
`;
const ConfirmTextExtended = styled(ConfirmText)`
    max-width: 700px;
    margin: 0 auto;
    margin-bottom: 6px;
`;

const CheckboxResultExtended = styled(CheckboxResult)`
    
`;

interface IProps {
    className: string;
    isAgree: boolean;
    errorLoading: boolean;
    toggleCreateModal: () => void;
    toggleConfirm: () => void;
    formCreateGrouping: Grouping;
    handleChangeFormGrouping: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextChangeFormGrouping: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeRestfulCheckbox:  (event: React.ChangeEvent<HTMLInputElement>) => void;
    resetFormCreateGrouping: any;
    onNextStep: () => void,
    onPreviousStep: () => void,
    currentStep: number
    handleCreateGroup: (currentStep: number, newGrouping: Grouping) => void;
    isRestfulFunc: { value: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => any, onInit: () =>{} };
}
const CreateGroupModalPresenter: React.FC<IProps> = ({
    className,
    isAgree,
    errorLoading,
    toggleCreateModal,
    toggleConfirm,
    formCreateGrouping,
    handleChangeFormGrouping,
    handleTextChangeFormGrouping,
    handleChangeRestfulCheckbox,
    resetFormCreateGrouping,
    onNextStep,
    onPreviousStep,
    currentStep,
    handleCreateGroup,
    isRestfulFunc
}) => ( 
    <Container className={className}>
        <Wrapper className={errorLoading ? "error" : ""}>
            <ProgressCell>
                <ProgressBarExtended  
                    className={currentStep === 0 ? "active" : "next"}
                    name="JOB"
                    num={1}
                />
                <ProgressBarExtended  
                    className={currentStep === 1 ? "active" : currentStep < 1 ? "wait" : "next"}
                    name="OPTIONS"
                    num={2}
                />
                <ProgressBarExtended  
                    className={currentStep === 2 ? "active" : "wait"}
                    name="CONFIRM"
                    num={3}
                />
            </ProgressCell>
           
            <Screen className={currentStep === 1 ? "active" : currentStep === 2 ? "active-2" : ""}>
                <WrapperChoiceJob className={currentStep === 0 ? "active" : ""}>
                    <WrapperTitle>SELECT GROUP Job</WrapperTitle>
                    <GroupList>
                        <GroupCheckbox id={1} name={"pdf"} checked={formCreateGrouping.pdf.isChecked} onChange={handleChangeFormGrouping}/>
                        <GroupCheckbox id={2} name={"sendEmail"} checked={formCreateGrouping.sendEmail.isChecked} onChange={handleChangeFormGrouping}/>
                        <GroupCheckbox id={3} name={"restful"} checked={formCreateGrouping.restful.isChecked} onChange={handleChangeFormGrouping}/>
                        <GroupCheckbox id={4} name={"redirect"} checked={formCreateGrouping.redirect.isChecked} onChange={handleChangeFormGrouping}/>
                    </GroupList>
                </WrapperChoiceJob>
                <WrapperDetailsJob className={currentStep === 1 ? "active" : ""}>
                    <WrapperTitle>Write Details</WrapperTitle>
                    <GroupNameCell>
                        <InputIcon 
                            placeholder={"GroupName"}
                            value={formCreateGrouping.groupName}
                            name={"groupName"}
                            className={formCreateGrouping.groupName !== "" ? "active" : " "}
                            svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                            onChange={handleTextChangeFormGrouping}
                        />
                    </GroupNameCell>
                    <DetailsInputCell>
                        {
                            formCreateGrouping.pdf.isChecked && (
                                <FormCardExtended 
                                title={"PDF"}
                                svgPath={"M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"}
                                >
                                    <InputIconExtended 
                                        className={formCreateGrouping.pdf.fileName !== "" ? "active" : "input"}
                                        placeholder={"File Name"}
                                        value={formCreateGrouping.pdf.fileName}
                                        name={"fileName"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended 
                                        className={formCreateGrouping.pdf.filePath !== "" ? "active" : "input"}
                                        placeholder={"File Path"}
                                        value={formCreateGrouping.pdf.filePath}
                                        name={"filePath"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                </FormCardExtended>
                            )
                        }
                        {
                            formCreateGrouping.sendEmail.isChecked && (
                                <FormCardExtended 
                                title={"Send Email"}
                                svgPath={"M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"}
                                >
                                    <InputIconExtended
                                        className={formCreateGrouping.sendEmail.email !== "" ? "active" : "input"}
                                        placeholder={"Sender"}
                                        value={formCreateGrouping.sendEmail.email}
                                        name={"email"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended
                                        className={formCreateGrouping.sendEmail.password !== "" ? "active" : "input"}
                                        placeholder={"Password"}
                                        value={formCreateGrouping.sendEmail.password}
                                        name={"password"}
                                        type={"password"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended
                                        className={formCreateGrouping.sendEmail.destinationEmails !== "" ? "active" : "input"}
                                        placeholder={"Recipients"}
                                        value={formCreateGrouping.sendEmail.destinationEmails}
                                        name={"destinationEmails"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended
                                        className={formCreateGrouping.sendEmail.mailTitle !== "" ? "active" : "input"}
                                        placeholder={"Mail Title"}
                                        value={formCreateGrouping.sendEmail.mailTitle}
                                        name={"mailTitle"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended
                                        className={formCreateGrouping.sendEmail.mailContent !== "" ? "active" : "input"}
                                        placeholder={"Mail Content"}
                                        value={formCreateGrouping.sendEmail.mailContent}
                                        name={"mailContent"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                </FormCardExtended>
                            )
                        }
                        {
                            formCreateGrouping.restful.isChecked && (
                                <FormCardExtended
                                    title={"RESTFul"}
                                    svgPath={"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z"}
                                >   
                                    <InputIcon
                                        className={formCreateGrouping.restful.data !== "" ? "active" : "input"}
                                        placeholder={"Function Data"}
                                        value={formCreateGrouping.restful.data}
                                        type={"textarea"}
                                        name={"data"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                        isFunction={isRestfulFunc.value}
                                    />
                                    <CheckboxTextExtended className={"checkbox-text"} text={"함수형태"} name={"name"} onChange={isRestfulFunc.onChange} checked={isRestfulFunc.value}/>
                                    <CheckboxTextExtended className={"checkbox-text"} text={"로깅여부"} name={"isLogging"} onChange={handleChangeRestfulCheckbox} checked={formCreateGrouping.restful.isLogging}/>
                                    <CheckboxTextExtended className={"checkbox-text"} text={"파일전송 여부"} name={"isSendFile"} onChange={handleChangeRestfulCheckbox} checked={formCreateGrouping.restful.isSendFile}/>
                                </FormCardExtended>
                            )
                        }
                        {
                            formCreateGrouping.redirect.isChecked && (
                                <FormCardExtended 
                                title={"Redirect"}
                                svgPath={"M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 0.599zm6.061 3.045c0-.551.448-1 1-1s1 .449 1 1-.448 -1-1 1-1-.449-1-1z"}
                                >
                                    <InputIconExtended 
                                        className={formCreateGrouping.redirect.ipAddress !== "" ? "active" : "input"}
                                        placeholder={"IP Address"}
                                        value={formCreateGrouping.redirect.ipAddress}
                                        name={"ipAddress"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                    <InputIconExtended 
                                        className={formCreateGrouping.redirect.port !== "" ? "active" : "input"}
                                        placeholder={"Port"}
                                        value={formCreateGrouping.redirect.port}
                                        name={"port"}
                                        svgPath="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"
                                        onChange={handleTextChangeFormGrouping}
                                    />
                                </FormCardExtended>
                            )
                        }
                      </DetailsInputCell>
                </WrapperDetailsJob>

                <WrapperConfirm className={currentStep === 2 ? "active" : ""}>
                    <WrapperTitle>Confirm</WrapperTitle>
                    
                    <ConfirmTextCell>
                        <ConfirmTextExtended job={""} text={"Group Name"} value={formCreateGrouping.groupName} className={"confirm-text group-name"}/>
                    </ConfirmTextCell>
                    {
                        formCreateGrouping.pdf.isChecked && (
                            <ConfirmTextCell>
                                <ConfirmTextExtended job={"PDF"} text={"File Name"} value={formCreateGrouping.pdf.fileName} className={"confirm-text"}/>
                                <ConfirmTextExtended job={"PDF"} text={"PDF - File Path"} value={formCreateGrouping.pdf.filePath} className={"confirm-text"}/>
                            </ConfirmTextCell>
                        )
                    }
                    {
                        formCreateGrouping.sendEmail.isChecked && (
                            <ConfirmTextCell>
                                <ConfirmTextExtended job={"SendEmail"} text={"Recipients"} value={formCreateGrouping.sendEmail.destinationEmails} className={"confirm-text"}/>
                                <ConfirmTextExtended job={"SendEmail"} text={"Sender"} value={formCreateGrouping.sendEmail.email} className={"confirm-text"}/>
                                <ConfirmTextExtended job={"SendEmail"} text={"Mail Title"} value={formCreateGrouping.pdf.fileName} className={"confirm-text"}/>
                                <ConfirmTextExtended job={"SendEmail"} text={"Mail Content"} value={formCreateGrouping.pdf.filePath} className={"confirm-text"}/>
                            </ConfirmTextCell>
                        )
                    }
                    {
                        formCreateGrouping.redirect.isChecked && (
                            <ConfirmTextCell>
                                <ConfirmTextExtended job={"Redirect"} text={"IP Address"} value={formCreateGrouping.redirect.ipAddress} className={"confirm-text"}/>
                                <ConfirmTextExtended job={"Redirect"} text={"Port"} value={formCreateGrouping.redirect.port} className={"confirm-text"}/>
                            </ConfirmTextCell>
                        )
                    }
                    {
                        formCreateGrouping.restful.isChecked && (
                            <ConfirmTextCell>
                                <ConfirmTextExtended job={"RESTFul"} text={"Data"} value={formCreateGrouping.restful.data} className={"confirm-text email"}/>
                            </ConfirmTextCell>
                        )
                    }
                    <CheckBoxResultCell>
                        <CheckboxResultExtended 
                            className={formCreateGrouping.pdf.isChecked ? "active" : "no-active"}
                            text={"PDF"}
                            type={"pdf"}
                        />
                        <CheckboxResultExtended 
                            className={formCreateGrouping.sendEmail.isChecked ? "active" : "no-active"}
                            text={"Send Email"}
                            type={"sendEmail"}
                        />
                        <CheckboxResultExtended 
                            className={formCreateGrouping.restful.isChecked ? "active" : "no-active"}
                            text={"RESTFul"}
                            type={"restful"}
                        />
                        <CheckboxResultExtended 
                            className={formCreateGrouping.redirect.isChecked ? "active" : 'no-active'}
                            text={"Redirect"}
                            type={"redirect"}
                        />
                        {
                            formCreateGrouping.restful.isChecked && (
                                <CheckboxResultCellWrapper>
                                    <CheckboxResultText 
                                        text={"Redirect - 함수형태"}
                                        isChecked={isRestfulFunc.value} />
                                    <CheckboxResultText 
                                        text={"Redirect - 로깅여부"}
                                        isChecked={formCreateGrouping.restful.isLogging} />
                                    <CheckboxResultText 
                                        text={"Redirect - 파일전송여부"}
                                        isChecked={formCreateGrouping.restful.isSendFile} />
                                </CheckboxResultCellWrapper>
                            )
                        }
                    </CheckBoxResultCell>
                    <CheckboxAgree 
                        text={"Agree Creating Group"}
                        checked={isAgree}
                        onChange={toggleConfirm}
                    />
                </WrapperConfirm>
            </Screen>
            <CloseBtn onClick={e => { e.preventDefault(); toggleCreateModal(); resetFormCreateGrouping(); isRestfulFunc.onInit();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </CloseBtn>
            <ButtonCell>
                {
                    currentStep > 0 && <ButtonIcon value={"이전단계"} step={"left"} onClick={onPreviousStep}/>
                }
                {
                    currentStep < 2 && <ButtonIcon value={"다음단계"} step={"right"} onClick={onNextStep}/>
                }
                {
                    currentStep === 2 && isAgree && (
                        <ButtonIcon value={"그룹생성"} step={"right"} onClick={() => handleCreateGroup(currentStep, formCreateGrouping)}/>
                    )
                }
            </ButtonCell>
            THis is Modal
        </Wrapper>
    </Container>
);

export default CreateGroupModalPresenter;