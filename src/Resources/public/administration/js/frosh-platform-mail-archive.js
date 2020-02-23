(this.webpackJsonp=this.webpackJsonp||[]).push([["frosh-platform-mail-archive"],{"2HAA":function(e,t){e.exports='<sw-page class="frosh-mail-archive-detail">\n    <template slot="smart-bar-header">\n        <h2>{{ archive.subject }}</h2>\n    </template>\n\n    <template slot="smart-bar-actions">\n        <sw-button variant="ghost" v-if="archive.customer" @click="openCustomer">\n            {{ $tc(\'frosh-mail-archive.detail.toolbar.customer\') }}\n        </sw-button>\n\n        <sw-button-process :isLoading="isLoading" :processSuccess="isSuccessful" @click="resendMail">\n            {{ $tc(\'frosh-mail-archive.detail.toolbar.resend\') }}\n        </sw-button-process>\n    </template>\n\n    <template slot="content">\n        <sw-card-view v-if="archive">\n            <sw-card :title="$tc(\'frosh-mail-archive.detail.metadata.title\')">\n                <sw-text-field :label="$tc(\'frosh-mail-archive.detail.metadata.sender\')" :disabled="true" v-model="archive.sender"></sw-text-field>\n                <sw-text-field :label="$tc(\'frosh-mail-archive.detail.metadata.receiver\')" :disabled="true" v-model="receiverText"></sw-text-field>\n                <sw-text-field :label="$tc(\'frosh-mail-archive.detail.metadata.subject\')" :disabled="true" v-model="archive.subject"></sw-text-field>\n                <sw-text-field :label="$tc(\'frosh-mail-archive.detail.metadata.salesChannel\')" v-if="archive.salesChannel" :disabled="true" v-model="archive.salesChannel.name"></sw-text-field>\n            </sw-card>\n            <sw-card :title="$tc(\'frosh-mail-archive.detail.content.title\')">\n                <h4>HTML</h4>\n                <iframe :src="htmlText" sandbox frameborder="0"></iframe>\n                <h4>Plain</h4>\n\n                <iframe :src="plainText" sandbox frameborder="0"></iframe>\n            </sw-card>\n        </sw-card-view>\n    </template>\n</sw-page>\n'},UxBf:function(e,t,i){},euFd:function(e,t){e.exports='<sw-page>\n    <template slot="smart-bar-header">\n        <h2>{{ $tc(\'frosh-mail-archive.title\') }}</h2>\n    </template>\n    <template slot="content">\n        <sw-entity-listing\n            v-if="items"\n            :items="items"\n            :columns="columns"\n            :repository="mailArchiveRepository"\n        >\n            <template slot="column-receiver" slot-scope="{ item }">\n                <span v-for="(element, index) in item.receiver">\n                    {{ element }} <<a :href=\'`mailto:${index}`\'>{{ index }}</a>>\n                </span>\n            </template>\n\n            <template slot="column-createdAt" slot-scope="{ item }">\n                {{ item.createdAt | date({hour: \'2-digit\', minute: \'2-digit\', second: \'2-digit\'}) }}\n            </template>\n\n            <template slot="detail-action" slot-scope="{ item }">\n                <sw-context-menu-item class="sw-entity-listing__context-menu-show-action" :routerLink="{ name: \'frosh.mail.archive.detail\', params: { id: item.id } }">\n                    {{ $tc(\'frosh-mail-archive.list.columns.action\') }}\n                </sw-context-menu-item>\n            </template>\n\n        </sw-entity-listing>\n    </template>\n</sw-page>\n'},oUAo:function(e,t,i){var a=i("UxBf");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,i("SZ7m").default)("192bad0c",a,!0,{})},qnKq:function(e,t,i){"use strict";i.r(t);const a=Shopware.Classes.ApiService;var r=class extends a{constructor(e,t,i="frosh-mail-archive"){super(e,t,i)}resendMail(e){const t=this.getBasicHeaders({});return this.httpClient.post(`_action/${this.getApiBasePath()}/resend-mail`,{mailId:e},{...this.basicConfig,headers:t}).then(e=>a.handleResponse(e))}};const{Application:s}=Shopware;s.addServiceProvider("froshMailArchiveService",e=>{const t=s.getContainer("init");return new r(t.httpClient,e.loginService)});var n=i("euFd"),o=i.n(n);const{Component:l,Mixin:c}=Shopware,{Criteria:h}=Shopware.Data;l.register("frosh-mail-archive-index",{template:o.a,inject:["repositoryFactory"],mixins:[c.getByName("listing")],metaInfo(){return{title:this.$createTitle()}},data:()=>({repository:null,items:[],isLoading:!0,total:0}),computed:{columns(){return[{property:"createdAt",dataIndex:"createdAt",label:this.$tc("frosh-mail-archive.list.columns.sendDate"),primary:!0},{property:"subject",dataIndex:"subject",label:this.$tc("frosh-mail-archive.list.columns.subject"),allowResize:!0},{property:"receiver",dataIndex:"receiver",label:this.$tc("frosh-mail-archive.list.columns.receiver"),allowResize:!0}]},mailArchiveRepository(){return this.repositoryFactory.create("frosh_mail_archive")}},methods:{getList(){return this.isLoading=!0,this.mailArchiveRepository.search(new h,Shopware.Context.api).then(e=>{this.items=e,this.total=e.total,this.isLoading=!1})},updateTotal({total:e}){this.total=e}}});var m=i("2HAA"),d=i.n(m);i("oUAo");const{Component:p,Mixin:u}=Shopware,{Criteria:v}=Shopware.Data;p.register("frosh-mail-archive-detail",{template:d.a,inject:["repositoryFactory","froshMailArchiveService"],data:()=>({archive:null,isLoading:!1,isSuccessful:!1}),created(){this.repository=this.repositoryFactory.create("frosh_mail_archive"),this.repository.get(this.$route.params.id,Shopware.Context.api).then(e=>{this.archive=e})},computed:{receiverText(){let e=[];return Object.keys(this.archive.receiver).forEach(t=>{e.push(`${t} <${this.archive.receiver[t]}>`)}),e.join(",")},htmlText(){return this.getContent(this.archive.htmlText)},plainText(){return this.getContent(this.archive.plainText)}},methods:{getContent:e=>"data:text/html;base64,"+btoa(unescape(encodeURIComponent(e.replace(/[\u00A0-\u2666]/g,(function(e){return"&#"+e.charCodeAt(0)+";"}))))),openCustomer(){this.$router.push({name:"sw.customer.detail",params:{id:this.archive.customer.id}})},resendMail(){this.isLoading=!0,this.froshMailArchiveService.resendMail(this.archive.id).then(()=>{this.isLoading=!1,this.isSuccessful=!0}).catch(()=>{this.isLoading=!1,this.isSuccessful=!1})}}}),Shopware.Module.register("frosh-mail-archive",{type:"plugin",name:"frosh-mail-archive.title",title:"frosh-mail-archive.title",description:"",color:"#62ff80",icon:"default-communication-envelope",routes:{list:{component:"frosh-mail-archive-index",path:"list"},detail:{component:"frosh-mail-archive-detail",path:"detail/:id",meta:{parentPath:"frosh.mail.archive.list"}}},navigation:[{label:"frosh-mail-archive.title",color:"#62ff80",path:"frosh.mail.archive.list",icon:"default-communication-envelope"}]})}},[["qnKq","runtime","vendors-node"]]]);