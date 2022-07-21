import { initialProperties, template, definition, controller, updateData, paint, resize } from "./methods";
import "./style.css";

window.define(["qlik"], function (qlik) {
  return {
    initialProperties,
    template,
    definition,
    controller,
    updateData: updateData(qlik),
    paint: paint(qlik),
    resize,
    support: {
      snapshot: true,
      export: true,
      exportData: true
    },
  };
});
