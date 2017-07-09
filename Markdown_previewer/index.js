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
var marked = require("marked");
var mdInput_1 = require("./components/mdInput");
var mdRendered_1 = require("./components/mdRendered");
var React = require("react");
var ReactDOM = require("react-dom");
var MarkDownApp = (function (_super) {
    __extends(MarkDownApp, _super);
    function MarkDownApp(props) {
        var _this = _super.call(this, props) || this;
        _this.inputChangeHandler = function (e) {
            var el = e.target;
            _this.setState({
                rendered: marked(el.value)
            });
        };
        _this.state = { rendered: '' };
        return _this;
    }
    MarkDownApp.prototype.render = function () {
        var appStyle = {
            display: 'flex',
            flexAlign: 'stretch'
        };
        return React.createElement("div", { id: "mdApp", style: appStyle },
            React.createElement(mdInput_1.MarkdownInput, { chngHandler: this.inputChangeHandler }),
            React.createElement(mdRendered_1.MarkdownRendered, { rendered: this.state.rendered }));
    };
    return MarkDownApp;
}(React.Component));
ReactDOM.render(React.createElement(MarkDownApp, null), document.getElementById('mdApp'));
