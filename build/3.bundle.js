webpackJsonp([3],{

/***/ 897:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);

var _reactRedux=__webpack_require__(8);

var _bindAll=__webpack_require__(39);var _bindAll2=_interopRequireDefault(_bindAll);


var _user=__webpack_require__(83);

var _systemStats=__webpack_require__(899);


var _Widget=__webpack_require__(336);var _Widget2=_interopRequireDefault(_Widget);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


UserWidget=function(_React$Component){_inherits(UserWidget,_React$Component);

function UserWidget(props){_classCallCheck(this,UserWidget);var _this=_possibleConstructorReturn(this,(UserWidget.__proto__||Object.getPrototypeOf(UserWidget)).call(this,
props));

(0,_bindAll2.default)(_this,['componentDidMount','handleRefreshClick']);return _this;
}_createClass(UserWidget,[{key:'componentDidMount',value:function componentDidMount()

{var _props=
this.props,dispatch=_props.dispatch,accessToken=_props.accessToken;

dispatch((0,_user.fetchUsersIfNeeded)(accessToken));
}},{key:'handleRefreshClick',value:function handleRefreshClick(

e){
e.preventDefault();var _props2=

this.props,dispatch=_props2.dispatch,accessToken=_props2.accessToken;

dispatch((0,_systemStats.invalidateUsers)());
dispatch((0,_user.fetchUsersIfNeeded)(accessToken));
}},{key:'render',value:function render()

{var
users=this.props.users;

var newUsers=users.filter(function(user){
return new Date(user.created).getTime()>=Date.now()-1000*60*60*24*7;
});

return(
_react2.default.createElement(_Widget2.default,{handleRefreshClick:this.handleRefreshClick},
_react2.default.createElement('p',null,users.length,' Users registered'),
_react2.default.createElement('small',null,
newUsers.length,' within the last week')));



}}]);return UserWidget;}(_react2.default.Component);
;

var mapStateToProps=function mapStateToProps(state){
return{
accessToken:state.app.authentication.accessToken.token,
users:state.app.users};

};exports.default=

(0,_reactRedux.connect)(mapStateToProps)(UserWidget);

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