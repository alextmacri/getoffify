export default function getBaseUrl(): string {
    if (typeof window !== "undefined") {
        const host = window.location.host.replace("localhost", "127.0.0.1");
        return `${window.location.protocol}//${host}`;
    }
    return "";
}
