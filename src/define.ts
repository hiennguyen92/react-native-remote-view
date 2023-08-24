import dependenciesMap from './dependenciesMap';

// Replace dependency array values which
// are string with real modules.
/**
 *
 * @param dependencies
 * @param fn
 */
export default function (dependencies: string[], fn: (...args: any[]) => void) {
  // Collect all data exported
  // from the remote code.
  const exports = {};
  const dependenciesMapVar: any = dependenciesMap;
  const deps = dependencies.map((dep: string) => {
    if (dep === 'exports') {
      return exports;
    }
    return dependenciesMapVar[dep];
  });

  fn(...deps);

  return exports;
}
