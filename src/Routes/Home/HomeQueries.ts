import { gql } from "apollo-boost";

export const GET_ALL_GROUPING = gql`
    {
        groups @client {
            groupList {
                groupName
                pdf {
                    isChecked
                    fileName
                    filePath
                }
                sendEmail {
                    isChecked
                    email
                    password
                    mailTitle
                    mailContent
                }
                redirect {
                    isChecked
                    port
                    ipAddress
                }
                restful {
                    isChecked
                    isLogging
                    isSendFile
                    data
                }
            }
        }
    }
`;
export const GET_GROUPING = gql`
    query getGrouping($index: number) {
        GetGrouping(index: $index) @client {
            groupName
            pdf {
                isChecked
                fileName
                filePath
            }
            sendEmail {
                isChecked
                email
                password
                mailTitle
                mailContent
            }
            redirect {
                isChecked
                port
                ipAddress
            }
            restful {
                isChecked
                isLogging
                isSendFile
                data
            }
        }
    }
`;

export const CREATE_GROUPING = gql`
    mutation createGrouping (
        $groupName: String!
        $pdf: String!
        $sendEmail: String!
        $restful: String!
        $redirect: String! 
    ) {
        CreateGrouping(
            groupName: $groupName
            pdf:$pdf 
            sendEmail: $sendEmail
            restful: $restful
            redirect: $redirect
        ) @client 
    }
`;
export const DELETE_GROUPING = gql`
    mutation delete_grouping(
        $groupName: String!
    ) {
        DeleteGrouping(
            groupName: $groupName
        ) @client {
            groupName
        }
    }
`;

export const UPDATE_GROUPING = gql`
    mutation updateGrouping(
       $updatedGroup: String!
    ) {
        UpdateGrouping (
            updatedGroup: $updatedGroup
        ) @client {
            groupName
        } 
    }
`