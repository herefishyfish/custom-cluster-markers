import { Color } from '@nativescript/core';
import { IGradient } from '..';
export declare function applyMixins(derivedCtor: any, baseCtors: any[], options?: {
    after?: boolean;
    override?: boolean;
    omit?: (string | symbol)[];
}): void;
export declare function intoNativeColor(color: Color | string): any;
export declare function intoNativeHeatmapGradient(gradients: IGradient[]): any;
