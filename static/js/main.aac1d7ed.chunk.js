(this.webpackJsonplab2=this.webpackJsonplab2||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),l=n(9),d=n.n(l),s=(n(15),n(5)),o=n(3),a=n(10),u=n(2),r=(n(16),n(17),n(0));var j=function(e){return Object(r.jsx)("input",{type:"text",className:e.field,onChange:function(t){return e.onListItemFieldChanged(e.id,e.field,t.target.value)},value:e[e.field]})};var b=function(e){var t=["listItem "];return e.selected&&t.push("selected"),Object(r.jsx)("div",{className:t.join(" "),id:e.id,onClick:function(t){e.onRowClick(t.currentTarget.id)},children:Object(r.jsxs)("div",{class:"container2",children:[Object(r.jsx)("input",{type:"checkbox",onChange:function(t){e.onListItemFieldChanged(e.id,"completed",t.target.checked)},id:e.id,checked:e.completed}),Object(r.jsx)(j,Object(o.a)({field:"name"},e))]})},e.id)},O=(n(19),n(8));n(20);var f=function(e){return Object(r.jsxs)("button",{type:"button",className:e.isSelected?"selected1":"unselected1",onClick:function(){return e.setShowCompletedItems(e.name)},children:[Object(r.jsx)("span",{className:"visually-hidden",children:"Show\xa0"}),Object(r.jsx)("span",{children:e.name})]})};var m=function(e){var t=Object(c.useState)({name:"",id:0,completed:!1}),n=Object(u.a)(t,2),i=(n[0],n[1]),l=Object(c.useState)(null),d=Object(u.a)(l,2),s=d[0],a=d[1],j=Object(c.useState)("All"),m=Object(u.a)(j,2),h=m[0],p=m[1],x=Object(c.useState)(!1),v=Object(u.a)(x,2),C=v[0],g=v[1],k=Object(c.useState)(!1),I=Object(u.a)(k,2),S=(I[0],I[1],Object(c.useRef)(null)),y={All:function(){return!0},Uncompleted:function(e){return!e.completed},Completed:function(e){return e.completed}},L=Object.keys(y).map((function(t){return Object(r.jsx)(f,{name:t,"aria-pressed":e.isSelected,isSelected:t===h,setShowCompletedItems:p})})),A=e.list.filter(y[h]).map((function(t){return Object(r.jsx)(b,Object(o.a)({onRowClick:function(e){return a(e)},onListItemFieldChanged:e.onListItemFieldChanged,selected:t.id===s},t),t.id)}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:" My List "}),L,Object(r.jsx)("br",{}),Object(r.jsx)("input",{type:"text",ref:S,id:"myInput",onChange:function(e){return g(""!==e.target.value)},placeholder:"I need to..."}),C&&Object(r.jsx)("div",{class:"addTask",children:Object(r.jsx)("button",{type:"button",name:"add",onClick:function(){var t={name:S.current.value,id:Object(O.a)(),completed:!1};i(t),e.onItemAdded(t),S.current.value="",g(!1)},children:"Add Task"})}),s&&Object(r.jsx)("div",{class:"deleteTask",children:Object(r.jsx)("button",{type:"button",name:"delete",id:"delete",onClick:function(){e.onDeleteListItem(s),a(null)},children:"Delete Task"})}),Object(r.jsx)("br",{}),Object(r.jsxs)("div",{children:[" ",A," "]}),Object(r.jsx)("br",{}),Object(r.jsx)("div",{class:"deleteAllButton",children:Object(r.jsx)("button",{type:"button",onClick:function(){e.onDeleteAll(s)},children:"Delete All Completed Tasks"})})]})};var h=function(e){var t=Object(c.useState)(e.initialList),n=Object(u.a)(t,2),i=n[0],l=n[1];return Object(r.jsx)("div",{children:Object(r.jsx)(m,{list:i,onItemAdded:function(e){console.log("item"+e),l([].concat(Object(a.a)(i),[e]))},onDeleteListItem:function(e){l(i.filter((function(t){return t.id!==e})))},onListItemFieldChanged:function(e,t,n){l(i.map((function(c){return c.id!==e?c:Object(o.a)(Object(o.a)({},c),{},Object(s.a)({},t,n))})))},onDeleteAll:function(){var e=i.filter((function(e){return!e.completed}));l(e)}})})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,l=t.getLCP,d=t.getTTFB;n(e),c(e),i(e),l(e),d(e)}))};d.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(h,{initialList:[]})}),document.getElementById("root")),p()}],[[21,1,2]]]);
//# sourceMappingURL=main.aac1d7ed.chunk.js.map