import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { registerSW } from 'virtual:pwa-register'
import { toast } from 'sonner'

// `const updateSW = registerSW({
//   onNeedRefresh() {
//     // Show toast here
//       toast((
//           <div>
//             <div>New version available.</div>
//             <div style={{ marginTop: 8 }}>
//               <button  className='cursor-pointer'>Update</button>
//             </div>
//           </div>
//         ),
//         { duration: 10000 }
//       )

//     if (confirm("New version available! Reload?")) {
//       updateSW(true);

//     }
//   },
//   onOfflineReady() {
//     toast.success('App is ready to work offline.')
//     console.log("App ready to work offline");
//   },

//   useEffect(() => {
//     if (needRefresh) {
//       toast(
//         (t) => (
//           <div>
//             <div>New version available.</div>
//             <div style={{ marginTop: 8 }}>
//               <button onClick={() => { updateServiceWorker(true); toast.dismiss(t.id) }} className='cursor-pointer'>Update</button>
//             </div>
//           </div>
//         ),
//         { duration: 10000 }
//       )
//     }
//   }, [needRefresh, updateServiceWorker])

//   useEffect(() => {
//     if (offlineReady) {
//       toast.success('App is ready to work offline.')
//     }
//   }, [offlineReady])

// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
