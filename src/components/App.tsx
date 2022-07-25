import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Types from "./types";
import Editor from "./Editor";

const defaultSettings: Types.ISettings = {
    title: "This is a placeholder quite long, really",
    bgColor: "#ffe9e3",
    pattern: "",
    download: "PNG",
    author: "Ágata Ordano",
    icon: { label: "react", value: "react" },
    devIconOptions: [
        {
            name: "adonisjs",
            tags: ["nodejs", "framework"],
            versions: {
                svg: ["original", "original-wordmark"],
                font: ["original", "original-wordmark"],
            },
            color: "#5A45FF",
            aliases: [
                {
                    base: "original",
                    alias: "plain",
                },
                {
                    base: "original-wordmark",
                    alias: "plain-wordmark",
                },
            ],
        },
    ],
    font: "font-Anek",
    theme: "stylish",
    customIcon: new File([], ""),
    platform: "hashnode",
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Editor settings={defaultSettings} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
