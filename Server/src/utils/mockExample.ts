
const UserDemoProject =
  JSON.stringify({
    'projectName': '示例项目',
    'projectUrl': 'example',
    'projectDesc': '已创建多个示例接口,可直接克隆至个人项目使用~',
    'version': 'v1.0',
    'transferUrl': 'http://localhost:9966/mock/5aa0d3f9041136dbc3e37159',
    'status': 'mock',
    'type': 'demo',
    'masterId': '5a9d2f6c9efdc2347721c4e6',
    'interfaceList': [
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '带参数查询',
        'url': 'query',
        'method': 'get',
        'desc': '根据请求参数返回指定数据',
        'mode': '{\n  success: true,\n  data: {\n    default: \'hello world\',\n    _req: function({\n      _req\n    }) {\n      return _req\n    },\n    name: function({\n      _req\n    }) {\n      return "M" + this.default\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '上传图片',
        'url': 'upload',
        'method': 'post',
        'desc': '响应POST返回对应图片,在body中加入firleName参数',
        'mode': '{\n  data: {\n    img: function({\n      _req,\n      Mock\n    }) {\n      return _req.body.fileName + "_" + Mock.mock("@image")\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '项目常用返回数据',
        'url': 'mock',
        'method': 'get',
        'desc': '普通的Mock',
        'mode': '{\n  \'state\': {\n    \'code\': 200,\n    \'msg\': \'获取成功\'\n  },\n  \'data\': {\n    \'username\': \'666\',\n    \'email\': function({\n      Mock\n    }) {\n      return Mock.mock("@email")\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '随机参数返回',
        'url': 'random',
        'method': 'post',
        'desc': '随机参数返回数据',
        'mode': '{\n  \'success\': true,\n  \'data\': {\n    \'projects|3-10\': [{\n      \'name\': \'演示用\',\n      \'url\': \'@url\',\n      \'email\': \'@email\',\n      \'address\': \'@county(true)\',\n      \'string|1-10\': \'★\',\n      \'number|1-100\': 100,\n      \'boolean|1-2\': true,\n      \'object|2\': {\n        \'310000\': \'上海市\',\n        \'320000\': \'江苏省\',\n        \'330000\': \'浙江省\'\n      }\n    }]\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '删除',
        'url': 'delete',
        'method': 'delete',
        'desc': '删除接口模拟',
        'mode': '{\n  \'data\': \'删除成功!\'\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': 'patch',
        'url': 'patch',
        'method': 'patch',
        'desc': '模拟patch提交',
        'mode': '{\n  \'data\': \'patch success\'\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': 'put',
        'url': 'put',
        'method': 'put',
        'desc': 'put success',
        'mode': '{\n  \'data\': \'put success\'\n}'
      }]
  })

