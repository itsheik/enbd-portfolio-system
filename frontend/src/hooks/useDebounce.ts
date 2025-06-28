let timeout: NodeJS.Timeout | null = null;
export const debounce = async (
  input: string,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  funct: Function,
): Promise<void> => {
  if (timeout) clearTimeout(timeout);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (input !== '') timeout = setTimeout(async () => await funct(), delay);
};
