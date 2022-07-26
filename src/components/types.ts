export interface IColorTheme {
    bgColor: string;
    bdColor: string;
}

export interface IDevIcon {
    name: string;
    tags: string[];
    versions: {
        svg: string[];
        font: string[];
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
