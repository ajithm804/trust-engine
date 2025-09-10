import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  ShieldCheckIcon,
  BeakerIcon,
  UserGroupIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"

const Sidebar = () => {
  const location = useLocation()
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Bias Detection", href: "/bias-detection", icon: ShieldCheckIcon },
    { name: "A/B Testing", href: "/ab-testing", icon: BeakerIcon },
    { name: "Persona Generator", href: "/persona-generator", icon: UserGroupIcon },
  ]
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">🚀 Trust Engine</h1>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              let linkClass = "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors "
              if (isActive) {
                linkClass += "bg-blue-100 text-blue-700"
              } else {
                linkClass += "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={linkClass}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Team Halo | Ajith</p>
          <p className="text-xs text-gray-400">v2.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
