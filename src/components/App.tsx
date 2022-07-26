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
    icon: { label: "typescript", value: "typescript" },
    devIconOptions: devicons as Types.IDevIcon[],
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
