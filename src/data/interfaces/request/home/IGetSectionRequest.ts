export interface IGetSectionRequest {
    page: number,
    pageSize: number,
    canLoadMore?: boolean,
    sectionId?: number,
}