import React from "react";
import { IconContext } from "react-icons";
import * as Types from "./types";
import chroma from "chroma-js";

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

export const Icon: React.FC<{ settings: Types.ISettings }> = ({ ...props }) => {
    const iconProps: Types.IReactIconProps = {
        icon: props.settings.selectedIcon.value,
        size: "5em",
        color: props.settings.iconColor,
    };

    return <i>{props.settings.icon(iconProps)}</i>;
};

export const DynamicIconList = (
    provider: string
): Promise<void | Types.ISelectOption[]> => {
    const lib = import(`./icon/${provider}.ts`)
        .then((iconModule) => {
            const values = Object.keys(iconModule);
            const labels = values.map((value) =>
                value.slice(value.charCodeAt(2) > 90 ? 3 : 2)
            );

            const list = values.map((value, index) => {
                return {
                    value,
                    label: labels[index].replaceAll(/([A-Z])/g, " $1").trim(),
                };
            });
            list.push({ label: "[custom]", value: "[custom]" });
            return list;
        })
        .catch((error) => console.error(error));
    return lib;
};

export const getOptionsFromCSS = (file: string): Types.ISelectOption[] => {
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

export const getOptionsFromModule = (module: any): Types.ISelectOption[] => {
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

export const getProviderOptions = (module: any): Types.ISelectOption[] => {
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

export const randomTheme = () => {
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
    return chroma.scale([baseColor, contrastColor]).mode("lab").colors(3);
};
