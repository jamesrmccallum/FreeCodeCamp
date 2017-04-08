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
var MarkdownViewer = (function (_super) {
    __extends(MarkdownViewer, _super);
    function MarkdownViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.foo = 42;
        return _this;
    }
    MarkdownViewer.prototype.handleOnChange = function (event) {
        var t = event.target;
        this.setState({ name: t.value });
    };
    MarkdownViewer.prototype.render = function () {
        return React.createElement("div", null, "Hello World!");
    };
    return MarkdownViewer;
}(React.Component));
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.markdown = '';
        return _this;
    }
    Input.prototype.render = function () {
        return React.createElement("input", null, this.props.markdown);
    };
    return Input;
}(React.Component));
var input = React.createElement(MarkdownViewer, { name: "james", message: "You're a cunt!" });
var renderer = React.createElement(Input, { markdown: '' });
ReactDOM.render(input, document.getElementById('mdInput'));
ReactDOM.render(renderer, document.getElementById('mdRender'));
