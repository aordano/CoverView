import { CSSProperties, SVGAttributes } from "react";

export interface IColorTheme {
    bgColor: string;
    bdColor: string;
}

type HexColor = string;

export interface ISettings {
    title: string;
    backgroundColor: HexColor;
    frameColor: HexColor;
    iconColor: HexColor;
    pattern: string;
    author: string;
    selectedIcon: { label: string; value: string };
    iconProviders: { label: string; value: string }[];
    selectedProvider: string;
    providerList?: { label: string; value: string }[];
    font: string;
    theme: string;
    customIcon?: string;
    platform: string;
    loading: boolean;
}

export type TThemeGetter = (
    theme: IColorTheme,
    pattern: ISettings["pattern"]
) => void;

export interface IRandomThemeProps {
    onThemeChange: TThemeGetter;
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
