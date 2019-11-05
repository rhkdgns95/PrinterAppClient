import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-bottom: 25px;
    margin-right: 15px;
    &.active {
        & input {
            & ~ label {
                cursor: pointer;
                background-color: white;
            }
            &:checked {
                & ~ label {
                    border: 2px solid #2ebfb2;
                    & svg {
                        fill: #2ebfb2;
                    }
                }
                & ~ .details-text {
                    color: #2ebfb2;
                }
            }
        }
        & .details-text {
            color: black;
        }
    }
`;
const InputCheckbox = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    &:focus {
        outline: none;
    }
    &:checked {
        & ~ label {
            border: 2px solid #0764ff;
            box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 4px 6px rgba(0,0,0,.42);
            background-color: inherit;
            & svg {
                fill: #0764ff;
            }
        }
        & ~ .details-text {
            color: #00214a;
        }
    }
`;
const Label = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #dfdfdf;    
    transition: .3s;
    background-color: #ececec;
    & svg {
        fill: #dfdfdf;
        transition: .3s;
    }
`;
const Text = styled.span`
    position: absolute;
    bottom: -27px;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    color: #dfdfdf;
    transition: .3s;
`;
interface IProps {
    className: string;
    name: string;
    text: string;
    type: "pdf" | "sendEmail" | "restful" | "redirect";
    checked: boolean;
    readOnly: boolean;
    onChange: React.ChangeEvent<HTMLInputElement> | any;
}
const getPath = (name: "pdf" | "sendEmail" | "restful" | "redirect"): string => {
    const svgPdfPath: string = "M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z";
    const svgSendEmailPath: string = "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z";
    const svgRESTFulPath: string = "M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z";
    const svgRedirectPath: string = "M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 1.599zm6.061 4.045c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.449-1-1z";
    switch(name) {
        case "pdf": return svgPdfPath;
        case "sendEmail": return svgSendEmailPath;
        case "restful": return svgRESTFulPath;
        case "redirect": return svgRedirectPath;
        default: return "No-Data";
    }
}
const CheckboxDetails: React.FC<IProps> = ({
    className,
    name,
    text,
    type,
    checked,
    readOnly,
    onChange,
}) => (
    <Container className={className}>
        <InputCheckbox name={name} id={`checkbox_details_${type}`} type={"checkbox"} checked={checked} readOnly={readOnly} onChange={onChange}/>
        <Label htmlFor={`checkbox_details_${type}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                <path d={getPath(type)}/>
            </svg>
        </Label>
        <Text className={"details-text"}> { text } </Text>
    </Container>
);

export default CheckboxDetails;