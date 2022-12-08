import { Paper } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import FullPageLoader from "../../components/FullPageLoader"
import Sidebar from "../../components/Sidebar"
import {
  fetchCatalogList,
  fetchMeasureList,
} from "../../redux/thunks/measures.thunk"
import "./style.scss"

const MainLayout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMeasureList())
    dispatch(fetchCatalogList())
  }, [])

  return (
    <div className="MainLayout">
      <div className="sidebar-side">
        <Sidebar />
      </div>
      <div className="content-side">
        <FullPageLoader />
        {children}
      </div>
    </div>
  )
}

export default MainLayout
