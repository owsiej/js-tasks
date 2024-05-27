function remove(arr, value) {
  return arr.filter((item) => item !== value);
}

function intersection(arr1, arr2) {
  return arr2.filter((item) => arr1.includes(item));
}

module.exports = {
  remove,
  intersection,
};
