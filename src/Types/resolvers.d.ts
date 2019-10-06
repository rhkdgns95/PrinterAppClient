import { Grouping } from "./types";

type groups = {
    groupList: Grouping[] | null
}
export interface GetAllGrouping {
    groups: groups;
}
export interface GetGroupingQueryVariables {
    index: number;
}
export interface GetGroupingResponse {
    GetGrouping: Grouping;
}
export interface UpdateGroupingVariables {
    updatedGroup: Grouping;
}
export interface UpdateGroupingResponse {
    UpdateGrouping: Grouping;
}
export interface DeleteGroupingMutationVariables {
    groupName: string;
}
export interface DeleteGroupingResponseVariables {
    groupName: string;
}
export interface DeleteGroupingResponse {
    DeleteGrouping: DeleteGroupingResponseVariables;
}