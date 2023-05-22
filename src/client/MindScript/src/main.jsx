import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MindScript } from './MindScript'
import './styles.css'

//Store
import { store } from './store' //porque index js ya exporta store

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }> 
      <BrowserRouter>
        <MindScript />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
)
