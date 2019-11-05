import { Grouping } from "../Types/types";

/**
 *  InitGroupList = () => {}
 * 
 *  @param grouping 
 *  생성되는 그룹을 인자로 isChecked가
 *  false인데 데이터가 들어간 경우,
 *  빈값(초기값)으로 대체 한다.
 */
const InitGroupList: Grouping = {
    groupName: "",
    pdf: {
        isChecked: false,
        fileName: "",
        filePath: ""
    },
    restful: {
        isChecked: false,
        isLogging: false,
        isSendFile: false,
        data: ""
    },
    sendEmail: {
        isChecked: false,
        email: "",
        password: "",
        destinationEmails: "",
        mailTitle: "",
        mailContent: ""
    },
    redirect: {
        isChecked: false,
        ipAddress: "",
        port: ""
    }
};

export const nullGrouping = (grouping: Grouping): Grouping => {
    const { pdf, sendEmail, restful, redirect } = grouping;
    let nullGrouping: Grouping = grouping;
    if(!pdf.isChecked) {
        nullGrouping.pdf = {
            ...InitGroupList.pdf
        };
    }
    if(!sendEmail.isChecked) {
        nullGrouping.sendEmail = {
            ...InitGroupList.sendEmail
        };
    }
    if(!restful.isChecked) {
        nullGrouping.restful = {
            ...InitGroupList.restful
        };
    }
    if(!redirect.isChecked) {
        nullGrouping.redirect = {
            ...InitGroupList.redirect
        };
    }

    return nullGrouping;
};