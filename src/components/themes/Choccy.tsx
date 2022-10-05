import React from "react";
import * as Types from "../types";
import * as Util from "../util";
import "../../assets/css/choccy.css";

const ChoccyTheme = ({ settings }: { settings: Types.ISettings }) => {
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
        <div
            className="w-full p-4 border"
            style={{ backgroundColor: frameColor }}
        >
            <div className=" overflow-y-hidden w-full flex  items-center">
                <div
                    className={`  h-full w-full rounded-xl  p-4 text-gray-800 flex  items-center ${pattern.value} ${platform.value}`}
                    style={{
                        backgroundColor: backgroundColor,
                        backgroundBlendMode: "difference",
                    }}
                >
                    <div className="absolute top-0 pt-12 pl-4">
                        <div
                            className="w-36 h-36 rounded-full mx-auto items-center justify-center flex"
                            style={{ backgroundColor: frameColor }}
                        >
                            <div
                                className="w-32 h-32 rounded-full mx-auto items-center justify-center flex"
                                style={{ backgroundColor: backgroundColor }}
                            >
                                {customIcon ? (
                                    <div className="rounded-full w-30 h-30 bg-gray-300 mx-auto items-center justify-center flex">
                                        <img
                                            src={customIcon}
                                            alt="img"
                                            className="w-28 h-28 rounded-full bg-white border-4 border-white"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="rounded-full w-30 h-30 mx-auto items-center justify-center flex"
                                        style={{
                                            backgroundColor: backgroundColor,
                                        }}
                                    >
                                        <div className="rounded-full p-4 w-30 h-30 bg-white">
                                            <Util.Icon settings={settings} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-full w-full">
                        <div
                            className={`${font.value} bg-white bg-opacity-40 pl-[25%] justify-center text-right rounded-xl h-full p-10 flex flex-col`}
                        >
                            <h1 className="h-full text-3xl md:text-5xl self-start font-bold text-gray-800 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                                {title}
                            </h1>
                            <h2 className="text-xl mt-10 font-semibold text-right [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                                {author}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoccyTheme;
