
export const frame =
 `document.body.addEventListener('click', function(e) {
  e.preventDefault();
  const data = {
    parent: e.target.parentNode.parentNode.tagName + ' ' + e.target.parentNode.tagName,
    child: e.target.tagName
  }
  window.parent.postMessage(data,'*');
  return false;
}, true);
`

export default frame