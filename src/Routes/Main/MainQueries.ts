import { gql } from "apollo-boost";

export const GET_ALL_RESULT = gql`
    {
        result @client {
            resultList {
                isPdf
                isSendEmail
                isRedirect
                isRestful
                message
                date
            }
        }
    }
`;
export const DELETE_RESULT = gql`
    mutation deleteResult($index: number) {
        DeleteResult(index: $index) @client 
    }
`;