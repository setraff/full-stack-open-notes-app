import Notes from './components/Notes'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
    const padding = {
        padding: 5
    }

    return (    
        <div className='container'>
            <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">home</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/notes">notes</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">users</Link>
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </Router>
        </div>
    ) 
}

export default App
