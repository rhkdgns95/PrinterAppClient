import React, { useContext, useState, useReducer } from "react";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_GROUPING, GET_ALL_GROUPING, GET_GROUPING, UPDATE_GROUPING, DELETE_GROUPING } from "./HomeQueries";
import { Grouping } from "../../Types/types";
import { RouteProps, RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { ApolloCache } from "apollo-cache";
import { GetAllGrouping, GetGroupingResponse, GetGroupingQueryVariables, UpdateGroupingResponse, UpdateGroupingVariables, DeleteGroupingResponse, DeleteGroupingMutationVariables } from "../../Types/resolvers";

const HomeContext = React.createContext<any>({});

const useHomeContext = () => useContext(HomeContext);

const useGetAllGrouping = (cache: ApolloCache<any>) => {
    let result: GetAllGrouping | null;
    try {
        result = cache.readQuery({query: GET_ALL_GROUPING});
    } catch(error) {
        console.log("useGetAllGrouping Error: ", error);
        throw new error(error);
    }
    return result;
}
const useGetGrouping = (index: number) => {
    let { data: { GetGrouping = {} } = {} } = useQuery<GetGroupingResponse, GetGroupingQueryVariables>(GET_GROUPING,{
        variables: {
            index
        }
    });
    return GetGrouping;
}
const useCreateGrouping = () => {
    const [ mutationCreateGrouping, { data }] = useMutation<any, Grouping>(CREATE_GROUPING, {
        onCompleted: data => {
            console.log("SUCCESS: ", data);
        },
        onError: data => [
            console.log("ERROR", data)
        ]
    });
    return {
        data,
        mutationCreateGrouping
    };
}
const useUpdateGrouping = () => {
    const [ mutationUpdateGrouping ] = useMutation<UpdateGroupingResponse, UpdateGroupingVariables>(UPDATE_GROUPING, {
        onCompleted:data => {
            console.log("UpdateGrouping완료함! ", data);
        },
        onError:data => {
            console.log("UpdateGrouping Error됨! ", data);
        }
    });
    return {
        mutationUpdateGrouping
    };
}
const useDeleteGrouping = () => {
    const [ mutationDeleteGrouping ] = useMutation<DeleteGroupingResponse, DeleteGroupingMutationVariables>(DELETE_GROUPING, {
        onCompleted: data => {
            const { groupName } = data.DeleteGrouping;
            toast.success(`Group name '${groupName}' Deleted.`);
        }
    })
    return {
        mutationDeleteGrouping
    };
}
const InitGroupData: Grouping = {
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
}

const formGroupReducer: React.Reducer<Grouping, {name: string, type?: string, checked?: boolean, value?: string, tmpValue?: Grouping}> = (state, action) => {
    const formGrouping = state;
    const { groupName, pdf, sendEmail, redirect, restful } = formGrouping;
    var object = {};
    if(action.name === "checkbox") {
        switch(action.type) {
            case "pdf":
                object = pdf;
                break;
            case "sendEmail":
                object = sendEmail
                break;
            case "restful":
                object = restful;
                break;
            case "redirect":
                object = redirect;
                break;
            default: throw new Error(`unexpected action.type: ${action.type}`);
        }
        return {
            groupName,
            pdf,
            restful,
            redirect,
            sendEmail,
            [action.type as any]: {
                ...object,
                isChecked: action.checked
            } 
        };
    } else if (action.name === "reset"){
        return InitGroupData;
    } else if(action.name === "text"){
        const { value } = action;
        switch(action.type) {
            case "groupName": 
                object = { [action.type]: value };
                break;
            case "fileName":
            case "filePath":
                object = { pdf: { ...pdf, [action.type]: value }};
                break;
            case "email":
            case "password":
            case "mailTitle":
            case "mailContent":
                object = { sendEmail: { ...sendEmail, [action.type]: value}};
                break;
            case "data":
                object = { restful: {...restful, [action.type]: value }};
                break;
            case "port":
            case "ipAddress":
                object = { redirect: { ...redirect, [action.type]: value }};
                break;
            default: throw new Error(`unexpected action.type: ${action.type}`);
        }
        return {
            groupName,
            pdf,
            sendEmail,
            restful,
            redirect,
            ...object
        };
    } else if(action.name === "resetTmp") {
        const { tmpValue } = action;
        if(tmpValue) {
            return tmpValue;
        } else {
            throw Error("Not Found resetTmp Data");
        }
        
    } else { // Restful checkbox
        const { restful } = formGrouping;
        const { type, checked } = action;
        return {
            ...formGrouping,
            restful: {
                ...restful,
                [type as any]: checked
            }
        }
    }
}
const useHomeFetch = () => {
    const [ isDetails, setIsDetails ] = useState<boolean>(false);
    const [ isCreateGroup, setIsCreateGroup ] = useState<boolean>(false);
    const [ isAgree, setIsAgree ] = useState<boolean>(false);
    const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
    const [ formCreateGrouping, dispatchCreateGrouping ] = useReducer(formGroupReducer, InitGroupData);
    const [ selectedGrouping, setSelectedGrouping ] = useState<Grouping>(InitGroupData);
    const [ tmpGrouping, dispatchTmpGrouping ] = useReducer(formGroupReducer, InitGroupData);
    const [ currentStep, setCurrentStep ] = useState<number>(0);
    const [ errorLoading, setErrorLoading] = useState<boolean>(false);
    const [ selectedCardIndex, setSelectedCardIndex ] = useState(-1);

    let timer;

    const onErrorLoading = () => {
        // setErrorLoading(true);
        console.log("On Error loading!");
        console.log("error loading: ", errorLoading);
        if(!errorLoading) {
            setErrorLoading(true);
            setTimeout(() => {
                console.log("SetTime Out!");
                setErrorLoading(false);
            }, 1500);
        } else { // errror Loading이 이미 실행중인경우.
            console.log("TImer: ", timer);
            // clearTimeout(timer);
            // setErrorLoading(false);
            // setErrorLoadi ng(true);
            // timer = setTimeout(() => {
            //     setErrorLoading(false);
            // }, 1500);
        }
    }
   
    const toggleCreateModal = () => {
        setIsCreateGroup(!isCreateGroup);
    }
    const toggleConfirm = () => {
        setIsAgree(!isAgree);
    }
    const toggleDetails = () => {
        setIsDetails(!isDetails);
    }
    const toggleIsUpdate = (currentUpdated?: boolean) => {
        if(currentUpdated !== undefined) {
            setIsUpdate(currentUpdated);
        } else {
            setIsUpdate(!isUpdate);
        }
    }
    const onNextStep = () => {
        const { pdf, restful, groupName, redirect, sendEmail } = formCreateGrouping;
        const notChecked: boolean = !pdf.isChecked && !redirect.isChecked && !sendEmail.isChecked && !restful.isChecked;
        if(currentStep === 0 && notChecked) {
            toast.error("Please select at least one task")
            onErrorLoading();
            return;
        } else if(currentStep === 1 && (notChecked || groupName === "")) {
            toast.error("Please enter a group name")
            onErrorLoading();
            return;
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
    const onPreviousStep = () => {
        setCurrentStep(currentStep - 1);
        if(isAgree) {
            setIsAgree(false);
        }
    }
    const onCancelCardIndex = () => {
        setSelectedCardIndex(-1);
    }
    const handleTmpGrouping = (grouping: Grouping) => {
        dispatchTmpGrouping({name: "resetTmp",tmpValue: grouping});
    }
    const handleClickCardIndex = (index: number) => {
        setSelectedCardIndex(index);
    }
    const handleSelectedGrouping = (grouping: Grouping) => {
        setSelectedGrouping(grouping);
    }
    
    const handleChangeFormGrouping: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        // checked Change일 경우,
        const { target: { checked, name }} = event;
        dispatchCreateGrouping({ name:"checkbox", type: name, checked });
    }
    const handleTextChangeFormGrouping: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { name, value }} = event;
        dispatchCreateGrouping({ name: "text", type: name, value });
    }
    const handleChangeRestfulCheckbox: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { name, checked }} = event;
        dispatchCreateGrouping({ name: "restful", type: name, checked })
    }
    // TMP_INPUT CHANGE START
    const handleChangeTmpGrouping: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { checked, name }} = event;
        dispatchTmpGrouping({ name:"checkbox", type: name, checked });
    }
    const handleTextChangeTmpGrouping: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { name, value }} = event;
        dispatchTmpGrouping({ name: "text", type: name, value });
    }
    const handleChangeTmpRestfulCheckbox: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { name, checked }} = event;
        dispatchTmpGrouping({ name: "restful", type: name, checked })
    }

    // TMP_INPUT CHANGE END
    const resetFormCreateGrouping = () => {
        dispatchCreateGrouping({ name:"reset" });
        setIsAgree(false);
        setCurrentStep(0);
    }
    
    return {
        isDetails,
        isAgree,
        isUpdate,
        errorLoading,
        isCreateGroup,
        toggleCreateModal,
        toggleConfirm,
        toggleIsUpdate,
        formCreateGrouping,
        tmpGrouping,
        handleChangeFormGrouping,
        handleTextChangeFormGrouping,
        handleChangeRestfulCheckbox,
        resetFormCreateGrouping,
        onNextStep,
        onPreviousStep,
        currentStep,
        onErrorLoading,
        handleClickCardIndex,
        selectedCardIndex,
        toggleDetails,
        onCancelCardIndex,
        handleSelectedGrouping,
        selectedGrouping,
        handleTmpGrouping,
        handleChangeTmpGrouping,
        handleTextChangeTmpGrouping,
        handleChangeTmpRestfulCheckbox
    };
}
interface IProps {
    
}
const ProvideHome: React.FC<IProps> = ({
    children
}) => {
    const value = useHomeFetch();
    console.log("location");
    return (
        <HomeContext.Provider value={{...value}}>
            {
                children
            }
        </HomeContext.Provider>
    )
}
export { useHomeContext, useCreateGrouping, ProvideHome, useHomeFetch, useGetAllGrouping, useGetGrouping, useUpdateGrouping, useDeleteGrouping };