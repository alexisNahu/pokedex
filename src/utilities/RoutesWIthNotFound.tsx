import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

export const RoutesWithNotFound  = ({children}: {children: ReactNode}) => {
    return (
        <Routes>
            <Route path="*" element={<div>Not Found 404</div>}></Route>
            {children}
        </Routes>
    )
}