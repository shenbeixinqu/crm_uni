(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pca-picker/pca-picker"],{192:
/*!*****************************************************************!*\
  !*** D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue ***!
  \*****************************************************************/
/*! no static exports found */function(t,e,i){"use strict";i.r(e);var n=i(/*! ./pca-picker.vue?vue&type=template&id=1e6aada4& */193),s=i(/*! ./pca-picker.vue?vue&type=script&lang=js& */195);for(var r in s)"default"!==r&&function(t){i.d(e,t,(function(){return s[t]}))}(r);i(/*! ./pca-picker.vue?vue&type=style&index=0&lang=scss& */198);var a,c=i(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),u=Object(c["default"])(s["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],a);u.options.__file="components/pca-picker/pca-picker.vue",e["default"]=u.exports},193:
/*!************************************************************************************************!*\
  !*** D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=template&id=1e6aada4& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,i){"use strict";i.r(e);var n=i(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pca-picker.vue?vue&type=template&id=1e6aada4& */194);i.d(e,"render",(function(){return n["render"]})),i.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),i.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),i.d(e,"components",(function(){return n["components"]}))},194:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=template&id=1e6aada4& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,i){"use strict";var n;i.r(e),i.d(e,"render",(function(){return s})),i.d(e,"staticRenderFns",(function(){return a})),i.d(e,"recyclableRender",(function(){return r})),i.d(e,"components",(function(){return n}));var s=function(){var t=this,e=t.$createElement;t._self._c},r=!1,a=[];s._withStripped=!0},195:
