/**
 * Escape all regex characters in a string
 * https://stackoverflow.com/a/6318742
 * @param str the string to escape the characters in
 * @returns a string with all regex characters escaped
 */
export const quotemeta = (str: string) => {
    // these escapes are fully necessary
    // eslint-disable-next-line no-useless-escape
    return str.replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
};

/**
 * Replace {{ template strings }} in a string with values in a mapping
 * @param stringTemplate the string whose substrings in {{ this_form }} are getting replaced
 * @param expressions a map (or string indexed object) whose keys are {{ substrings }} getting replaced by values
 * @returns the interpolated stringTemplate
 */
export const interpolateStringTemplate = (stringTemplate: string, expressions: Record<string, string> | Map<string, string>): string => {
    const expressionsArray: Array<[string, string]> = typeof expressions.entries === 'function'
        ? Array.from (expressions.entries())
        : Object.entries(expressions);

    return expressionsArray.reduce((stringTemplateAccumulator, [ key, replacement ]) => {
        const regexp = new RegExp(String.raw`{{ ${quotemeta(key)} }}`, 'g');
        const replacedString =  stringTemplateAccumulator.replace(regexp, replacement);
        return replacedString;
    }, stringTemplate);
};

