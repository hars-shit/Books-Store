
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import CreateBooks from './page/CreateBooks'
import ShowBooks from './page/ShowBooks'
import EditBooks from './page/EditBooks'
import DeleteBooks from './page/DeleteBooks'

function App() {


  return (
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/books/create' element={<CreateBooks />}/>
    <Route path='/books/details/:id' element={<ShowBooks />}/>
    <Route path='/books/edit/:id' element={<EditBooks />}/>
    <Route path='/books/delete/:id' element={<DeleteBooks />}/>
  </Routes>
  )
}

export default App
