import React from "react";
import styled from "../../Styles/typed-components";
import RecordTable from "../RecordTable";

const Container = styled.div`
    background-color: #e8ebef;
`;
const Title = styled.h3`
    text-align: center;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0,0,0,.12);
    margin-top: 40px;
    margin-bottom: 50px;
    color: #2d72dd;
`;
const RecordBox: React.FC<any> = ({
}) => {
    return (
        <Container>
            <Container>
                <Title>Recent Records</Title>
                <RecordTable />
            </Container>
        </Container>
    );
};

export default RecordBox;