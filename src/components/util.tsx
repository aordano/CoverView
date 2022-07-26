import React from "react";
import { IconContext } from "react-icons";
import loadable from "@loadable/component";
import * as Types from "./types";

export function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result?.toString() ?? "");
        };
        reader.onerror = (error) => reject(error);
    });
}

export const DynamicIcon: React.FC<Types.IReactIconProps> = ({ ...props }) => {
    const [library, iconComponent] = props.icon.split("/");

    if (!library || !iconComponent) return <div>Could Not Find Icon</div>;

    const lib = library.toLowerCase();
    const Icon = loadable(() => import(`./icon/${lib}.ts`), {
        resolveComponent: (el: JSX.Element) =>
            el[iconComponent as keyof JSX.Element],
    });

    const value: IconContext = {
        color: props.color,
        size: props.size,
        className: props.className,
        style: props.style,
        attr: props.attr,
    };

    return (
        <IconContext.Provider value={value}>
            <Icon />
        </IconContext.Provider>
    );
};

export const DynamicIconList = (
    provider: string
): Promise<void | { value: string; label: string }[]> => {
    const lib = import(`./icon/${provider}.ts`)
        .then((iconModule) => {
            const values = Object.keys(iconModule);
            const labels = values.map((value) => value.slice(2));

            return values.map((value, index) => {
                return {
                    value,
                    label: labels[index].replaceAll(/([A-Z])/g, " $1").trim(),
                };
            });
        })
        .catch((error) => console.error(error));
    return lib;
};
