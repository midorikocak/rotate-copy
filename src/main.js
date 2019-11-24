/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { selection, Rectangle, SceneNode } = require('scenegraph');
const { editDocument } = require('application');
const { duplicate } = require('commands');

function h(tag, props, ...children) {
  const element = document.createElement(tag);
  if (props) {
    if (props.nodeType || typeof props !== 'object') {
      children.unshift(props);
    } else {
      for (const name in props) {
        const value = props[name];
        if (name === 'style') {
          Object.assign(element.style, value);
        } else {
          element.setAttribute(name, value);
          element[name] = value;
        }
      }
    }
  }

  for (const child of children) {
    element.appendChild(
      typeof child === 'object' ? child : document.createTextNode(child)
    );
  }
  return element;
}

let panel;

function create() {
  function rotateShape() {
    let angle = Number(document.querySelector('#angle').value);

    editDocument({ editLabel: 'Rotate shape' }, s => {
      let selectedShape = s.items[0];

      angle = angle === 0 ? 1 : angle;

      const copies = Math.floor(360 / angle) - 1;

      for (let i = 0; i < copies; i += 1) {
        duplicate();

        selectedShape = s.items[0];

        selectedShape.rotateAround(angle, selectedShape.localCenterPoint);
      }
    });
  }

  const form = h(
    'form',
    { method: 'dialog', id: 'main' },
    h('h1', 'Rotate Copy'),
    h('hr'),
    h('p', 'Choose an angle between 1-360'),
    h(
      'label',
      h('span', 'Angle'),
      h('input', {
        type: 'number',
        placeholder: '1',
        id: 'angle',
        uxpQuiet: true,
      })
    ),
    h(
      'footer',
      h(
        'button',
        {
          uxpVariant: 'cta',
          id: 'ok',
          type: 'submit',
        },
        'Apply'
      )
    )
  );

  const HTML = `
      <style>
          .show {
              display: block;
          }
          .hide {
              display: none;
          }
      </style>
      <p id="warning">This plugin requires you to select a shape in the document. Please select a shape.</p>
      
`;

  panel = document.createElement('div');
  panel.innerHTML = HTML;
  panel.appendChild(form);
  panel.querySelector('form').addEventListener('submit', rotateShape);

  return panel;
}

function show(event) {
  if (!panel) event.node.appendChild(create());
}

function hide(event) {
  // This function triggers when the panel is hidden by user
}

function update() {
  const form = document.querySelector('form');
  const warning = document.querySelector('#warning');
  if (selection.items.length === 0) {
    // || !(selection.items[0] instanceof Rectangle)) {
    form.className = 'hide';
    warning.className = 'show';
  } else {
    form.className = 'show';
    warning.className = 'hide';
  }
}

module.exports = {
  panels: {
    rotateCopy: {
      show,
      hide,
      update,
    },
  },
};
