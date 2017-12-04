"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frame = `document.body.addEventListener('click', function(e) {
  e.preventDefault();
  const data = {
    parent: e.target.parentNode.parentNode.tagName + ' ' + e.target.parentNode.tagName,
    child: e.target.tagName
  }
  window.parent.postMessage(data,'*');
  return false;
}, true);
`;
exports.default = exports.frame;
//# sourceMappingURL=frame.js.map