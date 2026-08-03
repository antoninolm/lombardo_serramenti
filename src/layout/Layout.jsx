import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-cream-50 font-sans text-ink-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer variant={pathname === '/' ? 'expanded' : 'simple'} />
    </div>
  )
}
