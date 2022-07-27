import React from "react";
import * as Types from "./types";
import Editor from "./Editor";
import providers from "./icon/providers.json";

const defaultSettings: Types.ISettings = {
    title: "This is a placeholder quite long, really",
    backgroundColor: "#333333",
    frameColor: "#666666",
    iconColor: "#000000",
    pattern: "hideout",
    //download: "PNG",
    author: "Ágata Ordano",
    selectedIcon: { label: "Haskell", value: "DiHaskell" },
    selectedProvider: "di",
    iconProviders: providers,
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
