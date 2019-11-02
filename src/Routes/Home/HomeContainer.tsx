import React, { useState, useEffect, ComponentProps } from "react";
import { withApollo, WithApolloClient, useApolloClient } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { Grouping } from "../../Types/types";
import { useCreateGrouping, useGetAllGrouping, useHomeContext, useGetGrouping, useUpdateGrouping, useDeleteGrouping, useStartGrouping } from "./HomeProvider";
import CreateGroupModal from "../../Components/CreateGroupModal";
import { toast } from "react-toastify";
import { GetAllGrouping } from "../../Types/resolvers";
import { RouteProps, RouteComponentProps, RouterProps } from "react-router";

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
        destinationEmails: "",
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
    const [ groupList, setGroupList ] = useState<Array<Grouping>>([InitGroupList]);
    
    useEffect(() => {
        setGroupList([data]);
        setTimeout(() => {
            setLoading(false);
        }, 300);
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
const GetRestfulData = (data: string) => {
    return `function tmp() { 
        ${data} 
    }`;
}
//RouteProps
interface IProps extends RouteComponentProps<any>{

}
const HomeContainer: React.FC<IProps> = ({ location, history }) => {
    const { state } = location;
    
    if(!state || !state.currentFile || state.currentFile === "") {
        history.push("/");
    }
    const { cache } = useApolloClient();
    console.log("HOME CONTAINER: ", cache);
    const getGroupList: GetAllGrouping | null = useGetAllGrouping(cache);
    
    
    console.log("AllGrouping: ", getGroupList);

    // var initGroupList: Grouping = JSON.parse(groups.groupList) === "" ? InitGroupList : groups.groupList;
    const { loading, groupList } = useFetch(InitGroupList);
    const { isDetails, toggleCreateModal, onErrorLoading, resetFormCreateGrouping, selectedCardIndex, handleSelectedGrouping, onExeLoading, exeLoading, isRestfulFunc } = useHomeContext();
    const { data: tmpData, mutationCreateGrouping } = useCreateGrouping();
    const { mutationUpdateGrouping } = useUpdateGrouping();
    const { mutationDeleteGrouping } = useDeleteGrouping();
    const data = "HELLO!!!";
    const { mutationStartForGrouping } = useStartGrouping(data); 

    const selectedGroupData: Grouping | {} = useGetGrouping(selectedCardIndex);
    
    const handleStartForGrouping = () => {
        if(exeLoading) {
            alert("실행중입니다!");
            return;
        }
        onExeLoading();
        setTimeout(() => {
            console.log("CURRENT KEY= ",selectedCardIndex);
            mutationStartForGrouping({
                variables: {
                    groupId: parseInt(selectedCardIndex)
                }
            });
        }, 1500);
    }
    const handleDeleteGroup = ({ groupName }) => {
        if(exeLoading) {
            alert("실행중입니다.");
            return;
        }
        onExeLoading();
        setTimeout(() => {
            mutationDeleteGrouping({
                variables: {
                    groupName
                }
            });
        }, 1500);
    }
    const handleUpdateGroup = (updatedGroup: Grouping) => {
        if(exeLoading) {
            alert("실행중입니다.");
            return;
        }
        onExeLoading();
        setTimeout(() => {
            mutationUpdateGrouping({
                variables: {
                    updatedGroup
                }
            });
        }, 1500);
    }
    const handleCreateGroup = (currentStep, newGrouping: Grouping) => {
        const isVerifyFormStep = VerifyCreateGroup(currentStep, newGrouping);
        const isAvailableGroupName =  AvailableGroupName(newGrouping, getGroupList);
        
        if(isVerifyFormStep) {
            const { groupName } = newGrouping;
            if(isAvailableGroupName) {
                if(exeLoading) {
                    alert("실행중입니다.");
                    return;
                }
                onExeLoading();
                setTimeout(() => {
                    // restful의 data를 함수출력으로 변경.
                    if(isRestfulFunc.value) {
                        newGrouping.restful.data = GetRestfulData(newGrouping.restful.data);
                        isRestfulFunc.onInit();
                    }
                    mutationCreateGrouping({
                        variables: {
                            ...newGrouping
                        }
                    });
                    
                    toast.info(`Create new group '${groupName}'`);
                    resetFormCreateGrouping();
                    toggleCreateModal();
                }, 1500);
                
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
                    handleStartForGrouping={handleStartForGrouping}
                    currentFile={state ? state.currentFile : ""}
                /> 
                <CreateGroupModal 
                    handleCreateGroup={handleCreateGroup}
                />
            </React.Fragment>
    )
};
export default HomeContainer;
// export default withApollo(HomeContainer);
// export default graphql<any>(ALL_GROUPING)(HomeContainer);