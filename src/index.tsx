// lib
import React from "react"
import { render } from "react-dom"
import { createGlobalStyle } from "styled-components"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"

// pages
import Editor from "./pages/editor"
import History from "./pages/history"

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`

const Main = (
  <>
    <GlobalStyle />
    <Router>
      <Route exact path="/editor">
        <Editor />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>
      <Redirect to="/editor" path="*"></Redirect>
    </Router>
  </>
)

render(Main, document.getElementById("app"))
