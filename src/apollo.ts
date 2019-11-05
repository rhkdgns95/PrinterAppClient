//.2
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { InMemoryCache, HttpLink } from "apollo-boost";
import { Grouping, GroupResult } from "./Types/types";
import { createHttpLink } from "apollo-link-http";
import { ApolloCache } from "apollo-cache";

// function getGroupList() {
//     return JSON.stringify(localStorage.getItem("X-GROUPING"));
// }

const httpLink = new HttpLink({ uri: "http://localhost:4000/appGraphql"});
const middlewareLink = new ApolloLink((operation: Operation, forward: any) => {
    // console.log("MiddleWares: ", JSON.stringify(localStorage.getItem('X-GROUPING')) || "");
    const token = localStorage.getItem('X-GROUPING');
    // console.log("TOKEN: ", token);
    operation.setContext({
        headers: {
            "X-GROUPING": token
        }
    });
    return forward(operation);
});

const cache = new InMemoryCache();
const link = middlewareLink.concat(httpLink);

// const link = new HttpLink({ uri: "http://localhost:4000/appGraphql"});

const getCacheData = () => {
    try {
        const groupList = JSON.parse(localStorage.getItem("X-GROUPING") || "");
        return groupList;
    } catch(error) {
        return null;
    } 
}
const getCacheResultData = () => {
    try {
        const allResult = JSON.parse(localStorage.getItem("X-RESULT") || "");
        return allResult; 
    } catch(error) {
        return null;
    }
}

cache.writeData({
    data: {
        groups: {
            __typename: "Groups",
            groupList: getCacheData()    
        },
        result: {
            __typename: "Result",
            resultList: getCacheResultData()
        }
    }
});

export const client = new ApolloClient({
    cache,
    link,
    defaultOptions: { 
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        },
        // query: GET_ALL_GROUPING
    },
    resolvers: {
        Query: {
            GetGrouping: (_, { index }, { cache }) => {
                const groups: Grouping[] | null = JSON.parse(localStorage.getItem("X-GROUPING") || "");
                if(groups) {
                    const group = groups.find((group, key) => {
                        return key === index;
                    })
                    return group;
                } 
            }
        },
        Mutation: {
            CreateGrouping: (_, data: Grouping, { cache }) => {
                 
                const x_grouping = localStorage.getItem("X-GROUPING") || "";
                if(x_grouping === "") { // 없는 데이터
                    // console.log("x_grouping 데이터 존재하지 않음!");
                } else { // 데이터가 존재하는경우,
                    // console.log("x_grouping 데이터 존재!");
                    // console.log("Input Data: ", data);
                    const groupList: Array<any> = JSON.parse(x_grouping);
                    const { groupName, pdf, redirect, restful, sendEmail } = data;
                    const definedData = {
                        __typename: "GroupItem",
                        groupName,
                        pdf: {
                            __typename: "ItemPDF",
                            ...pdf
                        },
                        sendEmail: {
                            __typename: "ItemSendEmail",
                            ...sendEmail
                        },
                        redirect: {
                            __typename: "ItemRedirect",
                            ...redirect
                        },
                        restful: {
                            __typename: "ItemRestful",
                            ...restful
                        } 
                    };
                    groupList.push(definedData);
                    localStorage.setItem("X-GROUPING", JSON.stringify(groupList));
                    const {} = groupList;
                    cache.writeData({
                        data: {
                            groups: {
                                __typename: "Groups",
                                groupList: groupList.map(group => group)
                            }
                        }
                    });
                    return data;
                }
                
                
                // const groups = JSON.parse(`"${x_grouping}"`);
                // console.log(" Current Groups: ", groups);
                // cache.writeData({
                //     data: {
                //         ...data
                //     }
                // });
                
                return data;
            },
            UpdateGrouping: (_, {updatedGroup}: {updatedGroup: Grouping}, { cache }) => {
                const { groupName } = updatedGroup;
                const groups = JSON.parse(localStorage.getItem("X-GROUPING") || "");
                if(groups) {
                    const newGroups = groups.map(group => {
                        if(group.groupName === groupName) {
                            return {
                                __typename: "GroupItem",
                                ...group,
                                pdf: {
                                    ...group.pdf,
                                    ...updatedGroup.pdf
                                },
                                sendEmail: {
                                    ...group.sendEmail,
                                    ...updatedGroup.sendEmail
                                },
                                redirect: {
                                    ...group.redirect,
                                    ...updatedGroup.redirect
                                },
                                restful: {
                                    ...group.restful,
                                    ...updatedGroup.restful
                                }
                            };
                        } else {
                            return group;
                        }
                    });
                    localStorage.setItem("X-GROUPING", JSON.stringify(newGroups));
                    cache.writeData({
                        data: {
                            groups: {
                                __typename: "Groups",
                                groupList: newGroups.map(group => group)
                            }
                        }
                    });
                    return {
                        groupName
                    };
                }
            },
            DeleteGrouping: (_, { groupName }, { cache }) => {
                const groups: Grouping[] | null = JSON.parse(localStorage.getItem("X-GROUPING") || "");
                if(groups) {
                    const newGroups: Grouping[] | null = groups.filter(group => group.groupName !== groupName);
                    if(newGroups) {
                        localStorage.setItem("X-GROUPING", JSON.stringify(newGroups));
                        cache.writeData({
                            data: {
                                groups: {
                                    __typename: "Groups",
                                    groupList: newGroups.map(group => group)
                                }
                            }
                        });
                        return {
                            groupName
                        };
                    }
                } 
                return null;
            },
            CreateResult: (_, result: GroupResult, { cache }) => {
                const { isPdf, isSendEmail, isRedirect, isRestful, message, date } = result;
                const newResult = {
                    __typename: "Result",
                    isPdf,
                    isSendEmail,
                    isRedirect,
                    isRestful,
                    message,
                    date
                };
                
                const strResults = localStorage.getItem("X-RESULT") || "";
                const strGroupList = localStorage.getItem("X-GROUPING") || "";
                let newResults: Array<any> = [];
                let newGroupList: Array<any> = [];

                if(strResults !== "") {
                    newResults = JSON.parse(strResults);
                } 
                if(strGroupList !== "") {
                    newGroupList = JSON.parse(strGroupList);
                }
                newResults.push(newResult);
                localStorage.setItem("X-RESULT", JSON.stringify(newResults || ""));
                cache.writeData({
                    data: {
                        result: {
                            __typename: "Result",
                            resultList: [...newResults]
                        }
                    }
                });
                
                return null;
            },
            DeleteResult: (_, { index }, { cache }) => {
                const strResults = localStorage.getItem("X-RESULT") || ""
                if(strResults !== "") {
                    const results: Array<any> = JSON.parse(strResults);
                    const newResults: Array<any> = results.filter((_, key) => index !== key);
                    localStorage.setItem("X-RESULT", JSON.stringify(newResults));
                    cache.writeData({
                        data: {
                            result: {
                                __typename: "Result",
                                resultList: [...newResults]
                            }
                        }
                    });
                }
                return null;
            }
        }
    }
});


