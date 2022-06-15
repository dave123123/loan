import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { LoanInfo, StoreState } from "../Common/interfaces";
import { addCacheEntry, finishSlidersLoading, finishLoanLoading, initSliders, moveAmountSlider, moveTermSlider } from '../Redux/actions';
import { getInitialConfiguration, getLoanInfo } from "../Common/api"
import { DAYS_STRING_FORMAT, DOLLAR_STRING_FORMAT } from "../Common/constants";
import { formatMoney } from "../Common/helpers";
import SliderBox from "./SliderBox";
import "./Calculator.css";

const defaultLoanState: LoanInfo = { monthlyPayment: 0, totalCostOfCredit: 0, totalRepayableAmount: 0, term: "", totalPrincipal: "" };

const Calculator = (): React.ReactElement => {
    const dispatch = useDispatch();

    const { amountSlider, termSlider } = useSelector((state: StoreState) => state.calculator)
    const cache = useSelector(({ calculator }: StoreState) => calculator.cache);
    const isLoaded = useSelector(({ calculator }: StoreState) => calculator.areSlidersLoaded);
    const isLoanLoaded = useSelector(({ calculator }: StoreState) => calculator.isLoanLoaded);

    const [loanInfo, setLoanInfo] = useState<LoanInfo>(defaultLoanState);
    const [amountSliderVal, setAmountSlider] = useState(amountSlider.defaultValue);
    const [termSliderVal, setTermSlider] = useState(termSlider.defaultValue);

    const [amountSliderDebounced] = useDebounce(amountSliderVal, 100);
    const [termSliderDebounced] = useDebounce(termSliderVal, 100);

    // Initialize sliders
    useEffect(() => {
        const fetch = async () => {
            const initConfig = await getInitialConfiguration();
            dispatch(initSliders(initConfig));
            dispatch(finishSlidersLoading());
        };

        fetch();
    }, [dispatch]);

    // Update amount slider state after debounce
    useEffect(
        () => {
            dispatch(moveAmountSlider(amountSliderDebounced));
        }, [amountSliderDebounced, dispatch]);


    // Update term slider state after debounce
    useEffect(
        () => {
            dispatch(moveTermSlider(termSliderDebounced));
        }, [termSliderDebounced, dispatch]);

    // Update loan information after one of the sliders changed
    useEffect(
        () => {
            if (!isLoaded)
                return;

            // Wraps getLoanInfo API method to use caching
            const getLoanInfoWrapper = async (amount: number, term: number): Promise<LoanInfo> => {
                const key = `${amount}a${term}t`;
                const cachedValue = cache.get(key);

                if (cachedValue) {
                    return Promise.resolve(cachedValue);
                }

                const loanInfo = await getLoanInfo(amountSlider.value, termSlider.value);
                dispatch(addCacheEntry(key, loanInfo));
                return loanInfo;
            }

            // Fetches loan info using cache to reuse known values
            const fetchLoanInfo = async () => {
                const loan = await getLoanInfoWrapper(amountSlider.value, termSlider.value);
                setLoanInfo(loan);
                dispatch(finishLoanLoading());

            }

            fetchLoanInfo();

        }, [amountSlider.value, termSlider.value, isLoaded, cache, dispatch])

    return (
        <div className="calculator">
            <div className="calculatorBox">
                {
                    isLoaded ?
                        <>
                            <SliderBox
                                label="Amount"
                                min={amountSlider.min}
                                max={amountSlider.max}
                                step={amountSlider.step}
                                defaultValue={amountSlider.defaultValue}
                                formatValue={DOLLAR_STRING_FORMAT}
                                formatMinMax={DOLLAR_STRING_FORMAT}
                                sliderChanged={setAmountSlider}
                            />

                            <hr className="sliderDivider" />

                            <SliderBox
                                label="Term"
                                min={termSlider.min}
                                max={termSlider.max}
                                step={termSlider.step}
                                defaultValue={termSlider.defaultValue}
                                formatValue={DAYS_STRING_FORMAT}
                                sliderChanged={setTermSlider} />
                        </> :
                        <div className="spinner" />
                }
            </div>
            <div className={!isLoanLoaded ? "loanBox" : "loanBox full"}>
                <div className="loanBoxInner">
                    <div className="loanItem ">
                        <span>Montly payment</span>
                        <span className="loanItemValue">{formatMoney((loanInfo.monthlyPayment))}</span>
                    </div>

                    <hr className="loanDivider" />

                    <div className="loanItem">
                        <span>Total cost of credit</span>
                        <span className="loanItemValue">{formatMoney((loanInfo.totalCostOfCredit))}</span>
                    </div>

                    <hr className="loanDivider" />

                    <div className="loanItem">
                        <span>Repayable amount</span>
                        <span className="loanItemValue">{formatMoney(loanInfo.totalRepayableAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;