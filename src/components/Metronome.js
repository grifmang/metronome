import React, { useState, useRef, useCallback, useEffect } from "react";
import sound1 from "../sounds/sound1.wav";
import sound2 from "../sounds/sound2.wav";

const Metronome = () => {

    const click1 = new Audio(sound1);
    const click2 = new Audio(sound2);

    const [metronomeState, setMetronomeState] = useState({
        bpm: 100,
        playing: false,
        count: 0,
        beatsPerMeasure: 4
    })

    const timer = useRef();

    const playClick = useCallback(() => {
        if (metronomeState.count % metronomeState.beatsPerMeasure === 0) {
            click2.play();
        } else {
            click1.play();
        }

        setMetronomeState((state) => (
            {
                ...state,
                count: (state.count + 1)
            }
        ))
    }, [metronomeState, click1, click2])

    useEffect(() => {
        if (metronomeState.playing) {
            clearInterval(timer.current)
            timer.current = setInterval(playClick, (60 / metronomeState.bpm) * 1000)
        } else {
            clearInterval(timer.current)
        }
    }, [metronomeState, playClick])

    const startSound = () => {
        setMetronomeState({
            ...metronomeState,
            count: 0,
            playing: !metronomeState.playing
        });
    }

    const handleBPM = e => {
        setMetronomeState({
            ...metronomeState,
            count: 0,
            bpm: e.target.value
        })
    }

    return (
        <div className="metronome">
            <div className='slider'>
                <div>{metronomeState.bpm} BPM</div>
                <input type='range' onChange={handleBPM} min='60' max='240' value={metronomeState.bpm} />
            </div>
            <button onClick={startSound}>{metronomeState.playing ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Metronome;