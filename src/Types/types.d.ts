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
    password: string,
    mailTitle: string,
    mailContent: string
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