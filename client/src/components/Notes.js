import { useState, useEffect, useRef } from 'react'
import Notification from './Notification'
import Footer from './Footer'
import noteService from '../services/notes'
import LoginForm from './LogInForm'
import loginService from '../services/login'
import Togglable from './Togglable'
import NoteForm from './NoteForm'
import { Button, Nav, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)
    const toggleRef = useRef()

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (loginCreds) => {
        try {
            const user = await loginService.login(loginCreds)
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addNote = (noteObject) => {
        noteService
            .create(noteObject)
            .then((returnedNote) => {
                toggleRef.current.toggleVisibility()
                setNotes(notes.concat(returnedNote))
            })
            .catch((err) => {
                console.log(err)
                setErrorMessage(err.response)
            })
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    //   const toggleImportanceOf = (id) => {
    //     const note = notes.find((n) => n.id === id)
    //     const changedNote = { ...note, important: !note.important }

    //     noteService
    //       .update(id, changedNote)
    //       .then((returnedNote) => {
    //         setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    //       })
    //       // eslint-disable-next-line no-unused-vars
    //       .catch((error) => {
    //         setErrorMessage(
    //           `Note '${note.content}' was already removed from server`
    //         )
    //         setTimeout(() => {
    //           setErrorMessage(null)
    //         }, 5000)
    //         setNotes(notes.filter((n) => n.id !== id))
    //       })
    //   }

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    const loginForm = () => {
        return (
            <Togglable buttonLabel="Log in">
                <LoginForm handleLogIn={handleLogin} />
            </Togglable>
        )
    }

    const noteForm = () => (
        <Togglable ref={toggleRef} buttonLabel="new note">
            <NoteForm createNote={addNote} />
        </Togglable>
    )

    return (
        <div>
            <h1>Notes app</h1>
            <Notification message={errorMessage} />

            {!user && loginForm()}
            {user && (
                <Nav.Link href="#" as="span">
                    {user && (
                        <em>
                            {user.name} logged in{' '}
                            <Button onClick={handleLogOut}>Log Out</Button>{' '}
                        </em>
                    )}
                    {noteForm()}
                </Nav.Link>
            )}
            <div>
                <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <Table striped>
                <tbody>
                    {notesToShow.map((note) => (
                        <tr key={note.id}>
                            <td>
                                <Link to={`/notes/${note.id}`}>{note.content}</Link>
                            </td>
                            <td>{note.username}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Footer />
        </div>
    )
}

export default Notes
