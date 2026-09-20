const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
};

const QUERIES = {
  "--xs": `(width < ${BREAKPOINTS.sm})`,
  "--sm": `(width >= ${BREAKPOINTS.sm})`,
  "--md": `(width >= ${BREAKPOINTS.md})`,
  "--lg": `(width >= ${BREAKPOINTS.lg})`,
  "--sm-only": `(width >= ${BREAKPOINTS.sm}) and (width < ${BREAKPOINTS.md})`,
  "--md-only": `(width >= ${BREAKPOINTS.md}) and (width < ${BREAKPOINTS.lg})`,
};

/** @type {import('postcss').Plugin} */
const breakpointMediaQueries = {
  postcssPlugin: "breakpoint-media-queries",
  Once(root) {
    root.walkAtRules("media", (atRule) => {
      const params = atRule.params.trim();
      const token =
        params.startsWith("(") && params.endsWith(")")
          ? params.slice(1, -1)
          : params;

      // replace at rule params with the desugared queries
      if (Object.hasOwn(QUERIES, token)) {
        atRule.params = QUERIES[token];
      }
    });
  },
};

export default {
  plugins: [breakpointMediaQueries],
};
