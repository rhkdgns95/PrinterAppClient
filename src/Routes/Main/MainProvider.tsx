import React, { useContext, useState, useEffect } from "react";
import { IMainContext } from "../../Types/types";

const LOAIDNG_TIME = 1000;
const InitContext: IMainContext = {
    loading: true,
    step: 0,
    onStep: () => {},
    isDetails: false,
    onToggleDetails: () => {}
};
const MainContext: React.Context<IMainContext> = React.createContext<IMainContext>(InitContext);

const useMainContext = () => useContext(MainContext);

const useMainFetch = (): {value: IMainContext} => {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [step, setStep] = useState<number>(0);
    const [isDetails, setIsDetails] = useState<boolean>(false);

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
    }, []);
    

    return {
        value: {
            loading,
            step,
            onStep,
            isDetails,
            onToggleDetails
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

export { useMainContext, MainProvider };