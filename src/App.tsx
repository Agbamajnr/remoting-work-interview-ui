import { defaultFilterCategories, defaultTaskCategories } from 'core/slicers/tasksSlice'
import DefaultLayout from 'layouts/default'
import Calendar from 'pages/Calendar'
import CategoryTasks from 'pages/CategoryTasks'
import Tasks from 'pages/Tasks'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />}></Route>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          {defaultFilterCategories.concat(defaultTaskCategories).map(catg => {
            return <Route path={`/category/${catg.name.toLowerCase()}`} element={<CategoryTasks category={catg} />} />
          })}
        </Routes>
      </DefaultLayout>
    </>
  )
}

export default App
