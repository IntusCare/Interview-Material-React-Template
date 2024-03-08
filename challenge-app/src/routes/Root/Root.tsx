import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import '../global_styles.scss'
import "./styles.scss"

export default function Root({  }){
    return (
        <div className="root-container d-flex flex-column">
            <Navbar />
            <div className="content-container p-5 flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}