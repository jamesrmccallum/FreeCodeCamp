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
define("Components/recipeBox", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RecipeBox = (function (_super) {
        __extends(RecipeBox, _super);
        function RecipeBox(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { recipes: [] };
            return _this;
        }
        RecipeBox.prototype.componentDidMount = function () {
        };
        RecipeBox.prototype.render = function () {
            return React.createElement("div", { className: 'recipeBox' });
        };
        return RecipeBox;
    }(React.Component));
    exports.RecipeBox = RecipeBox;
});
define("index", ["require", "exports", "react", "react-dom", "Components/recipeBox"], function (require, exports, React, ReactDOM, recipeBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = function () { return React.createElement(recipeBox_1.RecipeBox, null); };
    ReactDOM.render(React.createElement(App, null), document.getElementById('appRoot'));
});
