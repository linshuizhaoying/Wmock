export function exportFile(data: string, filename: string, type: string) {
    var typeList = {
      json: 'application/json;charset=utf-8',
      markdown: 'text/markdown;charset=utf-8',
      doc: 'application/mswordcharset=utf-8',
    }
    // 创建隐藏的可下载链接 
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none'; // 字符内容转变成blob地址 
    var blob ;
    blob= new Blob(['\uFEFF' + data],{type: typeList[type]});

    eleLink.href = URL.createObjectURL(blob); 
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}