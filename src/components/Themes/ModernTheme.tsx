import React from "react";
import * as Types from "../types";
import * as Util from "../util";

const ModernTheme = ({ settings }: { settings: Types.ISettings }) => {
    const {
        title,
        bgColor,
        bdColor,
        pattern,
        author,
        selectedIcon,
        selectedProvider,
        font,
        customIcon,
        platform,
    } = settings;

    return (
        <div className="w-full p-4 border" style={{ backgroundColor: bdColor }}>
            <div className=" overflow-y-hidden w-full flex  items-center">
                <div
                    className={`  h-full w-full rounded-xl  p-4 text-gray-800 flex  items-center ${pattern} ${platform}`}
                    style={{ backgroundColor: bgColor }}
                >
                    {
                        //TODO Increase rounding of the main background, and add a border that is contrasting with the bdColor
                    }
                    {customIcon ? (
                        <div className="  mx-auto items-center justify-center flex">
                            <img
                                src={customIcon}
                                alt="img"
                                className="w-28 h-28 rounded-full bg-white border-4 border-white"
                            />
                        </div>
                    ) : (
                        <div className=" rounded-full p-6 w-32 h-32 bg-white mx-auto items-center justify-center flex">
                            <Util.DynamicIcon
                                icon={`${selectedProvider}/${selectedIcon.value}`}
                                size="5em"
                                color="black"
                            />
                        </div>
                    )}

                    <div className="h-full w-2/3">
                        <div
                            className={`${font} bg-white px-12 justify-center text-left rounded-xl h-full p-4 flex flex-col`}
                        >
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                                {title}
                            </h1>
                            <h2 className="text-xl mt-10 font-semibold text-left ">
                                {author}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernTheme;
