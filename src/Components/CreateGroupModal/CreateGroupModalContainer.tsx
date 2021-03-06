import React from "react";
import CreateGroupModalPresenter from "./CreateGroupModalPresenter";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import { Grouping } from "../../Types/types";

interface IProps {
    handleCreateGroup: (currentStep: number, newGrouping: Grouping) => void;
}

const CreateGroupModalContainer: React.FC<IProps> = ({
    handleCreateGroup
}) => {  
    const { 
        isCreateGroup, 
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
        isRestfulFunc
    } = useHomeContext();
    // Simple Result
    // const value = useHomeContext(); 
    
    return <CreateGroupModalPresenter 
        className={isCreateGroup ? "active" : ""}
        isAgree={isAgree}
        errorLoading={errorLoading}
        toggleCreateModal={toggleCreateModal}
        toggleConfirm={toggleConfirm}
        formCreateGrouping={formCreateGrouping}
        handleChangeFormGrouping={handleChangeFormGrouping}
        handleTextChangeFormGrouping={handleTextChangeFormGrouping}
        handleChangeRestfulCheckbox={handleChangeRestfulCheckbox}
        resetFormCreateGrouping={resetFormCreateGrouping}
        onNextStep={onNextStep}
        onPreviousStep={onPreviousStep}
        currentStep={currentStep}
        handleCreateGroup={handleCreateGroup}
        isRestfulFunc={isRestfulFunc}
        />;
};

export default CreateGroupModalContainer;