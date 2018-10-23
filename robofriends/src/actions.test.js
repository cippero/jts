import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';
import * as actions from './actions';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);

it('setSearchField should return an object with the input text as payload', () => {
    expect(actions.setSearchField('abc')).toEqual({
        type: CHANGE_SEARCH_FIELD,
        payload: 'abc'
    });
});

it('handles requesting robots', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    expect(action[0]).toEqual({type: REQUEST_ROBOTS_PENDING});
});