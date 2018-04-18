// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/HandleRegistry ../../../../core/Accessor ../../../../geometry/Point ../../lib/glMatrix ../Evented ../PropertiesPool ./CenterOnSurface ./ContentGeometryUpdates ./disposeMembers ./SurfaceGeometryUpdates ./StableSurfaceCenter ../../webgl-engine/lib/Camera ../../webgl-engine/lib/Selector".split(" "),function(e,g,n,d,c,p,q,r,k,t,
u,h,v,w,x,y,z,l){Object.defineProperty(g,"__esModule",{value:!0});e=function(e){function b(a){a=e.call(this,a)||this;a.handles=new p;a.lastSeenCameraParameters=new z;a.surfaceAltitudeAtCenter=0;a.surfaceAltitudeAtCenterDirty=!0;a.surfaceAltitudeAtCenterWithContent=0;a.surfaceAltitudeAtCenterWithContentDirty=!0;a.propertiesPool=new u.default({pointOfView:r,renderPointOfView:Array},a);a.updateSurfaceAltitudeFrequentInterval=A;a.updateSurfaceAltitudeInfrequentInterval=B;a.events=new t.Evented;a.renderPointOfView=
[0,0,0];return a}n(b,e);b.prototype.initialize=function(){var a=this,b=this.view.state,c=this.view.basemapTerrain,d=this.view.renderCoordsHelper;this.surfaceSelector=new l(b.mode);this.surfaceSelector.enableBackfacesTerrain=b.isGlobal?!1:!0;this.surfaceSelector.enableInvisibleTerrain=!1;this.contentSelector=new l(b.mode);this.contentSelector.enableTerrain=!1;var e=this.estimateSurfaceAltitudeAtCenter.bind(this);this._set("centerOnSurfaceInfrequent",new h.default({state:b,surface:c,renderCoordsHelper:d,
estimateSurfaceAltitudeAtCenter:e,altitudeEstimationInterval:this.updateSurfaceAltitudeInfrequentInterval}));this._set("centerOnSurfaceFrequent",new h.default({state:b,surface:c,renderCoordsHelper:d,estimateSurfaceAltitudeAtCenter:e,altitudeEstimationInterval:this.updateSurfaceAltitudeFrequentInterval}));this._set("centerOnContent",new h.default({state:b,surface:c,renderCoordsHelper:d,estimateSurfaceAltitudeAtCenter:this.estimateSurfaceAltitudeAtCenterWithContent.bind(this),altitudeEstimationInterval:this.updateSurfaceAltitudeFrequentInterval}));
this._set("surfaceGeometryUpdates",new x.default({state:b,surface:c,renderCoordsHelper:d,centerOnSurfaceInstances:[this.centerOnSurfaceFrequent,this.centerOnContent,this.centerOnSurfaceInfrequent]}));this._set("contentGeometryUpdates",new v.default({contentLayerViews:this.view.allLayerViews,renderCoordsHelper:d}));this._set("surfaceOrigin",new y.default({view:this.view}));this.handles.add(b.watch("camera",function(b){return a.cameraChanged(b)},!0));this.handles.add(this.surfaceGeometryUpdates.events.on("request-update",
function(){return a.updateCenterPointsOfInterest()}));this.handles.add(c.watch("extent",function(){return a.updateCenterPointsOfInterest()}));this.handles.add(this.contentGeometryUpdates.events.on("request-update",function(){return a.updateCenterOnContent()}));this.cameraChanged(this.view.state.camera);this.forceUpdate()};b.prototype.destroy=function(){w.default(this,"handles","centerOnSurfaceInfrequent","centerOnSurfaceFrequent","centerOnContent","surfaceOrigin","propertiesPool")};Object.defineProperty(b.prototype,
"pointOfView",{get:function(){var a=this.propertiesPool.get("pointOfView");this.view.renderCoordsHelper.fromRenderCoords(this.renderPointOfView,a,this.view.state.spatialReference);return a},enumerable:!0,configurable:!0});b.prototype.forceUpdate=function(){this.surfaceGeometryUpdates.forceUpdate();this.centerOnSurfaceInfrequent.forceUpdate();this.centerOnSurfaceFrequent.forceUpdate();this.centerOnContent.forceUpdate()};b.prototype.hasPendingUpdates=function(){return this.surfaceGeometryUpdates.hasPendingUpdates()||
this.centerOnContent.hasPendingUpdates()||this.centerOnSurfaceInfrequent.hasPendingUpdates()||this.centerOnSurfaceFrequent.hasPendingUpdates()};b.prototype.estimateSurfaceAltitudeAtCenterWithContent=function(){if(!this.surfaceAltitudeAtCenterWithContentDirty)return this.surfaceAltitudeAtCenterWithContent;this.surfaceAltitudeAtCenterWithContentDirty=!1;var a=this.view.state.camera;this.view._stage.pickRay(a.eye,a.center,null,null,null,!1,this.contentSelector);this.contentSelector.minResult.getIntersectionPoint(f)?
this.surfaceAltitudeAtCenterWithContent=this.view.renderCoordsHelper.getAltitude(f):this.surfaceAltitudeAtCenterWithContent=this.estimateSurfaceAltitudeAtCenter();return this.surfaceAltitudeAtCenterWithContent};b.prototype.estimateSurfaceAltitudeAtCenter=function(){if(!this.view.basemapTerrain)return 0;if(!this.surfaceAltitudeAtCenterDirty)return this.surfaceAltitudeAtCenter;this.surfaceAltitudeAtCenterDirty=!1;var a=this.view.state.camera;this.surfaceSelector.init(null,a.eye,a.center,null,a,null,
!1);this.view.basemapTerrain.intersect(this.surfaceSelector,a.eye,a.center);this.surfaceSelector.minResult.getIntersectionPoint(f)&&(this.surfaceAltitudeAtCenter=this.view.renderCoordsHelper.getAltitude(f));return this.surfaceAltitudeAtCenter};b.prototype.cameraChanged=function(a){this.updateCenterPointsOfInterest(a);this.cameraParametersChanged(this.lastSeenCameraParameters,a)&&(this.lastSeenCameraParameters.copyFrom(a),m.camera=a,this.events.emit("camera-parameters-changed",m));a=a.eye;this.renderPointOfView[0]===
a[0]&&this.renderPointOfView[1]===a[1]&&this.renderPointOfView[2]===a[2]||this._set("renderPointOfView",k.vec3d.set(a,this.propertiesPool.get("renderPointOfView")))};b.prototype.updateCenterPointsOfInterest=function(a){void 0===a&&(a=this.view.state.camera);this.surfaceAltitudeAtCenterWithContentDirty=this.surfaceAltitudeAtCenterDirty=!0;this.centerOnSurfaceFrequent.update(a);this.centerOnSurfaceInfrequent.update(a);this.centerOnContent.update(a)};b.prototype.updateCenterOnContent=function(){this.surfaceAltitudeAtCenterWithContentDirty=
!0;this.centerOnContent.update(this.view.state.camera)};b.prototype.cameraParametersChanged=function(a,b){return a.fov!==b.fov||a.fullViewport[0]!==b.fullViewport[0]||a.fullViewport[1]!==b.fullViewport[1]||a.fullViewport[2]!==b.fullViewport[2]||a.fullViewport[3]!==b.fullViewport[3]||a.padding[0]!==b.padding[0]||a.padding[1]!==b.padding[1]||a.padding[2]!==b.padding[2]||a.padding[3]!==b.padding[3]?!0:!1};d([c.property({constructOnly:!0})],b.prototype,"updateSurfaceAltitudeFrequentInterval",void 0);
d([c.property({constructOnly:!0})],b.prototype,"updateSurfaceAltitudeInfrequentInterval",void 0);d([c.property({readOnly:!0})],b.prototype,"centerOnContent",void 0);d([c.property({readOnly:!0})],b.prototype,"centerOnSurfaceFrequent",void 0);d([c.property({readOnly:!0})],b.prototype,"centerOnSurfaceInfrequent",void 0);d([c.property({readOnly:!0})],b.prototype,"surfaceOrigin",void 0);d([c.property({readOnly:!0})],b.prototype,"contentGeometryUpdates",void 0);d([c.property({readOnly:!0})],b.prototype,
"events",void 0);d([c.property({readOnly:!0,dependsOn:["renderPointOfView"]})],b.prototype,"pointOfView",null);d([c.property({readOnly:!0})],b.prototype,"renderPointOfView",void 0);d([c.property({readOnly:!0})],b.prototype,"surfaceGeometryUpdates",void 0);d([c.property({constructOnly:!0})],b.prototype,"view",void 0);return b=d([c.subclass("esri.views.3d.support.PointsOfInterest")],b)}(c.declared(q));g.PointsOfInterest=e;var m={camera:null},f=k.vec3d.create(),A=200,B=3E3;g.default=e});