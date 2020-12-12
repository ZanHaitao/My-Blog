(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95c22416"],{"146d":function(t,e,i){},"17ee":function(t,e,i){"use strict";i("a677")},2993:function(t,e,i){"use strict";i("146d")},"587c":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"text-content"},[i("p",{staticClass:"title"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.articleTitle,expression:"articleTitle"}],attrs:{placeholder:"标题",type:"text"},domProps:{value:t.articleTitle},on:{input:function(e){e.target.composing||(t.articleTitle=e.target.value)}}})]),i("p",{staticClass:"function"},[i("ul",[i("li",{staticClass:"iconfont icon-bold",attrs:{title:"加粗"},on:{click:function(e){return t.appendText("**加粗文字**")}}}),i("li",{staticClass:"iconfont icon-xieti",attrs:{title:"斜体"},on:{click:function(e){return t.appendText("*斜体文字*")}}}),i("li",{staticClass:"iconfont icon-yinyong",attrs:{title:"引用"},on:{click:function(e){return t.appendText("\n> 引用文字")}}}),i("li",{staticClass:"iconfont icon-ai-code",attrs:{title:"代码"},on:{click:function(e){return t.appendText("\n```javascript\n\n代码片段\n\n```\n")}}}),i("li",{staticClass:"iconfont icon-tupian",attrs:{title:"图片"},on:{click:function(e){t.appendText("\n![avatar](图片链接地址)\n")}}}),i("li",{staticClass:"iconfont icon-numberlist",attrs:{title:"有序列表"},on:{click:function(e){return t.appendText("\n 1. 列表项目")}}}),i("li",{staticClass:"iconfont icon-liebiao",attrs:{title:"无序列表"},on:{click:function(e){return t.appendText("\n - 列表项目")}}}),i("li",{staticClass:"iconfont icon-biaoti",attrs:{title:"标题"},on:{click:function(e){return t.appendText("\n## 标题文字 ##\n")}}}),i("li",{staticClass:"iconfont icon-fengexian1",attrs:{title:"分割线"},on:{click:function(e){return t.appendText("\n----------\n")}}}),i("li",{staticClass:"iconfont icon-fengexian",attrs:{title:"摘要分割线"},on:{click:function(e){return t.appendText("\n\x3c!--more--\x3e\n")}}})])]),i("p",{staticClass:"content"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.articleContent,expression:"articleContent"}],domProps:{value:t.articleContent},on:{input:function(e){e.target.composing||(t.articleContent=e.target.value)}}}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.articleCover,expression:"articleCover"}],attrs:{type:"text",placeholder:"封面"},domProps:{value:t.articleCover},on:{input:function(e){e.target.composing||(t.articleCover=e.target.value)}}})])])},s=[],a={props:{title:{type:String,required:!0},content:{type:String,required:!0},cover:{type:String,required:!0}},data:function(){return{articleTitle:this.title,articleContent:this.content,articleCover:this.cover}},methods:{appendText:function(t){this.articleContent+=t},changeInput:function(){this.$emit("publishArticle",{title:this.articleTitle,content:this.articleContent,cover:this.articleCover})}},watch:{articleTitle:function(){this.changeInput()},articleContent:function(){this.changeInput()},articleCover:function(){this.changeInput()}}},c=a,o=(i("2993"),i("2877")),l=Object(o["a"])(c,n,s,!1,null,null,null);e["a"]=l.exports},a677:function(t,e,i){},b7a3:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"publish-article"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showMessage,expression:"showMessage"}],staticClass:"tip"},[t._v(t._s(t.message))]),i("div",{staticClass:"publish-article-title"},[t._v("编辑文章")]),i("div",{staticClass:"putlish-article-content"},[i("div",{staticClass:"left-content"},[i("text-content",{attrs:{title:t.title,content:t.content,cover:t.cover},on:{publishArticle:t.changeArticle}}),i("p",{staticClass:"putlish-article-btn"},[i("button",{on:{click:t.publishArticle}},[t._v("发布文章")])])],1),i("div",{staticClass:"right-content"},[i("p",{staticClass:"title"},[t._v("分类")]),i("p",{staticClass:"select"},[t._v("当前选择分类："+t._s(t.selectType.title?t.selectType.title:"暂未选择"))]),i("ul",t._l(t.articleTypeList,(function(e){return i("li",{key:e.id,class:{active:e.title===t.selectType.title},on:{click:function(i){t.selectType=e}}},[t._v(" "+t._s(e.title)+" ")])})),0),i("p",{staticClass:"title"},[t._v("标签")]),i("p",{staticClass:"select"},[t._v("当前选择标签："+t._s(t.selectLabel.title?t.selectLabel.title:"暂未选择"))]),i("ul",{staticClass:"label-list"},t._l(t.labelList,(function(e){return i("li",{key:e.id,class:{active:e.title===t.selectLabel.title},on:{click:function(i){t.selectLabel=e}}},[t._v(" "+t._s(e.title)+" ")])})),0),i("p",{staticClass:"title"},[t._v("权限控制")]),i("p",{staticClass:"permissions"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.isComment,expression:"isComment"}],attrs:{type:"checkbox",id:"comment"},domProps:{checked:Array.isArray(t.isComment)?t._i(t.isComment,null)>-1:t.isComment},on:{change:function(e){var i=t.isComment,n=e.target,s=!!n.checked;if(Array.isArray(i)){var a=null,c=t._i(i,a);n.checked?c<0&&(t.isComment=i.concat([a])):c>-1&&(t.isComment=i.slice(0,c).concat(i.slice(c+1)))}else t.isComment=s}}}),i("label",{attrs:{for:"comment"}},[t._v("允许评论")])]),i("p",{staticClass:"permissions"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.isTop,expression:"isTop"}],attrs:{type:"checkbox",id:"isTop"},domProps:{checked:Array.isArray(t.isTop)?t._i(t.isTop,null)>-1:t.isTop},on:{change:function(e){var i=t.isTop,n=e.target,s=!!n.checked;if(Array.isArray(i)){var a=null,c=t._i(i,a);n.checked?c<0&&(t.isTop=i.concat([a])):c>-1&&(t.isTop=i.slice(0,c).concat(i.slice(c+1)))}else t.isTop=s}}}),i("label",{attrs:{for:"isTop"}},[t._v("是否置顶")])])])])])},s=[],a=(i("96cf"),i("1da1")),c=i("587c"),o={data:function(){return{title:"",content:"",cover:"",articleTypeList:[],labelList:[],selectType:"",selectLabel:"",isComment:!0,isTop:!1,message:"",showMessage:!1,editData:{}}},components:{TextContent:c["a"]},created:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return setTimeout((function(){void 0==t.$store.state.loginUser.id&&t.$router.push({name:"login"})}),1e3),t.$route.params.data?(i=t.$route.params.data,t.editData=i,t.title=i.title,t.content=i.content,t.cover=i.cover,t.selectType=i.ArticleType,t.selectLabel=i.Label,t.isComment=!!i.isComment,t.isTop=!!i.isTop):t.$router.push("/admin/articleManage"),e.next=4,t.$api.getAritcleTypeList();case 4:return t.articleTypeList=e.sent,e.next=7,t.$api.getLabelList();case 7:t.labelList=e.sent;case 8:case"end":return e.stop()}}),e)})))()},methods:{changeArticle:function(t){this.title=t.title,this.content=t.content,this.cover=t.cover},publishArticle:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==t.title||""==t.content||""==t.cover||""==t.selectLabel||""==t.selectType){e.next=7;break}return e.next=3,t.$api.updateAritcle(t.editData.id,{title:t.title,content:t.content,cover:t.cover,browse:0,isComment:t.isComment?1:0,isTop:t.isTop?1:0,UserId:1,ArticleTypeId:t.selectType.id+"",LabelId:t.selectLabel.id+""});case 3:i=e.sent,i?(t.sendMessage("发布成功！"),setTimeout((function(){window.location.reload()}),3e3)):t.sendMessage("发布失败，请检查后再提交！"),e.next=8;break;case 7:t.sendMessage("输入信息不完整！");case 8:case"end":return e.stop()}}),e)})))()},sendMessage:function(t){var e=this;this.showMessage=!0,this.message=t,setTimeout((function(){e.showMessage=!1,e.message=""}),3e3)}}},l=o,r=(i("17ee"),i("2877")),u=Object(r["a"])(l,n,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-95c22416.d07cc2f5.js.map