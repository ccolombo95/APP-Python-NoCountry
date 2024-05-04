import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import BodyContainerLandingPage from './components/BodyContainer/BodyContainerLandingPage';
import NavBar from './components/NavBar/NavBar';
import SectionMascotas from "./components/SectionMascotas/SectionMascotas";
import PerfilMascota from "./components/SectionMascotas/PerfilMascota/PerfilMascota";
import ContratoMascota from "./components/SectionMascotas/ContratoMascota/ContratoMascota";
import FormularioAdopcion from "./components/FormularioAdopcion/FomularioAdopcion";
import Noticia from "./components/Noticia/Noticia";
import LogIn from "./components/LogIn/LogIn";
import SobreNosotrosSection from './components/SobreNosotrosSection/SobreNosotrosSection';


import NavBarAdmin from "./components/Admin/NavBarAdmin/NavBarAdmin";
import BodyContainerAdmin from './components/Admin/BodyContainerAdmin';

import PostsAdmin from './components/Admin/Posts/PostsAdmin';
import NewPostAdmin from './components/Admin/Posts/NewPost/NewPost';
import EditPostAdmin from './components/Admin/Posts/EditPost/EditPost';

import BookingsAdmin from './components/Admin/Bookings/BookingsAdmin';
import BookingInfoAdmin from './components/Admin/Bookings/BookingInfoAdmin/BookingInfo';

import NewsAdmin from './components/Admin/News/NewsAdmin';
import NewNewAdmin from './components/Admin/News/NewNew/NewNew';
import EditNewAdmin from './components/Admin/News/EditNew/EditNew';
import FinAdopcionSection from './components/FinAdopcionSection/FinAdopcionSection';


function App() {
  
  const isAdminRoute = (path) => path.startsWith('/Admin');

  return (
    <div>
      <BrowserRouter>
        {!isAdminRoute(window.location.pathname) && <NavBar />}
        <Routes>
          <Route path='/' element={<BodyContainerLandingPage />} />
          <Route path='/noticia/:id' element={<Noticia />} />
          <Route path='/Mascotas' element={<SectionMascotas />} />
          <Route path='/SobreNosotros' element={<SobreNosotrosSection />} />
          <Route path='/perfil/:id/' element={<PerfilMascota />} />
          <Route path='/perfil/:id/contrato' element={<ContratoMascota />} />
          <Route path='/perfil/:id/contrato/FormularioAdopcion' element={<FormularioAdopcion />} />
          <Route path='/perfil/:id/contrato/FormularioAdopcion/end' element={<FinAdopcionSection />} />
          <Route path='/LogIn' element={<LogIn />} />

          <Route path='/Admin/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Componente para las rutas del área de administración
const AdminRoutes = () => (
  <>
    <NavBarAdmin />

    <Routes>
      <Route path='' element={<BodyContainerAdmin />} />

      <Route path='/Posts' element={<PostsAdmin />} />
      <Route path='/Posts/NewPost' element={<NewPostAdmin />} />
      <Route path='/Posts/EditPost/:id' element={<EditPostAdmin />} />
      <Route path='/Posts/Delete/:id' element={<PostsAdmin />} />

      <Route path='/Bookings' element={<BookingsAdmin />} />
      <Route path="/Bookings/:id" element={<BookingInfoAdmin />}></Route>

      <Route path='/News' element={<NewsAdmin />} />
      <Route path='/News/NewNew' element={<NewNewAdmin />} />
      <Route path='/News/EditNew/:id' element={<EditNewAdmin />} />

    </Routes>
  </>
);

export default App;
