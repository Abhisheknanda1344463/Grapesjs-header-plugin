export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const textType = domc.getType("text");
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType("header", {
    model: textModel.extend(
      {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          "custom-name": "Header",
          tagName: config.defaultTagName,
          traits: [
            {
              type: "select",
              options: [
                { value: "h1", name: config.labelN1 },
                { value: "h2", name: config.labelN2 },
                { value: "h3", name: config.labelN3 },
                { value: "h4", name: config.labelN4 },
                { value: "h5", name: config.labelN5 },
                { value: "h6", name: config.labelN6 },
              ],
              label: config.labelTrait,
              name: "tagName",
              changeProp: 1,
            },
            {
              changeProp: 1,
              type: 'select',
              label: 'Alignment',
              name: 'text_align',
              options: [
                {value: 'text-start', name: 'Left'},
                {value: 'text-center', name: 'Center'},
                {value: 'text-end', name: 'Right'},
              ]
            },
            {
              changeProp: 1,
              type: 'number',
              label: 'Padding Bottom',
              name: 'padding-bottom',
            },
          ],
        }),
        init(){
           this.on("change:text_align", this.updatealignment);
           this.on("change:padding-bottom", this.updatestyle);
        },
        updatealignment(){
          const alignment = this.get('text_align');
          this.removeClass(['text-start', 'text-center', 'text-end']);
          this.addClass(alignment);
        },
        updatestyle(){
          const padding_bottom = this.get('padding-bottom');
          this.addStyle({"padding-bottom": padding_bottom });
        },
      },
      {
        isComponent(el) {
          if (
            el &&
            el.tagName &&
            ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)
          ) {
            return { type: "header" };
          }
        },
      }
    ),
    view: textView,
  });
};
