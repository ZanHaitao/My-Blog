(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-745a603b"],{"59c3":function(e,t,s){},8260:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"admin-userInfo"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.showMessage,expression:"showMessage"}],staticClass:"tip"},[e._v(e._s(e.message))]),s("div",{staticClass:"info-title"},[e._v("个人设置")]),s("div",{staticClass:"info-content"},[s("div",{staticClass:"left-content"},[s("p",{staticClass:"portrait"},[s("img",{attrs:{src:e.$store.state.loginUser.userPortrait,alt:""}})]),s("p",{staticClass:"user-name"},[e._v(e._s(e.$store.state.loginUser.userName))]),s("p",{staticClass:"user-info"},[e._v(e._s(e.$store.state.loginUser.userInfo))])]),s("div",{staticClass:"right-content"},[s("p",{staticClass:"title"},[e._v("个人资料")]),s("p",{staticClass:"caption"},[e._v("昵称")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{placeholder:"昵称",type:"text"},domProps:{value:e.userName},on:{input:function(t){t.target.composing||(e.userName=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v(" 用户昵称可以与用户名不同, 用于前台显示. ")]),s("p",{staticClass:"caption"},[e._v("个人头像地址")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userPortrait,expression:"userPortrait"}],attrs:{placeholder:"个人头像地址",type:"text"},domProps:{value:e.userPortrait},on:{input:function(t){t.target.composing||(e.userPortrait=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v(" 个人头像地址，用于前台展示. ")]),s("p",{staticClass:"caption"},[e._v("GitHub地址")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.github,expression:"github"}],attrs:{placeholder:"GitHub地址",type:"text"},domProps:{value:e.github},on:{input:function(t){t.target.composing||(e.github=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v(" 用户GitHub仓库地址，用于前台展示. ")]),s("p",{staticClass:"caption"},[e._v("电子邮箱地址")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{placeholder:"电子邮箱地址",type:"text"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v(" 电子邮箱地址将作为此用户的主要联系方式. ")]),s("p",{staticClass:"caption"},[e._v("个人简介")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo,expression:"userInfo"}],attrs:{placeholder:"个人简介",type:"text"},domProps:{value:e.userInfo},on:{input:function(t){t.target.composing||(e.userInfo=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v(" 个人简介，用于前台展示. ")]),s("p",{staticClass:"btn"},[s("button",{on:{click:e.updateInfo}},[e._v("保存设置")])]),s("p",{staticClass:"title"},[e._v("密码修改")]),s("p",{staticClass:"caption"},[e._v("用户密码")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPwd,expression:"loginPwd"}],attrs:{placeholder:"用户密码",type:"password"},domProps:{value:e.loginPwd},on:{input:function(t){t.target.composing||(e.loginPwd=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v("建议使用特殊字符与字母、数字的混编样式,以增加系统安全性.")]),s("p",{staticClass:"caption"},[e._v("用户密码确认")]),s("p",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.reconfirm,expression:"reconfirm"}],attrs:{placeholder:"用户密码确认",type:"password"},domProps:{value:e.reconfirm},on:{input:function(t){t.target.composing||(e.reconfirm=t.target.value)}}})]),s("p",{staticClass:"detail"},[e._v("请确认你的密码, 与上面输入的密码保持一致.")]),s("p",{staticClass:"btn"},[s("button",{on:{click:e.updatePassword}},[e._v("更新密码")])])])])])},i=[],r=(s("96cf"),s("1da1")),n={data:function(){return{userName:this.$store.state.loginUser.userName,userPortrait:this.$store.state.loginUser.userPortrait,github:this.$store.state.loginUser.github,email:this.$store.state.loginUser.email,userInfo:this.$store.state.loginUser.userInfo,message:"",showMessage:!1,loginPwd:"",reconfirm:""}},created:function(){var e=this;setTimeout((function(){void 0==e.$store.state.loginUser.id&&e.$router.push({name:"login"})}),1e3)},methods:{updateInfo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""==e.userName||""==e.userPortrait||""==e.github||""==e.email||""==e.userInfo){t.next=7;break}return t.next=3,e.$api.updateUser({userName:e.userName,userPortrait:e.userPortrait,github:e.github,email:e.email,userInfo:e.userInfo});case 3:s=t.sent,s?(e.sendMessage("修改成功！"),setTimeout((function(){window.location.reload()}),3e3)):e.sendMessage("修改失败，请检查后重新修改！"),t.next=8;break;case 7:e.sendMessage("输入信息不完整！");case 8:case"end":return t.stop()}}),t)})))()},updatePassword:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""==e.loginPwd||""==e.reconfirm){t.next=11;break}if(e.loginPwd!==e.reconfirm){t.next=8;break}return t.next=4,e.$api.updateUser({loginPwd:e.loginPwd});case 4:s=t.sent,s?(e.sendMessage("修改成功！"),setTimeout((function(){e.$store.dispatch("changeLoginUser",{}),e.$router.push({name:"login"})}),3e3)):e.sendMessage("修改失败，请检查后重新修改！"),t.next=9;break;case 8:e.sendMessage("两次输入密码不一致！");case 9:t.next=12;break;case 11:e.sendMessage("输入信息不完整！");case 12:case"end":return t.stop()}}),t)})))()},sendMessage:function(e){var t=this;this.showMessage=!0,this.message=e,setTimeout((function(){t.showMessage=!1,t.message=""}),3e3)}}},o=n,u=(s("b154"),s("2877")),l=Object(u["a"])(o,a,i,!1,null,null,null);t["default"]=l.exports},b154:function(e,t,s){"use strict";s("59c3")}}]);
//# sourceMappingURL=chunk-745a603b.cd63c3ad.js.map