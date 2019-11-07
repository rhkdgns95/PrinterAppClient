import React, { useContext, useState, useEffect } from "react";
import { IMainContext } from "../../Types/types";
import { DeleteResultMutationVariables, GetDocsQueryResponse } from "../../Types/resolvers";
import { useMutation, useQuery } from "react-apollo";
import { toast } from "react-toastify";
import { DELETE_RESULT, GET_ALL_RESULT, GET_DOCS } from "./MainQueries";
import { ApolloCache } from "apollo-cache";

const LOAIDNG_TIME = 1000;

const InitContext: IMainContext = {
    loading: true,
    step: 0,
    onStep: () => {},
    isDetails: false,
    onToggleDetails: () => {},
    mutationDeleteResult: () => {},
    dataGetDocs: {GetDocs: {ok: false, error: "", docs: []}},
    loadingGetDocs: true
};

const MainContext: React.Context<IMainContext> = React.createContext<IMainContext>(InitContext);

const useMainContext = () => useContext(MainContext);

const GetAllResult = (cache: ApolloCache<any>) => {
    const data: any | null = cache.readQuery({ query: GET_ALL_RESULT });
    return data.result.resultList;
}
const useMainFetch = (): {value: IMainContext} => {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [step, setStep] = useState<number>(0);
    const [isDetails, setIsDetails] = useState<boolean>(false);
    
    const [mutationDeleteResult] = useMutation<any, DeleteResultMutationVariables>(DELETE_RESULT, {
        onCompleted: data => {
            toast.success("최근기록 1건 제거!");
        }
    });
    
    const { data: dataGetDocs, loading: loadingGetDocs } = useQuery<GetDocsQueryResponse, any>(GET_DOCS, {
        partialRefetch: true,
        fetchPolicy: "cache-and-network",
        // pollInterval: 10000,
        onCompleted: data => {
            console.log("GetDocs Success: ", data);
        },
        onError: data => {
            console.log("GetDocs error: ", data);
        }
    });

    const onStep = (newStep: number) => {
        setStep(newStep);
    }
    const onToggleDetails = () => {
        setIsDetails(!isDetails);
    }

    const MainLoading = () => {
        setLoading(false);
        // File 가져오기. - 받은파일 요청 RESTFUL

        // LocalStorage로부터 최근기록 가져오기
    };
    
    useEffect(() => {
        setTimeout(MainLoading, LOAIDNG_TIME);

        return () => {
            alert("종료");
        }
    }, []);
    

    return {
        value: {
            loading,
            step,
            onStep,
            isDetails,
            onToggleDetails,
            mutationDeleteResult,
            loadingGetDocs,
            dataGetDocs
        }
    };
}

const MainProvider: React.FC<any> = ({
    children
}) => {
    const data = useMainFetch();
    return (
        <MainContext.Provider {...data}>
            {
                children
            }
        </MainContext.Provider>
    )
}

export { useMainContext, MainProvider, GetAllResult };