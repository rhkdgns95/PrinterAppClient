import React, { useState, useEffect, useMemo } from "react";
import MainPresenter from "./MainPresenter";
import { useMainContext, MainProvider } from "./MainProvider";

const MainContainer = () => {
    const { loading, onStep, step } = useMainContext();
    return (
        <MainPresenter 
            loading={loading} 
            onStep={onStep} 
            step={step}
        />
    )
}
const Main = () => {
    return (
        <MainProvider>
            <MainContainer/>
        </MainProvider>
    );
};

export default Main;