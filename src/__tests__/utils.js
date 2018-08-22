const schema = require('./schema');
const { generateMock } = require('../utils');

const mocks = {
  empty: {
    typeDefs: schema,
    resolvers: {},
    mocks: {},
    deltas: [],
  },
  withoutDeltas: {
    typeDefs: schema,
    resolvers: {},
    mocks: {
      Query: {
        employee: () => ({ name: 'Kerstin' }),
        employer: () => ({ name: 'Bert' }),
      },
    },
    deltas: [],
  },
  withDeltas: {
    typeDefs: schema,
    resolvers: {},
    mocks: {
      Query: {
        employee: () => ({ name: 'Kerstin' }),
        employer: () => ({ name: 'Bert' }),
      },
    },
    deltas: [
      {
        Query: {
          employee: () => ({ name: 'Gudrun' }),
          employer: () => ({ name: 'Bertil' }),
        },
      },
      {
        Query: {
          employee: () => ({ name: 'Bertil' }),
          employer: () => ({ name: 'Gudrun' }),
        },
      },
    ],
  },
  withDeltasCumulative: {
    typeDefs: schema,
    resolvers: {},
    mocks: {
      Query: {
        employee: () => ({ name: 'Kerstin' }),
        employer: () => ({ name: 'Bert' }),
      },
    },
    deltas: [
      {
        Query: {
          employer: () => ({ name: 'Bertil' }),
        },
      },
      {
        Query: {
          employee: () => ({ name: 'Gudrun' }),
        },
      },
    ],
    deltasCumulative: true,
  },
};

describe('mergeDeltas', () => {
  let res;

  beforeEach(() => {
    res = {
      cookie: jest.fn(),
    };
  });

  it('Does not increase deltaIndex when there are no deltas', () => {
    const mock = mocks.empty;
    const graphName = 'empty';
    const req = { cookies: {} };
    const generate = () => {
      generateMock({
        req,
        res,
        graphName,
        ...mock,
      });
    };

    generate();
    expect(res.cookie).toHaveBeenCalledWith('empty', -1);
    generate();
    expect(res.cookie).toHaveBeenCalledWith('empty', -1);
  });

  it('Resets deltaIndex when out of bounds', () => {
    const mock = mocks.empty;
    const graphName = 'bounds';
    const req = { cookies: { bounds: '33' } };
    const generate = () => {
      generateMock({
        req,
        res,
        graphName,
        ...mock,
      });
    };

    generate();
    expect(res.cookie).toHaveBeenCalledWith('bounds', -1);
  });

  it('Handles mocks by cloning them', () => {
    const mock = mocks.withoutDeltas;
    const graphName = 'withoutDeltas';
    const req = { cookies: {} };
    const generate = () => generateMock({
      req,
      res,
      graphName,
      ...mock,
    });

    const generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withoutDeltas', -1);
    expect(mock.mocks).not.toBe(generated.mocks);
    expect(mock.mocks.Query.employee()).toEqual(generated.Query.employee());
    expect(mock.mocks.Query.employer()).toEqual(generated.Query.employer());
  });

  it('Applies deltas', () => {
    const mock = mocks.withDeltas;
    const graphName = 'withDeltas';
    const req = { cookies: {} };
    const generate = () => generateMock({
      req,
      res,
      graphName,
      ...mock,
    });

    let generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltas', 0);
    expect(mock.mocks.Query.employee()).toEqual(generated.Query.employee());
    expect(mock.mocks.Query.employer()).toEqual(generated.Query.employer());

    req.cookies = { withDeltas: '0' };
    generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltas', 1);
    expect(mock.deltas[0].Query.employee()).toEqual(generated.Query.employee());
    expect(mock.deltas[0].Query.employer()).toEqual(generated.Query.employer());

    req.cookies = { withDeltas: '1' };
    generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltas', -1);
    expect(mock.deltas[1].Query.employee()).toEqual(generated.Query.employee());
    expect(mock.deltas[1].Query.employer()).toEqual(generated.Query.employer());
  });

  it('Applies deltas cumulatively', () => {
    const mock = mocks.withDeltasCumulative;
    const graphName = 'withDeltasCumulative';
    const req = { cookies: {} };
    const generate = () => generateMock({
      req,
      res,
      graphName,
      ...mock,
    });

    let generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltasCumulative', 0);
    expect(mock.mocks.Query.employee()).toEqual(generated.Query.employee());
    expect(mock.mocks.Query.employer()).toEqual(generated.Query.employer());

    req.cookies = { withDeltasCumulative: '0' };
    generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltasCumulative', 1);
    expect(mock.mocks.Query.employee()).toEqual(generated.Query.employee());
    expect(mock.deltas[0].Query.employer()).toEqual(generated.Query.employer());

    req.cookies = { withDeltasCumulative: '1' };
    generated = generate();
    expect(res.cookie).toHaveBeenCalledWith('withDeltasCumulative', -1);
    expect(mock.deltas[1].Query.employee()).toEqual(generated.Query.employee());
    expect(mock.deltas[0].Query.employer()).toEqual(generated.Query.employer());
  });
});
