const getLuminance = (rgb) => {
    const [r, g, b] = rgb.split(',').map(num => parseInt(num));
    const a = [r, g, b].map(value => {
        value /= 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    const luminance = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    return luminance;
};

export const getRandomGradient = () => {
    const shades = [
        '#7EC8E3', '#B1D4E0', '#EEEDE7', '#868B8E', '#738580', '#ECF87F', '#EBEBE8', '#31352E', 
        '#E56997', '#5E376D', '#F6E6E8'
    ];

    const color1 = shades[Math.floor(Math.random() * shades.length)];
    const color2 = shades[Math.floor(Math.random() * shades.length)];

    return `linear-gradient(45deg, ${color1}, ${color2})`;
};

const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r},${g},${b}`;
};

export const getTextColor = (background) => {
    const [color1, color2] = background.match(/#([0-9a-fA-F]{6})/g);
    const luminance1 = getLuminance(hexToRgb(color1));
    const luminance2 = getLuminance(hexToRgb(color2));
    const avgLuminance = (luminance1 + luminance2) / 2;

    return avgLuminance < 0.5 ? 'white' : 'black';
};
