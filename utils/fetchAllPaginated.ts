export async function fetchAllPaginated(
    token: string,
    asyncFn: (token: string, limit: number, offset: number) => Promise<any | undefined>,
    limit: number
): Promise<any> {
    const items = [];
    var response;
    var offset = 0;
    do {
        response = await asyncFn(token, limit, offset);
        if (!response || response.status !== 200) return;
        items.push(...response.body.items);
        offset += limit;
    } while (offset < response.body.total);
    return items;
}


export async function fetchAllPaginatedId(
    token: string,
    asyncFn: (token: string, id: string, limit: number, offset: number) => Promise<any | undefined>,
    id: string,
    limit: number,
): Promise<any> {
    return await fetchAllPaginated(
        token,
        (token_: string, limit_: number, offset_: number) => asyncFn(token_, id, limit_, offset_),
        limit
    );
}
