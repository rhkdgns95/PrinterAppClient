import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
`;
const Text = styled.div`
    position: relative;
    display: flex;
    width: fit-content;
    align-items: center;
    padding-left: 17px;
    font-size: 14px;
    &:nth-of-type(1) {
        margin-bottom: 10px;
    }
    color: ${props => props.theme.greenColor};
    & svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        fill: ${props => props.theme.greenColor};
    }
    &.active {
        color: #c1c1c1;
        & svg {
            fill: #c1c1c1;
        }
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            transform: translateY(-50%);
            background-color: #c1c1c1;
        }
    }
`;
interface IProps {
    text: string;
    isChecked: boolean;
}
const CheckboxResultText: React.FC<IProps> = ({
    text,
    isChecked
}) => (
    <Container>
        <Text className={isChecked ? "" : "active"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/></svg>
            { text }
        </Text>
    </Container>
);

export default CheckboxResultText;