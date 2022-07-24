import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Editor from "./Editor";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
