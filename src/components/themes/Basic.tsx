import React from "react";
import * as Types from "../types";
import * as Util from "../util";

const BasicTheme = ({ settings }: { settings: Types.ISettings }) => {
    const {
        title,
        backgroundColor,
        frameColor,
        iconColor,
        pattern,
        author,
        selectedIcon,
        selectedProvider,
        font,
        customIcon,
        platform,
    } = settings;

    return (
        <div className="p-4 border" style={{ backgroundColor: frameColor }}>
            <div
                className={`overflow-y-hidden flex  text-gray-800 items-center ${pattern.value} ${platform.value} `}
                style={{ backgroundColor: backgroundColor }}
            >
                <div
                    className={`${font.value} bg-white md:w-10/12  m-auto flex flex-col pt-12 rounded-xl`}
                >
                    <div className="px-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl text-gray-800 font-bold text-center">
                                {title}
                            </h1>
                        </div>
                    </div>

                    <div className=" flex mx-4  p-4 rounded-xl items-center bg-white">
                        {customIcon ? (
                            <div className="w-12 h-12  ">
                                <img
                                    src={customIcon}
                                    alt="img"
                                    className="rounded-full bg-white p-1 border-white"
                                />
                            </div>
                        ) : (
                            <div className="rounded-full bg-white mr-auto ml-2 items-center justify-center flex">
                                <Util.DynamicIcon
                                    icon={`${selectedProvider.value}/${selectedIcon.value}`}
                                    size="5em"
                                    color={iconColor}
                                />
                            </div>
                        )}

                        <h2 className="text-xl ml-auto mr-2 font-semibold">
                            {author}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicTheme;
