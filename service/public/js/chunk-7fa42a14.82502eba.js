(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fa42a14"],{"0b82":function(t,e,n){"use strict";n("be5e")},"146d":function(t,e,n){},2993:function(t,e,n){"use strict";n("146d")},3227:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"publish-page"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showMessage,expression:"showMessage"}],staticClass:"tip"},[t._v(t._s(t.message))]),n("div",{staticClass:"publish-page-title"},[t._v("创建新页面")]),n("div",{staticClass:"publish-page-content"},[n("text-content",{attrs:{title:t.title,content:t.content,cover:t.cover},on:{publishArticle:t.changePage}}),n("p",{staticClass:"page-name"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.pageName,expression:"pageName"}],attrs:{type:"text",placeholder:"页面分类名称"},domProps:{value:t.pageName},on:{input:function(e){e.target.composing||(t.pageName=e.target.value)}}})]),n("p",{staticClass:"page-describe"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.describe,expression:"describe"}],attrs:{type:"text",placeholder:"页面描述"},domProps:{value:t.describe},on:{input:function(e){e.target.composing||(t.describe=e.target.value)}}})]),n("p",{staticClass:"putlish-page-btn"},[n("button",{on:{click:t.publishArticle}},[t._v("发布页面")])])],1)])},a=[],s=(n("96cf"),n("1da1")),c=n("587c"),o={data:function(){return{title:"",content:"",cover:"",message:"",showMessage:!1,pageName:"",describe:"",editData:""}},components:{TextContent:c["a"]},created:function(){var t=this;if(setTimeout((function(){void 0==t.$store.state.loginUser.id&&t.$router.push({name:"login"})}),1e3),this.$route.params.data){var e=this.$route.params.data;this.editData=e,this.title=e.title,this.content=e.content,this.cover=e.cover,this.pageName=e.pageName,this.describe=e.describe}else this.$router.push("/admin/pageManage")},methods:{changePage:function(t){this.title=t.title,this.content=t.content,this.cover=t.cover},publishArticle:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==t.title||""==t.content||""==t.cover||""==t.pageName||""==t.describe){e.next=7;break}return e.next=3,t.$api.updatePage(t.editData.id,{title:t.title,content:t.content,cover:t.cover,pageName:t.pageName,describe:t.describe});case 3:n=e.sent,n?(t.sendMessage("发布成功！"),setTimeout((function(){window.location.reload()}),3e3)):t.sendMessage("发布失败，请检查后再提交！"),e.next=8;break;case 7:t.sendMessage("填写信息不完整！");case 8:case"end":return e.stop()}}),e)})))()},sendMessage:function(t){var e=this;this.showMessage=!0,this.message=t,setTimeout((function(){e.showMessage=!1,e.message=""}),3e3)}}},r=o,l=(n("0b82"),n("2877")),u=Object(l["a"])(r,i,a,!1,null,null,null);e["default"]=u.exports},"587c":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-content"},[n("p",{staticClass:"title"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.articleTitle,expression:"articleTitle"}],attrs:{placeholder:"标题",type:"text"},domProps:{value:t.articleTitle},on:{input:function(e){e.target.composing||(t.articleTitle=e.target.value)}}})]),n("p",{staticClass:"function"},[n("ul",[n("li",{staticClass:"iconfont icon-bold",attrs:{title:"加粗"},on:{click:function(e){return t.appendText("**加粗文字**")}}}),n("li",{staticClass:"iconfont icon-xieti",attrs:{title:"斜体"},on:{click:function(e){return t.appendText("*斜体文字*")}}}),n("li",{staticClass:"iconfont icon-yinyong",attrs:{title:"引用"},on:{click:function(e){return t.appendText("\n> 引用文字")}}}),n("li",{staticClass:"iconfont icon-ai-code",attrs:{title:"代码"},on:{click:function(e){return t.appendText("\n```javascript\n\n代码片段\n\n```\n")}}}),n("li",{staticClass:"iconfont icon-tupian",attrs:{title:"图片"},on:{click:function(e){t.appendText("\n![avatar](图片链接地址)\n")}}}),n("li",{staticClass:"iconfont icon-numberlist",attrs:{title:"有序列表"},on:{click:function(e){return t.appendText("\n 1. 列表项目")}}}),n("li",{staticClass:"iconfont icon-liebiao",attrs:{title:"无序列表"},on:{click:function(e){return t.appendText("\n - 列表项目")}}}),n("li",{staticClass:"iconfont icon-biaoti",attrs:{title:"标题"},on:{click:function(e){return t.appendText("\n## 标题文字 ##\n")}}}),n("li",{staticClass:"iconfont icon-fengexian1",attrs:{title:"分割线"},on:{click:function(e){return t.appendText("\n----------\n")}}}),n("li",{staticClass:"iconfont icon-fengexian",attrs:{title:"摘要分割线"},on:{click:function(e){return t.appendText("\n\x3c!--more--\x3e\n")}}})])]),n("p",{staticClass:"content"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.articleContent,expression:"articleContent"}],domProps:{value:t.articleContent},on:{input:function(e){e.target.composing||(t.articleContent=e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.articleCover,expression:"articleCover"}],attrs:{type:"text",placeholder:"封面"},domProps:{value:t.articleCover},on:{input:function(e){e.target.composing||(t.articleCover=e.target.value)}}})])])},a=[],s={props:{title:{type:String,required:!0},content:{type:String,required:!0},cover:{type:String,required:!0}},data:function(){return{articleTitle:this.title,articleContent:this.content,articleCover:this.cover}},methods:{appendText:function(t){this.articleContent+=t},changeInput:function(){this.$emit("publishArticle",{title:this.articleTitle,content:this.articleContent,cover:this.articleCover})}},watch:{articleTitle:function(){this.changeInput()},articleContent:function(){this.changeInput()},articleCover:function(){this.changeInput()}}},c=s,o=(n("2993"),n("2877")),r=Object(o["a"])(c,i,a,!1,null,null,null);e["a"]=r.exports},be5e:function(t,e,n){}}]);
//# sourceMappingURL=chunk-7fa42a14.82502eba.js.map