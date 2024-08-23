module.exports.accept = function accept() {
  let counter = 0;
  const length = function () {
    return counter;
  };
  length.add = function () {
    counter++;
  };
  length.remove = function () {
    if (!counter) return;
    counter--;
  };
  return length;
};

module.exports.reject = function reject() {
  const fakeLength = function () {
    return false;
  };
  fakeLength.add = function () {};
  fakeLength.remove = function () {};
  return fakeLength;
};
