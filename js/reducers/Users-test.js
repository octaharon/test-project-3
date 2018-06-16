import expect from 'expect';
import reducers from './Users';

const testSet = {
    isLoading: [{
            input: {},
            output: true,
        },
        {
            input: {
                state: false,
            },
            output: false,
        },
        {
            input: {
                state: null,
                action: {
                    type: 'USERS_LOADED'
                }
            },
            output: false,
        },
        {
            input: {
                state: null,
                action: {
                    type: 'USERS_LOAD_ERROR'
                }
            },
            output: false,
        },
        {
            input: {
                state: false,
                action: {
                    type: 'USERS_SET_LOADING',
                    isLoading: true,
                }
            },
            output: true,
        },
        {
            input: {
                state: false,
                action: {
                    type: 'USERS_SET_LOADING',
                }
            },
            output: false,
        },
        {
            input: {
                state: true,
                action: {
                    type: 'USERS_SET_LOADING',
                    isLoading: false,
                }
            },
            output: false,
        }
    ],
    list: [{
            input: {},
            output: []
        },
        {
            input: {
                state: [1, 2, 3]
            },
            output: [1, 2, 3]
        },
        {
            input: {
                action: {
                    wrongKey: 'MALFORMED_ACTION'
                },
                state: [1, 2, 3]
            },
            output: [1, 2, 3]
        },
        {
            input: {
                state: [],
                action: {
                    type: 'USERS_LOADED',
                    items: []
                }
            },
            output: []
        },
        {
            input: {
                state: [],
                action: {
                    type: 'USERS_LOADED',
                    items: [1, 2]
                }
            },
            output: [1, 2]
        },
        {
            input: {
                state: [1, 2],
                action: {
                    type: 'USERS_LOADED',
                    items: [3, 4]
                }
            },
            output: [1, 2, 3, 4]
        },
        {
            input: {
                state: [1, 2],
                action: {
                    type: 'USERS_LOADED',
                    items: []
                }
            },
            output: [1, 2]
        }
    ]
};

Object.keys(testSet).map(title => describe(`Users reducer: ${title}`, function () {
    let cases = testSet[title];
    let callback = reducers[title];
    if (!callback instanceof Function)
        throw new Error(`Reducer '${title}' not found`);
    console.log(cases);
    cases.forEach((scenario) => it(
        `With ${JSON.stringify(scenario.input)}: returns ${scenario.output}`,
        function (done) {
            try {
                let result = callback(scenario.input.state, scenario.input.action);
                expect(result).toEqual(scenario.output);
                done();
            } catch (e) {
                done(e);
            }
        }
    ))
}));