(()=>{"use strict";const e=window.wc.wcBlocksRegistry,t=window.React,n=window.wp.htmlEntities,r=window.wc.wcSettings,s=()=>{const e=(0,r.getSetting)("monri_data",null);if(!e)throw new Error("Monri settings not available");return e},o=()=>s(),a=window.wp.data,{CART_STORE_KEY:c}=wc.wcBlocksData,l=()=>(0,a.useSelect)((e=>e(c).getCartData())),i=window.wp.i18n,{extensionCartUpdate:m}=wc.blocksCheckout,u=e=>{m({namespace:"monri-payments",data:{installments:e}})},d=()=>{const e=o().installments,[n,r]=(0,t.useState)(0);(0,t.useEffect)((()=>{u(n)}),[n]),(0,t.useEffect)((()=>()=>{u(0)}),[]);const s=(0,t.useMemo)((()=>(e=>{if(e<1)return[];const t=[{label:(0,i.__)("No installments","monri"),value:0}];for(let n=2;n<=e;n++)t.push({label:n,value:n});return t})(e)),[e]),a=(0,t.useId)(),c=-1!==[...l().fees].findIndex((e=>"monri_installments_fee"===e.key))?(0,i.__)("An additional installments fee has been applied","monri"):null;return s.length<1?null:(0,t.createElement)("div",null,(0,t.createElement)("label",{htmlFor:a},(0,i.__)("Number of installments: ","monri")),(0,t.createElement)("select",{id:a,onChange:e=>{return t=e.target.value,r(t);var t},value:n},s.map((({label:e,value:n})=>(0,t.createElement)("option",{value:n,key:`installments-${n}`},e)))),c&&(0,t.createElement)("div",{className:"installments-notice"},c))},p=()=>{const e=s(),t=(0,n.decodeEntities)(e.title)||(0,i.__)("Monri","monri");return{name:"monri",label:t,ariaLabel:t,canMakePayment:()=>!0,supports:{features:e.supports}}},w=()=>{const e=o(),r=e.installments;return(0,t.createElement)(t.Fragment,null,(0,n.decodeEntities)(e.description||""),r?(0,t.createElement)(d,null):"")},_=window.Monri,E=e=>{const r=o(),s=l(),{eventRegistration:a,emitResponse:c}=e,{onPaymentSetup:m}=a,u=(0,t.useId)(),d=(0,t.useRef)(null),p=(0,t.useRef)(null);return(0,t.useEffect)((()=>{d.current=_(r.components.authenticity_token,{locale:r.components.locale});const e=d.current.components({clientSecret:r.components.client_secret});p.current=e.create("card",{style:{invalid:{color:"red"}},showInstallmentsSelection:r.installments}),p.current.mount(u)}),[]),(0,t.useEffect)((()=>{const e=m((async()=>{try{const e=await(async e=>{const t={address:e.address_1,fullName:`${e.first_name} ${e.last_name}`,city:e.city,zip:e.postcode,phone:e.phone,country:e.country,email:e.email};for(const[e,n]of Object.entries(t))if(Object.prototype.hasOwnProperty.call(t,e)&&n.toString().trim().length<1)throw new Error((0,i.sprintf)((0,i.__)("%s is a required field","woocommerce"),y(e)));const n=await d.current.confirmPayment(p.current,t);if(n.error)throw new Error(n.error.message);if("approved"===n.result.status)return n.result;throw new Error((0,i.__)("Transaction declined, please reload the page.","monri"))})(s.billingAddress);return{type:c.responseTypes.SUCCESS,meta:{paymentMethodData:{"monri-transaction":JSON.stringify(e)}}}}catch(e){return{type:c.responseTypes.ERROR,message:e.message}}}));return()=>{e()}}),[c.responseTypes.ERROR,c.responseTypes.SUCCESS,s,m]),(0,t.createElement)(t.Fragment,null,(0,n.decodeEntities)(r.description||""),(0,t.createElement)("br",null),(0,t.createElement)("div",{id:u}))},y=e=>{let t=e;switch(e){case"address":t=(0,i.__)("Address","woocommerce");break;case"fullName":t=(0,i.__)("Name.","woocommerce");break;case"city":t=(0,i.__)("City","woocommerce");break;case"zip":t=(0,i.__)("Postal code","woocommerce");break;case"phone":t=(0,i.__)("Phone","woocommerce");break;case"country":t=(0,i.__)("Country/Region","woocommerce");break;case"email":t=(0,i.__)("Email address","woocommerce")}return t},f=()=>{const e=o();return(0,n.decodeEntities)(e.description||"")},h=(()=>{const e=o();switch(e.service){case"monri-ws-pay":return(()=>{const e={...p(),content:(0,t.createElement)(f,null),edit:(0,t.createElement)(f,null)};return-1!==o().supports.indexOf("tokenization")&&(e.supports.showSaveOption=!0,e.supports.showSavedCards=!0),e})();case"monri-web-pay":return"components"===e.integration_type?{...p(),content:(0,t.createElement)(E,null),edit:(0,t.createElement)(E,null)}:{...p(),content:(0,t.createElement)(w,null),edit:(0,t.createElement)(w,null)}}})();(0,e.registerPaymentMethod)(h)})();