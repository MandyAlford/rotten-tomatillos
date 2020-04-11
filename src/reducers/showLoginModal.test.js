import { showLoginModal } from '../reducers/showLoginModal';

describe('Reducer: showLoginModal', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = false;

    // Execution
    const result = showLoginModal(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return updated state', () => {
    // Setup
    const expected = true;
    const action = {type:'SHOW_MODAL',isShowing:true}

    // Execution
    const result = showLoginModal(false, action);

    // Expectation
    expect(result).toEqual(expected);
  });

});
