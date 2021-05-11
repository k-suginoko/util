## Reactでhtmlが来た時の便利Tool
dangerouslySetInnerHTMLで渡ってきたhtmlでURLがあるものをaタグに変換するが、
formに関わるところは変換しない処理


```
import { linkifyURLInNode } from "../../../lib/util";

useEffect(() => {
    var node = document.getElementById("newsDetailBody");
    linkifyURLInNode(node);
  }
}, [newsInfo]);

return (
  <div className="newsDetail__body" id="newsDetailBody">
    <div
      dangerouslySetInnerHTML={{ __html: newsInfo.body }}
    />
  </div>
)

```
IDで設定するしかなかったっぽい

aタグに変換
```
const webURLRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;

export const linkify = (text) => {
  return text.replace(webURLRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
  });
}
```

URLはaタグに変換しつつもfromのactionは変換しないやつ

```
export const textNodesUnder = (node) => {
  var textNodesFound = [];
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) {
      textNodesFound.push(node)
    } else {
      textNodesFound = textNodesFound.concat(textNodesUnder(node))
    }
  }
  return textNodesFound;
}

export const htmlToElement = (html) => {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content;
}

export const linkifyURLInNode = (node) => {
  var textNodes = textNodesUnder(node);
  textNodes.forEach((node) => {
    const parentNode = node.parentNode;
    // linkify only if text node data is not whitespace or newline
     if (!(/^\s*$/.test(node.data)) && parentNode) {
      const nodeText = node.wholeText;
      const linkifiedNodeText = linkify(nodeText);
      const linkifiedNode = htmlToElement(linkifiedNodeText);
      parentNode.replaceChild(linkifiedNode, node)
    }
  })
}
```
