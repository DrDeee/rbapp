(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{289:function(e,t,n){"use strict";n.r(t);n(282);var r=n(56),o=n(57),l=n(284),c=n(285),d=n(281),f=n(18),v=(n(54),n(10),n(24),n(283));function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var y=function(e,t,n,desc){var r,o=arguments.length,l=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(l=(o<3?r(l):o>3?r(t,n,l):r(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l},h=function(e){Object(l.a)(n,e);var t=m(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).editing=!1,e.name="",e.phone="",e}return Object(o.a)(n,[{key:"created",value:function(){this.reset()}},{key:"reset",value:function(){this.name=this.representative.name,this.phone=this.representative.phone,this.editing=!1}},{key:"save",value:function(){this.$store.dispatch("setRepData",{group:this.localGroup.id,rep:this.representative.id,data:{name:this.name,phone:this.phone}}),this.reset()}}]),n}(v.c);y([Object(v.b)({type:Object,required:!0})],h.prototype,"localGroup",void 0),y([Object(v.b)({type:Object,required:!0})],h.prototype,"representative",void 0),y([Object(v.b)({type:String})],h.prototype,"openMenu",void 0);var w=h=y([v.a],h),x=n(55),component=Object(x.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"flex items-center text-lg p-1 h-24",on:{submit:function(t){return t.preventDefault(),e.save()}}},[e.editing?n("button",{staticClass:"mx-1 w-8 h-8 flex justify-center items-center text-gray-200 flex-none",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.reset()}}},[n("font-awesome-icon",{attrs:{icon:"times"}})],1):n("button",{staticClass:"mx-1 w-8 h-8 flex-none",attrs:{type:"button"},on:{click:function(t){e.editing=!0}}},[n("font-awesome-icon",{attrs:{icon:"edit"}})],1),e._v(" "),n("div",{staticClass:"mx-2 flex-grow flex flex-col justify-between"},[n("div",{staticClass:"flex justify-between mb-2"},[e.editing?n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"w-full",attrs:{required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}):n("label",{staticClass:"mx-1"},[e._v("\n        "+e._s(e.representative.name)+"\n      ")]),e._v(" "),e.editing?e._e():n("details",{attrs:{open:e.openMenu===e.representative.id},on:{toggle:function(t){return e.$emit("update:openMenu",t.target.attributes.open?e.representative.id:null)},click:function(e){e.stopPropagation()}}},[n("summary",{staticClass:"text-primary"},[n("font-awesome-icon",{attrs:{icon:"ellipsis-h"}})],1),e._v(" "),n("ul",{staticClass:"absolute left-auto bg-primary rounded-lg menu-right text-lg",on:{click:function(t){return e.$emit("update:openMenu",null)}}},[n("li",[n("button",{staticClass:"p-2 w-full text-center rounded-t-lg rounded-b-none",attrs:{type:"button"},on:{click:function(t){return e.$store.dispatch("setRepStatus",{group:e.localGroup.id,rep:e.representative.id,status:"EX"===e.representative.status?"CURRENT":"EX"})}}},[e._v("\n              "+e._s("EX"===e.representative.status?"Zum Deli machen":"Zum Ex-Deli machen")+"\n            ")])]),e._v(" "),n("li",[n("button",{staticClass:"p-2 w-full text-center rounded-b-lg rounded-t-none shadow-none",attrs:{type:"button"},on:{click:function(t){return e.$store.dispatch("removeRep",{group:e.localGroup.id,rep:e.representative.id})}}},[e._v("\n              Kontaktdaten löschen\n            ")])])])])]),e._v(" "),n("div",{staticClass:"flex justify-between"},[e.editing?n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"text-primary px-1 rounded-lg w-full border border-solid border-primary",attrs:{type:"tel",required:""},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}):n("a",{staticClass:"text-center text-primary flex items-center",attrs:{target:"_blank",href:"tel:"+e.representative.phone}},[e._v("\n        "+e._s(e.representative.formattedPhone)+"\n      ")]),e._v(" "),e.editing?e._e():n("div",{staticClass:"flex"},[n("a",{staticClass:"mx-1 button w-8 h-8",attrs:{href:e.representative.waMe,target:"_blank"}},[n("font-awesome-icon",{attrs:{icon:["fab","whatsapp"]}})],1),e._v(" "),n("button",{staticClass:"w-8 h-8",attrs:{type:"button"},on:{click:function(t){return e.representative.copyNumber()}}},[n("font-awesome-icon",{attrs:{icon:"copy"}})],1)])])]),e._v(" "),e.editing?n("button",{staticClass:"flex-none mx-1 w-8 h-8",attrs:{type:"submit"}},[n("font-awesome-icon",{attrs:{icon:"save"}})],1):e._e()])}),[],!1,null,null,null);t.default=component.exports},310:function(e,t,n){"use strict";n.r(t);var r=n(56),o=n(57),l=n(284),c=n(285),d=n(281),f=n(18),v=(n(54),n(10),n(282),n(283)),m=n(289);function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(e,t,n,desc){var r,o=arguments.length,l=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(l=(o<3?r(l):o>3?r(t,n,l):r(t,n))||l);return o>3&&l&&Object.defineProperty(t,n,l),l},w=function(e){Object(l.a)(n,e);var t=y(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).openMenu=null,e.localGroups=[],e.adding=!1,e.newBuddy={name:"",cloudUsername:""},e.buddyToDelete=null,e}return Object(o.a)(n,[{key:"buddies",get:function(){return this.$store.state.buddies}},{key:"addBuddy",value:function(){var e=this;return this.$store.dispatch("newBuddy",this.newBuddy).then((function(){return e.adding=!1}))}},{key:"created",value:function(){this.$store.dispatch("getBuddies")}}]),n}(v.c),x=w=h([Object(v.a)({components:{RepresentativeComponent:m.default}})],w),_=n(55),component=Object(_.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"h-full",on:{click:function(t){e.openMenu=null}}},[e._m(0),e._v(" "),n("main",{staticClass:"overflow-scroll p-1 justify-center"},[n("ul",{staticClass:"flex flex-col"},e._l(e.buddies,(function(e){return n("li",{key:e.id},[n("Buddy",{attrs:{buddy:e}})],1)})),0),e._v(" "),e.buddyToDelete?n("div",{staticClass:"absolute left-0 top-0 w-full h-full p-2 flex items-center bg-black bg-opacity-25"},[n("div",{staticClass:"w-full max-w-sm mx-auto bg-white p-2 rounded-lg shadow-2xl border-yellow-600 border-2"},[n("h2",{staticClass:"font-bold text-center text-2xl mb-3 border-yellow-600 border-b-2"},[e._v("\n          Buddy löschen\n        ")]),e._v("\n        Bist du dir sicher, dass du den Buddy löschen willst?\n        "),n("div",{staticClass:"flex justify-around my-3"},[n("button",{staticClass:"bg-secondary text-black w-32",on:{click:function(t){e.buddyToDelete=null}}},[e._v("\n            Nicht löschen\n          ")]),e._v(" "),n("button",{staticClass:"bg-yellow-600 text-black w-32",on:{click:function(t){return e.deleteBuddy(e.buddyToDelete)}}},[e._v("\n            Löschen\n          ")])])])]):e._e(),e._v(" "),e.$isAdmin()?n("div",{staticClass:"w-auto mt-1 mb-4"},[e.adding?n("form",{staticClass:"flex flex-col mx-3 mx-auto max-w-sm bg-white rounded-lg shadow-2xl p-2",on:{reset:function(t){e.adding=!1},submit:function(t){return t.preventDefault(),e.addBuddy()}}},[n("h2",{staticClass:"text-center text-xl font-book mb-3"},[e._v("Buddy hinzufügen")]),e._v(" "),n("div",{staticClass:"flex justify-between my-1"},[n("label",{staticClass:"w-24",attrs:{for:"name"}},[e._v(" Name: ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newBuddy.name,expression:"newBuddy.name"}],attrs:{required:""},domProps:{value:e.newBuddy.name},on:{input:function(t){t.target.composing||e.$set(e.newBuddy,"name",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"flex justify-between my-1"},[n("label",{staticClass:"w-24",attrs:{for:"username"}},[e._v(" Username: ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newBuddy.cloudUsername,expression:"newBuddy.cloudUsername"}],attrs:{id:"username",required:""},domProps:{value:e.newBuddy.cloudUsername},on:{input:function(t){t.target.composing||e.$set(e.newBuddy,"cloudUsername",t.target.value)}}})]),e._v(" "),e._m(1)]):n("button",{staticClass:"mx-auto shadow-2xl px-4 py-1",on:{click:function(t){e.adding=!0}}},[e._v("\n        Buddy hinzufügen\n      ")])]):e._e()])])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("h1",{staticClass:"text-3xl text-center font-bold mt-1 w-full border-b-2 border-primary"},[e._v("\n      Meine Buddies\n    ")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex justify-around mt-3"},[n("input",{attrs:{type:"reset",value:"Abbrechen"}}),e._v(" "),n("input",{attrs:{type:"submit",value:"Speichern"}})])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Buddy:n(309).default})}}]);