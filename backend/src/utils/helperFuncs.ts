export function generateGloballyUniqueString(): string {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomLength = 14;
  let randomPart = '';
  for (let i = 0; i < randomLength; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      randomPart += charSet[randomIndex];
  }
  const timestamp = Date.now().toString();
  const processId = typeof process !== 'undefined' ? process.pid.toString() : '0';
  return `${randomPart}-${timestamp}-${processId}`;
}