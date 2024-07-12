interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_32: number;
    space_36: number;
}

export const spacing: Spacing = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_32: 32,
    space_36: 36,
};

interface Colors {
    Black: string;
    BlackRGB10: string;
    Orange: string;
    OrangeRGBA0: string;
    Grey: string;
    darkGrey: string;
    Yellow: string;
    White: string;
    WhiteRGBA75: string;
    WhiteRGBA50: string;
    WhiteRGBA32: string;
    WhiteRGBA15: string;
}

export const colors: Colors = {
    Black: '#000000',
    BlackRGB10: 'rgba(0, 0, 0, 0.1)',
    Orange: '#FFA524',
    OrangeRGBA0: 'rgba(255, 85, 36, 0)',
    Grey: '#333333',
    darkGrey: '#0b0b0b',
    Yellow: '#FFD700',
    White: '#FFFFFF',
    WhiteRGBA75: 'rgba(255, 255, 255, 0.75)',
    WhiteRGBA50: 'rgba(255, 255, 255, 0.5)',
    WhiteRGBA32: 'rgba(255, 255, 255, 0.32)',
    WhiteRGBA15: 'rgba(255, 255, 255, 0.15)',
};

interface FontFamily {
    poppinsBlack: string;
    poppinsBold: string;
    poppinsExtraBold: string;
    poppinsExtraLight: string;
    poppinsLight: string;
    poppinsMedium: string;
    poppinsRegular: string;
    poppinsSemiBold: string;
    poppinsThin: string;
}

export const fontfamily: FontFamily = {
    poppinsBlack: 'Poppins-Black',
    poppinsBold: 'Poppins-Bold',
    poppinsExtraBold: 'Poppins-ExtraBold',
    poppinsExtraLight: 'Poppins-ExtraLight',
    poppinsLight: 'Poppins-Light',
    poppinsMedium: 'Poppins-Medium',
    poppinsRegular: 'Poppins-Regular',
    poppinsSemiBold: 'Poppins-SemiBold',
    poppinsThin: 'Poppins-Thin',
};

interface FontSize {
    font_8: number;
    font_10: number;
    font_12: number;
    font_14: number;
    font_16: number;
    font_18: number;
    font_20: number;
    font_24: number;
    font_30: number;
}

export const fontsize: FontSize = {
    font_8: 8,
    font_10: 10,
    font_12: 12,
    font_14: 14,
    font_16: 16,
    font_18: 18,
    font_20: 20,
    font_24: 24,
    font_30: 30,
};

interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
}

export const borderRadius: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
};
