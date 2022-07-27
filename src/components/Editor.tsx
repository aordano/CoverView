import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from "react-select";
import "./Editor.css";
import * as Types from "./types";
import * as Util from "./util";
import chroma from "chroma-js";
import patternsFile from "../assets/css/patterns.css";
import platformsFile from "../assets/css/platforms.css";
import fontsFile from "../assets/css/fonts.css";
import * as themesModule from "./themes";
import * as providersModule from "./icon";

class Editor extends React.Component<Types.IEditorProps, Types.ISettings> {
    state = this.props.settings;

    initStuff = () => {
        const patterns = this.getOptionsFromCSS(patternsFile);
        const platforms = this.getOptionsFromCSS(platformsFile);
        const fonts = this.getOptionsFromCSS(fontsFile);
        const themes = this.getOptionsFromModule(themesModule);
        const providers = this.getProviderOptions(providersModule);
        this.setState({
            patternsList: patterns,
            platformsList: platforms,
            fontsList: fonts,
            themesList: themes,
            providersList: providers,
            pattern: patterns[0],
            platform: platforms[0],
            font: fonts[0],
            theme: themes.filter((theme) => theme.value === "modern")[0],
            selectedProvider: providers[0],
        });
    };

    getOptionsFromCSS = (file: string): Types.ISelectOption[] => {
        const list: Types.ISelectOption[] = [];
        for (let match of file.matchAll(/\.([^\d][^org][\w|-]+)/gi)) {
            list.push({
                value: match[1],
                label: match[1]
                    .replace(/^(\w)/g, (char) => char.toLocaleUpperCase())
                    .replaceAll(/-/g, " "),
            });
        }
        return list;
    };

    getOptionsFromModule = (module: any): Types.ISelectOption[] => {
        const options = Object.keys(module);

        return options.map((option) => {
            return {
                value: option,
                label: option
                    .replace(/^(\w)/g, (char) => char.toLocaleUpperCase())
                    .replaceAll(/-/g, " "),
            };
        });
    };

    getProviderOptions = (module: any): Types.ISelectOption[] => {
        const options = Object.keys(module);

        return options.map((option) => {
            return {
                value: option.replaceAll(/[a-z]/g, "").toLocaleLowerCase(),
                label: option
                    .replace(/^(\w)/g, (char) => char.toLocaleUpperCase())
                    .replaceAll(/-/g, " "),
            };
        });
    };

    getRandomTheme = () => {
        const baseColor = chroma.random();
        const contrastColorRaw = baseColor.lch().map((value, index, color) => {
            switch (index) {
                case 0: {
                    const lightness = value;
                    let reference = "white";

                    if (lightness > 127) {
                        reference = "black";
                    } else {
                    }

                    const contrast = chroma.contrast(
                        chroma.lch(color[0], color[1], color[2]),
                        reference
                    );

                    if (contrast > 4.5) {
                        return lightness;
                    } else {
                        const correctedLightness =
                            reference === "white"
                                ? lightness - (255 - lightness) / 3
                                : lightness + (255 - lightness) / 3;
                        return correctedLightness;
                    }
                }
                case 1: {
                    return value;
                }
                case 2: {
                    return Math.abs(Math.trunc(value) - 255 / 3);
                }
            }
            return value;
        });
        const contrastColor = chroma.lch(
            contrastColorRaw[0],
            contrastColorRaw[1],
            contrastColorRaw[2]
        );
        const colors = chroma
            .scale([baseColor, contrastColor])
            .mode("lab")
            .colors(3);
        this.setState({
            backgroundColor: colors[0],
            frameColor: colors[2],
            iconColor: colors[1],
            pattern: this.state.patternsList?.[
                Math.round(Math.random() * this.state.patternsList.length)
            ] ?? { label: "", value: "" },
        });
    };
    handleReset = () => {
        this.setState(this.props.settings);
    };

    handleCustomIconLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            loading: true,
        });

        if (this.state.customIcon) {
            this.setState({
                customIcon: undefined,
            });
        }

        Util.getBase64(
            (function () {
                const target = event.target;
                const files = target.files;
                if (files && files.length > 0) {
                    return files[0];
                } else {
                    console.error(
                        "Something went wrong loading the file, try again."
                    );
                    return new File([], "");
                }
            })()
        )
            .then((encodedFile) => {
                this.setState({
                    loading: false,
                    customIcon: encodedFile,
                });
            })
            .catch((err) => {
                console.error("Loading the file failed.");
                this.setState({
                    loading: false,
                });
            });
    };

    handleProviderIconListLoad = (provider: Types.ISelectOption) => {
        this.setState({
            loading: true,
        });

        if (this.state.providerList) {
            this.setState({
                providerList: undefined,
            });
        }

        Util.DynamicIconList(provider.value)
            .then((list) => {
                this.setState({
                    loading: false,
                    providerList: list ?? [],
                    selectedIcon: {
                        label: (list ?? [])[0].label,
                        value: (list ?? [])[0].value,
                    },
                });
            })
            .catch((err) => {
                console.error("Loading the data failed.");
                this.setState({
                    loading: false,
                });
            });
    };

    handleCustomIconReset = () => {
        this.setState({
            customIcon: undefined,
        });
    };

    componentDidMount() {
        this.handleProviderIconListLoad(this.state.selectedProvider);
        this.initStuff();
    }

    render() {
        return (
            <div className="flex md:flex-row bg-base-100 flex-cola justify-center p-2 place-items-center">
                <div className="bg-base-300 card p-4 flex flex-col md:w-1/3">
                    <div className="m-2 flex flex-col">
                        <span className="font-medium">Blog Title</span>
                        <textarea
                            //type="text"
                            value={this.state.title}
                            placeholder="Enter title here"
                            className="textarea text-l p-2"
                            onChange={(e) =>
                                this.setState({ title: e.target.value })
                            }
                        />
                    </div>

                    <div className="flex flex-col m-2 ">
                        <span className="font-medium">Author</span>
                        <input
                            type="text"
                            value={this.state.author}
                            placeholder="Author"
                            className="input text-l p-2"
                            onChange={(e) =>
                                this.setState({
                                    author: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col m-1 w-1/3">
                            <span className="font-medium">Background</span>
                            <div className="input transition-all duration-300 border-0 text-l items-center flex p-2">
                                <input
                                    type="color"
                                    value={this.state.backgroundColor}
                                    onChange={(e) =>
                                        this.setState({
                                            backgroundColor: e.target.value,
                                        })
                                    }
                                    className="flex mx-2 rounded-2 flex-row w-full rounded"
                                />
                                <span className="text-sm text-primary-content mx-2">
                                    {this.state.backgroundColor}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col m-1 w-1/3">
                            <span className="font-medium">Border</span>
                            <div className="input transition-all duration-300 border-0 text-l flex items-center p-2">
                                <input
                                    type="color"
                                    value={this.state.frameColor}
                                    onChange={(e) =>
                                        this.setState({
                                            frameColor: e.target.value,
                                        })
                                    }
                                    className="flex mx-2 rounded-2 flex-row w-full rounded"
                                />
                                <span className="text-sm text-primary-content mx-2">
                                    {this.state.frameColor}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col m-1 w-1/3">
                            <span className="font-medium">Icon</span>
                            <div className="input transition-all duration-300 border-0 text-l flex items-center p-2">
                                <input
                                    type="color"
                                    value={this.state.iconColor}
                                    onChange={(e) =>
                                        this.setState({
                                            iconColor: e.target.value,
                                        })
                                    }
                                    className="flex mx-2 rounded-2 flex-row w-full rounded"
                                />
                                <span className="text-sm text-primary-content mx-2">
                                    {this.state.iconColor}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">
                                Provider
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 px-1"
                                    href={`https://react-icons.github.io/react-icons/icons?name=${this.state.selectedProvider}`}
                                >
                                    (Chart)
                                </a>
                            </span>
                            <Select
                                value={this.state.selectedProvider}
                                onChange={(selectedOption) => {
                                    this.setState({
                                        selectedProvider: selectedOption ?? {
                                            value: "",
                                            label: "",
                                        },
                                    });
                                    this.handleProviderIconListLoad(
                                        selectedOption ?? {
                                            value: "",
                                            label: "",
                                        }
                                    );
                                }}
                                options={this.state.providersList}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: "hsl(var(--b1))",
                                        neutral0: "hsl(var(--b1))",
                                        //primary75: "hsl(var(--b1))",
                                        primary25: "hsl(var(--b2))",
                                    },
                                })}
                                menuPortalTarget={document.body}
                                formatOptionLabel={this.formatSelectLabel}
                                className="weird-selector input text-l bg-base-100"
                            />
                        </div>

                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Icon</span>
                            <Select
                                value={this.state.selectedIcon}
                                onChange={(selectedOption) =>
                                    this.setState({
                                        selectedIcon: {
                                            label:
                                                selectedOption?.label ??
                                                "Error",
                                            value:
                                                selectedOption?.value ??
                                                "Error",
                                        },
                                    })
                                }
                                isSearchable={true}
                                options={this.state.providerList}
                                theme={(theme) => ({
                                    ...theme,

                                    colors: {
                                        ...theme.colors,
                                        primary: "hsl(var(--b1))",
                                        neutral0: "hsl(var(--b1))",
                                        neutral50: "hsl(var(--b1))",
                                        primary25: "hsl(var(--b2))",
                                    },
                                })}
                                formatOptionLabel={this.formatIconLabel}
                                className="weird-selector input text-l border-0"
                            />
                        </div>
                    </div>

                    {this.state.selectedIcon.label === "[custom]" ? (
                        <div className="flex flex-row m-2">
                            <div className="input-group">
                                <input
                                    type="file"
                                    className="input border text-l p-2 w-full"
                                    onChange={(event) =>
                                        this.handleCustomIconLoad(event)
                                    }
                                />
                                <button
                                    className="transition-all duration-300 btn bg-base-100 border-0 border-base-300 border-l-2 rounded-2 hover:-translate-y-[1px] justify-self-end"
                                    onClick={() => this.handleCustomIconReset()}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : this.state.loading === true ? (
                        <div className="border p-2  bg-slate-800 hover:bg-indigo-900 hover:-translate-y-[1px] text-white  flex items-center text-white text-xl rounded-lg m-4 px-4">
                            <span className="w-full text-center">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className="flex">
                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Pattern</span>
                            <Select
                                value={this.state.pattern}
                                onChange={(selectedOption) =>
                                    this.setState({
                                        pattern: {
                                            label:
                                                selectedOption?.label ??
                                                "Error",
                                            value:
                                                selectedOption?.value ??
                                                "Error",
                                        },
                                    })
                                }
                                isSearchable={true}
                                options={this.state.patternsList}
                                theme={(theme) => ({
                                    ...theme,

                                    colors: {
                                        ...theme.colors,
                                        primary: "hsl(var(--b1))",
                                        neutral0: "hsl(var(--b1))",
                                        neutral50: "hsl(var(--b1))",
                                        primary25: "hsl(var(--b2))",
                                    },
                                })}
                                menuPortalTarget={document.body}
                                formatOptionLabel={this.formatSelectLabel}
                                className="overflow-auto weird-selector input text-l border-0"
                            />
                        </div>

                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Theme</span>
                            <Select
                                value={this.state.theme}
                                onChange={(selectedOption) =>
                                    this.setState({
                                        theme: {
                                            label:
                                                selectedOption?.label ??
                                                "Error",
                                            value:
                                                selectedOption?.value ??
                                                "Error",
                                        },
                                    })
                                }
                                isSearchable={true}
                                options={this.state.themesList}
                                theme={(theme) => ({
                                    ...theme,

                                    colors: {
                                        ...theme.colors,
                                        primary: "hsl(var(--b1))",
                                        neutral0: "hsl(var(--b1))",
                                        neutral50: "hsl(var(--b1))",
                                        primary25: "hsl(var(--b2))",
                                    },
                                })}
                                menuPortalTarget={document.body}
                                formatOptionLabel={this.formatSelectLabel}
                                className="overflow-auto weird-selector input text-l border-0"
                            />
                        </div>

                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Font</span>
                            <Select
                                value={this.state.font}
                                onChange={(selectedOption) =>
                                    this.setState({
                                        font: {
                                            label:
                                                selectedOption?.label ??
                                                "Error",
                                            value:
                                                selectedOption?.value ??
                                                "Error",
                                        },
                                    })
                                }
                                isSearchable={true}
                                options={this.state.fontsList}
                                theme={(theme) => ({
                                    ...theme,

                                    colors: {
                                        ...theme.colors,
                                        primary: "hsl(var(--b1))",
                                        neutral0: "hsl(var(--b1))",
                                        neutral50: "hsl(var(--b1))",
                                        primary25: "hsl(var(--b2))",
                                    },
                                })}
                                menuPortalTarget={document.body}
                                formatOptionLabel={this.formatSelectLabel}
                                className="overflow-auto weird-selector input text-l border-0"
                            />
                        </div>

                        <div className="flex flex-col justify-self-end m-2">
                            <span className="font-medium invisible">
                                Buttons
                            </span>

                            <div className="items-center justify-center flex flex-row">
                                <button
                                    className="transition-all duration-300 btn bg-base-100 border-0 rounded-2 w-[45px] h-[45px] mx-1 hover:-translate-y-[1px] p-2 cursor-pointer"
                                    onClick={this.getRandomTheme}
                                >
                                    <svg
                                        width="1.75em"
                                        height="1.75em"
                                        viewBox="0 0 16 16"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="opacity-60 m-auto"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                                        />
                                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                                    </svg>
                                </button>
                                <button
                                    className="transition-all duration-300 btn bg-base-100 border-0 rounded-2 w-[45px] h-[45px] mx-1 hover:-translate-y-[1px] p-2 cursor-pointer"
                                    onClick={this.handleReset}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.75em"
                                        height="1.75em"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-rotate-ccw opacity-60 m-auto"
                                    >
                                        <polyline points="1 4 1 10 7 10"></polyline>
                                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col m-2">
                        <span className="font-medium">Platform</span>
                        <Select
                            value={this.state.platform}
                            onChange={(selectedOption) =>
                                this.setState({
                                    platform: {
                                        label: selectedOption?.label ?? "Error",
                                        value: selectedOption?.value ?? "Error",
                                    },
                                })
                            }
                            isSearchable={true}
                            options={this.state.platformsList}
                            theme={(theme) => ({
                                ...theme,

                                colors: {
                                    ...theme.colors,
                                    primary: "hsl(var(--b1))",
                                    neutral0: "hsl(var(--b1))",
                                    neutral50: "hsl(var(--b1))",
                                    primary25: "hsl(var(--b2))",
                                },
                            })}
                            menuPortalTarget={document.body}
                            formatOptionLabel={this.formatSelectLabel}
                            className="overflow-auto weird-selector input text-l border-0"
                        />
                    </div>
                </div>

                <div className="flex flex-col p-4 justify-center place-items-center h-full">
                    <ComponentToImg>
                        <CoverImage {...this.state} />
                    </ComponentToImg>
                </div>
            </div>
        );
    }
}

export default Editor;
