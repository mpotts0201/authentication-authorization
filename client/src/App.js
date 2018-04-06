import React, { Component } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import SignUpLogIn from './components/SignUpLogIn'

class App extends Component {
  state = {
    signedIn: false
  }

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email,
        password,
        password_confirmation
      }
      const response = await axios.post('/auth', payload)
      console.log(response.data)

      this.setState({ signedIn: true })
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      const response = await axios.post('/auth/sign_in', payload)
      console.log(response.data)

      this.setState({ signedIn: true })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        logIn={this.logIn}
      />
    )

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent}/>
          </Switch>
          {this.state.signedIn ? null : <Redirect to="signUp"/>}
        </div>
      </Router>
    )
  }
}

export default App
