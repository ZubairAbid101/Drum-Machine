const audioArray = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

// App Component Starts Here
function App() {
    const [drumPadText, setDrumPadText] = React.useState("")
    const [volume, setVolume] = React.useState(50)

    function displayText(id) {
        setDrumPadText(id)
    }

    function handleVolume(event) {
        setVolume(event.target.value)
    }

    return (
        <div id="drum-machine">
            <div id="drumPad-wrapper">
                {audioArray.map( item => {
                    return <DrumPad 
                            key={item.id}
                            display={item.id}
                            keyboardKey={item.keyTrigger}
                            audioSource={item.url}
                            audioVolume={volume}
                            handleDisplayText={displayText}/>
                } )}
            </div>
            <div id="display-wrapper">
                <div 
                id="display"
                >{drumPadText}</div>
                <div id="volume-controls-wrapper">
                    <input id="volume-meter" type="range" name="volume-meter" value={volume} onChange={handleVolume} />
                    <div id="volume-number">{volume}</div>
                </div>
            </div>
        </div>
    )
}

// Drum Pad Component Starts Here
function DrumPad(props) {
    React.useEffect(() => {
        document.addEventListener("keydown", (event) => {
            console.log("Use Effect Ran!")
            document.getElementById(event.key.toUpperCase()).play()
    })
    }, [])

    function playDrumSound(id) {
        document.getElementById(id).volume = props.audioVolume / 100
        document.getElementById(id).play()
        props.handleDisplayText(props.display)
    }

    return (
        <button
        id={props.display}
        className="drum-pad"
        onClick={() => playDrumSound(props.keyboardKey)}>
            {props.keyboardKey}
            <audio
            className="clip"
            id={props.keyboardKey}
            src={props.audioSource}/>
        </button>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)