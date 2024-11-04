import plugin from 'tailwindcss/plugin';


const VARIANT_TO_COLORS_MAP = {
    'dark': {
        'background': '#000',
        'text': '#FFF',
        'primary': '#a40029',
        'secondary': '#cc5500',
        'enabled': '#0a65a8',
        'disabled': '#FFFFFF55',
    },
    'contrast': {
        'background': '#ffffff',
        'text': '#000000',
        'primary': '#e02076',
        'secondary': '#7f1d07',
        'enabled': '#007acb',
        'disabled': '#767676',
    },
    'dark contrast': {
        'background': '#000',
        'text': '#FFF',
        'primary': '#df3568',
        'secondary': '#f8954f',
        'enabled': '#279bb0',
        'disabled': '#FFFFFF77',
    },
};

const autoAddSelectorVariantPlugin = plugin.withOptions((options = {}) => {
    const COLOR_UTILITIES_TO_PROPERTY = {
        'bg': 'background-color',
        'text': 'color',
        'border': 'border-color',
        'outline': 'outline-color',
    };
    return ({ addComponents, addVariant }) => {
        // add variants
        const variants = Object.keys(options);
        variants.forEach((variant) => {
            const name = variant.replace(' ', '-');
            const definition = variant.split(' ')
                .map((variantSelector) => `.${variantSelector}`)
                .join('')
                + ' &';
            addVariant(
                name,
                definition,
            );
        });
        

        // when default selector is used also add in the variants

        const selectorObjects = variants.reduce(
            (accumulator, variant) => {
                const colors = Object.keys(options[variant]);
                return [ ...accumulator, ...colors.map((color) => ({ variant, color })) ];
            },
            [],
        )
            .reduce(
                (accumulator, selectorObject) => 
                    [ ...accumulator, ...Object.keys(COLOR_UTILITIES_TO_PROPERTY).map((utility => ({ ...selectorObject, utility }))) ],
                [],
            );

        addComponents(
            Object.fromEntries(
                selectorObjects.map((selectorObject) => {
                    const variantSelector = selectorObject.variant.split(' ')
                        .map((variantSelector) => `.${variantSelector}`)
                        .join('');
                    const componentSelector = `${variantSelector} .${selectorObject.utility}-${selectorObject.color}`;
                    const componentValue = { [COLOR_UTILITIES_TO_PROPERTY[selectorObject.utility]]: options[selectorObject.variant][selectorObject.color] };
                    return [ componentSelector, componentValue ];
                }),
            ),
        );
    };
});

export default {
    content: [ './src/**/*.{js,jsx,ts,tsx}', './public/**/*.html' ],
    theme: {
        extend: {
            spacing: {
                '128': '32rem',
                '160': '40rem',
                '192': '48rem',
            },
            colors: {
                'background': '#FFF',
                'text': '#000',
                'primary': '#FF8DB0',
                'secondary': '#AF4D07',
                'enabled': '#50C4D9',
                'disabled': '#aaa',
            },
            minWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
            },
            maxWidth: {
                '1/5': '20%',
                '2/5': '40%',
                '1/2': '50%',
                '3/5': '60%',
                '4/5': '80%',
            },
            minHeight: {
                '1/5': '20%',
                '2/5': '40%',
                '1/2': '50%',
                '3/5': '60%',
                '4/5': '80%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        // background clip to image
        plugin(({ matchUtilities }) => {
            matchUtilities(
                {
                    'bg-clip': (value) => ({
                        'mask-image': value,
                        'mask-repeat': 'no-repeat',
                        'mask-size': 'contain',
                        'mask-position': 'center',
                    }),
                }, {
                    type: [ 'url', 'image' ],
                },
            );
        }),
        // auto add selector based variants
        autoAddSelectorVariantPlugin(VARIANT_TO_COLORS_MAP),
        // add functionality for custom background clip based list images
        plugin(({ matchUtilities, addUtilities, theme }) => {
            matchUtilities(
                {
                    'list-image-clip': (value) => ({
                        'list-style': 'none',
                        '&:before': {
                            'content': '""',
                            'mask-image': value,
                            'mask-repeat': 'no-repeat',
                            'mask-size': 'contain',
                            'mask-position': 'center',
                            '-webkit-mask-image': value,
                            '-webkit-mask-repeat': 'no-repeat',
                            '-webkit-mask-size': 'contain',
                            '-webkit-mask-position-y': 'center',
                            '-webkit-mask-position-x': 'center',
                            'vertical-align': 'middle',
                            'display': 'inline-block',
                            'margin-right': '12px',
                        },
                    }),
                }, {
                    type: [ 'url', 'image' ],
                },
            );
            matchUtilities(
                {
                    'list-image-clip-size': (value) => ({
                        '&:before': {
                            'height': value,
                            'width': value,
                        },
                    }),
                }, { values: theme('size') },
            );
            addUtilities(Object.fromEntries(
                Object.entries(VARIANT_TO_COLORS_MAP).flatMap(([ variant, colorsObject ]) => (
                    Object.entries(colorsObject).map(([ className, hexString ]) => ([
                        `${variant.split(' ').map(v => `.${v}`).join('')} .list-image-clip-color-${className}`,
                        { '&:before': { 'background-color': hexString } },
                    ]))
                )),
            ));
        }),
    ],
};
