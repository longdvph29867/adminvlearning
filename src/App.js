import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AdminUser from './Pages/AdminUser/AdminUser';
import AdminCourse from './Pages/AdminCourse/AdminCourse';
import AdminLayout from './Layout/AdminLayout';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminRegister from './Pages/AdminRegister/AdminRegister';
import AddCourse from './Pages/AdminCourse/AddCourse';
import UpdateCourse from './Pages/AdminCourse/UpdateCourse';
import AddUser from './Pages/AdminUser/AddUser';
import UpdateUser from './Pages/AdminUser/UpdateUser';
import DetailCourse from './Pages/AdminCourse/DetailCourse/DetailCourse';
import DetailUser from './Pages/AdminUser/DetailUser/DetailUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminLayout Component={AdminUser}/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin-signup' element={<AdminRegister/>}/>

        <Route path='/admin-user' element={<AdminLayout Component={AdminUser}/>}/>
        <Route path='/admin-adduser' element={<AdminLayout Component={AddUser}/>}/>
        <Route path='/admin-updateuser/:id' element={<AdminLayout Component={UpdateUser}/>}/>
        <Route path='/admin-detailuser/:id' element={<AdminLayout Component={DetailUser}/>}/>

        <Route path='/admin-course' element={<AdminLayout Component={AdminCourse}/>}/>
        <Route path='/admin-addcourse' element={<AdminLayout Component={AddCourse}/>}/>
        <Route path='/admin-updatecourse/:id' element={<AdminLayout Component={UpdateCourse}/>}/>
        <Route path='/admin-detailcourse/:id' element={<AdminLayout Component={DetailCourse}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
