export default function getBaseUrl(): string {
    if (typeof window !== "undefined") {
        const host = window.location.host.replace("localhost", "127.0.0.1");
        const baseUrl = `${window.location.protocol}//${host}${window.location.pathname}`;
        return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    }
    return "";
}
