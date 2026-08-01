import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Prodotti from './pages/Prodotti'
import Galleria from './pages/Galleria'
import Contatti from './pages/Contatti'
import Preventivo from './pages/Preventivo'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/galleria" element={<Galleria />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/preventivo" element={<Preventivo />} />
      </Route>
    </Routes>
  )
}
