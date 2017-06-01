webpackJsonp([2],{

/***/ 1065:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var formatBytes=exports.formatBytes=function formatBytes(bytes,decimals){
if(bytes==0)return'0 Byte';
var k=1000;
var dm=decimals+1||3;
var sizes=['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
var i=Math.floor(Math.log(bytes)/Math.log(k));

return parseFloat((bytes/Math.pow(k,i)).toFixed(dm))+' '+sizes[i];
};

/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);

var _reactRedux=__webpack_require__(8);

var _bindAll=__webpack_require__(39);var _bindAll2=_interopRequireDefault(_bindAll);


var _format=__webpack_require__(1065);


var _systemStats=__webpack_require__(899);


var _Widget=__webpack_require__(336);var _Widget2=_interopRequireDefault(_Widget);


var _Table=__webpack_require__(52);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


GeneralStatsWidget=function(_React$Component){_inherits(GeneralStatsWidget,_React$Component);

function GeneralStatsWidget(props){_classCallCheck(this,GeneralStatsWidget);var _this=_possibleConstructorReturn(this,(GeneralStatsWidget.__proto__||Object.getPrototypeOf(GeneralStatsWidget)).call(this,
props));

(0,_bindAll2.default)(_this,['componentdidMount','handleRefreshClick']);return _this;
}_createClass(GeneralStatsWidget,[{key:'componentdidMount',value:function componentdidMount()

{var _props=
this.props,dispatch=_props.dispatch,accessToken=_props.accessToken;

dispatch((0,_systemStats.fetchSystemStatsIfNeeded)(accessToken));
}},{key:'handleRefreshClick',value:function handleRefreshClick(

e){
e.preventdefault();var _props2=

this.props,dispatch=_props2.dispatch,accessToken=_props2.accessToken;

dispatch((0,_systemStats.invalidateSystemStats)());
dispatch((0,_systemStats.fetchSystemStatsIfNeeded)(accessToken));
}},{key:'render',value:function render()

{var

systemStats=this.props.systemStats;

return(
_react2.default.createElement(_Widget2.default,{lastUpdated:systemStats.lastUpdated,
isFetching:systemStats.isFetching,
handleRefreshClick:this.handleRefreshClick},
_react2.default.createElement(_Table.Table,null,
_react2.default.createElement('thead',null,
_react2.default.createElement('tr',null,_react2.default.createElement('th',null,'Key'),_react2.default.createElement('th',null,'Value'))),

_react2.default.createElement('tbody',null,
_react2.default.createElement('tr',null,_react2.default.createElement('td',null,'OS'),_react2.default.createElement('td',null,systemStats.os)),
_react2.default.createElement('tr',null,_react2.default.createElement('td',null,'Platform'),_react2.default.createElement('td',null,systemStats.platform)),
_react2.default.createElement('tr',null,_react2.default.createElement('td',null,'Hostname'),_react2.default.createElement('td',null,systemStats.hostname)),
_react2.default.createElement('tr',null,_react2.default.createElement('td',null,'PID'),_react2.default.createElement('td',null,systemStats.pid)),
_react2.default.createElement('tr',null,_react2.default.createElement('td',null,'Node Version'),_react2.default.createElement('td',null,systemStats.nodeVersion)),
_react2.default.createElement(_Table.Seperator,null,
_react2.default.createElement('td',{colSpan:'2'},'Bandwidth data of the last',

' '+systemStats.bandwidth.interval/1000/60,' minutes')),


_react2.default.createElement('tr',null,
_react2.default.createElement('td',null,'Requests served'),
_react2.default.createElement('td',null,systemStats.bandwidth.requestsServed)),

_react2.default.createElement('tr',null,
_react2.default.createElement('td',null,'Data sent'),
_react2.default.createElement('td',null,
(0,_format.formatBytes)(
systemStats.bandwidth.bytesServed/(
systemStats.bandwidth.interval/1000)),'/s')),



_react2.default.createElement('tr',null,
_react2.default.createElement('td',null,'Data received'),
_react2.default.createElement('td',null,
(0,_format.formatBytes)(systemStats.bandwidth.bytesReceived/(systemStats.bandwidth.interval/1000)),'/s'))))));






}}]);return GeneralStatsWidget;}(_react2.default.Component);
;

var mapStateToProps=function mapStateToProps(state){
return{
accessToken:state.app.authentication.accessToken.token,
systemStats:state.app.dashboard.systemStats};

};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(GeneralStatsWidget);

/***/ }),

/***/ 899:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.fetchSystemStatsIfNeeded=exports.invalidateSystemStats=undefined;var _rest=__webpack_require__(66);

var invalidateSystemStats=exports.invalidateSystemStats=function invalidateSystemStats(){
return{
type:'INVALIDATE_SYSTEM_STATS'};

};

var requestSystemStats=function requestSystemStats(accessToken){
return{
type:'REQUEST_SYSTEM_STATS',
accessToken:accessToken};

};

var failSystemStatsRequest=function failSystemStatsRequest(error){
return{
type:'FAIL_SYSTEM_STATS_REQUEST',
error:error};

};

var receiveSystemStats=function receiveSystemStats(systemStats,receivedAt){
return{
type:'RECEIVE_SYSTEM_STATS',
systemStats:systemStats,
receivedAt:receivedAt};

};

var fetchSystemStats=function fetchSystemStats(accessToken){
return function(dispatch){

dispatch(
requestSystemStats(accessToken));


return(0,_rest.fetchApi)('system/stats','GET',{},accessToken).
then(function(stats){

dispatch(
receiveSystemStats(stats,Date.now()));


}).catch(function(error){

dispatch(
failSystemStatsRequest(error));


dispatch(push('/'));
});
};
};

var shouldFetchSystemStats=function shouldFetchSystemStats(state,accessToken){
var stats=state.app.dashboard.systemStats;

if(stats.isFetching){
return false;
}else if(stats.lastUpdated===0){
return true;
}else{
return stats.didInvalidate;
}
};

var fetchSystemStatsIfNeeded=exports.fetchSystemStatsIfNeeded=function fetchSystemStatsIfNeeded(accessToken){

return function(dispatch,getState){
if(shouldFetchSystemStats(getState(),accessToken)){

return dispatch(fetchSystemStats(accessToken));
}else{

return Promise.resolve();
}
};
};

/***/ })

});