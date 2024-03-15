import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({ handleLogIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const logIn = (e) => {
    e.preventDefault()
    handleLogIn({ username, password })
  }

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={logIn}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            id="password"
            type="text"
            name="password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
