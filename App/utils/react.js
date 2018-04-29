// @flow

import React from 'react'

export function deepMapReact(tree: Element<any>, fn: (el: Element<any>, depth: number, root: Element<any>) => Element<any>) {
    const context = typeof this.depth === 'number' ? this : { root:tree, depth:0 };

    function mapEl(el) {
        const newEl = fn(el, context.depth, context.root);
        if (React.isValidElement(newEl) && React.Children.count(newEl.props.children)) {
            return React.cloneElement(
                newEl,
                undefined,
                deepMapReact.call(
                    { root:context.root, depth:context.depth+1 },
                    newEl.props.children,
                    fn
                )
            );
        } else {
            return newEl;
        }
    }

    return React.Children.map(tree, mapEl);
}
