import React from "react";
import styled from "../../Styles/typed-components";
import ToggleBtn from "../ToggleBtn";
import { useMainContext, GetAllResult } from "../../Routes/Main/MainProvider";
import { useApolloClient } from "react-apollo";
import { useHomeContext } from "../../Routes/Home/HomeProvider";
import { getTime } from "../../Utils/getTime";
import { GroupResult } from "../../Types/types";

const Container = styled.div`

`;
const TableBox = styled.div`
    width: 90%;
    margin: 0 auto;
`;
const TableScroll = styled.div`
    width: 100%;
    background-color: #e8ebef;
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 322px;
    box-sizing: content-box;
    padding-right: 8px;
    padding-left: 5px;
    ::-webkit-scrollbar {
        width: 5px;
      }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 20px;
    }   
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #7c9ac5;
        border-radius: 20px;
        transition: .3s;
        cursor: pointer;
        &:hover {
            background: #57b2e8;
        }
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:active {
        background: ${props => props.theme.blueColor};
        cursor: pointer;
    }
`;

const Table = styled.table`
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
    white-space: nowrap;
    text-align: center;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody`
   & > tr {
        // border: 1px solid #dfdfdf;
        &:not(:nth-of-type(1)) {
            &:nth-of-type(2n +1) {
                padding-top: 30px;
            }
        }
        &.tmp {
            border: 0;
            & > td {
                padding: 5px;
            }
        }
        &.simple {
            border-bottom: 0;
            background-color: white;
            
            &:not(.active) {
                box-shadow: 0 2px 4px rgba(0,0,0,.24);
                &:hover {
                    transition: .3s;
                    box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 4px 6px rgba(0,0,0,.32);
                }
            }
        }
        &.details {
            border-top: 0;
            height: 0;
        }
        &.active { 
            background-color: white;
            & > td {
                display: flex;
                flex-flow: wrap;
                align-items: center;
            }
            &.details {
                border-top: 0;
                height: 0;
                & > .td-msg {
                    font-size: 13px;
                    padding: 10px;
                    opacity: 1;
                    span {
                        transition: .3s;
                        font-size: 11px;
                    }
                }
            }
            & .details-text {
                display: inline-block;
                &.success {
                    // color: #147dff;
                }
                &.fail {
                    // color: #f44336;
                }
            }
        }
   }
`;
const Tr = styled.tr`
`;
const Th = styled.th`
    display :none;
    padding: 5px;
    color: ${props => props.theme.blueColor};
`;

const Td = styled.td`
    padding: 10px;
    color: #898989;
    font-size: 11px;
    &.td-msg {
        width: 100%;
        font-size: 0;
        span {
            font-size: 0;
        }
        padding: 0;
        transition: .3s;
        opacity: 0;
    }
    &.job {
        text-align: left;
        padding-top: 12px;
        span {
            &:not(:nth-of-type(1)) {
                margin-left: 5px;
            }
        }
    }
    &.icon-ok {
        // padding-top: 16px;
        &.success {
            & > svg {
                fill: #147dff;
            }
        }
        &.fail {
            & > svg {
                fill: #f44336;
            }
        }
    }
`;
const DeleteBtn = styled.button`
    border: 0;
    border-radius: 6px;
    padding: 5px;
    background-color: white;
    cursor: pointer;
    & > svg {
        transition: .3s;
        fill: #ff9c9c;
    }
    &:focus,
    &:active {
        outline: none;
        border: none;
        box-shadow: none;
    }
    &:hover {
        & > svg {
            fill: red;
        }
    }
`;
const Options = styled.div`
    display: flex;
    width: fit-content;
    margin-left: auto;
    margin-right: 10px;
    opacity: .7;
    margin-top: 10px;
    margin-bottom: 5px;
`;
const Option = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    padding-top: 0;
`;
const OptionText = styled.span`
    color: #9e9e9e;
    font-size: 10px;
    padding-left: 4px;
`;
interface ITableIconProps {
    bgColor: string;
}
const TableIcon = styled.span<ITableIconProps>`
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: ${props => props.bgColor};
    fill: white;
    border-radius: 3px;
    box-shadow:  0 2px 4px rgba(0,0,0,.42);
    & > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;
const RecoredBox = styled.div`
    width: 90%;
    margin: 0 auto;
`;
const ExtendedToggleBtn = styled(ToggleBtn)`
    margin-left: auto;
    margin-right: 20px;