/*!******************************************************************************************!*\
  !*** D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */function(t,e,i){"use strict";i.r(e);var n=i(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pca-picker.vue?vue&type=script&lang=js& */196),s=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=s.a},196:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(i(/*! ./node_modules/@babel/runtime/regenerator */18)),s=r(i(/*! ./pca-http.js */197));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i,n,s,r,a){try{var c=t[r](a),u=c.value}catch(l){return void i(l)}c.done?e(u):Promise.resolve(u).then(n,s)}function c(t){return function(){var e=this,i=arguments;return new Promise((function(n,s){var r=t.apply(e,i);function c(t){a(r,n,s,c,u,"next",t)}function u(t){a(r,n,s,c,u,"throw",t)}c(void 0)}))}}var u=null,l={province:1,city:2,area:3,street:4,village:5};function o(t,e){return new Promise((function(i,n){t(i,e)}))}var d={props:{active:{type:Boolean,default:!1},defaultValue:{type:Object,default:function(){return{provinceCode:"",citiesCode:"",areasCode:"",streetsCode:"",villagesCode:""}}},limitRegion:{type:String,default:"village"}},data:function(){return{itemWidth:20,show:!1,pcaList:[{selectIndex:-1,target:"",list:[]}],selectAlList:[{title:"请选择"}],selectAlIndex:0,currentIndex:0,latitude:"",longitude:"",location:""}},created:function(){this.init(),this.limitMappingNum=l[this.limitRegion]||5,this.itemWidth=Math.floor(100/this.limitMappingNum)},destroyed:function(){clearTimeout(u)},computed:{actives:{get:function(){var t=this;return this.active&&(u=setTimeout((function(){t.show=!0}),100)),this.active},set:function(t){this.$emit("update:active",t)}}},watch:{defaultValue:function(){this.init()},limitRegion:function(t){this.limitMappingNum=l[this.limitRegion]||5,this.itemWidth=Math.floor(100/this.limitMappingNum)}},methods:{getLocation:function(){var e=this,i=this;t.getLocation({type:"gcj02",success:function(n){i.latitude=n.latitude,i.longitude=n.longitude,t.request({url:i.$burl+"/get_location",data:{lat:i.latitude,lng:i.longitude},success:function(t){i.location=t.data.data.province+"-"+t.data.data.city,//console.log(e.location),e.$emit("getChild",e.location)}})}})},init:function(){var t=this;return c(n.default.mark((function e(){var i,s,r,a,c,u,l;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.defaultValue,s=i.provinceCode,r=i.citiesCode,a=i.areasCode,c=i.streetsCode,u=i.villagesCode,l=function(e,i){t.pcaList[e].selectIndex=t.pcaList[e].list.findIndex((function(n){if(n.code===i)return t.setAlList(e,n.name),!0}))},e.next=4,t.getAllProvinces();case 4:if(s){e.next=6;break}return e.abrupt("return");case 6:if(l(0,s),!(t.limitMappingNum<=1)){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,t.getAllCities();case 11:if(r){e.next=13;break}return e.abrupt("return");case 13:if(l(1,r),!(t.limitMappingNum<=2)){e.next=16;break}return e.abrupt("return");case 16:return e.next=18,t.getAllAreas();case 18:if(a){e.next=20;break}return e.abrupt("return");case 20:if(l(2,a),!(t.limitMappingNum<=3)){e.next=23;break}return e.abrupt("return");case 23:return e.next=25,t.getAllStreets();case 25:if(c){e.next=27;break}return e.abrupt("return");case 27:if(l(3,c),!(t.limitMappingNum<=4)){e.next=30;break}return e.abrupt("return");case 30:return e.next=32,t.getAllVillages();case 32:if(u){e.next=34;break}return e.abrupt("return");case 34:l(4,u);case 35:case"end":return e.stop()}}),e)})))()},close:function(){var t=this;this.show=!1,u=setTimeout((function(){t.actives=!1}),300)},getAllProvinces:function(){var t=this;return o((function(e,i){s.default.init({url:"/address/getAllProvinces",method:"get"}).success((function(n){t.pcaList[0].list=n.data,i&&i(n),e()}))}))},getAllCities:function(){var t=this;return o((function(e,i){var n=t.pcaList[0],r=n.selectIndex,a=n.list;s.default.init({url:"/address/getAllCities",method:"get",data:{provinceCode:a[r].code}}).success((function(n){t.pcaList.splice(1,4,{selectIndex:-1,target:"",list:n.data}),t.switchSwiper(1),i&&i(n),e()}))}))},getAllAreas:function(){var t=this;return o((function(e,i){var n=t.pcaList[1],r=n.selectIndex,a=n.list;s.default.init({url:"/address/getAllAreas",method:"get",data:{citiesCode:a[r].code}}).success((function(n){t.pcaList.splice(2,3,{selectIndex:-1,target:"",list:n.data}),t.switchSwiper(2),i&&i(n),e()}))}))},getAllStreets:function(){var t=this;return o((function(e,i){var n=t.pcaList[2],r=n.selectIndex,a=n.list;s.default.init({url:"/address/getAllStreets",method:"get",data:{areasCode:a[r].code}}).success((function(n){t.pcaList.splice(3,2,{selectIndex:-1,target:"",list:n.data}),t.switchSwiper(3),i&&i(n),e()}))}))},getAllVillages:function(){var t=this;return o((function(e,i){var n=t.pcaList[3],r=n.selectIndex,a=n.list;s.default.init({url:"/address/getAllVillages",method:"get",data:{streetsCode:a[r].code}}).success((function(n){t.pcaList.splice(4,1,{selectIndex:-1,target:"",list:n.data}),t.switchSwiper(4),i&&i(n),e()}))}))},selectAl:function(t){if("object"===typeof t){var e=t,i=e.detail.current;t=i}this.selectAlIndex=t,this.switchSwiper(t)},switchSwiper:function(t){var e=this;this.$nextTick((function(){var i=e.pcaList[t],n=i.selectIndex,s=i.list;if(~n){var r=e.pcaList[t];r.target="",e.$nextTick((function(){r.target=s[n].code}))}e.currentIndex=t}))},submit:function(){var t=this.pcaList.map((function(t){var e=t.selectIndex,i=t.list;return{code:i[e].code,name:i[e].name}}));this.$emit("change",t)},setAlList:function(t,e){t<4&&t+1!==this.limitMappingNum?this.selectAlList.splice(t,5-t,{title:e},{title:"请选择"}):this.selectAlList.splice(t,5-t,{title:e})},selectAddress:function(t,e,i){switch(this.pcaList[i].selectIndex=e,this.setAlList(i,t.name),this.selectAlIndex=i+1,i){case 0:this.limitMappingNum>=2?this.getAllCities():(this.submit(),this.close());break;case 1:this.limitMappingNum>=3?this.getAllAreas():(this.submit(),this.close());break;case 2:this.limitMappingNum>=4?this.getAllStreets():(this.submit(),this.close());break;case 3:this.limitMappingNum>=5?this.getAllVillages():(this.submit(),this.close());break;case 4:this.submit(),this.close();break}}}};e.default=d}).call(this,i(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */1)["default"])},198:
/*!***************************************************************************************************!*\
  !*** D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */function(t,e,i){"use strict";i.r(e);var n=i(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pca-picker.vue?vue&type=style&index=0&lang=scss& */199),s=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=s.a},199:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/1016_proj_fx/分销系统/components/pca-picker/pca-picker.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pca-picker/pca-picker-create-component',
    {
        'components/pca-picker/pca-picker-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(192))
        })
    },
    [['components/pca-picker/pca-picker-create-component']]
]);
