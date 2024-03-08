import { Outlet } from "react-router-dom";


export default function Root({  }){
    return (
        <div>
            <h2>Root</h2>
            <div>
                <Outlet />
            </div>
        </div>
    )
}