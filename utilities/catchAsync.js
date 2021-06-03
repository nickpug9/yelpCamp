// Wraps function that accepts and executes the function
// catches errors and passes to next
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
