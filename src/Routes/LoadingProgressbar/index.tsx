import React from "react";
import styled from "../../Styles/typed-components";
import { useHomeContext } from "../Home/HomeProvider";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(34deg, rgba(190,22,185,1) 0%, rgba(179,55,57,1) 46%, rgba(175,146,8,1) 90%);
    &.active {
        width: 100%;
        transition: 1.2s;
    }
`;

const LoadingProgressbar = () => {
    const { exeLoading } = useHomeContext();
    return <Container className={exeLoading ? "active" : ""} />
};

export default LoadingProgressbar;