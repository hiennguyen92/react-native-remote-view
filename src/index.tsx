import Remote from './Remote';

export { Remote };

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
