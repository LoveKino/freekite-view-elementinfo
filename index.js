'use strict';

let {
    n, view
} = require('kabanery');

let {
    reduce, map
} = require('bolzano');

module.exports = view(({
    nodeInfo,
    config
}) => {
    let {
        node
    } = nodeInfo;
    let style = node.style.style;
    let textContent = node.textContent;

    node.chosenStyle = node.chosenStyle || {};
    node.chosenAttributes = node.chosenAttributes || {};

    // TODO color converter
    return n('div', [
        n('h4', 'tagName'),

        n(`input type="checkbox" ${node.chosenTagName? 'checked=true': ''}`, {
            onclick: (e) => {
                node.chosenTagName = e.target.checked;
            }
        }),

        n('div', {
            style: {
                display: 'inline-block'
            }
        }, node.tagName),

        // style part
        n('h4', 'captured styles'),

        // style part
        n('ul', {
            style: {
                backgroundColor: 'white'
            }
        }, config.state.styles.map((name) => {
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
        }, textContent),

        n('h4', 'order in parent'),

        n(`input type="checkbox" ${node.chosenOrder? 'checked=true':''}`, {
            onclick: (e) => {
                node.chosenOrder = e.target.checked;
            }
        }),

        n('div', {
            style: {
                display: 'inline-block'
            }
        }, node.index + ''),

        n('h4', 'path'),

        n(`input type="checkbox" ${node.strictPath? 'checked=true': ''}`, {
            onclick: (e) => {
                node.strictPath = e.target.checked;
            }
        }),

        n('div', {
            style: {
                display: 'inline-block'
            }
        }, showStrictPath(nodeInfo)),

        // attributes
        Object.keys(node.attributes || {}).length && [
            n('h4', 'attributes'),

            n('ul', {
                style: {
                    backgroundColor: 'white'
                }
            }, map(node.attributes, (value, key) => {
                return n('li class=field-line', [
                    n(`input type="checkbox" ${node.chosenAttributes[key]? 'checked=true': ''}`, {
                        onclick: (e) => {
                            node.chosenAttributes[key] = e.target.checked;
                        }
                    }),

                    n('label', {
                        style: {
                            width: 100,
                            display: 'inline-block'
                        }
                    }, key),

                    n('div', {
                        style: {
                            display: 'inline-block'
                        }
                    }, value + '')
                ]);
            }))
        ]
    ]);
});

let showStrictPath = (nodeInfo) => {
    let pathStr = reduce(nodeInfo.path.slice(0, -1), (prev, item) => {
        return `${item.tagName} [${item.index}]  > ${prev}`;
    }, '');

    return pathStr + nodeInfo.node.tagName;
};
