import React from "react";
import * as Types from "../types";
import * as Util from "../util";
const OutlineTheme = ({ settings }: { settings: Types.ISettings }) => {
    const {
        title,
        backgroundColor,
        frameColor,
        pattern,
        author,
        font,
        customIcon,
        platform,
    } = settings;

    return (
        <div className="p-4 border" style={{ backgroundColor: frameColor }}>
            <div
                className={`overflow-y-hidden rounded flex flex-col text-gray-800 items-center border-4 border-gray-800 ${pattern.value} ${platform.value} `}
                style={{
                    backgroundColor: backgroundColor,
                    backgroundBlendMode: "difference",
                }}
            >
                <div
                    className={`${font.value} bg-white rounded-2xl md:w-10/12 m-auto flex flex-col p-12 `}
                >
                    <h1 className="text-3xl text-gray-800 md:text-5xl font-bold text-center">
                        {title}
                    </h1>
                </div>

                <div
                    className={`${font.value} w-full h-24 border-gray-800 border-t-4 flex  mt-auto mb-0 p-2 px-6  items-center bg-white`}
                >
                    {customIcon ? (
                        <div className="w-12 h-12  ">
                            <img
                                src={customIcon}
                                alt="img"
                                className="rounded-full bg-white p-1 border-white"
                            />
                        </div>
                    ) : (
                        <div className="mr-auto ml-2 items-center justify-center flex">
                            <Util.Icon settings={settings} />
                        </div>
                    )}
                    <h2 className="text-xl ml-auto mr-2 font-semibold">
                        {author}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default OutlineTheme;
