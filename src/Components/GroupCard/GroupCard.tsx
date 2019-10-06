import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    width: 180px;
    height: 180px;
    position: relative;
    transition: .3s;
    border-radius: 12px;
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
            border: 1px solid ${props => props.theme.blueColor};
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
    border-left: 70px solid ${props => props.theme.blueColor};
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
    background-color: ${props => props.theme.blueColor};
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
    border: .5px solid #dfdfdf;
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
        margin-top: -30px;
        fill: darkgray;
    }
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
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm12.002-14.315l-12.002-7-11.998 7 11.998 7 12.002-7z"/></svg>
        </GroupIcon>
        <Label htmlFor={`group_key_${id}`}/>
    </Container>
);

export default GroupCard;