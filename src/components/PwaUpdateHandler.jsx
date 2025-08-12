// import { useEffect } from 'react'
// import { useRegisterSW } from 'virtual:pwa-register/react'
// import { toast } from 'sonner'

// export default function PwaUpdateHandler() {
//   const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
//     onRegistered(r) {
//       // optional: console.log('SW registered', r)
//     },
//     onRegisterError(error) {
//       console.error('SW registration error', error)
//     }
//   })

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

//   return null
// }
