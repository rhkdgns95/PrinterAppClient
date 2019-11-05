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
                    destinationEmails
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
                destinationEmails
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
`;

export const START_FOR_GROUPING = gql`
    mutation startForGrouping($groupId: Int!) {
        StartForGrouping(groupId: $groupId) {
            ok
            error
            grouping {
                groupName
                pdf {
                    isChecked
                    filePath
                    fileName
                }
                sendEmail {
                    isChecked
                    email
                    password
                    destinationEmails
                    mailTitle
                    mailContent
                }
                restful {
                    isChecked
                    isLogging
                    isSendFile
                    data
                }
                redirect {
                    isChecked
                    ipAddress
                    port
                }
            }
            message
        }
    }
`;

export const CREATE_RESULT = gql`
    mutation createResult(
        $isPdf: Boolean!
        $idSendEmail: Boolean!
        $isRedirect: Boolean!
        $isRestful: Boolean!
        $message: String!
        $date: String!
    ) {
        CreateResult(
            isPdf: $isPdf
            isSendEmail: $isSendEmail
            isRedirect: $isRedirect
            isRestful: $isRestful
            message: $message
            date: $date
        ) @client
    }
`;
