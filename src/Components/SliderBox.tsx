import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useState } from 'react';
import './SliderBox.css'

interface SliderProps {
    label: string,
    min: number,
    max: number,
    defaultValue: number,
    step: number,
    formatValue?: string,
    formatMinMax?: string,
    sliderChanged: (value: number) => void
}

const SliderBox = ({ label, min, max, defaultValue, step, formatValue = "{0}", formatMinMax = "{0}", sliderChanged }: SliderProps) => {
    const [sliderValue, setSlider] = useState(defaultValue);

    const onSliderChanged = useCallback((value: number) => {
        setSlider(value);
        sliderChanged(value);
    }, [sliderChanged]);

    useEffect(
        () => {
            onSliderChanged(defaultValue);
        }, [defaultValue, onSliderChanged])

    return (
        <div>
            <div className='sliderHeader'>
                <span className='sliderLabel'>
                    {label}
                </span>
                <span className='sliderValue'>{formatValue.format(sliderValue.toString())}
                </span>
            </div>
            <Slider
                className='slider'
                value={sliderValue}
                min={min}
                max={max}
                defaultValue={defaultValue}
                step={step}
                onChange={e => onSliderChanged(e as number)}
            />
            <div className='sliderMinMax'>
                <button className='minMaxButton' onClick={e => onSliderChanged(min)}>
                    {formatMinMax.format(min.toString())}
                </button>
                <button className='minMaxButton' onClick={e => onSliderChanged(max)}>
                    {formatMinMax.format(max.toString())}
                </button>
            </div>
        </div>
    );
}

export default SliderBox;