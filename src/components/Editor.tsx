import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from "react-select";
import RandomTheme from "./RandomTheme";
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
            bgColor: theme.bgColor,
            bdColor: theme.bdColor,
            pattern: Pattern,
        });
    };

    formatIconLabel = ({ value, label }: { value: string; label: string }) => (
        <div className="flex">
            <span className="mr-2">{label}</span>
        </div>
    );

    formatIconProviderLabel = ({ label }: { label: string }) => (
        <div className="flex">
            <span className="mr-2">{label}</span>
        </div>
    );

    render() {
        return (
            <div className="flex md:flex-row flex-col bg-gray-200 justify-center p-2">
                <div className="bg-white shadow-sm p-4 flex flex-col md:w-1/3">
                    <div className="m-2 flex flex-col">
                        <span className="font-medium">Blog Title</span>
                        <textarea
                            //type="text"
                            value={this.state.title}
                            placeholder="Enter title here"
                            className="focus:outline-none border text-gray-700 text-xl rounded p-2 h-24"
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
                            className="focus:outline-none border text-gray-700 text-xl rounded bg-white p-2"
                            onChange={(e) =>
                                this.setState({
                                    author: e.target.value,
                                })
                            }
                        ></input>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-col items-center m-2 w-1/2">
                            <span className="font-medium">Font</span>

                            <select
                                value={this.state.font}
                                onChange={(e) =>
                                    this.setState({
                                        font: e.target.value,
                                    })
                                }
                                className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
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
                    </div>

                    <div className="flex flex-row items-center">
                        <div className="flex flex-col m-1 ">
                            <span className="font-medium">Background</span>
                            <div className="border rounded flex items-center p-2">
                                <span className="text-sm text-gray-700 font-semibold mx-2">
                                    {this.state.bgColor}
                                </span>
                                <input
                                    type="color"
                                    value={this.state.bgColor}
                                    onChange={(e) =>
                                        this.setState({
                                            bgColor: e.target.value,
                                        })
                                    }
                                    className="h-8 w-8  rounded"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col m-1">
                            <span className="font-medium">Border</span>
                            <div className="border rounded flex items-center p-2">
                                <span className="text-sm text-gray-700 font-semibold mx-2">
                                    {this.state.bdColor}
                                </span>
                                <input
                                    type="color"
                                    value={this.state.bdColor}
                                    onChange={(e) =>
                                        this.setState({
                                            bdColor: e.target.value,
                                        })
                                    }
                                    className="h-8 w-8  rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col m-2 w-1/2">
                            <span className="font-medium">Provider</span>
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
                                formatOptionLabel={this.formatIconProviderLabel}
                                className="outline-none focus:outline-none text-xl text-gray-700"
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
                                formatOptionLabel={this.formatIconLabel}
                                className="outline-none focus:outline-none text-xl text-gray-700"
                            />
                        </div>
                    </div>

                    {this.state.selectedIcon.label === "custom" ? (
                        <div className="flex items-center justify-center m-2">
                            <input
                                type="file"
                                className="focus:outline-none text-lg cursor-pointer bg-white rounded border px-2 py-1 bg-gray-200"
                                onChange={(event) =>
                                    this.handleCustomIconLoad(event)
                                }
                            />
                            <button
                                className="flex items-center mx-auto rounded border bg-gray-200 px-2 py-1"
                                onClick={() => this.handleCustomIconReset()}
                            >
                                Remove
                            </button>
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
                        <div className="flex flex-col m-2 w-1/4">
                            <span className="font-medium">Pattern</span>
                            <select
                                onChange={(e) =>
                                    this.setState({
                                        pattern: e.target.value,
                                    })
                                }
                                className="focus:outline-none border text-xl p-2 rounded"
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

                        <div className="flex flex-col m-2 w-1/4">
                            <span className="font-medium">Theme</span>

                            <select
                                onChange={(e) =>
                                    this.setState({
                                        theme: e.target.value,
                                    })
                                }
                                value={this.state.theme}
                                className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
                            >
                                <option>basic</option>
                                <option>modern</option>
                                <option>outline</option>
                            </select>
                        </div>

                        {
                            //TODO Fix alignment of elemnts
                        }

                        <div className="w-1/4 items-center justify-center flex flex-row">
                            <RandomTheme onThemeChange={this.getRandomTheme} />
                            <button
                                className="reset-btn border bg-slate-800 hover:bg-indigo-900 text-white hover:-translate-y-[1px] p-2 rounded cursor-pointer"
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

                    <div className="flex flex-col m-2">
                        <span className="font-medium">Platform</span>

                        <select
                            onChange={(e) =>
                                this.setState({
                                    platform: e.target.value,
                                })
                            }
                            value={this.state.platform}
                            className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
                        >
                            <option>hashnode</option>
                            <option>dev</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col p-4 items-center justify-center ">
                    <ComponentToImg>
                        <CoverImage {...this.state} />
                    </ComponentToImg>
                </div>
            </div>
        );
    }
}

export default Editor;
