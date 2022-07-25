export default {
  type: "items",
  component: "accordion",
  items: {
    dimensions: {
      uses: "dimensions",
      min: 1,
      max: 1
    },
    measures: {
      uses: "measures",
      min: 1,
      max: 1
    },
    settings: {
      uses: "settings",
      items: {
        font: {
          label: "Font",
          type: "items",
          items: {
            fontFamily: {
              label: "Font Family",
              type: "string",
              component: "dropdown",
              ref: "font.fontFamily",
              options: [
                { value: "default" },
                { value: "Arial" },
                { value: "Times New Roman" },
                { value: "Lucida Sans Unicode" },
                { value: "sans-serif" },
              ],
              defaultValue: "default",
            },
          }
        },
        background: {
          label: "Background",
          type: "items",
          items: {
            backgroundColor: {
              label: "Background Color",
              component: "color-picker",
              ref: "background.backgroundColor",
              type: "object",
              defaultValue: { index: -1, color: "#fff" }
            },
            backgroundColorOpacity: {
              label: "Background Color Opacity",
              type: "number",
              component: "slider",
              ref: "background.backgroundColorOpacity",
              min: 0,
              max: 1,
              step: 0.01,
              defaultValue: 1
            },
          }
        }
      }
    }
  }
};
