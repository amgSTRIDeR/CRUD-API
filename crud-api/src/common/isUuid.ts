export default function isUuid(uuid: string): boolean {
  const uuidRegex = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
    'i'
  );
  return uuidRegex.test(uuid);
}
