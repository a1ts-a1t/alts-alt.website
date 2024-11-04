const DARK_MODE_KEY = 'dark_mode';
const HIGH_CONTRAST_MODE_KEY = 'high_contrast_mode';
const REDUCED_MOTION_MODE_KEY = 'reduced_motion_mode';

const setDarkMode = () => {
    // check stored user preference
    if (localStorage[DARK_MODE_KEY] === 'true') {
        document.documentElement.classList.add('dark');
        return;
    }

    if (localStorage[DARK_MODE_KEY] === 'false') {
        document.documentElement.classList.remove('dark');
        return;
    }

    // check prefers color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        return;
    }

    // no preference. set light mode
    document.documentElement.classList.remove('dark');
};

const setHighContrastMode = () => {
    if (localStorage[HIGH_CONTRAST_MODE_KEY] === 'true') {
        document.documentElement.classList.add('contrast');
        return;
    }

    if (localStorage[HIGH_CONTRAST_MODE_KEY] === 'false') {
        document.documentElement.classList.remove('contrast');
        return;
    }

    if (window.matchMedia('(prefers-contrast: more)').matches) {
        document.documentElement.classList.add('contrast');
        return;
    }

    document.documentElement.classList.remove('contrast');
};

const setReducedMotionMode = () => {
    if (localStorage[REDUCED_MOTION_MODE_KEY] === 'true') {
        document.documentElement.classList.add('reduced-motion');
        return;
    }

    if (localStorage[REDUCED_MOTION_MODE_KEY] === 'false') {
        document.documentElement.classList.remove('reduced-motion');
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
        document.documentElement.classList.add('reduced-motion');
        return;
    }

    document.documentElement.classList.remove('reduced-motion');
};

setDarkMode();
setHighContrastMode();
setReducedMotionMode();

