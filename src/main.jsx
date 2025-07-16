import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import store from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          reverseOrder={false}
          containerStyle={{
            top: 100,
            right: 20
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