`;
const Text = styled.span`
    color: #9e9e9e;
    margin-right: 10px;
    display: none;
    color: #4b6771;
    font-style: italic;
`;
const Msg = styled.span`
    max-width: 200px;
    word-break: break-word;
    white-space: normal;
    text-align: left;
    font-size: 11px;
    &.success {
        color: #147dff;
    }
    &.fail {
        color: #f44336;
    }
`;
const Empty = styled.div`
    display: block;
    margin: 10px;
    position: relative;
    padding: 50px;
    background-color: white;
    color: #aeaeae;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .5;
        fill: #dfdfdf;
    }
`;
const EmptyText = styled.span`
    position: relative;
    z-index: 2;
    text-shadow: 0 1px 1px rgba(0,0,0,.1);
`;

const COLOR_PDF: string = "#009688";
const COLOR_SEND_EMAIL: string = "#c95d5d"
const COLOR_RESTFUL: string = "#3f51b5"
const COLOR_REDIRECT: string = "#bd9210";

const RecordTable = () => {
    const { cache } = useApolloClient();
    const resultList = GetAllResult(cache);
    const { exeLoading, onExeLoading } = useHomeContext();
    const { isDetails, onToggleDetails, mutationDeleteResult } = useMainContext();
    const handleMutationDeleteResult = (index: number) => {
        onExeLoading();
        setTimeout(() => {
            mutationDeleteResult({
                variables: {
                    index
                }
            });
        }, 1500);
    };

    return (
        <Container>
            {
                resultList && (
                    <>
                        <ExtendedToggleBtn className={"extended-btn"} text={"보기"} onChange={onToggleDetails}/>
                        <Options>
                            <Option>
                                <svg fill={COLOR_PDF} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
                                <OptionText style={{color: COLOR_PDF}}>PDF</OptionText>
                            </Option>
                            <Option>
                                <svg fill={COLOR_SEND_EMAIL} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                                <OptionText style={{color: COLOR_SEND_EMAIL}}>Send Email</OptionText>
                            </Option>
                            <Option>
                                <svg fill={COLOR_RESTFUL} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.666 8.334v3.666l1.463-2.215-1.463-1.451zm-3.092 4.167c.66-.384 1.242-.864 1.758-1.447v1.369c-.445.393-.926.731-1.449 1.018l-.309-.94zm-3.255 2.041c-.652.083-1.57.125-2.319.125v-.97c.688 0 1.551-.037 2.152-.113l.167.958zm2.789-.725l-.036.015c-.586.246-1.22.437-1.91.573l-.167-.958c.655-.131 1.257-.315 1.809-.556l.304.926zm10.892-13.817l-3 11-4.064-3.62 3.9-4.117-5.229 3.614-3.607-.877 12-6zm-3.015 14.779c0 4.546-5.777 9.221-8.221 9.221h-8.764v-22h11.527l-4 2h-5.527v18h5.938c4.155 0 2.638-6 2.638-6 3.349.921 6.003.403 6.003-3.21.28.65.406 1.318.406 1.989z"/></svg>
                                <OptionText style={{color: COLOR_RESTFUL}}>RESTFul</OptionText>
                            </Option>
                            <Option>
                                <svg fill={COLOR_REDIRECT} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 1.599zm6.061 4.045c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.449-1-1z"/></svg>
                                <OptionText style={{color: COLOR_REDIRECT}}>Redirect</OptionText>
                            </Option>
                        </Options>
                    </>
                )
            }
            <TableBox>
                <TableScroll>
                    {
                        resultList ? (
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>No</Th>
                                        <Th>Job</Th>
                                        <Th>Date</Th>
                                        <Th>Setting</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        resultList.map((result: GroupResult, key) => {
                                            return (
                                                <React.Fragment key={key}>
                                                    <Tr className={`${isDetails ? "active" : ""} simple`}>
                                                        <Td>
                                                            <Text className={"details-text"}>No.</Text>
                                                            { key }
                                                        </Td>
                                                        <Td className={"job"}>
                                                            <Text className={"details-text"}>Job</Text>
                                                            {   result.isPdf && 
                                                                    <TableIcon bgColor={COLOR_PDF}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
                                                                    </TableIcon>
                                                            }
                                                            {
                                                                result.isSendEmail &&
                                                                    <TableIcon bgColor={COLOR_SEND_EMAIL}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                                                                    </TableIcon>
                                                            }
                                                            {
                                                                result.isRestful && 
                                                                    <TableIcon bgColor={COLOR_RESTFUL}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.666 8.334v3.666l1.463-2.215-1.463-1.451zm-3.092 4.167c.66-.384 1.242-.864 1.758-1.447v1.369c-.445.393-.926.731-1.449 1.018l-.309-.94zm-3.255 2.041c-.652.083-1.57.125-2.319.125v-.97c.688 0 1.551-.037 2.152-.113l.167.958zm2.789-.725l-.036.015c-.586.246-1.22.437-1.91.573l-.167-.958c.655-.131 1.257-.315 1.809-.556l.304.926zm10.892-13.817l-3 11-4.064-3.62 3.9-4.117-5.229 3.614-3.607-.877 12-6zm-3.015 14.779c0 4.546-5.777 9.221-8.221 9.221h-8.764v-22h11.527l-4 2h-5.527v18h5.938c4.155 0 2.638-6 2.638-6 3.349.921 6.003.403 6.003-3.21.28.65.406 1.318.406 1.989z"/></svg>
                                                                    </TableIcon>
                                                            }
                                                            {
                                                                result.isRedirect && 
                                                                    <TableIcon bgColor={COLOR_REDIRECT}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 1.599zm6.061 4.045c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.449-1-1z"/></svg>
                                                                    </TableIcon>
                                                            }
                                                        </Td>
                                                        <Td>
                                                            <Text className={"details-text"}>DATE</Text>
                                                            { getTime(result.date) }
                                                        </Td>
                                                        <Td className={`icon-ok ${result.ok ? "success" : "fail"}`}>
                                                            <Text className={`details-text ${result.ok ? "success" : "fail"}`}>Result</Text>
                                                            {
                                                                result.ok ? 
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg> :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
                                                                    // <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"/></svg> :
                                                                    // <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"><path d="M24 11.936c0-1-.986-6.373-1.486-8.25-.714-2.689-2.471-3.686-5.009-3.686-2.283 0-4.079.617-5.336 1.158-2.05.883-3.791 1.519-6.169 1.746v-.904h-6v12h6v-.73c2.454.585 4.852 2.066 6.4 7.402.483 1.66.972 3.328 2.833 3.328 3.448 0 3.005-5.531 2.196-8.814 1.106-.466 2.767-.692 3.977-.744 1.426-.06 2.594-.858 2.594-2.506zm-20 .064h-2v-8h2v8zm15.755-1.302l1.394.167c1.075.129 1.105 1.525.051 1.584-2.749.154-5.06 1.013-6.12 1.556.43 1.748.92 3.463.92 5.534 0 2.505-.781 3.666-1.679.574-1.993-6.859-5.057-8.364-8.321-9.113v-6c2.521-.072 4.72-1.041 6.959-2.005 1.731-.745 4.849-1.495 6.416-.614 1.295.836 1.114 1.734.292 1.661l-.771-.032c-.815-.094-.92 1.068-.109 1.141 0 0 1.321.062 1.745.115.976.123 1.028 1.607-.04 1.551-.457-.024-1.143-.041-1.143-.041-.797-.031-.875 1.078-.141 1.172 0 0 .714.005 1.761.099s1.078 1.609-.004 1.563c-.868-.037-1.069-.027-1.069-.027-.75.005-.875 1.028-.141 1.115z"/></svg>
                                                            }
                                                        </Td>
                                                        <Td>
                                                            <Text className={"details-text"}>Delete</Text>
                                                            <DeleteBtn disabled={exeLoading} onClick={e => handleMutationDeleteResult(key)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></DeleteBtn>
                                                        </Td>
                                                        
                                                    </Tr>
                                                    <Tr className={`${isDetails ? "active" : ""} details`}>
                                                        <Td className={"td-msg"} colSpan={4}>
                                                            <Text className={`details-text ${result.ok ? "success" : "fail"}`}>Message</Text>
                                                            <Msg className={result.ok ? "success" : "fail"}>{ result.message }</Msg>
                                                        </Td>
                                                    </Tr>
                                                    <Tr className={"tmp"}>
                                                        <Td></Td>
                                                    </Tr>
                                                </React.Fragment>
                                            )
                                        })
                                    } 
                                </Tbody>
                            </Table>
                        ) : (
                            <Empty>
                                <EmptyText>No recent record exists.</EmptyText>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"/></svg>
                            </Empty>
                        )
                    }
                </TableScroll>
            </TableBox>
        </Container>
    )
};

export default RecordTable