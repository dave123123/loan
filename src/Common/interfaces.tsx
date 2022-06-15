export interface SliderInitConfig {
    defaultValue: number,
    max: number,
    min: number,
    step: number
}

export interface AppInitConfig {
    amountInterval: SliderInitConfig,
    termInterval: SliderInitConfig
}

export interface SliderConfig extends SliderInitConfig {
    value: number
}

export interface CalculatorState {
    amountSlider: SliderConfig
    termSlider: SliderConfig,
    cache: Map<string, LoanInfo>,
    areSlidersLoaded: boolean,
    isLoanLoaded: boolean
}

export interface StoreState {
    calculator: CalculatorState
}

export interface LoanInfo {
    monthlyPayment: number,
    term: string,
    totalCostOfCredit: number,
    totalPrincipal: string,
    totalRepayableAmount: number
}

export interface CalcActionWithPayload<T> {
    payload: T,
    type: string
}