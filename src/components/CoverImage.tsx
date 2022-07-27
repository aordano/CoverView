import React from "react";
import "../assets/css/patterns.css";
import ModernTheme from "./themes/Modern";
import BasicTheme from "./themes/Basic";
import OutlineTheme from "./themes/Outline";
import * as Types from "./types";

const CoverImage = (props: Types.ISettings) => {
    const { theme } = props;

    const selectTheme = (theme: Types.ISelectOption) => {
        switch (theme.value) {
            case "basic":
                return <BasicTheme settings={props} />;
            case "modern":
                return <ModernTheme settings={props} />;
            case "outline":
                return <OutlineTheme settings={props} />;

            default:
                return <ModernTheme settings={props} />;
        }
    };

    return (
        <div className="md:w-full md:scale-100 scale-50">
            {selectTheme(theme)}{" "}
        </div>
    );
};

export default CoverImage;
