(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t(14),a=t.n(r),i=t(3),o=t(4),u=t.n(o),d="/api/persons",s=function(){return u.a.get(d).then((function(e){return e.data}))},l=function(e){return u.a.post(d,e).then((function(e){return e.data}))},b=function(e,n){return u.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){return u.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},h=t(0),f=function(e){var n=e.persons,t=e.filter,c=e.removePerson;return Object(h.jsx)("div",{children:n.map((function(e){return e.name.toLowerCase().includes(t)?Object(h.jsxs)("div",{children:[e.name," ",e.number,Object(h.jsx)("button",{name:e.name,id:e.id,onClick:c,children:" delete "})]},e.id):null}))})},m=function(e){var n=e.handleFilterChange;return Object(h.jsxs)("div",{children:["filter shown with",Object(h.jsx)("input",{onChange:n})]})},O=function(e){return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:e.addContact,children:[Object(h.jsxs)("div",{children:["name:",Object(h.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(h.jsxs)("div",{children:["number:",Object(h.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})})},v=function(e){var n=e.notification,t={color:e.notificationColor,background:"lightgray",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n?Object(h.jsx)("div",{}):Object(h.jsx)("div",{style:t,children:n})},g=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),o=Object(i.a)(a,2),u=o[0],d=o[1],g=Object(c.useState)(""),x=Object(i.a)(g,2),p=x[0],C=x[1],w=Object(c.useState)(""),N=Object(i.a)(w,2),S=N[0],y=N[1],k=Object(c.useState)(null),P=Object(i.a)(k,2),A=P[0],B=P[1],D=Object(c.useState)("green"),E=Object(i.a)(D,2),F=E[0],J=E[1];Object(c.useEffect)((function(){s().then((function(e){r(e)}))}),[]);var z=function(e){I(e,"green"),C(""),y("")},I=function(e,n){B(e),J(n),setTimeout((function(){return B(null)}),5e3)};return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(v,{notification:A,notificationColor:F}),Object(h.jsx)(m,{handleFilterChange:function(e){d(e.target.value)}}),Object(h.jsx)("h3",{children:"Add a new"}),Object(h.jsx)(O,{addContact:function(e){e.preventDefault();var n=t.find((function(e){return e.name.includes(p)}));if(n){if(window.confirm("".concat(p," is already added to phonebook, replace old number with new one?"))){var c={name:p,id:n.id,number:S};b(c.id,c).then((function(e){r(t.map((function(e){return e.number!==n.number?e:c}))),z("Changed ".concat(p))})).catch((function(e){I("".concat(p," not found at server"),"red")}))}}else{var a={name:p,id:t[t.length-1].id+1,number:S};l(a).then((function(e){r(t.concat(e)),z("Added ".concat(p))})).catch((function(e){I("Can't add ".concat(p," to the server"),"red")}))}},newName:p,newNumber:S,handleNameChange:function(e){C(e.target.value)},handleNumberChange:function(e){y(e.target.value)}}),Object(h.jsx)("h3",{children:"Numbers"}),Object(h.jsx)(f,{persons:t,filter:u,removePerson:function(e){window.confirm("delete ".concat(e.target.name))&&j(e.target.id).then((function(){return s()})).then((function(n){r(n),I("Deleted ".concat(e.target.name),"red")})).catch((function(n){I("".concat(e.target.name," has already been removed from server"),"red")}))}})]})};a.a.render(Object(h.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.4777efd1.chunk.js.map