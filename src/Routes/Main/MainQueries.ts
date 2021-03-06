import { gql } from "apollo-boost";

export const GET_ALL_RESULT = gql`
    {
        result @client {
            resultList {
                ok
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
export const GET_DOCS = gql`
    { 
        GetDocs {
            ok
            error
            docs {
                accepted
                title
                preview_path
            }
        }
    }
`;