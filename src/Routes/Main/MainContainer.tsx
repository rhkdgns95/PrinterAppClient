import React, { useState, useEffect, useMemo } from "react";
import MainPresenter from "./MainPresenter";
const LOAIDNG_TIME = 1000;

const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const MainLoading = () => {
        setLoading(false);
        // File 가져오기.

    };
    
    setTimeout(MainLoading, LOAIDNG_TIME);

    return {
        loading
    };
}
const Main = () => {
    const { loading } = useFetch();
    
    return (
        <MainPresenter loading={loading}/>
    );
};

export default Main;