import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-iron-700 font-sans text-cream-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer variant={pathname === '/' ? 'expanded' : 'simple'} />
    </div>
  )
}
