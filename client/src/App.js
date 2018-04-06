import React, { Component } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import SignUpLogIn from './components/SignUpLogIn'
import PostsList from './components/PostsList'
import { saveAuthTokens, setAxiosDefaults, userIsLoggedIn } from './util/sessionHeaderUtil'

class App extends Component {
  state = {
    signedIn: false,
    posts: [],
    user: {}
  }

  async componentDidMount () {
    try {
      const signedIn = userIsLoggedIn()

      let posts = []
      if (signedIn) {
        setAxiosDefaults()
        posts = await this.getPosts()
      }
      this.setState({
        posts,
        signedIn
      })
    } catch (err) {
      console.log(err)
    }
  }

  getPosts = async () => {
    try {
      const response = await axios.get('/posts')
      return response.data
    } catch (err) {
      console.log(err)
      return []
    }
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
      saveAuthTokens(response.headers)
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
      saveAuthTokens(response.headers)
      this.setState({ signedIn: true })
      const posts = await this.getPosts()
      this.setState({ posts })
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn}
      />
    )

    const PostsComponent = () => (
      <PostsList posts={this.state.posts}/>
    )
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent}/>
            <Route exact path="/posts" render={PostsComponent}/>
          </Switch>
          {this.state.signedIn ? <Redirect to="/posts"/> : <Redirect to="signUp"/>}
        </div>
      </Router>
    )
  }
}

export default App
