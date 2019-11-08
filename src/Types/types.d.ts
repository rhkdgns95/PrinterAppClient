import { GetDocsQueryResponse } from "./resolvers";

interface ITheme {
    greenColor: string;
    blueColor: string;
};
type T_pdf = {
    isChecked: boolean,
    fileName: string,
    filePath: string
};
type T_sendemail = {
    isChecked: boolean,
    email: string,
    destinationEmails: string;
    password: string,
    mailTitle: string,
    mailContent: string,
};
type T_restful = {
    isChecked: boolean,
    isLogging: boolean,
    isSendFile: boolean,
    data: string
};
type T_redirect = {
    isChecked: boolean,
    port: string,
    ipAddress: string
};

export type Grouping = {
    groupName: string,
    pdf: T_pdf,
    sendEmail: T_sendemail,
    restful: T_restful,
    redirect: T_redirect
};
// Result

export type GroupResult = {
    ok: boolean;
    isPdf: boolean;
    isSendEmail: boolean;
    isRestful: boolean;
    isRedirect: boolean;
    message: string;
    date: string;
}
export type AutoSearch = {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}
// Context
interface IMainContext {
    loading: boolean;
    step: number;
    onStep: (newStep: number) => any;
    isDetails: boolean;
    onToggleDetails: () => any;
    mutationDeleteResult: ({variables: {index: number}}) => any;
    loadingGetDocs: boolean;
    dataGetDocs?: GetDocsQueryResponse;
    autoSearch: AutoSearch;
}