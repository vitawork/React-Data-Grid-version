var size;
export default function getScrollbarSize() {
    if (size === undefined) {
        var outer = document.createElement('div');
        outer.style.width = '50px';
        outer.style.height = '50px';
        outer.style.position = 'absolute';
        outer.style.top = '-200px';
        outer.style.left = '-200px';
        var inner = document.createElement('div');
        inner.style.height = '100px';
        inner.style.width = '100%';
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var outerWidth_1 = outer.clientWidth;
        outer.style.overflowY = 'scroll';
        var innerWidth_1 = inner.clientWidth;
        document.body.removeChild(outer);
        size = outerWidth_1 - innerWidth_1;
    }
    return size;
}
//# sourceMappingURL=getScrollbarSize.js.map