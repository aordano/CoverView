import React from "react";
import * as Types from "./types";
import Editor from "./Editor";
import { DiHaskell } from "react-icons/di";

const defaultSettings: Types.ISettings = {
    title: "This is a placeholder quite long, really",
    backgroundColor: "#333333",
    frameColor: "#666666",
    iconColor: "#000000",
    pattern: { label: "Empty", value: "empty" },
    author: "Ágata Ordano",
    selectedIcon: { label: "Haskell", value: "DiHaskell" },
    selectedProvider: { label: "Dev Icons", value: "di" },
    font: { label: "Roboto", value: "roboto" },
    theme: { label: "Modern", value: "modern" },
    platform: { label: "Hashnode", value: "hashnode" },
    loading: false,
    icon: DiHaskell,
};

const App = () => {
    return <Editor settings={defaultSettings} />;
};

export default App;
