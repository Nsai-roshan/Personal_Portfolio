/**
 * Move an item in an array up or down by one position.
 * @param {Array} arr - the array
 * @param {number} index - index of the item to move
 * @param {-1|1} direction - -1 to move up, 1 to move down
 * @returns {Array} new array with item moved (original unchanged)
 */
export function moveItem(arr, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= arr.length) return arr;
  const result = [...arr];
  [result[index], result[target]] = [result[target], result[index]];
  return result;
}
