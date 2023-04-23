import { Link } from "react-router-dom"

function App() {
    return(
        <div className='cardContainer'>
            <div className='cardImage' style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80")',
                // backgroundImage: 'url("https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80")'
            }}></div>
            <div className='cardBody'>
                <h1>Welcome!</h1>
                <Link to='/client-details' state={{ test: 'test-string' }}>
                    <button type="button">New Client Questionnaire</button>
                </Link>
                <br /> <br />
                <Link to='/dashboard' state={{ test: 'test-string' }}>
                    <button type="button" className="secondaryButton">Designer Dashboard</button>
                </Link>
            </div>
            
            
        </div>
        
    )
}

export default App