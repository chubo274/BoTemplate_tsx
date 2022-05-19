

export const processCanLoadMore = (currentData?: any[], pageSize?: number) => {
    if ((pageSize || 0) > 0 && (currentData?.length ?? 0) === (pageSize ?? 0)) {
        return true;
    }
    return false;
}