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
    #private;
    constructor();
    get native(): com.google.maps.android.ui.IconGenerator;
    get android(): com.google.maps.android.ui.IconGenerator;
    set backgroundAsset(value: globalAndroid.graphics.drawable.Drawable);
    set color(color: Color);
    set rotation(rotation: number);
    set contentRotation(rotation: number);
    setStyle(style: ICON_STYLE): void;
    setTextAppearance(appearance: number): void;
    makeIcon(text: string): globalAndroid.graphics.Bitmap;
}
