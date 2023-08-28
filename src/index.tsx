import Remote from './Remote';
import RemoteHOC from './RemoteHOC';

export default RemoteHOC;
export { Remote };

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
