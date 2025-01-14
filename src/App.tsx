import DefaultLayout from 'layouts/default'
import Tasks from 'pages/Tasks'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />}></Route>
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </DefaultLayout>
    </>
  )
}

export default App
