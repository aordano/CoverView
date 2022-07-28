import React, { CSSProperties, SVGAttributes } from "react";
import { IconType } from "react-icons";

export interface IColorTheme {
    bgColor: string;
    bdColor: string;
}

type HexColor = string;

export interface ISelectOption {
    label: string;
    value: string;
}

export interface ISettings {
    // Inputs
    title: string;
    author: string;

    // Colors
    backgroundColor: HexColor;
    frameColor: HexColor;
    iconColor: HexColor;

    // Options
    selectedProvider: ISelectOption;
    font: ISelectOption;
    platform: ISelectOption;
    selectedIcon: ISelectOption;
    pattern: ISelectOption;
    theme: ISelectOption;
    customIcon?: string;
    icon: IconType;

    // Status
    loading: boolean;

    // Option Sources
    iconsList?: ISelectOption[];
    patternsList?: ISelectOption[];
    platformsList?: ISelectOption[];
    fontsList?: ISelectOption[];
    themesList?: ISelectOption[];
    providersList?: ISelectOption[];
}

export type IEditorProps = {
    settings: ISettings;
};

export interface IComponentToImageProps {
    fileType: string;
    fileName: string;
}

export interface IReactIconProps {
    icon: string;
    color?: string;
    size?: string;
    className?: string;
    style?: CSSProperties;
    attr?: SVGAttributes<SVGElement>;
}
