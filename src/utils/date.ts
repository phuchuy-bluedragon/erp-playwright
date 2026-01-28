export function formatYYYYMMDD_HHmmss(ts: number = Date.now()): string {
    const d = new Date(ts);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        d.getFullYear().toString() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        ' _ ' +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds())
    );
}