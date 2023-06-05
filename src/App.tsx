import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import UserHomePage from "./pages/UserHomePage";
import UserCreatePage from "./pages/UserCreatePage";
import ShowEventPage from "./pages/ShowEventPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/events/:id" element={<EditPage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/create" element={<UserCreatePage/>}/>
                <Route path="/events/show/:id" element={<ShowEventPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
