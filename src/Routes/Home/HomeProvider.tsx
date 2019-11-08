import React, { useContext, useState, useReducer, useCallback } from "react";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_GROUPING, GET_ALL_GROUPING, GET_GROUPING, UPDATE_GROUPING, DELETE_GROUPING, START_FOR_GROUPING, CREATE_RESULT } from "./HomeQueries";
import { Grouping } from "../../Types/types";
import { RouteProps, RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { ApolloCache } from "apollo-cache";
import { GetAllGrouping, GetGroupingResponse, GetGroupingQueryVariables, UpdateGroupingResponse, UpdateGroupingVariables, DeleteGroupingResponse, DeleteGroupingMutationVariables, StartForGroupingMutationResponse, StartForGroupingMutationVariables } from "../../Types/resolvers";

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
        },
        onError:data => {
            console.log("useGetGrouping Error: ", data);
        }
    });
    return GetGrouping;
}
const useCreateGrouping = () => {
    const [ mutationCreateGrouping, { data }] = useMutation<any, Grouping>(CREATE_GROUPING, {
        onCompleted: data => {
        },
        onError: data => {
            console.log("useCreateGrouping Error: ", data);
        }
    });
    return {
        data,
        mutationCreateGrouping
    };
}
const useUpdateGrouping = () => {
    const [ mutationUpdateGrouping ] = useMutation<UpdateGroupingResponse, UpdateGroupingVariables>(UPDATE_GROUPING, {
        onCompleted:data => {
            const { UpdateGrouping: { groupName }} = data;
            toast.info(`Updated Success: '${ groupName }'.`);
        },
        onError:data => {
            console.log("useUpdateGrouping Error: ", data);
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
            toast.success(`Deleted Success: '${groupName}'.`);
        },
        onError: data => {
            console.log("useDeleteGrouping Error: ", data);
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
        destinationEmails: "",
        mailTitle: "",
        mailContent: ""
    },
    redirect: {
        isChecked: false,
        ipAddress: "",
        port: ""
    }
}
const useCreateResult = (history) => {
    const [ mutationCreateResult ] = useMutation(CREATE_RESULT, {
        onCompleted: data => {
            history.replace("/");
            // history.replace("/", {state: {ok: true, error: null}});
        },
        onError: data => {
            // console.log("DATA: ", data);
            // console.log("useCreateResult Error: ", data);
            history.replace("/");
            // history.replace("/", {state: {ok: false, error: data}});
        }
    });
    return {
        mutationCreateResult
    };
};

const useStartGrouping = (mutationCreateResult: any, selectedGrouping: Grouping) => {
    const handleCompleted = (data: StartForGroupingMutationResponse) => {
        const { StartForGrouping: {error, grouping, ok, message} } = data;
        
        if(ok && grouping) {
            // Completed!
            // console.log("useStatrGrouping - handleCompleted: ", grouping , message);
            const { pdf, sendEmail, restful, redirect } = grouping;
            toast.success(`Success: Grouping - ${grouping.groupName}`);
            mutationCreateResult({
                variables: {
                    ok: true,
                    isPdf: pdf.isChecked,
                    isSendEmail: sendEmail.isChecked,
                    isRedirect: redirect.isChecked,
                    isRestful: restful.isChecked,
                    message,
                    date: new Date().getTime() + ""
                }
            });
        } else {
            // Error!
            toast.error(`Failed: ${error ? error : "error"}`);
            mutationCreateResult({
                variables: {
                    ok: false,
                    isPdf: selectedGrouping.pdf.isChecked,
                    isSendEmail: selectedGrouping.sendEmail.isChecked,
                    isRedirect: selectedGrouping.redirect.isChecked,
                    isRestful: selectedGrouping.restful.isChecked,
                    message: error ? error : "failed",
                    date: new Date().getTime() + ""
                }
            });
        }
    }
    const [ mutationStartForGrouping, { loading,data: startForGroupingData, client } ] = useMutation<StartForGroupingMutationResponse, StartForGroupingMutationVariables>(START_FOR_GROUPING,
        {
            onCompleted: handleCompleted,
            onError:data => {
                console.log("Start For Grouping Error! ", data);
            },
        }
    );
    return {
        mutationStartForGrouping,
        startForGroupingData
    }
}
const useInput = () => {
    const [value, setValue] = useState<boolean>(false);
    const onInit = () => {
        setValue(false);
    }
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { checked }} = event;
        setValue(checked);
    }
    return {
        value,
        onInit,
        onChange
    };
}

const useHomeFetch = () => {
    const formGroupReducer: React.Reducer<Grouping, {name: string, type?: string, checked?: boolean, value?: string, tmpValue?: Grouping}> = useCallback(((state, action) => {
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
                case "destinationEmails":
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
    }), []);

    const [ isDetails, setIsDetails ] = useState<boolean>(false);
    const [ exeLoading, setExeLoading ] = useState<boolean>(false);
    const [ isCreateGroup, setIsCreateGroup ] = useState<boolean>(false);
    const [ isAgree, setIsAgree ] = useState<boolean>(false);
    const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
    const [ formCreateGrouping, dispatchCreateGrouping ] = useReducer(formGroupReducer, InitGroupData);
    const [ selectedGrouping, setSelectedGrouping ] = useState<Grouping>(InitGroupData);
    const [ tmpGrouping, dispatchTmpGrouping ] = useReducer(formGroupReducer, InitGroupData);
    const [ currentStep, setCurrentStep ] = useState<number>(0);
    const [ errorLoading, setErrorLoading] = useState<boolean>(false);
    const [ selectedCardIndex, setSelectedCardIndex ] = useState(-1);
    const isRestfulFunc = useInput();

    let timer;

    const onErrorLoading = () => {
        // setErrorLoading(true);
        if(!errorLoading) {
            setErrorLoading(true);
            setTimeout(() => {
                setErrorLoading(false);
            }, 1500);
        } else { // errror Loading이 이미 실행중인경우.
            // console.log("TImer: ", timer);
            // clearTimeout(timer);
            // setErrorLoading(false);
            // setErrorLoadi ng(true);
            // timer = setTimeout(() => {
            //     setErrorLoading(false);
            // }, 1500);
        }
    }
    const onExeLoading = () => {
        if(!exeLoading) {
            setExeLoading(true);
            setTimeout(() => {
                setExeLoading(false);
            }, 1500);
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
        if(currentUpdated && currentUpdated) {
            setIsUpdate(currentUpdated);
        } else if(currentUpdated === undefined) {
            setIsUpdate(!isUpdate);
        } else {
            return;
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
    const handleTextChangeFormGrouping: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
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
    const handleTextChangeTmpGrouping: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
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
        exeLoading,
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
        handleChangeTmpRestfulCheckbox,
        onExeLoading,
        isRestfulFunc
    };
}
interface IProps {
    
}
const ProvideHome: React.FC<IProps> = ({
    children
}) => {
    const value = useHomeFetch();
    return (
        <HomeContext.Provider value={{...value}}>
            {
                children
            }
        </HomeContext.Provider>
    )
}
export { useHomeContext, useCreateGrouping, ProvideHome, useHomeFetch, useGetAllGrouping, useGetGrouping, useUpdateGrouping, useDeleteGrouping, useStartGrouping, useCreateResult };