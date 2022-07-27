import React from "react";
import { exportComponentAsPNG } from "react-component-export-image";

const ComponentToImg = (props: { children: React.ReactNode }) => {
    const componentRef = React.createRef<any>(); // TODO give a type

    // download image and trigger download on unsplash api
    const downloadImage = () => {
        exportComponentAsPNG(componentRef, { fileName: "cover" }); // TODO replace for the given blogpost name
    };

    return (
        <React.Fragment>
            <div ref={componentRef}>{props.children}</div>
            <div className="place-self-center">
                <button
                    className="self-center btn-primary rounded h-[45px] mx-1 hover:-translate-y-[1px] p-2 cursor-pointer flex items-center text-xl rounded-lg m-4"
                    onClick={() => downloadImage()}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                    </svg>
                    <span className="mx-2">Download</span>
                </button>
            </div>
        </React.Fragment>
    );
};

export default ComponentToImg;
