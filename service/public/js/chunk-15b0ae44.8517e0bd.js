(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15b0ae44"],{"4d66":function(t,a,e){"use strict";e("aa58")},8891:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page-detail"},[e("div",{staticClass:"page-detail-header"},[t.pageData?[e("p",{staticClass:"title"},[t._v("# "+t._s(t.pageData.title))]),e("p",{staticClass:"info"},[e("span",{staticClass:"text"},[t._v(t._s(t.pageData.describe))])])]:t._e()],2),e("div",{staticClass:"page-detail-content"},[e("div",{staticClass:"page-content-header"},[e("span",{staticClass:"icon el-icon-house"}),e("router-link",{staticClass:"btn",attrs:{to:"/",tag:"span",title:"返回首页"}},[t._v("首页")]),e("span",[t._v("/")]),e("span",[t._v(t._s(t.pageData.title))])],1),t.pageData?[e("div",{staticClass:"cover",style:{"background-image":"url("+t.pageData.cover+")"}}),e("markdown-content",{attrs:{contentData:t.pageData}})]:t._e()],2)])},s=[],c=(e("96cf"),e("1da1")),o=e("a865"),i={data:function(){return{pageData:""}},components:{MarkdownContent:o["a"]},created:function(){if(this.$route.params.id){this.getData();var t=document.documentElement.scrollTop||document.body.scrollTop,a=setInterval((function(){document.body.scrollTop=document.documentElement.scrollTop=t-=50,t<=0&&clearInterval(a)}),10)}else this.$router.push("/")},methods:{getData:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$store.dispatch("changeLoading",!0),a.next=3,t.$api.getPageById(t.$route.params.id);case 3:t.pageData=a.sent,t.$store.dispatch("changeLoading",!1);case 5:case"end":return a.stop()}}),a)})))()}},watch:{$route:function(){this.getData()}}},r=i,l=(e("4d66"),e("2877")),u=Object(l["a"])(r,n,s,!1,null,null,null);a["default"]=u.exports},aa58:function(t,a,e){}}]);