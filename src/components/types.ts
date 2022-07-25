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
    bdColor: string;
    pattern: string;
    author: string;
    icon: { label: string; value: string };
    devIconOptions: IDevIcon[];
    font: string;
    theme: string;
    customIcon: string | undefined;
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

export type IEditorState = {
    settings: ISettings;
};
