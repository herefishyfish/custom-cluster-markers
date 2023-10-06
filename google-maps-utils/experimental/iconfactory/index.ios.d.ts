import { Color } from '@nativescript/core';
import { IIconFactory } from '.';
export declare enum ICON_STYLE {
    STYLE_DEFAULT = 1,
    STYLE_WHITE = 2,
    STYLE_RED = 3,
    STYLE_BLUE = 4,
    STYLE_GREEN = 5,
    STYLE_ORANGE = 7,
    STYLE_PURPLE = 6
}
export declare class IconFactory implements IIconFactory {
    setStyle(style: number): void;
    makeIcon(text: string): UIImage;
    setTextAppearance(style: number): void;
    color: Color;
    backgroundAsset: any;
    rotation: number;
    contentRotation: number;
    ios: any;
    native: any;
}
