"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MarkdownRendered = (function (_super) {
    __extends(MarkdownRendered, _super);
    function MarkdownRendered(props) {
        return _super.call(this, props) || this;
    }
    MarkdownRendered.prototype.createMarkup = function () {
        return { __html: this.props.rendered };
    };
    MarkdownRendered.prototype.render = function () {
        return React.createElement("div", { id: "mdRender", dangerouslySetInnerHTML: this.createMarkup() });
    };
    return MarkdownRendered;
}(React.Component));
exports.MarkdownRendered = MarkdownRendered;
