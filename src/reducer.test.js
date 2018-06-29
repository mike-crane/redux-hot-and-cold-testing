import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', () => {

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, { type: '__UNKNOWN' });

    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual('');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  it('Should generate an aural update', () => {
    let state = {
      guesses: [50, 15, 70],
      feedback: "You're Hot.",
      auralStatus: ''
    };

    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual(
      "Here's the status of the game right now: You're Hot. You've made 3 guesses. In order of most- to least-recent, they are: 70, 15, 50"
    );
  });

  describe('restartGame', () => {
    it('Should restart the game', () => {
      let state = {
        guesses: [10, 1, 85],
        feedback: "You're Cold.",
        correctAnswer: 60
      };
      
      const correctAnswer = 20;
      state = reducer(state, restartGame(correctAnswer));

      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.auralStatus).toEqual('');
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.correctAnswer).toEqual(correctAnswer);
    });
  });

  describe('makeGuess', () => {
    it('Should make a guess', () => {
      let state = {
        guesses: [],
        feedback: "",
        correctAnswer: 45
      };

      state = reducer(state, makeGuess(99));
      expect(state.feedback).toEqual("You're Ice Cold...");
      expect(state.guesses).toEqual([99]);

      state = reducer(state, makeGuess(40));
      expect(state.feedback).toEqual("You're Hot!");
      expect(state.guesses).toEqual([99, 40]);

      state = reducer(state, makeGuess(45));
      expect(state.feedback).toEqual("You got it!");
      expect(state.guesses).toEqual([99, 40, 45]);
    });
  });
});
