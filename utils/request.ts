type RequestType =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE";


export default async function request({
  url,
  method,
  body = null,
  headers = {},
}: {
  url: string;
  method: RequestType;
  body?: object | FormData | URLSearchParams | null;
  headers?: object;
}) {
  try {
    const resp = await fetch(url, {
      method: method,
      ...(!!body && {
        body:
          body instanceof FormData
            ? body
            : body instanceof URLSearchParams
              ? body
              : JSON.stringify(body),
      }),
      headers: {
        Accept: "application/json",
        ...(!(body instanceof FormData || body instanceof URLSearchParams) && {
          "Content-Type": "application/json",
        }),
        ...(body instanceof URLSearchParams && {
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        // "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    });
    return {body: await resp.json(), status: resp.status};
  } catch (e) {
    console.error(e);
    return null;
  }
}
