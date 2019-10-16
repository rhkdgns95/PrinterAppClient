import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const Container = styled.div`
    width: 180px;
    height: 180px;
    position: relative;
    transition: .3s;
    border-radius: 12px;
    // background-color: #11ccea;
    // background-color: #222e2d;
    // background: linear-gradient(0deg, rgba(40,73,134,1) 0%, rgba(40,51,84,1) 98%);
    // background: linear-gradient(90deg, rgba(127,147,182,1) 0%, rgba(40,157,164,1) 53%, rgba(127,147,182,1) 100%);
    // background: linear-gradient(0deg,rgba(140,253,234,.3) 0%,rgba(110,151,254,.3) 98%);
    background:rgba(30,30,250,.22);
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0,.42);
    }
`;

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    cursor: none;
    z-index: -999;
    pointer-events: none;
    &.active {
    // &:checked {
        & ~ label {
            border: 2px solid #49d989;
        }
        & ~ .checked-icon {
            opacity: 1;
        }
    }
`;
const CheckedIcon = styled.div`
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s;
    border-bottom: 70px solid transparent;
    border-left: 70px solid #49d989;
    pointer-events: none;
    & svg {
        position: absolute;
        top: 8px;
        left: -60px;
        fill: white;
    }
`;
const NameBox = styled.div`
    position: absolute;
    top: 75%;
    left: 0;
    width: 100%;
    text-align: center;
    // background-color: #030608;
    // background: linear-gradient(0deg, rgba(34,46,45,1) 0%, rgba(77,78,113,1) 49%, rgba(34,46,45,1) 98%);
    background: linear-gradient(0deg, rgba(4,67,116,1) 0%, rgba(65,114,241,1) 49%, rgba(4,67,116,1) 100%);
`;
const GroupName = styled.h1`
    margin: 0 auto;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 450;
    font-size: 17px;
    color: white;
    padding-bottom: 3px;
    white-space: nowrap;
`;
const Label = styled.label`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,.22);
    box-shadow: 0 1px 2px rgba(0,0,0,.24), 0 2px 3px rgba(0,0,0,.24);
`;
const GroupIcon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: -30px;
        fill: white;
        opacity: 0;
        &:nth-of-type(1) {
            animation: ${keyframes => EffectIcon} 6s ease-in-out alternate infinite;
        }
        &:nth-of-type(2) {
            animation: ${keyframes => EffectIcon2} 6s ease-in-out alternate infinite;
        }
        &:nth-of-type(3) {
            animation: ${keyframes => EffectIcon3} 6s ease-in-out alternate infinite;
        }
    }
`;
const EffectIcon = keyframes`
    0% { opacity: 1; fill: #ffe8b9;}
    50% {
    }
    // 50% { opacity: 0;}
`;
const EffectIcon2 = keyframes`
    50% {opacity: 1; }
    // 100% {opacity: 0;}
`;
const EffectIcon3 = keyframes`
    0% {opacity: 0;}
    50% {opacity: 0; }
    100% {opacity: 1; fill: rgba(210,220,250.24);}
`;
interface IProps {
    className: string;
    groupName: string;
    id: number;
    handleClickCardIndex: (e) => void;
}
const GroupCard: React.FC<IProps> = ({
    className,
    groupName,
    id,
    handleClickCardIndex
}) => (
    <Container className={className}>
        <Checkbox className={className} id={`group_key_${id}`} type={"radio"} name={"grouping_checkbox"} onChange={handleClickCardIndex}/>
        <CheckedIcon className={"checked-icon"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"/></svg>
        </CheckedIcon>
        <NameBox>
            <GroupName>{ groupName }</GroupName>
        </NameBox>
        <GroupIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm-9 8.23l8 4.363v8.607l-8-4.268v-8.702zm10 12.97v-8.6l8-4.269v8.6l-8 4.269z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-6.91 14.554v-8.6l8-4.269v8.6l-8 4.269z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-16.91 1.584l8 4.363v8.607l-8-4.268v-8.702z"/></svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"/></svg> */}
        </GroupIcon>
        <Label htmlFor={`group_key_${id}`}/>
    </Container>
);

export default GroupCard;