import * as actions from '../actions';
console.log(actions);

describe('actions', () => {
  it('should have a type of LOGIN_USER and a correct payload', () => {
    const expectedAction = {
      type: 'LOGIN_USER',
        userData: 'beyonce@gmail.com',
    };

    const result = actions.login('beyonce@gmail.com', 'password');
    
    expect(result).toEqual(expectedAction)
  });
});
