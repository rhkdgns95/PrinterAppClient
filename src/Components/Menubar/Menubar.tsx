import React from "react";
import styled from "../../Styles/typed-components";
import { Grouping } from "../../Types/types";

const Container = styled.div`
    position: absolute;
    top: -410px;
    right: -410px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: black;
    opacity: 0;
    &::before {
        opacity: 0;
        content: "";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 405px;
        height: 405px;
        border-radius: 50%;
        border: 2px solid cornflowerblue;
        transition: .3s;
    }
    &.active {
        transition: ease-in opacity .3s, background .4s, top .4s, right .4s;
        &::before {
            opacity: 1;
        }
        top: -200px;
        right: -200px;
        opacity: 1;
        // background: linear-gradient(0deg, rgba(34,40,195,1) 0%, rgba(121,184,204,1) 0%, rgba(232,141,181,1) 0%, rgba(206,25,99,1) 56%);
        background: linear-gradient(90deg, rgba(92,124,218,1) 0%, rgba(91,17,203,1) 100%)
    }
`;
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
const Item = styled.span`
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transition: .2s;
    cursor: pointer;
    & svg {
        transition: .2s;
        fill: #5b4fd4;
    }
    &:hover {
        background-color: #ff9a0e;
        & svg {
            transform: rotateY(-360deg);
            fill: white;
        }
    }
`;
const StartItem = styled(Item)`
    top: 215px;
    left: 30px;
`;
const InfoItem = styled(Item)`
    top: 275px;
    left: 72px;
`;
const DeleteItem = styled(Item)`
    top: 320px;
    left: 132px;
`;
const CancelItem = styled(Item)`
    top: 220px;
    left: 138px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: 1px solid white;
    transform: rotateY(-360deg);
    & svg {
        fill: white;
    } 
    &:hover {
        background-color: white;
        & svg {
            fill: #5b4fd4;
        }
    }
`;
interface IProps {
    className: string;
    toggleDetails: () => void;
    onCancelCardIndex: () => void;
    handleDeleteGroup: (deletedGrouping: Grouping) => void;
    selectedGrouping: Grouping;
    handleStartForGrouping: () => any;
}
const Menubar: React.FC<IProps> = ({
    className,
    toggleDetails,
    onCancelCardIndex,
    handleDeleteGroup,
    selectedGrouping,
    handleStartForGrouping
}) => (
    <Container className={className}>
        <Wrapper>
            <StartItem onClick={ e => { handleStartForGrouping(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.327 14.859c-.217-.648.031-1.333.595-1.734.284-.202.609-.306.932-.306.317 0 .633.101.902.308-.21-.704-.851-1.127-1.516-1.127-.312 0-.63.093-.911.294-.882.629-.879 1.938-.002 2.565zm2.639 6.434c.7.235 2.868.835 5.38 2.707l4.654-3.319c-1.208-1.692-.875-2.876-2.075-4.558-.464-.652-.885-1.084-1.565-1.084-.179 0-.313.027-.573.075l.422.592c.106.148.071.355-.077.461-.149.106-.355.071-.461-.077l-.377-.528c-.109-.153-.285-.241-.469-.241-.068 0-.06-.007-.978.205l.513.718c.105.148.071.354-.077.461-.148.106-.354.072-.461-.078l-.444-.622c-.109-.153-.285-.241-.467-.241-.083 0-.067-.005-1.01.234l.543.759c.105.148.07.354-.078.461-.147.106-.354.071-.46-.077l-2.198-3.077c-.289-.406-.854-.5-1.26-.211s-.501.854-.211 1.26l3.246 4.55c-.87-.322-2.217-.463-2.467.44-.149.538.282.966.95 1.19zm-4.966-15.293h4v4.089c-.246-.052-.497-.089-.758-.089h-.002c-.745 0-1.462.23-2.073.666-.521.373-.91.881-1.167 1.451v-6.117zm2.562 15.972l-.562.028c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11c0 .804-.092 1.586-.256 2.342-.395-.179-.849-.303-1.385-.303-.234 0-.428.024-.615.054.161-.673.256-1.371.256-2.093 0-4.962-4.037-9-9-9s-9 4.038-9 9 4.037 9 9 9h.011c-.071.652.093 1.36.551 1.972z"/></svg>
            </StartItem>
            <InfoItem onClick={ e => { toggleDetails(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>
            </InfoItem>
            <DeleteItem onClick={ e => { handleDeleteGroup(selectedGrouping); onCancelCardIndex();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
            </DeleteItem>
            <CancelItem onClick={ e => { onCancelCardIndex(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </CancelItem>
        </Wrapper>
    </Container>
);

export default Menubar;