// .1
// import ApolloClient, { Operation, InMemoryCache, HttpLink, ApolloLink } from "apollo-boost";
// import { Grouping } from "./Types/types";

// function getGroupList() {
//     return JSON.stringify(localStorage.getItem("X-GROUPING"));
// }

// export const client = new ApolloClient({
//     clientState: {
//         defaults: {
//             groups: {
//                 __typename: "Group",
//                 groupList: getGroupList()
//             }
//         },
//         resolvers: {
//             Query: {
//                 GetAllGrouping: (_, __, { cache }) => {
//                     const groups = JSON.parse(localStorage.getItem("X-GROUPING") || "");
//                     // cache.writeData({
//                     //     data: {
//                     //         __typename: "AllGrouping",
//                     //         ...groups
//                     //     }
//                     // });
//                     return null;
//                 }
//             },
//             Mutation: {
//                 CreateGrouping: (_, data: Grouping, { cache }) => {
//                     console.log("Create Grouping");
//                     const x_grouping = localStorage.getItem("X-GROUPING") || "";
//                     if(x_grouping === "") { // 없는 데이터

//                     } else { // 데이터가 존재하는경우,
//                         console.log("Input Data: ", data);
//                         const groupList: Array<any> = JSON.parse(x_grouping);
//                         console.log("Ago Group List: ", JSON.parse(x_grouping));
//                         const { groupName, pdf, redirect, restful, sendEmail } = data;
//                         const definedData = {
//                             __typename: "GroupItem",
//                             groupName,
//                             pdf: {
//                                 __typename: "ItemPDF",
//                                 ...pdf
//                             },
//                             sendEamil: {
//                                 __typenamae: "ItemSendEmail",
//                                 ...sendEmail
//                             },
//                             redirect: {
//                                 __typename: "ItemRedirect",
//                                 ...redirect
//                             },
//                             restful: {
//                                 __typename: "ItemRestful",
//                                 ...restful
//                             } 
//                         };
//                         console.log("definedData: ", definedData);
//                         groupList.push(definedData);
//                         console.log("New GroupList: ", groupList);
//                         localStorage.setItem("X-GROUPING", JSON.stringify(groupList));
//                         const {} = groupList;
//                         cache.writeData({
//                             data: {
//                                 groups: {
//                                     __typename: "Group",
//                                     groupList: groupList.map(group => group)
//                                 }
//                             }
//                         });
//                         return data;
//                     }
                    
                    
//                     // const groups = JSON.parse(`"${x_grouping}"`);
//                     // console.log(" Current Groups: ", groups);
//                     console.log("Create Grouping: ", data);
//                     // cache.writeData({
//                     //     data: {
//                     //         ...data
//                     //     }
//                     // });
                    
//                     return data;
//                 }
//             }
//         }
//     },
//     uri: "http://localhost:4000/appGraphql"
// });

