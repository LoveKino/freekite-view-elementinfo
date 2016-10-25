'use strict';

let {
    n, view
} = require('kabanery');

module.exports = view(({
    nodeInfo,
    config
}) => {
    let attributes = config.state.styles;
    let {
        node
    } = nodeInfo;
    let style = node.style.style;
    let textContent = node.textContent;

    node.chosenStyle = node.chosenStyle || {};
    // TODO color converter

    return n('div', [
        n('h4', 'captured styles'),

        // style part
        n('ul', {
            style: {
                backgroundColor: 'white'
            }
        }, attributes.map((name) => {
            return n('li class=field-line', [
                n(`input type="checkbox" ${node.chosenStyle[name]? 'checked=true': ''}`, {
                    onclick: (e) => {
                        node.chosenStyle[name] = e.target.checked;
                    }
                }),

                n('label', {
                    style: {
                        width: 100,
                        display: 'inline-block'
                    }
                }, name),

                n('div', {
                    style: {
                        display: 'inline-block'
                    }
                }, style[name] + '')
            ]);
        })),

        n('h4', 'text content'),

        n(`input type="checkbox" ${node.chosenText? 'checked=true': ''}`, {
            onclick: (e) => {
                node.chosenText = e.target.checked;
            }
        }),

        n('div', {
            style: {
                display: 'inline-block'
            }
        }, textContent)
    ]);
});
