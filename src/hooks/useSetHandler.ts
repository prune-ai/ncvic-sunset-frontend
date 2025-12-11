import { useCallback } from "react";

/**
 * Hook to create a handler function for managing Set state
 * Returns a function that takes a value and returns a handler: (value: string) => (checked: boolean) => void
 *
 * @example
 * const [set, setSet] = useState<Set<string>>(new Set());
 * const handleChange = useSetHandler(set, setSet);
 *
 * // Usage:
 * <CheckboxOption
 *   checked={set.has("value")}
 *   onChange={handleChange("value")}
 * />
 */
export function useSetHandler<T extends string>(
  set: Set<T>,
  setSet: (newSet: Set<T>) => void
) {
  return useCallback(
    (value: T) => (checked: boolean) => {
      const newSet = new Set(set);
      if (checked) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      setSet(newSet);
    },
    [set, setSet]
  );
}
