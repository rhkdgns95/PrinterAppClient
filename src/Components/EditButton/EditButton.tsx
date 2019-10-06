import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.button`
    position: relative;
    border: 2px solid #dfdfdf;
    padding: 12px 10px
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 35px;
    font-size: 13px;
    color: white;
    cursor: pointer;
    
    &:focus,
    &:active { 
        outline: none;
    }
    transition: .3s;
    & svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 14px;
        fill: white;
        transition: .3s;
    }
    &.no-cancel {
        display: none;
    }
    &.cancel {
        display: flex;
        border: 2px solid #ff9149;
        background-color: #ff9149;
    }
    &.update {
        background-color: #2ebfb2;
        border: 2px solid #2ebfb2;
    }
    &.edit {
        background-color: #34afff;
        border: 2px solid #34afff;
    }
    &:hover {
        background-color: white;
        &.cancel {
            color: #ff9149;
            & svg {
                fill: #ff9149;
            }
        }
        &.update {
            color: #2ebfb2;
            & svg {
                fill: #2ebfb2;
            }
        }
        &.edit {
            color: #34afff;
            & svg {
                fill: #34afff
            }
        }
    }
`;
interface IProps {
    type: "update" | "edit" | "cancel" | "no-cancel";
    onClick: any;
}

const EditButton: React.FC<IProps> = ({
    type,
    onClick
}) => (
    <Container className={type} onClick={onClick}>
        {
            type === "update" ? (
                <React.Fragment>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z"/></svg>
                    Update
                </React.Fragment>
            ) : type === "edit" ? (
                <React.Fragment>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                    Edit
                </React.Fragment>
                ) : (
                    <React.Fragment>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0c-3.31 0-6.291 1.353-8.459 3.522l-2.48-2.48-1.061 7.341 7.437-.966-2.489-2.488c1.808-1.808 4.299-2.929 7.052-2.929 5.514 0 10 4.486 10 10s-4.486 10-10 10c-3.872 0-7.229-2.216-8.89-5.443l-1.717 1.046c2.012 3.803 6.005 6.397 10.607 6.397 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
                        Cancel
                    </React.Fragment>
                )
        }
    </Container>
);

export default EditButton;