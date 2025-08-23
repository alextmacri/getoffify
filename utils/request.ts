import { delay } from "framer-motion";

type RequestType =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE";


export async function request({
  url,
  method,
  body = null,
  headers = {},
}: {
  url: string;
  method: RequestType;
  body?: object | FormData | URLSearchParams | null;
  headers?: object;
}): Promise<{ body: any; status: number } | null> {
  try {
    let response = await sendRequest({ url, method, body, headers });
    while (response?.status === 429) {  // Too many requests
      console.warn("Rate limit exceeded, retrying after delay...");
      setTimeout(() => {}, 5000);       // Wait for 5 seconds
      response = await sendRequest({ url, method, body, headers });
    }
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function sendRequest({
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
      ...headers,
    },
  });
  return {body: await resp.json(), status: resp.status};
}
