import React from "react";
import * as Types from "./types";
import Editor from "./Editor";

const defaultSettings: Types.ISettings = {
    title: "This is a placeholder quite long, really",
    bgColor: "#ffe9e3",
    bdColor: "#ffc9b3",
    pattern: "",
    //download: "PNG",
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
    customIcon: undefined,
    platform: "hashnode",
    loading: false,
};

const App = () => {
    return <Editor settings={defaultSettings} />;
};

export default App;
