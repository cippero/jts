import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';


it('checks CHANGE_SEARCH_FIELD constant to be a string', () => {
    expect(typeof CHANGE_SEARCH_FIELD).toBe('string');
});

it('checks REQUEST_ROBOTS_PENDING constant to be a string', () => {
    expect(typeof REQUEST_ROBOTS_PENDING).toBe('string');
});

it('checks REQUEST_ROBOTS_SUCCESS constant to be a string', () => {
    expect(typeof REQUEST_ROBOTS_SUCCESS).toBe('string');
});

it('checks REQUEST_ROBOTS_FAILED constant to be a string', () => {
    expect(typeof REQUEST_ROBOTS_FAILED).toBe('string');
});
