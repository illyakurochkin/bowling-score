import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {ScoreSheetProvider} from './context/ScoreSheetContext'

ReactDOM.render(
  <React.StrictMode>
    <ScoreSheetProvider>
      <App/>
    </ScoreSheetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
