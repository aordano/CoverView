import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from "react-select";
import RandomTheme from "./RandomTheme";
import "./Editor.css";
import * as Types from "./types";
import * as Util from "./util";

class Editor extends React.Component<Types.IEditorProps, Types.ISettings> {
    state = this.props.settings;
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

    handleProviderIconListLoad = (provider: string) => {
        this.setState({
            loading: true,
        });

        if (this.state.providerList) {
            this.setState({
                providerList: undefined,
            });
        }

        Util.DynamicIconList(provider)
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

    componentDidMount() {
        this.handleProviderIconListLoad(this.state.selectedProvider);
    }

    handleCustomIconReset = () => {
        this.setState({
            customIcon: undefined,
        });
    };

    getRandomTheme: Types.TThemeGetter = (theme, Pattern) => {
        this.setState({
            backgroundColor: theme.bgColor,
            frameColor: theme.bdColor,
            pattern: Pattern,
        });
    };

    formatIconLabel = ({ value, label }: { value: string; label: string }) => (
        <div className="m-0 p-0 text-primary-content">{label}</div>
    );

    formatIconProviderLabel = ({ label }: { label: string }) => (
        <div className="m-0 p-0 text-primary-content">{label}</div>
    );

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
                                value={{
                                    value: this.state.selectedProvider,
                                    label: this.state.iconProviders.filter(
                                        (provider) =>
                                            provider.value ===
                                            this.state.selectedProvider
                                    )[0].label,
                                }}
                                onChange={(selectedOption) => {
                                    this.setState({
                                        selectedProvider:
                                            selectedOption?.value ?? "Error",
                                    });
                                    this.handleProviderIconListLoad(
                                        selectedOption?.value ?? "Error"
                                    );
                                }}
                                options={this.state.iconProviders}
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
                                formatOptionLabel={this.formatIconProviderLabel}
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
                            <select
                                onChange={(e) =>
                                    this.setState({
                                        pattern: e.target.value,
                                    })
                                }
                                className="transition-all duration-300 select border text-l p-2"
                                value={this.state.pattern}
                            >
                                <option>none</option>
                                <option>graph-paper</option>
                                <option>jigsaw</option>
                                <option>hideout</option>
                                <option>dots</option>
                                <option>falling-triangles</option>
                                <option>circuit-board</option>
                                <option>temple</option>
                                <option>anchors</option>
                                <option>brickwall</option>
                                <option>overlapping-circles</option>
                                <option>wiggle</option>
                                <option>tic-tac-toe</option>
                                <option>leaf</option>
                                <option>bubbles</option>
                                <option>squares</option>
                                <option>explorer</option>
                                <option>jupiter</option>
                                <option>sun</option>
                            </select>
                        </div>

                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Theme</span>

                            <select
                                onChange={(e) =>
                                    this.setState({
                                        theme: e.target.value,
                                    })
                                }
                                value={this.state.theme}
                                className="transition-all duration-300 select border text-l p-2"
                            >
                                <option>basic</option>
                                <option>modern</option>
                                <option>outline</option>
                            </select>
                        </div>

                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Font</span>

                            <select
                                value={this.state.font}
                                onChange={(e) =>
                                    this.setState({
                                        font: e.target.value,
                                    })
                                }
                                className="transition-all duration-300 select border text-l p-2"
                            >
                                <option>font-serif</option>
                                <option>font-sans</option>
                                <option>font-mono</option>
                                <option>font-Inter</option>
                                <option>font-Poppins</option>
                                <option>font-Anek</option>
                                <option>font-Nunito</option>
                            </select>
                        </div>

                        <div className="flex flex-col justify-self-end m-2">
                            <span className="font-medium invisible">
                                Buttons
                            </span>

                            <div className="items-center justify-center flex flex-row">
                                <RandomTheme
                                    onThemeChange={this.getRandomTheme}
                                />
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

                        <select
                            onChange={(e) =>
                                this.setState({
                                    platform: e.target.value,
                                })
                            }
                            value={this.state.platform}
                            className="select border text-l p-2"
                        >
                            <option>hashnode</option>
                            <option>dev</option>
                        </select>
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
