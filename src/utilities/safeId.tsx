export function generateSafeId(key: string) {
    return key.replace(/\s+/g, '-');
}