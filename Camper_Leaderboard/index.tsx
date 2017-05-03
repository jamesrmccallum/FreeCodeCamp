import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { UserDetail } from './Components/userDetail'
import { UserTable } from './Components/userTable'

const App = () => {
    return <div className='tablecontainer'>
        <div className="banner">Leaderboard</div>
        <UserTable></UserTable>
    </div>
}

ReactDOM.render(<App />, document.getElementById('camperApp'));



