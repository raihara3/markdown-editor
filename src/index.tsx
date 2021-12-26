// lib
import React from "react"
import { render } from "react-dom"
import { createGlobalStyle } from "styled-components"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"

// hooks
import useStateWithStorage from "./hooks/use_state_with_storage"

// pages
import Editor from "./pages/editor"
import History from "./pages/history"

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`

const STORAGE_KEY = "pages/editor:text"

const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage("", STORAGE_KEY)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/editor">
            <Editor
              text={text}
              setText={setText}
            />
          </Route>
          <Route exact path="/history">
            <History
              setText={setText}
            />
          </Route>
          <Redirect to="/editor" path="*"></Redirect>
        </Switch>
      </Router>
    </>
  )
}

render(<Main />, document.getElementById("app"))
