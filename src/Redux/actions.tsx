import { AppInitConfig, CalcActionWithPayload, LoanInfo } from "../Common/interfaces"

const INIT_SLIDERS_ACTION = "INIT_SLIDERS";
const MOVE_AMOUNT_SLIDER_ACTION = "MOVE_AMOUNT_SLIDER";
const MOVE_TERM_SLIDER_ACTION = "MOVE_TERM_SLIDER";
const ADD_CACHE_ENTRY = "ADD_CACHE_ENTRY";
const TOGGLE_SLIDERS_LOADING = "TOGGLE_SLIDERS_LOADING";
const TOGGLE_LOAN_LOADING = "TOGGLE_LOAN_LOADING";

type MoveSliderPayload = {
    sliderValue: number
}

type SetCachePayload = {
    loanKey: string,
    loanInfo: LoanInfo
}

type SlidersLoadedPayload = {
    areSlidersLoaded: boolean
}

type LoanLoadedPayload = {
    isLoanLoaded: boolean
}

const initSliders = (initConfig: AppInitConfig) => {
    return {
        type: INIT_SLIDERS_ACTION,
        payload: {
            amountSlider: initConfig.amountInterval,
            termSlider: initConfig.termInterval
        }
    }
}

const moveAmountSlider = (amount: number): CalcActionWithPayload<MoveSliderPayload> => {
    return {
        type: MOVE_AMOUNT_SLIDER_ACTION,
        payload: { sliderValue: amount }
    }
}

const moveTermSlider = (amount: number): CalcActionWithPayload<MoveSliderPayload> => {
    return {
        type: MOVE_TERM_SLIDER_ACTION,
        payload: { sliderValue: amount }
    }
}

const addCacheEntry = (loanKey: string, loan: LoanInfo): CalcActionWithPayload<SetCachePayload> => {
    return {
        type: ADD_CACHE_ENTRY,
        payload: {
            loanKey: loanKey,
            loanInfo: loan
        }
    }
}

const finishSlidersLoading = (): CalcActionWithPayload<SlidersLoadedPayload> => ({
    type: TOGGLE_SLIDERS_LOADING,
    payload: { areSlidersLoaded: true }
})

const finishLoanLoading = (): CalcActionWithPayload<LoanLoadedPayload> => ({
    type: TOGGLE_LOAN_LOADING,
    payload: { isLoanLoaded: true }
})

export {
    initSliders, moveAmountSlider, moveTermSlider, addCacheEntry, finishSlidersLoading, finishLoanLoading,
    INIT_SLIDERS_ACTION, MOVE_AMOUNT_SLIDER_ACTION, MOVE_TERM_SLIDER_ACTION, ADD_CACHE_ENTRY, TOGGLE_SLIDERS_LOADING, TOGGLE_LOAN_LOADING
}