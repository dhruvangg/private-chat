import React, { useEffect, useRef, useState } from "react"

export default function Timer() {
    const [timer, setTimer] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const interval: React.MutableRefObject<any> = useRef()
    
    useEffect(() => {
        if(isOn){
            interval.current = setInterval(() => {
                setTimer(timer => timer + 1)
            }, 1000)
        } else {
            clearInterval(interval.current)
        }
    }, [isOn])
    
    return (
        <div>
            <h2>Timer: {timer}</h2>
            <div>
                <button onClick={() => setIsOn(!isOn)}>{isOn ? 'Stop' : 'Start'}</button>
                <button onClick={() => setTimer(0)}>Reset</button>
            </div>
        </div>
    )
}
