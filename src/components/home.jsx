export function Home(props) {
    return (
        <div className="home-page">
            
            <div className="blob1"></div>
            <div className="blob2"></div>
            
            <h1>Quizzical</h1>
            
            <p>Test your knowledge on random facts</p>
            
            <button 
                onClick={() => props.setGameStart(true)}>
                Start quiz
            </button>
        </div>
    )}