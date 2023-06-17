import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import UserHomePage from "./pages/UserHomePage";
import UserHomeFiltersPage from "./pages/UserHomeFiltersPage";
import UserCreatePage from "./pages/UserCreatePage";
import ShowEventPage from "./pages/ShowEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/events/:id" element={<EditPage/>}/>
                <Route path="/home" element={<UserHomePage/>}/>
                <Route path="/home/filters" element={<UserHomeFiltersPage/>}/>
                <Route path="/create" element={<UserCreatePage/>}/>
                <Route path="/events/show/:id" element={<ShowEventPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
