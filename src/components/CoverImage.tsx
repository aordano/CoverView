import React from "react";
import "./CoverImage.css";
import "../assets/css/patterns.css";
import ModernTheme from "./Themes/ModernTheme";
import BasicTheme from "./Themes/BasicTheme";
import OutlineTheme from "./Themes/OutlineTheme";
import * as Types from "./types";

const CoverImage = (props: Types.ISettings) => {
    const { theme } = props;

    const selectTheme = (theme: string) => {
        switch (theme) {
            case "basic":
                return <BasicTheme settings={props} />;
            case "modern":
                return <ModernTheme settings={props} />;
            case "outline":
                return <OutlineTheme settings={props} />;

            default:
                return <BasicTheme settings={props} />;
        }
    };

    return (
        <div className="md:w-full md:scale-100 scale-50">
            {selectTheme(theme)}{" "}
        </div>
    );
};

export default CoverImage;
