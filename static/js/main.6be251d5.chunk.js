(this.webpackJsonplab2=this.webpackJsonplab2||[]).push([[0],{41:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},51:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var i=n(17),c=n.n(i),a=n(42),s=n.n(a),l=(n(47),n(5)),o=n(15),d=(n(48),n(25)),r=n(36),u=(n(51),n(12));var j=function(e){return Object(u.jsx)("input",{type:"text",className:e.field,onChange:function(t){return e.onListItemFieldChanged(e.listId,e.id,e.field,t.target.value)},value:e[e.field]})};var b=function(e){var t=["listItem "];function n(t){return t===e.priority}return e.selected&&t.push("selected"),Object(u.jsx)("div",{className:t.join(" "),id:e.id,onClick:function(t){e.onRowClick(t.currentTarget.id)},children:Object(u.jsxs)("div",{class:"container2",children:[Object(u.jsx)("input",{className:"listiteminput",type:"checkbox","aria-label":"You have selected "+e.name,onChange:function(t){e.onListItemFieldChanged(e.listId,e.id,"completed",t.target.checked)},id:e.id,checked:e.completed}),Object(u.jsxs)("div",{className:"listitemfield",children:[" ",Object(u.jsx)(j,Object(r.a)({field:"name"},e))]}),Object(u.jsx)("div",{className:"itemDropdown","aria-label":"priority. You are on the priority dropdown for "+e.name+" You can choose low, medium or high priority",children:Object(u.jsxs)("select",{name:"Priority",id:"priorityInput",onChange:function(t){e.onListItemFieldChanged(e.listId,e.id,"priority",t.target.value)},children:[Object(u.jsx)("option",{value:"c",id:"low",selected:n("c"),children:"low"}),Object(u.jsx)("option",{value:"b",id:"medium",selected:n("b"),children:"medium"}),Object(u.jsx)("option",{value:"a",id:"high",selected:n("a"),children:"high"})]})})]})},e.id)},m=(n(41),n(27));n(53);var p=function(e){return Object(u.jsxs)("button",{type:"button",className:e.isSelected?"selected1":"unselected1",onClick:function(){return e.setShowCompletedItems(e.name)},children:[Object(u.jsx)("span",{className:"visually-hidden"}),Object(u.jsx)("span",{children:e.name})]})},h=n(30);d.a.initializeApp({apiKey:"AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",authDomain:"hmc-cs124-fa21-labs.firebaseapp.com",projectId:"hmc-cs124-fa21-labs",storageBucket:"hmc-cs124-fa21-labs.appspot.com",messagingSenderId:"949410042946",appId:"1:949410042946:web:0113b139a7e3cd1cc709db"});var O=d.a.firestore().collection("waverlywang7-listitems");var f=function(e){var t=Object(i.useState)({name:"",id:0,completed:!1}),n=Object(o.a)(t,2),c=(n[0],n[1]),a=Object(i.useState)(null),s=Object(o.a)(a,2),l=s[0],d=s[1],j=Object(i.useState)("All"),f=Object(o.a)(j,2),v=f[0],x=f[1],g=Object(i.useState)(null),y=Object(i.useState)(null),I=Object(i.useState)({sortField:"name",sortDirection:"asc"}),C=Object(o.a)(I,2),S=C[0],k=C[1],L=Object(i.useState)(!1),w=Object(o.a)(L,2),D=(w[0],w[1]),N=Object(i.useState)(!1),A=Object(o.a)(N,2),F=A[0],B=A[1],T=Object(h.a)(O.doc(e.listId).collection("tasks").orderBy(S.sortField,S.sortDirection)),z=Object(o.a)(T,3),R=z[0],H=(z[1],z[2],Object(i.useState)("Descending")),M=Object(o.a)(H,2),P=M[0],Y=M[1],q=[];function K(e,t){k({sortField:e,sortDirection:t}),D(!0)}function _(e,t){O.doc(e).collection("tasks").doc(t).delete()}void 0!==R&&(q=R.docs.map((function(e){return e.data()})));var E={All:function(){return!0},Uncompleted:function(e){return!e.completed},Completed:function(e){return e.completed}},J=Object.keys(E).map((function(t){return Object(u.jsx)(p,{name:t,"aria-pressed":e.isSelected,isSelected:t===v,setShowCompletedItems:x})})),W=q.filter(E[v]).map((function(t){return Object(u.jsx)(b,Object(r.a)({listId:e.listId,onRowClick:function(e){return d(e)},onListItemFieldChanged:e.onListItemFieldChanged,selected:t.id===l},t),t.id)}));function U(){return 1===q.filter((function(e){return e.completed})).length}return Object(u.jsxs)("div",{class:"myList",children:[Object(u.jsxs)("div",{className:"topRowButtons",children:[Object(u.jsx)("button",{type:"button",name:"delete",id:"deleteList",onClick:function(){return e.onListDeleted(e.listId)},children:"Delete List"}),Object(u.jsx)("button",{type:"button",name:"Home",id:"home",onClick:e.returnHome,children:" Return Home"})]}),Object(u.jsx)("div",{role:"group",alt:"poopy"}),Object(u.jsxs)("h2",{id:"h2",role:"heading","aria-level":"1","aria-label":e.name,children:[" ",e.name," "]}),J,Object(u.jsxs)("div",{class:"inputbar",children:[Object(u.jsx)("input",{type:"text",ref:g,id:"myInput",onChange:function(e){return B(function(e){return""!==e}(e.target.value))},placeholder:"I need to..."}),F&&Object(u.jsxs)("div",{id:"prioritycontainer",children:[Object(u.jsx)("text",{id:"priorityText",children:" Priority"}),Object(u.jsx)("div",{className:"dropdown","aria-label":" You are on the priority dropdown. You can choose low, medium or high",children:Object(u.jsxs)("select",{name:"Priority",ref:y,id:"priorityInput",children:[Object(u.jsx)("option",{value:"c",children:"low"}),Object(u.jsx)("option",{value:"b",children:"medium"}),Object(u.jsx)("option",{value:"a",children:"high"})]})})]}),F&&Object(u.jsx)("div",{class:"addTask",children:Object(u.jsx)("button",{type:"button",name:"add",id:"add",onClick:function(){var t={name:g.current.value,id:Object(m.a)(),completed:!1,priority:y.current.value};c(t),e.onItemAdded(t.name,t.priority,e.listId),g.current.value="",B(!1)},children:"Add Task"})})]}),Object(u.jsxs)("div",{className:"sortRadio",children:[Object(u.jsxs)("label",{class:"radio-inline",children:[Object(u.jsx)("input",{type:"radio",id:"html",name:"fav_language",value:"HTML",onClick:function(){return K("priority","asc")}}),"Sort By Priority"]}),Object(u.jsxs)("label",{className:"radio-inline",children:[Object(u.jsx)("input",{type:"radio",id:"css",name:"fav_language",value:"CSS",onClick:function(){K("name","asc")}}),"Sort By Name"]}),Object(u.jsxs)("label",{className:"radio-inline",children:[Object(u.jsx)("input",{type:"radio",id:"javascript",name:"fav_language",value:"JavaScript",onClick:function(){K("creationDate","asc")}}),"Sort By Creation Date"]})]}),Object(u.jsx)("button",{class:"direction",onClick:function(){"asc"===S.sortDirection?(k({sortField:S.sortField,sortDirection:"desc"}),Y("Descending")):(k({sortField:S.sortField,sortDirection:"asc"}),Y("Ascending"))},id:"order","aria-label":"Press this to Order by"+P+"You can toggle between ascending and descending",children:P}),Object(u.jsx)("br",{}),Object(u.jsxs)("div",{class:"deleteButtons",children:[U()?Object(u.jsx)("div",{class:"deleteTask",children:Object(u.jsx)("button",{type:"button",name:"delete",id:"delete",onClick:function(){_(e.listId,l),d(null)},children:" Delete Task"})}):null,!U()&&q.filter((function(e){return e.completed})).length>0?Object(u.jsx)("div",{class:"deleteAllButton",children:Object(u.jsx)("button",{type:"button",id:"deleteAll",onClick:function(){!function(){console.log("data",q);var t=q.filter((function(e){return e.completed}));console.log("completedItems",t);for(var n=0;n<t.length;n++)_(e.listId,t[n].id)}()},children:"Delete All Completed Tasks"})}):null]}),Object(u.jsxs)("div",{class:"taskList",children:[" ",W," "]}),Object(u.jsx)("br",{})]})};n(54);d.a.initializeApp({apiKey:"AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",authDomain:"hmc-cs124-fa21-labs.firebaseapp.com",projectId:"hmc-cs124-fa21-labs",storageBucket:"hmc-cs124-fa21-labs.appspot.com",messagingSenderId:"949410042946",appId:"1:949410042946:web:0113b139a7e3cd1cc709db"});var v=d.a.firestore().collection("waverlywang7-listitems");var x=function(e){var t=Object(i.useState)(""),n=Object(o.a)(t,2),c=n[0],a=n[1],s=Object(i.useRef)(null),l=Object(h.a)(v),d=Object(o.a)(l,3),r=d[0],j=d[1],b=(d[2],[]);void 0!==r&&(b=r.docs.map((function(e){return e.data()})));var p=b.map((function(t){return Object(u.jsx)("button",{name:t.name,id:"listNameButton",onClick:function(n){return e.setListIdAndName(t.id,t.name)},children:t.name})}));return Object(u.jsx)("div",{children:j?Object(u.jsx)("div",{children:"Loading..."}):Object(u.jsxs)("div",{class:"myLists",children:[Object(u.jsx)("h2",{children:" MY LISTS "}),Object(u.jsxs)("div",{className:"inputbar",children:[Object(u.jsx)("input",{type:"text",ref:s,id:"myListInput",onChange:function(e){return a(e.target.value)},placeholder:"Name your list"}),Object(u.jsx)("div",{className:"addList",children:Object(u.jsx)("button",{type:"button",name:"add",id:"add",onClick:function(){var t={name:c,id:Object(m.a)()};e.onListAdded(t.name,t.id),s.current.value=""},children:"Create New List"})})]}),Object(u.jsxs)("div",{className:"LoL",children:[" ",p," "]})]})})};d.a.initializeApp({apiKey:"AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",authDomain:"hmc-cs124-fa21-labs.firebaseapp.com",projectId:"hmc-cs124-fa21-labs",storageBucket:"hmc-cs124-fa21-labs.appspot.com",messagingSenderId:"949410042946",appId:"1:949410042946:web:0113b139a7e3cd1cc709db"});var g=d.a.firestore().collection("waverlywang7-listitems");var y=function(e){var t=Object(i.useState)(null),n=Object(o.a)(t,2),c=n[0],a=n[1],s=Object(i.useState)(null),r=Object(o.a)(s,2),j=r[0],b=r[1],p=Object(h.a)(g),O=Object(o.a)(p,3),v=O[0],y=(O[1],O[2],null);return void 0!==v&&(y=v.docs.map((function(e){return e.data()})),null===c||y.find((function(e){return e.id===c}))||a(null)),Object(u.jsx)("div",{children:c?Object(u.jsx)(f,{name:j,listId:c,returnHome:function(){a(null),b(null)},onListDeleted:function(e){g.doc(e).delete()},onItemAdded:function(e,t,n){var i={id:Object(m.a)(),priority:t,name:e,creationDate:d.a.database.ServerValue.TIMESTAMP,completed:!1};console.log("add item",i),g.doc(n).collection("tasks").doc(i.id).set(i)},onListItemFieldChanged:function(e,t,n,i){console.log("field",n),console.log("value",i),g.doc(e).collection("tasks").doc(t).update(Object(l.a)({},n,i))}}):Object(u.jsx)(x,{setListIdAndName:function(e,t){a(e),b(t)},list:y,onListAdded:function(e,t){var n={id:t,name:e};g.doc(t).set(n)}})})},I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),i(e),c(e),a(e),s(e)}))};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(y,{initialList:[]})}),document.getElementById("root")),I()}},[[55,1,2]]]);
//# sourceMappingURL=main.6be251d5.chunk.js.map