const FrontDocumentTemplate =
  JSON.stringify({
    'desc': '前端规范1.0',
    'type': 'spec',
    'name': '前端规范模板',
    'content': `<h1 style=\"text-align:start;\"><span style=\"color: rgb(42,42,42);\">最佳原则</span></h1>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">坚持制定好的代码规范。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">无论团队人数多少，代码应该同出一门。</span></p>\n<h2><span style=\"color: rgb(42,42,42);background-color: rgb(223,225,232);\">命名规则</span></h2>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">项目命名</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">全部采用小写方式， 以下划线分隔。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">例：my_project_name</span></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">目录命名</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">参照项目命名规则；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">有复数结构时，要采用复数命名法。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">例：scripts, styles, images, data_models</span></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">JS文件命名</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">参照项目命名规则。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">例：account_model.js</span></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">CSS, SCSS文件命名</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">参照项目命名规则。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">例：retina_sprites.scss</span></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">HTML文件命名</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">参照项目命名规则。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">例：error_report.html</span></p>\n<p style=\"text-align:start;\"></p>\n<h2><span style=\"color: rgb(42,42,42);background-color: rgb(223,225,232);\">HTML</span></h2>\n<h3><span style=\"color: rgb(42,42,42);\">语法</span></h3>\n<ul>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">缩进使用soft tab（4个空格）；</span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">嵌套的节点应该缩进；</span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">在属性上，使用双引号，不要使用单引号；</span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">属性名全小写，用中划线做分隔符；</span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">不要在自动闭合标签结尾处使用斜线（</span><a href=\"http://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">HTML5 规范</span></a> <span style=\"color: rgb(90,90,90);font-size: 20px;\">指出他们是可选的）；</span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\">不要忽略可选的关闭标签，例：<code>&lt;/li&gt;</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">和</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>&lt;/body&gt;</code>。</span></li>\n</ul>\n<p></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">HTML5 doctype</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">在页面开头使用这个简单地doctype来启用标准模式，使其在每个浏览器中尽可能一致的展现；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">虽然doctype不区分大小写，但是按照惯例，doctype大写 （</span><a href=\"http://stackoverflow.com/questions/15594877/is-there-any-benefits-to-use-uppercase-or-lowercase-letters-with-html5-tagname\" target=\"_blank\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">关于html属性，大写还是小写</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">）。</span></p>\n<p></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">lang属性</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">根据HTML5规范：</span></p>\n<blockquote></blockquote>\n<p><span style=\"color: rgb(122,122,122);font-size: 20px;\">应在html标签上加上lang属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">更多关于</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>lang</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">属性的说明</span><a href=\"http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">在这里</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">在sitepoint上可以查到</span><a href=\"http://reference.sitepoint.com/html/lang-codes\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">语言列表</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">但sitepoint只是给出了语言的大类，例如中文只给出了zh，但是没有区分香港，台湾，大陆。而微软给出了一份更加</span><a href=\"http://msdn.microsoft.com/en-us/library/ms533052(v=vs.85).aspx\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">详细的语言列表</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">，其中细分了zh-cn, zh-hk, zh-tw。</span></p>\n<p></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">字符编码</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。</span></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">IE兼容模式</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">用</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>&lt;meta&gt;</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">标签可以指定页面应该用什么版本的IE来渲染；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">如果你想要了解更多，请点击</span><a href=\"http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">这里</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">不同doctype在不同浏览器下会触发不同的渲染模式（</span><a href=\"https://hsivonen.fi/doctype/\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">这篇文章</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">总结的很到位）。</span></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">引入CSS, JS</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">根据HTML5规范, 通常在引入CSS和JS时不需要指明</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>type</code>，因为</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>text/css</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">和</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>text/javascript</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">分别是他们的默认值。</span></p>\n<h4><span style=\"color: rgb(42,42,42);\">HTML5 规范链接</span></h4>\n<ul>\n<li><a href=\"http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-link-element\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">使用link</span></a></li>\n<li><a href=\"http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-style-element\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">使用style</span></a></li>\n<li><a href=\"http://www.w3.org/TR/2011/WD-html5-20110525/scripting-1.html#the-script-element\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">使用script</span></a></li>\n</ul>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">属性顺序</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">属性应该按照特定的顺序出现以保证易读性；</span></p>\n<ul>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>class</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>id</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>name</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>data-*</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>src</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>for</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>type</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>href</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>value</code></span> <span style=\"color: rgb(90,90,90);font-size: 20px;\">,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>max-length</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>max</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>min</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>pattern</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>placeholder</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>title</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>alt</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>aria-*</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>role</code></span></li>\n<li><span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>required</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>readonly</code>,</span> <span style=\"color: rgb(90,90,90);font-size: 20px;\"><code>disabled</code></span></li>\n</ul>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">class是为高可复用组件设计的，所以应处在第一位；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">id更加具体且应该尽量少使用，所以将它放在第二位。</span></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">boolean属性</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">boolean属性指不需要声明取值的属性，XHTML需要每个属性声明取值，但是HTML5并不需要；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">更多内容可以参考</span> <a href=\"http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes\" target=\"_self\"><span style=\"color: rgb(0,136,204);font-size: 20px;\">WhatWG section on boolean attributes</span></a><span style=\"color: rgb(90,90,90);font-size: 20px;\">：</span></p>\n<blockquote></blockquote>\n<p><span style=\"color: rgb(122,122,122);font-size: 20px;\">boolean属性的存在表示取值为true，不存在则表示取值为false。</span></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">JS生成标签</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">在JS文件中生成标签让内容变得更难查找，更难编辑，性能更差。应该尽量避免这种情况的出现。</span></p>\n<p style=\"text-align:start;\"></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">减少标签数量</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">在编写HTML代码时，需要尽量避免多余的父节点；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">很多时候，需要通过迭代和重构来使HTML变得更少。</span></p>\n<p></p>\n<p></p>\n<h3><span style=\"color: rgb(42,42,42);\">实用高于完美</span></h3>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">尽量遵循HTML标准和语义，但是不应该以浪费实用性作为代价；</span></p>\n<p><span style=\"color: rgb(90,90,90);font-size: 20px;\">任何时候都要用尽量小的复杂度和尽量少的标签来解决问题。</span></p>\n`,
    'ownerName': '',
    'ownerId': '',
    'assign': [],
  })

