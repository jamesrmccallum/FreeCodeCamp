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
var MarkdownInput = (function (_super) {
    __extends(MarkdownInput, _super);
    function MarkdownInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputChange = function (e) {
            _this.props.chngHandler(e);
        };
        return _this;
    }
    MarkdownInput.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return false;
    };
    MarkdownInput.prototype.render = function () {
        return React.createElement("form", null,
            React.createElement("textarea", { onChange: this.handleInputChange }));
    };
    return MarkdownInput;
}(React.Component));
exports.MarkdownInput = MarkdownInput;
