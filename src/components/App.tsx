import React from "react";
import * as Types from "./types";
import Editor from "./Editor";
import devicons from "./devicons.json";

const defaultSettings: Types.ISettings = {
    title: "This is a placeholder quite long, really",
    bgColor: "#333333",
    bdColor: "#666666",
    pattern: "hideout",
    //download: "PNG",
    author: "Ágata Ordano",
    selectedIcon: { label: "Haskell", value: "DiHaskell" },
    selectedProvider: "di",
    iconProviders: [
        {
            label: "Font Awesome",
            value: "fa",
        },
        {
            label: "Devicons",
            value: "di",
        },
    ],
    font: "font-sans",
    theme: "modern",
    customIcon: undefined,
    platform: "hashnode",
    loading: false,
};

const App = () => {
    return <Editor settings={defaultSettings} />;
};

export default App;
