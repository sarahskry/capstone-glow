
export function Btn({btnicon, btntext, btnalt}) {
    return (
        <button className="btn">
            <img className="btn__icon" src={btnicon} alt={btnalt} />
                <span className="btn__text">{btntext}</span>
        </button>
    );
}