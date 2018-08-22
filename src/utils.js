const { cloneDeep, merge, isFinite } = require('lodash');

const getDeltaIndex = ({ req, graphName }) => parseInt(req.cookies[graphName], 10);

/**
 * Generates a mock.
 * Sets cookies in the res, via res.cookie, but otherwise does not mutate anything.
 */
const generateMock = ({
  req,
  res,
  graphName,
  deltas,
  deltasCumulative,
  mocks,
}) => {
  let deltaIndex = getDeltaIndex({ req, graphName });
  const mocksClone = cloneDeep(mocks);
  const deltasClone = cloneDeep(deltas);

  // if the mock contains deltas but the deltaIndex is not set,
  // or is not a finite number, set to -1.
  // This means that the next response will contain mocks without deltas (as intended),
  // and that the very first response will not contain deltas.
  if (!isFinite(deltaIndex)) {
    deltaIndex = -1;
  }

  // if the graph mock has specified deltas, apply any valid deltas.
  if (deltasClone.length) {
    if (deltasCumulative) {
      // cumulatively add all deltas, if that option is enabled.
      deltasClone.forEach((obj, index) => {
        if (index <= deltaIndex) {
          merge(mocksClone, deltasClone[index]);
        }
      });
    } else if (deltaIndex >= 0) {
      // add a single delta
      merge(mocksClone, deltasClone[deltaIndex]);
    }

    // increase deltaIndex so that the response cookie contains the next index.
    deltaIndex += 1;
  }

  if (deltaIndex >= deltasClone.length) {
    // magic number that reboots the delta sequence to a non-delta-including state,
    // if we've just applied the last delta in the sequence.
    // This has the same effect for the client as not having communicated with the mock before,
    // - starting over from the non-delta-including state.
    deltaIndex = -1;
  }

  // set a cookie on the client so that any subsequent requests indicate which delta(s) to apply.
  res.cookie(graphName, deltaIndex);
  return mocksClone;
};

module.exports = {
  generateMock,
};
