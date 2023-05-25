import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                {/*<Route path="/events/:id" element={<EditPage/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
