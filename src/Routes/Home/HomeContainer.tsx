import React, { useState, useEffect } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { Grouping } from "../../Types/types";
import { useCreateGrouping, useGetAllGrouping, useHomeContext, useGetGrouping, useUpdateGrouping, useDeleteGrouping } from "./HomeProvider";
import CreateGroupModal from "../../Components/CreateGroupModal";
import { toast } from "react-toastify";
import { GetAllGrouping } from "../../Types/resolvers";

const InitGroupList: Grouping = {
    groupName: "",
    pdf: {
        isChecked: false,
        fileName: "",
        filePath: ""
    },
    restful: {
        isChecked: false,
        isLogging: false,
        isSendFile: false,
        data: ""
    },
    sendEmail: {
        isChecked: false,
        email: "",
        password: "",
        mailTitle: "",
        mailContent: ""
    },
    redirect: {
        isChecked: false,
        ipAddress: "",
        port: ""
    }
};

const useFetch = (data: Grouping) => {
    const [ loading, setLoading ] = useState(true);
    const [ groupList, setGroupList ] = useState([InitGroupList]);
    
    useEffect(() => {
        setGroupList([data]);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    

    return {
        loading,
        groupList
    };
}
// [{"pdf":{"isChecked":false,"fileName":"","filePath":""},"restful":{"isChecked":false,"isLogging":false,"isSendFile":false},"sendEmail":{"isChecked":false,"email":"","password":"","mailTitle":"","mailContent":""},"redirect":{"isChecked":false,"ipAddress":"","port":0}}]

const VerifyCreateGroup = (currentStep: number, group: Grouping) => {
    const { groupName, pdf, sendEmail, redirect, restful } = group;
    // 1. groupName.length > 0
    // 2. currentStep = 2
    // 3. isChecked가 하나라도 되어있어야함.

    // Check [1,2,3]
    const isVerifiedForm: boolean = currentStep === 2 && 
        groupName !== "" && ( !pdf.isChecked || !sendEmail.isChecked || !redirect.isChecked || !restful.isChecked)

    return isVerifiedForm;
}
const AvailableGroupName = (newGroupName: Grouping, groups: GetAllGrouping | null): boolean => {
    if(groups) { // 4. groupName 중복되면 안됨.
        const { groups: { groupList }} = groups;
        if(!groupList || groupList.length <= 0) {
            return true;
        } else {
            const findData = groupList.find(group => group.groupName === newGroupName.groupName);
            console.log("findData: ", findData);
            if(findData) {
                return false;
            } else {
                return true;
            }
        }
        
    } else {
        return true;
    }
}
interface IProps extends WithApolloClient<{}> {}
const HomeContainer: React.FC<IProps> = ({ client }) => {
    
    const { cache } = client;
    const getGroupList: GetAllGrouping | null = useGetAllGrouping(cache); 
    
    
    console.log("AllGrouping: ", getGroupList);

    // var initGroupList: Grouping = JSON.parse(groups.groupList) === "" ? InitGroupList : groups.groupList;
    const { loading, groupList } = useFetch(InitGroupList);
    const { isDetails, toggleCreateModal, onErrorLoading, resetFormCreateGrouping, selectedCardIndex, handleSelectedGrouping } = useHomeContext();
    const { data: tmpData, mutationCreateGrouping } = useCreateGrouping();
    const { mutationUpdateGrouping } = useUpdateGrouping();
    const { mutationDeleteGrouping } = useDeleteGrouping();
    const selectedGroupData: Grouping | {} = useGetGrouping(selectedCardIndex);
    console.log("SELECTED_GROUPING: ", selectedGroupData);
    
    const handleDeleteGroup = ({ groupName }) => {
        mutationDeleteGrouping({
            variables: {
                groupName
            }
        });
    }
    const handleUpdateGroup = (updatedGroup: Grouping) => {
        console.log("hanldeUpdateGroup: ", updatedGroup);
        mutationUpdateGrouping({
            variables: {
                updatedGroup
            }
        });
    }
    const handleCreateGroup = (currentStep, newGrouping: Grouping) => {
        const isVerifyFormStep = VerifyCreateGroup(currentStep, newGrouping);
        const isAvailableGroupName =  AvailableGroupName(newGrouping, getGroupList);

        if(isVerifyFormStep) {
            const { groupName } = newGrouping;
            if(isAvailableGroupName) {
                mutationCreateGrouping({
                    variables: {
                        ...newGrouping
                    }
                });
                toast.info(`Create new group '${groupName}'`);
                resetFormCreateGrouping();
                toggleCreateModal();
            } else {
                onErrorLoading();
                toast.error("Duplicate group names cannot be used.")
            }
        } else {
            onErrorLoading();
            toast.error("Not Found.")
        }
        
    }
    
    console.log("HomeData: ", groupList);
    return (
            <React.Fragment>
                <HomePresenter 
                    loading={loading}
                    isDetails={isDetails}
                    getGroupList={getGroupList}
                    handleUpdateGroup={handleUpdateGroup}
                    handleDeleteGroup={handleDeleteGroup}
                /> 
                <CreateGroupModal 
                    handleCreateGroup={handleCreateGroup}
                />
            </React.Fragment>
    )
};
export default withApollo(HomeContainer);
// export default graphql<any>(ALL_GROUPING)(HomeContainer);