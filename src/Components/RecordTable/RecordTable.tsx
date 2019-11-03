import React from "react";
import styled from "../../Styles/typed-components";
import ToggleBtn from "../ToggleBtn";
import { useMainContext } from "../../Routes/Main/MainProvider";

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
    max-height: 330px;
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
        border: 1px solid #dfdfdf;
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
                }
            }
            & .details-text {
                display: inline-block;
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
        padding: 0;
        transition: .3s;
        opacity: 0;
    }
    &.job {
        padding-top: 12px;
        span {
            &:not(:nth-of-type(1)) {
                margin-left: 5px;
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
    max-width: 300px;
    word-break: break-all;
    white-space: normal;
`;
interface IRecord {
    pdf: boolean;
    sendEmail: boolean;
    restful: boolean;
    redirect: boolean;
    date: string;
    message: string;
}
const Records: Array<IRecord> = [
    {
        pdf: true,
        sendEmail: true,
        restful: true,
        redirect: true,
        date: "2018-10-11",
        message: "Hello World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    },
    {
        pdf: false,
        sendEmail: true,
        restful: false,
        redirect: true,
        date: "2018-06-11",
        message: "No World"
    }
];

const RecordTable = () => {
    const { isDetails, onToggleDetails } = useMainContext();
    const pdfColor: string = "#009688";
    const sendEmailColor: string = "#c95d5d"
    const restfulColor: string = "#3f51b5"
    const redirectColor: string = "#bd9210";
    
    return (
        <Container>
            <ExtendedToggleBtn className={"extended-btn"} text={"보기"} onChange={onToggleDetails}/>
            <Options>
                <Option>
                    <svg fill={pdfColor} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
                    <OptionText style={{color: pdfColor}}>PDF</OptionText>
                </Option>
                <Option>
                    <svg fill={sendEmailColor} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    <OptionText style={{color: sendEmailColor}}>Send Email</OptionText>
                </Option>
                <Option>
                    <svg fill={restfulColor} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.666 8.334v3.666l1.463-2.215-1.463-1.451zm-3.092 4.167c.66-.384 1.242-.864 1.758-1.447v1.369c-.445.393-.926.731-1.449 1.018l-.309-.94zm-3.255 2.041c-.652.083-1.57.125-2.319.125v-.97c.688 0 1.551-.037 2.152-.113l.167.958zm2.789-.725l-.036.015c-.586.246-1.22.437-1.91.573l-.167-.958c.655-.131 1.257-.315 1.809-.556l.304.926zm10.892-13.817l-3 11-4.064-3.62 3.9-4.117-5.229 3.614-3.607-.877 12-6zm-3.015 14.779c0 4.546-5.777 9.221-8.221 9.221h-8.764v-22h11.527l-4 2h-5.527v18h5.938c4.155 0 2.638-6 2.638-6 3.349.921 6.003.403 6.003-3.21.28.65.406 1.318.406 1.989z"/></svg>
                    <OptionText style={{color: restfulColor}}>RESTFul</OptionText>
                </Option>
                <Option>
                    <svg fill={redirectColor} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 1.599zm6.061 4.045c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.449-1-1z"/></svg>
                    <OptionText style={{color: redirectColor}}>Redirect</OptionText>
                </Option>
            </Options>
            <RecoredBox>

            </RecoredBox>
            <TableBox>
                <TableScroll>
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
                                Records.map((record, key) => {
                                    return (
                                        <>
                                            <Tr className={`${isDetails ? "active" : ""} simple`}>
                                                <Td>
                                                    <Text className={"details-text"}>No.</Text>
                                                    { key }
                                                </Td>
                                                <Td className={"job"}>
                                                    <Text className={"details-text"}>Job</Text>
                                                    {   record.pdf && 
                                                            <TableIcon bgColor={pdfColor}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.666 8.334v3.666l1.463-2.215-1.463-1.451zm-3.092 4.167c.66-.384 1.242-.864 1.758-1.447v1.369c-.445.393-.926.731-1.449 1.018l-.309-.94zm-3.255 2.041c-.652.083-1.57.125-2.319.125v-.97c.688 0 1.551-.037 2.152-.113l.167.958zm2.789-.725l-.036.015c-.586.246-1.22.437-1.91.573l-.167-.958c.655-.131 1.257-.315 1.809-.556l.304.926zm10.892-13.817l-3 11-4.064-3.62 3.9-4.117-5.229 3.614-3.607-.877 12-6zm-3.015 14.779c0 4.546-5.777 9.221-8.221 9.221h-8.764v-22h11.527l-4 2h-5.527v18h5.938c4.155 0 2.638-6 2.638-6 3.349.921 6.003.403 6.003-3.21.28.65.406 1.318.406 1.989z"/></svg>
                                                            </TableIcon>
                                                    }
                                                    {
                                                        record.sendEmail &&
                                                            <TableIcon bgColor={sendEmailColor}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                                                            </TableIcon>
                                                    }
                                                    {
                                                        record.restful && 
                                                            <TableIcon bgColor={restfulColor}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.666 8.334v3.666l1.463-2.215-1.463-1.451zm-3.092 4.167c.66-.384 1.242-.864 1.758-1.447v1.369c-.445.393-.926.731-1.449 1.018l-.309-.94zm-3.255 2.041c-.652.083-1.57.125-2.319.125v-.97c.688 0 1.551-.037 2.152-.113l.167.958zm2.789-.725l-.036.015c-.586.246-1.22.437-1.91.573l-.167-.958c.655-.131 1.257-.315 1.809-.556l.304.926zm10.892-13.817l-3 11-4.064-3.62 3.9-4.117-5.229 3.614-3.607-.877 12-6zm-3.015 14.779c0 4.546-5.777 9.221-8.221 9.221h-8.764v-22h11.527l-4 2h-5.527v18h5.938c4.155 0 2.638-6 2.638-6 3.349.921 6.003.403 6.003-3.21.28.65.406 1.318.406 1.989z"/></svg>
                                                            </TableIcon>
                                                    }
                                                    {
                                                        record.redirect && 
                                                            <TableIcon bgColor={redirectColor}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20 3c0-1.657-1.344-3-3-3s-3 1.343-3 3c0 .312.061.606.149.889l-4.21 3.157c.473.471.878 1.01 1.201 1.599l4.197-3.148c.477.316 1.048.503 1.663.503 1.656 0 3-1.343 3-3zm-2 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1zm3 12.062c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.396 1.195 1.509 2.062 2.836 2.062zm-1-3c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.448-1-1zm-20-.062c0 2.761 2.238 5 5 5s5-2.239 5-5-2.238-5-5-5-5 2.239-5 5zm2 0c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm7.939 4.955l4.21 3.157c-.088.282-.149.576-.149.888 0 1.657 1.344 3 3 3s3-1.343 3-3-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.589-.729 1.127-1.202 1.599zm6.061 4.045c0-.551.448-1 1-1s1 .449 1 1-.448 1-1 1-1-.449-1-1z"/></svg>
                                                            </TableIcon>
                                                    }
                                                </Td>
                                                <Td>
                                                    <Text className={"details-text"}>DATE</Text>
                                                    { record.date }
                                                </Td>
                                                <Td>
                                                    <DeleteBtn><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></DeleteBtn>
                                                </Td>
                                            </Tr>
                                            <Tr className={`${isDetails ? "active" : ""} details`}>
                                                <Td className={"td-msg"} colSpan={4}>
                                                    <Text className={"details-text"}>Message</Text>
                                                    <Msg>{ record.message }</Msg>
                                                </Td>
                                            </Tr>
                                            <Tr className={"tmp"}>
                                                <Td></Td>
                                            </Tr>
                                        </>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </TableScroll>
            </TableBox>
        </Container>
    )
};

export default RecordTable