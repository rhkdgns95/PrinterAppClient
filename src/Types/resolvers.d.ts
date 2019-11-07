import { Grouping } from "./types";

type groups = {
    groupList: Grouping[] | null
}
type StartForGrouping = {
    ok: boolean;
    error: string | null;
    grouping: Grouping | null;
    message: string | null;
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
interface UpdateGrouping {
    groupName: string;
}
export interface UpdateGroupingResponse {
    UpdateGrouping: UpdateGrouping
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
export interface StartForGroupingMutationVariables {
    groupId: number;
    accepted: number;
}
export interface StartForGroupingMutationResponse {
    StartForGrouping: StartForGrouping;
}
export interface DeleteResultMutationVariables {
    index: number;
};
type Docs = {
    accepted: number;
    title: string;
    preview_path: string;
}
interface GetDocs {
    ok: boolean;
    error: string;
    docs: Array<Docs>;
}
export interface GetDocsQueryResponse {
    GetDocs: GetDocs;
}