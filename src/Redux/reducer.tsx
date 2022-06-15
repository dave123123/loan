import { combineReducers } from 'redux'
import { LoanInfo, CalculatorState } from '../Common/interfaces';
import { ADD_CACHE_ENTRY, INIT_SLIDERS_ACTION, MOVE_AMOUNT_SLIDER_ACTION, MOVE_TERM_SLIDER_ACTION, TOGGLE_LOAN_LOADING, TOGGLE_SLIDERS_LOADING } from './actions';

const defaultState: CalculatorState = {
    amountSlider: { max: 0, defaultValue: 0, min: 0, step: 0, value: 0 },
    termSlider: { max: 0, defaultValue: 0, min: 0, step: 0, value: 0 },
    cache: new Map<string, LoanInfo>(),
    areSlidersLoaded: false,
    isLoanLoaded: false
}

type ActionArg = {
    payload: any,
    type: string
};

const CalculatorReducer = (state: CalculatorState = defaultState, { payload, type }: ActionArg) => {
    switch (type) {
        case INIT_SLIDERS_ACTION:

            return {
                ...state,
                amountSlider: {
                    ...payload.amountSlider,
                    value: payload.amountSlider.defaultValue
                },
                termSlider: {
                    ...payload.termSlider,
                    value: payload.termSlider.defaultValue
                }
            };

        case MOVE_AMOUNT_SLIDER_ACTION:
            return {
                ...state,
                amountSlider: {
                    ...state.amountSlider,
                    value: payload.sliderValue
                }
            };

        case MOVE_TERM_SLIDER_ACTION:
            return {
                ...state,
                termSlider: {
                    ...state.termSlider,
                    value: payload.sliderValue
                }
            };

        case ADD_CACHE_ENTRY:
            state.cache.set(payload.loanKey, payload.loanInfo)
            return {
                ...state
            };

        case TOGGLE_SLIDERS_LOADING:
            return {
                ...state,
                areSlidersLoaded: payload.areSlidersLoaded
            };

        case TOGGLE_LOAN_LOADING:
            return {
                ...state,
                isLoanLoaded: payload.isLoanLoaded
            };

        default: return state
    }
}

const rootReducer = combineReducers({
    calculator: CalculatorReducer
});

export default rootReducer;