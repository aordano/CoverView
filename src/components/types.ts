export interface IColorTheme {
    bgColor: string;
    bdColor: string;
}

export interface IDevIcon {
    name: string;
    tags: [string, string];
    versions: {
        svg: [string, string];
        font: [string, string];
    };
    color: string;
    aliases: {
        base: string;
        alias: string;
    }[];
}

export interface ISettings {
    title: string;
    bgColor: string;
    pattern: string;
    download: string;
    author: string;
    icon: { label: string; value: string };
    devIconOptions: IDevIcon[];
    font: string;
    theme: string;
    customIcon: File;
    platform: string;
}

export type TThemeGetter = (
    theme: IColorTheme,
    pattern: ISettings["pattern"]
) => void;

export interface IRandomThemeProps {
    onThemeChange: TThemeGetter;
}

export type IEditorState = {
    settings: ISettings;
};