const BackDocumentTemplate =
  JSON.stringify({
    'desc': '后端规范1.0',
    'type': 'spec',
    'name': '后端规范模板',
    'content': `<p><span style=\"font-size: 18px;\">1 基本规范</span></p>\n<p><span style=\"font-size: 18px;\">1.1 命名规则</span></p>\n<p><span style=\"font-size: 18px;\">需遵守java基本命名规范，以下列举需要着重注意的地方和我们的一些规则。</span></p>\n<p><span style=\"font-size: 18px;\">l 统一采用驼峰标识。</span></p>\n<p><span style=\"font-size: 18px;\">l 不允许使用汉语拼音命名，特殊含义的除外。</span></p>\n<p><span style=\"font-size: 18px;\">l 遇到缩写如XML时，需全部大写，如loadXMLDocument()。</span></p>\n<p><span style=\"font-size: 18px;\">l 局部变量及输入参数不要与类成员变量同名(set方法与构造函数除外)</span></p>\n<p><span style=\"font-size: 18px;\">l 常量必须都是大写字母，名称包含多个词时，使用下划线来分割，并且保证命名有完整含义，比如PRODUCT_TYPE。枚举值也是常量，遵守该规则。</span></p>\n<p><span style=\"font-size: 18px;\">l 项目名与模块名之间，使用”-”隔开，不再使用”_”。区分代码和项目的命名规则。</span></p>\n<p><span style=\"font-size: 18px;\">l Package名必须全部小写，尽量使用单个单词。</span></p>\n<p><span style=\"font-size: 18px;\">l Interface名统一采用首字母为I。</span></p>\n<p><span style=\"font-size: 18px;\">l 注意单类中，变量名的一致性。例如，在一个service中的几个方法，都定义有useName变量，或者进行简写uname等，不论全写还是简写，前后方法对于同一变量的命名都需要保持一致，便于可读。</span></p>\n<p><span style=\"font-size: 18px;\">l 在同一个方法中，不建议一个变量表示多个意义不同的数值。</span></p>\n<p><span style=\"font-size: 18px;\">1.2 声明规则</span></p>\n<p><span style=\"font-size: 18px;\">1.2.1 修饰符顺序</span></p>\n<p><span style=\"font-size: 18px;\">修饰符应该按照如下顺序排列：public, protected, private, abstract, static, final, transient, volatile, synchronized, native, strictfp。</span></p>\n<p><span style=\"font-size: 18px;\">1.2.2 类定义顺序</span></p>\n<p><span style=\"font-size: 18px;\">类内容定义的顺序</span></p>\n<p><span style=\"font-size: 18px;\">l 静态成员变量 / Static Fields</span><br><br><span style=\"font-size: 18px;\">l 静态初始化块 / Static Initializers</span><br><br><span style=\"font-size: 18px;\">l 成员变量 / Fields</span><br><br><span style=\"font-size: 18px;\">l 初始化块 / Initializers</span><br><br><span style=\"font-size: 18px;\">l 构造器 / Constructors</span><br><br><span style=\"font-size: 18px;\">l 静态成员方法 / Static Methods</span><br><br><span style=\"font-size: 18px;\">l 成员方法 / Methods</span><br><br><span style=\"font-size: 18px;\">l 重载自Object的方法如toString(), hashCode() 和main方法</span><br><br><span style=\"font-size: 18px;\">l 类型(内部类) / Types(Inner Classes)</span></p>\n<p><span style=\"font-size: 18px;\">同等的顺序下，再按public, protected,default, private的顺序排列。</span></p>\n<p><span style=\"font-size: 18px;\">1.2.3 方法名前缀</span></p>\n<p><span style=\"font-size: 18px;\">Service层接口方法名称，统一前缀。</span></p>\n<p><span style=\"font-size: 18px;\">查询方法前缀： get、find。</span></p>\n<p><span style=\"font-size: 18px;\">搜索性查询方法前缀：query、search。</span></p>\n<p><span style=\"font-size: 18px;\">统计类前缀：count。</span></p>\n<p><span style=\"font-size: 18px;\">操作类前缀：insert、add、create、update、delete。</span></p>\n<p><span style=\"font-size: 18px;\">可能还有其他前缀。</span></p>\n<p><span style=\"font-size: 18px;\">同包名下的service类，尽量统一所有方法的前缀，以便于以后对方法进行或事物或权限或业务等控制。</span></p>\n<p><span style=\"font-size: 18px;\">1.2.4 方法重载</span></p>\n<p><span style=\"font-size: 18px;\">方法重载中需要注意参数的使用，相同参数个数，不同参数类型的方法重载要注意调用方传递参数null时的问题。需要与调用方沟通协调好。</span></p>\n<p><span style=\"font-size: 18px;\">比如</span></p>\n<p><span style=\"font-size: 18px;\">方法1：public void getIdListByCondition(Integer type, String userName, String email){}</span></p>\n<p><span style=\"font-size: 18px;\">方法2：public void getIdListByCondition(Integer type, Date createTime, Integer age){}</span></p>\n<p><span style=\"font-size: 18px;\">当调用方使用时，遇到类似问题，如果调用方的后面参数为null。那么，使用方式是</span></p>\n<p><span style=\"font-size: 18px;\">String userName = null;</span></p>\n<p><span style=\"font-size: 18px;\">String email = null;</span></p>\n<p><span style=\"font-size: 18px;\">getIdListByCondition(type, userName, email);</span></p>\n<p><span style=\"font-size: 18px;\">如果直接写成 getIdListByCondition(type, null, null);</span></p>\n<p><span style=\"font-size: 18px;\">将会编译不通过。</span></p>\n<p><span style=\"font-size: 18px;\">但是，在有些场景下，这样的写法对于调用方来说是对的。比如，使用HttpInvoker方式为调用方提供服务。调用方第一次拿到的接口，只有方法1，服务端也只有方法1的实现。调用方直接使用null给方法赋了值。</span></p>\n<p><span style=\"font-size: 18px;\">不过，随着业务需要，服务端又实现了方法2,并将接口提供给调用方更新，这时，调用方以前的代码就会出现错误。</span></p>\n<p><span style=\"font-size: 18px;\">在开发中，需要避免这类由service方法重载而导致的已开发代码出现错误的情况。</span></p>\n<p></p>\n<p><span style=\"font-size: 18px;\">更多规范参考 </span><a href=\"https://yq.aliyun.com/attachment/download/?id=4942\" target=\"_self\"><span style=\"font-size: 18px;\">阿里JAVA编码规范</span></a>&nbsp;</p>\n<p></p>\n`,
    'ownerName': '',
    'ownerId': '',
    'assign': [],
  })

module.exports = {
  UserDemoProject,
  FrontDocumentTemplate,
  BackDocumentTemplate
}