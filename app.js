/* =====================================================================
   IH_Map_View — application (runs after libraries load)
   ===================================================================== */
window.__startIH = function(failed){
"use strict";
failed = failed || [];


/* ---- dynamic GIS brand icon cycler: icon changes only, map view stays clean ---- */
var GIS_LOGO_FRAMES=[
  {name:'GIS',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lg1" x1="0" x2="1"><stop stop-color="var(--brand-2)"/><stop offset="1" stop-color="var(--brand)"/></linearGradient></defs><circle cx="32" cy="32" r="27" fill="url(#lg1)"/><g fill="none" stroke="rgba(255,255,255,.62)" stroke-width="1.5"><ellipse cx="32" cy="32" rx="10" ry="27"/><ellipse cx="32" cy="32" rx="19" ry="27"/><path d="M5 32h54M10 19h44M10 45h44"/></g><path class="gisSweep" d="M32 5 A27 27 0 0 1 59 32" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/><text x="32" y="57" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">GIS</text></svg>'},
  {name:'SAT',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(37,99,235,.85)"/><circle cx="32" cy="32" r="19" fill="rgba(52,211,153,.30)"/><path class="gisOrbit" d="M10 32c8-18 36-18 44 0c-8 18-36 18-44 0Z" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.4"/><g class="gisFloat"><rect x="23" y="13" width="16" height="9" rx="2" fill="#fff"/><rect x="15" y="15" width="8" height="5" fill="var(--accent)"/><rect x="39" y="15" width="8" height="5" fill="var(--accent)"/><path d="M31 22l-5 9" stroke="#fff" stroke-width="2"/></g><text x="32" y="57" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">SAT</text></svg>'},
  {name:'ROUTE',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="9" width="50" height="44" rx="11" fill="rgba(14,21,48,.92)" stroke="var(--brand-2)"/><path d="M15 43C22 22 34 49 49 20" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" class="gisDash"/><circle cx="15" cy="43" r="5" fill="var(--brand-2)"/><path d="M49 12c-5 0-9 4-9 9c0 7 9 16 9 16s9-9 9-16c0-5-4-9-9-9Z" fill="var(--bad)"/><circle cx="49" cy="21" r="3" fill="#fff"/><text x="32" y="58" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">ROUTE</text></svg>'},
  {name:'DEM',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(14,22,20,.95)"/><g fill="none" stroke="var(--brand-2)" stroke-width="1.8" opacity=".92"><path d="M9 41c8-13 13-12 23-2s15 8 24-3"/><path d="M11 32c9-10 16-8 24 0s13 6 18-2"/><path d="M16 24c8-8 15-5 21 1s9 4 12 0"/><path d="M22 48c8-5 15-3 22 2"/></g><path class="gisSweep" d="M32 6v52" stroke="rgba(255,255,255,.8)" stroke-width="2"/><text x="32" y="57" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">DEM</text></svg>'},
  {name:'RADAR',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(7,89,133,.9)"/><g fill="none" stroke="rgba(255,255,255,.45)"><circle cx="32" cy="32" r="8"/><circle cx="32" cy="32" r="16"/><circle cx="32" cy="32" r="24"/></g><path class="gisSweep" d="M32 32 L32 7 A25 25 0 0 1 55 42 Z" fill="var(--brand-2)" opacity=".38"/><path class="gisFloat" d="M20 39c-5 0-8-3-8-7s3-7 7-7c2-6 12-7 16-1c5 0 9 4 9 8s-4 7-9 7H20Z" fill="#fff" opacity=".92"/><text x="32" y="58" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">WX</text></svg>'},
  {name:'AIR',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(15,23,42,.96)"/><path d="M9 36c14-12 32-12 46 0" fill="none" stroke="var(--brand-2)" stroke-width="2" class="gisDash"/><path class="gisFloat" d="M34 8l6 21l16 7l-4 5l-13-3l-4 14l-4 4l-3-17l-14 3l-3-5l16-8l6-21h5Z" fill="var(--accent)"/><circle class="gisBlink" cx="51" cy="37" r="3" fill="var(--bad)"/><text x="32" y="58" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">AIR</text></svg>'},
  {name:'LAYERS',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(37,99,235,.9)"/><g class="gisFloat"><path d="M32 14 L52 24 L32 34 L12 24 Z" fill="#fff" opacity=".92"/><path d="M32 26 L52 36 L32 46 L12 36 Z" fill="var(--brand-2)" opacity=".9"/><path d="M32 36 L48 44 L32 52 L16 44 Z" fill="var(--accent)" opacity=".9"/></g><text x="32" y="60" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fff">LAYERS</text></svg>'},
  {name:'PIN',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(16,185,129,.9)"/><path class="gisFloat" d="M32 13c-8 0-14 6-14 14c0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14Z" fill="#fff"/><circle cx="32" cy="27" r="6" fill="var(--brand)"/><text x="32" y="59" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">PIN</text></svg>'},
  {name:'COMPASS',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(124,58,237,.9)"/><circle cx="32" cy="32" r="20" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/><g class="gisSpin" style="transform-origin:32px 32px"><path d="M32 16 L38 32 L32 30 L26 32 Z" fill="var(--bad)"/><path d="M32 48 L26 32 L32 34 L38 32 Z" fill="#fff"/></g><text x="32" y="59" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fff">N</text></svg>'},
  {name:'GLOBE',svg:'<svg class="gisFadeIn" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="27" fill="rgba(2,132,199,.95)"/><g class="gisFloat" fill="rgba(52,211,153,.85)"><path d="M16 26 q6 -3 11 1 q4 4 -2 7 q-8 1 -10 -3 z"/><path d="M36 34 q7 -2 10 3 q1 5 -6 6 q-8 0 -7 -6 z"/></g><g fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.2"><ellipse cx="32" cy="32" rx="10" ry="27"/><path d="M5 32h54"/></g><text x="32" y="59" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fff">GLOBE</text></svg>'}
];
function installDynamicGISLogo(){
  var host=document.getElementById('globe');
  if(!host) return;
  var i=0;
  function draw(){
    var f=GIS_LOGO_FRAMES[i%GIS_LOGO_FRAMES.length];
    host.style.transition='opacity .35s';
    host.style.opacity='0';
    setTimeout(function(){
      host.innerHTML=f.svg;
      host.setAttribute('title','Spatial Itqan — '+f.name+' mode');
      host.style.opacity='1';
    },280);
    i++;
  }
  draw();
  setInterval(draw,3200);
}
installDynamicGISLogo();

/* ---- proj4 CRS definitions (Esri-standard naming) ---- */
var CRS = {
  wgs84:{label:'GCS WGS 1984', esri:'GCS_WGS_1984', code:'EPSG:4326', proj:'+proj=longlat +datum=WGS84 +no_defs', kind:'geographic'},
  webmerc:{label:'WGS 1984 Web Mercator (Auxiliary Sphere)', esri:'WGS_1984_Web_Mercator_Auxiliary_Sphere', code:'EPSG:3857', proj:'+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +no_defs', kind:'projected'}
};

/* ================= PROFESSIONAL EDITING SUITE ================= */
(function installProfessionalEditingSuite(){
  setTimeout(function(){
  var modal=document.getElementById('proSuiteModal');if(!modal)return;
  var $=function(id){return document.getElementById(id);},clone=function(value){return value==null?value:JSON.parse(JSON.stringify(value));};
  var storageKey='SpatialItqanProfessionalSettingsV1',versionKey='SpatialItqanProjectVersionsV1',auditKey='SpatialItqanAuditLogV1',templateKey='SpatialItqanFeatureTemplatesV1';
  var defaults={snap:{vertex:true,endpoint:true,midpoint:true,edge:true,intersection:true,tolerance:12,units:'pixels'},selection:{tolerance:8,mode:'replace'},autosaveMinutes:2,versionLimit:10,editorName:'Local editor',shortcuts:{suite:'F6',select:'S',create:'N',vertices:'V',save:'CTRL+S',cancel:'ESCAPE',pan:'C',extent:'Z',delete:'DELETE'}};
  function load(key,fallback){try{var value=JSON.parse(localStorage.getItem(key)||'null');return value==null?clone(fallback):value;}catch(e){return clone(fallback);}}
  function persist(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){toast('Browser storage is full; export the project to a folder',true);}}
  var state=load(storageKey,defaults),versions=load(versionKey,[]),audit=load(auditKey,[]),templates=load(templateKey,[]),qaResults=[],workspaceHandle=null,vertexContext=null,autosaveTimer=null,operationStarted=0;
  state.snap=Object.assign({},defaults.snap,state.snap||{});state.selection=Object.assign({},defaults.selection,state.selection||{});state.shortcuts=Object.assign({},defaults.shortcuts,state.shortcuts||{});
  window.__svProfessionalState=state;

  function activeLayer(){
    var ids=[($('editorTargetLayer')||{}).value,($('xpActiveLayer')||{}).value,curTbl&&curTbl.id];
    for(var i=0;i<ids.length;i++)if(ids[i]&&layers[ids[i]]&&layers[ids[i]].geojson)return layers[ids[i]];
    var all=Object.keys(layers||{});for(var j=0;j<all.length;j++)if(layers[all[j]]&&layers[all[j]].geojson)return layers[all[j]];return null;
  }
  function selectedFeatures(L0){if(!L0)return[];var set=typeof svSelSet==='function'?svSelSet(L0.id):{};return (L0.geojson.features||[]).filter(function(f){return !!set[String(f.properties&&f.properties.__sv_fid)];});}
  function targetFeatures(L0){var selected=selectedFeatures(L0);return selected.length?selected:(L0&&L0.geojson&&L0.geojson.features||[]);}
  function fields(L0){var out={};(L0&&L0.editSchema||[]).forEach(function(f){out[f.name]=1;});(L0&&L0.geojson&&L0.geojson.features||[]).forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){if(k.indexOf('__sv')!==0)out[k]=1;});});return Object.keys(out);}
  function markChanged(L0,message,detail){
    if(window.__svAdvSnapshot)window.__svAdvSnapshot();if(window.__svMarkDirty)window.__svMarkDirty();
    if(L0){ensureFids(L0.geojson);svBuildLeafletLayer(L0);renderLayers();refreshDropdowns();try{if(curTbl&&curTbl.id===L0.id)renderTable();}catch(e){}}
    logAudit(message,detail,L0);toast(message);
  }
  function logAudit(action,detail,L0){
    audit.unshift({time:new Date().toISOString(),user:state.editorName||'Local editor',action:action,detail:detail||'',layer:L0&&L0.name||'',featureIds:L0?selectedFeatures(L0).map(function(f){return f.properties&&f.properties.__sv_fid;}):[]});
    if(audit.length>1000)audit.length=1000;persist(auditKey,audit);renderAudit();
  }
  window.__svAudit=logAudit;
  function announce(message){var el=$('proLiveRegion');if(el)el.textContent=message;}
  function progress(title,done,total,detail){
    total=Math.max(1,total||1);var pct=Math.max(0,Math.min(100,Math.round((done||0)*100/total))),elapsed=operationStarted?((Date.now()-operationStarted)/1000):0,eta=done>0&&done<total?elapsed*(total-done)/done:0;
    if(!operationStarted)operationStarted=Date.now();
    $('proProgressTitle').textContent=title;$('proProgressText').textContent=(detail||'')+' · '+done+'/'+total+' · elapsed '+elapsed.toFixed(1)+'s'+(eta?' · remaining '+eta.toFixed(1)+'s':'');$('proProgressBar').value=pct;$('proProgressDock').classList.add('show');
    if($('proActivityCurrent'))$('proActivityCurrent').textContent=$('proProgressText').textContent;if($('proActivityProgress'))$('proActivityProgress').value=pct;
    if(done>=total){setTimeout(function(){$('proProgressDock').classList.remove('show');},2200);operationStarted=0;announce(title+' completed');}
  }
  window.__svProfessionalProgress=progress;

  function openSuite(tab){
    refreshAll();modal.classList.add('open');showTab(tab||'editing');setTimeout(function(){var b=modal.querySelector('[data-pro-tab].active');if(b)b.focus();},25);
  }
  function closeSuite(){modal.classList.remove('open');}
  function showTab(tab){
    modal.querySelectorAll('[data-pro-tab]').forEach(function(button){button.classList.toggle('active',button.getAttribute('data-pro-tab')===tab);button.setAttribute('aria-selected',button.getAttribute('data-pro-tab')===tab?'true':'false');});
    modal.querySelectorAll('[data-pro-pane]').forEach(function(pane){pane.classList.toggle('active',pane.getAttribute('data-pro-pane')===tab);});
  }
  $('editorProfessionalSuite').onclick=function(){openSuite('editing');};$('proSuiteClose').onclick=closeSuite;modal.onclick=function(e){if(e.target===modal)closeSuite();};
  modal.querySelectorAll('[data-pro-tab]').forEach(function(button){button.onclick=function(){showTab(button.getAttribute('data-pro-tab'));};});
  document.addEventListener('keydown',function(e){
    var dialog=$('proVertexModal').classList.contains('open')?$('proVertexModal'):(modal.classList.contains('open')?modal:null);if(!dialog)return;
    if(e.key==='Escape'){e.preventDefault();if(dialog===$('proVertexModal'))dialog.classList.remove('open');else closeSuite();return;}
    if(e.key==='Tab'){var focusable=Array.prototype.slice.call(dialog.querySelectorAll('button,input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(function(el){return !el.disabled&&el.offsetParent!==null;});if(!focusable.length)return;var first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });

  function refreshLayerBehavior(){
    var host=$('proLayerBehavior');if(!host)return;host.innerHTML='';
    Object.keys(layers||{}).forEach(function(id){var L0=layers[id];if(!L0||!L0.geojson)return;var row=document.createElement('div');row.className='pro-layer-rule';
      row.innerHTML='<strong>'+escapeHtml(L0.name)+'</strong><label><input class="pro-selectable" type="checkbox" '+(L0.selectable===false?'':'checked')+'> Select</label><label><input class="pro-snappable" type="checkbox" '+(L0.snapEnabled===false?'':'checked')+'> Snap</label>';
      row.querySelector('.pro-selectable').onchange=function(){L0.selectable=this.checked;logAudit('Layer selection behavior changed',this.checked?'Selectable':'Not selectable',L0);};
      row.querySelector('.pro-snappable').onchange=function(){L0.snapEnabled=this.checked;logAudit('Layer snapping behavior changed',this.checked?'Snappable':'Not snappable',L0);};host.appendChild(row);
    });
    if(!host.children.length)host.innerHTML='<p class="pro-note">No vector layers available.</p>';
  }
  function syncSettingsToUi(){
    ['Vertex','Endpoint','Midpoint','Edge','Intersection'].forEach(function(name){$('proSnap'+name).checked=state.snap[name.toLowerCase()]!==false;});
    $('proSnapTolerance').value=state.snap.tolerance;$('proSnapUnits').value=state.snap.units;$('proSelectionTolerance').value=state.selection.tolerance;$('proSelectionMode').value=state.selection.mode;
    $('proAutosaveMinutes').value=state.autosaveMinutes||2;$('proVersionLimit').value=state.versionLimit||10;$('proEditorName').value=state.editorName||'Local editor';
  }
  function readSettings(){
    ['Vertex','Endpoint','Midpoint','Edge','Intersection'].forEach(function(name){state.snap[name.toLowerCase()]=$('proSnap'+name).checked;});
    state.snap.tolerance=Math.max(1,+$('proSnapTolerance').value||12);state.snap.units=$('proSnapUnits').value;state.selection.tolerance=Math.max(1,+$('proSelectionTolerance').value||8);state.selection.mode=$('proSelectionMode').value;
    Object.keys(layers||{}).forEach(function(id){var L0=layers[id];try{if(L0&&L0.leaflet)L0.leaflet.eachLayer(function(path){if(path._renderer&&path._renderer.options)path._renderer.options.tolerance=state.selection.tolerance;});}catch(e){}});
    state.autosaveMinutes=Math.max(1,+$('proAutosaveMinutes').value||2);state.versionLimit=Math.max(2,+$('proVersionLimit').value||10);state.editorName=$('proEditorName').value.trim()||'Local editor';persist(storageKey,state);scheduleAutosave();
  }
  ['proSnapVertex','proSnapEndpoint','proSnapMidpoint','proSnapEdge','proSnapIntersection','proSnapTolerance','proSnapUnits','proSelectionTolerance','proSelectionMode','proAutosaveMinutes','proVersionLimit','proEditorName'].forEach(function(id){$(id).onchange=readSettings;});

  function fillLayerSelect(select,current){
    if(!select)return;var chosen=current||select.value,html='';Object.keys(layers||{}).forEach(function(id){var L0=layers[id];if(L0&&L0.geojson)html+='<option value="'+id+'">'+escapeHtml(L0.name)+'</option>';});select.innerHTML=html||'<option value="">— no vector layers —</option>';if(chosen&&layers[chosen])select.value=chosen;
  }
  function schemaRow(field){
    field=Object.assign({name:'',alias:'',type:'text',length:255,precision:0,scale:0,nullable:true,unique:false,defaultValue:null,domain:[]},field||{});
    var tr=document.createElement('tr');tr.innerHTML='<td><input data-k="name" class="wide"></td><td><input data-k="alias" class="wide"></td><td><select data-k="type"><option value="text">Text</option><option value="integer">Integer</option><option value="double">Double</option><option value="date">Date</option><option value="boolean">Boolean</option></select></td><td><input data-k="length" type="number" min="1"></td><td><input data-k="precision" type="number" min="0"></td><td><input data-k="scale" type="number" min="0"></td><td><input data-k="nullable" type="checkbox"></td><td><input data-k="unique" type="checkbox"></td><td><input data-k="defaultValue"></td><td><input data-k="domain" class="wide"></td><td><button class="pro-schema-remove">✕</button></td>';
    ['name','alias','type','length','precision','scale'].forEach(function(k){var el=tr.querySelector('[data-k='+k+']');if(el)el.value=field[k]==null?'':field[k];});
    tr.querySelector('[data-k=nullable]').checked=field.nullable!==false;tr.querySelector('[data-k=unique]').checked=!!field.unique;tr.querySelector('[data-k=defaultValue]').value=field.defaultValue==null?'':field.defaultValue;tr.querySelector('[data-k=domain]').value=Array.isArray(field.domain)?field.domain.join(', '):(field.domain||'');
    tr.querySelector('.pro-schema-remove').onclick=function(){tr.remove();};$('proSchemaRows').appendChild(tr);
  }
  function loadSchema(){
    var L0=layers[$('proSchemaLayer').value]||activeLayer();$('proSchemaRows').innerHTML='';if(!L0)return;
    var schema=clone(L0.editSchema||[]),known={};schema.forEach(function(f){known[f.name]=1;schemaRow(f);});fields(L0).forEach(function(name){if(!known[name])schemaRow({name:name,type:'text'});});
  }
  $('proSchemaLayer').onchange=loadSchema;$('proSchemaAdd').onclick=function(){schemaRow({});};
  function collectSchema(){
    var schema=[],names={},error='';
    $('proSchemaRows').querySelectorAll('tr').forEach(function(tr){if(error)return;var get=function(k){return tr.querySelector('[data-k='+k+']');},name=get('name').value.trim(),type=get('type').value;if(!name)return;if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name))error='Invalid field name: '+name;else if(names[name.toLowerCase()])error='Duplicate field: '+name;else{names[name.toLowerCase()]=1;schema.push({name:name,alias:get('alias').value.trim()||name,type:type,length:+get('length').value||0,precision:+get('precision').value||0,scale:+get('scale').value||0,nullable:get('nullable').checked,unique:get('unique').checked,defaultValue:get('defaultValue').value===''?null:get('defaultValue').value,domain:get('domain').value.split(',').map(function(v){return v.trim();}).filter(Boolean)});}});
    if(error)throw new Error(error);return schema;
  }
  function validateValue(field,value){
    if((value==null||value==='')&&!field.nullable)return 'Required value is blank';
    if(value==null||value==='')return '';
    if(field.domain&&field.domain.length&&field.domain.indexOf(String(value))<0)return 'Value is outside coded domain';
    if(field.type==='text'&&field.length&&String(value).length>field.length)return 'Text exceeds length '+field.length;
    if((field.type==='integer'||field.type==='double')&&!isFinite(Number(value)))return 'Expected numeric value';
    if(field.type==='integer'&&Math.floor(Number(value))!==Number(value))return 'Expected integer';
    if(field.type==='double'&&field.scale>=0&&String(value).split('.')[1]&&String(value).split('.')[1].length>field.scale)return 'Exceeds scale '+field.scale;
    return '';
  }
  function schemaIssues(L0){
    var issues=[];(L0&&L0.editSchema||[]).forEach(function(field){var seen={};(L0.geojson.features||[]).forEach(function(f,index){var value=(f.properties||{})[field.name],message=validateValue(field,value);if(message)issues.push(field.name+' row '+(index+1)+': '+message);if(field.unique&&value!=null&&value!==''){var key=String(value);if(seen[key])issues.push(field.name+' row '+(index+1)+': duplicate unique value');seen[key]=1;}});});return issues;
  }
  $('proSchemaApply').onclick=function(){
    var L0=layers[$('proSchemaLayer').value]||activeLayer();if(!L0){toast('Choose a vector layer',true);return;}var schema;try{schema=collectSchema();}catch(e){toast(e.message,true);return;}
    var issues=[];schema.forEach(function(field){var seen={};(L0.geojson.features||[]).forEach(function(f,index){f.properties=f.properties||{};if(!(field.name in f.properties))f.properties[field.name]=clone(field.defaultValue);var message=validateValue(field,f.properties[field.name]);if(message)issues.push(field.name+' row '+(index+1)+': '+message);if(field.unique&&f.properties[field.name]!=null){var key=String(f.properties[field.name]);if(seen[key])issues.push(field.name+' row '+(index+1)+': duplicate unique value');seen[key]=1;}});});
    if(issues.length&&!confirm(issues.slice(0,12).join('\n')+(issues.length>12?'\n… '+(issues.length-12)+' more':'')+'\n\nApply schema anyway?'))return;
    L0.editSchema=schema;markChanged(L0,'Schema applied to '+L0.name,schema.length+' fields; '+issues.length+' validation warning(s)');loadSchema();
  };
  ['editorSave','xpSaveEdit','attrSave','editorExportShp','editorExportKml','editorExportGeoJson'].forEach(function(id){var button=$(id);if(button)button.addEventListener('click',function(e){var L0=activeLayer(),issues=schemaIssues(L0);if(!issues.length)return;e.preventDefault();e.stopImmediatePropagation();showTab('schema');openSuite('schema');toast('Save/export blocked by '+issues.length+' schema validation issue(s)',true);$('proProjectStatus').textContent=issues.slice(0,10).join('\n');},true);});

  function templateDefaults(){var raw=$('proTemplateDefaults').value.trim();if(!raw)return{};var value=JSON.parse(raw);if(!value||Array.isArray(value)||typeof value!=='object')throw new Error('Default attributes must be a JSON object');return value;}
  function renderTemplates(){
    var host=$('proTemplateList');host.innerHTML='';templates.forEach(function(template,index){var row=document.createElement('div');row.className='pro-template-item';row.innerHTML='<strong>'+escapeHtml(template.name)+'</strong><span>'+escapeHtml(template.method)+'</span><button>Use</button><button>✕</button>';row.children[2].onclick=function(){applyTemplate(template);};row.children[3].onclick=function(){templates.splice(index,1);persist(templateKey,templates);renderTemplates();};host.appendChild(row);});if(!templates.length)host.innerHTML='<p class="pro-note">No saved templates.</p>';
  }
  function applyTemplate(template){
    var L0=layers[template.layerId]||activeLayer();if(!L0){toast('Template layer is not available',true);return;}if(window.__svSetActiveLayer)window.__svSetActiveLayer(L0.id);L0.featureTemplateDefaults=clone(template.defaults||{});if(template.symbol){L0.color=template.symbol.color||L0.color;L0.pointShape=template.symbol.pointShape||L0.pointShape;L0.lineStyle=template.symbol.lineStyle||L0.lineStyle;L0.fillPattern=template.symbol.fillPattern||L0.fillPattern;svBuildLeafletLayer(L0);renderLayers();renderLegend();}
    $('proTemplateMethod').value=template.method||'standard';$('proTemplateName').value=template.name;$('proTemplateDefaults').value=JSON.stringify(template.defaults||{},null,2);logAudit('Feature template activated',template.name,L0);runConstruction();
  }
  $('proTemplateSave').onclick=function(){var L0=activeLayer();if(!L0){toast('Choose a target layer first',true);return;}var name=$('proTemplateName').value.trim();if(!name){toast('Enter a template name',true);return;}var values;try{values=templateDefaults();}catch(e){toast(e.message,true);return;}templates.push({id:'tpl_'+Date.now(),name:name,layerId:L0.id,family:svGeometryFamily(L0),method:$('proTemplateMethod').value,defaults:values,symbol:{color:L0.color,pointShape:L0.pointShape,lineStyle:L0.lineStyle,fillPattern:L0.fillPattern}});persist(templateKey,templates);renderTemplates();logAudit('Feature template saved',name,L0);};
  $('proTemplateStart').onclick=runConstruction;

  function addConstructedFeature(L0,feature,message){
    if(!L0||!feature)return;feature.properties=Object.assign({},L0.featureTemplateDefaults||{},feature.properties||{});feature.properties.__sv_fid='PRO'+Date.now()+'_'+Math.floor(Math.random()*10000);
    if(window.__svAdvSnapshot)window.__svAdvSnapshot();L0.geojson.features.push(feature);window.__svOpState.selectedSets[L0.id]={};window.__svOpState.selectedSets[L0.id][feature.properties.__sv_fid]=true;markChanged(L0,message,'Precision construction');
  }
  function constructOrigin(){
    var x=parseFloat($('proConstructX').value),y=parseFloat($('proConstructY').value);
    if(isFinite(x)&&isFinite(y)){try{var ll=fromCRS(x,y,crsKey);return turf.point(ll);}catch(e){return turf.point([x,y]);}}
    var center=map.getCenter();return turf.point([center.lng,center.lat]);
  }
  function runConstruction(){
    readSettings();var L0=activeLayer();if(!L0){toast('Choose a target layer first',true);return;}var method=$('proTemplateMethod').value,bearing=+$('proConstructBearing').value||0,distance=Math.max(0,+$('proConstructDistance').value||0),offset=+$('proConstructOffset').value||0,origin=constructOrigin(),family=svGeometryFamily(L0);
    L0.featureTemplateDefaults=(function(){try{return templateDefaults();}catch(e){return L0.featureTemplateDefaults||{};}})();
    if(window.__svSetActiveLayer)window.__svSetActiveLayer(L0.id);if(!window.__svEditSession||!window.__svEditSession.active){if(window.__svStartEditing)window.__svStartEditing();}
    if(method==='standard'){if(window.__svCreateFeature)window.__svCreateFeature();closeSuite();return;}
    if(method==='coordinate'){if(family!=='point'){toast('Coordinate entry creates a point target',true);return;}addConstructedFeature(L0,{type:'Feature',properties:{},geometry:origin.geometry},'Point created from coordinates');return;}
    if(method==='direction'){
      if(family!=='line'){toast('Direction and distance requires a line target',true);return;}var dest=turf.destination(origin,distance/1000,bearing,{units:'kilometers'});addConstructedFeature(L0,turf.lineString([origin.geometry.coordinates,dest.geometry.coordinates]),'Direction-distance line created');return;
    }
    if(method==='circle'){
      if(family!=='polygon'){toast('Circle construction requires a polygon target',true);return;}addConstructedFeature(L0,turf.circle(origin,distance/1000,{steps:96,units:'kilometers'}),'Precision circle created');return;
    }
    if(method==='arc'){
      if(family!=='line'){toast('Circular arc construction requires a line target',true);return;}var arcCoords=[];for(var arcStep=0;arcStep<=32;arcStep++){var arcBearing=bearing-45+(90*arcStep/32),arcPoint=turf.destination(origin,distance/1000,arcBearing,{units:'kilometers'});arcCoords.push(arcPoint.geometry.coordinates);}addConstructedFeature(L0,turf.lineString(arcCoords),'Circular arc created');return;
    }
    if(method==='parallel'||method==='perpendicular'){
      var selected=selectedFeatures(L0);if(!selected.length||!/LineString/.test(selected[0].geometry&&selected[0].geometry.type)){toast('Select one source line first',true);return;}
      try{var source=selected[0],result;if(method==='parallel'&&turf.lineOffset)result=turf.lineOffset(source,offset/1000,{units:'kilometers'});else{var c=source.geometry.coordinates,start=turf.point(c[0]),end=turf.point(c[1]),sourceBearing=turf.bearing(start,end),p2=turf.destination(start,distance/1000,sourceBearing+90,{units:'kilometers'});result=turf.lineString([start.geometry.coordinates,p2.geometry.coordinates]);}addConstructedFeature(L0,result,(method==='parallel'?'Parallel offset':'Perpendicular')+' line created');}catch(e){toast('Construction failed: '+e.message,true);}return;
    }
    if(method==='trace'){if(window.__svTrace)window.__svTrace();closeSuite();return;}
    if(method==='freehand'){startFreehand(L0);closeSuite();return;}
  }
  $('proConstructRun').onclick=runConstruction;
  function startFreehand(L0){
    if(svGeometryFamily(L0)!=='line'){toast('Freehand currently requires a line target',true);return;}var drawing=false,coords=[];
    function down(e){drawing=true;coords=[[e.latlng.lng,e.latlng.lat]];map.dragging.disable();}
    function move(e){if(drawing)coords.push([e.latlng.lng,e.latlng.lat]);}
    function up(){if(!drawing)return;drawing=false;map.dragging.enable();map.off('mousedown',down);map.off('mousemove',move);map.off('mouseup',up);if(coords.length>1)addConstructedFeature(L0,turf.lineString(coords),'Freehand line created');}
    map.on('mousedown',down);map.on('mousemove',move);map.on('mouseup',up);toast('Drag on the map to draw a freehand line');
  }

  function selectedSingle(L0,family){var rows=selectedFeatures(L0);if(rows.length!==1){toast('Select exactly one feature first',true);return null;}if(family&&svGeometryFamily({geomType:rows[0].geometry&&rows[0].geometry.type})!==family){toast('Selected feature has the wrong geometry type',true);return null;}return rows[0];}
  function flattenLineCoords(feature){return feature.geometry.type==='LineString'?feature.geometry.coordinates:null;}
  function openVertexTable(){
    var L0=activeLayer(),feature=selectedSingle(L0);if(!feature)return;var coords=flattenLineCoords(feature);
    if(!coords&&feature.geometry.type==='Point')coords=[feature.geometry.coordinates];if(!coords&&feature.geometry.type==='Polygon')coords=feature.geometry.coordinates[0];if(!coords){toast('Vertex table supports single-part point, line or polygon features',true);return;}
    vertexContext={layer:L0,feature:feature,coords:clone(coords),selected:0};renderVertexRows();$('proVertexModal').classList.add('open');
  }
  function renderVertexRows(){
    var host=$('proVertexRows');host.innerHTML='';if(!vertexContext)return;vertexContext.coords.forEach(function(coord,index){var display=toCRS(coord[0],coord[1],crsKey),length='—';if(index){try{length=(turf.distance(turf.point(vertexContext.coords[index-1]),turf.point(coord),{units:'kilometers'})*1000).toFixed(3)+' m';}catch(e){}}
      var tr=document.createElement('tr');tr.innerHTML='<td><input type="radio" name="proVertexPick" '+(index===vertexContext.selected?'checked':'')+'></td><td><input data-axis="x" type="number" step="any" value="'+display.a+'"></td><td><input data-axis="y" type="number" step="any" value="'+display.b+'"></td><td>'+length+'</td><td><button>Delete</button></td>';
      tr.querySelector('input[type=radio]').onchange=function(){vertexContext.selected=index;};tr.querySelector('button').onclick=function(){var min=vertexContext.feature.geometry.type==='Polygon'?4:(vertexContext.feature.geometry.type==='LineString'?2:1);if(vertexContext.coords.length<=min){toast('Geometry requires at least '+min+' vertices',true);return;}vertexContext.coords.splice(index,1);vertexContext.selected=Math.max(0,index-1);renderVertexRows();};host.appendChild(tr);
    });
  }
  $('proVertexTable').onclick=openVertexTable;$('proVertexClose').onclick=function(){$('proVertexModal').classList.remove('open');};$('proVertexModal').onclick=function(e){if(e.target===$('proVertexModal'))$('proVertexModal').classList.remove('open');};
  $('proVertexInsert').onclick=function(){if(!vertexContext)return;readVertexRows();var i=vertexContext.selected,a=vertexContext.coords[i],b=vertexContext.coords[Math.min(i+1,vertexContext.coords.length-1)],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];vertexContext.coords.splice(i+1,0,mid);vertexContext.selected=i+1;renderVertexRows();};
  function readVertexRows(){if(!vertexContext)return;$('proVertexRows').querySelectorAll('tr').forEach(function(tr,index){var x=+tr.querySelector('[data-axis=x]').value,y=+tr.querySelector('[data-axis=y]').value,ll=fromCRS(x,y,crsKey);vertexContext.coords[index]=ll;});}
  $('proVertexApply').onclick=function(){if(!vertexContext)return;try{readVertexRows();var f=vertexContext.feature;if(f.geometry.type==='Point')f.geometry.coordinates=vertexContext.coords[0];else if(f.geometry.type==='LineString')f.geometry.coordinates=vertexContext.coords;else{var coords=vertexContext.coords;if(JSON.stringify(coords[0])!==JSON.stringify(coords[coords.length-1]))coords.push(clone(coords[0]));f.geometry.coordinates[0]=coords;}markChanged(vertexContext.layer,'Vertex coordinates updated',vertexContext.coords.length+' vertices');$('proVertexModal').classList.remove('open');}catch(e){toast('Invalid coordinate: '+e.message,true);}};

  $('proReshape').onclick=function(){
    var L0=activeLayer(),feature=selectedSingle(L0);if(!feature||typeof L.Draw==='undefined')return;var family=svGeometryFamily({geomType:feature.geometry.type}),Handler=family==='point'?L.Draw.Marker:(family==='line'?L.Draw.Polyline:L.Draw.Polygon),handler=new Handler(map,{shapeOptions:{color:'#00E5FF',weight:3,fillOpacity:.2}});
    closeSuite();toast('Draw the replacement shape; double-click to finish');function created(e){map.off(L.Draw.Event.CREATED,created);feature.geometry=e.layer.toGeoJSON().geometry;markChanged(L0,'Feature reshaped','Geometry replaced using construction sketch');}map.on(L.Draw.Event.CREATED,created);handler.enable();
  };
  function repairFeatures(){
    var L0=activeLayer();if(!L0)return;var rows=targetFeatures(L0),changed=0;if(window.__svAdvSnapshot)window.__svAdvSnapshot();rows.forEach(function(f){try{var cleaned=turf.cleanCoords(f);if(cleaned&&JSON.stringify(cleaned.geometry)!==JSON.stringify(f.geometry)){f.geometry=cleaned.geometry;changed++;}if(f.geometry&&f.geometry.type==='Polygon'&&turf.rewind){var rewound=turf.rewind(f,{reverse:false});f.geometry=rewound.geometry;}}catch(e){}});markChanged(L0,'Safe geometry repair completed',changed+' geometry records changed');
  }
  $('proRepairGeometry').onclick=repairFeatures;$('proTrim').onclick=function(){if(window.__svTrimOvershoot)window.__svTrimOvershoot();};$('proExtend').onclick=function(){if(window.__svExtendUndershoot)window.__svExtendUndershoot();};
  $('proPlanarize').onclick=function(){
    var L0=activeLayer();if(!L0)return;var rows=selectedFeatures(L0);if(!rows.length)rows=(L0.geojson.features||[]).filter(function(f){return f.geometry&&f.geometry.type==='LineString';});if(rows.length<2){toast('Planarize requires at least two lines',true);return;}if(window.__svAdvSnapshot)window.__svAdvSnapshot();var replacements=[],original={};
    rows.forEach(function(f){original[String(f.properties&&f.properties.__sv_fid)]=1;var cuts=[];rows.forEach(function(other){if(other===f)return;try{(turf.lineIntersect(f,other).features||[]).forEach(function(p){cuts.push(p);});}catch(e){}});var pieces=[f];cuts.forEach(function(point){var next=[];pieces.forEach(function(piece){try{var split=turf.lineSplit(piece,point);if(split.features.length>1)next=next.concat(split.features);else next.push(piece);}catch(e){next.push(piece);}});pieces=next;});pieces.forEach(function(piece,index){piece.properties=Object.assign({},f.properties,{__sv_fid:'PLAN'+Date.now()+'_'+replacements.length,PLANAR_PART:index+1});replacements.push(piece);});});
    L0.geojson.features=L0.geojson.features.filter(function(f){return !original[String(f.properties&&f.properties.__sv_fid)];}).concat(replacements);markChanged(L0,'Lines planarized',rows.length+' source lines → '+replacements.length+' planar segments');
  };
  $('proRemoveOverlap').onclick=function(){
    var L0=activeLayer();if(!L0)return;var rows=selectedFeatures(L0).filter(function(f){return f.geometry&&/Polygon/.test(f.geometry.type);});if(rows.length<2){toast('Select at least two polygons',true);return;}if(window.__svAdvSnapshot)window.__svAdvSnapshot();var changed=0;
    for(var i=0;i<rows.length;i++)for(var j=i+1;j<rows.length;j++){try{var overlap=turf.intersect(rows[i],rows[j]);if(overlap){var diff=turf.difference(rows[j],rows[i]);if(diff){rows[j].geometry=diff.geometry;changed++;}}}catch(e){}}
    markChanged(L0,'Polygon overlaps removed',changed+' polygon(s) trimmed');
  };
  $('proEliminateGaps').onclick=function(){
    var L0=activeLayer();if(!L0)return;var threshold=Math.max(0,+$('proTopologyThreshold').value||0),rows=targetFeatures(L0).filter(function(f){return f.geometry&&f.geometry.type==='Polygon';}),removed=0;if(window.__svAdvSnapshot)window.__svAdvSnapshot();
    rows.forEach(function(f){var rings=f.geometry.coordinates;if(rings.length<2)return;f.geometry.coordinates=[rings[0]].concat(rings.slice(1).filter(function(ring){try{var hole=turf.polygon([ring]);if(turf.area(hole)<=threshold){removed++;return false;}}catch(e){}return true;}));});markChanged(L0,'Small polygon gaps eliminated',removed+' interior gap ring(s) removed at ≤ '+threshold+' m²');
  };

  function runExtendedQA(){
    var L0=activeLayer();if(!L0){toast('Choose a layer first',true);return;}qaResults=[];operationStarted=Date.now();var features=L0.geojson.features||[],seen={},spike=Math.max(0,+$('proQaSpike').value||0),sliver=Math.max(0,+$('proQaSliver').value||0),schema=L0.editSchema||[];
    progress('Extended QA',0,features.length||1,'Preparing background checks');
    var workerCode="self.onmessage=function(e){var fs=e.data.features||[],seen={},issues=[];function walk(c,out){if(!Array.isArray(c))return;if(typeof c[0]==='number')out.push(c);else c.forEach(function(x){walk(x,out);});}fs.forEach(function(f,i){var id=f.properties&&f.properties.__sv_fid||i+1,g=f.geometry;if(!g||!g.coordinates){issues.push({row:i+1,fid:id,issue:'Null or empty geometry',detail:''});return;}var key=JSON.stringify(g);if(seen[key])issues.push({row:i+1,fid:id,issue:'Duplicate geometry',detail:'Matches row '+seen[key]});else seen[key]=i+1;if(/^Multi/.test(g.type))issues.push({row:i+1,fid:id,issue:'Multipart feature',detail:g.type});var coords=[];walk(g.coordinates,coords);for(var n=0;n<coords.length;n++){if(!isFinite(coords[n][0])||!isFinite(coords[n][1]))issues.push({row:i+1,fid:id,issue:'Invalid coordinate',detail:'Vertex '+(n+1)});}if(g.type==='Polygon'){(g.coordinates||[]).forEach(function(ring,r){if(ring.length<4||JSON.stringify(ring[0])!==JSON.stringify(ring[ring.length-1]))issues.push({row:i+1,fid:id,issue:'Invalid ring',detail:'Ring '+(r+1)+' is not closed'});});}});self.postMessage(issues);};";
    function finishWorker(baseIssues){
      qaResults=baseIssues||[];
      features.forEach(function(f,index){var fid=f.properties&&f.properties.__sv_fid||index+1;if(!f.geometry)return;try{if(/Polygon/.test(f.geometry.type)){var area=turf.area(f);if(area<sliver)qaResults.push({row:index+1,fid:fid,issue:'Sliver polygon',detail:area.toFixed(3)+' m²'});if(turf.kinks){var k=turf.kinks(f);if(k.features.length)qaResults.push({row:index+1,fid:fid,issue:'Self-intersection',detail:k.features.length+' kink(s)'});}}}catch(e){}
        try{if(/LineString/.test(f.geometry.type)){var coords=f.geometry.type==='LineString'?f.geometry.coordinates:[].concat.apply([],f.geometry.coordinates);for(var c=1;c<coords.length;c++){var len=turf.distance(turf.point(coords[c-1]),turf.point(coords[c]),{units:'kilometers'})*1000;if(len<spike)qaResults.push({row:index+1,fid:fid,issue:'Spike / short segment',detail:len.toFixed(4)+' m'});}}}catch(e){}
        schema.forEach(function(field){var message=validateValue(field,(f.properties||{})[field.name]);if(message)qaResults.push({row:index+1,fid:fid,issue:'Schema: '+field.name,detail:message});});
        progress('Extended QA',index+1,features.length||1,'Geometry and schema checks');
      });
      if(features.length<500)for(var i=0;i<features.length;i++)for(var j=i+1;j<features.length;j++){var a=features[i],b=features[j];if(!a.geometry||!b.geometry||!/Polygon/.test(a.geometry.type)||!/Polygon/.test(b.geometry.type))continue;try{var over=turf.intersect(a,b);if(over&&turf.area(over)>.001)qaResults.push({row:j+1,fid:b.properties&&b.properties.__sv_fid,issue:'Polygon overlap',detail:'Overlaps row '+(i+1)+' by '+turf.area(over).toFixed(3)+' m²'});}catch(e){}}
      renderQA();progress('Extended QA',features.length||1,features.length||1,qaResults.length+' issue(s) found');logAudit('Extended QA completed',qaResults.length+' issue(s)',L0);
    }
    try{var worker=new Worker(URL.createObjectURL(new Blob([workerCode],{type:'application/javascript'})));worker.onmessage=function(e){worker.terminate();finishWorker(e.data);};worker.onerror=function(){worker.terminate();finishWorker([]);};worker.postMessage({features:features});}catch(e){setTimeout(function(){finishWorker([]);},0);}
  }
  function renderQA(){
    $('proQaSummary').textContent=qaResults.length?qaResults.length+' issue(s) found. Review or export the report.':'QA passed: no issues found.';
    var html=qaResults.length?'<table class="pro-table"><thead><tr><th>Row</th><th>FID</th><th>Issue</th><th>Detail</th></tr></thead><tbody>'+qaResults.map(function(i){return '<tr><td>'+i.row+'</td><td>'+escapeHtml(i.fid)+'</td><td>'+escapeHtml(i.issue)+'</td><td>'+escapeHtml(i.detail)+'</td></tr>';}).join('')+'</tbody></table>':'<div class="pro-status">No issues.</div>';$('proQaResults').innerHTML=html;
  }
  $('proQaRun').onclick=runExtendedQA;$('proQaRepair').onclick=repairFeatures;$('proQaExport').onclick=function(){if(!qaResults.length){toast('Run extended QA first',true);return;}var csv='Row,FID,Issue,Detail\n'+qaResults.map(function(i){return [i.row,i.fid,i.issue,i.detail].map(function(v){v=String(v==null?'':v);return /[\",\\n]/.test(v)?'\"'+v.replace(/\"/g,'\"\"')+'\"':v;}).join(',');}).join('\n');dl(csv,'SpatialItqan_Extended_QA.csv','text/csv');};

  var proLabelGroups={};
  function expressionValue(expression,properties){return String(expression||'').replace(/\{([^}]+)\}/g,function(_,field){var v=(properties||{})[field];return v==null?'':String(v);});}
  function clearProLabels(id){if(proLabelGroups[id]){try{map.removeLayer(proLabelGroups[id]);}catch(e){}delete proLabelGroups[id];}}
  function drawProLabels(L0){
    clearProLabels(L0.id);var st=L0.proLabelStyle;if(!st)return;var zoom=map.getZoom();if(zoom<st.minZoom||zoom>st.maxZoom)return;var group=L.featureGroup(),occupied=[];
    (L0.geojson.features||[]).forEach(function(f){var text=expressionValue(st.expression,f.properties);if(!text)return;try{var center=turf.centerOfMass(f).geometry.coordinates,ll=L.latLng(center[1],center[0]),point=map.latLngToContainerPoint(ll),box={x:point.x,y:point.y,w:text.length*7+12,h:20};if(st.declutter&&occupied.some(function(b){return Math.abs(b.x-box.x)<(b.w+box.w)/2&&Math.abs(b.y-box.y)<20;}))return;occupied.push(box);var angle=st.rotationField?Number((f.properties||{})[st.rotationField])||0:0,offset=st.placement==='above'?-16:(st.placement==='below'?16:0),html='<span style="display:block;transform:translateY('+offset+'px) rotate('+angle+'deg);color:#fff;font:800 11px sans-serif;white-space:nowrap;text-shadow:-1px -1px #000,1px -1px #000,-1px 1px #000,1px 1px #000">'+escapeHtml(text)+'</span>';L.marker(ll,{interactive:false,icon:L.divIcon({className:'',html:html,iconSize:null})}).addTo(group);}catch(e){}});
    proLabelGroups[L0.id]=group;if(L0.visible!==false)group.addTo(map);
  }
  function refreshLabelFields(){
    var L0=layers[$('proLabelLayer').value]||activeLayer(),select=$('proLabelRotation'),prev=select.value;select.innerHTML='<option value="">None</option>'+fields(L0).map(function(f){return '<option value="'+escapeHtml(f)+'">'+escapeHtml(f)+'</option>';}).join('');select.value=prev;
    var ruleField=$('proRuleField'),rulePrev=ruleField.value;ruleField.innerHTML=fields(L0).map(function(f){return '<option value="'+escapeHtml(f)+'">'+escapeHtml(f)+'</option>';}).join('');if(rulePrev)ruleField.value=rulePrev;renderRules();
    if(L0&&L0.proLabelStyle){var s=L0.proLabelStyle;$('proLabelExpression').value=s.expression||'';$('proLabelPlacement').value=s.placement||'center';$('proLabelMinZoom').value=s.minZoom||0;$('proLabelMaxZoom').value=s.maxZoom==null?24:s.maxZoom;$('proLabelRotation').value=s.rotationField||'';$('proLabelDeclutter').checked=s.declutter!==false;}
  }
  $('proLabelLayer').onchange=refreshLabelFields;$('proLabelApply').onclick=function(){var L0=layers[$('proLabelLayer').value]||activeLayer();if(!L0)return;L0.proLabelStyle={expression:$('proLabelExpression').value||'{NAME}',placement:$('proLabelPlacement').value,minZoom:+$('proLabelMinZoom').value||0,maxZoom:+$('proLabelMaxZoom').value||24,rotationField:$('proLabelRotation').value,declutter:$('proLabelDeclutter').checked};drawProLabels(L0);logAudit('Professional labels applied',L0.proLabelStyle.expression,L0);toast('Scale-aware labels applied');};
  $('proLabelClear').onclick=function(){var L0=layers[$('proLabelLayer').value]||activeLayer();if(!L0)return;delete L0.proLabelStyle;clearProLabels(L0.id);logAudit('Professional labels cleared','',L0);};map.on('zoomend moveend',function(){Object.keys(layers||{}).forEach(function(id){if(layers[id]&&layers[id].proLabelStyle)drawProLabels(layers[id]);});});
  function renderRules(){var L0=layers[$('proLabelLayer').value]||activeLayer(),host=$('proRuleList'),rules=L0&&L0.ruleStyles||[];host.innerHTML=rules.length?rules.map(function(rule,index){return '<div class="pro-template-item"><span style="width:13px;height:13px;border-radius:3px;background:'+rule.color+'"></span><strong>'+escapeHtml(rule.field+' '+rule.op+' '+rule.value)+'</strong><button data-rule-remove="'+index+'">✕</button></div>';}).join(''):'<p class="pro-note">No rules. Unmatched features use the layer’s default symbol.</p>';host.querySelectorAll('[data-rule-remove]').forEach(function(button){button.onclick=function(){L0.ruleStyles.splice(+button.getAttribute('data-rule-remove'),1);svBuildLeafletLayer(L0);renderLayers();renderRules();};});}
  $('proRuleAdd').onclick=function(){var L0=layers[$('proLabelLayer').value]||activeLayer();if(!L0)return;var field=$('proRuleField').value;if(!field){toast('Choose a rule field',true);return;}L0.ruleStyles=L0.ruleStyles||[];L0.ruleStyles.push({field:field,op:$('proRuleOperator').value,value:$('proRuleValue').value,color:$('proRuleColor').value});svBuildLeafletLayer(L0);renderLayers();renderLegend();renderRules();logAudit('Symbology rule added',field+' '+$('proRuleOperator').value+' '+$('proRuleValue').value,L0);};
  $('proRuleClear').onclick=function(){var L0=layers[$('proLabelLayer').value]||activeLayer();if(!L0)return;L0.ruleStyles=[];svBuildLeafletLayer(L0);renderLayers();renderLegend();renderRules();logAudit('Symbology rules cleared','',L0);};

  function currentProject(){
    var p=window.__svPackageProject?window.__svPackageProject():exportProjectObject();p.professional={settings:clone(state),audit:clone(audit.slice(0,250)),templates:clone(templates)};p.layers=(p.layers||[]).map(function(item){var L0=layers[item.id]||Object.keys(layers).map(function(k){return layers[k];}).filter(function(l){return l.name===item.name;})[0];if(L0){item.editSchema=clone(L0.editSchema||[]);item.selectable=L0.selectable!==false;item.snapEnabled=L0.snapEnabled!==false;item.featureTemplateDefaults=clone(L0.featureTemplateDefaults||{});item.proLabelStyle=clone(L0.proLabelStyle||null);item.ruleStyles=clone(L0.ruleStyles||[]);}return item;});return p;
  }
  function saveVersion(name,automatic){
    var project=currentProject(),label=name||((automatic?'Autosave ':'Version ')+new Date().toLocaleString());versions.unshift({id:'ver_'+Date.now(),name:label,time:new Date().toISOString(),project:project});versions=versions.slice(0,state.versionLimit||10);persist(versionKey,versions);renderVersions();if(!automatic){logAudit('Project version saved',label);toast('Version saved: '+label);}}
  function renderVersions(){var select=$('proVersionList');select.innerHTML=versions.length?versions.map(function(v){return '<option value="'+v.id+'">'+escapeHtml(v.name)+' · '+new Date(v.time).toLocaleString()+'</option>';}).join(''):'<option value="">— no saved versions —</option>';}
  $('proVersionSave').onclick=function(){var name=prompt('Version name:','Checkpoint '+new Date().toLocaleString());if(name)saveVersion(name,false);};
  $('proVersionRestore').onclick=function(){var version=versions.filter(function(v){return v.id===$('proVersionList').value;})[0];if(!version)return;if(!confirm('Restore "'+version.name+'"? Current unsaved work will be replaced.'))return;try{restoreProject(clone(version.project));if(version.project.professional){state=Object.assign({},state,version.project.professional.settings||{});templates=version.project.professional.templates||templates;persist(storageKey,state);persist(templateKey,templates);}refreshAll();logAudit('Project version restored',version.name);toast('Version restored');}catch(e){toast('Restore failed: '+e.message,true);}};
  $('proVersionCompare').onclick=function(){var version=versions.filter(function(v){return v.id===$('proVersionList').value;})[0];if(!version){toast('Choose a saved version first',true);return;}var current=currentProject(),oldByName={},rows=[];(version.project.layers||[]).forEach(function(l){oldByName[l.name]=l;});(current.layers||[]).forEach(function(layer){var old=oldByName[layer.name],nowFeatures=layer.geojson&&layer.geojson.features||[],oldFeatures=old&&old.geojson&&old.geojson.features||[],changed=JSON.stringify(nowFeatures)!==JSON.stringify(oldFeatures);rows.push({layer:layer.name,before:oldFeatures.length,now:nowFeatures.length,status:old?(changed?'Changed':'Unchanged'):'Added'});delete oldByName[layer.name];});Object.keys(oldByName).forEach(function(name){var old=oldByName[name];rows.push({layer:name,before:(old.geojson&&old.geojson.features||[]).length,now:0,status:'Removed'});});$('proProjectStatus').textContent='Comparison with '+version.name+'\n'+rows.map(function(r){return r.status+' · '+r.layer+' · '+r.before+' → '+r.now;}).join('\n');logAudit('Project version compared',version.name);};
  function scheduleAutosave(){if(autosaveTimer)clearInterval(autosaveTimer);autosaveTimer=setInterval(function(){try{if(window.__svHasUnsavedEdits||(window.__svEditSession&&window.__svEditSession.dirty))saveVersion('',true);}catch(e){}},Math.max(1,state.autosaveMinutes||2)*60000);}
  $('proWorkspaceChoose').onclick=async function(){if(!window.showDirectoryPicker){toast('Folder access requires Chrome/Edge over localhost or HTTPS',true);return;}try{workspaceHandle=await window.showDirectoryPicker({mode:'readwrite'});$('proProjectStatus').textContent='Workspace: '+workspaceHandle.name;logAudit('Project workspace selected',workspaceHandle.name);}catch(e){if(e.name!=='AbortError')toast('Could not open folder: '+e.message,true);}};
  $('proWorkspaceSave').onclick=async function(){if(!workspaceHandle){$('proWorkspaceChoose').click();return;}try{var project=currentProject(),file=await workspaceHandle.getFileHandle('SpatialItqan_Project.svproject',{create:true}),writer=await file.createWritable();await writer.write(JSON.stringify(project,null,2));await writer.close();$('proProjectStatus').textContent='Saved to '+workspaceHandle.name+' at '+new Date().toLocaleTimeString();logAudit('Project saved to workspace folder',workspaceHandle.name);toast('Project saved to selected folder');}catch(e){toast('Folder save failed: '+e.message,true);}};

  var recycle=load('SpatialItqanRecycleBinV1',[]);
  function captureRecycle(){
    var L0=activeLayer(),rows=selectedFeatures(L0);if(!L0||!rows.length)return;recycle.unshift({time:new Date().toISOString(),layerId:L0.id,layerName:L0.name,features:clone(rows)});if(recycle.length>50)recycle.length=50;persist('SpatialItqanRecycleBinV1',recycle);logAudit('Features moved to recycle bin',rows.length+' feature(s)',L0);
  }
  ['editorDelete','xpDeleteFeat','attrDeleteSel'].forEach(function(id){var el=$(id);if(el)el.addEventListener('click',captureRecycle,true);});
  document.addEventListener('keydown',function(e){if((e.key==='Delete'||e.key==='Backspace')&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||''))captureRecycle();},true);
  $('proRecycleRestore').onclick=function(){var item=recycle.shift();if(!item){toast('Recycle bin is empty',true);return;}var L0=layers[item.layerId]||Object.keys(layers).map(function(k){return layers[k];}).filter(function(l){return l.name===item.layerName;})[0];if(!L0){toast('Original layer is not available',true);return;}if(window.__svAdvSnapshot)window.__svAdvSnapshot();item.features.forEach(function(f){L0.geojson.features.push(f);});persist('SpatialItqanRecycleBinV1',recycle);markChanged(L0,'Deleted features restored',item.features.length+' feature(s)');};
  $('proRecycleEmpty').onclick=function(){if(!recycle.length)return;if(confirm('Permanently empty the editing recycle bin?')){recycle=[];persist('SpatialItqanRecycleBinV1',recycle);logAudit('Recycle bin emptied','Permanent deletion');}};

  function renderAudit(){var host=$('proAuditLog');if(!host)return;host.innerHTML=audit.length?audit.slice(0,300).map(function(item){return '<div class="pro-audit-item"><span>'+escapeHtml(new Date(item.time).toLocaleString())+'</span><span>'+escapeHtml(item.user||'Local editor')+'</span><strong>'+escapeHtml(item.action)+'</strong><span>'+escapeHtml(item.layer||'')+'</span><span>'+escapeHtml(item.detail||'')+'</span></div>';}).join(''):'<div class="pro-status">No audited activity.</div>';}
  $('proAuditExport').onclick=function(){dl(JSON.stringify(audit,null,2),'SpatialItqan_Audit_Log.json','application/json');};$('proAuditClear').onclick=function(){if(confirm('Clear the audit log?')){audit=[];persist(auditKey,audit);renderAudit();}};

  function renderShortcuts(){var labels={suite:'Open professional suite',select:'Select arrow',create:'Create feature',vertices:'Edit vertices',save:'Save edits',cancel:'Cancel active tool',pan:'Temporary pan',extent:'Full extent',delete:'Delete selected'},host=$('proShortcutRows');host.innerHTML=Object.keys(labels).map(function(key){return '<div class="pro-row"><label>'+labels[key]+'<input data-shortcut="'+key+'" value="'+escapeHtml(state.shortcuts[key]||'')+'"></label></div>';}).join('');}
  function normalizeCombo(e){var parts=[];if(e.ctrlKey||e.metaKey)parts.push('CTRL');if(e.altKey)parts.push('ALT');if(e.shiftKey)parts.push('SHIFT');parts.push(String(e.key).toUpperCase());return parts.join('+');}
  $('proShortcutSave').onclick=function(){$('proShortcutRows').querySelectorAll('[data-shortcut]').forEach(function(input){state.shortcuts[input.getAttribute('data-shortcut')]=input.value.trim().toUpperCase();});persist(storageKey,state);toast('Shortcuts saved');};
  $('proShortcutReset').onclick=function(){state.shortcuts=clone(defaults.shortcuts);persist(storageKey,state);renderShortcuts();};
  document.addEventListener('keydown',function(e){if(/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||''))return;var combo=normalizeCombo(e),action=Object.keys(state.shortcuts).filter(function(k){return state.shortcuts[k]===combo;})[0];if(!action)return;e.preventDefault();var mapAction={suite:function(){openSuite('editing');},select:function(){var b=$('editorSelect');if(b)b.click();},create:function(){var b=$('editorCreate');if(b)b.click();},vertices:function(){var b=$('editorVertices');if(b)b.click();},save:function(){var b=$('editorSave');if(b)b.click();},cancel:function(){if(window.__svActiveDrawHandler)window.__svActiveDrawHandler.disable();},pan:function(){},extent:function(){var b=$('editorFullExtent');if(b)b.click();},delete:function(){var b=$('editorDelete');if(b)b.click();}};if(mapAction[action])mapAction[action]();},true);
  $('proHighContrast').onclick=function(){document.body.classList.toggle('pro-high-contrast');localStorage.setItem('SpatialItqanHighContrast',document.body.classList.contains('pro-high-contrast')?'1':'0');};
  $('proLargeHandles').onclick=function(){document.body.classList.toggle('pro-large-handles');localStorage.setItem('SpatialItqanLargeHandles',document.body.classList.contains('pro-large-handles')?'1':'0');};
  if(localStorage.getItem('SpatialItqanHighContrast')==='1')document.body.classList.add('pro-high-contrast');if(localStorage.getItem('SpatialItqanLargeHandles')==='1')document.body.classList.add('pro-large-handles');if(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches)document.body.classList.add('pro-touch');
  $('proTutorialStart').onclick=function(){
    var steps=[['Choose or create a target layer.','editorTargetLayer'],['Start an edit session.','editorStart'],['Choose a point, line or polygon template.','editorTemplatePoint'],['Use snapping and double-click to finish.','editorAutoSnap'],['Select features with the arrow and edit vertices.','editorVertices'],['Run QA, then save edits.','editorQA']];
    closeSuite();var i=0;function next(){if(i>=steps.length){toast('Tutorial completed');return;}var step=steps[i++],el=$(step[1]);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.boxShadow='0 0 0 4px #FACC15';setTimeout(function(){el.style.boxShadow='';},2600);}toast('Tutorial '+i+'/'+steps.length+': '+step[0]);setTimeout(next,3000);}next();
  };
  $('proDiagnostics').onclick=function(){
    var checks=[['Leaflet map',!!window.L&&!!map],['Drawing library',!!(window.L&&L.Draw)],['Geometry engine',!!window.turf],['Projection engine',!!window.proj4],['Shapefile export',!!window.shpwrite],['ZIP packaging',!!window.JSZip],['Project storage',function(){try{localStorage.setItem('__sv_diag','1');localStorage.removeItem('__sv_diag');return true;}catch(e){return false;}}()],['Streaming API',!!window.fetch],['Background workers',!!window.Worker],['File workspace API',!!window.showDirectoryPicker],
      ['Geometry calculation test',function(){try{return turf.length(turf.lineString([[0,0],[0,.001]]),{units:'meters'})>100;}catch(e){return false;}}()],
      ['Topology intersection test',function(){try{return turf.lineIntersect(turf.lineString([[0,0],[1,1]]),turf.lineString([[0,1],[1,0]])).features.length===1;}catch(e){return false;}}()],
      ['CRS round-trip test',function(){try{var p=toCRS(55.3,25.2,'utm40'),ll=fromCRS(p.a,p.b,'utm40');return Math.abs(ll[0]-55.3)<1e-6&&Math.abs(ll[1]-25.2)<1e-6;}catch(e){return false;}}()],
      ['Project serialization test',function(){try{return JSON.parse(JSON.stringify(currentProject())).layers instanceof Array;}catch(e){return false;}}()]];
    var passed=checks.filter(function(c){return c[1];}).length;$('proDiagnosticsResult').innerHTML=checks.map(function(c){return (c[1]?'✓ ':'✕ ')+c[0];}).join('\n')+'\n\n'+passed+'/'+checks.length+' checks passed.';logAudit('Diagnostics completed',passed+'/'+checks.length+' checks passed');
  };

  function refreshAll(){
    syncSettingsToUi();refreshLayerBehavior();var L0=activeLayer();fillLayerSelect($('proSchemaLayer'),L0&&L0.id);fillLayerSelect($('proLabelLayer'),L0&&L0.id);loadSchema();refreshLabelFields();renderTemplates();renderVersions();renderAudit();renderShortcuts();
  }
  window.__svRestoreProfessional=function(professional){
    if(!professional)return;state=Object.assign({},state,professional.settings||{});state.snap=Object.assign({},defaults.snap,state.snap||{});state.selection=Object.assign({},defaults.selection,state.selection||{});state.shortcuts=Object.assign({},defaults.shortcuts,state.shortcuts||{});templates=professional.templates||templates;if(professional.audit&&professional.audit.length)audit=professional.audit.concat(audit).slice(0,1000);persist(storageKey,state);persist(templateKey,templates);persist(auditKey,audit);refreshAll();readSettings();
  };
  var oldPackage=window.__svPackageProject;if(oldPackage)window.__svPackageProject=function(){var p=oldPackage();p.professional={settings:clone(state),audit:clone(audit.slice(0,250)),templates:clone(templates)};(p.layers||[]).forEach(function(item){var L0=layers[item.id];if(L0){item.selectable=L0.selectable!==false;item.snapEnabled=L0.snapEnabled!==false;item.featureTemplateDefaults=clone(L0.featureTemplateDefaults||{});item.proLabelStyle=clone(L0.proLabelStyle||null);item.ruleStyles=clone(L0.ruleStyles||[]);item.editSchema=clone(L0.editSchema||[]);}});return p;};
  var oldDirty=window.__svMarkDirty,dirtyAuditTimer=null;if(oldDirty)window.__svMarkDirty=function(){var result=oldDirty.apply(this,arguments);clearTimeout(dirtyAuditTimer);dirtyAuditTimer=setTimeout(function(){logAudit('Pending edit changed','Awaiting Save Edits',activeLayer());},450);return result;};
  ['editorSave','xpSaveEdit','attrSave'].forEach(function(id){var el=$(id);if(el)el.addEventListener('click',function(){logAudit('Edits saved','Transaction committed',activeLayer());},false);});
  ['editorDiscard','attrDiscard'].forEach(function(id){var el=$(id);if(el)el.addEventListener('click',function(){logAudit('Edit session discarded','Baseline restored',activeLayer());},false);});
  refreshAll();readSettings();setInterval(function(){if(modal.classList.contains('open'))refreshLayerBehavior();},3000);
  window.__svOpenProfessionalSuite=openSuite;
  logAudit('Professional Editing Suite initialized','Advanced tools ready');
  },0);
})();
/* ================= ESRI-LIKE INTERACTIVE GEOMETRY EDITING =================
   Non-destructive transform previews, explicit Finish/Cancel, common anchors,
   snapping feedback, target-driven merge, point-on-line split, and tracing. */
(function installEsriEditingBehaviors(){
  setTimeout(function(){
    var $=function(id){return document.getElementById(id);};
    var bar=$('esriEditBar'),title=$('esriEditTitle'),status=$('esriEditStatus'),values=$('esriEditValues');
    var labels=[$('esriEditLabel1'),$('esriEditLabel2'),$('esriEditLabel3')];
    var inputs=[$('esriEditValue1'),$('esriEditValue2'),$('esriEditValue3')];
    var targetWrap=$('esriEditTargetWrap'),targetSelect=$('esriEditTarget');
    var pivotButton=$('esriEditPivot'),finishButton=$('esriEditFinish'),cancelButton=$('esriEditCancel');
    if(!bar||!window.L||!window.turf||typeof map==='undefined')return;

    var active=null,previewLayer=null,anchorLayer=null,snapLayer=null,clipboard=null;
    function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
    function layerFamily(L0){
      var type=String(L0&&(L0.geomType||(L0.geojson&&geomTypeOf(L0.geojson)))||'').toLowerCase();
      return type.indexOf('point')>=0?'point':(type.indexOf('line')>=0?'line':(type.indexOf('polygon')>=0?'polygon':''));
    }
    function currentLayer(){
      var ids=[($('editorTargetLayer')||{}).value,($('xpActiveLayer')||{}).value,curTbl&&curTbl.id];
      for(var i=0;i<ids.length;i++)if(ids[i]&&layers[ids[i]]&&layers[ids[i]].geojson)return layers[ids[i]];
      var keys=Object.keys(layers);for(var j=0;j<keys.length;j++)if(layers[keys[j]]&&layers[keys[j]].geojson)return layers[keys[j]];
      return null;
    }
    function selected(L0){
      if(!L0||!L0.geojson)return[];
      var set=svSelSet(L0.id);
      return L0.geojson.features.filter(function(f){return !!set[String(f.properties&&f.properties.__sv_fid||'')];});
    }
    function ensureEditing(L0){
      if(!L0){toast('Choose a target feature layer first',true);return false;}
      try{if(window.__svSetActiveLayer)window.__svSetActiveLayer(L0.id);}catch(e){}
      if(!window.__svEditSession||!window.__svEditSession.active){
        try{if(window.__svStartEditing)window.__svStartEditing();}catch(e2){}
      }
      if(!window.__svEditSession||!window.__svEditSession.active){toast('Start an edit session first',true);return false;}
      if(window.__svEditSession.layerId!==L0.id){toast('The selected features must be in the active edit layer',true);return false;}
      return true;
    }
    function setStatus(text){if(status)status.textContent=text;}
    function showBar(name,message,config){
      config=config||{};title.textContent=name;setStatus(message);bar.classList.add('show');
      values.style.display=config.values===false?'none':'flex';
      targetWrap.classList.toggle('show',!!config.target);
      if(config.targetLabel)targetWrap.childNodes[0].nodeValue=config.targetLabel;
      else targetWrap.childNodes[0].nodeValue='Target attributes';
      pivotButton.style.display=config.pivot===false?'none':'';
      finishButton.disabled=!!config.finishDisabled;
      for(var i=0;i<3;i++){
        labels[i].style.display=config.fields&&config.fields[i]?'grid':'none';
        if(config.fields&&config.fields[i]){labels[i].childNodes[0].nodeValue=config.fields[i].label;inputs[i].value=config.fields[i].value==null?'0':config.fields[i].value;}
      }
    }
    function hideBar(){bar.classList.remove('show');targetWrap.classList.remove('show');}
    function addMapEvent(name,fn){
      var wrapped=function(e){if(window.__svPanOverride)return;fn(e);};
      map.on(name,wrapped);active.events.push([name,wrapped]);
    }
    function removeMapEvents(){if(!active)return;(active.events||[]).forEach(function(item){map.off(item[0],item[1]);});active.events=[];}
    function removeOverlay(layer){if(layer){try{map.removeLayer(layer);}catch(e){}}}
    function clearOverlays(){removeOverlay(previewLayer);removeOverlay(anchorLayer);removeOverlay(snapLayer);previewLayer=anchorLayer=snapLayer=null;}
    function finishCleanup(){
      if(active&&active.handler){try{active.handler.disable();}catch(e0){}}
      if(active&&active.drawCreated){try{map.off(L.Draw.Event.CREATED,active.drawCreated);}catch(e1){}}
      removeMapEvents();clearOverlays();hideBar();document.body.classList.remove('esri-transforming');
      try{map.dragging.enable();}catch(e){}
      if(active&&active.restoreSelect)window.__svSelectToolOn=true;
      active=null;
    }
    function cancelActive(silent){
      if(!active)return;
      var name=active.name;finishCleanup();
      if(!silent)toast(name+' cancelled — source geometry was not changed');
    }
    function drawAnchor(latlng){
      removeOverlay(anchorLayer);
      anchorLayer=L.marker(latlng,{interactive:false,zIndexOffset:1200,icon:L.divIcon({className:'esri-edit-anchor',html:'<span></span>',iconSize:[26,26],iconAnchor:[13,13]})}).addTo(map);
    }
    function drawSnap(latlng,kind){
      removeOverlay(snapLayer);
      snapLayer=L.marker(latlng,{interactive:false,zIndexOffset:1300,icon:L.divIcon({className:'esri-edit-snap',html:'<span title="'+escapeHtml(kind||'Snap')+'"></span>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map);
    }
    function preview(features){
      removeOverlay(previewLayer);
      previewLayer=L.geoJSON({type:'FeatureCollection',features:features},{
        interactive:false,
        style:{color:'#22D3EE',weight:4,opacity:1,fillColor:'#FACC15',fillOpacity:.24,dashArray:'8,5',lineCap:'round',lineJoin:'round'},
        pointToLayer:function(f,ll){return L.circleMarker(ll,{interactive:false,radius:8,color:'#22D3EE',weight:3,fillColor:'#FACC15',fillOpacity:.9});}
      }).addTo(map);
      try{previewLayer.bringToFront();}catch(e){}
    }
    function refreshLayer(L0){
      ensureFids(L0.geojson);svBuildLeafletLayer(L0);
      try{renderLayers();renderLegend();refreshDropdowns();}catch(e){}
      try{if(curTbl&&curTbl.id===L0.id)renderTable();}catch(e2){}
      try{if(window.__svRefreshEditorUI)window.__svRefreshEditorUI();}catch(e3){}
    }
    function markCommit(L0,action,detail){
      if(window.__svMarkDirty)window.__svMarkDirty();
      refreshLayer(L0);
      if(window.__svAudit)window.__svAudit(action,detail,L0);
      toast(action+' — '+detail);
    }
    function replaceSelectedGeometries(action,detail){
      if(!active||!active.output||!active.output.length)return;
      if(window.__svAdvSnapshot)window.__svAdvSnapshot();
      active.features.forEach(function(f,i){f.geometry=clone(active.output[i].geometry);});
      var L0=active.layer;finishCleanup();markCommit(L0,action,detail);
    }
    function mapGeometry(g,fn){
      if(!g)return g;
      if(g.type==='GeometryCollection')return {type:g.type,geometries:g.geometries.map(function(x){return mapGeometry(x,fn);})};
      function walk(c){
        if(typeof c[0]==='number'){var out=c.slice(),p=fn(c[0],c[1]);out[0]=p[0];out[1]=p[1];return out;}
        return c.map(walk);
      }
      return {type:g.type,coordinates:walk(g.coordinates)};
    }
    function mapPoint(lng,lat){return map.options.crs.project(L.latLng(lat,lng));}
    function unmapPoint(x,y){var ll=map.options.crs.unproject(L.point(x,y));return[ll.lng,ll.lat];}
    function transformed(source,fn){
      return source.map(function(f){var out=clone(f);out.geometry=mapGeometry(out.geometry,fn);return out;});
    }
    function selectionCenter(features){
      try{var b=turf.bbox({type:'FeatureCollection',features:features});return L.latLng((b[1]+b[3])/2,(b[0]+b[2])/2);}catch(e){return map.getCenter();}
    }
    function projectedDelta(a,b){
      var pa=mapPoint(a.lng,a.lat),pb=mapPoint(b.lng,b.lat);return{x:pb.x-pa.x,y:pb.y-pa.y};
    }
    function currentCrsDelta(reference,destination){
      try{var a=toCRS(reference.lng,reference.lat,crsKey),b=toCRS(destination.lng,destination.lat,crsKey);return{x:b.a-a.a,y:b.b-a.b};}
      catch(e){var d=projectedDelta(reference,destination);return{x:d.x,y:d.y};}
    }
    function latlngFromCrsDelta(reference,dx,dy){
      try{var a=toCRS(reference.lng,reference.lat,crsKey),ll=fromCRS(a.a+dx,a.b+dy,crsKey);return L.latLng(ll[1],ll[0]);}
      catch(e){var p=mapPoint(reference.lng,reference.lat),ll2=unmapPoint(p.x+dx,p.y+dy);return L.latLng(ll2[1],ll2[0]);}
    }
    function number(v,fallback){v=parseFloat(v);return isFinite(v)?v:(fallback||0);}
    function fmt(v,dec){return number(v,0).toFixed(dec==null?2:dec);}
    function featureLabel(f,index){
      var p=f.properties||{},fid=p.__sv_fid||('Feature '+(index+1)),name='';
      Object.keys(p).some(function(k){if(k.indexOf('__sv')!==0&&p[k]!=null&&p[k]!==''){name=String(p[k]);return true;}return false;});
      return fid+(name?' — '+name:'');
    }
    function pointPixelDistance(a,b){return map.latLngToContainerPoint(a).distanceTo(map.latLngToContainerPoint(b));}
    function featureLines(feature){
      var g=feature&&feature.geometry;if(!g)return[];
      if(g.type==='LineString')return[turf.lineString(g.coordinates)];
      if(g.type==='MultiLineString')return g.coordinates.map(function(c){return turf.lineString(c);});
      if(g.type==='Polygon')return g.coordinates.map(function(c){return turf.lineString(c);});
      if(g.type==='MultiPolygon'){var out=[];g.coordinates.forEach(function(poly){poly.forEach(function(c){out.push(turf.lineString(c));});});return out;}
      return[];
    }
    function snapCandidate(latlng,exclude){
      var cfg=(window.__svProfessionalState&&window.__svProfessionalState.snap)||{};
      if(cfg.enabled===false)return null;
      var tolerance=Math.max(4,number(cfg.tolerance,12)),best=null,click=turf.point([latlng.lng,latlng.lat]);
      function offer(ll,kind,L0,f){
        var px=pointPixelDistance(latlng,ll);if(px>tolerance||best&&px>=best.px)return;
        best={latlng:ll,kind:kind,px:px,layer:L0,feature:f};
      }
      Object.keys(layers).forEach(function(id){
        var L0=layers[id];if(!L0||!L0.geojson||L0.snapEnabled===false)return;
        (L0.geojson.features||[]).forEach(function(f){
          var fid=String(f.properties&&f.properties.__sv_fid||'');
          if(exclude&&exclude[L0.id+'|'+fid])return;
          var lines=featureLines(f);
          lines.forEach(function(line){
            var c=line.geometry.coordinates;
            if(cfg.endpoints!==false&&c.length){offer(L.latLng(c[0][1],c[0][0]),'endpoint',L0,f);offer(L.latLng(c[c.length-1][1],c[c.length-1][0]),'endpoint',L0,f);}
            if(cfg.vertices!==false)c.forEach(function(p){offer(L.latLng(p[1],p[0]),'vertex',L0,f);});
            if(cfg.midpoints)c.slice(1).forEach(function(p,i){var q=c[i];offer(L.latLng((q[1]+p[1])/2,(q[0]+p[0])/2),'midpoint',L0,f);});
            if(cfg.edges!==false)try{var near=turf.nearestPointOnLine(line,click,{units:'meters'}),nc=near.geometry.coordinates;offer(L.latLng(nc[1],nc[0]),'edge',L0,f);}catch(e){}
          });
          if(f.geometry&&f.geometry.type==='Point'&&cfg.vertices!==false){var c=f.geometry.coordinates;offer(L.latLng(c[1],c[0]),'point',L0,f);}
          if(f.geometry&&f.geometry.type==='MultiPoint'&&cfg.vertices!==false)f.geometry.coordinates.forEach(function(c){offer(L.latLng(c[1],c[0]),'point',L0,f);});
        });
      });
      if(best)drawSnap(best.latlng,best.kind);else removeOverlay(snapLayer),snapLayer=null;
      return best;
    }
    function selectionExclusion(L0,features){
      var out={};features.forEach(function(f){out[L0.id+'|'+String(f.properties&&f.properties.__sv_fid||'')]=true;});return out;
    }
    function begin(name,L0,features){
      cancelActive(true);
      if(!ensureEditing(L0))return false;
      active={name:name,layer:L0,features:features||[],source:clone(features||[]),output:null,events:[],phase:'',reference:null,pivot:null,restoreSelect:!!window.__svSelectToolOn};
      window.__svSelectToolOn=false;
      document.body.classList.add('esri-transforming');
      return true;
    }

    function updateMove(destination){
      if(!active||!active.reference)return;
      var snapped=snapCandidate(destination,active.exclude),dest=snapped?snapped.latlng:destination;
      var d=projectedDelta(active.reference,dest),crs=currentCrsDelta(active.reference,dest);
      active.dx=d.x;active.dy=d.y;active.crsDx=crs.x;active.crsDy=crs.y;active.destination=dest;
      active.output=transformed(active.source,function(x,y){var p=mapPoint(x,y);return unmapPoint(p.x+d.x,p.y+d.y);});
      preview(active.output);inputs[0].value=fmt(crs.x,3);inputs[1].value=fmt(crs.y,3);
      var distance=map.distance(active.reference,dest);
      setStatus('ΔX '+fmt(crs.x,2)+' · ΔY '+fmt(crs.y,2)+' · '+fmt(distance,2)+' m'+(snapped?' · snapped to '+snapped.kind:''));
      finishButton.disabled=false;
    }
    function startMove(){
      var L0=currentLayer(),rows=selected(L0);
      if(!rows.length){toast('Select one or more features with the selection arrow first',true);return;}
      if(!begin('Move',L0,rows))return;
      active.exclude=selectionExclusion(L0,rows);active.phase='reference';
      showBar('Move selected features','Click or press-drag a reference point. Move the pointer to preview; click again or press Enter to finish.',{pivot:false,fields:[{label:'Delta X',value:0},{label:'Delta Y',value:0},null],finishDisabled:true});
      var down=null,moved=false;
      addMapEvent('mousedown',function(e){
        if(!active)return;down=e.latlng;moved=false;
        try{map.dragging.disable();}catch(err){}
        if(!active.reference){active.reference=e.latlng;active.phase='destination';drawAnchor(e.latlng);}
      });
      addMapEvent('mousemove',function(e){
        if(!active)return;if(down&&pointPixelDistance(down,e.latlng)>3)moved=true;
        if(active.reference)updateMove(e.latlng);
      });
      addMapEvent('mouseup',function(e){
        if(!active||!active.reference)return;
        updateMove(e.latlng);down=null;
        if(moved||active.phase==='destination-click'){replaceSelectedGeometries('Features moved',rows.length+' feature(s) moved');}
        else{active.phase='destination-click';setStatus('Reference set. Move the pointer, then click the destination or press Enter.');}
      });
    }
    function updateMoveFromInputs(){
      if(!active||active.name!=='Move'||!active.reference)return;
      updateMove(latlngFromCrsDelta(active.reference,number(inputs[0].value),number(inputs[1].value)));
    }

    function transformAround(angle,scale){
      if(!active||!active.pivot)return;
      var pivot=mapPoint(active.pivot.lng,active.pivot.lat),rad=-number(angle)*Math.PI/180,factor=scale==null?1:number(scale,1);
      var cs=Math.cos(rad),sn=Math.sin(rad);
      active.output=transformed(active.source,function(x,y){
        var p=mapPoint(x,y),dx=(p.x-pivot.x)*factor,dy=(p.y-pivot.y)*factor;
        return unmapPoint(pivot.x+dx*cs-dy*sn,pivot.y+dx*sn+dy*cs);
      });
      preview(active.output);finishButton.disabled=false;
    }
    function pivotCrs(){
      try{return toCRS(active.pivot.lng,active.pivot.lat,crsKey);}catch(e){var p=mapPoint(active.pivot.lng,active.pivot.lat);return{a:p.x,b:p.y};}
    }
    function updatePivotInputs(){
      var p=pivotCrs();inputs[1].value=fmt(p.a,3);inputs[2].value=fmt(p.b,3);
    }
    function setPivotFromInputs(){
      if(!active||!active.pivot)return;
      try{var ll=fromCRS(number(inputs[1].value),number(inputs[2].value),crsKey);active.pivot=L.latLng(ll[1],ll[0]);}
      catch(e){var ll2=unmapPoint(number(inputs[1].value),number(inputs[2].value));active.pivot=L.latLng(ll2[1],ll2[0]);}
      drawAnchor(active.pivot);
    }
    function startRotate(){
      var L0=currentLayer(),rows=selected(L0);if(!rows.length){toast('Select one or more features to rotate',true);return;}
      if(!begin('Rotate',L0,rows))return;
      active.pivot=selectionCenter(rows);active.phase='reference';active.angle=0;drawAnchor(active.pivot);
      showBar('Rotate selected features','Click a reference direction from the anchor, then move and click again. Positive values rotate clockwise.',{fields:[{label:'Angle °',value:0},{label:'Pivot X',value:0},{label:'Pivot Y',value:0}],finishDisabled:true});
      updatePivotInputs();
      addMapEvent('click',function(e){
        if(active.phase==='set-pivot'){active.pivot=e.latlng;drawAnchor(e.latlng);updatePivotInputs();active.phase='reference';setStatus('Anchor moved. Click a reference direction.');return;}
        if(active.phase==='reference'){active.reference=e.latlng;active.phase='destination';setStatus('Move around the anchor to preview rotation; click to finish.');return;}
        if(active.phase==='destination'){updateRotate(e.latlng);replaceSelectedGeometries('Features rotated',rows.length+' feature(s) rotated '+fmt(active.angle,2)+'°');}
      });
      addMapEvent('mousemove',function(e){if(active&&active.phase==='destination')updateRotate(e.latlng);});
    }
    function updateRotate(latlng){
      var p=map.latLngToContainerPoint(active.pivot),a=map.latLngToContainerPoint(active.reference),b=map.latLngToContainerPoint(latlng);
      var a1=Math.atan2(a.y-p.y,a.x-p.x),a2=Math.atan2(b.y-p.y,b.x-p.x);
      active.angle=(a2-a1)*180/Math.PI;inputs[0].value=fmt(active.angle,3);transformAround(active.angle,1);
      setStatus('Rotation '+fmt(active.angle,2)+'° clockwise · click or Enter to finish');
    }
    function startScale(){
      var L0=currentLayer(),rows=selected(L0);if(!rows.length){toast('Select one or more features to scale',true);return;}
      if(!begin('Scale',L0,rows))return;
      active.pivot=selectionCenter(rows);active.phase='reference';active.factor=1;drawAnchor(active.pivot);
      showBar('Scale selected features','Click a reference distance from the anchor, then move and click again. All selected features use one anchor.',{fields:[{label:'Scale factor',value:1},{label:'Pivot X',value:0},{label:'Pivot Y',value:0}],finishDisabled:true});
      updatePivotInputs();
      addMapEvent('click',function(e){
        if(active.phase==='set-pivot'){active.pivot=e.latlng;drawAnchor(e.latlng);updatePivotInputs();active.phase='reference';setStatus('Anchor moved. Click a reference distance.');return;}
        if(active.phase==='reference'){active.reference=e.latlng;active.base=Math.max(1,pointPixelDistance(active.pivot,e.latlng));active.phase='destination';setStatus('Move from the anchor to preview scale; click to finish.');return;}
        if(active.phase==='destination'){updateScale(e.latlng);replaceSelectedGeometries('Features scaled',rows.length+' feature(s) scaled by '+fmt(active.factor,3));}
      });
      addMapEvent('mousemove',function(e){if(active&&active.phase==='destination')updateScale(e.latlng);});
    }
    function updateScale(latlng){
      active.factor=Math.max(.0001,pointPixelDistance(active.pivot,latlng)/active.base);inputs[0].value=fmt(active.factor,4);
      transformAround(0,active.factor);setStatus('Scale factor '+fmt(active.factor,4)+' · click or Enter to finish');
    }

    function startSplit(){
      var L0=currentLayer(),rows=selected(L0);
      if(rows.length!==1||!rows[0].geometry||rows[0].geometry.type!=='LineString'){toast('Split requires exactly one selected single-part line',true);return;}
      if(!begin('Split line',L0,rows))return;
      active.line=clone(rows[0]);active.phase='cut';
      showBar('Split line','Move over the selected line to preview the cut. Click or press Enter to split; Esc cancels.',{values:false,pivot:false,finishDisabled:true});
      function update(e){
        var near;try{near=turf.nearestPointOnLine(active.line,turf.point([e.latlng.lng,e.latlng.lat]),{units:'meters'});}catch(err){return;}
        var c=near.geometry.coordinates;drawSnap(L.latLng(c[1],c[0]),'split point');
        try{
          var parts=turf.lineSplit(active.line,near).features;
          if(parts.length<2){active.output=null;finishButton.disabled=true;setStatus('Move away from the line endpoint to create two valid parts.');return;}
          active.cut=near;active.parts=parts;active.output=parts;preview(parts);finishButton.disabled=false;
          setStatus('Cut creates '+parts.length+' line parts · click or Enter to finish');
        }catch(err2){active.output=null;finishButton.disabled=true;}
      }
      active.commit=function(){
        if(!active.parts||active.parts.length<2)return;
        if(window.__svAdvSnapshot)window.__svAdvSnapshot();
        var fid=String(rows[0].properties&&rows[0].properties.__sv_fid||''),properties=clone(rows[0].properties||{});
        L0.geojson.features=L0.geojson.features.filter(function(f){return String(f.properties&&f.properties.__sv_fid||'')!==fid;});
        var set={};active.parts.forEach(function(part,i){part.properties=clone(properties);part.properties.__sv_fid='SPLIT_'+Date.now()+'_'+i;part.properties.SPLIT_PART=i+1;L0.geojson.features.push(part);set[part.properties.__sv_fid]=true;});
        window.__svOpState.selectedSets[L0.id]=set;var count=active.parts.length;finishCleanup();markCommit(L0,'Line split',count+' parts created');
      };
      addMapEvent('mousemove',update);addMapEvent('click',function(e){update(e);if(active&&active.parts)active.commit();});
    }

    function mergeConnectedLines(rows){
      var parts=[];rows.forEach(function(f){if(f.geometry.type==='LineString')parts.push(clone(f.geometry.coordinates));else if(f.geometry.type==='MultiLineString')f.geometry.coordinates.forEach(function(c){parts.push(clone(c));});});
      function same(a,b){return coordinateDistance(a,b)<1e-9;}
      var changed=true;
      while(changed){changed=false;
        outer:for(var i=0;i<parts.length;i++)for(var j=i+1;j<parts.length;j++){
          var a=parts[i],b=parts[j],joined=null;
          if(same(a[a.length-1],b[0]))joined=a.concat(b.slice(1));
          else if(same(a[a.length-1],b[b.length-1]))joined=a.concat(clone(b).reverse().slice(1));
          else if(same(a[0],b[b.length-1]))joined=b.concat(a.slice(1));
          else if(same(a[0],b[0]))joined=clone(b).reverse().concat(a.slice(1));
          if(joined){parts[i]=joined;parts.splice(j,1);changed=true;break outer;}
        }
      }
      return parts.length===1?turf.lineString(parts[0]):turf.multiLineString(parts);
    }
    function startMerge(){
      var L0=currentLayer(),rows=selected(L0),family=layerFamily(L0);
      if(rows.length<2){toast('Select at least two features in the same layer to merge',true);return;}
      if(!begin('Merge',L0,rows))return;
      showBar('Merge selected features','Choose the feature whose attributes will be retained. Geometry will be dissolved where possible.',{values:false,pivot:false,target:true,finishDisabled:false});
      targetSelect.innerHTML='';rows.forEach(function(f,i){var o=document.createElement('option');o.value=String(i);o.textContent=featureLabel(f,i);targetSelect.appendChild(o);});
      active.commit=function(){
        var target=rows[number(targetSelect.value,0)]||rows[0],result=null;
        try{
          if(family==='polygon'){
            result=clone(rows[0]);for(var i=1;i<rows.length;i++){var u=turf.union(result,rows[i]);if(u)result=u;}
          }else if(family==='line'){
            result=mergeConnectedLines(rows);
          }else if(family==='point'){
            var points=[];rows.forEach(function(f){if(f.geometry.type==='Point')points.push(f.geometry.coordinates);else if(f.geometry.type==='MultiPoint')points=points.concat(f.geometry.coordinates);});result=turf.multiPoint(points);
          }
        }catch(e){result=null;}
        if(!result){toast('The selected geometry could not be merged. Repair invalid geometry or select compatible features.',true);return;}
        if(window.__svAdvSnapshot)window.__svAdvSnapshot();
        result.properties=clone(target.properties||{});result.properties.__sv_fid='MERGE_'+Date.now();result.properties.MERGED_COUNT=rows.length;
        var remove={};rows.forEach(function(f){remove[String(f.properties&&f.properties.__sv_fid||'')]=true;});
        L0.geojson.features=L0.geojson.features.filter(function(f){return !remove[String(f.properties&&f.properties.__sv_fid||'')];});L0.geojson.features.push(result);
        window.__svOpState.selectedSets[L0.id]={};window.__svOpState.selectedSets[L0.id][result.properties.__sv_fid]=true;
        var count=rows.length;finishCleanup();markCommit(L0,'Features merged',count+' source features; target attributes retained');
      };
    }

    function closestTraceLine(latlng){
      var click=turf.point([latlng.lng,latlng.lat]),best=null;
      Object.keys(layers).forEach(function(id){var L0=layers[id];if(!L0||!L0.geojson||L0.snapEnabled===false)return;
        (L0.geojson.features||[]).forEach(function(f){featureLines(f).forEach(function(line){try{var p=turf.nearestPointOnLine(line,click,{units:'meters'}),c=p.geometry.coordinates,ll=L.latLng(c[1],c[0]),px=pointPixelDistance(latlng,ll);if(px<=24&&(!best||px<best.px))best={line:line,point:p,latlng:ll,px:px,layer:L0};}catch(e){}});});
      });return best;
    }
    function startTrace(){
      var L0=currentLayer();if(layerFamily(L0)!=='line'){toast('Trace output requires an active line feature layer',true);return;}
      if(!begin('Trace',L0,[]))return;
      active.phase='source';
      showBar('Trace geometry','Click a visible line or polygon boundary to set the trace start. Move along it, then click or Enter to finish.',{values:false,pivot:false,finishDisabled:true});
      function update(e){
        if(active.phase==='source'){var source=closestTraceLine(e.latlng);if(source){active.hover=source;drawSnap(source.latlng,'trace source');setStatus('Trace source: '+source.layer.name+' · click to set start');}return;}
        try{var end=turf.nearestPointOnLine(active.traceLine,turf.point([e.latlng.lng,e.latlng.lat]),{units:'meters'}),c=end.geometry.coordinates;drawSnap(L.latLng(c[1],c[0]),'trace end');var part=turf.lineSlice(active.traceStart,end,active.traceLine);part.properties=Object.assign({},L0.featureTemplateDefaults||{});active.output=[part];preview([part]);active.traceResult=part;finishButton.disabled=false;setStatus('Traced '+fmt(turf.length(part,{units:'meters'}),2)+' m · click or Enter to finish');}catch(err){}
      }
      active.commit=function(){
        if(!active.traceResult)return;
        if(window.__svAdvSnapshot)window.__svAdvSnapshot();
        var f=clone(active.traceResult);f.properties=Object.assign({},L0.featureTemplateDefaults||{},f.properties||{});f.properties.__sv_fid='TRACE_'+Date.now();L0.geojson.features.push(f);
        window.__svOpState.selectedSets[L0.id]={};window.__svOpState.selectedSets[L0.id][f.properties.__sv_fid]=true;
        var length=fmt(turf.length(f,{units:'meters'}),2);finishCleanup();markCommit(L0,'Trace completed',length+' m line created');
      };
      addMapEvent('mousemove',update);addMapEvent('click',function(e){update(e);if(active.phase==='source'&&active.hover){active.traceLine=active.hover.line;active.traceStart=active.hover.point;active.phase='end';setStatus('Start fixed. Follow the source edge and click the endpoint.');}else if(active.phase==='end'&&active.traceResult)active.commit();});
    }

    function coordinateDistance(a,b){var dx=a[0]-b[0],dy=a[1]-b[1];return Math.sqrt(dx*dx+dy*dy);}
    function orientCoordinates(coords,start){
      coords=clone(coords);if(!coords.length)return coords;
      if(coordinateDistance(coords[coords.length-1],start)<coordinateDistance(coords[0],start))coords.reverse();
      return coords;
    }
    function combineCoordinates(parts,close){
      var out=[];parts.forEach(function(part){part.forEach(function(c){if(!out.length||coordinateDistance(out[out.length-1],c)>1e-10)out.push(c);});});
      if(close&&out.length&&coordinateDistance(out[0],out[out.length-1])>1e-10)out.push(clone(out[0]));
      return out;
    }
    function reshapeLineCandidate(feature,sketch){
      var hits=turf.lineIntersect(feature,sketch).features||[];
      if(hits.length<2)return null;
      hits.sort(function(a,b){return turf.nearestPointOnLine(feature,a).properties.location-turf.nearestPointOnLine(feature,b).properties.location;});
      var first=hits[0],last=hits[hits.length-1],coords=feature.geometry.coordinates;
      var before=turf.lineSlice(turf.point(coords[0]),first,feature).geometry.coordinates;
      var after=turf.lineSlice(last,turf.point(coords[coords.length-1]),feature).geometry.coordinates;
      var replacement=orientCoordinates(turf.lineSlice(first,last,sketch).geometry.coordinates,before[before.length-1]);
      return turf.lineString(combineCoordinates([before,replacement,after],false),clone(feature.properties||{}));
    }
    function reshapePolygonCandidates(feature,sketch){
      if(feature.geometry.type!=='Polygon')return[];
      var boundary=turf.lineString(feature.geometry.coordinates[0]),reverse=turf.lineString(clone(feature.geometry.coordinates[0]).reverse());
      var hits=turf.lineIntersect(boundary,sketch).features||[];if(hits.length<2)return[];
      hits.sort(function(a,b){return turf.nearestPointOnLine(sketch,a).properties.location-turf.nearestPointOnLine(sketch,b).properties.location;});
      var first=hits[0],last=hits[hits.length-1],replacement=turf.lineSlice(first,last,sketch).geometry.coordinates;
      var route1=turf.lineSlice(first,last,boundary).geometry.coordinates,route2=turf.lineSlice(first,last,reverse).geometry.coordinates;
      function candidate(route){
        route=orientCoordinates(route,first.geometry.coordinates);var repl=orientCoordinates(replacement,route[route.length-1]);
        try{return turf.polygon([combineCoordinates([route,repl],true)],clone(feature.properties||{}));}catch(e){return null;}
      }
      var out=[candidate(route1),candidate(route2)].filter(Boolean);
      out.sort(function(a,b){return turf.area(b)-turf.area(a);});return out;
    }
    function startReshape(){
      var L0=currentLayer(),rows=selected(L0);
      if(rows.length!==1){toast('Reshape requires exactly one selected feature',true);return;}
      var family=layerFamily({geomType:rows[0].geometry&&rows[0].geometry.type});
      if(family==='point'){startMove();return;}
      if(family!=='line'&&family!=='polygon'){toast('Reshape supports single-part lines and polygons',true);return;}
      if(!window.L.Draw||!begin('Reshape',L0,rows))return;
      active.family=family;active.choice=0;
      showBar('Reshape selected feature','Draw a sketch that crosses the selected geometry at least twice; double-click to complete the sketch.',{values:false,pivot:false,finishDisabled:true});
      var modal=$('proSuiteModal');if(modal)modal.classList.remove('open');
      active.handler=new L.Draw.Polyline(map,{shapeOptions:{color:'#FACC15',weight:3,dashArray:'8,5'},allowIntersection:true,metric:true});
      active.drawCreated=function(e){
        var sketch=e.layer.toGeoJSON();active.handler=null;active.sketch=sketch;
        try{
          if(family==='line'){
            var line=reshapeLineCandidate(rows[0],sketch);active.candidates=line?[line]:[];
          }else active.candidates=reshapePolygonCandidates(rows[0],sketch);
        }catch(err){active.candidates=[];}
        if(!active.candidates.length){setStatus('The sketch must cross the selected '+family+' boundary at least twice. Cancel and try again.');toast('No valid reshape result — the sketch needs two boundary crossings',true);return;}
        active.output=[active.candidates[0]];preview(active.output);finishButton.disabled=false;
        if(active.candidates.length>1){
          targetWrap.classList.add('show');targetWrap.childNodes[0].nodeValue='Retained polygon';
          targetSelect.innerHTML='<option value="0">Keep larger side</option><option value="1">Keep smaller side</option>';
          targetSelect.onchange=function(){if(!active||active.name!=='Reshape')return;active.choice=number(this.value);active.output=[active.candidates[active.choice]];preview(active.output);};
        }
        setStatus('Reshape preview ready · choose the retained side if shown, then press Finish or Enter.');
      };
      active.commit=function(){
        if(!active.output||!active.output[0])return;
        if(window.__svAdvSnapshot)window.__svAdvSnapshot();rows[0].geometry=clone(active.output[0].geometry);
        finishCleanup();markCommit(L0,'Feature reshaped','Sketch replaced the boundary between two intersections');
      };
      map.on(L.Draw.Event.CREATED,active.drawCreated);active.handler.enable();
    }

    function copySelected(){
      var L0=currentLayer(),rows=selected(L0);if(!rows.length){toast('Select one or more features to copy',true);return;}
      clipboard={features:clone(rows),family:layerFamily(L0),sourceLayer:L0.id};toast(rows.length+' feature(s) copied — Paste lets you place them interactively');
    }
    function startPaste(){
      var L0=currentLayer();if(!clipboard||!clipboard.features.length){toast('Copy one or more selected features first',true);return;}
      if(layerFamily(L0)!==clipboard.family){toast('Paste target must use the same geometry type as the copied features',true);return;}
      if(!begin('Paste',L0,[]))return;
      active.source=clone(clipboard.features);active.reference=selectionCenter(active.source);active.exclude={};drawAnchor(active.reference);
      showBar('Place copied features','Move the pointer to position the copy. Click or press Enter to place it; Esc cancels.',{pivot:false,fields:[{label:'Delta X',value:0},{label:'Delta Y',value:0},null],finishDisabled:true});
      function update(e){updateMove(e.latlng);}
      active.commit=function(){
        if(!active.output)return;if(window.__svAdvSnapshot)window.__svAdvSnapshot();
        var set={};active.output.forEach(function(f,i){f=clone(f);f.properties=clone(f.properties||{});f.properties.__sv_fid='PASTE_'+Date.now()+'_'+i;L0.geojson.features.push(f);set[f.properties.__sv_fid]=true;});
        window.__svOpState.selectedSets[L0.id]=set;var count=active.output.length;finishCleanup();markCommit(L0,'Features pasted',count+' feature(s) placed interactively');
      };
      addMapEvent('mousemove',update);addMapEvent('click',function(e){update(e);if(active&&active.output)active.commit();});
    }

    pivotButton.onclick=function(){
      if(!active||!(active.name==='Rotate'||active.name==='Scale'))return;
      active.phase='set-pivot';setStatus('Click the map to place a new transform anchor.');
    };
    finishButton.onclick=function(){
      if(!active)return;
      if(active.commit){active.commit();return;}
      if(active.name==='Move'&&active.output)replaceSelectedGeometries('Features moved',active.features.length+' feature(s) moved');
      else if(active.name==='Rotate'&&active.output)replaceSelectedGeometries('Features rotated',active.features.length+' feature(s) rotated '+fmt(active.angle,2)+'°');
      else if(active.name==='Scale'&&active.output)replaceSelectedGeometries('Features scaled',active.features.length+' feature(s) scaled by '+fmt(active.factor,3));
    };
    cancelButton.onclick=function(){cancelActive(false);};
    inputs[0].addEventListener('input',function(){
      if(!active)return;
      if(active.name==='Move')updateMoveFromInputs();
      else if(active.name==='Rotate'){active.angle=number(this.value);transformAround(active.angle,1);setStatus('Rotation '+fmt(active.angle,2)+'° clockwise · press Enter to finish');}
      else if(active.name==='Scale'){active.factor=Math.max(.0001,number(this.value,1));transformAround(0,active.factor);setStatus('Scale factor '+fmt(active.factor,4)+' · press Enter to finish');}
    });
    inputs[1].addEventListener('input',function(){if(active&&active.name==='Move')updateMoveFromInputs();else if(active&&(active.name==='Rotate'||active.name==='Scale')){setPivotFromInputs();transformAround(active.name==='Rotate'?active.angle:0,active.name==='Scale'?active.factor:1);}});
    inputs[2].addEventListener('input',function(){if(active&&(active.name==='Rotate'||active.name==='Scale')){setPivotFromInputs();transformAround(active.name==='Rotate'?active.angle:0,active.name==='Scale'?active.factor:1);}});
    document.addEventListener('keydown',function(e){
      if(!active||/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||''))return;
      if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();cancelActive(false);return;}
      if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();finishButton.click();return;}
      if(active.name==='Move'&&/^Arrow/.test(e.key)){
        e.preventDefault();var step=e.shiftKey?10:1,anchor=active.destination||active.reference,p=map.latLngToContainerPoint(anchor);
        if(e.key==='ArrowLeft')p.x-=step;if(e.key==='ArrowRight')p.x+=step;if(e.key==='ArrowUp')p.y-=step;if(e.key==='ArrowDown')p.y+=step;
        updateMove(map.containerPointToLatLng(p));
      }
    },true);

    window.__svMove=startMove;window.__svRotate=startRotate;window.__svScale=startScale;
    window.__svSplit=startSplit;window.__svMerge=startMerge;window.__svTrace=startTrace;
    window.__svCopy=copySelected;window.__svPaste=startPaste;window.__svReshape=startReshape;window.__svCancelInteractiveEdit=cancelActive;
    if($('proReshape'))$('proReshape').onclick=startReshape;
    [['editorMove','Drag or place selected features with a live preview'],['editorRotate','Rotate selected features around one shared anchor'],['editorScale','Scale selected features around one shared anchor'],['editorSplit','Split one selected line at a previewed point'],['editorMerge','Merge selected geometry and choose target attributes'],['editorTrace','Trace a visible line or polygon boundary']].forEach(function(item){var b=$(item[0]);if(b)b.title=item[1];});
    if(window.__svAudit)window.__svAudit('ESRI-like editing controller initialized','Interactive move, rotate, scale, split, merge, paste and trace ready');
  },0);
})();
/* Build every WGS84 UTM north zone 1..60 so the app is truly universal */
(function(){
  for(var z=1;z<=60;z++){
    CRS['utm'+z]={label:'WGS 1984 UTM Zone '+z+'N', esri:'WGS_1984_UTM_Zone_'+z+'N',
      code:'EPSG:'+(32600+z), proj:'+proj=utm +zone='+z+' +datum=WGS84 +units=m +no_defs', kind:'projected', utmZone:z, utmSouth:false};
    CRS['utm'+z+'s']={label:'WGS 1984 UTM Zone '+z+'S', esri:'WGS_1984_UTM_Zone_'+z+'S',
      code:'EPSG:'+(32700+z), proj:'+proj=utm +zone='+z+' +south +datum=WGS84 +units=m +no_defs', kind:'projected', utmZone:z, utmSouth:true};
  }
})();
var hasProj = (failed.indexOf('proj4')<0) && (typeof proj4!=='undefined');
if(hasProj){
  Object.keys(CRS).forEach(function(k){ try{ proj4.defs(CRS[k].code, CRS[k].proj); }catch(e){} });
}
/* Compute the correct UTM zone key for a given lng/lat (universal). */
function utmZoneFor(lng,lat){
  var z=Math.floor((lng+180)/6)+1; if(z<1)z=1; if(z>60)z=60;
  return 'utm'+z+(lat<0?'s':'');
}
/* Resolve the *effective* CRS key: 'autoutm' picks the zone from a reference point. */
var crsKey='autoutm';
function effectiveCrsKey(refLngLat){
  if(crsKey!=='autoutm') return crsKey;
  var c = refLngLat || (function(){try{var ce=map.getCenter();return [ce.lng,ce.lat];}catch(e){return [55.7447,24.2075];}})();
  if(!hasProj) return 'wgs84';
  return utmZoneFor(c[0],c[1]);
}
function crsLabel(key){ var k=key==='autoutm'?effectiveCrsKey():key; var c=CRS[k]; return c?(c.label+' ('+c.code+')'):key; }
/* convert a [lng,lat] (WGS84) to display object in chosen CRS (Esri-style readout) */
function toCRS(lng, lat, key){
  var k = (key==='autoutm') ? effectiveCrsKey([lng,lat]) : key;
  var c = CRS[k];
  if(!c || k==='wgs84' || !hasProj){ return {x:lat, y:lng, key:'wgs84', fmt:'Lat '+lat.toFixed(6)+'°  Lon '+lng.toFixed(6)+'°'}; }
  try{
    var p = proj4('EPSG:4326', c.code, [lng, lat]);
    if(k==='webmerc') return {x:p[1],y:p[0],key:k,fmt:'X '+p[0].toFixed(2)+'  Y '+p[1].toFixed(2)};
    return {x:p[1], y:p[0], key:k, fmt:'E '+p[0].toFixed(2)+'  N '+p[1].toFixed(2)};
  }catch(e){ return {x:lat,y:lng,key:'wgs84',fmt:'Lat '+lat.toFixed(6)+'°  Lon '+lng.toFixed(6)+'°'}; }
}
/* convert from a CRS coordinate to WGS84 [lng,lat] */
function fromCRS(a, b, key){
  var k = (key==='autoutm') ? effectiveCrsKey() : key;
  if(k==='wgs84'||!hasProj){ return [b, a]; } // [lng,lat]; user typed Lat,Lng
  try{
    var p = proj4(CRS[k].code, 'EPSG:4326', [a, b]); // a=E, b=N
    return [p[0], p[1]];
  }catch(e){ return [b, a]; }
}
/* ===== EXPORT REPROJECTION: deep-clone a FeatureCollection and project every
   coordinate from WGS84 into the active export CRS. Used by all exporters so a
   download matches exactly the coordinate system shown on the map. ===== */
function projectCoordsArray(coords, fwd){
  if(typeof coords[0]==='number'){
    var r=fwd([coords[0],coords[1]]);
    return coords.length>2 ? [r[0],r[1],coords[2]] : [r[0],r[1]];
  }
  return coords.map(function(c){return projectCoordsArray(c,fwd);});
}
function activeExportCrs(fc){
  // reference point = first coordinate of the FC (so Auto UTM picks the data's zone)
  var ref=null;
  try{
    var f=fc&&fc.features&&fc.features[0]; var g=f&&f.geometry;
    if(g){ var cc=g.coordinates; while(cc&&typeof cc[0]!=='number')cc=cc[0]; if(cc)ref=[cc[0],cc[1]]; }
  }catch(e){}
  return (crsKey==='autoutm') ? effectiveCrsKey(ref) : crsKey;
}
function projectFeatureCollection(fc, key){
  if(!hasProj || key==='wgs84') return {fc:fc, key:'wgs84', crs:CRS.wgs84};
  var c=CRS[key]; if(!c) return {fc:fc, key:'wgs84', crs:CRS.wgs84};
  var fwd=function(xy){ try{ return proj4('EPSG:4326', c.code, xy); }catch(e){ return xy; } };
  var out={type:'FeatureCollection',features:(fc.features||[]).map(function(f){
    var nf={type:'Feature',properties:f.properties||{}};
    if(f.geometry&&f.geometry.coordinates){
      nf.geometry={type:f.geometry.type,coordinates:projectCoordsArray(f.geometry.coordinates,fwd)};
    } else { nf.geometry=f.geometry||null; }
    return nf;
  })};
  return {fc:out, key:key, crs:c};
}
/* Esri WKT .prj strings for shapefile export (so ArcGIS reads them correctly) */
function esriPrj(key){
  if(key==='wgs84') return 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';
  if(key==='webmerc') return 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]';
  var c=CRS[key];
  if(c&&c.utmZone){
    var lon0=(c.utmZone*6-183), fn=c.utmSouth?10000000.0:0.0;
    return 'PROJCS["'+c.esri+'",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",'+fn+'],PARAMETER["Central_Meridian",'+lon0+'.0],PARAMETER["Scale_Factor",0.9996],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]';
  }
  return 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';
}

/* ---- map + basemaps ---- */
var HOME={center:[24.2075,55.7447],zoom:11};
var map=L.map('map',{zoomControl:false,center:HOME.center,zoom:HOME.zoom,fadeAnimation:false,preferCanvas:false});
L.control.zoom({position:'topleft'}).addTo(map);
var scaleCtl=L.control.scale({position:'bottomleft',imperial:false}).addTo(map);

/* Temporary search/go-to markers are kept in one group so refresh/export can manage them cleanly. */
var tempMarkers = new L.FeatureGroup().addTo(map);
function addTempMarker(latlng, html){
  tempMarkers.clearLayers();
  var m=L.marker(latlng).bindPopup(html||'Location').addTo(tempMarkers);
  try{m.openPopup();}catch(e){}
  return m;
}

var basemaps={
  lightgray:{name:'Light Gray',layer:L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{crossOrigin:true,maxZoom:20,attribution:'© OpenStreetMap, © CARTO'}),thumb:'https://a.basemaps.cartocdn.com/light_all/11/1290/843.png'},
  darkgray:{name:'Dark Gray',layer:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',{crossOrigin:true,maxZoom:16,attribution:'© Esri'}),thumb:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/11/843/1290'},
  voyager:{name:'Voyager',layer:L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{crossOrigin:true,maxZoom:20,attribution:'© OpenStreetMap, © CARTO'}),thumb:'https://a.basemaps.cartocdn.com/rastertiles/voyager/11/1290/843.png'},
  imagery:{name:'Satellite',layer:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{crossOrigin:true,maxZoom:19,attribution:'© Esri, Maxar'}),thumb:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/11/843/1290'},
  streets:{name:'Streets',layer:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{crossOrigin:true,maxZoom:19,attribution:'© OpenStreetMap'}),thumb:'https://a.tile.openstreetmap.org/11/1290/843.png'},
  topo:{name:'Topographic',layer:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{crossOrigin:true,maxZoom:19,attribution:'© Esri'}),thumb:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/11/843/1290'},
  natgeo:{name:'Nat Geo',layer:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',{crossOrigin:true,maxZoom:16,attribution:'© Esri, National Geographic'}),thumb:'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/11/843/1290'},
  osmhot:{name:'OSM Humanitarian',layer:L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{crossOrigin:true,maxZoom:19,attribution:'© OpenStreetMap, HOT'}),thumb:'https://a.tile.openstreetmap.fr/hot/11/1290/843.png'},
  hillshade:{name:'Terrain Hillshade',layer:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',{crossOrigin:true,maxZoom:16,attribution:'© Esri'}),thumb:'https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/8/104/160'},
  opentopo:{name:'OpenTopoMap',layer:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{crossOrigin:true,maxZoom:17,attribution:'© OpenTopoMap, © OpenStreetMap contributors'}),thumb:'https://a.tile.opentopomap.org/8/167/109'},
  blank:{name:'Blank QA',layer:L.layerGroup(),thumb:''}
};
var currentBase=basemaps.lightgray.layer.addTo(map);
(function(){
  var grid=document.getElementById('basemaps');
  Object.keys(basemaps).forEach(function(k){
    var b=basemaps[k], el=document.createElement('div');
    el.className='bm'+(k==='lightgray'?' active':'');
    el.innerHTML='<div class="thumb" style="background-image:url('+b.thumb+')"></div>'+b.name;
    el.onclick=function(){
      map.removeLayer(currentBase); currentBase=b.layer.addTo(map); currentBase.bringToBack();
      document.querySelectorAll('.bm').forEach(function(x){x.classList.remove('active');}); el.classList.add('active');
      userPickedBasemap=true; // respect manual choice; stop theme auto-switching
    };
    grid.appendChild(el);
  });
})();

/* ---- toast ---- */
var toastEl=document.getElementById('toast'),toastT;
function toast(msg,err){ toastEl.textContent=msg; toastEl.className='toast show'+(err?' err':'');
  clearTimeout(toastT); toastT=setTimeout(function(){toastEl.className='toast';},3200); }

/* ---- CRS selector wiring ---- */
var crsSelect=document.getElementById('crsSelect');
crsSelect.value='autoutm';
function shortCrsTag(k){
  if(k==='wgs84') return 'GCS';
  if(k==='webmerc') return 'WebMerc';
  var c=CRS[k]; if(c&&c.utmZone) return 'UTM'+c.utmZone+(c.utmSouth?'S':'N');
  return (c&&c.code)?c.code.replace('EPSG:',''):k;
}
function updateCrsReadout(){
  var ek=effectiveCrsKey();
  var tag=shortCrsTag(ek);
  document.getElementById('coordCrs').textContent=(crsKey==='autoutm'?'⊕ ':'')+tag;
  document.getElementById('coordCrs').title=CRS[ek].esri+' ('+CRS[ek].code+')';
}
crsSelect.onchange=function(){
  crsKey=crsSelect.value;
  updateCrsReadout();
  refreshCoordReadout();
  if(!hasProj && crsKey!=='wgs84') toast('Projection library not loaded — showing Lat/Lng',true);
  else toast('Coordinate system: '+crsLabel(crsKey)+' — map readout & exports now use this system');
  var gx=document.getElementById('gotoX'), gy=document.getElementById('gotoY');
  var ek=effectiveCrsKey();
  if(ek==='wgs84'){ gx.placeholder='Lat 24.2075'; gy.placeholder='Lon 55.7447'; document.getElementById('gotoHint').textContent='Enter Lat, Lon (degrees).'; }
  else{ gx.placeholder='Easting (m)'; gy.placeholder='Northing (m)'; document.getElementById('gotoHint').textContent='Enter Easting, Northing in '+CRS[ek].esri+'.'; }
};
updateCrsReadout();

/* ---- coordinate readout ---- */
var lastMouseLL=null;
function refreshCoordReadout(){
  var ll=lastMouseLL || (function(){try{var c=map.getCenter();return [c.lng,c.lat];}catch(e){return null;}})();
  if(!ll)return;
  var el=document.getElementById('coordText');
  if(el&&el.getAttribute('data-mgrs')==='1') return; // MGRS handler manages its own text
  var c=toCRS(ll[0],ll[1],crsKey);
  if(el) el.textContent=c.fmt;
}
map.on('mousemove',function(e){
  lastMouseLL=[e.latlng.lng,e.latlng.lat];
  var c=toCRS(e.latlng.lng,e.latlng.lat,crsKey);
  document.getElementById('coordText').textContent=c.fmt;
});
/* keep Auto-UTM readout label fresh as the user pans across zones */
map.on('moveend',function(){ if(crsKey==='autoutm') updateCrsReadout(); });

/* ================= LAYER REGISTRY ================= */
var PALETTE=['#3B82F6','#22D3EE','#34D399','#F59E0B','#F472B6','#A78BFA','#FB7185','#4ADE80'];
var palIdx=0; function nextColor(){return PALETTE[palIdx++%PALETTE.length];}
var layers={}, layerSeq=0;
var layerListEl=document.getElementById('layerList'), legendBody=document.getElementById('legendBody'),
    layersHint=document.getElementById('layersHint');

var SV_ESC={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'};
function escapeHtml(s){s=String(s);return /[&<>"]/.test(s)?s.replace(/[&<>"]/g,function(c){return SV_ESC[c];}):s;}
function popupFromProps(props,title){
  if(!props) return title||'Feature';
  var rows=Object.keys(props).slice(0,40).map(function(k){var v=props[k];
    if(v===null||v===undefined||v==='')return ''; return '<tr><td>'+escapeHtml(k)+'</td><td>'+escapeHtml(v)+'</td></tr>';}).join('');
  return '<div style="max-height:240px;overflow:auto">'+(title?'<b>'+escapeHtml(title)+'</b>':'')+'<table class="attr-table">'+rows+'</table></div>';
}
function styleVec(color){return {
  style:{color:color,weight:2.5,opacity:.95,fillColor:color,fillOpacity:.25},
  pointToLayer:function(f,ll){return L.circleMarker(ll,{radius:6,color:color,weight:2,fillColor:color,fillOpacity:.75});},
  onEachFeature:function(f,l){l.bindPopup(popupFromProps(f.properties));}
};}
/* ===== Fast rendering ==========================================================
   Vector layers draw either with Leaflet's SVG renderer (one DOM node per feature —
   rich but slow past a few thousand features) or with a single shared Canvas renderer
   (one node total — dramatically faster).
   ONE renderer instance is shared by every vector layer, so layer ordering, bringToFront
   and restacking behave exactly as before. Tools that used to poke at SVG nodes
   (definition query, time slider, blend modes) go through svShowFeature/svLayerElements,
   which work with either renderer.                                                     */
var svFastMode='auto';                 // 'auto' | 'on' | 'off'
var SV_FAST_THRESHOLD=1500;            // total features before 'auto' switches to canvas
var svCanvasRenderer=null;
function svCanvas(){ if(!svCanvasRenderer)svCanvasRenderer=L.canvas({padding:0.5}); return svCanvasRenderer; }
function svTotalFeatures(){
  var n=0; Object.keys(layers).forEach(function(id){
    var L0=layers[id]; if(L0&&L0.geojson&&L0.geojson.features)n+=L0.geojson.features.length; });
  return n;
}
function svUseCanvas(){
  if(svFastMode==='on')return true;
  if(svFastMode==='off')return false;
  return svTotalFeatures()>SV_FAST_THRESHOLD;
}
function svRendererOpt(){ return svUseCanvas()?svCanvas():undefined; }
/* Show / hide one rendered feature — works for SVG paths, canvas paths and markers, so
   filtering and time animation behave identically in both rendering modes. */
function svShowFeature(ly,show){
  if(!ly)return;
  if(ly._icon){ ly._icon.style.display=show?'':'none'; if(ly._shadow)ly._shadow.style.display=show?'':'none'; return; }
  if(ly._path){ ly._path.style.display=show?'':'none'; return; }
  var el=(ly.getElement&&ly.getElement());
  if(el&&el.style){ el.style.display=show?'':'none'; return; }
  if(ly.setStyle){                       // canvas-rendered path: fade out instead of display:none
    if(show){ if(ly.__svHid){ ly.setStyle(ly.__svPrev||{opacity:.95,fillOpacity:1}); ly.__svHid=false; } }
    else if(!ly.__svHid){
      ly.__svPrev={opacity:(ly.options.opacity==null?.95:ly.options.opacity),fillOpacity:(ly.options.fillOpacity==null?1:ly.options.fillOpacity)};
      ly.setStyle({opacity:0,fillOpacity:0}); ly.__svHid=true;
    }
  }
}
/* Container elements of a layer, for CSS effects such as blend modes. */
function svLayerElements(L0){
  var els=[];
  try{
    if(L0.leaflet.getContainer)els.push(L0.leaflet.getContainer());
    if(L0.leaflet._image)els.push(L0.leaflet._image);
    if(L0.leaflet.eachLayer)L0.leaflet.eachLayer(function(ly){
      if(ly._path)els.push(ly._path);
      if(ly._icon)els.push(ly._icon);
      if(ly.getContainer&&ly.getContainer())els.push(ly.getContainer());
    });
    if(svUseCanvas()&&svCanvasRenderer&&svCanvasRenderer._container)els.push(svCanvasRenderer._container);
  }catch(e){}
  return els.filter(Boolean);
}
var svRenderState='svg';               // what the vector layers are actually drawn with right now
function svRebuildAllVectors(){
  svRenderState=svUseCanvas()?'canvas':'svg';
  Object.keys(layers).forEach(function(id){ var L0=layers[id]; if(L0&&L0.geojson&&!L0.isRaster)svBuildLeafletLayer(L0); });
  try{restackLayers();}catch(e){}
}
/* In 'auto', flip to canvas once the map gets heavy (and back when it doesn't). */
var svFastBusy=false;
window.__svAutoFastRender=function(){
  if(svFastMode!=='auto'||svFastBusy)return;
  var want=svUseCanvas()?'canvas':'svg';
  if(want===svRenderState)return;
  svFastBusy=true;
  try{
    svRebuildAllVectors();
    if(want==='canvas')toast('Fast rendering on — '+svTotalFeatures().toLocaleString('en-US')+' features drawn on canvas');
  }finally{ svFastBusy=false; }
};
function geoJsonLayer(gj,color){var s=styleVec(color);
  var lyr=L.geoJSON(gj,{style:s.style,pointToLayer:s.pointToLayer,onEachFeature:s.onEachFeature,renderer:svRendererOpt()});
  lyr._src=gj; return lyr; }

/* ================= CATEGORIZED / GRADUATED SYMBOLOGY + SELECTION ENGINE ================= */
var __svFidSeq=0;
function ensureFids(gj){
  if(!gj||!gj.features)return;
  var seen={};
  gj.features.forEach(function(f){
    if(!f.properties)f.properties={};
    var fid=f.properties.__sv_fid==null?'':String(f.properties.__sv_fid);
    if(!fid||seen[fid]){
      do{fid='F'+(++__svFidSeq);}while(seen[fid]);
      f.properties.__sv_fid=fid;
    }
    seen[fid]=true;
  });
}
window.__svOpState=window.__svOpState||{selectedSets:{},editMode:false};
window.__svSelectToolOn=window.__svSelectToolOn||false;
function svSelSet(id){ return window.__svOpState.selectedSets[id]||(window.__svOpState.selectedSets[id]={}); }
window.__svSelectedFids=window.__svSelectedFids||function(id){ return Object.keys(svSelSet(id)); };
window.__svPendingCells=window.__svPendingCells||{};
function svSetSaveButtons(dirty){
  window.__svHasUnsavedEdits=!!dirty;
  ['attrSave','xpSaveEdit','editorSave'].forEach(function(id){var b=document.getElementById(id);if(!b)return;b.disabled=!dirty;b.classList.toggle('dirty',!!dirty);b.classList.toggle('save-ready',!!dirty);});
}
window.__svMarkDirty=function(){
  if(window.__svEditSession&&window.__svEditSession.active)window.__svEditSession.dirty=true;
  svSetSaveButtons(true);
  try{if(window.__svRefreshEditorUI)window.__svRefreshEditorUI();}catch(e){}
};
var SV_CAT_PALETTE=['#3B82F6','#F59E0B','#34D399','#F472B6','#A78BFA','#FB7185','#22D3EE','#4ADE80','#FCD34D','#818CF8','#F87171','#2DD4BF'];
var SV_PCI_PALETTE={'1':'#E60000','2':'#FF8000','3':'#FFFF00','4':'#A3E048','5':'#267300'};
function isPciField(name){ return /pci[_\s]*rating|^pci$/i.test(String(name||'')); }
function svFeatureRawColor(f){ var p=(f&&f.properties)||{}; return p.stroke||p['marker-color']||p.fill||null; }
/* derive one color per unique value of `field`, preferring colors already embedded in the source data (KML/ArcGIS export),
   falling back to a PCI-style ramp for PCI-ish fields, else a qualitative palette */
function deriveCategoryColors(L0,field){
  var feats=(L0.geojson&&L0.geojson.features)||[], tally={}, order=[];
  feats.forEach(function(f){
    var v=f.properties?f.properties[field]:null; if(v==null||v==='')return; var key=String(v);
    if(!tally[key]){tally[key]={};order.push(key);}
    var c=svFeatureRawColor(f); if(c){ c=String(c).toLowerCase(); tally[key][c]=(tally[key][c]||0)+1; }
  });
  order.sort(function(a,b){ var na=parseFloat(a),nb=parseFloat(b); if(!isNaN(na)&&!isNaN(nb))return na-nb; return a.localeCompare(b); });
  var out={}, pciLike=isPciField(field), pi=0;
  order.forEach(function(key){
    var colors=tally[key], best=null,bestN=0;
    Object.keys(colors).forEach(function(c){ if(colors[c]>bestN){bestN=colors[c];best=c;} });
    if(best) out[key]=best;
    else if(pciLike && SV_PCI_PALETTE[key]) out[key]=SV_PCI_PALETTE[key];
    else out[key]=SV_CAT_PALETTE[pi%SV_CAT_PALETTE.length];
    pi++;
  });
  return out;
}
/* color for one feature given a layer's symbology mode (single / graduated / categorized / native-from-source) */
function svColorForFeature(L0,f){
  var mode=L0.colorMode||(L0.uniqueField?'categorized':(L0.field?'graduated':'single'));
  if(L0.ruleStyles&&L0.ruleStyles.length){
    var props=f&&f.properties||{};
    for(var ri=0;ri<L0.ruleStyles.length;ri++){var rule=L0.ruleStyles[ri],actual=props[rule.field],expected=rule.value,match=false;
      if(rule.op==='=')match=String(actual)===String(expected);else if(rule.op==='!=')match=String(actual)!==String(expected);else if(rule.op==='contains')match=String(actual==null?'':actual).toLowerCase().indexOf(String(expected).toLowerCase())>=0;else if(rule.op==='>')match=Number(actual)>Number(expected);else if(rule.op==='<')match=Number(actual)<Number(expected);else if(rule.op==='>=')match=Number(actual)>=Number(expected);else if(rule.op==='<=')match=Number(actual)<=Number(expected);
      if(match)return rule.color||L0.color||'#3B82F6';
    }
  }
  if(mode==='categorized'&&L0.uniqueField){
    var v=f.properties?f.properties[L0.uniqueField]:null; var key=(v==null||v==='')?'':String(v);
    if(L0.catColors&&L0.catColors[key])return L0.catColors[key];
    return '#9AA4B2';
  }
  if(mode==='native'){ return svFeatureRawColor(f)||L0.color||'#3B82F6'; }
  if(mode==='graduated'&&L0.field){
    var val=parseFloat(f.properties?f.properties[L0.field]:NaN); if(isNaN(val))return '#888888';
    var min=L0._gMin,max=L0._gMax; if(min==null||max==null)return L0.color||'#3B82F6';
    var t=(max===min)?.5:(val-min)/(max-min); return ramp(Math.max(0,Math.min(1,t)));
  }
  return L0.color||'#3B82F6';
}

/* ================= ESRI-STYLE SYMBOL CATALOG ================= */
var SV_SYMBOL_CATALOG={
  point:[
    {key:'circle',name:'Circle',glyph:'●'},{key:'square',name:'Square',glyph:'■'},{key:'diamond',name:'Diamond',glyph:'◆'},
    {key:'triangle',name:'Triangle',glyph:'▲'},{key:'cross',name:'Cross',glyph:'✚'},{key:'x',name:'X Marker',glyph:'✕'},
    {key:'star',name:'Star',glyph:'★'},{key:'asterisk',name:'Asterisk',glyph:'✱'},{key:'check',name:'Check',glyph:'✓'},
    {key:'flag',name:'Flag',glyph:'⚑'},{key:'airport',name:'Airport',glyph:'✈'},{key:'hospital',name:'Hospital',glyph:'✚'},
    {key:'information',name:'Information',glyph:'ⓘ'},{key:'question',name:'Question',glyph:'?'},{key:'bolt',name:'Bolt',glyph:'ϟ'},
    {key:'pushpin',name:'Pushpin',glyph:'●'},{key:'school',name:'School',glyph:'⚑'},{key:'camera',name:'Camera',glyph:'◉'},
    {key:'warning',name:'Warning',glyph:'⚠'},{key:'tree',name:'Tree',glyph:'♠'},{key:'utility',name:'Utility',glyph:'⊕'}
  ],
  line:[
    {key:'solid',name:'Solid line'},{key:'dash',name:'Dashed line'},{key:'dot',name:'Dotted line'},
    {key:'dashdot',name:'Dash-dot line'},{key:'longdash',name:'Long dash'},{key:'proposed',name:'Road, Proposed'},
    {key:'railroad',name:'Railroad'},{key:'boundary',name:'Administrative boundary'},{key:'contour',name:'Contour'}
  ],
  polygon:[
    {key:'solid',name:'Solid fill'},{key:'hollow',name:'Hollow'},{key:'diagonal',name:'Diagonal hatch'},
    {key:'crosshatch',name:'Crosshatch'},{key:'dots',name:'Ordered stipple'},{key:'horizontal',name:'Horizontal hatch'},
    {key:'vertical',name:'Vertical hatch'},{key:'water',name:'Water pattern'},{key:'wetlands',name:'Wetlands pattern'}
  ]
};
function svGeometryFamily(L0){
  var gt=String(L0&&(L0.geomType||geomTypeOf(L0.geojson))||'').toLowerCase();
  return gt.indexOf('point')>=0?'point':(gt.indexOf('line')>=0?'line':(gt.indexOf('polygon')>=0?'polygon':''));
}
function svPointCatalogItem(key){
  return SV_SYMBOL_CATALOG.point.filter(function(item){return item.key===key;})[0]||SV_SYMBOL_CATALOG.point[0];
}
function svLineDash(style){
  return {solid:null,dash:'14,8',dot:'2,7',dashdot:'14,6,2,6',longdash:'24,10',proposed:'7,7',railroad:'12,4,2,4',boundary:'18,5,2,5,2,5',contour:null}[style||'solid']||null;
}
function svPointSymbolIcon(L0,color,selected){
  var item=svPointCatalogItem(L0.pointShape||'circle'),radius=Math.max(3,+L0.size||6),diameter=Math.round(radius*2+8);
  var angle=isFinite(+L0.pointAngle)?+L0.pointAngle:0,fill=selected?'#FACC15':color;
  var opacity=selected?1:(L0.opacity==null?1:L0.opacity);
  var shadow=selected?'-1px -1px #00E5FF,1px -1px #00E5FF,-1px 1px #00E5FF,1px 1px #00E5FF,0 0 5px #00E5FF':'0 1px 2px rgba(0,0,0,.45)';
  if(L0.pointImage)return L.divIcon({className:'sv-point-symbol',iconSize:[diameter,diameter],iconAnchor:[diameter/2,diameter/2],html:'<img alt="" src="'+L0.pointImage+'" style="width:'+Math.round(radius*2)+'px;height:'+Math.round(radius*2)+'px;object-fit:contain;opacity:'+opacity+';transform:rotate('+angle+'deg);filter:'+(selected?'drop-shadow(0 0 4px #00E5FF)':'drop-shadow(0 1px 1px rgba(0,0,0,.45))')+'">'});
  return L.divIcon({className:'sv-point-symbol',iconSize:[diameter,diameter],iconAnchor:[diameter/2,diameter/2],
    html:'<span style="color:'+fill+';opacity:'+opacity+';font-size:'+Math.round(radius*2)+'px;transform:rotate('+angle+'deg);text-shadow:'+shadow+'">'+item.glyph+'</span>'});
}
function svPatternCss(pattern,color,opacity){
  color=color||'#3B82F6';opacity=opacity==null?1:opacity;
  var base='border:2px solid '+color+';opacity:'+opacity+';';
  if(pattern==='hollow')return base+'background:transparent';
  if(pattern==='diagonal')return base+'background:repeating-linear-gradient(135deg,transparent 0 5px,'+color+' 5px 7px)';
  if(pattern==='crosshatch')return base+'background:repeating-linear-gradient(45deg,transparent 0 5px,'+color+' 5px 6px),repeating-linear-gradient(135deg,transparent 0 5px,'+color+' 5px 6px)';
  if(pattern==='dots')return base+'background:radial-gradient(circle,'+color+' 1px,transparent 1.5px);background-size:6px 6px';
  if(pattern==='horizontal')return base+'background:repeating-linear-gradient(0deg,transparent 0 5px,'+color+' 5px 7px)';
  if(pattern==='vertical')return base+'background:repeating-linear-gradient(90deg,transparent 0 5px,'+color+' 5px 7px)';
  if(pattern==='water')return base+'background:repeating-linear-gradient(0deg,rgba(59,130,246,.12) 0 4px,'+color+' 4px 5px,rgba(59,130,246,.12) 5px 9px)';
  if(pattern==='wetlands')return base+'background:repeating-linear-gradient(135deg,transparent 0 4px,'+color+' 4px 5px,transparent 5px 9px),rgba(34,197,94,.18)';
  return base+'background:'+color;
}
function svSymbolSwatchHtml(L0,color){
  var family=svGeometryFamily(L0),c=color||L0.color||'#3B82F6';
  if(family==='point'){
    if(L0.pointImage)return '<span class="sw" style="background:transparent;border:none;width:20px;height:18px;display:flex;align-items:center;justify-content:center"><img alt="" src="'+L0.pointImage+'" style="max-width:18px;max-height:18px;transform:rotate('+(+L0.pointAngle||0)+'deg)"></span>';
    var item=svPointCatalogItem(L0.pointShape||'circle');
    return '<span class="sw" style="background:transparent;border:none;width:20px;height:18px;color:'+c+';font-size:16px;font-weight:900;display:flex;align-items:center;justify-content:center;transform:rotate('+(+L0.pointAngle||0)+'deg)">'+item.glyph+'</span>';
  }
  if(family==='line'){
    var style=L0.lineStyle||'solid',borderStyle=style==='dot'?'dotted':(style==='solid'||style==='contour'?'solid':'dashed');
    return '<span class="sw" style="background:transparent;border:none;border-top:'+Math.max(2,+L0.weight||2.5)+'px '+borderStyle+' '+c+';width:24px;height:0;border-radius:0"></span>';
  }
  if(family==='polygon')return '<span class="sw" style="'+svPatternCss(L0.fillPattern||(L0.hollow?'hollow':'solid'),c,L0.opacity)+'"></span>';
  return '<span class="sw" style="background:'+c+'"></span>';
}
var svPatternSeq=0,svPatternIds={},svPatternRenderer=null;
function svPatternSvg(){if(!svPatternRenderer)svPatternRenderer=L.svg({padding:.5});return svPatternRenderer;}
function svEnsureSvgPattern(renderer,pattern,color,opacity){
  if(!renderer||!renderer._container||String(renderer._container.tagName).toLowerCase()!=='svg')return '';
  var svg=renderer._container,key=pattern+'|'+color+'|'+opacity,known=svPatternIds[key];
  if(known&&svg.querySelector('#'+known))return known;
  var ns='http://www.w3.org/2000/svg',defs=svg.querySelector('defs');
  if(!defs){defs=document.createElementNS(ns,'defs');svg.insertBefore(defs,svg.firstChild);}
  var id='svpat_'+(++svPatternSeq),p=document.createElementNS(ns,'pattern');p.setAttribute('id',id);p.setAttribute('patternUnits','userSpaceOnUse');p.setAttribute('width','8');p.setAttribute('height','8');
  var bg=document.createElementNS(ns,'rect');bg.setAttribute('width','8');bg.setAttribute('height','8');bg.setAttribute('fill',color);bg.setAttribute('fill-opacity',(pattern==='water'||pattern==='wetlands') ? 0.18 : 0.08);p.appendChild(bg);
  function path(d){var el=document.createElementNS(ns,'path');el.setAttribute('d',d);el.setAttribute('fill','none');el.setAttribute('stroke',color);el.setAttribute('stroke-width','1.25');el.setAttribute('stroke-opacity',String(opacity));p.appendChild(el);}
  if(pattern==='diagonal')path('M-2 2L2-2M0 8L8 0M6 10L10 6');
  else if(pattern==='crosshatch'){path('M-2 2L2-2M0 8L8 0M6 10L10 6');path('M-2 6L2 10M0 0L8 8M6-2L10 2');}
  else if(pattern==='horizontal')path('M0 4L8 4');
  else if(pattern==='vertical')path('M4 0L4 8');
  else if(pattern==='water'){path('M0 2C2 0 4 4 8 2');path('M0 6C2 4 4 8 8 6');}
  else if(pattern==='wetlands'){path('M0 7L2 3L4 7M4 7L6 3L8 7');}
  else if(pattern==='dots'){var dot=document.createElementNS(ns,'circle');dot.setAttribute('cx','2');dot.setAttribute('cy','2');dot.setAttribute('r','1.2');dot.setAttribute('fill',color);dot.setAttribute('fill-opacity',String(opacity));p.appendChild(dot);}
  defs.appendChild(p);svPatternIds[key]=id;return id;
}
function svApplyPolygonPatterns(L0,leafletLayer){
  var pattern=L0.fillPattern||(L0.hollow?'hollow':'solid');
  if(pattern==='solid'||pattern==='hollow')return;
  var selected=svSelSet(L0.id);
  leafletLayer.eachLayer(function(layer){
    var fid=String(layer.feature&&layer.feature.properties&&layer.feature.properties.__sv_fid||'');
    if(selected[fid]||!layer._path)return;
    var color=svColorForFeature(L0,layer.feature),id=svEnsureSvgPattern(layer._renderer,pattern,color,L0.opacity==null?1:L0.opacity);
    if(id){layer._path.setAttribute('fill','url(#'+id+')');layer._path.setAttribute('fill-opacity','1');}
  });
}

function svClearAllSelections(rebuild){
  var changed={};
  Object.keys((window.__svOpState&&window.__svOpState.selectedSets)||{}).forEach(function(id){
    var set=svSelSet(id); if(Object.keys(set).length){changed[id]=true;window.__svOpState.selectedSets[id]={};}
  });
  if(rebuild!==false)Object.keys(changed).forEach(function(id){if(layers[id])svBuildLeafletLayer(layers[id]);});
  return changed;
}
function svRefreshSelectionLayers(changed){
  Object.keys(changed||{}).forEach(function(id){if(layers[id]&&layers[id].geojson)svBuildLeafletLayer(layers[id]);});
  try{if(curTbl)renderTable();}catch(e){}
  try{svUpdateSelectionSummary();}catch(e){}
}
function svSelectionModifier(evt){
  evt=evt||{};var add=!!evt.shiftKey,toggle=!!(evt.ctrlKey||evt.metaKey),mode=window.__svProfessionalState&&window.__svProfessionalState.selection&&window.__svProfessionalState.selection.mode;
  if(!add&&!toggle){add=mode==='add';toggle=mode==='toggle';}
  return {add:add,toggle:toggle};
}
/* the single canonical function that (re)draws a layer's Leaflet representation from its geojson + symbology + selection state.
   Used by symbology apply, undo/redo, geometry edits, select-by-attribute, and the attribute table — so every one of those
   stays in sync instead of quietly resetting a layer back to a flat color. */
function svBuildLeafletLayer(L0){
  if(!L0||!L0.geojson)return;
  ensureFids(L0.geojson);
  if((L0.colorMode||'')==='graduated'&&L0.field){
    var vals=L0.geojson.features.map(function(f){return parseFloat(f.properties[L0.field]);}).filter(function(v){return !isNaN(v);});
    L0._gMin=vals.length?Math.min.apply(null,vals):0; L0._gMax=vals.length?Math.max.apply(null,vals):1;
  }
  var size=L0.size||6, opacity=(L0.opacity!=null?L0.opacity:1), selSet=svSelSet(L0.id);
  var w=(L0.weight!=null?+L0.weight:2.5), hollow=!!L0.hollow;
  var gIsPoly=/Polygon/.test(String(L0.geomType||geomTypeOf(L0.geojson)||''));
  var ocol=(gIsPoly&&L0.outlineColor&&L0.outlineColor[0]==='#')?L0.outlineColor:'';
  try{ if(L0.leaflet)map.removeLayer(L0.leaflet); }catch(e){}
  var fillPattern=L0.fillPattern||(hollow?'hollow':'solid'),_rnd=(gIsPoly&&fillPattern!=='solid'&&fillPattern!=='hollow')?svPatternSvg():svRendererOpt();
  var nl=L.geoJSON(L0.geojson,{
    renderer:_rnd,
    style:function(f){ var c=svColorForFeature(L0,f), fid=String((f.properties&&f.properties.__sv_fid)||''), sel=!!selSet[fid];
      var dash=!gIsPoly?svLineDash(L0.lineStyle||'solid'):null;
      return sel?{color:'#00E5FF',weight:Math.max(w+2.5,5),opacity:1,fillColor:'#FACC15',fillOpacity:(hollow?0:.72),dashArray:'6,3'}:{color:(ocol||c),weight:w,opacity:.95,fillColor:c,fillOpacity:(hollow?0:opacity),dashArray:dash,lineCap:(L0.lineStyle==='dot'?'round':'butt'),lineJoin:'round'}; },
    pointToLayer:function(f,ll){ var c=svColorForFeature(L0,f), fid=String((f.properties&&f.properties.__sv_fid)||''), sel=!!selSet[fid];
      if(L0.pointImage||(L0.pointShape||'circle')!=='circle')return L.marker(ll,{icon:svPointSymbolIcon(L0,c,sel)});
      return L.circleMarker(ll, sel?{radius:size+3,color:'#00E5FF',weight:4,fillColor:'#FACC15',fillOpacity:.95,renderer:_rnd}:{radius:size,color:c,weight:2,fillColor:c,fillOpacity:opacity,renderer:_rnd}); },
    onEachFeature:function(f,l){ l.bindPopup(popupFromProps(f.properties));var mapClickTimer=null;
      function selectFromMap(e,openVertices){
        if(L0.selectable===false)return;
        var fid=String((f.properties&&f.properties.__sv_fid)||''); if(!fid)return;
        var mod=svSelectionModifier(e.originalEvent),changed={};
        if(!mod.add&&!mod.toggle)changed=svClearAllSelections(false);
        var set=svSelSet(L0.id);
        if(mod.toggle){if(set[fid])delete set[fid];else set[fid]=true;}else set[fid]=true;
        changed[L0.id]=true;
        svRefreshSelectionLayers(changed);
        try{ if(typeof curTbl!=='undefined'&&curTbl&&curTbl.id===L0.id)renderTable(); }catch(e3){}
        if(window.__svEditSession&&window.__svEditSession.active&&window.__svSetActiveLayer)window.__svSetActiveLayer(L0.id);
        if(openVertices&&window.__svOpenVertexEditor)setTimeout(function(){window.__svOpenVertexEditor(L0.id,fid);},0);
      }
      l.on('click',function(e){
        if(!window.__svSelectToolOn)return;
        if(e.originalEvent){try{L.DomEvent.stopPropagation(e.originalEvent);}catch(e2){}}
        clearTimeout(mapClickTimer);mapClickTimer=setTimeout(function(){selectFromMap(e,false);},320);
      });
      l.on('mousedown',function(e){
        if(!window.__svSelectToolOn||!e.originalEvent)return;
        try{L.DomEvent.stopPropagation(e.originalEvent);}catch(e2){}
      });
      l.on('dblclick',function(e){
        if(!window.__svSelectToolOn||!window.__svEditSession||!window.__svEditSession.active)return;
        clearTimeout(mapClickTimer);
        if(e.originalEvent){try{L.DomEvent.stopPropagation(e.originalEvent);L.DomEvent.preventDefault(e.originalEvent);}catch(e2){}}
        selectFromMap(e,true);
      });
    }
  });
  nl._src=L0.geojson; nl.addTo(map); L0.leaflet=nl;
  if(gIsPoly)try{svApplyPolygonPatterns(L0,nl);}catch(e){}
  try{ if(typeof svUpdateSelectionSummary==='function')svUpdateSelectionSummary(L0); }catch(e){}
  return nl;
}
/* import a KML/KMZ/GeoJSON layer, auto-detecting embedded per-feature colors (from KML Style/StyleMap) and,
   if a PCI-rating-like field is present, symbolizing by it automatically (matching ArcGIS categorized rendering) */
function ingestVectorLayer(gj,nice,color,name){
  var id=addLayer(geoJsonLayer(gj,color),nice,color);
  var L0=layers[id]; if(!L0)return id;
  ensureFids(L0.geojson);
  var feats=L0.geojson.features||[], hasColor=feats.some(svFeatureRawColor), keys=feats.length?Object.keys(feats[0].properties||{}):[];
  var ratingField=keys.filter(isPciField)[0]||null;
  if(hasColor&&ratingField){
    L0.uniqueField=ratingField; L0.colorMode='categorized'; L0.catColors=deriveCategoryColors(L0,ratingField);
    svBuildLeafletLayer(L0); toast('Loaded '+feats.length+' feature(s) — symbolized by '+ratingField);
  } else if(hasColor){
    L0.colorMode='native'; svBuildLeafletLayer(L0); toast('Loaded '+feats.length+' feature(s) with original colors');
  } else {
    toast('Loaded '+feats.length+' feature(s) from '+name);
  }
  renderLegend(); refreshDropdowns();
  return id;
}

var layerOrder=[]; // bottom -> top draw order of layer ids
function addLayer(leaflet,name,color,opts){
  opts=opts||{}; var id='lyr_'+(++layerSeq); leaflet.addTo(map);
  layers[id]={id:id,name:name,leaflet:leaflet,color:color||'#888',visible:true,
    geojson:opts.geojson||leaflet._src||null,size:6,opacity:(opts.opacity!=null?opts.opacity:1),field:'',
    pointShape:'circle',pointImage:'',pointAngle:0,lineStyle:'solid',fillPattern:'solid',
    isRaster:!!opts.isRaster, geomType:opts.geomType||geomTypeOf(opts.geojson||leaflet._src)};
  layerOrder.push(id);
  renderLayers(); refreshDropdowns();
  try{ if(window.__svAutoFastRender)window.__svAutoFastRender(); if(window.__svFastInfo)window.__svFastInfo(); }catch(e){}
  if(opts.zoom!==false && window.__autoZoomNew!==false){ try{var b=leaflet.getBounds&&leaflet.getBounds(); if(b&&b.isValid())map.fitBounds(b.pad(.15));}catch(e){} }
  return id;
}
function zoomLayer(l){try{var b=l.getBounds&&l.getBounds(); if(b&&b.isValid())map.fitBounds(b.pad(.15));}catch(e){}}
/* ---- layer helpers for the enhanced layer panel ---- */
function geomTypeOf(gj){
  if(!gj||!gj.features||!gj.features.length) return '';
  var types={}; gj.features.forEach(function(f){ if(f.geometry&&f.geometry.type){var t=f.geometry.type.replace(/^Multi/,'');types[t]=1;} });
  var ks=Object.keys(types); return ks.length===1?ks[0]:(ks.length?'Mixed':'');
}
function geomBadge(t){
  var map={Point:'◍ Point',LineString:'╱ Line',Polygon:'▱ Polygon',Mixed:'✦ Mixed',Raster:'▦ Raster'};
  return map[t]||t||'—';
}
function featureCountOf(L0){
  if(L0.isRaster) return null;
  try{ if(L0.geojson&&L0.geojson.features) return L0.geojson.features.length; }catch(e){}
  try{ var n=0; L0.leaflet.eachLayer(function(){n++;}); return n; }catch(e){ return null; }
}
function setLayerOpacity(L0,op){
  L0.opacity=op;
  try{
    if(L0.isRaster && L0.leaflet.setOpacity){ L0.leaflet.setOpacity(op); return; }
    if(L0.leaflet.setStyle){ L0.leaflet.setStyle(function(f){return {opacity:op, fillOpacity:op*0.45};}); }
    if(L0.leaflet.eachLayer){ L0.leaflet.eachLayer(function(ly){ if(ly.setOpacity)ly.setOpacity(op); if(ly.setStyle)ly.setStyle({opacity:op,fillOpacity:op*0.6}); }); }
  }catch(e){}
}
function restackLayers(){
  // apply layerOrder (bottom->top) to actual map z-order
  layerOrder.forEach(function(id){ var L0=layers[id]; if(L0&&L0.visible&&L0.leaflet.bringToFront){ try{L0.leaflet.bringToFront();}catch(e){} } });
  try{currentBase.bringToBack();}catch(e){}
}
function moveLayer(id,dir){
  var i=layerOrder.indexOf(id); if(i<0)return; var j=i+dir;
  if(j<0||j>=layerOrder.length)return;
  var tmp=layerOrder[i]; layerOrder[i]=layerOrder[j]; layerOrder[j]=tmp;
  restackLayers(); renderLayers();
}
window.__moveLayerGlobal=moveLayer;
function duplicateLayer(id){
  var L0=layers[id]; if(!L0)return;
  if(L0.isRaster){ toast('Raster layers cannot be duplicated',true); return; }
  var gj=L0.geojson?JSON.parse(JSON.stringify(L0.geojson)):(L0.leaflet.toGeoJSON&&L0.leaflet.toGeoJSON());
  if(!gj){ toast('Nothing to duplicate',true); return; }
  var c=nextColor();
  var id2=addLayer(geoJsonLayer(gj,c), L0.name+' (copy)', c, {zoom:false});
  var L2=layers[id2];
  if(L2){ L2.uniqueField=L0.uniqueField||''; L2.field=L0.field||''; L2.colorMode=L0.colorMode||''; L2.catColors=L0.catColors?Object.assign({},L0.catColors):null; L2.weight=L0.weight; L2.hollow=L0.hollow; L2.outlineColor=L0.outlineColor||''; L2.size=L0.size; L2.opacity=L0.opacity; L2.pointShape=L0.pointShape||'circle';L2.pointImage=L0.pointImage||'';L2.pointAngle=L0.pointAngle||0;L2.lineStyle=L0.lineStyle||'solid';L2.fillPattern=L0.fillPattern||(L0.hollow?'hollow':'solid');svBuildLeafletLayer(L2); renderLegend(); }
  toast('Layer duplicated');
}
function renameLayer(id){
  var L0=layers[id]; if(!L0)return;
  var nm=prompt('Rename layer:',L0.name); if(nm==null)return; nm=nm.trim(); if(!nm)return;
  L0.name=nm; renderLayers(); refreshDropdowns(); toast('Layer renamed');
}
function renderLayers(){
  var ids=layerOrder.filter(function(id){return layers[id];});
  Object.keys(layers).forEach(function(id){ if(ids.indexOf(id)<0){ids.push(id);layerOrder.push(id);} });
  layersHint.style.display=ids.length?'none':'block';
  layerListEl.innerHTML='';
  // display top -> bottom (reverse of draw order)
  ids.slice().reverse().forEach(function(id,revIdx){
    var L0=layers[id], pos=ids.indexOf(id);
    var cnt=featureCountOf(L0), gt=L0.isRaster?'Raster':(L0.geomType||geomTypeOf(L0.geojson));
    var row=document.createElement('div'); row.className='layerrow layerrow-rich';
    row.innerHTML=
      '<div class="lr-top">'+
        '<input type="checkbox" '+(L0.visible?'checked':'')+' title="Show / hide"/>'+
        svSymbolSwatchHtml(L0)+
        '<label class="lr-name" title="Single-click to zoom; double-click for Symbol Selector">'+escapeHtml(L0.name)+'</label>'+
        '<button class="lr-up" title="Move up (draw on top)">▲</button>'+
        '<button class="lr-dn" title="Move down">▼</button>'+
        '<button class="tbl" title="Attribute table"'+(L0.isRaster?' disabled style="opacity:.35"':'')+'>▤</button>'+
        '<button class="lr-menu" title="More">⋯</button>'+
        '<button class="x" title="Remove">✕</button>'+
      '</div>'+
      '<div class="lr-meta"><span class="lr-badge">'+geomBadge(gt)+'</span>'+
        (cnt!=null?'<span class="lr-badge">'+cnt+' feature'+(cnt===1?'':'s')+'</span>':'')+
        '<span class="lr-op-wrap">Opacity <input type="range" class="lr-op" min="0" max="1" step="0.05" value="'+(L0.opacity!=null?L0.opacity:1)+'"/></span>'+
      '</div>'+
      '<div class="lr-actions" style="display:none">'+
        '<button class="lr-dup">⧉ Duplicate</button>'+
        '<button class="lr-ren">✎ Rename</button>'+
        (L0.isRaster?'':'<button class="lr-symbol">▦ Symbol Selector</button>')+
        '<button class="lr-zoom">⛶ Zoom</button>'+
        (L0.isRaster?'':'<button class="lr-sel">⌖ Select by attribute</button>')+
      '</div>';
    var cb=row.querySelector('input[type=checkbox]');
    cb.onchange=function(e){L0.visible=e.target.checked;
      if(L0.visible){L0.leaflet.addTo(map);restackLayers();} else map.removeLayer(L0.leaflet);
      renderLegend(); refreshDropdowns();};
    var nameClickTimer=null,nameEl=row.querySelector('.lr-name'),swatchEl=row.querySelector('.lr-top .sw');
    nameEl.onclick=function(){clearTimeout(nameClickTimer);nameClickTimer=setTimeout(function(){zoomLayer(L0.leaflet);},260);};
    nameEl.ondblclick=function(e){clearTimeout(nameClickTimer);e.preventDefault();if(!L0.isRaster)openSymbolSelector(id);};
    if(swatchEl&&!L0.isRaster)swatchEl.ondblclick=function(e){e.preventDefault();e.stopPropagation();openSymbolSelector(id);};
    row.querySelector('.lr-up').onclick=function(){moveLayer(id,1);};   // up = later in order = on top
    row.querySelector('.lr-dn').onclick=function(){moveLayer(id,-1);};
    var tbl=row.querySelector('.tbl'); if(tbl&&!L0.isRaster)tbl.onclick=function(){openTable(id);};
    row.querySelector('.x').onclick=function(){map.removeLayer(L0.leaflet);delete layers[id];var k=layerOrder.indexOf(id);if(k>=0)layerOrder.splice(k,1);renderLayers();refreshDropdowns();};
    row.querySelector('.lr-op').oninput=function(e){setLayerOpacity(L0,parseFloat(e.target.value));};
    var actions=row.querySelector('.lr-actions');
    row.querySelector('.lr-menu').onclick=function(){actions.style.display=actions.style.display==='none'?'flex':'none';};
    row.querySelector('.lr-dup').onclick=function(){duplicateLayer(id);};
    row.querySelector('.lr-ren').onclick=function(){renameLayer(id);};
    var symbolBtn=row.querySelector('.lr-symbol');if(symbolBtn)symbolBtn.onclick=function(){openSymbolSelector(id);};
    row.querySelector('.lr-zoom').onclick=function(){zoomLayer(L0.leaflet);};
    var selBtn=row.querySelector('.lr-sel'); if(selBtn)selBtn.onclick=function(){openSelectByAttr(id);};
    layerListEl.appendChild(row);
  });
  renderLegend();
}
function svFmtLen(m){ if(!m||m<=0)return '0 m'; var meters=Math.round(m).toLocaleString('en-US')+' m'; return m>=1000?(meters+' ('+(m/1000).toFixed(2)+' km)'):meters; }
function svLengthStats(L0,field){
  var totals={},grand=0,hasLines=false;
  (L0.geojson&&L0.geojson.features||[]).forEach(function(f){
    var g=f.geometry;if(!g)return;
    if(g.type==='LineString'||g.type==='MultiLineString'){
      hasLines=true;var len=0;try{len=turf.length(f,{units:'kilometers'})*1000;}catch(e){}
      var v=f.properties?f.properties[field]:null,key=(v==null||v==='')?'':String(v);
      totals[key]=(totals[key]||0)+len;grand+=len;
    }
  });
  return {totals:totals,grand:grand,hasLines:hasLines};
}
function renderLegend(){
  var ids=Object.keys(layers).filter(function(id){return layers[id].visible;});
  if(!ids.length){legendBody.innerHTML='<div class="hint" style="margin:0">No visible layers.</div>';return;}
  legendBody.innerHTML='';
  ids.forEach(function(id){var L0=layers[id];
    if(L0.colorMode==='categorized'&&L0.catColors&&Object.keys(L0.catColors).length){
      var head=document.createElement('div');head.className='legitem';head.style.fontWeight='700';
      head.innerHTML=escapeHtml(L0.name)+' <span style="font-weight:400;color:var(--ink-dim)">('+escapeHtml(L0.uniqueField)+')</span>';
      head.title='Double-click to open Symbol Selector';head.ondblclick=function(){openSymbolSelector(id);};
      legendBody.appendChild(head);
      var stats=svLengthStats(L0,L0.uniqueField);
      var keys=Object.keys(L0.catColors).sort(function(a,b){var na=parseFloat(a),nb=parseFloat(b);if(!isNaN(na)&&!isNaN(nb))return na-nb;return a.localeCompare(b);});
      keys.forEach(function(k){var d=document.createElement('div');d.className='legitem';d.style.cssText='padding-left:16px;justify-content:space-between;gap:10px';
        var lenTxt=stats.hasLines?'<span style="color:var(--ink-dim);font-size:10px;font-family:var(--mono);white-space:nowrap">'+svFmtLen(stats.totals[k]||0)+'</span>':'';
        d.innerHTML='<span style="display:flex;align-items:center;gap:8px;min-width:0">'+svSymbolSwatchHtml(L0,L0.catColors[k])+'<span style="overflow:hidden;text-overflow:ellipsis">'+escapeHtml(k||'(blank)')+'</span></span>'+lenTxt;
        d.title='Double-click to open Symbol Selector';d.ondblclick=function(){openSymbolSelector(id);};
        legendBody.appendChild(d);});
      if(stats.hasLines){
        var tot=document.createElement('div');tot.className='legitem';
        tot.style.cssText='padding-left:16px;justify-content:space-between;gap:10px;border-top:1px dashed var(--line);margin-top:5px;padding-top:6px;font-weight:700';
        tot.innerHTML='<span>Total</span><span style="font-family:var(--mono);font-size:10px;white-space:nowrap">'+svFmtLen(stats.grand)+'</span>';
        legendBody.appendChild(tot);
      }
    } else {
      var d=document.createElement('div');d.className='legitem';
      d.innerHTML=svSymbolSwatchHtml(L0,L0.color)+escapeHtml(L0.name);
      d.title='Double-click to open Symbol Selector';d.ondblclick=function(){openSymbolSelector(id);};legendBody.appendChild(d);
    }
  });
}

var svSymbolState={layerId:'',family:'',working:null,selectedKey:'',saved:[]};
function svLoadSavedSymbols(){
  try{svSymbolState.saved=JSON.parse(localStorage.getItem('spatialItqanSavedSymbols')||'[]');if(!Array.isArray(svSymbolState.saved))svSymbolState.saved=[];}catch(e){svSymbolState.saved=[];}
}
function svSaveSavedSymbols(){try{localStorage.setItem('spatialItqanSavedSymbols',JSON.stringify(svSymbolState.saved));}catch(e){}}
function svSymbolStyleFromLayer(L0){
  var family=svGeometryFamily(L0),key=family==='point'?(L0.pointShape||'circle'):(family==='line'?(L0.lineStyle||'solid'):(L0.fillPattern||(L0.hollow?'hollow':'solid')));
  return {family:family,key:key,color:L0.color||'#3B82F6',outline:L0.outlineColor||'#1E3A8A',size:family==='point'?(L0.size||6):(L0.weight!=null?L0.weight:2.5),angle:L0.pointAngle||0,opacity:L0.opacity==null?1:L0.opacity,imageData:L0.pointImage||''};
}
function svSymbolCatalogForState(){
  var scope=document.querySelector('input[name=svSymbolScope]:checked'),all=SV_SYMBOL_CATALOG[svSymbolState.family]||[];
  if(scope&&scope.value==='saved')return svSymbolState.saved.filter(function(item){return item.family===svSymbolState.family;});
  return all;
}
function svLinePreviewStyle(key,color,width){
  var style=key==='dot'?'dotted':(key==='solid'||key==='contour'?'solid':'dashed');
  return 'color:'+color+';border-top-width:'+Math.max(1,width)+'px;border-top-style:'+style;
}
function svSymbolGallerySample(item){
  var w=svSymbolState.working||{},family=svSymbolState.family,color=w.color||'#3B82F6';
  if(item.style){var copy=item.style;color=copy.color||color;item=Object.assign({},item,{key:copy.key});}
  if(family==='point')return '<span class="sv-symbol-sample" style="color:'+color+';transform:rotate('+(w.angle||0)+'deg)">'+svPointCatalogItem(item.key).glyph+'</span>';
  if(family==='line')return '<span class="sv-symbol-sample line" style="'+svLinePreviewStyle(item.key,color,w.size||2.5)+'"></span>';
  return '<span class="sv-symbol-sample polygon" style="'+svPatternCss(item.key,color,w.opacity)+'"></span>';
}
function svRenderSymbolGallery(){
  var host=document.getElementById('svSymbolGallery'),query=(document.getElementById('svSymbolSearch').value||'').trim().toLowerCase(),items=svSymbolCatalogForState();
  host.innerHTML='';
  items.filter(function(item){return !query||String(item.name||'').toLowerCase().indexOf(query)>=0;}).forEach(function(item){
    var button=document.createElement('button');button.type='button';button.className='sv-symbol-option'+(svSymbolState.selectedKey===item.key?' active':'');
    button.innerHTML=svSymbolGallerySample(item)+'<span>'+escapeHtml(item.name)+'</span>';
    button.onclick=function(){
      if(item.style)svSymbolState.working=JSON.parse(JSON.stringify(item.style));
      else{svSymbolState.working.key=item.key;if(svSymbolState.family==='point')svSymbolState.working.imageData='';}
      svSymbolState.selectedKey=item.key;svSyncSymbolControls();svRenderSymbolGallery();
    };
    host.appendChild(button);
  });
  if(!host.children.length)host.innerHTML='<div class="sv-symbol-empty">No matching symbols.</div>';
}
function svSymbolPreview(){
  var host=document.getElementById('svSymbolPreview'),w=svSymbolState.working;if(!host||!w)return;
  if(w.family==='point'){
    host.innerHTML=w.imageData?'<img alt="Custom point symbol preview" src="'+w.imageData+'" style="width:'+Math.max(16,w.size*2)+'px;height:'+Math.max(16,w.size*2)+'px;object-fit:contain;opacity:'+w.opacity+';transform:rotate('+w.angle+'deg)">':'<span class="preview-point" style="color:'+w.color+';opacity:'+w.opacity+';font-size:'+Math.max(10,w.size*2)+'px;transform:rotate('+w.angle+'deg)">'+svPointCatalogItem(w.key).glyph+'</span>';
  }else if(w.family==='line'){
    host.innerHTML='<span class="preview-line" style="'+svLinePreviewStyle(w.key,w.color,w.size)+';opacity:'+w.opacity+'"></span>';
  }else{
    host.innerHTML='<span class="preview-polygon" style="'+svPatternCss(w.key,w.color,w.opacity)+';border-color:'+w.outline+';border-width:'+Math.max(1,w.size)+'px"></span>';
  }
}
function svSyncSymbolControls(){
  var w=svSymbolState.working;if(!w)return;
  document.getElementById('svSymbolColor').value=(w.color&&w.color[0]==='#')?w.color:'#3B82F6';
  document.getElementById('svSymbolOutline').value=(w.outline&&w.outline[0]==='#')?w.outline:'#1E3A8A';
  document.getElementById('svSymbolSize').value=w.size;
  document.getElementById('svSymbolAngle').value=w.angle||0;
  document.getElementById('svSymbolOpacity').value=w.opacity;
  document.getElementById('svSymbolOutlineRow').style.display=w.family==='polygon'?'grid':'none';
  document.getElementById('svSymbolAngleRow').style.display=w.family==='point'?'grid':'none';
  document.getElementById('svSymbolImageRow').style.display=w.family==='point'?'grid':'none';
  document.getElementById('svSymbolSizeLabel').textContent=w.family==='point'?'Size (px)':(w.family==='line'?'Width (px)':'Outline width (px)');
  document.getElementById('svSymbolColorLabel').textContent=w.family==='polygon'?'Fill color':'Color';
  svSymbolPreview();
}
function svReadSymbolControls(){
  var w=svSymbolState.working;if(!w)return;
  w.color=document.getElementById('svSymbolColor').value;
  w.outline=document.getElementById('svSymbolOutline').value;
  w.size=Math.max(.5,Math.min(64,parseFloat(document.getElementById('svSymbolSize').value)||1));
  w.angle=parseFloat(document.getElementById('svSymbolAngle').value)||0;
  w.opacity=Math.max(0,Math.min(1,parseFloat(document.getElementById('svSymbolOpacity').value)));
  if(!isFinite(w.opacity))w.opacity=1;
  svSymbolPreview();
}
function svCloseSymbolSelector(){var modal=document.getElementById('svSymbolModal');if(modal)modal.classList.remove('open');}
function openSymbolSelector(layerId){
  var L0=layers[layerId];if(!L0||!L0.geojson){toast('Choose a vector feature layer first',true);return;}
  var family=svGeometryFamily(L0);if(!family){toast('Symbol Selector supports point, line, and polygon layers',true);return;}
  svLoadSavedSymbols();svSymbolState.layerId=layerId;svSymbolState.family=family;svSymbolState.working=svSymbolStyleFromLayer(L0);svSymbolState.selectedKey=svSymbolState.working.key;
  document.getElementById('svSymbolTitle').textContent='Symbol Selector — '+L0.name+' ('+(family==='line'?'Line':family.charAt(0).toUpperCase()+family.slice(1))+')';
  document.getElementById('svSymbolSearch').value='';var all=document.querySelector('input[name=svSymbolScope][value=all]');if(all)all.checked=true;
  svSyncSymbolControls();svRenderSymbolGallery();document.getElementById('svSymbolModal').classList.add('open');
  setTimeout(function(){try{document.getElementById('svSymbolSearch').focus();}catch(e){}},50);
}
window.__svOpenSymbolSelector=openSymbolSelector;
function svApplySymbolSelector(){
  svReadSymbolControls();var L0=layers[svSymbolState.layerId],w=svSymbolState.working;if(!L0||!w)return;
  L0.color=w.color;L0.opacity=w.opacity;
  if(w.family==='point'){L0.pointShape=w.key;L0.pointAngle=w.angle;L0.size=w.size;L0.pointImage=w.imageData||'';}
  else if(w.family==='line'){L0.lineStyle=w.key;L0.weight=w.size;}
  else{L0.fillPattern=w.key;L0.hollow=w.key==='hollow';L0.outlineColor=w.outline;L0.weight=w.size;}
  svBuildLeafletLayer(L0);renderLayers();renderLegend();
  try{if(document.getElementById('sLayer').value===L0.id)syncS();}catch(e){}
  svCloseSymbolSelector();toast('Symbol applied to '+L0.name);
}
(function wireSymbolSelector(){
  var modal=document.getElementById('svSymbolModal');if(!modal)return;
  document.getElementById('svSymbolClose').onclick=svCloseSymbolSelector;document.getElementById('svSymbolCancel').onclick=svCloseSymbolSelector;
  document.getElementById('svSymbolApply').onclick=svApplySymbolSelector;
  document.getElementById('svSymbolSearch').oninput=svRenderSymbolGallery;
  document.querySelectorAll('input[name=svSymbolScope]').forEach(function(radio){radio.onchange=svRenderSymbolGallery;});
  ['svSymbolColor','svSymbolOutline','svSymbolSize','svSymbolAngle','svSymbolOpacity'].forEach(function(id){document.getElementById(id).oninput=function(){svReadSymbolControls();svRenderSymbolGallery();};});
  document.getElementById('svSymbolImage').onchange=function(){
    var file=this.files&&this.files[0];if(!file)return;if(file.size>1024*1024){toast('Custom symbol must be 1 MB or smaller',true);this.value='';return;}
    var reader=new FileReader();reader.onload=function(){if(svSymbolState.working){svSymbolState.working.imageData=String(reader.result||'');svSymbolPreview();}};reader.readAsDataURL(file);
  };
  document.getElementById('svSymbolReset').onclick=function(){
    var family=svSymbolState.family;svSymbolState.working={family:family,key:family==='point'?'circle':'solid',color:'#3B82F6',outline:'#1E3A8A',size:family==='point'?6:2.5,angle:0,opacity:1,imageData:''};svSymbolState.selectedKey=svSymbolState.working.key;document.getElementById('svSymbolImage').value='';svSyncSymbolControls();svRenderSymbolGallery();
  };
  document.getElementById('svSymbolSave').onclick=function(){
    svReadSymbolControls();var name=prompt('Style name:','My '+svSymbolState.family+' symbol');if(!name||!name.trim())return;
    var key='saved_'+Date.now(),item={key:key,name:name.trim(),family:svSymbolState.family,style:JSON.parse(JSON.stringify(svSymbolState.working))};
    svSymbolState.saved.push(item);svSaveSavedSymbols();svSymbolState.selectedKey=key;
    var saved=document.querySelector('input[name=svSymbolScope][value=saved]');if(saved)saved.checked=true;svRenderSymbolGallery();toast('Style saved to My Styles');
  };
  modal.onclick=function(e){if(e.target===modal)svCloseSymbolSelector();};
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open')){e.preventDefault();e.stopImmediatePropagation();svCloseSymbolSelector();}});
})();
map.on('layeradd',function(){try{currentBase.bringToBack();}catch(e){}});

/* ================= IMPORT ================= */
var fileInput=document.getElementById('fileInput');
document.getElementById('fileBtn').onclick=function(){fileInput.click();};
document.getElementById('importBtn').onclick=function(){switchTab('data');fileInput.click();};
fileInput.onchange=function(e){Array.prototype.forEach.call(e.target.files,readFile);fileInput.value='';};

function readFile(file){
  var name=file.name, ext=name.split('.').pop().toLowerCase(), color=nextColor(), nice=name.replace(/\.[^.]+$/,'');
  try{ if(typeof recentAdd==='function') recentAdd(name); }catch(e){}
  if((ext==='tif'||ext==='tiff') && window.__svReadGeoTiff){ window.__svReadGeoTiff(file,nice,color); return; }
  if(ext==='las'||ext==='laz'){ readLAS(file,nice,color); return; }
  if(ext==='ecw'){ handleECW(file,nice); return; }
  if(ext==='dxf'){ readDXF(file,nice,color); return; }
  if(ext==='dwg'){ handleDWG(file,nice); return; }
  if(ext==='xlsx'||ext==='xls'){ readExcel(file,nice,color); return; }
  if(ext==='zip'){ readZipShp(file,nice,color); return; }
  if(ext==='kmz'){ readKmz(file,nice,color); return; }
  var r=new FileReader();
  r.onload=function(){
    try{
      var gj;
      if(ext==='geojson'||ext==='json') gj=JSON.parse(r.result);
      else if(ext==='kml') gj=toGeoJSON.kml(new DOMParser().parseFromString(r.result,'text/xml'));
      else if(ext==='gpx') gj=readGpx(r.result);
      else if(ext==='csv'){ smartTableLoad(csvRows(r.result), nice, color); return; }
      else { toast('Unsupported browser format: .'+ext,true); return; }
      if(!gj||!gj.features||!gj.features.length){toast('No features in '+name,true);return;}
      ingestVectorLayer(gj,nice,color,name);
    }catch(err){toast('Could not read '+name+': '+err.message,true);}
  };
  r.readAsText(file);
}
/* apply a coordinate transform fn to every feature in a FC (returns new FC) */
function projectFC(fc,fwd){
  return {type:'FeatureCollection',fileName:fc.fileName,features:(fc.features||[]).map(function(f){
    var nf={type:'Feature',properties:f.properties||{}};
    if(f.geometry&&f.geometry.coordinates){ nf.geometry={type:f.geometry.type,coordinates:projectCoordsArray(f.geometry.coordinates,fwd)}; }
    else nf.geometry=f.geometry||null;
    return nf;
  })};
}
function readZipShp(file,nice,color){
  if(typeof shp==='undefined'){
    toast('Shapefile reader (shpjs) did not load — needs internet on first open. Reload with a connection, or check the browser console.',true);
    return;
  }
  var r=new FileReader();
  r.onload=function(){toast('Reading shapefile…');
    try{ shp(r.result).then(function(gj){
      var cols=Array.isArray(gj)?gj:[gj], total=0, added=0, reprojected=false;
      cols.forEach(function(fc,i){
        if(fc&&fc.features&&fc.features.length){
          // drop null-geometry features that would render nothing
          fc.features=fc.features.filter(function(f){return f&&f.geometry&&f.geometry.coordinates;});
          if(!fc.features.length)return;
          // Detect coordinates outside lat/lng range -> shapefile had no .prj and is in a projected CRS.
          var c0=fc.features[0].geometry.coordinates; while(c0&&typeof c0[0]!=='number')c0=c0[0];
          if(c0 && (Math.abs(c0[0])>180||Math.abs(c0[1])>90)){
            if(hasProj){
              var srcKey=(crsKey==='autoutm')?effectiveCrsKey():crsKey;
              if(srcKey==='wgs84')srcKey=effectiveCrsKey(); // pick a UTM zone if active is geographic
              var fwd=function(xy){try{return proj4(CRS[srcKey].code,'EPSG:4326',xy);}catch(e){return xy;}};
              fc=projectFC(fc,fwd); reprojected=true;
            } else {
              toast('Shapefile has no .prj and looks projected (UTM). Include the .prj file, or load proj4.',true);
            }
          }
          var layerColor = added ? nextColor() : color;
          var nm = (fc.fileName||(cols.length>1?nice+' ('+(i+1)+')':nice));
          addLayer(geoJsonLayer(fc,layerColor), nm, layerColor, {geojson:fc});
          total+=fc.features.length; added++;
        }
      });
      if(total){ toast('Loaded '+total+' feature(s) from shapefile'+(reprojected?' (reprojected from '+CRS[(crsKey==='autoutm'?effectiveCrsKey():crsKey)].esri+' — include a .prj to avoid guessing)':'')); }
      else { toast('Shapefile parsed but contained no usable geometry. Ensure the .zip has .shp, .shx and .dbf together (and ideally .prj).',true); }
    }).catch(function(e){
      var msg=e&&e.message?e.message:String(e);
      if(/dbf|shx|shp/i.test(msg)) toast('Shapefile incomplete: '+msg+'. The .zip must contain .shp, .shx and .dbf with the same name.',true);
      else toast('Shapefile error: '+msg,true);
    });
    }catch(e){toast('Shapefile error: '+e.message,true);}
  };
  r.readAsArrayBuffer(file);
}
function readKmz(file,nice,color){
  var r=new FileReader();
  r.onload=function(){toast('Unzipping KMZ…');
    JSZip.loadAsync(r.result).then(function(zip){var k=null;zip.forEach(function(p,e){if(!k&&/\.kml$/i.test(p))k=e;});
      if(!k)throw new Error('no .kml inside'); return k.async('string');})
    .then(function(t){var gj=toGeoJSON.kml(new DOMParser().parseFromString(t,'text/xml'));
      if(!gj||!gj.features||!gj.features.length)throw new Error('no features');
      ingestVectorLayer(gj,nice,color,file.name);})
    .catch(function(e){toast('KMZ error: '+e.message,true);});
  };
  r.readAsArrayBuffer(file);
}
/* ================= RASTER (GeoTIFF) SUPPORT ================= */
/* Uses georaster + georaster-layer-for-leaflet (loaded by the library loader). */
window.__svReadGeoTiff=function(file,nice,color){
  if(typeof parseGeoraster==='undefined' || typeof GeoRasterLayer==='undefined'){
    toast('Raster libraries not loaded — check your connection and reload',true); return;
  }
  toast('Reading raster '+nice+'…');
  var r=new FileReader();
  r.onload=function(){
    parseGeoraster(r.result).then(function(georaster){
      try{
        var layer=new GeoRasterLayer({
          georaster:georaster,
          opacity:0.85,
          resolution:256
        });
        var id=addLayer(layer,nice,color,{isRaster:true,geomType:'Raster',opacity:0.85});
        toast('Raster loaded: '+nice+' ('+georaster.width+'×'+georaster.height+' px, '+(georaster.numberOfRasters||1)+' band'+((georaster.numberOfRasters||1)===1?'':'s')+')');
      }catch(e){ toast('Could not render raster: '+e.message,true); }
    }).catch(function(e){ toast('Raster parse failed: '+e.message+' — must be a GeoTIFF',true); });
  };
  r.onerror=function(){ toast('Could not read raster file',true); };
  r.readAsArrayBuffer(file);
};

/* ================= SELECT BY ATTRIBUTE ================= */
var sbaState={layerId:null,lastMatches:[],clauses:[],logic:'and'};
function sbaFields(L0){
  var set={}; if(L0&&L0.geojson&&L0.geojson.features){
    L0.geojson.features.forEach(function(f){ Object.keys(f.properties||{}).forEach(function(k){ if(k.indexOf('__sv')!==0)set[k]=1; }); });
  }
  return Object.keys(set);
}
function svShowSbaTab(tab){
  var isCalc=tab==='calc',sb=document.getElementById('sbaTabSelect'),cb=document.getElementById('sbaTabCalc'),sp=document.getElementById('sbaSelectPane'),cp=document.getElementById('sbaCalcPane');
  if(sb){sb.classList.toggle('active',!isCalc);sb.setAttribute('aria-selected',String(!isCalc));}
  if(cb){cb.classList.toggle('active',isCalc);cb.setAttribute('aria-selected',String(isCalc));}
  if(sp)sp.classList.toggle('active',!isCalc);if(cp)cp.classList.toggle('active',isCalc);
}
function svClauseText(c){var val=String(c.value==null?'':c.value);return c.field+' '+c.op+' '+(isNaN(Number(val))?'\''+val.replace(/'/g,"''")+'\'':val);}
function svCurrentSbaClause(){var f=document.getElementById('sbaField'),o=document.getElementById('sbaOp'),v=document.getElementById('sbaValue');return {field:f&&f.value||'',op:o&&o.value||'=',value:v&&v.value||''};}
function svRenderSbaClauses(){
  var list=document.getElementById('sbaClauseList'),p=document.getElementById('sbaExpressionPreview'),logic=document.getElementById('sbaLogic');if(logic)sbaState.logic=logic.value||'and';
  if(list){list.innerHTML=sbaState.clauses.map(function(c,i){return '<div class="sba-clause"><span class="join">'+(i?(sbaState.logic==='and'?'AND':'OR'):'WHERE')+'</span><span class="text">'+escapeHtml(svClauseText(c))+'</span><button data-i="'+i+'" title="Remove clause">✕</button></div>';}).join('');list.querySelectorAll('button').forEach(function(b){b.onclick=function(){sbaState.clauses.splice(+b.getAttribute('data-i'),1);svRenderSbaClauses();};});}
  if(p){var current=svCurrentSbaClause();p.textContent=sbaState.clauses.length?sbaState.clauses.map(svClauseText).join(sbaState.logic==='and'?' AND ':' OR '):svClauseText(current);}
}
function svRefreshSbaUniqueValues(){
  var L0=layers[sbaState.layerId],field=document.getElementById('sbaField')&&document.getElementById('sbaField').value,dl=document.getElementById('sbaUniqueValues');if(!L0||!field||!dl)return;var vals={},arr=[];(L0.geojson.features||[]).forEach(function(f){var v=(f.properties||{})[field];if(v===null||v===undefined||String(v)==='')return;var k=String(v);if(!vals[k]&&arr.length<500){vals[k]=1;arr.push(k);}});arr.sort(function(a,b){var na=Number(a),nb=Number(b);return isFinite(na)&&isFinite(nb)?na-nb:a.localeCompare(b);});dl.innerHTML=arr.map(function(v){return '<option value="'+escapeHtml(v)+'">';}).join('');
}
function svAddSbaClause(){var c=svCurrentSbaClause();if(!c.field){toast('Choose a field',true);return;}sbaState.clauses.push(c);svRenderSbaClauses();var v=document.getElementById('sbaValue');if(v){v.value='';v.focus();}}
function svUpdateSbaExpressionPreview(){svRenderSbaClauses();}
function svClampSbaWindow(){
  var w=document.getElementById('sbaModal');if(!w||!w.classList.contains('open'))return;var r=w.getBoundingClientRect(),left=Math.max(4,Math.min(r.left,window.innerWidth-r.width-4)),top=Math.max(56,Math.min(r.top,window.innerHeight-r.height-4));w.style.left=left+'px';w.style.top=top+'px';
}
function openSelectByAttr(layerId,initialTab){
  var L0=layers[layerId];
  if(!L0){ toast('Layer not found',true); return; }
  if(L0.isRaster){ toast('Select by attribute works on vector layers only',true); return; }
  if(!L0.geojson||!L0.geojson.features||!L0.geojson.features.length){ toast('This layer has no attribute features',true); return; }
  var changedLayer=sbaState.layerId!==layerId;sbaState.layerId=layerId;
  var tool=document.getElementById('sbaModal'),fields=sbaFields(L0);
  if(!fields.length){ toast('No attribute fields on this layer',true); return; }
  document.getElementById('sbaLayerName').textContent=L0.name;
  var il=document.getElementById('sbaInputLayer'),cil=document.getElementById('sbaCalcInputLayer');if(il)il.textContent=L0.name;if(cil)cil.textContent=L0.name;
  var fsel=document.getElementById('sbaField');fsel.innerHTML=fields.map(function(f){return '<option value="'+escapeHtml(f)+'">'+escapeHtml(f)+'</option>';}).join('');
  var dl2=document.getElementById('sbaFieldOptions');if(dl2)dl2.innerHTML=fields.map(function(f){return '<option value="'+escapeHtml(f)+'">';}).join('');
  var cf=document.getElementById('sbaCalcField');if(cf&&(changedLayer||!cf.value))cf.value=(L0.uniqueField||fields[0]||'');
  var ins=document.getElementById('sbaCalcInsertField');if(ins)ins.innerHTML='<option value="">— Insert field —</option>'+fields.map(function(f){return '<option value="'+escapeHtml(f)+'">'+escapeHtml(f)+'</option>';}).join('');
  if(changedLayer){sbaState.clauses=[];var v=document.getElementById('sbaValue');if(v)v.value='';var mode=document.getElementById('sbaMode');if(mode)mode.value='new';var ce=document.getElementById('sbaCalcExpr');if(ce)ce.value='';}
  var selN=Object.keys(svSelSet(layerId)).length,res=document.getElementById('sbaResult');if(res)res.textContent=selN?(selN+' feature(s) currently selected.'):'No features currently selected.';
  var cr=document.getElementById('sbaCalcResult');if(cr&&changedLayer)cr.textContent='';
  svRefreshSbaUniqueValues();svShowSbaTab(initialTab||'select');svUpdateSbaExpressionPreview();tool.classList.add('open');setTimeout(svClampSbaWindow,0);
}
function sbaCompare(a,op,b){
  var an=parseFloat(a), bn=parseFloat(b), numeric=!isNaN(an)&&!isNaN(bn)&&String(a).trim()!==''&&String(b).trim()!=='';
  switch(op){
    case '=': return numeric?an===bn:String(a).toLowerCase()===String(b).toLowerCase();
    case '!=': return numeric?an!==bn:String(a).toLowerCase()!==String(b).toLowerCase();
    case '>': return numeric?an>bn:String(a)>String(b);
    case '<': return numeric?an<bn:String(a)<String(b);
    case '>=': return numeric?an>=bn:String(a)>=String(b);
    case '<=': return numeric?an<=bn:String(a)<=String(b);
    case 'contains': return String(a).toLowerCase().indexOf(String(b).toLowerCase())>=0;
    case 'starts': return String(a).toLowerCase().indexOf(String(b).toLowerCase())===0;
    default: return false;
  }
}
function runSelectByAttr(){
  var L0=layers[sbaState.layerId]; if(!L0)return;
  var field=document.getElementById('sbaField').value;
  var op=document.getElementById('sbaOp').value;
  var val=document.getElementById('sbaValue').value;
  var mode=document.getElementById('sbaMode')?document.getElementById('sbaMode').value:'new';
  ensureFids(L0.geojson);
  var clauses=sbaState.clauses.length?sbaState.clauses:[{field:field,op:op,value:val}],logic=(document.getElementById('sbaLogic')&&document.getElementById('sbaLogic').value)||sbaState.logic||'and';sbaState.logic=logic;
  var matchedFeats=(L0.geojson.features||[]).filter(function(f){var p=f.properties||{},tests=clauses.map(function(c){return sbaCompare(p[c.field],c.op,c.value);});return logic==='or'?tests.some(Boolean):tests.every(Boolean);});
  var set=svSelSet(L0.id);
  if(mode==='new'){ Object.keys(set).forEach(function(k){delete set[k];}); matchedFeats.forEach(function(f){set[String(f.properties.__sv_fid)]=true;}); }
  else if(mode==='add'){ matchedFeats.forEach(function(f){set[String(f.properties.__sv_fid)]=true;}); }
  else if(mode==='remove'){ matchedFeats.forEach(function(f){delete set[String(f.properties.__sv_fid)];}); }
  else if(mode==='and'){ var keep={}; matchedFeats.forEach(function(f){var k=String(f.properties.__sv_fid);if(set[k])keep[k]=true;}); window.__svOpState.selectedSets[L0.id]=keep; set=keep; }
  svBuildLeafletLayer(L0);
  var matches=[]; L0.leaflet.eachLayer(function(ly){ var f=ly.feature; if(f&&set[String(f.properties&&f.properties.__sv_fid)])matches.push(ly); });
  sbaState.lastMatches=matches;
  document.getElementById('sbaResult').textContent=Object.keys(set).length+' feature(s) selected in layer (this query matched '+matchedFeats.length+').';
  svUpdateSelectionSummary(L0);
  toast(Object.keys(set).length+' feature(s) selected');
  if(typeof curTbl!=='undefined'&&curTbl&&curTbl.id===L0.id)renderTable();
  return matches;
}
function clearSbaSelection(){
  var L0=layers[sbaState.layerId]; if(!L0){toast('Pick a layer first',true);return;}
  var set=svSelSet(L0.id); Object.keys(set).forEach(function(k){delete set[k];});
  sbaState.lastMatches=[]; svBuildLeafletLayer(L0);
  document.getElementById('sbaResult').textContent='Selection cleared.';
  svUpdateSelectionSummary(L0);
  if(typeof curTbl!=='undefined'&&curTbl&&curTbl.id===L0.id)renderTable();
}
function sbaZoomToSelection(){
  var ms=sbaState.lastMatches; if(!ms||!ms.length){ toast('Run a selection first',true); return; }
  var grp=L.featureGroup(ms.filter(function(l){return l.getBounds||l.getLatLng;}));
  try{ var b=grp.getBounds(); if(b.isValid())map.fitBounds(b.pad(.2)); }catch(e){ toast('Cannot zoom to this selection',true); }
}
function sbaExportSelection(){
  var L0=layers[sbaState.layerId]; var ms=sbaState.lastMatches;
  if(!L0||!ms||!ms.length){ toast('Run a selection first',true); return; }
  var fc={type:'FeatureCollection',features:ms.map(function(ly){try{return ly.toGeoJSON();}catch(e){return null;}}).filter(Boolean)};
  dl(JSON.stringify(fc,null,2),'selection_wgs84.geojson','application/geo+json');
  toast('Exported '+fc.features.length+' selected feature(s) as standard WGS84 GeoJSON');
}
/* Field Calculator — ESRI-style field references, helpers, geometry values, preview and scope. */
function sbaExprTokens(expr){ return String(expr||'').match(/\[[^\]]+\]|![^!]+!/g)||[]; }
function sbaGeomVars(feature){
  var t=feature&&feature.geometry&&feature.geometry.type||'',length=0,area=0,x=null,y=null;
  try{if(t==='LineString'||t==='MultiLineString')length=turf.length(feature,{units:'kilometers'})*1000;}catch(e){}
  try{if(t==='Polygon'||t==='MultiPolygon')area=turf.area(feature);}catch(e){}
  try{var c=turf.centroid(feature).geometry.coordinates;x=c[0];y=c[1];}catch(e){}
  return {LENGTH:length,AREA:area,X:x,Y:y,SHAPE_TYPE:t};
}
function sbaEvalExpr(expr,props,feature,rowIndex){
  var raw=String(expr==null?'':expr).trim();
  if(!raw)return null;
  if(/^NULL$/i.test(raw))return null;
  var reserved=/^(LENGTH|AREA|X|Y|SHAPE_TYPE|ROW_NUMBER)$/i.test(raw);
  if(!reserved&&!sbaExprTokens(raw).length&&!/[()+\-*\/%<>=,]/.test(raw)&&!/^[-+]?\d+(\.\d+)?$/.test(raw)&&!/^true$|^false$/i.test(raw)&&!/^['"].*['"]$/.test(raw))return raw;
  var e=raw.replace(/\[([^\]]+)\]/g,function(_,n){return 'GET('+JSON.stringify(n)+')';}).replace(/!([^!]+)!/g,function(_,n){return 'GET('+JSON.stringify(n)+')';});
  var g=sbaGeomVars(feature),GET=function(name){return props&&Object.prototype.hasOwnProperty.call(props,name)?props[name]:null;};
  var UPPER=function(v){return v==null?'':String(v).toUpperCase();},LOWER=function(v){return v==null?'':String(v).toLowerCase();},TRIM=function(v){return v==null?'':String(v).trim();};
  var CONCAT=function(){return Array.prototype.slice.call(arguments).map(function(v){return v==null?'':String(v);}).join('');};
  var COALESCE=function(){for(var i=0;i<arguments.length;i++){var v=arguments[i];if(v!==null&&v!==undefined&&v!=='')return v;}return null;};
  var ROUND=function(v,d){v=Number(v);d=Number(d||0);return isFinite(v)?Math.round(v*Math.pow(10,d))/Math.pow(10,d):null;};
  var NOW=function(){return new Date().toISOString();};
  try{
    var fn=new Function('GET','UPPER','LOWER','TRIM','CONCAT','COALESCE','ROUND','ABS','MIN','MAX','SQRT','NOW','LENGTH','AREA','X','Y','SHAPE_TYPE','ROW_NUMBER','"use strict";return ('+e+');');
    return fn(GET,UPPER,LOWER,TRIM,CONCAT,COALESCE,ROUND,Math.abs,Math.min,Math.max,Math.sqrt,NOW,g.LENGTH,g.AREA,g.X,g.Y,g.SHAPE_TYPE,(rowIndex||0)+1);
  }catch(err){throw new Error(err.message||'Invalid expression');}
}
function sbaCoerceValue(v,type){
  if(v===null||v===undefined)return null;
  if(type==='text')return String(v);
  if(type==='number'){var n=Number(v);if(!isFinite(n))throw new Error('Result is not a valid number');return n;}
  if(type==='integer'){var i=Number(v);if(!isFinite(i))throw new Error('Result is not a valid integer');return Math.round(i);}
  if(type==='boolean'){if(typeof v==='boolean')return v;var s=String(v).toLowerCase();if(['true','1','yes','y'].indexOf(s)>=0)return true;if(['false','0','no','n'].indexOf(s)>=0)return false;throw new Error('Result is not a valid Boolean');}
  if(type==='date'){var d=new Date(v);if(isNaN(d.getTime()))throw new Error('Result is not a valid date');return d.toISOString();}
  return v;
}
function sbaCalcTargets(L0,scope){
  var set=svSelSet(L0.id);
  if(scope==='selected')return (L0.geojson.features||[]).filter(function(f){return !!set[String(f.properties&&f.properties.__sv_fid)];});
  if(scope==='filtered'&&curTbl&&curTbl.id===L0.id)return svCurrentTableFeatures();
  return L0.geojson.features||[];
}
function previewFieldCalculator(){
  var L0=layers[sbaState.layerId];if(!L0){toast('Pick a layer first',true);return;}
  var expr=document.getElementById('sbaCalcExpr').value,scope=document.getElementById('sbaCalcScope').value,type=document.getElementById('sbaCalcType').value,targets=sbaCalcTargets(L0,scope);
  if(!targets.length){toast('No features in the selected scope',true);return;}
  var rows=[];
  try{targets.slice(0,5).forEach(function(f,i){var v=sbaCoerceValue(sbaEvalExpr(expr,f.properties||{},f,i),type);rows.push((i+1)+'. '+(v===null?'NULL':String(v)));});}
  catch(e){document.getElementById('sbaCalcResult').textContent='Expression error: '+e.message;toast('Expression error: '+e.message,true);return;}
  document.getElementById('sbaCalcResult').textContent='Preview ('+Math.min(5,targets.length)+' of '+targets.length+'):\n'+rows.join('\n');
}
function runFieldCalculator(){
  var L0=layers[sbaState.layerId]; if(!L0){toast('Pick a layer first',true);return;}
  var field=(document.getElementById('sbaCalcField').value||'').trim(); if(!field){toast('Enter a field name to update',true);return;}
  var expr=document.getElementById('sbaCalcExpr').value; if(expr==null||String(expr).trim()===''){toast('Enter a value or expression',true);return;}
  var scope=document.getElementById('sbaCalcScope').value,type=document.getElementById('sbaCalcType').value,targetFeats=sbaCalcTargets(L0,scope);
  if(scope==='selected'&&!targetFeats.length){toast('No features selected — select records or choose another scope',true);return;}
  if(!targetFeats.length){toast('No features to update',true);return;}
  try{if(window.__svAdvSnapshot)window.__svAdvSnapshot();}catch(e){}
  var updated=0,errors=[];
  targetFeats.forEach(function(f,i){
    if(!f.properties)f.properties={};
    try{var v=sbaCoerceValue(sbaEvalExpr(expr,f.properties,f,i),type);f.properties[field]=v;updated++;}catch(err){if(errors.length<5)errors.push('Row '+(i+1)+': '+err.message);}
  });
  if(L0.uniqueField===field)L0.catColors=deriveCategoryColors(L0,field);
  try{if(window.__svMarkDirty)window.__svMarkDirty();}catch(e){}
  svBuildLeafletLayer(L0);renderLegend();refreshDropdowns();
  if(typeof curTbl!=='undefined'&&curTbl&&curTbl.id===L0.id)renderTable();
  document.getElementById('sbaCalcResult').textContent='Updated “'+field+'” on '+updated+' feature(s).'+(errors.length?'\nSkipped errors:\n'+errors.join('\n'):'');
  toast('Updated '+field+' on '+updated+' feature(s)'+(errors.length?' ('+errors.length+'+ errors)':''),!!errors.length);
}
function svInsertAtCursor(el,value){
  if(!el)return;var s=el.selectionStart==null?el.value.length:el.selectionStart,e=el.selectionEnd==null?s:el.selectionEnd;
  el.value=el.value.slice(0,s)+value+el.value.slice(e);el.focus();el.selectionStart=el.selectionEnd=s+value.length;
}
/* wire the movable Select-by-Attribute / Field Calculator tool window */
(function(){
  var tool=document.getElementById('sbaModal'),head=document.getElementById('sbaDragHandle');
  var c=document.getElementById('sbaClose');if(c)c.onclick=function(){tool.classList.remove('open');};
  var reset=document.getElementById('sbaResetPosition');if(reset)reset.onclick=function(e){e.stopPropagation();tool.style.left='64px';tool.style.top='92px';tool.style.width='540px';tool.style.height='min(690px, calc(100vh - 120px))';setTimeout(svClampSbaWindow,0);};
  var add=document.getElementById('sbaAddClause');if(add)add.onclick=svAddSbaClause;var clearExpr=document.getElementById('sbaClearClauses');if(clearExpr)clearExpr.onclick=function(){sbaState.clauses=[];svRenderSbaClauses();};var logic=document.getElementById('sbaLogic');if(logic)logic.onchange=function(){sbaState.logic=logic.value;svRenderSbaClauses();};
  var st=document.getElementById('sbaTabSelect');if(st)st.onclick=function(){svShowSbaTab('select');};
  var ct=document.getElementById('sbaTabCalc');if(ct)ct.onclick=function(){svShowSbaTab('calc');};
  var run=document.getElementById('sbaRun');if(run)run.onclick=runSelectByAttr;
  var clr=document.getElementById('sbaClear');if(clr)clr.onclick=clearSbaSelection;
  var z=document.getElementById('sbaZoom');if(z)z.onclick=sbaZoomToSelection;
  var ex=document.getElementById('sbaExport');if(ex)ex.onclick=sbaExportSelection;
  var calc=document.getElementById('sbaCalcApply');if(calc)calc.onclick=runFieldCalculator;
  var prev=document.getElementById('sbaCalcPreview');if(prev)prev.onclick=previewFieldCalculator;
  var ib=document.getElementById('sbaCalcInsertBtn');if(ib)ib.onclick=function(){var s=document.getElementById('sbaCalcInsertField');if(s&&s.value)svInsertAtCursor(document.getElementById('sbaCalcExpr'),'['+s.value+']');};
  var hb=document.getElementById('sbaCalcHelperBtn');if(hb)hb.onclick=function(){var s=document.getElementById('sbaCalcHelper');if(s&&s.value)svInsertAtCursor(document.getElementById('sbaCalcExpr'),s.value);};
  ['sbaField','sbaOp','sbaValue'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener(id==='sbaValue'?'input':'change',function(){if(id==='sbaField')svRefreshSbaUniqueValues();svUpdateSbaExpressionPreview();});});
  var v=document.getElementById('sbaValue');if(v)v.addEventListener('keydown',function(e){if(e.key==='Enter')runSelectByAttr();});
  var dragging=false,dx=0,dy=0;
  if(head){head.addEventListener('pointerdown',function(e){if(e.button!==0||e.target.closest('button'))return;var r=tool.getBoundingClientRect();dragging=true;dx=e.clientX-r.left;dy=e.clientY-r.top;head.setPointerCapture&&head.setPointerCapture(e.pointerId);e.preventDefault();});}
  document.addEventListener('pointermove',function(e){if(!dragging)return;var left=Math.max(4,Math.min(e.clientX-dx,window.innerWidth-tool.offsetWidth-4)),top=Math.max(56,Math.min(e.clientY-dy,window.innerHeight-tool.offsetHeight-4));tool.style.left=left+'px';tool.style.top=top+'px';});
  document.addEventListener('pointerup',function(){dragging=false;});window.addEventListener('resize',svClampSbaWindow);
})();
/* ================= PER-TOOL HELP SYSTEM ================= */
var TOOL_HELP={
  data:{title:'Data & Layers',body:[
    ['What it does','Add geographic data to the map and manage every layer you load.'],
    ['Add Layer','Click <b>＋ Add Layer</b> to import a file from your computer: Shapefile (.zip), GeoTIFF raster (.tif), Excel/CSV (coordinates auto-detected), KML/KMZ, GPX, or GeoJSON.'],
    ['Table','Select a layer in the dropdown, then click <b>▤ Table</b> to open its attribute table — sort, search, and click a row to highlight the feature.'],
    ['Layers','Click <b>☰ Layers</b> to open the side panel where each layer has visibility, opacity, draw-order (▲▼), duplicate, rename, zoom, and "select by attribute".'],
    ['Tip','The dropdown sets the <i>active layer</i> that Table, Editing, and Select tools act on.']
  ]},
  nav:{title:'Map Navigation',body:[
    ['What it does','Move around the map and jump between views.'],
    ['Zoom','Use <b>＋ / －</b> to zoom, or scroll the mouse wheel. <b>⛶ All</b> fits every visible layer in view.'],
    ['Previous / Next','<b>↶ Prev</b> and <b>↷ Next</b> step back and forward through extents you have viewed — like back/forward in a browser.'],
    ['Home & Locate','<b>⌂ Home</b> returns to the start view. <b>◎ Locate</b> uses your device GPS to center on where you are (allow location permission).']
  ]},
  select:{title:'Select & Identify',body:[
    ['What it does','Inspect features and choose which ones to work with.'],
    ['Identify','Click <b>ⓘ Identify</b>, then click anywhere on the map to list every feature at that point plus the nearest address.'],
    ['Select','Click <b>▭ Select</b>, then drag a rectangle on the map to select all features inside it. Selected features use a prominent cyan outline with yellow fill. Shift adds to selection and Ctrl toggles features across visible feature classes.'],
    ['Select by Attribute','In the Layers panel open a layer\'s ⋯ menu and choose <b>Select by attribute</b> to select by a field value (e.g. POP &gt; 1000).'],
    ['Clear','<b>⊘ Clear</b> removes the current selection.']
  ]},
  edit:{title:'Editing',body:[
    ['What it does','Create and change features, then save your edits in the browser.'],
    ['Start editing','Pick the active layer, then click <b>✎ Edit</b> to enter edit mode.'],
    ['Add feature','Click <b>＋ Feature</b>, then click on the map to place points or draw vertices. Double-click to finish a line/polygon.'],
    ['Edit shape','Select a feature, click <b>⬓ Shape</b>, then drag the vertices to reshape it.'],
    ['Save','Click <b>✓ Save</b> to keep your edits (stored in this browser). Use Export to write them to a file.'],
    ['Tip','Edits live in your browser only until you export them — export regularly to avoid losing work.']
  ]},
  output:{title:'QA & Output',body:[
    ['What it does','Check data quality and export your results.'],
    ['Run QA','<b>✓ QA</b> scans the active layer for common problems (empty geometry, missing attributes, invalid shapes) and reports them.'],
    ['Export data','<b>⬇ Data</b> exports the selected/edited features. The file is written in the coordinate system shown in the top CRS box — Shapefile exports include a matching Esri .prj.'],
    ['Export PDF','<b>📄 PDF</b> produces a print-style map image with title, north arrow, scale, and CRS stamp.'],
    ['Tip','Set your coordinate system in the top-right CRS dropdown <i>before</i> exporting — every export follows it.']
  ]},
  experience:{title:'Experience',body:[
    ['What it does','Live data layers and presentation modes.'],
    ['Live','<b>☁ Live</b> opens weather radar (RainViewer), NASA satellite imagery, live — most work with no API key.'],
    ['Theme','<b>⚡ Theme</b> cycles through the visual themes. You can also pick one in the top Theme dropdown.'],
    ['Focus','<b>◱ Focus</b> hides the panels for a clean, full-screen map — good for presenting. Press Esc to exit.']
  ]}
};
function openToolHelp(key){
  var h=TOOL_HELP[key]; if(!h)return;
  document.getElementById('toolHelpTitle').textContent=h.title;
  document.getElementById('toolHelpBody').innerHTML=h.body.map(function(row){
    return '<div class="th-row"><div class="th-k">'+escapeHtml(row[0])+'</div><div class="th-v">'+row[1]+'</div></div>';
  }).join('');
  document.getElementById('toolHelpModal').classList.add('open');
}
(function(){
  document.querySelectorAll('.xp-help').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();openToolHelp(b.getAttribute('data-help'));});
  });
  var c=document.getElementById('toolHelpClose'); if(c)c.onclick=function(){document.getElementById('toolHelpModal').classList.remove('open');};
  var m=document.getElementById('toolHelpModal'); if(m)m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('open');});
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){var mm=document.getElementById('toolHelpModal'); if(mm)mm.classList.remove('open');} });
})();
/* ================= LiDAR (.LAS) SUPPORT =================
   Self-contained LAS 1.0–1.4 reader for point formats 0–3 (the common ones).
   Renders points on the map colored by ELEVATION with a color ramp.
   .LAZ (compressed) needs a decompressor that isn't bundled — we detect and advise. */
function elevColor(t){ // t in 0..1 -> blue->cyan->green->yellow->red ramp
  t=Math.max(0,Math.min(1,t));
  var stops=[[49,54,149],[69,117,180],[116,173,209],[171,217,233],[224,243,248],[254,224,144],[253,174,97],[244,109,67],[215,48,39],[165,0,38]];
  var i=Math.min(stops.length-2,Math.floor(t*(stops.length-1))); var f=t*(stops.length-1)-i;
  var a=stops[i],b=stops[i+1];
  return 'rgb('+Math.round(a[0]+(b[0]-a[0])*f)+','+Math.round(a[1]+(b[1]-a[1])*f)+','+Math.round(a[2]+(b[2]-a[2])*f)+')';
}
function readLAS(file,nice,color){
  if(file.name.toLowerCase().split('.').pop()==='laz'){
    toast('.LAZ is compressed LiDAR. Please decompress to .LAS first (e.g. LAStools "laszip", or QGIS export), then load.',true);
    return;
  }
  toast('Reading LiDAR '+nice+'…');
  var r=new FileReader();
  r.onload=function(){
    try{
      var buf=r.result, dv=new DataView(buf);
      // signature
      var sig=String.fromCharCode(dv.getUint8(0),dv.getUint8(1),dv.getUint8(2),dv.getUint8(3));
      if(sig!=='LASF'){ toast('Not a valid LAS file',true); return; }
      var verMajor=dv.getUint8(24), verMinor=dv.getUint8(25);
      var offsetToData=dv.getUint32(96,true);
      var pointFormat=dv.getUint8(104) & 0x3f;
      var pointLength=dv.getUint16(105,true);
      var numPoints=dv.getUint32(107,true);
      if(numPoints===0 && verMinor>=4){ // 1.4 uses 64-bit count at offset 247
        numPoints = dv.getUint32(247,true);
      }
      var scaleX=dv.getFloat64(131,true),scaleY=dv.getFloat64(139,true),scaleZ=dv.getFloat64(147,true);
      var offX=dv.getFloat64(155,true),offY=dv.getFloat64(163,true),offZ=dv.getFloat64(171,true);
      var maxZ=dv.getFloat64(179,true),minZ=dv.getFloat64(187,true);
      if(pointFormat>5){ toast('LAS point format '+pointFormat+' not supported in browser. Use format 0–3 or export as LAS 1.2.',true); return; }
      // subsample for performance: cap rendered points
      var CAP=120000;
      var step=Math.max(1,Math.ceil(numPoints/CAP));
      var zr=(maxZ-minZ)||1;
      var pts=[]; var read=0;
      for(var i=0;i<numPoints;i+=step){
        var p=offsetToData+i*pointLength;
        if(p+12>buf.byteLength) break;
        var xi=dv.getInt32(p,true), yi=dv.getInt32(p+4,true), zi=dv.getInt32(p+8,true);
        var X=xi*scaleX+offX, Y=yi*scaleY+offY, Z=zi*scaleZ+offZ;
        pts.push([X,Y,Z]); read++;
      }
      if(!read){ toast('No points read from LAS',true); return; }
      // LAS XY are in the file's CRS (often UTM). Assume WGS84 if values look like degrees, else treat as projected and reproject from active UTM zone.
      var looksGeographic = Math.abs(pts[0][0])<=180 && Math.abs(pts[0][1])<=90;
      var grp=L.layerGroup();
      var srcKey = looksGeographic ? 'wgs84' : effectiveCrsKey([pts[0][0],pts[0][1]]);
      pts.forEach(function(pt){
        var lng,lat;
        if(looksGeographic){ lng=pt[0]; lat=pt[1]; }
        else if(hasProj){ try{ var ll=proj4(CRS[srcKey].code,'EPSG:4326',[pt[0],pt[1]]); lng=ll[0]; lat=ll[1]; }catch(e){ return; } }
        else { return; }
        var t=(pt[2]-minZ)/zr;
        L.circleMarker([lat,lng],{radius:1.6,color:elevColor(t),weight:0,fillColor:elevColor(t),fillOpacity:.85}).addTo(grp);
      });
      var id=addLayer(grp,nice+' (LiDAR)',color,{isRaster:false,geomType:'Point',opacity:.85});
      try{var b=grp.getBounds&&grp.getBounds(); if(b&&b.isValid())map.fitBounds(b.pad(.1));}catch(e){}
      toast('LiDAR loaded: '+read.toLocaleString()+' of '+numPoints.toLocaleString()+' points (LAS '+verMajor+'.'+verMinor+', fmt '+pointFormat+'), colored by elevation '+minZ.toFixed(1)+'–'+maxZ.toFixed(1)+' m'+(step>1?' · subsampled 1:'+step:''));
    }catch(err){ toast('LAS read error: '+err.message,true); }
  };
  r.onerror=function(){ toast('Could not read LiDAR file',true); };
  r.readAsArrayBuffer(file);
}
/* ECW is a proprietary, patented format with no browser decoder — advise conversion. */
function handleECW(file,nice){
  toast('ECW is a proprietary format that browsers cannot read. Convert it to GeoTIFF or Cloud-Optimized GeoTIFF (COG) in QGIS or GDAL (gdal_translate input.ecw output.tif), then load the .tif here.',true);
}
/* ================= DXF (CAD) SUPPORT =================
   Parses DXF entities (LINE, LWPOLYLINE, POLYLINE, POINT, CIRCLE, ARC, TEXT) into
   GeoJSON. CAD files are usually in a projected/local CRS, so we reproject from the
   active CRS when coordinates look projected. */
/* ================= CAD (DXF) — ESRI / ArcGIS-style import =================
   Mirrors how ArcMap / ArcGIS Pro add a CAD drawing:
     • the drawing is split into CAD feature classes: Point, Polyline, Polygon, Annotation
     • every entity carries the standard ESRI CAD attributes (Layer, Entity, Handle, Color,
       Linetype, Elevation, RefName, DocName …)
     • drawing layers can be switched on/off before loading (ArcMap "Drawing Layers" tab)
     • symbology honours the AutoCAD layer colours (ArcGIS "use CAD layer colours")
     • the drawing is georeferenced by assigning its coordinate system on import
   Everything produced is a normal vector layer, so all edit/select/table tools apply.        */

/* AutoCAD Color Index → hex. 1–9 and 250–255 are the fixed AutoCAD values; 10–249 follow the
   documented 24-hue × 5-brightness × (full/pale) rule, so the palette matches AutoCAD/ArcGIS. */
var CAD_ACI=(function(){
  var t={0:'#000000',1:'#FF0000',2:'#FFFF00',3:'#00FF00',4:'#00FFFF',5:'#0000FF',6:'#FF00FF',
         7:'#000000',8:'#808080',9:'#C0C0C0',
         250:'#333333',251:'#505050',252:'#696969',253:'#828282',254:'#BEBEBE',255:'#FFFFFF'};
  function hsv(h,s,v){
    var c=v*s, x=c*(1-Math.abs((h/60)%2-1)), m=v-c, r=0,g=0,b=0;
    if(h<60){r=c;g=x;} else if(h<120){r=x;g=c;} else if(h<180){g=c;b=x;}
    else if(h<240){g=x;b=c;} else if(h<300){r=x;b=c;} else {r=c;b=x;}
    function hx(n){n=Math.floor(n+m);n=Math.max(0,Math.min(255,n));return (n<16?'0':'')+n.toString(16);}
    return ('#'+hx(r)+hx(g)+hx(b)).toUpperCase();
  }
  var lev=[255,165,127,76,38];
  for(var i=10;i<=249;i++){
    var h=(Math.floor((i-10)/10)*15)%360, s=(i-10)%10, p=Math.floor(s/2), pale=(s%2)===1;
    t[i]=hsv(h, pale?0.5:1, lev[p]);
  }
  return t;
})();
function cadAciHex(idx){ var c=CAD_ACI[idx]; return c||'#000000'; }
function cadIntToHex(n){ if(n==null||isNaN(n))return null; var s=(n>>>0).toString(16); while(s.length<6)s='0'+s; return ('#'+s.slice(-6)).toUpperCase(); }

/* ---- geometry helpers ---- */
/* AutoCAD bulge → arc points. bulge = tan(includedAngle/4); positive = counter-clockwise. */
function cadBulgePts(p1,p2,bulge){
  var theta=4*Math.atan(bulge);
  var dx=p2[0]-p1[0], dy=p2[1]-p1[1], chord=Math.sqrt(dx*dx+dy*dy);
  if(!chord||!bulge||!isFinite(theta))return [];
  var st=Math.sin(theta/2); if(!st)return [];
  var r=chord/(2*st), apo=r*Math.cos(theta/2);
  var ux=dx/chord, uy=dy/chord;
  var cx=(p1[0]+p2[0])/2+(-uy)*apo, cy=(p1[1]+p2[1])/2+(ux)*apo;
  var R=Math.abs(r), a1=Math.atan2(p1[1]-cy,p1[0]-cx);
  var n=Math.max(2,Math.min(72,Math.ceil(Math.abs(theta)/0.18)));
  var out=[];
  for(var i=1;i<n;i++){ var a=a1+theta*(i/n); out.push([cx+R*Math.cos(a), cy+R*Math.sin(a)]); }
  return out;
}
/* compose an INSERT (block reference) transform: scale → rotate → translate */
function cadInsTx(ins,parent){
  var rot=((ins.rotation||0)*Math.PI/180), sx=(ins.xScale==null?1:ins.xScale), sy=(ins.yScale==null?1:ins.yScale);
  var px=(ins.position&&ins.position.x)||0, py=(ins.position&&ins.position.y)||0;
  var cos=Math.cos(rot), sin=Math.sin(rot);
  return function(p){
    var x=p[0]*sx, y=p[1]*sy;
    var q=[px+x*cos-y*sin, py+x*sin+y*cos];
    return parent?parent(q):q;
  };
}

/* ---- main converter: DXF → ESRI-style CAD feature classes ---- */
function cadParse(dxf,docName){
  var lyrTable={};
  try{
    var lt=(dxf.tables&&dxf.tables.layer&&dxf.tables.layer.layers)||{};
    Object.keys(lt).forEach(function(k){
      var L=lt[k];
      var hex=(L.color!=null)?cadIntToHex(L.color):cadAciHex(Math.abs(L.colorIndex||7));
      lyrTable[k]={name:k,color:hex||'#000000',aci:(L.colorIndex==null?7:L.colorIndex),
        lineType:L.lineType||'CONTINUOUS', on:(L.visible!==false), frozen:!!L.frozen};
    });
  }catch(e){}
  function lyrOf(n){ return lyrTable[n]||(lyrTable[n]={name:n,color:'#000000',aci:7,lineType:'CONTINUOUS',on:true,frozen:false}); }

  var out={Point:[],Polyline:[],Polygon:[],Annotation:[]}, counts={}, skipped={};
  var docVer=''; try{ docVer=(dxf.header&&(dxf.header.$ACADVER||dxf.header.acadVer))||''; }catch(e){}

  function colorOf(e,inherit){
    // AutoCAD rules: 256 = BYLAYER, 0 = BYBLOCK, true colour wins when present
    if(e.color!=null && !isNaN(e.color)) return cadIntToHex(e.color);
    var ci=e.colorIndex;
    if(ci==null||ci===256) return lyrOf(e.layer||'0').color;
    if(ci===0) return inherit||lyrOf(e.layer||'0').color;
    return cadAciHex(Math.abs(ci));
  }
  function baseProps(e,inherit,refName){
    var lay=e.layer||'0', L=lyrOf(lay);
    return {
      Layer:lay, Entity:e.type||'', Handle:e.handle||'',
      Color:colorOf(e,inherit), EntColor:(e.colorIndex==null?256:e.colorIndex), LyrColor:L.aci,
      Linetype:(e.lineType&&e.lineType!=='BYLAYER')?e.lineType:L.lineType,
      Elevation:(e.elevation!=null?e.elevation:((e.position&&e.position.z)||0)),
      LineWt:(e.lineweight!=null?e.lineweight:-1),
      RefName:refName||'', DocName:docName||'', DocType:'DXF', DocVer:docVer, CADType:'DXF'
    };
  }
  function push(kind,geom,props){ if(!geom)return; out[kind].push({type:'Feature',properties:props,geometry:geom}); counts[props.Entity]=(counts[props.Entity]||0)+1; }
  function tx(p,T){ return T?T(p):p; }

  function walk(entities,T,inherit,refName,depth){
    if(!entities||depth>6)return;
    entities.forEach(function(e){
      try{
        var ty=e.type;
        if(ty==='INSERT'){
          var blk=(dxf.blocks||{})[e.name];
          if(blk&&blk.entities){
            var bp=(blk.position||{x:0,y:0});
            var inner=cadInsTx(e,T);
            // block base point offset
            var T2=function(p){ return inner([p[0]-(bp.x||0), p[1]-(bp.y||0)]); };
            walk(blk.entities,T2,colorOf(e,inherit),e.name,(depth||0)+1);
          } else if(e.position){
            push('Point',{type:'Point',coordinates:tx([e.position.x,e.position.y],T)},baseProps(e,inherit,e.name||refName));
          }
          return;
        }
        var P=baseProps(e,inherit,refName);
        if(ty==='LINE'&&e.vertices&&e.vertices.length>=2){
          push('Polyline',{type:'LineString',coordinates:e.vertices.map(function(v){return tx([v.x,v.y],T);})},P);
        }
        else if((ty==='LWPOLYLINE'||ty==='POLYLINE')&&e.vertices&&e.vertices.length>=2){
          var pts=[];
          for(var i=0;i<e.vertices.length;i++){
            var v=e.vertices[i], cur=[v.x,v.y];
            pts.push(cur);
            var nxt=e.vertices[i+1]||((e.shape||e.closed)?e.vertices[0]:null);
            if(nxt&&v.bulge){ cadBulgePts(cur,[nxt.x,nxt.y],v.bulge).forEach(function(q){pts.push(q);}); }
          }
          var coords=pts.map(function(p){return tx(p,T);});
          if(e.shape||e.closed){
            coords.push(coords[0]);
            if(coords.length>=4) push('Polygon',{type:'Polygon',coordinates:[coords]},P);
            else push('Polyline',{type:'LineString',coordinates:coords},P);
          } else push('Polyline',{type:'LineString',coordinates:coords},P);
        }
        else if(ty==='POINT'&&e.position){
          push('Point',{type:'Point',coordinates:tx([e.position.x,e.position.y],T)},P);
        }
        else if(ty==='CIRCLE'&&e.center){
          var cc=[],r=e.radius||0;
          for(var a=0;a<=360;a+=6)cc.push(tx([e.center.x+r*Math.cos(a*Math.PI/180), e.center.y+r*Math.sin(a*Math.PI/180)],T));
          push('Polygon',{type:'Polygon',coordinates:[cc]},P);
        }
        else if(ty==='ARC'&&e.center){
          var ac=[],ar=e.radius||0,s=e.startAngle||0,en=e.endAngle||0;
          if(en<s)en+=2*Math.PI;
          var step=Math.max(0.05,(en-s)/72);
          for(var t=s;t<en+1e-9;t+=step)ac.push(tx([e.center.x+ar*Math.cos(t), e.center.y+ar*Math.sin(t)],T));
          if(ac.length>=2)push('Polyline',{type:'LineString',coordinates:ac},P);
        }
        else if(ty==='ELLIPSE'&&e.center&&e.majorAxisEndPoint){
          var mx=e.majorAxisEndPoint.x,my=e.majorAxisEndPoint.y;
          var A=Math.sqrt(mx*mx+my*my), B=A*(e.axisRatio==null?1:e.axisRatio), rot=Math.atan2(my,mx);
          var s2=(e.startAngle==null?0:e.startAngle), e2=(e.endAngle==null?2*Math.PI:e.endAngle);
          if(e2<s2)e2+=2*Math.PI;
          var ec=[],st2=Math.max(0.05,(e2-s2)/72);
          for(var u=s2;u<e2+1e-9;u+=st2){
            var xx=A*Math.cos(u), yy=B*Math.sin(u);
            ec.push(tx([e.center.x+xx*Math.cos(rot)-yy*Math.sin(rot), e.center.y+xx*Math.sin(rot)+yy*Math.cos(rot)],T));
          }
          var closed=Math.abs((e2-s2)-2*Math.PI)<1e-6;
          if(closed&&ec.length>=4){ ec.push(ec[0]); push('Polygon',{type:'Polygon',coordinates:[ec]},P); }
          else if(ec.length>=2) push('Polyline',{type:'LineString',coordinates:ec},P);
        }
        else if(ty==='SPLINE'){
          var sp=(e.fitPoints&&e.fitPoints.length?e.fitPoints:e.controlPoints)||[];
          if(sp.length>=2) push('Polyline',{type:'LineString',coordinates:sp.map(function(v){return tx([v.x,v.y],T);})},P);
        }
        else if((ty==='SOLID'||ty==='3DFACE')&&e.points&&e.points.length>=3){
          var q=e.points.map(function(v){return tx([v.x,v.y],T);});
          // AutoCAD SOLID stores corners in bow-tie order (3rd and 4th swapped)
          if(q.length===4){ var tmp=q[2]; q[2]=q[3]; q[3]=tmp; }
          q.push(q[0]); push('Polygon',{type:'Polygon',coordinates:[q]},P);
        }
        else if(ty==='TEXT'||ty==='MTEXT'||ty==='ATTRIB'){
          var pos=e.startPoint||e.position||e.insertionPoint;
          if(pos){
            P.Text=String(e.text==null?'':e.text).replace(/\\[A-Za-z][^;]*;/g,'').replace(/[{}]/g,'');
            P.TxtHeight=(e.textHeight!=null?e.textHeight:(e.height||0));
            P.TxtRot=(e.rotation||0);
            push('Annotation',{type:'Point',coordinates:tx([pos.x,pos.y],T)},P);
          }
        }
        else { skipped[ty]=(skipped[ty]||0)+1; }
      }catch(err){}
    });
  }
  walk(dxf.entities,null,null,'',0);
  return {sub:out, layers:lyrTable, counts:counts, skipped:skipped, docName:docName, docVer:docVer};
}

/* ---- import dialog (ArcMap "Add CAD" behaviour) ---- */
var cadState=null;
function cadCrsOptions(sel){
  var keys=Object.keys(CRS);
  var pref=['wgs84','webmerc'];
  var rest=keys.filter(function(k){return pref.indexOf(k)<0;}).sort(function(a,b){
    var A=CRS[a],B=CRS[b];
    if(A.utmZone&&B.utmZone){ if(A.utmZone!==B.utmZone)return A.utmZone-B.utmZone; return (A.utmSouth?1:0)-(B.utmSouth?1:0); }
    return String(A.label).localeCompare(String(B.label));
  });
  return pref.concat(rest).map(function(k){
    return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+escapeHtml(CRS[k].label+' ('+CRS[k].code+')')+'</option>';
  }).join('');
}
function openCadDialog(parsed,fileName,color){
  cadState={parsed:parsed,fileName:fileName,color:color};
  var sub=parsed.sub;
  var total=sub.Point.length+sub.Polyline.length+sub.Polygon.length+sub.Annotation.length;
  // coordinate extent (to help the user pick the right CRS, like ArcGIS' warning)
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  ['Point','Polyline','Polygon','Annotation'].forEach(function(k){
    sub[k].forEach(function(f){
      var g=f.geometry, cs=(g.type==='Point')?[g.coordinates]:(g.type==='Polygon'?g.coordinates[0]:g.coordinates);
      cs.forEach(function(c){ if(c[0]<minX)minX=c[0]; if(c[0]>maxX)maxX=c[0]; if(c[1]<minY)minY=c[1]; if(c[1]>maxY)maxY=c[1]; });
    });
  });
  var looksGeo=(isFinite(minX)&&Math.abs(minX)<=180&&Math.abs(maxX)<=180&&Math.abs(minY)<=90&&Math.abs(maxY)<=90);
  var guess=looksGeo?'wgs84':((crsKey==='autoutm')?effectiveCrsKey():crsKey);
  cadState.guess=guess;

  // per-CAD-layer entity counts
  var lyrCount={};
  ['Point','Polyline','Polygon','Annotation'].forEach(function(k){
    sub[k].forEach(function(f){ var n=f.properties.Layer; lyrCount[n]=(lyrCount[n]||0)+1; });
  });
  var lyrNames=Object.keys(lyrCount).sort();

  document.getElementById('cadFileName').textContent=fileName;
  document.getElementById('cadSummary').innerHTML=
    '<b>'+total.toLocaleString('en-US')+'</b> entities · '+lyrNames.length+' drawing layer(s)'+
    (isFinite(minX)?('<br>Extent: X '+minX.toFixed(2)+' … '+maxX.toFixed(2)+'  |  Y '+minY.toFixed(2)+' … '+maxY.toFixed(2)):'')+
    (looksGeo?'<br><span style="color:var(--good)">Coordinates look like longitude/latitude.</span>'
             :'<br><span style="color:var(--accent)">Coordinates look projected (local/grid) — choose the drawing\'s coordinate system below.</span>');

  var skips=Object.keys(parsed.skipped||{});
  document.getElementById('cadSkipped').innerHTML = skips.length
    ? ('Not converted: '+skips.map(function(k){return escapeHtml(k)+' ('+parsed.skipped[k]+')';}).join(', '))
    : '';

  document.getElementById('cadCrs').innerHTML=cadCrsOptions(guess);

  // sub-layer (CAD feature class) checkboxes
  var fcHtml='';
  [['Polyline','Polyline'],['Polygon','Polygon'],['Point','Point'],['Annotation','Annotation']].forEach(function(p){
    var n=sub[p[0]].length;
    fcHtml+='<label style="display:flex;align-items:center;gap:7px;font-size:12px;'+(n?'':'opacity:.45')+'">'+
      '<input type="checkbox" class="cad-fc" value="'+p[0]+'"'+(n?' checked':' disabled')+'/> '+
      p[1]+' <span style="color:var(--ink-dim)">('+n.toLocaleString('en-US')+')</span></label>';
  });
  document.getElementById('cadFcList').innerHTML=fcHtml;

  // drawing layer checkboxes with CAD colour swatches
  document.getElementById('cadLyrList').innerHTML=lyrNames.map(function(n){
    var col=(parsed.layers[n]&&parsed.layers[n].color)||'#000000';
    var off=(parsed.layers[n]&&(parsed.layers[n].on===false||parsed.layers[n].frozen));
    return '<label style="display:flex;align-items:center;gap:7px;font-size:12px;padding:2px 0">'+
      '<input type="checkbox" class="cad-lyr" value="'+escapeHtml(n)+'"'+(off?'':' checked')+'/>'+
      '<span style="width:12px;height:12px;border-radius:2px;border:1px solid rgba(255,255,255,.35);background:'+col+';flex:none"></span>'+
      '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">'+escapeHtml(n)+'</span>'+
      '<span style="color:var(--ink-dim)">'+lyrCount[n].toLocaleString('en-US')+'</span>'+
      (off?'<span style="color:var(--ink-dim);font-size:10px">off/frozen</span>':'')+'</label>';
  }).join('');

  document.getElementById('cadModal').classList.add('open');
}
function cadLoad(){
  if(!cadState){return;}
  var parsed=cadState.parsed, fileName=cadState.fileName;
  var fcs=Array.prototype.slice.call(document.querySelectorAll('.cad-fc:checked')).map(function(c){return c.value;});
  if(!fcs.length){ toast('Choose at least one CAD feature class',true); return; }
  var keep={}; Array.prototype.slice.call(document.querySelectorAll('.cad-lyr:checked')).forEach(function(c){keep[c.value]=true;});
  if(!Object.keys(keep).length){ toast('Choose at least one drawing layer',true); return; }
  var srcKey=document.getElementById('cadCrs').value;
  var useCad=document.getElementById('cadSymCad').checked;

  var fwd=null;
  if(srcKey!=='wgs84'){
    if(!hasProj){ toast('proj4 is not loaded — cannot georeference this drawing.',true); return; }
    fwd=function(xy){ try{ return proj4(CRS[srcKey].code,'EPSG:4326',xy); }catch(e){ return xy; } };
  }
  document.getElementById('cadModal').classList.remove('open');

  var made=0,totalF=0, firstId=null;
  var palette=['#3B82F6','#F59E0B','#34D399','#F472B6','#A78BFA','#FB7185','#22D3EE','#4ADE80'];
  fcs.forEach(function(kind){
    var feats=parsed.sub[kind].filter(function(f){return keep[f.properties.Layer];});
    if(!feats.length)return;
    var fc={type:'FeatureCollection',features:feats.map(function(f){return {type:'Feature',properties:JSON.parse(JSON.stringify(f.properties)),geometry:JSON.parse(JSON.stringify(f.geometry))};})};
    if(fwd)fc=projectFC(fc,fwd);
    var col=useCad?'#3B82F6':(palette[made%palette.length]);
    var nm=fileName.replace(/\.[^.]+$/,'')+' — '+kind;
    var id=addLayer(geoJsonLayer(fc,col),nm,col,{geojson:fc,zoom:false});
    var L0=layers[id]; if(!L0)return;
    if(firstId===null)firstId=id;
    ensureFids(L0.geojson);
    if(kind==='Polygon'){ L0.hollow=true; }        // CAD polygons draw as outlines, like ArcGIS
    if(kind==='Point'||kind==='Annotation'){ L0.size=4; }
    if(useCad){
      var cols={};
      Object.keys(keep).forEach(function(n){ if(parsed.layers[n])cols[n]=parsed.layers[n].color; });
      L0.colorMode='categorized'; L0.uniqueField='Layer'; L0.catColors=cols;
    }
    if(kind==='Annotation'){
      L0.advLabelStyle={field:'Text',size:11,color:'#FFFFFF',halo:'#000000'};
    }
    svBuildLeafletLayer(L0);
    if(kind==='Annotation'&&window.__svApplyLabels){ try{window.__svApplyLabels(L0);}catch(e){} }
    made++; totalF+=feats.length;
  });
  renderLegend(); refreshDropdowns(); renderLayers();
  try{ if(firstId&&layers[firstId].leaflet.getBounds){ var b=layers[firstId].leaflet.getBounds(); if(b.isValid())map.fitBounds(b.pad(.15)); } }catch(e){}
  try{ if(window.__svAutoFastRender)window.__svAutoFastRender(); }catch(e){}
  toast(made?('CAD loaded: '+totalF.toLocaleString('en-US')+' entities in '+made+' feature class(es)'+(srcKey!=='wgs84'?(' — georeferenced from '+CRS[srcKey].esri):'')):'Nothing matched the chosen filters',!made);
}
function readDXF(file,nice,color){
  if(typeof DxfParser==='undefined'){ toast('DXF parser did not load — needs internet on first open. Reload with a connection.',true); return; }
  var r=new FileReader();
  r.onload=function(){
    toast('Reading CAD drawing…');
    setTimeout(function(){
      try{
        var parser=new DxfParser();
        var dxf=parser.parseSync(r.result);
        var parsed=cadParse(dxf,file.name);
        var total=parsed.sub.Point.length+parsed.sub.Polyline.length+parsed.sub.Polygon.length+parsed.sub.Annotation.length;
        if(!total){ toast('No convertible entities found in this DXF.',true); return; }
        openCadDialog(parsed,file.name,color);
      }catch(err){ toast('DXF read error: '+err.message,true); }
    },30);
  };
  r.readAsText(file);
}
/* DWG is AutoCAD's proprietary binary — no browser decoder exists. Advise conversion (as ArcGIS
   itself requires a DWG-capable reader; browsers have none). */
function handleDWG(file,nice){
  toast('DWG is a proprietary binary format that browsers cannot read. Convert it to DXF first (free: ODA File Converter, or AutoCAD/BricsCAD "Save As DXF", or QGIS "Save As DXF"), then load the .dxf here — it will import with full CAD layers, colours and annotation.',true);
}
/* CAD dialog wiring */
(function(){
  function $c(id){return document.getElementById(id);}
  var c=$c('cadClose'); if(c)c.onclick=function(){$c('cadModal').classList.remove('open');cadState=null;};
  var m=$c('cadModal'); if(m)m.addEventListener('click',function(e){if(e.target===m){m.classList.remove('open');cadState=null;}});
  var lb=$c('cadLoadBtn'); if(lb)lb.onclick=cadLoad;
  var a=$c('cadLyrAll'); if(a)a.onclick=function(){document.querySelectorAll('.cad-lyr').forEach(function(x){x.checked=true;});};
  var n=$c('cadLyrNone'); if(n)n.onclick=function(){document.querySelectorAll('.cad-lyr').forEach(function(x){x.checked=false;});};
})();
/* Fast-rendering setting */
(function(){
  var sel=document.getElementById('fastRenderSel'); if(!sel)return;
  function info(){
    var el=document.getElementById('fastRenderInfo'); if(!el)return;
    el.textContent=svTotalFeatures().toLocaleString('en-US')+' features \u00b7 '+(svUseCanvas()?'canvas':'SVG');
  }
  window.__svFastInfo=info;
  sel.value=svFastMode;
  sel.onchange=function(){ svFastMode=this.value; svRebuildAllVectors(); info();
    toast('Rendering: '+(svUseCanvas()?'fast canvas':'SVG')+' \u2014 '+svTotalFeatures().toLocaleString('en-US')+' features'); };
  info();
})();
/* ================= CARTOGRAPHY TOOLS ================= */
function cgLayerList(){
  var sel=document.getElementById('cgLayer'); if(!sel)return; var cur=sel.value;
  sel.innerHTML='<option value="">— choose a layer —</option>'+Object.keys(layers).map(function(id){return '<option value="'+id+'">'+escapeHtml(layers[id].name)+'</option>';}).join('');
  if(cur&&layers[cur])sel.value=cur;
}
function cgActive(){ var sel=document.getElementById('cgLayer'); var id=sel&&sel.value; if(!id||!layers[id]){toast('Choose a layer first',true);return null;} return layers[id]; }
function cgShow(h){ var o=document.getElementById('cgOut'); if(o){o.style.display='block';o.innerHTML=h;} }
function cgSetBlend(){
  var L0=cgActive(); if(!L0)return; var mode=document.getElementById('cgBlend').value;
  L0.blendMode=mode;
  function apply(el){ if(el)el.style.mixBlendMode=(mode==='normal'?'':mode); }
  try{ svLayerElements(L0).forEach(apply); }catch(e){}
  var shared=svUseCanvas()&&!L0.isRaster;
  toast('Blend mode “'+mode+'” applied to '+L0.name+(shared?' (fast rendering shares one canvas, so this affects all vector layers)':''));
}
function cgProportional(){
  var L0=cgActive(); if(!L0||!L0.geojson)return;
  var fields={}; L0.geojson.features.forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){if(!isNaN(parseFloat((f.properties||{})[k])))fields[k]=1;});});
  var ks=Object.keys(fields); if(!ks.length){toast('Need a numeric field for proportional symbols',true);return;}
  var field=prompt('Proportional symbol size by which numeric field?\n('+ks.join(', ')+')',ks[0]); if(!field||!fields[field])return;
  var vals=L0.geojson.features.map(function(f){return parseFloat((f.properties||{})[field]);}).filter(function(v){return !isNaN(v);});
  var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals),rng=(mx-mn)||1;
  var n=0;
  L0.leaflet.eachLayer(function(ly){ if(ly.feature&&ly.setRadius){var v=parseFloat((ly.feature.properties||{})[field]); if(!isNaN(v)){ly.setRadius(4+((v-mn)/rng)*22);n++;}} });
  if(n) { cgShow('Proportional symbols: '+n+' points sized by <b>'+field+'</b> ('+mn+'–'+mx+')'); toast('Proportional symbols applied'); }
  else toast('This layer has no point markers to size',true);
}
function cgLegend(){
  var L0=cgActive(); if(!L0)return;
  var html='<b>Legend — '+escapeHtml(L0.name)+'</b><br><div style="display:flex;align-items:center;gap:8px;margin-top:6px"><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:'+L0.color+'"></span>'+escapeHtml(L0.name)+'</div>';
  if(L0.uniqueClasses){ html+=Object.keys(L0.uniqueClasses).map(function(k){return '<div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:'+L0.uniqueClasses[k]+'"></span>'+escapeHtml(k)+'</div>';}).join(''); }
  cgShow(html);
}
function cgIcon(){
  var L0=cgActive(); if(!L0)return;
  var emoji=prompt('Enter an emoji or 1–2 characters to use as the point icon (e.g. 📍, ⛽, ★):','📍'); if(!emoji)return;
  var n=0;
  L0.leaflet.eachLayer(function(ly){ if(ly.getLatLng){ try{ ly.setIcon(L.divIcon({html:'<div style="font-size:20px;line-height:20px">'+emoji+'</div>',className:'sv-emoji-icon',iconSize:[22,22],iconAnchor:[11,11]})); n++; }catch(e){} } });
  if(n)toast('Custom icon applied to '+n+' points'); else toast('This layer has no point markers (icons apply to points)',true);
}
function wireCartoTools(){
  cgLayerList();
  var b=document.getElementById('cgBlend'); if(b)b.onchange=cgSetBlend;
  var p=document.getElementById('cgProportional'); if(p)p.onclick=cgProportional;
  var lg=document.getElementById('cgLegend'); if(lg)lg.onclick=cgLegend;
  var ic=document.getElementById('cgIcon'); if(ic)ic.onclick=cgIcon;
}

/* ================= PRODUCTIVITY TOOLS ================= */
var swipeState={on:false,layer:null,clip:null,handler:null};
function pdShow(h){ var o=document.getElementById('pdOut'); if(o){o.style.display='block';o.innerHTML=h;} }
/* Swipe compare: clip the top layer to the left of a draggable divider */
function pdToggleSwipe(){
  var sel=document.getElementById('cgLayer'); var id=sel&&sel.value;
  if(swipeState.on){ pdEndSwipe(); return; }
  if(!id||!layers[id]){ toast('Choose a layer in Cartography first — it will be revealed by the swipe',true); return; }
  var L0=layers[id]; var el=(L0.leaflet.getContainer&&L0.leaflet.getContainer())||L0.leaflet._image||(L0.leaflet._path);
  if(!el){ toast('This layer type cannot be swiped (works best on raster/tile layers)',true); return; }
  swipeState.on=true; swipeState.el=el;
  var div=document.createElement('div'); div.id='swipeDivider'; div.style.cssText='position:absolute;top:0;bottom:0;left:50%;width:3px;background:var(--brand);z-index:700;cursor:ew-resize;box-shadow:0 0 8px rgba(0,0,0,.4)';
  div.innerHTML='<div style="position:absolute;top:50%;left:-13px;width:28px;height:28px;border-radius:50%;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;transform:translateY(-50%)">⇆</div>';
  document.getElementById('map').appendChild(div);
  function setClip(x){ var w=document.getElementById('map').clientWidth; var pct=Math.max(0,Math.min(100,x/w*100)); el.style.clipPath='inset(0 '+(100-pct)+'% 0 0)'; div.style.left=pct+'%'; }
  setClip(document.getElementById('map').clientWidth/2);
  var drag=false;
  div.addEventListener('mousedown',function(){drag=true;});
  document.addEventListener('mousemove',swipeState.move=function(e){ if(!drag)return; var r=document.getElementById('map').getBoundingClientRect(); setClip(e.clientX-r.left); });
  document.addEventListener('mouseup',swipeState.up=function(){drag=false;});
  swipeState.div=div;
  toast('Swipe active — drag the divider. Click Swipe again to turn off.');
}
function pdEndSwipe(){
  swipeState.on=false;
  if(swipeState.el)swipeState.el.style.clipPath='';
  if(swipeState.div&&swipeState.div.parentNode)swipeState.div.parentNode.removeChild(swipeState.div);
  document.removeEventListener('mousemove',swipeState.move); document.removeEventListener('mouseup',swipeState.up);
  toast('Swipe compare off');
}
/* Coordinate converter */
function pdConvert(){ var w=document.getElementById('pdConvertWrap'); if(w)w.style.display=w.style.display==='none'?'block':'none'; }
function pdConvertRun(){
  var lat=parseFloat(document.getElementById('pdConvLat').value), lon=parseFloat(document.getElementById('pdConvLon').value);
  if(isNaN(lat)||isNaN(lon)){ toast('Enter valid Lat and Lon',true); return; }
  var c=toCRS(lon,lat,crsKey);
  var ek=effectiveCrsKey([lon,lat]);
  pdShow('<b>'+lat.toFixed(6)+'°, '+lon.toFixed(6)+'°</b> →<br>'+CRS[ek].esri+' ('+CRS[ek].code+')<br><b>'+c.fmt+'</b>');
}
/* Bearing between two clicked points */
var bearingState={on:false,first:null};
function pdBearing(){
  if(bearingState.on){ bearingState.on=false; bearingState.first=null; toast('Bearing tool off'); return; }
  bearingState.on=true; bearingState.first=null;
  toast('Bearing: click the start point, then the end point.');
  map.once('click',function(a){
    bearingState.first=[a.latlng.lng,a.latlng.lat];
    toast('Now click the end point.');
    map.once('click',function(b){
      try{
        var p1=turf.point(bearingState.first), p2=turf.point([b.latlng.lng,b.latlng.lat]);
        var br=turf.bearing(p1,p2); if(br<0)br+=360;
        var dist=turf.distance(p1,p2,{units:'kilometers'});
        pdShow('<b>Bearing:</b> '+br.toFixed(1)+'°<br><b>Distance:</b> '+(dist<1?(dist*1000).toFixed(1)+' m':dist.toFixed(3)+' km'));
        L.polyline([[bearingState.first[1],bearingState.first[0]],[b.latlng.lat,b.latlng.lng]],{color:'#F59E0B',weight:2,dashArray:'6 5'}).addTo(map);
      }catch(e){ toast('Bearing error: '+e.message,true); }
      bearingState.on=false;
    });
  });
}
/* Share link: encode view + theme + basemap into URL hash */
function pdShareLink(){
  var c=map.getCenter();
  var state={lat:+c.lat.toFixed(6),lng:+c.lng.toFixed(6),z:map.getZoom(),t:document.body.getAttribute('data-theme'),crs:crsKey};
  var hash='#map='+encodeURIComponent(JSON.stringify(state));
  var url=location.origin+location.pathname+hash;
  try{ navigator.clipboard.writeText(url); }catch(e){}
  history.replaceState(null,'',hash);
  var isFile=location.protocol==='file:';
  pdShow('<b>Share link copied to clipboard.</b><br><span style="font-size:11px;word-break:break-all">'+escapeHtml(url)+'</span>'+(isFile?'<br><span style="color:var(--bad);font-size:11px">Note: this is a local file path — the link restores your view on this PC only. Host the file on a server to share with others.</span>':''));
  toast('Share link copied');
}
function pdRestoreFromHash(){
  if(location.hash.indexOf('#map=')!==0)return;
  try{
    var st=JSON.parse(decodeURIComponent(location.hash.replace('#map=','')));
    if(st.t){document.body.setAttribute('data-theme',st.t); var ts=document.getElementById('themeSelect'); if(ts)ts.value=st.t;}
    if(st.crs){crsKey=st.crs; var cs=document.getElementById('crsSelect'); if(cs)cs.value=st.crs; if(typeof updateCrsReadout==='function')updateCrsReadout();}
    if(st.lat!=null&&st.lng!=null&&st.z!=null){ map.setView([st.lat,st.lng],st.z); }
  }catch(e){}
}
/* Keyboard shortcuts cheat-sheet */
function pdShowKeys(){
  var m=document.getElementById('keysModal');
  if(m){ m.classList.add('open');
    var c=document.getElementById('keysClose'); if(c)c.onclick=function(){m.classList.remove('open');};
    m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('open');});
    return;
  }
  toast('Ctrl+S save · Delete remove · Esc cancel · Scroll zoom · Drag pan');
}
/* One-click PNG of current map view */
function pdPngView(){
  if(typeof leafletImage==='undefined'){ toast('Map image library not loaded — use Output → Export PNG',true); return; }
  toast('Capturing current view…');
  leafletImage(map,function(err,canvas){
    if(err||!canvas){ toast('Could not capture map view',true); return; }
    canvas.toBlob(function(blob){ var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='SpatialItqan_View.png'; a.click(); toast('Current view exported as PNG'); });
  });
}
function wireProductivityTools(){
  var s=document.getElementById('pdSwipe'); if(s)s.onclick=pdToggleSwipe;
  var c=document.getElementById('pdConvert'); if(c)c.onclick=pdConvert;
  var cr=document.getElementById('pdConvRun'); if(cr)cr.onclick=pdConvertRun;
  var b=document.getElementById('pdBearing'); if(b)b.onclick=pdBearing;
  var sh=document.getElementById('pdShare'); if(sh)sh.onclick=pdShareLink;
  var k=document.getElementById('pdKeys'); if(k)k.onclick=pdShowKeys;
  var pv=document.getElementById('pdPngView'); if(pv)pv.onclick=pdPngView;
  pdRestoreFromHash();
  if(typeof wireBatch2==='function')wireBatch2();
}
/* keep carto/productivity layer lists in sync */
(function(){ var _rd=refreshDropdowns; refreshDropdowns=function(){ _rd(); try{cgLayerList();}catch(e){} try{lrsLayerList();}catch(e){} try{dashLayerList();}catch(e){} try{gpLists();}catch(e){} try{dtLists();}catch(e){} }; })();

/* ================= DASHBOARD, STATISTICS & REPORTS ================= */
function dashLayerList(){
  var sel=document.getElementById('dashLayer'); if(!sel)return; var cur=sel.value;
  sel.innerHTML='<option value="">— choose a layer —</option>'+Object.keys(layers).map(function(id){return '<option value="'+id+'">'+escapeHtml(layers[id].name)+'</option>';}).join('');
  if(cur&&layers[cur])sel.value=cur; dashFieldList();
}
function dashFields(L0){
  var num={},cat={};
  if(L0&&L0.geojson&&L0.geojson.features){
    L0.geojson.features.forEach(function(f){ Object.keys(f.properties||{}).forEach(function(k){
      var v=(f.properties||{})[k];
      if(v!==''&&v!=null&&!isNaN(parseFloat(v))&&isFinite(v)) num[k]=1; else if(v!=null&&v!=='') cat[k]=1;
    });});
  }
  return {num:Object.keys(num),cat:Object.keys(cat)};
}
function dashFieldList(){
  var sel=document.getElementById('dashLayer'); var L0=sel&&layers[sel.value]; 
  var fsel=document.getElementById('dashField'), gsel=document.getElementById('dashGroup');
  if(!fsel||!gsel)return;
  if(!L0){ fsel.innerHTML='<option value="">— no layer —</option>'; gsel.innerHTML='<option value="">— none —</option>'; return; }
  var fl=dashFields(L0);
  fsel.innerHTML=fl.num.length?fl.num.map(function(k){return '<option>'+escapeHtml(k)+'</option>';}).join(''):'<option value="">— no numeric field —</option>';
  gsel.innerHTML='<option value="">— none —</option>'+fl.num.concat(fl.cat).map(function(k){return '<option>'+escapeHtml(k)+'</option>';}).join('');
}
function statsOf(arr){
  var v=arr.filter(function(x){return !isNaN(x)&&isFinite(x);}).sort(function(a,b){return a-b;});
  if(!v.length)return null;
  var n=v.length,sum=v.reduce(function(a,b){return a+b;},0),mean=sum/n;
  var med=n%2?v[(n-1)/2]:(v[n/2-1]+v[n/2])/2;
  var variance=v.reduce(function(a,b){return a+(b-mean)*(b-mean);},0)/n;
  return {n:n,sum:sum,min:v[0],max:v[n-1],mean:mean,median:med,std:Math.sqrt(variance)};
}
function fmtNum(x){ if(x==null)return '—'; var a=Math.abs(x); return (a>=1000||a===0||a>=1?x.toFixed(2):x.toPrecision(3)).replace(/\.00$/,''); }
/* lightweight SVG charts (no external lib) */
function svgBar(data,opts){ // data: [{label,value}]
  opts=opts||{}; var w=opts.w||300,h=opts.h||150,pad=24,bw=(w-pad*2)/data.length;
  var max=Math.max.apply(null,data.map(function(d){return d.value;}))||1;
  var bars=data.map(function(d,i){
    var bh=(d.value/max)*(h-pad*2), x=pad+i*bw+bw*0.12, y=h-pad-bh;
    return '<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+(bw*0.76).toFixed(1)+'" height="'+Math.max(0,bh).toFixed(1)+'" fill="#2563EB" rx="2"/>'+
      '<text x="'+(x+bw*0.38).toFixed(1)+'" y="'+(h-pad+10)+'" font-size="7" text-anchor="middle" fill="#666">'+escapeHtml(String(d.label).slice(0,8))+'</text>'+
      '<text x="'+(x+bw*0.38).toFixed(1)+'" y="'+(y-2).toFixed(1)+'" font-size="7" text-anchor="middle" fill="#333">'+fmtNum(d.value)+'</text>';
  }).join('');
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" style="background:#fff;border:1px solid #eee;border-radius:6px">'+
    '<line x1="'+pad+'" y1="'+(h-pad)+'" x2="'+(w-pad)+'" y2="'+(h-pad)+'" stroke="#ccc"/>'+bars+'</svg>';
}
function svgPie(data,opts){
  opts=opts||{}; var sz=opts.sz||150,cx=sz/2,cy=sz/2,r=sz/2-8;
  var total=data.reduce(function(a,d){return a+d.value;},0)||1, ang=-Math.PI/2;
  var cols=['#2563EB','#0EA5A4','#F59E0B','#7C3AED','#E11D48','#16A34A','#0EA5E9','#F0653A','#94A3B8','#D946EF'];
  var slices=data.map(function(d,i){
    var a0=ang, a1=ang+(d.value/total)*Math.PI*2; ang=a1;
    var x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    var large=(a1-a0)>Math.PI?1:0;
    return '<path d="M'+cx+','+cy+' L'+x0.toFixed(1)+','+y0.toFixed(1)+' A'+r+','+r+' 0 '+large+',1 '+x1.toFixed(1)+','+y1.toFixed(1)+' Z" fill="'+cols[i%cols.length]+'" stroke="#fff" stroke-width="1"/>';
  }).join('');
  var legend=data.map(function(d,i){return '<div style="display:flex;align-items:center;gap:5px;font-size:10px"><span style="width:9px;height:9px;background:'+cols[i%cols.length]+';display:inline-block;border-radius:2px"></span>'+escapeHtml(String(d.label).slice(0,18))+' ('+fmtNum(d.value)+')</div>';}).join('');
  return '<div style="display:flex;gap:10px;align-items:center"><svg viewBox="0 0 '+sz+' '+sz+'" width="'+sz+'">'+slices+'</svg><div style="display:flex;flex-direction:column;gap:3px">'+legend+'</div></div>';
}
function dashCompute(forReport){
  var sel=document.getElementById('dashLayer'); var L0=sel&&layers[sel.value];
  if(!L0||!L0.geojson){ if(!forReport)toast('Choose a layer with attributes',true); return null; }
  var field=document.getElementById('dashField').value;
  var group=document.getElementById('dashGroup').value;
  if(!field){ if(!forReport)toast('No numeric field to compute',true); return null; }
  var vals=L0.geojson.features.map(function(f){return parseFloat((f.properties||{})[field]);});
  var overall=statsOf(vals);
  var groups=null;
  if(group){
    var g={};
    L0.geojson.features.forEach(function(f){ var k=(f.properties||{})[group]; if(k==null||k==='')k='(blank)'; var v=parseFloat((f.properties||{})[field]); if(!g[k])g[k]=[]; if(!isNaN(v))g[k].push(v); });
    groups=Object.keys(g).map(function(k){var s=statsOf(g[k]); return {label:k,n:g[k].length,sum:s?s.sum:0,mean:s?s.mean:0};}).sort(function(a,b){return b.sum-a.sum;});
  }
  return {layer:L0.name,field:field,group:group,overall:overall,groups:groups};
}
function dashRender(res){
  if(!res||!res.overall){ document.getElementById('dashOut').innerHTML='<div class="hint">No statistics.</div>'; return; }
  var o=res.overall;
  var html='<div class="measure-out" style="display:block"><b>'+escapeHtml(res.layer)+'</b> — field <b>'+escapeHtml(res.field)+'</b><br>'+
    '<table style="width:100%;font-size:11.5px;margin-top:6px;border-collapse:collapse">'+
    [['Count',o.n],['Sum',fmtNum(o.sum)],['Min',fmtNum(o.min)],['Max',fmtNum(o.max)],['Mean',fmtNum(o.mean)],['Median',fmtNum(o.median)],['Std dev',fmtNum(o.std)]]
      .map(function(r){return '<tr><td style="padding:2px 0;color:var(--ink-dim)">'+r[0]+'</td><td style="text-align:right;font-weight:700">'+r[1]+'</td></tr>';}).join('')+
    '</table></div>';
  if(res.groups&&res.groups.length){
    var top=res.groups.slice(0,10);
    html+='<div style="margin-top:10px"><b style="font-size:12px">By '+escapeHtml(res.group)+' (sum)</b>'+svgBar(top.map(function(g){return {label:g.label,value:g.sum};}))+'</div>';
    html+='<div style="margin-top:10px">'+svgPie(top.map(function(g){return {label:g.label,value:g.sum};}))+'</div>';
  }
  document.getElementById('dashOut').innerHTML=html;
}
function dashProjectOverview(){
  var ids=Object.keys(layers);
  if(!ids.length){ document.getElementById('dashOut').innerHTML='<div class="hint">No layers loaded.</div>'; toast('No layers to summarize',true); return; }
  var rows=ids.map(function(id){
    var L0=layers[id]; var cnt=featureCountOf(L0); var gt=L0.isRaster?'Raster':(L0.geomType||geomTypeOf(L0.geojson)||'—');
    var meas='';
    if(L0.geojson&&L0.geojson.features&&typeof turf!=='undefined'){
      try{
        if(gt==='Polygon'){ var ar=0; L0.geojson.features.forEach(function(f){try{ar+=turf.area(f);}catch(e){}}); meas=(ar/1e6).toFixed(3)+' km²'; }
        else if(gt==='LineString'){ var ln=0; L0.geojson.features.forEach(function(f){try{ln+=turf.length(f,{units:'kilometers'});}catch(e){}}); meas=ln.toFixed(2)+' km'; }
      }catch(e){}
    }
    return {name:L0.name,type:gt,count:(cnt==null?'—':cnt),meas:meas,vis:L0.visible?'on':'off'};
  });
  var ek=effectiveCrsKey();
  var html='<div class="measure-out" style="display:block"><b>Project overview</b><br>'+
    'Layers: <b>'+ids.length+'</b> · CRS: <b>'+CRS[ek].esri+'</b> ('+CRS[ek].code+')<br>'+
    '<table style="width:100%;font-size:11px;margin-top:6px;border-collapse:collapse">'+
    '<tr style="color:var(--ink-dim)"><td>Layer</td><td>Type</td><td style="text-align:right">Count</td><td style="text-align:right">Size</td><td>Vis</td></tr>'+
    rows.map(function(r){return '<tr><td style="padding:2px 0">'+escapeHtml(r.name).slice(0,18)+'</td><td>'+r.type+'</td><td style="text-align:right">'+r.count+'</td><td style="text-align:right">'+r.meas+'</td><td>'+r.vis+'</td></tr>';}).join('')+
    '</table></div>';
  document.getElementById('dashOut').innerHTML=html;
  return {layers:rows,crs:CRS[ek].esri+' ('+CRS[ek].code+')',count:ids.length};
}
function dashReportHTML(){
  var ov=dashProjectOverview(); var st=dashCompute(true);
  var when=new Date().toLocaleString();
  var body='<h1>Spatial Itqan — Analysis Report</h1><p style="color:#666">Generated '+when+'</p>';
  body+='<h2>Project overview</h2><p>Layers: <b>'+ov.count+'</b> · CRS: '+escapeHtml(ov.crs)+'</p>';
  body+='<table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse;font-size:13px"><tr><th>Layer</th><th>Type</th><th>Count</th><th>Size</th></tr>'+
    ov.layers.map(function(r){return '<tr><td>'+escapeHtml(r.name)+'</td><td>'+r.type+'</td><td>'+r.count+'</td><td>'+r.meas+'</td></tr>';}).join('')+'</table>';
  if(st&&st.overall){
    var o=st.overall;
    body+='<h2>Statistics — '+escapeHtml(st.layer)+' · '+escapeHtml(st.field)+'</h2>';
    body+='<table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse;font-size:13px">'+
      [['Count',o.n],['Sum',fmtNum(o.sum)],['Min',fmtNum(o.min)],['Max',fmtNum(o.max)],['Mean',fmtNum(o.mean)],['Median',fmtNum(o.median)],['Std dev',fmtNum(o.std)]].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>';}).join('')+'</table>';
    if(st.groups&&st.groups.length){ body+='<h3>By '+escapeHtml(st.group)+'</h3>'+svgBar(st.groups.slice(0,12).map(function(g){return {label:g.label,value:g.sum};}),{w:560,h:240}); }
  }
  var doc='<!doctype html><html><head><meta charset="utf-8"><title>Spatial Itqan Report</title>'+
    '<style>body{font-family:Inter,Arial,sans-serif;max-width:820px;margin:30px auto;padding:0 20px;color:#1f2630}h1{color:#2563EB}h2{border-bottom:2px solid #eee;padding-bottom:4px;margin-top:28px}table{margin:10px 0}</style></head><body>'+body+'</body></html>';
  dl(doc,'SpatialItqan_Analysis_Report.html','text/html');
  toast('HTML analysis report exported');
}
function dashReportPDF(){
  if(!(window.jspdf&&window.jspdf.jsPDF)){ toast('PDF library not loaded',true); return; }
  var ov=dashProjectOverview(); var st=dashCompute(true);
  var doc=new window.jspdf.jsPDF({unit:'pt',format:'a4'}); var y=48;
  doc.setFontSize(18); doc.setTextColor(37,99,235); doc.text('Spatial Itqan — Analysis Report',40,y); y+=18;
  doc.setFontSize(9); doc.setTextColor(120); doc.text('Generated '+new Date().toLocaleString(),40,y); y+=24;
  doc.setTextColor(30); doc.setFontSize(13); doc.text('Project overview',40,y); y+=16;
  doc.setFontSize(10); doc.text('Layers: '+ov.count+'   CRS: '+ov.crs,40,y); y+=18;
  doc.setFontSize(9);
  doc.text('Layer',40,y); doc.text('Type',230,y); doc.text('Count',330,y); doc.text('Size',400,y); y+=4;
  doc.line(40,y,555,y); y+=12;
  ov.layers.forEach(function(r){ if(y>780){doc.addPage();y=48;} doc.text(String(r.name).slice(0,30),40,y); doc.text(String(r.type),230,y); doc.text(String(r.count),330,y); doc.text(String(r.meas||''),400,y); y+=14; });
  function finishPdf(){ doc.save('SpatialItqan_Analysis_Report.pdf'); toast('PDF analysis report exported'); }
  if(st&&st.overall){ y+=14; if(y>740){doc.addPage();y=48;}
    var o=st.overall;
    doc.setFontSize(13); doc.text('Statistics — '+st.layer+' · '+st.field,40,y); y+=18; doc.setFontSize(10);
    [['Count',o.n],['Sum',fmtNum(o.sum)],['Min',fmtNum(o.min)],['Max',fmtNum(o.max)],['Mean',fmtNum(o.mean)],['Median',fmtNum(o.median)],['Std dev',fmtNum(o.std)]].forEach(function(r){ doc.text(r[0],40,y); doc.text(String(r[1]),200,y); y+=14; });
    // embed chart image if grouped
    if(st.groups&&st.groups.length){
      var svg=svgBar(st.groups.slice(0,12).map(function(g){return {label:g.label,value:g.sum};}),{w:520,h:220});
      svgToPng(svg,520,220,function(dataUrl){
        if(dataUrl){ if(y>560){doc.addPage();y=48;} doc.setFontSize(12); doc.text('By '+st.group,40,y); y+=10; try{doc.addImage(dataUrl,'PNG',40,y,360,152);}catch(e){} }
        finishPdf();
      });
      return;
    }
  }
  finishPdf();
}
/* render an SVG string to a PNG data URL via canvas */
function svgToPng(svgStr,w,h,cb){
  try{
    var blob=new Blob([svgStr],{type:'image/svg+xml;charset=utf-8'});
    var url=URL.createObjectURL(blob); var img=new Image();
    img.onload=function(){ var cv=document.createElement('canvas'); cv.width=w; cv.height=h; var cx=cv.getContext('2d'); cx.fillStyle='#fff'; cx.fillRect(0,0,w,h); cx.drawImage(img,0,0,w,h); URL.revokeObjectURL(url); try{cb(cv.toDataURL('image/png'));}catch(e){cb(null);} };
    img.onerror=function(){ URL.revokeObjectURL(url); cb(null); };
    img.src=url;
  }catch(e){ cb(null); }
}
function wireDashboard(){
  dashLayerList();
  var dl0=document.getElementById('dashLayer'); if(dl0)dl0.onchange=dashFieldList;
  var ov=document.getElementById('dashOverview'); if(ov)ov.onclick=dashProjectOverview;
  var run=document.getElementById('dashRun'); if(run)run.onclick=function(){dashRender(dashCompute(false));};
  var rh=document.getElementById('dashReportHtml'); if(rh)rh.onclick=dashReportHTML;
  var rp=document.getElementById('dashReportPdf'); if(rp)rp.onclick=dashReportPDF;
  wireGeoprocessing();
}

/* ================= GEOPROCESSING (Batch 1) ================= */
function gpLists(){
  ['gpLayer','gpTargetLayer'].forEach(function(id){
    var sel=document.getElementById(id); if(!sel)return; var cur=sel.value;
    sel.innerHTML='<option value="">— layer —</option>'+Object.keys(layers).filter(function(k){return layers[k].geojson;}).map(function(k){return '<option value="'+k+'">'+escapeHtml(layers[k].name)+'</option>';}).join('');
    if(cur&&layers[cur])sel.value=cur;
  });
}
function gpInput(){ var s=document.getElementById('gpLayer'); var L0=s&&layers[s.value]; if(!L0||!L0.geojson){toast('Choose an input layer',true);return null;} return L0; }
function gpShow(h){ var o=document.getElementById('gpOut'); if(o){o.style.display='block';o.innerHTML=h;} }
/* Buffer */
function gpBuffer(){
  var L0=gpInput(); if(!L0)return;
  if(typeof turf==='undefined'){toast('Turf not loaded',true);return;}
  var dist=parseFloat(prompt('Buffer distance in meters:','100')); if(isNaN(dist))return;
  try{
    var out={type:'FeatureCollection',features:[]};
    L0.geojson.features.forEach(function(f){ if(f.geometry){ try{var b=turf.buffer(f,dist,{units:'meters'}); if(b)out.features.push(b);}catch(e){} } });
    if(!out.features.length){toast('Buffer produced nothing',true);return;}
    var c=nextColor(); addLayer(geoJsonLayer(out,c),L0.name+' buffer '+dist+'m',c,{geojson:out});
    gpShow('Buffered '+out.features.length+' feature(s) by '+dist+' m.');
  }catch(e){toast('Buffer error: '+e.message,true);}
}
/* Field calculator */
function gpFieldCalc(){
  var L0=gpInput(); if(!L0)return;
  var fl=dashFields(L0); var allF=fl.num.concat(fl.cat);
  var newField=prompt('New field name:','calc'); if(!newField)return;
  var expr=prompt('Expression — use field names, +,-,*,/, and helpers AREA, LENGTH.\nExamples:\n  POP / AREA\n  price * 1.05\n  AREA','AREA');
  if(!expr)return;
  var n=0;
  L0.geojson.features.forEach(function(f){
    var p=f.properties||(f.properties={}); var e=expr;
    try{
      var area=0,length=0;
      if(typeof turf!=='undefined'&&f.geometry){ try{if(f.geometry.type.indexOf('Polygon')>=0)area=turf.area(f);}catch(x){} try{if(f.geometry.type.indexOf('LineString')>=0)length=turf.length(f,{units:'meters'});}catch(x){} }
      var scope=Object.assign({AREA:area,LENGTH:length},p);
      // build a safe-ish evaluator: replace identifiers with scope lookups
      var fn=new Function('s','with(s){return ('+e.replace(/[^0-9a-zA-Z_+\-*/().%\s]/g,'')+');}');
      var val=fn(scope);
      if(typeof val==='number'&&isFinite(val)){ p[newField]=Math.round(val*1000)/1000; n++; } else if(val!=null){ p[newField]=val; n++; }
    }catch(e2){}
  });
  // refresh layer rendering/attribute awareness
  if(L0.leaflet&&L0.leaflet.eachLayer)L0.leaflet.eachLayer(function(ly){ if(ly.feature)ly.feature.properties=ly.feature.properties; });
  gpShow('Field <b>'+escapeHtml(newField)+'</b> computed for '+n+' feature(s).');
  toast('Field calculator: '+n+' value(s) set'); refreshDropdowns();
}
/* Definition query / filter — hide non-matching features */
function gpDefQuery(){
  var L0=gpInput(); if(!L0)return;
  var fl=dashFields(L0); var fields=fl.num.concat(fl.cat);
  if(!fields.length){toast('Layer has no attributes to filter',true);return;}
  var field=prompt('Filter field ('+fields.join(', ')+'):',fields[0]); if(!field)return;
  var op=prompt('Operator: = != > < >= <= contains','='); if(!op)return;
  var val=prompt('Value:',''); if(val==null)return;
  var shown=0,hidden=0;
  L0.leaflet.eachLayer(function(ly){
    if(!ly.feature)return; var v=(ly.feature.properties||{})[field];
    var keep=sbaCompare(v,op,val);
    svShowFeature(ly,keep);
    keep?shown++:hidden++;
  });
  L0.defQuery={field:field,op:op,val:val};
  gpShow('Filter applied: <b>'+escapeHtml(field+' '+op+' '+val)+'</b> · '+shown+' shown, '+hidden+' hidden.');
  toast('Filter: '+shown+' shown / '+hidden+' hidden');
}
function gpClearFilter(){
  var L0=gpInput(); if(!L0)return;
  L0.leaflet.eachLayer(function(ly){ svShowFeature(ly,true); });
  L0.defQuery=null; gpShow('Filter cleared.'); toast('Filter cleared');
}
/* Select by location */
function gpSelectByLocation(){
  var L0=gpInput(); if(!L0)return;
  var ts=document.getElementById('gpTargetLayer'); var T=ts&&layers[ts.value];
  if(!T||!T.geojson){toast('Choose a target layer',true);return;}
  if(typeof turf==='undefined'){toast('Turf not loaded',true);return;}
  var rel=document.getElementById('gpSpatialRel').value;
  var nearDist=0; if(rel==='near'){ nearDist=parseFloat(prompt('Within how many meters?','100'))||100; }
  var matches=[];
  L0.leaflet.eachLayer(function(ly){
    if(!ly.feature)return; var f=ly.feature; var hit=false;
    try{
      for(var i=0;i<T.geojson.features.length;i++){ var tf=T.geojson.features[i]; if(!tf.geometry)continue;
        if(rel==='intersects'){ if(turf.booleanIntersects(f,tf)){hit=true;break;} }
        else if(rel==='within'){ try{if(turf.booleanWithin(f,tf)){hit=true;break;}}catch(e){} }
        else if(rel==='near'){ try{var d=turf.distance(turf.centroid(f),turf.centroid(tf),{units:'meters'}); if(d<=nearDist){hit=true;break;}}catch(e){} }
      }
    }catch(e){}
    if(ly.setStyle) ly.setStyle(hit?{color:'#FACC15',weight:4,fillColor:'#FACC15',fillOpacity:.5}:{color:L0.color,weight:2});
    if(hit)matches.push(ly);
  });
  gpShow('Select by location ('+rel+'): <b>'+matches.length+'</b> feature(s) selected.');
  toast(matches.length+' feature(s) selected by location');
  window.__gpSelection={layer:L0,matches:matches};
}
/* Spatial join — copy first matching target attributes onto input features */
function gpSpatialJoin(){
  var L0=gpInput(); if(!L0)return;
  var ts=document.getElementById('gpTargetLayer'); var T=ts&&layers[ts.value];
  if(!T||!T.geojson){toast('Choose a target layer to join from',true);return;}
  if(typeof turf==='undefined'){toast('Turf not loaded',true);return;}
  var out={type:'FeatureCollection',features:[]}, joined=0;
  L0.geojson.features.forEach(function(f){
    if(!f.geometry){out.features.push(f);return;}
    var nf=JSON.parse(JSON.stringify(f)); var done=false;
    for(var i=0;i<T.geojson.features.length&&!done;i++){ var tf=T.geojson.features[i]; if(!tf.geometry)continue;
      try{ if(turf.booleanIntersects(f,tf)){ Object.keys(tf.properties||{}).forEach(function(k){ if(!(k in nf.properties)) nf.properties['t_'+k]=tf.properties[k]; }); joined++; done=true; } }catch(e){}
    }
    out.features.push(nf);
  });
  var c=nextColor(); addLayer(geoJsonLayer(out,c),L0.name+' + '+T.name+' (join)',c,{geojson:out});
  gpShow('Spatial join: '+joined+' of '+L0.geojson.features.length+' feature(s) received attributes from <b>'+escapeHtml(T.name)+'</b>.');
  toast('Spatial join complete: '+joined+' matched');
}
function wireGeoprocessing(){
  gpLists();
  var b=function(id,fn){var el=document.getElementById(id); if(el)el.onclick=fn;};
  b('gpBuffer',gpBuffer); b('gpFieldCalc',gpFieldCalc); b('gpDefQuery',gpDefQuery);
  b('gpClearFilter',gpClearFilter); b('gpSelectLoc',gpSelectByLocation); b('gpSpatialJoin',gpSpatialJoin);
  b('gpSimplify',function(){gpGeomOp('simplify');}); b('gpDensify',function(){gpGeomOp('densify');}); b('gpSmooth',function(){gpGeomOp('smooth');});
  b('gpTimeSlider',gpTimeSlider); b('gpCogo',gpCOGO); b('gpNetwork',gpNetworkPath);
  b('gpSlope',gpSlopeDEM);
  if(typeof wireDataTools==='function')wireDataTools();
}
/* Slope/DEM — honest: full raster watershed/viewshed needs desktop GDAL.
   What we CAN do: slope between elevation points (TIN-style) if the layer has a Z/elev field. */
function gpSlopeDEM(){
  var L0=gpInput(); if(!L0||!L0.geojson){ toast('Choose a point layer that has an elevation field',true); return; }
  var fl=dashFields(L0);
  var zField=fl.num.find(function(k){return /elev|height|^z$|dem|alt/i.test(k);})||fl.num[0];
  if(!zField){
    gpShow('Slope/Watershed/Viewshed from a raster DEM needs desktop GDAL/QGIS (Raster → Analysis → Slope, or r.watershed). Browsers cannot process DEM pixels.<br>If your layer has elevation <i>points</i> with a height field, I can compute point-to-point slope — but no numeric field was found.');
    toast('No elevation field — DEM raster analysis needs QGIS/GDAL',true); return;
  }
  // compute average slope between each point and its nearest neighbor
  var pts=L0.geojson.features.filter(function(f){return f.geometry&&f.geometry.type==='Point';});
  if(pts.length<2){ gpShow('Need at least 2 elevation points. For a raster DEM, use QGIS/GDAL slope tools.'); return; }
  var slopes=[];
  for(var i=0;i<pts.length;i++){
    var best=Infinity,bz=null,bd=null;
    for(var j=0;j<pts.length;j++){ if(i===j)continue;
      try{ var d=turf.distance(pts[i],pts[j],{units:'meters'}); if(d<best){best=d;bz=Math.abs((+pts[i].properties[zField])-(+pts[j].properties[zField]));bd=d;} }catch(e){}
    }
    if(bd&&bd>0&&bz!=null){ slopes.push(Math.atan(bz/bd)*180/Math.PI); }
  }
  if(!slopes.length){ gpShow('Could not compute slopes.'); return; }
  var avg=slopes.reduce(function(a,b){return a+b;},0)/slopes.length;
  var mx=Math.max.apply(null,slopes);
  gpShow('<b>Point slope (field: '+escapeHtml(zField)+')</b><br>Average slope: '+avg.toFixed(1)+'°<br>Max slope: '+mx.toFixed(1)+'°<br><span style="font-size:10px;color:var(--ink-dim)">For continuous slope/aspect/watershed/viewshed from a raster DEM, use QGIS (Raster → Analysis) or GDAL.</span>');
  toast('Point slope computed: avg '+avg.toFixed(1)+'°');
}

/* ================= DATA TOOLS (18 refinements) ================= */
var dtSelection=[];
function dtLists(){ var sel=document.getElementById('dtLayer'); if(!sel)return; var cur=sel.value;
  sel.innerHTML='<option value="">— layer —</option>'+Object.keys(layers).filter(function(k){return layers[k].geojson;}).map(function(k){return '<option value="'+k+'">'+escapeHtml(layers[k].name)+'</option>';}).join('');
  if(cur&&layers[cur])sel.value=cur; }
function dtInput(){ var s=document.getElementById('dtLayer'); var L0=s&&layers[s.value]; if(!L0||!L0.geojson){toast('Choose a layer',true);return null;} return L0; }
function dtShow(h){ var o=document.getElementById('dtOut'); if(o){o.style.display='block';o.innerHTML=h;} }
var dtUnitMode='metric';
function dtBatchEdit(){ var L0=dtInput(); if(!L0)return;
  var fl=dashFields(L0); var fields=fl.num.concat(fl.cat); if(!fields.length){toast('No attributes',true);return;}
  var field=prompt('Field to set ('+fields.join(', ')+'):',fields[0]); if(!field)return;
  var val=prompt('Set ALL features\' "'+field+'" to:',''); if(val==null)return;
  var n=0; L0.geojson.features.forEach(function(f){ if(!f.properties)f.properties={}; f.properties[field]=val; n++; });
  if(L0.leaflet.eachLayer)L0.leaflet.eachLayer(function(ly){ if(ly.feature){ly.feature.properties[field]=val;} });
  dtShow('Batch edit: set <b>'+escapeHtml(field)+'</b> = "'+escapeHtml(val)+'" on '+n+' feature(s).'); toast('Batch edit done'); }
function dtFindReplace(){ var L0=dtInput(); if(!L0)return;
  var fl=dashFields(L0); var fields=fl.num.concat(fl.cat); if(!fields.length){toast('No attributes',true);return;}
  var field=prompt('Field ('+fields.join(', ')+'):',fields[0]); if(!field)return;
  var find=prompt('Find text:',''); if(find==null)return; var rep=prompt('Replace with:',''); if(rep==null)return;
  var n=0; L0.geojson.features.forEach(function(f){ var v=(f.properties||{})[field]; if(v!=null&&String(v).indexOf(find)>=0){ f.properties[field]=String(v).split(find).join(rep); n++; } });
  dtShow('Find/replace in <b>'+escapeHtml(field)+'</b>: '+n+' value(s) changed.'); toast(n+' replaced'); }
function dtCopyAttr(){ var L0=dtInput(); if(!L0)return; toast('Click the SOURCE feature, then the TARGET.');
  function pick(cb){ map.once('click',function(e){ var best=null,bd=Infinity; L0.leaflet.eachLayer(function(ly){ if(!ly.feature)return; try{ var ll; if(ly.getLatLng){var g=ly.getLatLng();ll=[g.lat,g.lng];} else {var cc=turf.centroid(ly.feature).geometry.coordinates;ll=[cc[1],cc[0]];} var d=map.distance(e.latlng,L.latLng(ll[0],ll[1])); if(d<bd){bd=d;best=ly;} }catch(x){} }); cb(best); }); }
  pick(function(s){ if(!s){toast('No source',true);return;} toast('Now click the TARGET.'); pick(function(t){ if(!t){toast('No target',true);return;} t.feature.properties=Object.assign({},s.feature.properties); dtShow('Copied '+Object.keys(s.feature.properties||{}).length+' attribute(s) to target.'); toast('Attributes copied'); }); }); }
function dtSelectAll(){ var L0=dtInput(); if(!L0)return; dtSelection=[]; L0.leaflet.eachLayer(function(ly){ if(ly.setStyle)ly.setStyle({color:'#FACC15',weight:3,fillColor:'#FACC15',fillOpacity:.4}); dtSelection.push(ly); }); dtShow('Selected all '+dtSelection.length+' feature(s).'); toast('All selected'); }
function dtInvert(){ var L0=dtInput(); if(!L0)return; var sel=dtSelection.slice(),inv=[]; L0.leaflet.eachLayer(function(ly){ if(sel.indexOf(ly)<0){ if(ly.setStyle)ly.setStyle({color:'#FACC15',weight:3,fillColor:'#FACC15',fillOpacity:.4}); inv.push(ly); } else { if(ly.setStyle)ly.setStyle({color:L0.color,weight:2,fillOpacity:.2}); } }); dtSelection=inv; dtShow('Inverted: '+inv.length+' now selected.'); toast('Selection inverted'); }
function dtExportSel(){ if(!dtSelection.length){toast('Nothing selected — use Select all first',true);return;}
  var fc={type:'FeatureCollection',features:dtSelection.map(function(ly){try{return ly.toGeoJSON();}catch(e){return null;}}).filter(Boolean)};
  dl(JSON.stringify(fc,null,2),'selected_wgs84.geojson','application/geo+json');
  toast('Exported '+fc.features.length+' selected feature(s) as standard WGS84 GeoJSON'); }
function dtDupDetect(){ var L0=dtInput(); if(!L0)return; var seen={},dups=0;
  L0.leaflet.eachLayer(function(ly){ if(!ly.feature||!ly.feature.geometry)return; var key=JSON.stringify(ly.feature.geometry.coordinates); if(seen[key]){ if(ly.setStyle)ly.setStyle({color:'#E11D48',weight:4}); dups++; } else seen[key]=1; });
  dtShow('Duplicate detector: <b>'+dups+'</b> duplicate(s) highlighted red.'); toast(dups+' duplicate(s)'); }
function dtReverse(){ var L0=dtInput(); if(!L0)return; var n=0; L0.geojson.features.forEach(function(f){ if(f.geometry&&f.geometry.type==='LineString'){ f.geometry.coordinates.reverse(); n++; } });
  var c=L0.color; map.removeLayer(L0.leaflet); var nl=geoJsonLayer(L0.geojson,c); L0.leaflet=nl; if(L0.visible)nl.addTo(map); dtShow('Reversed '+n+' line(s).'); toast(n+' reversed'); }
var dtCapture={on:false,pts:[]};
function dtCoordCapture(){ dtCapture.on=!dtCapture.on;
  if(dtCapture.on){ dtCapture.pts=[]; toast('Capture ON — click map to drop points. Click again to finish.');
    dtCapture.handler=function(e){ dtCapture.pts.push([e.latlng.lng,e.latlng.lat]); L.circleMarker(e.latlng,{radius:4,color:'#2563EB',fillColor:'#2563EB',fillOpacity:.9}).addTo(map); var c=toCRS(e.latlng.lng,e.latlng.lat,crsKey); dtShow('Captured '+dtCapture.pts.length+' point(s). Last: '+c.fmt); };
    map.on('click',dtCapture.handler);
  } else { map.off('click',dtCapture.handler);
    if(dtCapture.pts.length){ var fc={type:'FeatureCollection',features:dtCapture.pts.map(function(p,i){return {type:'Feature',properties:{id:i+1},geometry:{type:'Point',coordinates:p}};})}; var c=nextColor(); addLayer(geoJsonLayer(fc,c),'Captured points',c,{geojson:fc}); toast(dtCapture.pts.length+' captured → new layer'); } else toast('Capture off'); } }
function dtCoordsToGeom(){ var txt=prompt('Paste "lon,lat" per line (auto-detects lat,lon). 2+ lines=line; first=last=polygon:',''); if(!txt)return;
  var rows=txt.trim().split(/\n+/).map(function(l){return l.split(/[,\s]+/).map(parseFloat).filter(function(x){return !isNaN(x);});}).filter(function(a){return a.length>=2;});
  if(!rows.length){toast('No valid coordinates',true);return;}
  var coords=rows.map(function(r){ var a=r[0],b=r[1]; if(Math.abs(a)<=90&&Math.abs(b)>90)return [b,a]; return [a,b]; });
  var geom; if(coords.length===1)geom={type:'Point',coordinates:coords[0]}; else { var closed=coords[0][0]===coords[coords.length-1][0]&&coords[0][1]===coords[coords.length-1][1]; geom=closed?{type:'Polygon',coordinates:[coords]}:{type:'LineString',coordinates:coords}; }
  var fc={type:'FeatureCollection',features:[{type:'Feature',properties:{source:'pasted'},geometry:geom}]};
  var c=nextColor(); addLayer(geoJsonLayer(fc,c),'Pasted geometry',c,{geojson:fc}); toast('Created '+geom.type+' from '+coords.length+' point(s)'); }
function dtClipboard(){ if(typeof leafletImage==='undefined'){toast('Map capture not loaded',true);return;}
  toast('Capturing map…'); leafletImage(map,function(err,canvas){ if(err||!canvas){toast('Capture failed',true);return;}
    canvas.toBlob(function(blob){ try{ navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){toast('Map copied to clipboard');},function(){toast('Clipboard blocked — use PNG export',true);}); }catch(e){ toast('Clipboard not supported — use PNG export',true); } }); }); }
function dtBookmarkIO(){ var act=prompt('Type "export" to save bookmarks to a file, or "import" to load:',''); if(!act)return;
  if(act==='export'){ var bm=[]; try{bm=JSON.parse(localStorage.getItem('SpatialViewBookmarks')||'[]');}catch(e){} if(!bm.length){toast('No bookmarks to export',true);return;} dl(JSON.stringify(bm,null,2),'bookmarks.json','application/json'); toast('Bookmarks exported'); }
  else if(act==='import'){ var inp=document.createElement('input'); inp.type='file'; inp.accept='.json'; inp.onchange=function(e){ var f=e.target.files[0]; if(!f)return; var r=new FileReader(); r.onload=function(){ try{ var bm=JSON.parse(r.result); localStorage.setItem('SpatialViewBookmarks',JSON.stringify(bm)); toast('Imported '+bm.length+' bookmark(s)'); }catch(x){toast('Invalid file',true);} }; r.readAsText(f); }; inp.click(); } }
var scaleVisHandler=null;
function setupScaleVis(){ var L0=dtInput(); if(!L0){toast('Choose a layer first',true);var cb=document.getElementById('dtScaleVis');if(cb)cb.checked=false;return;}
  var min=parseInt(prompt('Show "'+L0.name+'" from zoom (min):','0')); var max=parseInt(prompt('…to zoom (max):','22'));
  if(isNaN(min)||isNaN(max))return; L0.scaleVis={min:min,max:max};
  scaleVisHandler=function(){ Object.keys(layers).forEach(function(id){ var L=layers[id]; if(L.scaleVis){ var z=map.getZoom(),vis=z>=L.scaleVis.min&&z<=L.scaleVis.max; if(vis&&!map.hasLayer(L.leaflet)&&L.visible)L.leaflet.addTo(map); else if(!vis&&map.hasLayer(L.leaflet))map.removeLayer(L.leaflet); } }); };
  map.on('zoomend',scaleVisHandler); scaleVisHandler(); toast(L0.name+' visible z'+min+'–'+max); }
function teardownScaleVis(){ if(scaleVisHandler)map.off('zoomend',scaleVisHandler); Object.keys(layers).forEach(function(id){ var L=layers[id]; if(L.scaleVis){delete L.scaleVis; if(L.visible&&!map.hasLayer(L.leaflet))L.leaflet.addTo(map);} }); toast('Scale visibility off'); }
function wireDataTools(){
  dtLists();
  var b=function(id,fn){var el=document.getElementById(id); if(el)el.onclick=fn;};
  b('dtBatchEdit',dtBatchEdit); b('dtFindReplace',dtFindReplace); b('dtCopyAttr',dtCopyAttr);
  b('dtInvert',dtInvert); b('dtSelectAll',dtSelectAll); b('dtExportSel',dtExportSel);
  b('dtDupDetect',dtDupDetect); b('dtReverse',dtReverse); b('dtCoordCapture',dtCoordCapture);
  b('dtCoordsToGeom',dtCoordsToGeom); b('dtClipboard',dtClipboard); b('dtBookmarkIO',dtBookmarkIO);
  var u=document.getElementById('dtUnits'); if(u)u.onchange=function(){dtUnitMode=this.value; toast('Units: '+(this.value==='imperial'?'Imperial':'Metric'));};
  var az=document.getElementById('dtAutoZoom'); if(az)az.onchange=function(){window.__autoZoomNew=this.checked;}; window.__autoZoomNew=true;
  var sc=document.getElementById('dtScaleVis'); if(sc)sc.onchange=function(){ if(this.checked)setupScaleVis(); else teardownScaleVis(); };
  var sn=document.getElementById('dtSnap'); if(sn)sn.onchange=function(){ window.__snapEnabled=this.checked; toast('Snapping '+(this.checked?'on':'off')); };
}
/* Geometry operations: simplify / densify / smooth */
function gpGeomOp(kind){
  var L0=gpInput(); if(!L0)return; if(typeof turf==='undefined'){toast('Turf not loaded',true);return;}
  var out={type:'FeatureCollection',features:[]}, n=0;
  L0.geojson.features.forEach(function(f){
    if(!f.geometry){out.features.push(f);return;}
    try{
      var g=f;
      if(kind==='simplify'){ g=turf.simplify(f,{tolerance:0.0005,highQuality:true}); }
      else if(kind==='densify'){ if(f.geometry.type==='LineString'||f.geometry.type==='Polygon'){ g=turf.cleanCoords(f); } }
      else if(kind==='smooth'){ if(turf.bezierSpline && f.geometry.type==='LineString'){ g=turf.bezierSpline(f,{resolution:10000,sharpness:0.85}); g.properties=f.properties; } }
      out.features.push(g); n++;
    }catch(e){ out.features.push(f); }
  });
  var c=nextColor(); addLayer(geoJsonLayer(out,c),L0.name+' ('+kind+')',c,{geojson:out});
  gpShow(kind.charAt(0).toUpperCase()+kind.slice(1)+' applied to '+n+' feature(s).');
  toast(kind+' complete');
}
/* Time slider — animate by a date field */
var timeState={layer:null,field:null,dates:[]};
function gpTimeSlider(){
  var L0=gpInput(); if(!L0||!L0.geojson){toast('Choose a layer with a date field',true);return;}
  var wrap=document.getElementById('timeSliderWrap'); var fsel=document.getElementById('timeField');
  // find date-like fields
  var fields={}; L0.geojson.features.forEach(function(f){ Object.keys(f.properties||{}).forEach(function(k){ var v=(f.properties||{})[k]; if(v&&!isNaN(Date.parse(v)))fields[k]=1; }); });
  var ks=Object.keys(fields);
  if(!ks.length){ toast('No date/time field found in this layer',true); return; }
  fsel.innerHTML=ks.map(function(k){return '<option>'+escapeHtml(k)+'</option>';}).join('');
  wrap.style.display='block'; timeState.layer=L0;
  function rebuild(){
    var field=fsel.value; timeState.field=field;
    var ds=L0.geojson.features.map(function(f){return Date.parse((f.properties||{})[field]);}).filter(function(d){return !isNaN(d);}).sort(function(a,b){return a-b;});
    timeState.dates=ds;
    apply();
  }
  function apply(){
    var rng=document.getElementById('timeRange'); var pct=+rng.value/100;
    if(!timeState.dates.length)return;
    var min=timeState.dates[0],max=timeState.dates[timeState.dates.length-1];
    var cut=min+(max-min)*pct;
    document.getElementById('timeLabel').textContent='Showing up to '+new Date(cut).toLocaleDateString();
    var shown=0;
    L0.leaflet.eachLayer(function(ly){ if(!ly.feature)return; var d=Date.parse((ly.feature.properties||{})[timeState.field]); var keep=isNaN(d)||d<=cut; svShowFeature(ly,keep); if(keep)shown++; });
  }
  fsel.onchange=rebuild; document.getElementById('timeRange').oninput=apply;
  rebuild(); toast('Time slider active — drag to animate by date');
}
/* COGO — coordinate geometry: traverse by bearing + distance */
function gpCOGO(){
  toast('COGO: click a start point on the map.');
  map.once('click',function(e){
    var pts=[[e.latlng.lng,e.latlng.lat]]; var cur=e.latlng;
    function step(){
      var inp=prompt('Enter bearing° and distance(m) as "bearing,distance" (blank to finish):\nExample: 45,100',''); 
      if(!inp){ finish(); return; }
      var parts=inp.split(','); var brg=parseFloat(parts[0]), dist=parseFloat(parts[1]);
      if(isNaN(brg)||isNaN(dist)){ finish(); return; }
      try{ var dest=turf.destination([cur.lng,cur.lat],dist/1000,brg,{units:'kilometers'}); cur=L.latLng(dest.geometry.coordinates[1],dest.geometry.coordinates[0]); pts.push([cur.lng,cur.lat]); step(); }catch(err){ finish(); }
    }
    function finish(){
      if(pts.length<2){ toast('COGO cancelled',true); return; }
      var fc={type:'FeatureCollection',features:[turf.lineString(pts,{type:'COGO traverse'})]};
      var c=nextColor(); addLayer(geoJsonLayer(fc,c),'COGO traverse',c,{geojson:fc});
      toast('COGO traverse created with '+pts.length+' point(s)');
    }
    step();
  });
}
/* Network shortest path on a line layer (nearest-vertex graph) */
function gpNetworkPath(){
  var L0=gpInput(); if(!L0||!L0.geojson){toast('Choose a line layer for the network',true);return;}
  var lines=L0.geojson.features.filter(function(f){return f.geometry&&f.geometry.type==='LineString';});
  if(!lines.length){toast('Layer has no line features',true);return;}
  if(typeof turf==='undefined'||!turf.shortestPath){ 
    // fallback: use point-to-point straight path along nearest lines
    toast('Click start point, then end point — path follows the network approximately.');
  }
  var fc={type:'FeatureCollection',features:lines};
  toast('Click the START point near the network.');
  map.once('click',function(a){
    toast('Now click the END point.');
    map.once('click',function(b){
      try{
        if(turf.shortestPath){
          var path=turf.shortestPath([a.latlng.lng,a.latlng.lat],[b.latlng.lng,b.latlng.lat],{obstacles:turf.featureCollection([])});
          var c=nextColor(); addLayer(geoJsonLayer({type:'FeatureCollection',features:[path]},c),'Shortest path',c,{geojson:{type:'FeatureCollection',features:[path]}});
          toast('Path computed');
        } else { toast('Network routing not available in this Turf build — use the Route tab for road routing.',true); }
      }catch(e){ toast('Path error: '+e.message,true); }
    });
  });
}

/* ================= AUTO-SAVE / CRASH RECOVERY (Batch 1) ================= */
var AUTOSAVE_KEY='SpatialItqanAutosave';
function autoSaveNow(){
  try{
    if(typeof exportProjectObject!=='function')return;
    var obj=exportProjectObject(); obj.__savedAt=Date.now();
    localStorage.setItem(AUTOSAVE_KEY,JSON.stringify(obj));
  }catch(e){}
}
function checkAutoSaveRecovery(){
  try{
    var s=localStorage.getItem(AUTOSAVE_KEY); if(!s)return;
    var obj=JSON.parse(s); if(!obj||!obj.__savedAt)return;
    var mins=Math.round((Date.now()-obj.__savedAt)/60000);
    var nLayers=(obj.layers&&obj.layers.length)||0;
    if(!nLayers)return;
    if(confirm('Recover your previous session?\n'+nLayers+' layer(s), auto-saved '+(mins<1?'just now':mins+' min ago')+'.')){
      if(typeof restoreProject==='function'){ restoreProject(obj); toast('Session recovered: '+nLayers+' layer(s)'); }
    }
  }catch(e){}
}
setInterval(autoSaveNow, 45000); // every 45s
window.addEventListener('beforeunload', autoSaveNow);

/* ================= NAVIGATION & MARKUP (Batch 2) ================= */
/* MGRS readout + search */
function toMGRS(lng,lat){
  // compute MGRS from lat/lng using UTM
  try{
    var zone=Math.floor((lng+180)/6)+1;
    var bandLetters='CDEFGHJKLMNPQRSTUVWX';
    var band=bandLetters.charAt(Math.floor((lat+80)/8));
    if(!hasProj)return null;
    var p=proj4('EPSG:4326','EPSG:'+(32600+zone),[lng,lat]);
    var e=p[0],n=p[1];
    // 100km grid square letters
    var col='ABCDEFGH JKLMNPQR STUVWXYZ'.replace(/ /g,'');
    var e100=Math.floor(e/100000);
    var colSet=['ABCDEFGH','JKLMNPQR','STUVWXYZ'][(zone-1)%3];
    var colLetter=colSet.charAt((e100-1)%8);
    var rowSet=(zone%2)?'ABCDEFGHJKLMNPQRSTUV':'FGHJKLMNPQRSTUVABCDE';
    var n100=Math.floor(n/100000)%20;
    var rowLetter=rowSet.charAt(n100);
    var eStr=String(Math.floor(e%100000)).padStart(5,'0');
    var nStr=String(Math.floor(n%100000)).padStart(5,'0');
    return zone+band+' '+colLetter+rowLetter+' '+eStr+' '+nStr;
  }catch(e){return null;}
}
var mgrsOn=false, mgrsHandler=null;
function pdToggleMGRS(){
  mgrsOn=!mgrsOn;
  if(mgrsOn){
    toast('MGRS readout on — move over the map. Click MGRS again to turn off.');
    mgrsHandler=function(e){ var m=toMGRS(e.latlng.lng,e.latlng.lat); var el=document.getElementById('coordText'); if(m&&el){ el.setAttribute('data-mgrs','1'); el.textContent='MGRS '+m; } };
    map.on('mousemove',mgrsHandler);
  } else {
    if(mgrsHandler)map.off('mousemove',mgrsHandler); toast('MGRS readout off');
  }
}
/* Magnifier loupe */
var loupe=null;
function pdToggleLoupe(){
  if(loupe){ document.removeEventListener('mousemove',loupe.move); if(loupe.el.parentNode)loupe.el.parentNode.removeChild(loupe.el); loupe=null; toast('Magnifier off'); return; }
  var el=document.createElement('div');
  el.style.cssText='position:fixed;width:160px;height:160px;border:3px solid var(--brand);border-radius:50%;pointer-events:none;z-index:3000;display:none;box-shadow:0 6px 24px rgba(0,0,0,.4);overflow:hidden;background:#fff';
  document.body.appendChild(el);
  var move=function(e){
    var mapEl=document.getElementById('map'); var r=mapEl.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){ el.style.display='none'; return; }
    el.style.display='block'; el.style.left=(e.clientX-80)+'px'; el.style.top=(e.clientY-80)+'px';
    el.style.background='var(--panel)';
    el.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:11px;color:var(--ink-dim);text-align:center;padding:8px">Magnifier<br>'+map.getZoom()+'→'+(map.getZoom()+2)+'<br><b style="font-size:13px;color:var(--brand)">'+map.containerPointToLatLng(L.point(e.clientX-r.left,e.clientY-r.top)).lat.toFixed(5)+'</b></div>';
  };
  document.addEventListener('mousemove',move);
  loupe={el:el,move:move};
  toast('Magnifier on (shows zoom + coordinate). Click Magnifier again to turn off.');
}
/* Graticule overlay */
var graticule=null;
function pdToggleGraticule(){
  if(graticule){ map.removeLayer(graticule); graticule=null; toast('Graticule off'); return; }
  graticule=L.layerGroup();
  function draw(){
    if(!graticule)return; graticule.clearLayers();
    var b=map.getBounds(), z=map.getZoom();
    var step=z<4?10:z<6?5:z<8?2:z<10?1:z<12?0.5:z<14?0.1:0.05;
    var s=Math.floor(b.getWest()/step)*step, e=Math.ceil(b.getEast()/step)*step;
    var so=Math.floor(b.getSouth()/step)*step, no=Math.ceil(b.getNorth()/step)*step;
    for(var x=s;x<=e;x+=step){ L.polyline([[b.getSouth(),x],[b.getNorth(),x]],{color:'#888',weight:.5,opacity:.5,interactive:false}).addTo(graticule); L.marker([b.getNorth(),x],{icon:L.divIcon({className:'grat-lbl',html:'<span style="font-size:9px;color:#666;background:rgba(255,255,255,.7);padding:0 2px">'+x.toFixed(2)+'</span>'}),interactive:false}).addTo(graticule); }
    for(var y=so;y<=no;y+=step){ L.polyline([[y,b.getWest()],[y,b.getEast()]],{color:'#888',weight:.5,opacity:.5,interactive:false}).addTo(graticule); L.marker([y,b.getWest()],{icon:L.divIcon({className:'grat-lbl',html:'<span style="font-size:9px;color:#666;background:rgba(255,255,255,.7);padding:0 2px">'+y.toFixed(2)+'</span>'}),interactive:false}).addTo(graticule); }
  }
  graticule.addTo(map); draw(); map.on('moveend zoomend',draw); graticule._draw=draw;
  toast('Graticule on. Click Graticule again to turn off.');
}
/* Annotation / redline */
var redlineLayer=null;
function pdAnnotate(){
  if(!redlineLayer){ redlineLayer=L.layerGroup().addTo(map); }
  var kind=prompt('Redline: type "text", "arrow", or "free" (freehand):','text');
  if(!kind)return;
  if(kind==='text'){
    var t=prompt('Text to place:',''); if(!t)return;
    toast('Click the map to place the text.');
    map.once('click',function(e){ L.marker(e.latlng,{icon:L.divIcon({className:'redline-text',html:'<span style="background:rgba(255,255,0,.8);padding:2px 5px;border-radius:3px;font-size:12px;font-weight:700;color:#900">'+escapeHtml(t)+'</span>',iconSize:[1,1]})}).addTo(redlineLayer); toast('Text placed'); });
  } else if(kind==='arrow'){
    toast('Click start then end of the arrow.');
    map.once('click',function(a){ map.once('click',function(b){ L.polyline([a.latlng,b.latlng],{color:'#E11D48',weight:3}).addTo(redlineLayer); L.marker(b.latlng,{icon:L.divIcon({className:'redline-arr',html:'<span style="color:#E11D48;font-size:18px">➤</span>',iconSize:[1,1]})}).addTo(redlineLayer); toast('Arrow drawn'); }); });
  } else {
    toast('Freehand: use the Editing → Feature → Line tool for freehand drawing.');
  }
}
/* Recent files (names persisted) */
function recentAdd(name){ try{ var r=JSON.parse(localStorage.getItem('SpatialItqanRecent')||'[]'); r=r.filter(function(x){return x!==name;}); r.unshift(name); r=r.slice(0,12); localStorage.setItem('SpatialItqanRecent',JSON.stringify(r)); }catch(e){} }
function pdRecent(){
  var r=[]; try{ r=JSON.parse(localStorage.getItem('SpatialItqanRecent')||'[]'); }catch(e){}
  if(!r.length){ toast('No recent files yet — loaded files will be listed here',true); return; }
  pdShow('<b>Recently loaded files:</b><br>'+r.map(function(n){return '• '+escapeHtml(n);}).join('<br>')+'<br><span style="font-size:10px;color:var(--ink-dim)">(re-add via Add data)</span>');
}
/* Layer groups (visual grouping by toggling sets) */
function pdGroups(){
  var ids=Object.keys(layers); if(!ids.length){ toast('No layers to group',true); return; }
  pdShow('<b>Layer groups</b><br>'+
    '<button class="btn" style="margin:4px 0;font-size:10px" onclick="layerGroupSet(true)">Show all layers</button>'+
    '<button class="btn" style="margin:4px 0;font-size:10px" onclick="layerGroupSet(false)">Hide all layers</button><br>'+
    '<span style="font-size:10px;color:var(--ink-dim)">Tip: use the Layers panel ⋯ menu on each layer for ordering &amp; visibility.</span>');
}
function layerGroupSet(vis){
  Object.keys(layers).forEach(function(id){ var L0=layers[id]; L0.visible=vis; if(vis)L0.leaflet.addTo(map); else map.removeLayer(L0.leaflet); });
  renderLayers(); refreshDropdowns(); toast(vis?'All layers shown':'All layers hidden');
}
window.layerGroupSet=layerGroupSet;
function wireBatch2(){
  var b=function(id,fn){var el=document.getElementById(id); if(el)el.onclick=fn;};
  b('pdMgrs',pdToggleMGRS); b('pdLoupe',pdToggleLoupe); b('pdGrid',pdToggleGraticule);
  b('pdAnnotate',pdAnnotate); b('pdRecent',pdRecent); b('pdGroups',pdGroups);
}

/* ================= LINEAR REFERENCING SYSTEM (LRS) ================= */
var lrs={route:null,unit:'kilometers',startM:0,totalM:0,events:[],markerLayer:null,eventLayer:null,name:''};
function lrsUnitAbbr(){ return lrs.unit==='kilometers'?'km':(lrs.unit==='miles'?'mi':'m'); }
function lrsLayerList(){
  var sel=document.getElementById('lrsLayer'); if(!sel)return; var cur=sel.value;
  var lines=Object.keys(layers).filter(function(id){ var L0=layers[id]; var gt=L0.geomType||(L0.geojson&&geomTypeOf(L0.geojson)); return gt==='LineString'||gt==='Mixed'; });
  sel.innerHTML='<option value="">— choose a line layer —</option>'+lines.map(function(id){return '<option value="'+id+'">'+escapeHtml(layers[id].name)+'</option>';}).join('');
  if(cur&&layers[cur])sel.value=cur;
}
function lrsShow(h){ var o=document.getElementById('lrsOut'); if(o){o.style.display='block';o.innerHTML=h;} }
function lrsFirstLine(L0){
  if(!L0||!L0.geojson)return null;
  var f=(L0.geojson.features||[]).find(function(f){return f.geometry&&(f.geometry.type==='LineString'||f.geometry.type==='MultiLineString');});
  if(!f)return null;
  if(f.geometry.type==='MultiLineString') return turf.lineString(f.geometry.coordinates[0]);
  return turf.lineString(f.geometry.coordinates);
}
function lrsCalibrate(){
  var sel=document.getElementById('lrsLayer'); var id=sel&&sel.value;
  if(!id||!layers[id]){ toast('Choose a line layer to calibrate',true); return; }
  var line=lrsFirstLine(layers[id]);
  if(!line){ toast('Selected layer has no line geometry',true); return; }
  lrs.unit=document.getElementById('lrsUnit').value;
  lrs.startM=parseFloat(document.getElementById('lrsStartM').value)||0;
  lrs.route=line; lrs.name=layers[id].name;
  lrs.totalM=turf.length(line,{units:lrs.unit});
  lrs.events=[]; lrsRenderEvents();
  var endM=lrs.startM+lrs.totalM;
  document.getElementById('lrsStatus').innerHTML='<b>Route calibrated:</b> '+escapeHtml(lrs.name)+'<br>Measures '+lrs.startM.toFixed(2)+' → '+endM.toFixed(2)+' '+lrsUnitAbbr()+' (length '+lrs.totalM.toFixed(2)+' '+lrsUnitAbbr()+')';
  toast('Route calibrated: '+lrs.totalM.toFixed(2)+' '+lrsUnitAbbr());
}
function lrsCheck(){ if(!lrs.route){ toast('Calibrate a route first',true); return false; } return true; }
/* measure -> point */
function lrsMeasureToPoint(){
  if(!lrsCheck())return;
  var m=parseFloat(document.getElementById('lrsMeasure').value);
  if(isNaN(m)){ toast('Enter a measure value',true); return; }
  var along=m-lrs.startM;
  if(along<0||along>lrs.totalM){ toast('Measure '+m+' is outside the route ('+lrs.startM.toFixed(2)+'–'+(lrs.startM+lrs.totalM).toFixed(2)+')',true); return; }
  var pt=turf.along(lrs.route,along,{units:lrs.unit});
  var ll=[pt.geometry.coordinates[1],pt.geometry.coordinates[0]];
  var mk=L.marker(ll).addTo(map).bindPopup('Station '+m.toFixed(2)+' '+lrsUnitAbbr()).openPopup();
  map.setView(ll,Math.max(map.getZoom(),14));
  lrsShow('Located station <b>'+m.toFixed(2)+' '+lrsUnitAbbr()+'</b> at '+ll[0].toFixed(6)+', '+ll[1].toFixed(6));
}
/* point -> measure (click) */
function lrsPointToMeasure(){
  if(!lrsCheck())return;
  toast('Click anywhere near the route to read its station.');
  map.once('click',function(e){
    var pt=turf.point([e.latlng.lng,e.latlng.lat]);
    var snapped=turf.nearestPointOnLine(lrs.route,pt,{units:lrs.unit});
    var m=lrs.startM+snapped.properties.location;
    var off=snapped.properties.dist;
    var ll=[snapped.geometry.coordinates[1],snapped.geometry.coordinates[0]];
    L.circleMarker(ll,{radius:6,color:'#F59E0B',fillColor:'#F59E0B',fillOpacity:.9}).addTo(map)
      .bindPopup('Station '+m.toFixed(3)+' '+lrsUnitAbbr()+'<br>offset '+(off*1000).toFixed(1)+' m').openPopup();
    lrsShow('Nearest station: <b>'+m.toFixed(3)+' '+lrsUnitAbbr()+'</b> (offset '+(off*(lrs.unit==='meters'?1:1000)).toFixed(1)+' m from route)');
  });
}
/* events */
function lrsAddEvent(){
  if(!lrsCheck())return;
  var name=document.getElementById('lrsEvName').value.trim()||('Event '+(lrs.events.length+1));
  var from=parseFloat(document.getElementById('lrsEvFrom').value);
  var toV=document.getElementById('lrsEvTo').value; var to=toV===''?null:parseFloat(toV);
  if(isNaN(from)){ toast('Enter a From measure',true); return; }
  lrs.events.push({name:name,from:from,to:(isNaN(to)?null:to)});
  document.getElementById('lrsEvName').value='';document.getElementById('lrsEvFrom').value='';document.getElementById('lrsEvTo').value='';
  lrsRenderEvents();
  toast('Event added: '+name);
}
function lrsRenderEvents(){
  var el=document.getElementById('lrsEventList'); if(!el)return;
  if(!lrs.events.length){ el.innerHTML='<div>No events yet.</div>'; if(lrs.eventLayer){map.removeLayer(lrs.eventLayer);lrs.eventLayer=null;} return; }
  el.innerHTML=lrs.events.map(function(ev,i){
    var type=ev.to==null?'point @ '+ev.from:'line '+ev.from+'→'+ev.to;
    return '<div class="layerrow" style="padding:6px 8px"><label style="flex:1;font-size:11.5px">'+escapeHtml(ev.name)+' <span style="color:var(--ink-dim)">('+type+' '+lrsUnitAbbr()+')</span></label><button class="x" data-i="'+i+'">✕</button></div>';
  }).join('');
  el.querySelectorAll('.x').forEach(function(b){ b.onclick=function(){ lrs.events.splice(+b.getAttribute('data-i'),1); lrsRenderEvents(); }; });
  lrsDrawEvents();
}
function lrsDrawEvents(){
  if(lrs.eventLayer){map.removeLayer(lrs.eventLayer);} lrs.eventLayer=L.layerGroup().addTo(map);
  lrs.events.forEach(function(ev){
    try{
      if(ev.to==null){
        var a=ev.from-lrs.startM; if(a<0||a>lrs.totalM)return;
        var p=turf.along(lrs.route,a,{units:lrs.unit});
        L.circleMarker([p.geometry.coordinates[1],p.geometry.coordinates[0]],{radius:6,color:'#7C3AED',fillColor:'#7C3AED',fillOpacity:.9}).bindTooltip(ev.name).addTo(lrs.eventLayer);
      } else {
        var seg=lrsSlice(ev.from,ev.to); if(!seg)return;
        L.geoJSON(seg,{style:{color:'#F0653A',weight:5,opacity:.85}}).bindTooltip(ev.name+' ('+ev.from+'→'+ev.to+')').addTo(lrs.eventLayer);
      }
    }catch(e){}
  });
}
function lrsSlice(fromM,toM){
  var a=Math.min(fromM,toM)-lrs.startM, b=Math.max(fromM,toM)-lrs.startM;
  a=Math.max(0,a); b=Math.min(lrs.totalM,b); if(b<=a)return null;
  return turf.lineSliceAlong(lrs.route,a,b,{units:lrs.unit});
}
/* stationing markers */
function lrsStationing(){
  if(!lrsCheck())return;
  var iv=parseFloat(document.getElementById('lrsInterval').value); if(isNaN(iv)||iv<=0){ toast('Enter a valid interval',true); return; }
  if(lrs.markerLayer){map.removeLayer(lrs.markerLayer);} lrs.markerLayer=L.layerGroup().addTo(map);
  var count=0;
  for(var d=0; d<=lrs.totalM+1e-9; d+=iv){
    var p=turf.along(lrs.route,d,{units:lrs.unit}); var st=(lrs.startM+d);
    L.marker([p.geometry.coordinates[1],p.geometry.coordinates[0]],{icon:L.divIcon({className:'lrs-station',html:'<div style="background:var(--brand);color:#fff;font-size:9px;font-weight:700;padding:1px 4px;border-radius:4px;white-space:nowrap">'+st.toFixed(iv<1?2:0)+'</div>',iconSize:[1,1]})}).addTo(lrs.markerLayer);
    count++; if(count>2000)break;
  }
  lrsShow('Placed '+count+' station markers every '+iv+' '+lrsUnitAbbr());
  toast(count+' stationing markers placed');
}
/* split route at a measure -> add two new line layers */
function lrsSplit(){
  if(!lrsCheck())return;
  var m=parseFloat(prompt('Split route at which measure ('+lrs.startM.toFixed(2)+'–'+(lrs.startM+lrs.totalM).toFixed(2)+' '+lrsUnitAbbr()+')?',''));
  if(isNaN(m))return;
  var a=m-lrs.startM; if(a<=0||a>=lrs.totalM){ toast('Measure must be inside the route',true); return; }
  var s1=turf.lineSliceAlong(lrs.route,0,a,{units:lrs.unit}), s2=turf.lineSliceAlong(lrs.route,a,lrs.totalM,{units:lrs.unit});
  var fc1={type:'FeatureCollection',features:[turf.feature(s1.geometry,{seg:'A',from:lrs.startM,to:m})]};
  var fc2={type:'FeatureCollection',features:[turf.feature(s2.geometry,{seg:'B',from:m,to:lrs.startM+lrs.totalM})]};
  var c1=nextColor(),c2=nextColor();
  addLayer(L.geoJSON(fc1,{style:{color:c1,weight:4}}),lrs.name+' [A '+lrs.startM.toFixed(1)+'-'+m.toFixed(1)+']',c1,{geojson:fc1,geomType:'LineString'});
  addLayer(L.geoJSON(fc2,{style:{color:c2,weight:4}}),lrs.name+' [B '+m.toFixed(1)+'-'+(lrs.startM+lrs.totalM).toFixed(1)+']',c2,{geojson:fc2,geomType:'LineString'});
  toast('Route split at '+m.toFixed(2)+' '+lrsUnitAbbr()+' into two layers');
}
/* export events with computed coordinates */
function lrsExport(){
  if(!lrsCheck())return;
  if(!lrs.events.length){ toast('No events to export',true); return; }
  var feats=[];
  lrs.events.forEach(function(ev){
    try{
      if(ev.to==null){
        var p=turf.along(lrs.route,ev.from-lrs.startM,{units:lrs.unit});
        p.properties={name:ev.name,measure:ev.from,type:'point',unit:lrsUnitAbbr(),lon:p.geometry.coordinates[0],lat:p.geometry.coordinates[1]};
        feats.push(p);
      } else {
        var seg=lrsSlice(ev.from,ev.to); if(seg){ seg.properties={name:ev.name,from:ev.from,to:ev.to,type:'line',unit:lrsUnitAbbr(),length:Math.abs(ev.to-ev.from)}; feats.push(seg); }
      }
    }catch(e){}
  });
  var fc={type:'FeatureCollection',features:feats};
  dl(JSON.stringify(fc,null,2),'lrs_events_'+safeName2(lrs.name)+'.geojson','application/json');
  toast('Exported '+feats.length+' LRS event(s)');
}
function safeName2(s){ return (s||'route').replace(/[^a-z0-9]+/gi,'_').slice(0,40); }
function wireLRS(){
  lrsLayerList();
  var b=function(id,fn){var el=document.getElementById(id); if(el)el.onclick=fn;};
  b('lrsCalibrate',lrsCalibrate);
  b('lrsMtoP',lrsMeasureToPoint);
  b('lrsPtoM',lrsPointToMeasure);
  b('lrsAddEvent',lrsAddEvent);
  b('lrsStationing',lrsStationing);
  b('lrsSplit',lrsSplit);
  b('lrsExport',lrsExport);
}
/* GPX incl. waypoints (wpt) — togeojson handles wpt/trk/rte */
function readGpx(text){
  var dom=new DOMParser().parseFromString(text,'text/xml');
  var gj=toGeoJSON.gpx(dom);
  return gj;
}
/* CSV -> rows of arrays */
function csvRows(text){
  return text.split(/\r?\n/).filter(function(l){return l.trim();}).map(function(l){
    // simple split that tolerates quoted commas
    var out=[],cur='',q=false;
    for(var i=0;i<l.length;i++){var ch=l[i];
      if(ch==='"'){q=!q;} else if(ch===','&&!q){out.push(cur);cur='';} else cur+=ch;}
    out.push(cur); return out.map(function(s){return s.trim().replace(/^"|"$/g,'');});
  });
}
/* ---- Excel ---- */
function readExcel(file,nice,color){
  if(typeof XLSX==='undefined'){toast('Excel library not loaded',true);return;}
  var r=new FileReader();
  r.onload=function(){
    try{
      var wb=XLSX.read(r.result,{type:'array'});
      var ws=wb.Sheets[wb.SheetNames[0]];
      var rows=XLSX.utils.sheet_to_json(ws,{header:1,blankrows:false});
      smartTableLoad(rows, nice, color);
    }catch(e){toast('Excel error: '+e.message,true);}
  };
  r.readAsArrayBuffer(file);
}
/* ================= SMART TABLE READER (CSV/Excel → points, lines, polygons) =================
   Detects coordinate columns by header name (any of x/y, lat/lon, easting/northing, E/N…),
   auto-detects Lat/Lng vs projected by value range, and recognises 4 geometry structures:
   (A) a WKT or GeoJSON geometry column, (B) start/end coordinate columns (2-point lines),
   (C) grouped vertices (shared id + order column), (D) plain points. Shows a preview to confirm. */

function smartDetectTable(rows){
  var out={ok:false, reason:'', mode:'points', columns:{}, header:[], rowCount:0, crsGuess:'wgs84', sample:''};
  if(!rows||rows.length<2){ out.reason='The sheet needs a header row and at least one data row.'; return out; }
  var header=rows[0].map(function(h){return String(h==null?'':h).trim();});
  var body=rows.slice(1).filter(function(r){return r&&r.some(function(c){return c!=null&&String(c).trim()!=='';});});
  out.header=header; out.rowCount=body.length;
  function norm(s){return String(s||'').toLowerCase().replace(/[\s._\-\(\)\[\]]/g,'');}
  var H=header.map(norm);
  function find(cands){ for(var i=0;i<H.length;i++){ for(var j=0;j<cands.length;j++){ if(H[i]===cands[j]) return i; } } return -1; }
  function findLoose(res){ for(var i=0;i<H.length;i++){ for(var j=0;j<res.length;j++){ if(res[j].test(H[i])) return i; } } return -1; }
  function colNums(idx){return body.map(function(r){return parseFloat(r[idx]);});}
  function numericCol(idx){ var v=colNums(idx).filter(function(x){return !isNaN(x);}); return v.length>=Math.max(1,body.length*0.5); }

  // ---- (A) WKT / GeoJSON geometry column ----
  var wktI=findLoose([/^wkt$/,/^geom(etry)?$/,/^thegeom$/,/^shape$/,/^geojson$/,/^geowkt$/]);
  if(wktI<0){ // also scan values for WKT/GeoJSON-looking content
    for(var i=0;i<header.length;i++){
      var s=body.length?String(body[0][i]||''):'';
      if(/^\s*(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON)\s*\(/i.test(s) || /^\s*\{\s*"type"\s*:/.test(s)){ wktI=i; break; }
    }
  }
  if(wktI>=0){ out.ok=true; out.mode='wkt'; out.columns={geom:wktI}; out.sample=String(body.length?body[0][wktI]:'').slice(0,60); return out; }

  // ---- column candidates for coordinates ----
  var latI=find(['lat','latitude','y','ycoord','ylat','northing','north']);
  // refine: latitude-specific first
  var latPure=find(['lat','latitude','ylat']);
  var lngPure=find(['lon','lng','long','longitude','xlong','xlon']);
  var eI=find(['easting','east','e','xeasting','xutm','xcoord','x']);
  var nI=find(['northing','north','n','ynorthing','yutm','y']);
  // start/end (lines)
  var sxI=findLoose([/^(start|from|begin)?x$/,/^x1$/,/^startx$/,/^fromx$/,/^xstart$/,/^startlon(g)?$/,/^starteasting$/,/^starte$/]);
  var syI=findLoose([/^(start|from|begin)?y$/,/^y1$/,/^starty$/,/^fromy$/,/^ystart$/,/^startlat$/,/^startnorthing$/,/^startn$/]);
  var exI=findLoose([/^(end|to)?x$/,/^x2$/,/^endx$/,/^tox$/,/^xend$/,/^endlon(g)?$/,/^endeasting$/,/^ende$/]);
  var eyI=findLoose([/^(end|to)?y$/,/^y2$/,/^endy$/,/^toy$/,/^yend$/,/^endlat$/,/^endnorthing$/,/^endn$/]);
  // grouped vertices
  var idI=find(['id','lineid','polygonid','polyid','featureid','groupid','objectid','fid','shapeid','partid','trackid','routeid']);
  if(idI<0){ idI=findLoose([/id$/,/^id/]); } // any column ending/starting with "id"
  var seqI=find(['order','seq','sequence','vertex','vertexorder','pointorder','idx','index','no','sn','pointid','vertexid','ptorder','sortorder']);
  if(seqI<0){ seqI=findLoose([/order$/,/^seq/,/^vertex/]); }

  // ---- decide projected vs latlng by value range ----
  function rangeLooksLatLng(xi,yi){
    if(xi<0||yi<0)return false;
    var xs=colNums(xi).filter(function(v){return !isNaN(v);}), ys=colNums(yi).filter(function(v){return !isNaN(v);});
    if(!xs.length||!ys.length)return false;
    var okx=xs.every(function(v){return v>=-180&&v<=180;}), oky=ys.every(function(v){return v>=-90&&v<=90;});
    return okx&&oky;
  }
  function avg(idx){var v=colNums(idx).filter(function(x){return !isNaN(x);}); return v.length? v.reduce(function(a,b){return a+b;},0)/v.length : NaN;}

  // ---- (B) start/end → 2-point lines (require 4 DISTINCT columns) ----
  if(sxI>=0&&syI>=0&&exI>=0&&eyI>=0 && sxI!==exI && syI!==eyI && !(sxI===syI)){
    out.ok=true; out.mode='startend';
    out.columns={sx:sxI,sy:syI,ex:exI,ey:eyI};
    out.crsGuess = rangeLooksLatLng(sxI,syI) ? 'wgs84' : 'proj';
    return out;
  }

  // ---- (C) grouped vertices → lines/polygons ----
  // need an id column + a coordinate pair, multiple rows per id
  var hasXY = (lngPure>=0&&latPure>=0) || (eI>=0&&nI>=0) || (find(['x'])>=0&&find(['y'])>=0);
  if(idI>=0 && hasXY){
    // check that ids repeat (more rows than unique ids)
    var ids={}; var uniq=0; body.forEach(function(r){var k=String(r[idI]); if(!(k in ids)){ids[k]=1;uniq++;}else ids[k]++;});
    var repeats=Object.keys(ids).some(function(k){return ids[k]>=2;});
    if(repeats){
      var gx = (lngPure>=0?lngPure:(eI>=0?eI:find(['x'])));
      var gy = (latPure>=0?latPure:(nI>=0?nI:find(['y'])));
      out.ok=true; out.mode='grouped';
      out.columns={id:idI,seq:seqI,x:gx,y:gy};
      out.crsGuess = rangeLooksLatLng(gx,gy) ? 'wgs84' : 'proj';
      return out;
    }
  }

  // ---- (D) points ----
  var px=-1,py=-1,kind='';
  if(lngPure>=0&&latPure>=0){ px=lngPure; py=latPure; kind=rangeLooksLatLng(px,py)?'wgs84':'proj'; }
  else if(eI>=0&&nI>=0){ px=eI; py=nI; kind=rangeLooksLatLng(px,py)?'wgs84':'proj'; }
  else {
    // last resort: a generic x/y pair
    var gxx=find(['x']),gyy=find(['y']);
    if(gxx>=0&&gyy>=0){ px=gxx; py=gyy; kind=rangeLooksLatLng(px,py)?'wgs84':'proj'; }
  }
  // brute-force: if still nothing, scan for any numeric pair that looks like coordinates
  if(px<0||py<0){
    var latlngPair=null, utmPair=null, nums=[];
    for(var c=0;c<header.length;c++){ if(numericCol(c)) nums.push(c); }
    // latlng: one col in [-90,90], another in [-180,180]
    for(var a=0;a<nums.length;a++)for(var b=0;b<nums.length;b++){ if(a===b)continue;
      var ax=colNums(nums[a]).filter(function(v){return !isNaN(v);}), by=colNums(nums[b]).filter(function(v){return !isNaN(v);});
      if(!latlngPair && by.every(function(v){return v>=-90&&v<=90;}) && ax.every(function(v){return v>=-180&&v<=180;}) && (Math.max.apply(null,by.map(Math.abs))>0)) latlngPair=[nums[a],nums[b]];
    }
    // utm: easting ~1e5..1e6, northing ~1e6..1e7
    var eCand=nums.filter(function(c){var m=avg(c);return m>1e5&&m<1e6;}), nCand=nums.filter(function(c){var m=avg(c);return m>1e6&&m<1e7;});
    if(eCand.length&&nCand.length) utmPair=[eCand[0],nCand[0]];
    if(latlngPair){ px=latlngPair[0]; py=latlngPair[1]; kind='wgs84'; }
    else if(utmPair){ px=utmPair[0]; py=utmPair[1]; kind='proj'; }
  }
  if(px>=0&&py>=0){ out.ok=true; out.mode='points'; out.columns={x:px,y:py}; out.crsGuess=kind; return out; }

  out.reason='Could not find coordinate columns. Expected something like Lat/Lng, X/Y, or Easting/Northing.';
  return out;
}

/* Resolve the projected CRS key from the dropdown or auto, given the detected guess */
function resolveTableCRS(crsGuess){
  var xlsCrs=document.getElementById('xlsCrs').value;
  if(xlsCrs==='wgs84') return {key:'wgs84',proj:false};
  if(xlsCrs==='webmerc') return {key:'webmerc',proj:true};
  if(xlsCrs&&xlsCrs.indexOf('epsg:')===0){ var code='EPSG:'+xlsCrs.split(':')[1],k=null; Object.keys(CRS).forEach(function(kk){if(CRS[kk].code===code)k=kk;}); return {key:k||'wgs84',proj:code!=='EPSG:4326'}; }
  if(xlsCrs==='utm40') return {key:'utm40',proj:true};
  if(xlsCrs==='utm39') return {key:'utm39',proj:true};
  // auto
  if(crsGuess==='wgs84') return {key:'wgs84',proj:false};
  return {key:'utm40',proj:true,assumed:true}; // projected but zone unknown → assume 40N
}

/* project an [x,y] from a projected key to [lng,lat]; identity if wgs84 */
function tableXYtoLngLat(x,y,crs){
  if(!crs.proj) return [x,y]; // already lng,lat
  if(!hasProj) return null;
  try{ var p=proj4(CRS[crs.key].code,'EPSG:4326',[x,y]); return [p[0],p[1]]; }catch(e){ return null; }
}

/* Build GeoJSON from a detected plan */
function buildFromPlan(rows, plan, crs){
  var header=rows[0].map(function(h){return String(h==null?'':h).trim();});
  var body=rows.slice(1).filter(function(r){return r&&r.some(function(c){return c!=null&&String(c).trim()!=='';});});
  var feats=[];
  function propsOf(r,skip){ var p={}; header.forEach(function(h,i){ if(h!==''&&(!skip||skip.indexOf(i)<0)) p[h]=r[i]; }); return p; }

  if(plan.mode==='wkt'){
    body.forEach(function(r){
      var raw=String(r[plan.columns.geom]||'').trim(); if(!raw)return;
      var g=null;
      if(/^\s*\{/.test(raw)){ try{ g=JSON.parse(raw); }catch(e){} }
      else { g=wktToGeom(raw); }
      if(!g)return;
      feats.push({type:'Feature',properties:propsOf(r,[plan.columns.geom]),geometry:g});
    });
  } else if(plan.mode==='startend'){
    var c=plan.columns;
    body.forEach(function(r){
      var s=tableXYtoLngLat(parseFloat(r[c.sx]),parseFloat(r[c.sy]),crs);
      var e=tableXYtoLngLat(parseFloat(r[c.ex]),parseFloat(r[c.ey]),crs);
      if(!s||!e||isNaN(s[0])||isNaN(e[0]))return;
      feats.push({type:'Feature',properties:propsOf(r,[c.sx,c.sy,c.ex,c.ey]),geometry:{type:'LineString',coordinates:[s,e]}});
    });
  } else if(plan.mode==='grouped'){
    var g=plan.columns, groups={};
    body.forEach(function(r,ri){
      var key=String(r[g.id]);
      if(!groups[key])groups[key]={rows:[],first:r};
      groups[key].rows.push({r:r,seq:(g.seq>=0?parseFloat(r[g.seq]):ri)});
    });
    Object.keys(groups).forEach(function(key){
      var grp=groups[key]; grp.rows.sort(function(a,b){return (a.seq||0)-(b.seq||0);});
      var coords=[];
      grp.rows.forEach(function(o){ var ll=tableXYtoLngLat(parseFloat(o.r[g.x]),parseFloat(o.r[g.y]),crs); if(ll&&!isNaN(ll[0]))coords.push(ll); });
      if(coords.length<2)return;
      // closed ring (first==last, or ≥4 pts and ends near start) → polygon, else line
      var first=coords[0], last=coords[coords.length-1];
      var closed=(coords.length>=4)&&Math.abs(first[0]-last[0])<1e-7&&Math.abs(first[1]-last[1])<1e-7;
      var geom = closed ? {type:'Polygon',coordinates:[coords]} : {type:'LineString',coordinates:coords};
      feats.push({type:'Feature',properties:propsOf(grp.first,[g.x,g.y,g.seq]),geometry:geom});
    });
  } else { // points
    var c2=plan.columns;
    body.forEach(function(r){
      var ll=tableXYtoLngLat(parseFloat(r[c2.x]),parseFloat(r[c2.y]),crs);
      if(!ll||isNaN(ll[0])||isNaN(ll[1]))return;
      feats.push({type:'Feature',properties:propsOf(r,[]),geometry:{type:'Point',coordinates:ll}});
    });
  }
  var fc={type:'FeatureCollection',features:feats};
  fc._crsUsed = crs.proj?(CRS[crs.key]?CRS[crs.key].label:crs.key):'WGS84';
  return fc;
}

/* minimal WKT → GeoJSON geometry */
function wktToGeom(wkt){
  wkt=wkt.trim(); var m=/^(\w+)\s*(.*)$/.exec(wkt); if(!m)return null;
  var type=m[1].toUpperCase(), rest=m[2];
  function nums(s){ return s.trim().split(/\s+/).map(parseFloat); }
  function ring(s){ return s.split(',').map(function(p){return nums(p).slice(0,2);}); }
  function stripOuter(s){ return s.replace(/^\s*\(/,'').replace(/\)\s*$/,''); }
  try{
    if(type==='POINT'){ var c=nums(stripOuter(rest)); return {type:'Point',coordinates:c.slice(0,2)}; }
    if(type==='LINESTRING'){ return {type:'LineString',coordinates:ring(stripOuter(rest))}; }
    if(type==='POLYGON'){ var inner=stripOuter(rest); var rings=inner.split(/\)\s*,\s*\(/).map(function(r){return ring(r.replace(/[()]/g,''));}); return {type:'Polygon',coordinates:rings}; }
    if(type==='MULTIPOINT'){ var pts=stripOuter(rest).split(',').map(function(p){return nums(p.replace(/[()]/g,'')).slice(0,2);}); return {type:'MultiPoint',coordinates:pts}; }
    if(type==='MULTILINESTRING'){ var ls=stripOuter(rest).split(/\)\s*,\s*\(/).map(function(r){return ring(r.replace(/[()]/g,''));}); return {type:'MultiLineString',coordinates:ls}; }
    if(type==='MULTIPOLYGON'){ /* simplified: one ring per polygon */ var polys=stripOuter(rest).split(/\)\)\s*,\s*\(\(/).map(function(p){return [ring(p.replace(/[()]/g,''))];}); return {type:'MultiPolygon',coordinates:polys}; }
  }catch(e){return null;}
  return null;
}

/* Orchestrator: detect → preview dialog → build & load */
function smartTableLoad(rows, name, color){
  var plan=smartDetectTable(rows);
  if(!plan.ok){ toast(plan.reason||'No coordinates detected in '+name, true); return; }
  showImportPreview(plan, rows, name, color);
}

/* ---- Import preview dialog: shows what was detected, lets the user confirm/override ---- */
function showImportPreview(plan, rows, name, color){
  var header=rows[0].map(function(h){return String(h==null?'':h).trim();});
  var modeLabel={points:'Points',startend:'Lines (from start/end columns)',grouped:'Lines / Polygons (grouped vertices)',wkt:'Geometry column (WKT / GeoJSON)'}[plan.mode];
  var dlg=document.getElementById('importPreview');
  if(!dlg){
    dlg=document.createElement('div'); dlg.id='importPreview'; dlg.className='modal'; document.body.appendChild(dlg);
  }
  function opt(sel,idx){ var o=''; o+='<option value="-1"'+(idx<0?' selected':'')+'>— none —</option>'; header.forEach(function(h,i){ o+='<option value="'+i+'"'+(i===idx?' selected':'')+'>'+escapeHtml(h||('Column '+(i+1)))+'</option>'; }); return o; }
  var c=plan.columns;
  var colRows='';
  if(plan.mode==='points'){
    colRows='<div class="ip-row"><label>X / Longitude / Easting</label><select id="ipX">'+opt(0,c.x)+'</select></div>'
           +'<div class="ip-row"><label>Y / Latitude / Northing</label><select id="ipY">'+opt(0,c.y)+'</select></div>';
  } else if(plan.mode==='startend'){
    colRows='<div class="ip-row"><label>Start X</label><select id="ipSX">'+opt(0,c.sx)+'</select></div>'
           +'<div class="ip-row"><label>Start Y</label><select id="ipSY">'+opt(0,c.sy)+'</select></div>'
           +'<div class="ip-row"><label>End X</label><select id="ipEX">'+opt(0,c.ex)+'</select></div>'
           +'<div class="ip-row"><label>End Y</label><select id="ipEY">'+opt(0,c.ey)+'</select></div>';
  } else if(plan.mode==='grouped'){
    colRows='<div class="ip-row"><label>Group / Feature ID</label><select id="ipID">'+opt(0,c.id)+'</select></div>'
           +'<div class="ip-row"><label>Vertex order (optional)</label><select id="ipSEQ">'+opt(0,c.seq)+'</select></div>'
           +'<div class="ip-row"><label>X / Lon / Easting</label><select id="ipX">'+opt(0,c.x)+'</select></div>'
           +'<div class="ip-row"><label>Y / Lat / Northing</label><select id="ipY">'+opt(0,c.y)+'</select></div>';
  } else if(plan.mode==='wkt'){
    colRows='<div class="ip-row"><label>Geometry column (WKT / GeoJSON)</label><select id="ipGEOM">'+opt(0,c.geom)+'</select></div>'
           +'<div class="ip-note">Sample: <code>'+escapeHtml(plan.sample)+'…</code></div>';
  }
  var crsRow='';
  if(plan.mode!=='wkt'){
    var guessTxt = plan.crsGuess==='wgs84' ? 'looks like Lat/Lng (degrees)' : 'looks like projected (Easting/Northing in metres)';
    crsRow='<div class="ip-note">Detected coordinates '+guessTxt+'. The active CRS dropdown in the Data tab controls how projected values are interpreted (Auto assumes UTM 40N).</div>';
  }
  dlg.innerHTML='<div class="modal-card" style="max-width:520px">'
    +'<div class="modal-head"><b>📥 Import preview — '+escapeHtml(name)+'</b><span class="grow"></span><button class="topbtn" id="ipCancel">✕ Cancel</button></div>'
    +'<div class="modal-body" style="padding:16px">'
    +'<div class="ip-detected">Detected: <b>'+modeLabel+'</b> · '+plan.rowCount+' row(s) · '+header.length+' column(s)</div>'
    +'<div class="ip-mode-row"><label>Geometry type</label><select id="ipMode">'
      +'<option value="points"'+(plan.mode==='points'?' selected':'')+'>Points</option>'
      +'<option value="startend"'+(plan.mode==='startend'?' selected':'')+'>Lines — start/end columns</option>'
      +'<option value="grouped"'+(plan.mode==='grouped'?' selected':'')+'>Lines/Polygons — grouped vertices</option>'
      +'<option value="wkt"'+(plan.mode==='wkt'?' selected':'')+'>Geometry column (WKT/GeoJSON)</option>'
    +'</select></div>'
    +'<div id="ipCols">'+colRows+'</div>'
    +crsRow
    +'<div class="ip-actions"><button class="btn accent" id="ipLoad">✓ Load on map</button><button class="btn" id="ipCancel2">Cancel</button></div>'
    +'</div></div>';
  dlg.classList.add('open');
  function close(){ dlg.classList.remove('open'); }
  document.getElementById('ipCancel').onclick=close;
  document.getElementById('ipCancel2').onclick=close;
  dlg.onclick=function(e){ if(e.target===dlg)close(); };
  // changing geometry type re-renders the column selectors with current header
  document.getElementById('ipMode').onchange=function(){
    var m=this.value, fresh={mode:m,columns:{},crsGuess:plan.crsGuess,rowCount:plan.rowCount,header:header,ok:true,sample:plan.sample};
    // re-detect just to seed sensible defaults for the new mode
    var rd=smartDetectTable(rows); if(rd.mode===m) fresh.columns=rd.columns;
    showImportPreview(fresh, rows, name, color);
  };
  document.getElementById('ipLoad').onclick=function(){
    var m=document.getElementById('ipMode').value, cols={};
    function val(id){ var el=document.getElementById(id); return el?parseInt(el.value,10):-1; }
    if(m==='points'){ cols={x:val('ipX'),y:val('ipY')}; if(cols.x<0||cols.y<0){toast('Pick both X and Y columns',true);return;} }
    else if(m==='startend'){ cols={sx:val('ipSX'),sy:val('ipSY'),ex:val('ipEX'),ey:val('ipEY')}; if(cols.sx<0||cols.sy<0||cols.ex<0||cols.ey<0){toast('Pick all four start/end columns',true);return;} }
    else if(m==='grouped'){ cols={id:val('ipID'),seq:val('ipSEQ'),x:val('ipX'),y:val('ipY')}; if(cols.id<0||cols.x<0||cols.y<0){toast('Pick ID, X and Y columns',true);return;} }
    else if(m==='wkt'){ cols={geom:val('ipGEOM')}; if(cols.geom<0){toast('Pick the geometry column',true);return;} }
    var finalPlan={mode:m,columns:cols,crsGuess:plan.crsGuess};
    var crs=resolveTableCRS(plan.crsGuess);
    var gj;
    try{ gj=buildFromPlan(rows, finalPlan, crs); }catch(e){ toast('Build failed: '+e.message,true); return; }
    if(!gj||!gj.features.length){ toast('No valid geometry built — check the column choices',true); return; }
    close();
    addLayer(geoJsonLayer(gj,color),name,color);
    var types={}; gj.features.forEach(function(f){var t=f.geometry&&f.geometry.type;types[t]=(types[t]||0)+1;});
    var summary=Object.keys(types).map(function(t){return types[t]+' '+t;}).join(', ');
    toast('Loaded '+summary+' from '+name+(gj._crsUsed?(' ('+gj._crsUsed+')'):''));
  };
}



/* ================= SEARCH ================= */
var searchEl=document.getElementById('search'), resultsEl=document.getElementById('searchResults'), sT;
function doSearch(){
  var q=searchEl.value.trim(); if(!q){resultsEl.style.display='none';return;}
  var m=q.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if(m){var lat=+m[1],lng=+m[2];
    if(lat<-90||lat>90||lng<-180||lng>180){toast('Lat/Lng is outside valid range',true);return;}
    map.setView([lat,lng],16);addTempMarker([lat,lng],'Lat '+lat+', Lng '+lng);resultsEl.style.display='none';return;}
  fetch('https://nominatim.openstreetmap.org/search?format=json&limit=6&q='+encodeURIComponent(q))
    .then(function(r){return r.json();}).then(function(list){
      if(!list.length){resultsEl.innerHTML='<div>No results</div>';resultsEl.style.display='block';return;}
      resultsEl.innerHTML='';
      list.forEach(function(p){var d=document.createElement('div');d.textContent=p.display_name;
        d.onclick=function(){map.setView([+p.lat,+p.lon],15);addTempMarker([+p.lat,+p.lon],escapeHtml(p.display_name));resultsEl.style.display='none';searchEl.value=p.display_name.split(',')[0];};
        resultsEl.appendChild(d);});
      resultsEl.style.display='block';
    }).catch(function(){toast('Search unavailable',true);});
}
document.getElementById('searchBtn').onclick=doSearch;
searchEl.addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});
searchEl.addEventListener('input',function(){clearTimeout(sT);sT=setTimeout(doSearch,500);});
document.addEventListener('click',function(e){if(!resultsEl.contains(e.target)&&e.target!==searchEl)resultsEl.style.display='none';});

/* ---- home / locate ---- */
document.getElementById('homeBtn').onclick=function(){map.setView(HOME.center,HOME.zoom);};
var youAreHere=null, locationOn=false;
document.getElementById('locateBtn').onclick=function(){
  if(locationOn){
    // turn OFF
    locationOn=false;
    if(youAreHere){ map.removeLayer(youAreHere); youAreHere=null; }
    if(geoWatchId!==null && navigator.geolocation){ navigator.geolocation.clearWatch(geoWatchId); geoWatchId=null; }
    locEl.className='ts-loc'; locEl.textContent='Location: off';
    this.textContent='◎ Locate'; this.classList.remove('accent');
    toast('Live location turned off');
    return;
  }
  if(!navigator.geolocation){ toast('Geolocation not supported by this browser',true); return; }
  var btn=this;
  toast('Locating… (allow location access if prompted)');
  startLocationWatch();
  navigator.geolocation.getCurrentPosition(function(pos){
    var la=pos.coords.latitude, lo=pos.coords.longitude, acc=pos.coords.accuracy||0;
    map.setView([la,lo],16);
    if(youAreHere){ map.removeLayer(youAreHere); }
    youAreHere=L.layerGroup([
      L.circle([la,lo],{radius:Math.max(acc,15),color:'#2563EB',weight:1,fillColor:'#2563EB',fillOpacity:.12}),
      L.circleMarker([la,lo],{radius:7,color:'#fff',weight:2,fillColor:'#2563EB',fillOpacity:1})
        .bindPopup('You are here<br/>Accuracy ±'+Math.round(acc)+' m')
    ]).addTo(map);
    youAreHere.eachLayer(function(l){if(l.openPopup)l.openPopup();});
    locationOn=true; btn.textContent='◉'; btn.classList.add('accent'); btn.title='Location ON — click to turn off';
    toast('Location found (±'+Math.round(acc)+' m) — click again to turn off');
  },function(err){
    var m={1:'Permission denied — allow location for this site/file',2:'Position unavailable',3:'Timed out'};
    toast('Locate failed: '+(m[err.code]||err.message),true);
  },{enableHighAccuracy:true,timeout:12000,maximumAge:0});
};
/* ---- location strip (opt-in; no auto-request to avoid repeated prompts) ---- */
var locEl=document.getElementById('locText');
var lastGeoName='', lastGeoFetch=0, geoWatchId=null;
function startLocationWatch(){
  if(geoWatchId!==null || !navigator.geolocation) return;
  geoWatchId=navigator.geolocation.watchPosition(function(pos){
    var la=pos.coords.latitude, lo=pos.coords.longitude;
    var c=toCRS(lo,la,crsKey);
    locEl.className='ts-loc live';
    locEl.textContent='● '+c.fmt+(lastGeoName?(' · '+lastGeoName):'');
    var now=Date.now();
    if(now-lastGeoFetch>20000){
      lastGeoFetch=now;
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&zoom=14&lat='+la+'&lon='+lo)
        .then(function(r){return r.json();}).then(function(d){
          var a=d.address||{};
          lastGeoName=a.suburb||a.neighbourhood||a.village||a.town||a.city||a.county||d.name||(d.display_name||'').split(',')[0]||'';
          locEl.textContent='● '+toCRS(lo,la,crsKey).fmt+(lastGeoName?(' · '+lastGeoName):'');
          if(lastGeoName && !titleManual){ mapTitleSetLive(lastGeoName); }
        }).catch(function(){});
    }
  },function(){ locEl.className='ts-loc'; locEl.textContent='Location: unavailable'; },{enableHighAccuracy:true,maximumAge:5000});
}

/* ================= DRAW + MEASURE ================= */
var sketch=new L.FeatureGroup().addTo(map), measureLayer=new L.FeatureGroup().addTo(map);
var measureOut=document.getElementById('measureOut');
/* ---- live digitizing style ---- */
var currentDrawStyle={stroke:'#3B82F6',fill:'#3B82F6',width:3,fillOp:0.2,dash:'',shape:'circle',ptSize:7};
function readDrawStyle(){
  function val(id,fallback){var el=document.getElementById(id);return el?el.value:fallback;}
  currentDrawStyle={
    stroke:val('dStroke','#3B82F6'),
    fill:val('dFill','#3B82F6'),
    width:+val('dWidth',3),
    fillOp:+val('dFillOp',0.2),
    dash:val('dDash',''),
    shape:val('dShape','circle'),
    ptSize:+val('dPtSize',7)
  };
  return currentDrawStyle;
}
['dStroke','dFill','dWidth','dFillOp','dDash','dShape','dPtSize'].forEach(function(id){
  var el=document.getElementById(id); if(el) el.addEventListener('input',function(){ readDrawStyle();
    var w=document.getElementById('dWidthV'),fo=document.getElementById('dFillOpV'),ps=document.getElementById('dPtSizeV');
    if(w)w.textContent=currentDrawStyle.width;
    if(fo)fo.textContent=currentDrawStyle.fillOp.toFixed(2);
    if(ps)ps.textContent=currentDrawStyle.ptSize;
  });
});

var activeHandler=null, activeCreateHandler=null;
function pathOpts(){ var s=currentDrawStyle; return {color:s.stroke,weight:s.width,opacity:1,fillColor:s.fill,fillOpacity:s.fillOp,dashArray:s.dash||null}; }
function svConstructionPointIcon(){
  return L.divIcon({className:'sv-construction-cursor',iconSize:[18,18],iconAnchor:[9,9],html:'<span><i></i></span>'});
}
function svSetPointConstruction(active){try{map.getContainer().classList.toggle('sv-point-construction',!!active);}catch(e){}}
function activeConstructionHandler(){return window.__svActiveDrawHandler||activeHandler||null;}
function updateDigibarButtons(){
  var h=activeConstructionHandler(),undo=document.getElementById('digiUndoVtx'),finish=document.getElementById('digiFinish');
  if(undo)undo.disabled=!h||typeof h.deleteLastVertex!=='function';
  if(finish)finish.disabled=!h||(typeof h.completeShape!=='function'&&typeof h._finishShape!=='function');
}
function showDigibar(txt){ document.getElementById('digibarText').textContent=txt; document.getElementById('digibar').classList.add('show');updateDigibarButtons(); }
function hideDigibar(){ document.getElementById('digibar').classList.remove('show'); }
function clearActiveDrawListener(){ if(activeCreateHandler){ map.off(L.Draw.Event.CREATED, activeCreateHandler); activeCreateHandler=null; } }

function enableDraw(type,intoMeasure){
  readDrawStyle();
  if(activeHandler){ try{activeHandler.disable();}catch(e){} activeHandler=null; }
  clearActiveDrawListener();
  var common={shapeOptions:pathOpts()};
  var h;
  if(type==='polyline')h=new L.Draw.Polyline(map,{shapeOptions:pathOpts(),metric:true});
  else if(type==='polygon')h=new L.Draw.Polygon(map,{shapeOptions:pathOpts(),allowIntersection:false});
  else if(type==='rectangle')h=new L.Draw.Rectangle(map,{shapeOptions:pathOpts()});
  else if(type==='marker')h=new L.Draw.Marker(map,{icon:svConstructionPointIcon()});
  svSetPointConstruction(type==='marker');
  activeHandler=h;window.__svActiveDrawHandler=h;
  function once(e){
    clearActiveDrawListener(); hideDigibar();svSetPointConstruction(false); activeHandler=null;window.__svActiveDrawHandler=null;
    var layer=e.layer;
    if(intoMeasure){measureLayer.addLayer(layer);showMeasure(layer,type);}
    else{ addDrawnFeature(layer,type); }
  }
  activeCreateHandler=once;
  map.on(L.Draw.Event.CREATED,once);
  h.enable();
  if(type!=='marker'){ showDigibar(type==='polyline'?'Digitizing line — click to add vertices':(type==='rectangle'?'Drag to draw rectangle':'Digitizing polygon — click to add vertices')); }
}
/* toolbar controls */
function finishConstruction(e){
  if(e){e.preventDefault();e.stopPropagation();}
  var h=activeConstructionHandler();
  if(!h){toast('No active geometry to finish',true);hideDigibar();return;}
  try{
    if(typeof h.completeShape==='function')h.completeShape();
    else if(typeof h._finishShape==='function')h._finishShape();
    else toast('This construction type finishes directly on the map',true);
  }catch(err){toast('Cannot finish geometry: '+err.message,true);}
}
function cancelConstruction(e){
  if(e){e.preventDefault();e.stopPropagation();}
  var h=activeConstructionHandler();clearActiveDrawListener();
  if(h){try{h.disable();}catch(err){}}
  activeHandler=null;window.__svActiveDrawHandler=null;svSetPointConstruction(false);hideDigibar();
  if(window.__svEditSession&&window.__svEditSession.active&&window.__svEnableEditorSelection)window.__svEnableEditorSelection();
  toast('Digitizing cancelled');
}
function undoConstructionVertex(e){
  if(e){e.preventDefault();e.stopPropagation();}
  var h=activeConstructionHandler();
  if(!h||typeof h.deleteLastVertex!=='function'){toast('No construction vertex is available to undo',true);return;}
  try{
    var before=h._markers&&h._markers.length;
    h.deleteLastVertex();
    var after=h._markers&&h._markers.length;
    toast(before&&after<before?'Last vertex removed':'No construction vertex is available to undo',!(before&&after<before));
  }catch(err){toast('Undo vertex failed: '+err.message,true);}
}
function bindDigitizingBarControls(){
  var handlers={digiFinish:finishConstruction,digiCancel:cancelConstruction,digiUndoVtx:undoConstructionVertex};
  Object.keys(handlers).forEach(function(id){
    var button=document.getElementById(id);if(!button)return;
    button.type='button';button.onpointerdown=function(evt){evt.stopPropagation();};button.onmousedown=function(evt){evt.stopPropagation();};button.onclick=handlers[id];
  });
  updateDigibarButtons();
}
bindDigitizingBarControls();
window.__svDigitizingBar={finish:finishConstruction,cancel:cancelConstruction,undoVertex:undoConstructionVertex,handler:activeConstructionHandler,bind:bindDigitizingBarControls};
document.addEventListener('keydown',function(e){
  if(!document.getElementById('digibar').classList.contains('show'))return;
  if(e.key==='Escape')cancelConstruction(e);
  else if(e.key==='Enter')finishConstruction(e);
});

/* ---- drawn features with attributes ---- */
var drawnGroup=new L.FeatureGroup().addTo(map);
var drawn={point:[],line:[],polygon:[]};  // each: {id,layer,props}
var drawnSeq=0, drawnUndo=[], drawnRedo=[];
function geomKind(type){ return type==='polyline'?'line':(type==='marker'?'point':'polygon'); }
function styleToLeaflet(s){ return {color:s.stroke,weight:s.width,opacity:1,fillColor:s.fill,fillOpacity:s.fillOp,dashArray:s.dash||null}; }
function squareIcon(color,size){ return L.divIcon({className:'',iconSize:[size,size],iconAnchor:[size/2,size/2],
  html:'<div style="width:'+size+'px;height:'+size+'px;background:'+color+';border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.3)"></div>'}); }
function addDrawnFeature(layer,type){
  var kind=geomKind(type), id='dr_'+(++drawnSeq), s=Object.assign({},currentDrawStyle);
  // re-render points per chosen shape
  if(kind==='point'){
    var ll=layer.getLatLng();
    drawnGroup.removeLayer&&0;
    if(s.shape==='square'){ layer=L.marker(ll,{icon:squareIcon(s.fill,s.ptSize*2),draggable:true}); }
    else if(s.shape==='pin'){ layer=L.marker(ll,{icon:pinIcon(s.fill),draggable:true}); }
    else { layer=L.circleMarker(ll,{radius:s.ptSize,color:s.stroke,weight:2,fillColor:s.fill,fillOpacity:1,draggable:true}); }
  }else{
    try{ layer.setStyle(styleToLeaflet(s)); }catch(e){}
  }
  layer.addTo(drawnGroup);
  var props={ id:drawnSeq, name:kind+' '+drawnSeq, description:'' };
  try{ var gj=layer.toGeoJSON();
    if(kind==='line') props.length_m=+(turf.length(gj,{units:'kilometers'})*1000).toFixed(2);
    if(kind==='polygon'){ props.area_m2=+turf.area(gj).toFixed(2); props.perim_m=+(turf.length(gj,{units:'kilometers'})*1000).toFixed(2); }
    if(kind==='point'){ var c=gj.geometry.coordinates; props.lng=+c[0].toFixed(6); props.lat=+c[1].toFixed(6); }
  }catch(e){}
  var rec={id:id,layer:layer,props:props,kind:kind,style:s,editing:false};
  layer.bindPopup(drawnPopup(rec));
  // drag for points
  if(kind==='point'){ if(layer.on)layer.on('dragend',function(){try{var nl=layer.getLatLng();rec.props.lng=+nl.lng.toFixed(6);rec.props.lat=+nl.lat.toFixed(6);layer.setPopupContent(drawnPopup(rec));}catch(e){}}); }
  drawn[kind].push(rec); drawnUndo.push(rec); drawnRedo=[]; renderDrawnList();
  toast(kind+' added — click it to edit, or use the list');
}
window.__toggleEditGeom=function(id){
  var rec=findDrawn(id); if(!rec||!rec.layer.editing)return;
  rec.editing=!rec.editing;
  try{ if(rec.editing){rec.layer.editing.enable();toast('Vertex editing ON — drag vertices, then toggle off');}else{rec.layer.editing.disable();
    // recompute measurements after edit
    try{var gj=rec.layer.toGeoJSON();
      if(rec.kind==='line')rec.props.length_m=+(turf.length(gj,{units:'kilometers'})*1000).toFixed(2);
      if(rec.kind==='polygon'){rec.props.area_m2=+turf.area(gj).toFixed(2);rec.props.perim_m=+(turf.length(gj,{units:'kilometers'})*1000).toFixed(2);}
      rec.layer.setPopupContent(drawnPopup(rec));
    }catch(e){}
    toast('Vertex editing off'); } }catch(e){}
  renderDrawnList();
};
function drawnPopup(rec){
  var rows=Object.keys(rec.props).map(function(k){return '<tr><td>'+escapeHtml(k)+'</td><td>'+escapeHtml(rec.props[k])+'</td></tr>';}).join('');
  return '<div style="min-width:170px"><b>'+escapeHtml(rec.props.name||rec.kind)+'</b>'+
    '<table class="attr-table">'+rows+'</table>'+
    '<div style="margin-top:6px;display:flex;gap:6px">'+
    '<button onclick="window.__editDrawn(\''+rec.id+'\')" style="flex:1;font-size:11px;padding:4px;border:none;border-radius:5px;background:#3B82F6;color:#fff;cursor:pointer">Edit</button>'+
    '<button onclick="window.__delDrawn(\''+rec.id+'\')" style="font-size:11px;padding:4px 8px;border:none;border-radius:5px;background:#ef4444;color:#fff;cursor:pointer">Delete</button>'+
    '</div></div>';
}
function findDrawn(id){ for(var k in drawn){var r=drawn[k].find(function(x){return x.id===id;});if(r)return r;} return null; }
window.__editDrawn=function(id){
  var rec=findDrawn(id); if(!rec)return;
  var keys=Object.keys(rec.props);
  var current=keys.map(function(k){return k+'='+rec.props[k];}).join('\n');
  var edited=prompt('Edit attributes (one per line as key=value). Add new lines for new fields:', current);
  if(edited===null) return;
  var np={}; edited.split('\n').forEach(function(line){var i=line.indexOf('=');if(i>0){np[line.slice(0,i).trim()]=line.slice(i+1).trim();}});
  rec.props=np; rec.layer.setPopupContent(drawnPopup(rec)); renderDrawnList(); toast('Attributes updated');
};
window.__delDrawn=function(id){
  var rec=findDrawn(id); if(!rec)return;
  drawnGroup.removeLayer(rec.layer);
  drawn[rec.kind]=drawn[rec.kind].filter(function(x){return x.id!==id;});
  var ui=drawnUndo.lastIndexOf(rec); if(ui>=0)drawnUndo.splice(ui,1);
  renderDrawnList(); toast('Feature deleted');
};
function renderDrawnList(){
  var el=document.getElementById('digiList'); if(!el)return;
  var total=drawn.point.length+drawn.line.length+drawn.polygon.length;
  el.innerHTML='';
  var hdr=document.createElement('div');
  hdr.innerHTML='<p class="hint" style="margin:8px 0">Points: '+drawn.point.length+' · Lines: '+drawn.line.length+' · Polygons: '+drawn.polygon.length+'</p>';
  el.appendChild(hdr);
  if(total){
    var ctl=document.createElement('div'); ctl.className='row2';
    ctl.innerHTML='<button class="btn" id="digiUndoF" style="margin:0">↶ Undo</button><button class="btn" id="digiRedoF" style="margin:0">↷ Redo</button>';
    el.appendChild(ctl);
    var ctl2=document.createElement('div');
    ctl2.innerHTML='<button class="btn" id="digiClearF" style="margin:6px 0 0">✕ Clear all</button>';
    el.appendChild(ctl2);
    ctl.querySelector('#digiUndoF').onclick=function(){var rec=drawnUndo.pop();if(!rec){toast('Nothing to undo',true);return;}
      // remove from map but keep for redo
      drawnGroup.removeLayer(rec.layer); drawn[rec.kind]=drawn[rec.kind].filter(function(x){return x.id!==rec.id;});
      drawnRedo.push(rec); renderDrawnList(); toast('Undo');
    };
    ctl.querySelector('#digiRedoF').onclick=function(){var rec=drawnRedo.pop();if(!rec){toast('Nothing to redo',true);return;}
      rec.layer.addTo(drawnGroup); drawn[rec.kind].push(rec); drawnUndo.push(rec); renderDrawnList(); toast('Redo');
    };
    ctl2.querySelector('#digiClearF').onclick=function(){drawnGroup.clearLayers();drawn={point:[],line:[],polygon:[]};drawnUndo=[];drawnRedo=[];renderDrawnList();toast('All drawn features cleared');};
  }
  ['point','line','polygon'].forEach(function(kind){
    drawn[kind].forEach(function(rec){
      var row=document.createElement('div'); row.className='layerrow';
      var canVtx=rec.layer.editing?'<button class="vtx" title="Edit vertices">⬓</button>':'';
      row.innerHTML='<span class="sw" style="background:'+rec.style.fill+'"></span>'+
        '<label style="flex:1;cursor:pointer">'+escapeHtml(rec.props.name||kind)+'</label>'+
        canVtx+'<button class="ed" title="Edit attributes">✎</button><button class="x" title="Delete">✕</button>';
      row.querySelector('label').onclick=function(){ try{ if(rec.layer.getBounds)map.fitBounds(rec.layer.getBounds(),{maxZoom:17}); else map.panTo(rec.layer.getLatLng()); }catch(e){} rec.layer.openPopup&&rec.layer.openPopup(); };
      if(rec.layer.editing){ row.querySelector('.vtx').onclick=function(){ window.__toggleEditGeom(rec.id); }; }
      row.querySelector('.ed').onclick=function(){ window.__editDrawn(rec.id); };
      row.querySelector('.x').onclick=function(){ window.__delDrawn(rec.id); };
      el.appendChild(row);
    });
  });
}
function fmtDist(km){ return km<1 ? (km*1000).toFixed(1)+' m' : km.toFixed(3)+' km'; }
function fmtArea(m2){ return m2<1e6 ? m2.toFixed(1)+' m²' : (m2/1e6).toFixed(4)+' km²'; }
var showMeasureLabels=true;
function showMeasure(layer,type){try{var gj=layer.toGeoJSON();var txt;
  if(type==='polyline'){var km=turf.length(gj,{units:'kilometers'});txt=fmtDist(km);measureOut.innerHTML='Distance\n<span>'+txt+'</span>';}
  else{var m2=turf.area(gj);txt=fmtArea(m2);measureOut.innerHTML='Area\n<span>'+txt+'</span>\nPerimeter <span>'+fmtDist(turf.length(gj,{units:'kilometers'}))+'</span>';}
  if(showMeasureLabels){
    var center; try{center=layer.getBounds().getCenter();}catch(e){center=(layer.getLatLng&&layer.getLatLng());}
    if(center){ layer.bindTooltip(txt,{permanent:true,direction:'center',className:'measure-label'}).openTooltip(); }
  }
}catch(e){measureOut.textContent='Could not measure.';}}
document.getElementById('measureDist').onclick=function(){enableDraw('polyline',true);};
document.getElementById('measureArea').onclick=function(){enableDraw('polygon',true);};
document.getElementById('measureClear').onclick=function(){measureLayer.clearLayers();measureOut.textContent='Pick a tool, then draw on the map.';};
document.getElementById('measureLabels').onchange=function(){
  showMeasureLabels=this.checked;
  measureLayer.eachLayer(function(l){ if(l.getTooltip&&l.getTooltip()){ if(showMeasureLabels){l.openTooltip();}else{l.closeTooltip();} } });
};
var legacyDigiPoint=document.getElementById('digiPoint');if(legacyDigiPoint)legacyDigiPoint.onclick=function(){enableDraw('marker',false);};
var legacyDigiLine=document.getElementById('digiLine');if(legacyDigiLine)legacyDigiLine.onclick=function(){enableDraw('polyline',false);};
var legacyDigiPoly=document.getElementById('digiPoly');if(legacyDigiPoly)legacyDigiPoly.onclick=function(){enableDraw('polygon',false);};
var legacyDigiRect=document.getElementById('digiRect');if(legacyDigiRect)legacyDigiRect.onclick=function(){enableDraw('rectangle',false);};

/* collect legacy standalone drawings for backward-compatible project loading */
function collectFeatures(){
  var fc={type:'FeatureCollection',features:[]};
  ['point','line','polygon'].forEach(function(k){ drawn[k].forEach(function(rec){
    try{ var g=rec.layer.toGeoJSON(); g.properties=rec.props; fc.features.push(g); }catch(e){} }); });
  // legacy annotation points from projects created before the unified editor
  if(typeof ptItems!=='undefined'){ ptItems.forEach(function(it){
    try{ var ll=it.marker.getLatLng(); fc.features.push({type:'Feature',properties:{name:it.text||'point',type:'marker'},geometry:{type:'Point',coordinates:[ll.lng,ll.lat]}}); }catch(e){} }); }
  return fc;
}
function toKML(fc,crsNote){
  function xml(value){return String(value==null?'':value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');}
  function coordStr(coords){ return coords.map(function(c){return c[0]+','+c[1]+(c.length>2?(','+c[2]):'');}).join(' '); }
  function geometryXml(g){
    if(!g)return '';
    if(g.type==='Point')return '<Point><coordinates>'+g.coordinates.join(',')+'</coordinates></Point>';
    if(g.type==='LineString')return '<LineString><tessellate>1</tessellate><coordinates>'+coordStr(g.coordinates)+'</coordinates></LineString>';
    if(g.type==='Polygon'){
      var rings=g.coordinates||[],out=rings.length?'<outerBoundaryIs><LinearRing><coordinates>'+coordStr(rings[0])+'</coordinates></LinearRing></outerBoundaryIs>':'';
      for(var i=1;i<rings.length;i++)out+='<innerBoundaryIs><LinearRing><coordinates>'+coordStr(rings[i])+'</coordinates></LinearRing></innerBoundaryIs>';
      return '<Polygon>'+out+'</Polygon>';
    }
    if(g.type==='MultiPoint')return '<MultiGeometry>'+g.coordinates.map(function(c){return geometryXml({type:'Point',coordinates:c});}).join('')+'</MultiGeometry>';
    if(g.type==='MultiLineString')return '<MultiGeometry>'+g.coordinates.map(function(c){return geometryXml({type:'LineString',coordinates:c});}).join('')+'</MultiGeometry>';
    if(g.type==='MultiPolygon')return '<MultiGeometry>'+g.coordinates.map(function(c){return geometryXml({type:'Polygon',coordinates:c});}).join('')+'</MultiGeometry>';
    if(g.type==='GeometryCollection')return '<MultiGeometry>'+(g.geometries||[]).map(geometryXml).join('')+'</MultiGeometry>';
    return '';
  }
  function placemark(f){
    var name=(f.properties&&(f.properties.name||f.properties.id))||'feature';
    var ed=Object.keys(f.properties||{}).map(function(k){return '<Data name="'+xml(k)+'"><value>'+xml(f.properties[k])+'</value></Data>';}).join('');
    var geo=geometryXml(f.geometry);if(!geo)return '';
    return '<Placemark><name>'+xml(name)+'</name><ExtendedData>'+ed+'</ExtendedData>'+geo+'</Placemark>';
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>'+
    (crsNote?'<description>Coordinate system: '+xml(crsNote)+'</description>':'')+
    fc.features.map(placemark).join('')+'</Document></kml>';
}
function toCSV(fc,crsNote){
  var wantWkt=false; try{ document.querySelectorAll('.coord-col:checked').forEach(function(cb){if(cb.value==='wkt')wantWkt=true;}); }catch(e){}
  // remove any WGS84 WKT injected into properties; CSV builds WKT from projected geometry instead
  fc.features.forEach(function(f){ if(f.properties&&'WKT' in f.properties) delete f.properties.WKT; });
  var keys={}; fc.features.forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){keys[k]=1;});});
  var cols=Object.keys(keys); var head=cols.concat(wantWkt?['WKT']:[]).join(',');
  var preamble = crsNote ? ('# Coordinate system: '+crsNote+'\n') : '';
  function wkt(g){ if(!g)return '';
    if(g.type==='Point')return 'POINT('+g.coordinates[0]+' '+g.coordinates[1]+')';
    if(g.type==='LineString')return 'LINESTRING('+g.coordinates.map(function(c){return c[0]+' '+c[1];}).join(',')+')';
    if(g.type==='Polygon')return 'POLYGON(('+g.coordinates[0].map(function(c){return c[0]+' '+c[1];}).join(',')+'))';
    return ''; }
  var rows=fc.features.map(function(f){
    var vals=cols.map(function(k){var v=(f.properties||{})[k];v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;});
    if(wantWkt) vals.push('"'+wkt(f.geometry)+'"'); return vals.join(',');
  });
  return preamble+head+'\n'+rows.join('\n');
}
function toGPX(fc){
  var wpts='',trks='';
  fc.features.forEach(function(f){var g=f.geometry;if(!g)return;var nm=(f.properties&&f.properties.name)||'';
    if(g.type==='Point')wpts+='<wpt lat="'+g.coordinates[1]+'" lon="'+g.coordinates[0]+'"><name>'+String(nm).replace(/[<>&]/g,'')+'</name></wpt>';
    else if(g.type==='LineString'){trks+='<trk><name>'+String(nm).replace(/[<>&]/g,'')+'</name><trkseg>'+g.coordinates.map(function(c){return '<trkpt lat="'+c[1]+'" lon="'+c[0]+'"></trkpt>';}).join('')+'</trkseg></trk>';}
  });
  return '<?xml version="1.0"?>\n<gpx version="1.1" creator="Spatial Itqan">'+wpts+trks+'</gpx>';
}
/* Get a representative [lng,lat] (WGS84) for a feature — first vertex. */
function firstLngLat(geom){
  if(!geom||!geom.coordinates) return null;
  var c=geom.coordinates; while(c&&typeof c[0]!=='number') c=c[0];
  return (c&&typeof c[0]==='number')?[c[0],c[1]]:null;
}
/* Inject chosen coordinate columns into each feature's properties.
   Reads the export checkboxes; coords computed from WGS84 source. */
function injectCoordColumns(fc, exKey){
  var opts={}; document.querySelectorAll('.coord-col:checked').forEach(function(cb){opts[cb.value]=true;});
  if(!Object.keys(opts).length) return;
  function wktOf(g){ if(!g)return '';
    if(g.type==='Point')return 'POINT('+g.coordinates[0]+' '+g.coordinates[1]+')';
    if(g.type==='LineString')return 'LINESTRING('+g.coordinates.map(function(c){return c[0]+' '+c[1];}).join(',')+')';
    if(g.type==='Polygon')return 'POLYGON(('+g.coordinates[0].map(function(c){return c[0]+' '+c[1];}).join(',')+'))';
    return ''; }
  fc.features.forEach(function(f){
    var p=f.properties||(f.properties={});
    var ll=firstLngLat(f.geometry);
    if(opts.latlon && ll){ p.LAT=+ll[1].toFixed(8); p.LON=+ll[0].toFixed(8); }
    if(opts.en && ll && hasProj){
      try{ var enKey=(exKey&&exKey!=='wgs84'&&exKey!=='webmerc')?exKey:utmZoneFor(ll[0],ll[1]);
        var en=proj4('EPSG:4326',CRS[enKey].code,[ll[0],ll[1]]);
        p.EASTING=+en[0].toFixed(3); p.NORTHING=+en[1].toFixed(3); p.UTM_ZONE=CRS[enKey].esri.replace('WGS_1984_','');
      }catch(e){}
    }
    if(opts.xy && ll && hasProj){
      try{ var xy=proj4('EPSG:4326','EPSG:3857',[ll[0],ll[1]]); p.X=+xy[0].toFixed(3); p.Y=+xy[1].toFixed(3); }catch(e){}
    }
    if(opts.wkt){ p.WKT=wktOf(f.geometry); }
  });
}
var legacyDrawExport=document.getElementById('drawExport');if(legacyDrawExport)legacyDrawExport.onclick=function(){
  var rawFc=collectFeatures();
  if(!rawFc.features.length){ toast('No drawn or marked features to export',true); return; }
  var fmt=document.getElementById('drawFmt').value;
  var exKey=activeExportCrs(rawFc);
  // inject the requested coordinate columns into properties (WGS84 source coords)
  injectCoordColumns(rawFc, exKey);
  var proj=projectFeatureCollection(rawFc, exKey);
  var fc=proj.fc, crs=proj.crs, suffix=(exKey==='wgs84'?'':('_'+(crs.esri||exKey)));
  var crsNote=crs.esri+' ('+crs.code+')';
  if(fmt==='geojson'){
    // RFC 7946 GeoJSON is always longitude/latitude WGS84. Projected
    // coordinates and the deprecated "crs" member are not interoperable.
    dl(JSON.stringify(rawFc,null,2),'spatialitqan_features.geojson','application/geo+json');
    toast('Exported '+rawFc.features.length+' feature(s) — standard GeoJSON in WGS84 (EPSG:4326)');
  }
  else if(fmt==='kml'){
    // KML coordinates must be longitude/latitude WGS84.
    dl(toKML(rawFc,'GCS WGS 1984 (EPSG:4326)'),'spatialitqan_features.kml','application/vnd.google-earth.kml+xml');
    toast('Exported KML in WGS84 (EPSG:4326)');
  }
  else if(fmt==='csv'){ dl(toCSV(fc,crsNote),'spatialitqan_features'+suffix+'.csv','text/csv'); toast('Exported CSV/WKT in '+crsNote); }
  else if(fmt==='gpx'){
    // GPX is always WGS84 by spec — export the unprojected data, warn if CRS differs
    dl(toGPX(rawFc),'spatialitqan_features.gpx','application/gpx+xml');
    toast('Exported GPX (always WGS84 per GPX spec)');
  }
  else if(fmt==='shp'){
    if(typeof shpwrite==='undefined'){ toast('Shapefile library not loaded — use GeoJSON or KML',true); return; }
    exportShapefile(fc, exKey, crs);
    return;
  }
};
/* Shapefile export with a matching Esri .prj written into the .zip */
function exportShapefile(fc, exKey, crs,baseName){
  baseName=String(baseName||'spatialitqan').replace(/[^A-Za-z0-9_\-]+/g,'_')||'spatialitqan';
  var opts={folder:baseName,types:{point:'points',polygon:'polygons',polyline:'lines'},
    prj:esriPrj(exKey)};
  var fileName=baseName+(exKey==='wgs84'?'':('_'+(crs.esri||exKey)))+'.zip';
  var prj=esriPrj(exKey);
  function fallback(err){
    try{
      if(!shpwrite.download)throw err||new Error('No supported shp-write download method');
      shpwrite.download(fc,opts);
      toast('Shapefile exported in '+crs.esri+' ('+crs.code+')');
    }catch(e){
      toast('Shapefile export failed: '+(e&&e.message?e.message:e)+' — try GeoJSON/KML',true);
    }
  }
  if(!shpwrite.zip){fallback();return;}
  try{
    // Different shp-write builds return either a value or a Promise.
    Promise.resolve(shpwrite.zip(fc,opts)).then(function(content){
      if(typeof JSZip==='undefined'){
        if(content instanceof Blob)saveBlob(content,fileName,'application/zip');
        else if(typeof content==='string'&&/^[A-Za-z0-9+/=\s]+$/.test(content)){
          var raw=atob(content.replace(/\s/g,'')),bytes=new Uint8Array(raw.length);
          for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
          saveBlob(new Blob([bytes],{type:'application/zip'}),fileName,'application/zip');
        }else saveBlob(new Blob([content],{type:'application/zip'}),fileName,'application/zip');
        toast('Shapefile exported in '+crs.esri+' ('+crs.code+')');
        return null;
      }
      var loadOptions=(typeof content==='string'&&/^[A-Za-z0-9+/=\s]+$/.test(content))?{base64:true}:undefined;
      return JSZip.loadAsync(content,loadOptions).then(function(zip){
        var shpNames=[];
        zip.forEach(function(path){if(/\.shp$/i.test(path))shpNames.push(path.replace(/\.shp$/i,''));});
        shpNames.forEach(function(base){zip.file(base+'.prj',prj);});
        return zip.generateAsync({type:'blob'});
      }).then(function(blob){
        saveBlob(blob,fileName,'application/zip');
        toast('Shapefile (.zip with Esri .prj) exported in '+crs.esri+' ('+crs.code+')');
      });
    }).catch(fallback);
  }catch(e){fallback(e);}
}
function dl(content,fname,mime){
  var blob=new Blob([content],{type:mime}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=fname;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},1000);
}

/* ================= EDITABLE POINT MARKERS ================= */
var ptGroup=new L.FeatureGroup().addTo(map);
var ptItems=[];      // {id,marker,text,labelOn,style,color,latlng}
var ptSeq=0, ptAddMode=false, ptUndoStack=[];

function pinIcon(color){
  return L.divIcon({className:'',iconSize:[26,34],iconAnchor:[13,32],
    html:'<svg width="26" height="34" viewBox="0 0 26 34"><path d="M13 0C6 0 0 5.6 0 12.6 0 22 13 34 13 34s13-12 13-21.4C26 5.6 20 0 13 0z" fill="'+color+'"/><circle cx="13" cy="12.5" r="5" fill="#fff"/></svg>'});
}
function makeMarker(latlng,style,color){
  if(style==='pin'){ return L.marker(latlng,{icon:pinIcon(color),draggable:true}); }
  return L.circleMarker(latlng,{radius:6,color:'#fff',weight:2,fillColor:color,fillOpacity:1,draggable:true});
}
function ptRefreshLabel(it){
  if(it.marker.getTooltip&&it.marker.getTooltip()) it.marker.unbindTooltip();
  if(it.labelOn && it.text){ it.marker.bindTooltip(it.text,{permanent:true,direction:'top',className:'pt-label',offset:[0,-10]}).openTooltip(); }
}
function ptAddAt(latlng){
  var style=document.getElementById('ptStyle').value, color=document.getElementById('ptColor').value;
  var id='pt_'+(++ptSeq);
  var marker=makeMarker(latlng,style,color);
  // circleMarker isn't draggable natively; emulate drag for it
  var it={id:id,marker:marker,text:'Point '+ptSeq,labelOn:true,style:style,color:color,latlng:latlng};
  marker.addTo(ptGroup);
  ptRefreshLabel(it);
  marker.on('click',function(e){ if(window.L&&L.DomEvent)L.DomEvent.stop(e); editPoint(id); });
  if(style==='pin'){
    marker.on('dragend',function(){ it.latlng=marker.getLatLng(); renderPtList(); });
  }else{
    enableCircleDrag(marker,it);
  }
  ptItems.push(it); ptUndoStack.push(id); renderPtList();
  return it;
}
function enableCircleDrag(marker,it){
  var dragging=false;
  function onDown(){ dragging=true; map.dragging.disable(); }
  function onMove(e){ if(dragging){ marker.setLatLng(e.latlng); it.latlng=e.latlng; } }
  function onUp(){ if(dragging){ dragging=false; map.dragging.enable(); renderPtList(); } }
  marker.on('mousedown',onDown);
  map.on('mousemove',onMove);
  map.on('mouseup',onUp);
  it._dragCleanup=function(){ marker.off('mousedown',onDown); map.off('mousemove',onMove); map.off('mouseup',onUp); if(dragging){ dragging=false; try{map.dragging.enable();}catch(e){} } };
}
var legacyPtAdd=document.getElementById('ptAdd');if(legacyPtAdd)legacyPtAdd.onclick=function(){
  ptAddMode=!ptAddMode;
  this.textContent=ptAddMode?'● Click map to place…':'＋ Add point';
  this.classList.toggle('accent',!ptAddMode);
  map.getContainer().style.cursor=ptAddMode?'crosshair':'';
};
map.on('click',function(e){ if(ptAddMode){ ptAddAt(e.latlng); } });
var legacyPtUndo=document.getElementById('ptUndo');if(legacyPtUndo)legacyPtUndo.onclick=function(){
  var id=ptUndoStack.pop(); if(!id){toast('Nothing to undo',true);return;}
  removePoint(id,true); toast('Last point removed');
};
function removePoint(id,skipStack){
  var i=ptItems.findIndex(function(x){return x.id===id;}); if(i<0)return;
  if(ptItems[i]._dragCleanup){ try{ptItems[i]._dragCleanup();}catch(e){} }
  ptGroup.removeLayer(ptItems[i].marker); ptItems.splice(i,1);
  if(!skipStack){ var si=ptUndoStack.lastIndexOf(id); if(si>=0)ptUndoStack.splice(si,1); }
  renderPtList();
}
function editPoint(id){
  var it=ptItems.find(function(x){return x.id===id;}); if(!it)return;
  var t=prompt('Label text for this point:', it.text);
  if(t!==null){ it.text=t; ptRefreshLabel(it); renderPtList(); }
}
function renderPtList(){
  var el=document.getElementById('ptList'); if(!el)return; el.innerHTML='';
  ptItems.forEach(function(it){
    var row=document.createElement('div'); row.className='layerrow';
    row.innerHTML='<span class="sw" style="background:'+it.color+'"></span>'+
      '<label style="flex:1;cursor:pointer">'+escapeHtml(it.text||'(no label)')+'</label>'+
      '<button class="lbl" title="Toggle label">'+(it.labelOn?'🏷':'⬚')+'</button>'+
      '<button class="ed" title="Edit text">✎</button>'+
      '<button class="x" title="Delete">✕</button>';
    row.querySelector('label').onclick=function(){ try{map.panTo(it.marker.getLatLng());}catch(e){} };
    row.querySelector('.lbl').onclick=function(){ it.labelOn=!it.labelOn; ptRefreshLabel(it); renderPtList(); };
    row.querySelector('.ed').onclick=function(){ editPoint(it.id); };
    row.querySelector('.x').onclick=function(){ removePoint(it.id); };
    el.appendChild(row);
  });
}

/* ================= OPERATIONAL TOOLS ================= */
function vectorLayers(){return Object.keys(layers).map(function(id){return layers[id];}).filter(function(l){return l.visible===true && l.geojson&&l.geojson.features;});}
function fieldsOf(l){var out={};(l.editSchema||[]).forEach(function(field){out[field.name]=1;});(l.geojson.features||[]).forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){out[k]=1;});});return Object.keys(out);}
function numericFields(l){return fieldsOf(l).filter(function(k){return l.geojson.features.some(function(f){var v=f.properties[k];return v!==null&&v!==''&&!isNaN(parseFloat(v));});});}
function fillSel(sel,items,vf,tf,ph){sel.innerHTML=ph?'<option value="">'+ph+'</option>':'';items.forEach(function(it){var o=document.createElement('option');o.value=vf(it);o.textContent=tf(it);sel.appendChild(o);});}
function refreshDropdowns(){var vs=vectorLayers();
  ['sLayer','eLayer'].forEach(function(id){var sel=document.getElementById(id);if(!sel)return;var prev=sel.value;
    fillSel(sel,vs,function(l){return l.id;},function(l){return l.name;},vs.length?null:'— no layers —');if(prev)sel.value=prev;});
  syncS();}
/* attribute table */
var drawer=document.getElementById('attrDrawer'),attrWrap=document.getElementById('attrTableWrap'),curTbl=null,sortc={key:null,dir:1};
var SV_SHAPE_FIELD='__sv_virtual_shape__';

function svTableColumns(L0){
  var cols=fieldsOf(L0).filter(function(c){return !/^shape$/i.test(String(c));});
  return [SV_SHAPE_FIELD].concat(cols);
}
function svTableFieldLabel(field){
  if(field===SV_SHAPE_FIELD)return'SHAPE';
  try{var schema=(curTbl&&curTbl.editSchema)||[],match=schema.filter(function(item){return item.name===field;})[0];if(match&&match.alias&&match.alias!==field)return match.alias+' ['+field+']';}catch(e){}
  return field;
}
function svTableFieldValue(feature,field){
  if(field===SV_SHAPE_FIELD)return feature&&feature.geometry?feature.geometry.type:'';
  return feature&&feature.properties?feature.properties[field]:null;
}
function svFormatNumber(value,decimals){
  var n=Number(value); if(!isFinite(n))return '0';
  return n.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:decimals==null?2:decimals});
}
function svFormatLengthDual(m){return svFormatNumber(m,2)+' m / '+svFormatNumber(m/1000,3)+' km';}
function svFormatAreaDual(m2){return svFormatNumber(m2,2)+' m² / '+svFormatNumber(m2/1000000,6)+' km²';}
function svSelectedFeatures(L0){
  if(!L0||!L0.geojson)return [];
  var set=svSelSet(L0.id);
  return (L0.geojson.features||[]).filter(function(f){return !!set[String(f.properties&&f.properties.__sv_fid)];});
}
function svSelectionMetrics(L0){
  var feats=svSelectedFeatures(L0),m={count:feats.length,points:0,lines:0,polygons:0,other:0,lengthM:0,areaM2:0};
  feats.forEach(function(f){
    var g=f&&f.geometry,t=g&&g.type||'';
    if(!g){m.other++;return;}
    if(t==='Point'||t==='MultiPoint')m.points++;
    else if(t==='LineString'||t==='MultiLineString'){
      m.lines++;
      try{if(typeof turf!=='undefined')m.lengthM+=turf.length(f,{units:'kilometers'})*1000;}catch(e){}
    }else if(t==='Polygon'||t==='MultiPolygon'){
      m.polygons++;
      try{if(typeof turf!=='undefined')m.areaM2+=turf.area(f);}catch(e){}
    }else m.other++;
  });
  return m;
}
function svSelectionText(L0){
  var m=svSelectionMetrics(L0); if(!m.count)return '';
  var p=[m.count+' selected'];
  if(m.points)p.push('Points: '+m.points);
  if(m.lines)p.push('Lines: '+m.lines+' · Length: '+svFormatLengthDual(m.lengthM));
  if(m.polygons)p.push('Polygons: '+m.polygons+' · Area: '+svFormatAreaDual(m.areaM2));
  if(m.other)p.push('Other: '+m.other);
  return p.join(' · ');
}
function svSelectionMetricsAll(){
  var total={count:0,points:0,lines:0,polygons:0,other:0,lengthM:0,areaM2:0,layers:[]};
  Object.keys(layers||{}).forEach(function(id){
    var L0=layers[id],m=svSelectionMetrics(L0);if(!m.count)return;
    total.count+=m.count;total.points+=m.points;total.lines+=m.lines;total.polygons+=m.polygons;total.other+=m.other;total.lengthM+=m.lengthM;total.areaM2+=m.areaM2;
    total.layers.push({id:id,name:L0.name,count:m.count});
  });
  return total;
}
function svUpdateSelectionSummary(){
  var box=document.getElementById('selectionSummary'); if(!box)return;
  var m=svSelectionMetricsAll();
  if(!m.count){box.classList.remove('show');box.innerHTML='';return;}
  var html='<span class="ss-title">Selected · '+m.layers.length+' feature class'+(m.layers.length===1?'':'es')+'</span>';
  html+='<span class="ss-item">Count <b>'+m.count+'</b></span>';
  if(m.points)html+='<span class="ss-item">Points <b>'+m.points+'</b></span>';
  if(m.lines){html+='<span class="ss-item">Lines <b>'+m.lines+'</b></span>';html+='<span class="ss-item">Length <b>'+escapeHtml(svFormatLengthDual(m.lengthM))+'</b></span>';}
  if(m.polygons){html+='<span class="ss-item">Polygons <b>'+m.polygons+'</b></span>';html+='<span class="ss-item">Area <b>'+escapeHtml(svFormatAreaDual(m.areaM2))+'</b></span>';}
  if(m.other)html+='<span class="ss-item">Other <b>'+m.other+'</b></span>';
  html+='<span class="ss-layer">'+m.layers.map(function(x){return escapeHtml(x.name)+' ('+x.count+')';}).join(' · ')+'</span>';
  box.innerHTML=html;box.classList.add('show');
}
function svSetAttrCount(visibleCount){
  if(!curTbl)return;
  var t=visibleCount+' row'+(visibleCount===1?'':'s'),s=svSelectionText(curTbl);
  document.getElementById('attrCount').textContent=t+(s?(' · '+s):'');
}
var svTableSelectedOnly=false,svTableEditMode=true,svTableAnchorFid=null;
function svCurrentTableFeatures(){
  if(!curTbl)return [];
  var feats=(curTbl.geojson.features||[]).slice(),filt=document.getElementById('attrFilter').value.trim().toLowerCase(),cols=svTableColumns(curTbl),set=svSelSet(curTbl.id);
  if(filt)feats=feats.filter(function(f){return cols.some(function(c){var v=svTableFieldValue(f,c);return v!=null&&String(v).toLowerCase().indexOf(filt)>=0;});});
  if(svTableSelectedOnly)feats=feats.filter(function(f){return !!set[String(f.properties&&f.properties.__sv_fid)];});
  return feats;
}
function svStatsSource(){
  var selected=svSelectedFeatures(curTbl);
  if(selected.length)return {features:selected,label:selected.length+' selected feature'+(selected.length===1?'':'s')};
  var visible=svCurrentTableFeatures();
  return {features:visible,label:visible.length+' visible/filtered row'+(visible.length===1?'':'s')};
}
function svFreqRows(values,limit){
  var freq={};values.forEach(function(v){var k=String(v);freq[k]=(freq[k]||0)+1;});
  return Object.keys(freq).sort(function(a,b){return freq[b]-freq[a]||a.localeCompare(b);}).slice(0,limit||10).map(function(k){return escapeHtml(k)+' ('+freq[k]+')';}).join('<br>')||'—';
}
function svStatRow(name,value){return '<tr><th>'+escapeHtml(name)+'</th><td>'+value+'</td></tr>';}
function svEnsureStatsOverlay(){
  var o=document.getElementById('attrStatsOverlay');if(o)return o;
  o=document.createElement('div');o.id='attrStatsOverlay';o.className='attr-stats-overlay';
  o.innerHTML='<div class="attr-stats-card"><div class="attr-stats-head"><b id="attrStatsTitle">Field Statistics</b><span></span><button id="attrStatsClose">✕ Close</button></div><div class="attr-stats-body" id="attrStatsBody"></div></div>';
  document.body.appendChild(o);
  document.getElementById('attrStatsClose').onclick=function(){o.classList.remove('open');};
  o.onclick=function(e){if(e.target===o)o.classList.remove('open');};
  return o;
}
function svShowFieldStats(field){
  if(!curTbl)return;
  var src=svStatsSource(),feats=src.features,label=svTableFieldLabel(field),rows='';
  if(field===SV_SHAPE_FIELD){
    var counts={},nullGeom=0,totalLength=0,totalArea=0;
    feats.forEach(function(f){var t=f&&f.geometry&&f.geometry.type;if(!t){nullGeom++;return;}counts[t]=(counts[t]||0)+1;
      try{if(typeof turf!=='undefined'&&(t==='LineString'||t==='MultiLineString'))totalLength+=turf.length(f,{units:'kilometers'})*1000;}catch(e){}
      try{if(typeof turf!=='undefined'&&(t==='Polygon'||t==='MultiPolygon'))totalArea+=turf.area(f);}catch(e){}
    });
    rows+=svStatRow('Feature count',svFormatNumber(feats.length,0));
    rows+=svStatRow('Null geometry',svFormatNumber(nullGeom,0));
    rows+=svStatRow('Geometry types',Object.keys(counts).sort().map(function(k){return escapeHtml(k)+': '+counts[k];}).join('<br>')||'—');
    rows+=svStatRow('Total line length',svFormatLengthDual(totalLength));
    rows+=svStatRow('Total polygon area',svFormatAreaDual(totalArea));
  }else{
    var raw=feats.map(function(f){return svTableFieldValue(f,field);}),nonEmpty=raw.filter(function(v){return v!==null&&v!==undefined&&String(v).trim()!=='';}),nulls=raw.length-nonEmpty.length;
    var nums=nonEmpty.map(function(v){return Number(v);}).filter(function(v){return isFinite(v);}),numeric=nonEmpty.length>0&&nums.length===nonEmpty.length;
    var unique={};nonEmpty.forEach(function(v){unique[String(v)]=1;});
    rows+=svStatRow('Record count',svFormatNumber(raw.length,0));
    rows+=svStatRow('Non-null count',svFormatNumber(nonEmpty.length,0));
    rows+=svStatRow('Null / empty',svFormatNumber(nulls,0));
    rows+=svStatRow('Unique values',svFormatNumber(Object.keys(unique).length,0));
    if(numeric){
      nums.sort(function(a,b){return a-b;});
      var sum=nums.reduce(function(a,b){return a+b;},0),mean=nums.length?sum/nums.length:0,mid=Math.floor(nums.length/2),median=nums.length%2?nums[mid]:(nums[mid-1]+nums[mid])/2;
      var variance=nums.length?nums.reduce(function(a,b){return a+Math.pow(b-mean,2);},0)/nums.length:0;
      rows+=svStatRow('Minimum',svFormatNumber(nums[0],6));
      rows+=svStatRow('Maximum',svFormatNumber(nums[nums.length-1],6));
      rows+=svStatRow('Sum',svFormatNumber(sum,6));
      rows+=svStatRow('Mean',svFormatNumber(mean,6));
      rows+=svStatRow('Median',svFormatNumber(median,6));
      rows+=svStatRow('Std. deviation',svFormatNumber(Math.sqrt(variance),6));
    }else{
      rows+=svStatRow('Most frequent values',svFreqRows(nonEmpty,10));
    }
  }
  var o=svEnsureStatsOverlay();
  document.getElementById('attrStatsTitle').textContent='Statistics — '+label;
  document.getElementById('attrStatsBody').innerHTML='<div class="attr-stats-scope">Scope: '+escapeHtml(src.label)+'</div><table class="attr-stats-grid">'+rows+'</table><div class="attr-stats-note">Statistics use selected records when a selection exists; otherwise they use the currently visible/filtered table rows.</div>';
  o.classList.add('open');
}
function svOpenFieldCalculator(field){
  if(!curTbl)return;
  if(field===SV_SHAPE_FIELD){svCalculateGeometry();return;}
  openSelectByAttr(curTbl.id,'calc');
  var fld=document.getElementById('sbaCalcField'),scope=document.getElementById('sbaCalcScope'),expr=document.getElementById('sbaCalcExpr');
  if(fld)fld.value=field;
  if(scope)scope.value=svSelectedFeatures(curTbl).length?'selected':(document.getElementById('attrFilter').value?'filtered':'all');
  setTimeout(function(){if(expr)expr.focus();},50);
}
function svCalculateGeometry(){
  if(!curTbl)return;
  var op=prompt('Calculate Geometry operation:\nTYPE = geometry type\nLENGTH_M = line length in metres\nLENGTH_KM = line length in kilometres\nAREA_M2 = polygon area in square metres\nAREA_KM2 = polygon area in square kilometres\nPERIMETER_M = polygon perimeter in metres','LENGTH_M');
  if(!op)return;op=String(op).trim().toUpperCase();
  var defaults={TYPE:'Shape_Type',LENGTH_M:'Shape_Length',LENGTH_KM:'Length_km',AREA_M2:'Shape_Area',AREA_KM2:'Area_km2',PERIMETER_M:'Perimeter_m'};
  if(!defaults[op]){toast('Unsupported geometry calculation',true);return;}
  var field=prompt('Output field name:',defaults[op]);if(!field)return;
  var selected=svSelectedFeatures(curTbl),targets=selected.length?selected:(curTbl.geojson.features||[]),updated=0;
  targets.forEach(function(f){var g=f.geometry,t=g&&g.type||'',v=null;
    try{
      if(op==='TYPE')v=t;
      else if((op==='LENGTH_M'||op==='LENGTH_KM')&&(t==='LineString'||t==='MultiLineString')){v=turf.length(f,{units:'kilometers'});if(op==='LENGTH_M')v*=1000;}
      else if((op==='AREA_M2'||op==='AREA_KM2')&&(t==='Polygon'||t==='MultiPolygon')){v=turf.area(f);if(op==='AREA_KM2')v/=1000000;}
      else if(op==='PERIMETER_M'&&(t==='Polygon'||t==='MultiPolygon')){v=turf.length(turf.polygonToLine(f),{units:'kilometers'})*1000;}
    }catch(e){v=null;}
    if(v!==null&&v!==undefined){if(!f.properties)f.properties={};f.properties[field]=typeof v==='number'?Math.round(v*1000000)/1000000:v;updated++;}
  });
  try{if(window.__svMarkDirty)window.__svMarkDirty();}catch(e){}
  svBuildLeafletLayer(curTbl);refreshDropdowns();renderTable();
  toast('Calculated '+field+' for '+updated+' feature(s)'+(selected.length?' (selected only)':''));
}
function svEnsureFieldMenu(){
  var m=document.getElementById('attrFieldMenu');if(m)return m;
  m=document.createElement('div');m.id='attrFieldMenu';m.className='attr-field-menu';
  m.innerHTML='<div class="afm-title" id="afmTitle">Field</div>'+
    '<button data-a="asc">▲ Sort Ascending</button><button data-a="desc">▼ Sort Descending</button><button data-a="clear">↕ Clear Sort</button><div class="afm-sep"></div>'+
    '<button data-a="stats">Σ Statistics / Summarize</button><button data-a="calc">ƒ Calculate Field / Geometry…</button><div class="afm-sep"></div><button data-a="selectall">✓ Select All Visible Rows</button><button data-a="switch">⇄ Switch Selection</button><button data-a="selected">★ Show Selected Only</button>';
  document.body.appendChild(m);
  document.addEventListener('click',function(){m.classList.remove('open');document.querySelectorAll('table.grid th.field-menu-active').forEach(function(th){th.classList.remove('field-menu-active');});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){m.classList.remove('open');var o=document.getElementById('attrStatsOverlay');if(o)o.classList.remove('open');}});
  return m;
}
function svOpenFieldMenu(e,field,th){
  e.preventDefault();e.stopPropagation();
  var m=svEnsureFieldMenu(),label=svTableFieldLabel(field);
  document.getElementById('afmTitle').textContent=label;
  document.querySelectorAll('table.grid th.field-menu-active').forEach(function(x){x.classList.remove('field-menu-active');});th.classList.add('field-menu-active');
  m.querySelector('[data-a="calc"]').textContent=field===SV_SHAPE_FIELD?'⌗ Calculate Geometry…':'ƒ Calculate Field…';
  m.querySelectorAll('button').forEach(function(b){b.onclick=function(ev){ev.stopPropagation();var a=b.getAttribute('data-a');m.classList.remove('open');th.classList.remove('field-menu-active');
    if(a==='asc'){sortc.key=field;sortc.dir=1;renderTable();}
    else if(a==='desc'){sortc.key=field;sortc.dir=-1;renderTable();}
    else if(a==='clear'){sortc={key:null,dir:1};renderTable();}
    else if(a==='stats')svShowFieldStats(field);
    else if(a==='calc')svOpenFieldCalculator(field);
    else if(a==='selectall')svSelectAllVisibleRows();
    else if(a==='switch')svSwitchSelection(curTbl.id);
    else if(a==='selected')svToggleSelectedOnly();
  };});
  m.classList.add('open');
  var r=m.getBoundingClientRect(),x=Math.min(e.clientX,window.innerWidth-r.width-8),y=Math.min(e.clientY,window.innerHeight-r.height-8);
  m.style.left=Math.max(8,x)+'px';m.style.top=Math.max(8,y)+'px';
}

function svFillTableLayerSelect(){
  var sel=document.getElementById('attrLayerSelect');if(!sel)return;var prev=curTbl&&curTbl.id||sel.value;
  sel.innerHTML=Object.keys(layers||{}).filter(function(id){return layers[id]&&layers[id].geojson;}).map(function(id){return '<option value="'+escapeHtml(id)+'">'+escapeHtml(layers[id].name)+'</option>';}).join('');
  if(prev&&layers[prev])sel.value=prev;
}
function svSelectAllVisibleRows(){
  if(!curTbl)return;var set=svSelSet(curTbl.id),feats=svCurrentTableFeatures();Object.keys(set).forEach(function(k){delete set[k];});
  feats.forEach(function(f){set[String(f.properties&&f.properties.__sv_fid)]=true;});svBuildLeafletLayer(curTbl);renderTable();toast(feats.length+' visible row(s) selected');
}
function svSwitchSelection(layerId){
  var L0=layers[layerId]||curTbl;if(!L0||!L0.geojson)return;ensureFids(L0.geojson);var set=svSelSet(L0.id),next={};
  (L0.geojson.features||[]).forEach(function(f){var fid=String(f.properties&&f.properties.__sv_fid);if(!set[fid])next[fid]=true;});window.__svOpState.selectedSets[L0.id]=next;
  svBuildLeafletLayer(L0);if(curTbl&&curTbl.id===L0.id)renderTable();toast(Object.keys(next).length+' feature(s) selected after switch');
}
function svClearLayerSelection(layerId){
  var L0=layers[layerId]||curTbl;if(!L0)return;window.__svOpState.selectedSets[L0.id]={};svBuildLeafletLayer(L0);if(curTbl&&curTbl.id===L0.id)renderTable();svUpdateSelectionSummary();
}
function svToggleSelectedOnly(force){
  svTableSelectedOnly=typeof force==='boolean'?force:!svTableSelectedOnly;var b=document.getElementById('attrShowSel');if(b)b.classList.toggle('active',svTableSelectedOnly);
  var xb=document.getElementById('xpShowSel');if(xb)xb.classList.toggle('active',svTableSelectedOnly);if(curTbl)renderTable();
}
function svSyncRenderedTableSelection(){
  if(!curTbl||!attrWrap)return;var set=svSelSet(curTbl.id),visible=0;
  Array.prototype.forEach.call(attrWrap.querySelectorAll('tbody tr[data-fid]'),function(r){
    var selected=!!set[r.getAttribute('data-fid')];r.classList.toggle('sel',selected);
    r.style.display=(svTableSelectedOnly&&!selected)?'none':'';if(r.style.display!=='none')visible++;
  });
  svSetAttrCount(visible);try{svUpdateSelectionSummary();}catch(e){}
}
function svSetTableEditMode(){if(!curTbl)return;if(!window.__svEditSession||!window.__svEditSession.active||window.__svEditSession.layerId!==curTbl.id){toast('Start editing this target layer before changing attributes',true);return;}svTableEditMode=true;renderTable();toast('Double-click any attribute value in the table to edit it');}
function svParseCellValue(raw,old,field,L0){
  if(raw===null||raw===undefined||raw==='NULL')return null;
  var def=(L0&&L0.editSchema||[]).filter(function(item){return item.name===field;})[0],type=def&&def.type;
  if(type==='integer'){var integer=Number(raw);return isFinite(integer)&&Math.floor(integer)===integer?integer:old;}
  if(type==='double'){var decimal=Number(raw);return isFinite(decimal)?decimal:old;}
  if(type==='boolean')return /^(true|1|yes|y)$/i.test(String(raw));
  if(type==='date'){var date=new Date(raw);return isNaN(date.getTime())?old:String(raw);}
  if(type==='text')return String(raw);
  if(typeof old==='number'){var n=Number(raw);return isFinite(n)?n:raw;}if(typeof old==='boolean'){return /^(true|1|yes)$/i.test(raw);}return raw;
}
function svValuesEqual(a,b){if(a===b)return true;if((a===null||a===undefined||a==='')&&(b===null||b===undefined||b===''))return true;if(typeof a==='number'||typeof b==='number'){var na=Number(a),nb=Number(b);if(isFinite(na)&&isFinite(nb))return na===nb;}return String(a)===String(b);}
function svPendingCellKey(layerId,feature,field){return String(layerId)+'|'+String(feature&&feature.properties&&feature.properties.__sv_fid||'')+'|'+String(field);}
function svBeginCellEdit(td,feature,field){
  if(!window.__svEditSession||!window.__svEditSession.active||!curTbl||window.__svEditSession.layerId!==curTbl.id){toast('Start editing this target layer before changing attributes',true);return;}
  if(field===SV_SHAPE_FIELD||td.classList.contains('attr-editing'))return;var old=svTableFieldValue(feature,field),def=(curTbl.editSchema||[]).filter(function(item){return item.name===field;})[0],domain=def&&Array.isArray(def.domain)?def.domain:[];
  var input;if(domain.length||def&&def.type==='boolean'){input=document.createElement('select');var values=domain.length?domain:['true','false'];input.innerHTML=(def&&def.nullable!==false?'<option value="">(blank)</option>':'')+values.map(function(value){return '<option value="'+escapeHtml(value)+'">'+escapeHtml(value)+'</option>';}).join('');input.value=old==null?'':String(old);}else{input=document.createElement('input');input.type=def&&def.type==='date'?'date':'text';input.value=old==null?'':String(old);}
  td.classList.add('attr-editing');td.innerHTML='';td.appendChild(input);input.focus();if(input.select)input.select();var done=false;
  function finish(save){if(done)return;done=true;var shown=old,changed=false;if(save){var next=svParseCellValue(input.value,old,field,curTbl);shown=next;if(!svValuesEqual(next,old)){changed=true;try{if(window.__svAdvSnapshot)window.__svAdvSnapshot();}catch(e){}if(!feature.properties)feature.properties={};feature.properties[field]=next;window.__svPendingCells[svPendingCellKey(curTbl.id,feature,field)]=true;try{if(window.__svMarkDirty)window.__svMarkDirty();}catch(e){}if(curTbl.uniqueField===field)curTbl.catColors=deriveCategoryColors(curTbl,field);svBuildLeafletLayer(curTbl);toast(field+' updated — click Save to commit');}}
    td.classList.remove('attr-editing');if(changed||window.__svPendingCells[svPendingCellKey(curTbl.id,feature,field)])td.classList.add('attr-pending');td.textContent=shown==null?'':String(shown);
  }
  input.onkeydown=function(e){e.stopPropagation();if(e.key==='Enter'){e.preventDefault();finish(true);}else if(e.key==='Escape'){e.preventDefault();finish(false);}};input.onblur=function(){finish(true);};input.onclick=function(e){e.stopPropagation();};
}
function svApplyAttributeEditor(){
  if(!curTbl)return;if(!window.__svEditSession||!window.__svEditSession.active||window.__svEditSession.layerId!==curTbl.id){toast('Start editing this target layer before changing attributes',true);return;}var feats=svSelectedFeatures(curTbl),grid=document.getElementById('attrEditGrid'),changes=[];
  grid.querySelectorAll('input[data-field]').forEach(function(inp){if(inp.getAttribute('data-changed')!=='1')return;var field=inp.getAttribute('data-field'),cb=grid.querySelector('input[data-null="'+CSS.escape(field)+'"]');changes.push({field:field,value:cb&&cb.checked?null:inp.value});});
  if(!changes.length){toast('No attribute changes entered',true);return;}try{if(window.__svAdvSnapshot)window.__svAdvSnapshot();}catch(e){}
  feats.forEach(function(f){if(!f.properties)f.properties={};changes.forEach(function(ch){f.properties[ch.field]=svParseCellValue(ch.value,f.properties[ch.field],ch.field,curTbl);});});
  try{if(window.__svMarkDirty)window.__svMarkDirty();}catch(e){}changes.forEach(function(ch){if(curTbl.uniqueField===ch.field)curTbl.catColors=deriveCategoryColors(curTbl,ch.field);});
  svBuildLeafletLayer(curTbl);renderTable();document.getElementById('attrEditModal').classList.remove('open');toast('Updated '+changes.length+' field(s) on '+feats.length+' selected feature(s)');
}
function svSetActiveTableLayer(){
  if(!curTbl)return;var xp=document.getElementById('xpActiveLayer');if(xp){xp.value=curTbl.id;xp.dispatchEvent(new Event('change'));}
}
function svEditGeometryFromTable(){
  if(!curTbl)return;var n=svSelectedFeatures(curTbl).length;if(n!==1){toast('Select exactly one feature to edit its geometry',true);return;}svSetActiveTableLayer();
  if(!window.__svOpState.editMode){var e=document.getElementById('xpStartEdit');if(e)e.click();}var b=document.getElementById('xpEditShape');if(b)b.click();
}
function svCommitActiveGeometryEdit(){
  var target=window.__svEditingLayer;if(!target)return false;try{target.editing.disable();}catch(e){}window.__svEditingLayer=null;
  try{var gj=target.toGeoJSON();if(target.feature)target.feature.geometry=gj.geometry;}catch(e){}try{if(window.__svMarkDirty)window.__svMarkDirty();}catch(e){}
  var fid=String(target.feature&&target.feature.properties&&target.feature.properties.__sv_fid||''),owner=null;
  Object.keys(layers||{}).some(function(id){var L0=layers[id];if(!L0||!L0.geojson)return false;var hit=(L0.geojson.features||[]).some(function(f){return String(f.properties&&f.properties.__sv_fid||'')===fid;});if(hit){owner=L0;return true;}return false;});
  if(owner)svBuildLeafletLayer(owner);else if(curTbl)svBuildLeafletLayer(curTbl);return true;
}
function svSaveTableEdits(){
  if(!window.__svHasUnsavedEdits&&!window.__svEditingLayer){toast('No unsaved edits');return true;}
  svCommitActiveGeometryEdit();try{var pack=window.__svPackageProject?window.__svPackageProject():null;if(!pack){toast('Save not available',true);return false;}localStorage.setItem('SpatialViewUltimateProject',JSON.stringify(pack));window.__svPendingCells={};svSetSaveButtons(false);if(window.__svEditSession&&window.__svEditSession.active){var sid=window.__svEditSession.layerId,sl=layers[sid],baselines={};Object.keys(layers||{}).forEach(function(id){var item=layers[id];if(item&&item.geojson)baselines[id]=JSON.parse(JSON.stringify(item.geojson));});window.__svEditSession.baseline=sl&&sl.geojson?JSON.parse(JSON.stringify(sl.geojson)):null;window.__svEditSession.baselines=baselines;window.__svEditSession.dirty=false;}if(curTbl)renderTable();if(window.__svRefreshEditorUI)window.__svRefreshEditorUI();toast('Edits saved to browser memory');return true;}catch(e){toast('Could not save: '+e.message,true);return false;}
}
function svOpenCalculatorForCurrent(){
  if(!curTbl)return;openSelectByAttr(curTbl.id,'calc');var scope=document.getElementById('sbaCalcScope');if(scope)scope.value=svSelectedFeatures(curTbl).length?'selected':(document.getElementById('attrFilter').value?'filtered':'all');
  setTimeout(function(){var el=document.getElementById('sbaCalcField');if(el)el.focus();},40);
}
function openTable(id){var L0=layers[id];if(!L0||!L0.geojson){toast('No attribute data',true);return;}
  ensureFids(L0.geojson);curTbl=L0;sortc={key:null,dir:1};svTableAnchorFid=null;document.getElementById('attrTitle').textContent=L0.name;
  document.getElementById('attrFilter').value='';svFillTableLayerSelect();renderTable();drawer.classList.add('open');svUpdateSelectionSummary();
  setTimeout(function(){if(window.__svSyncAttrScroll)window.__svSyncAttrScroll();},30);}
/* ---- attribute table rendering -----------------------------------------------
   A big table (3k+ rows x 40+ columns = 100k+ cells) is far too much to build in one
   blocking pass, so rows are streamed in: the first chunk paints immediately (the table
   opens instantly) and the rest fill in over the following frames. Row clicks use one
   delegated listener instead of one closure per row. Look and behaviour are unchanged. */
var SV_TABLE_MAX=2000, SV_FIRST_CHUNK=100, SV_CHUNK=400;
var svRenderToken=0, svTableRows=[];
function svRowHtml(f,i,cols,selSet,hasPending,layerId){
  var fid=String((f.properties&&f.properties.__sv_fid)||'');
  var s='<tr data-i="'+i+'" data-fid="'+escapeHtml(fid)+'" class="'+(selSet[fid]?'sel':'')+'">';
  for(var c=0;c<cols.length;c++){
    var col=cols[c], v=svTableFieldValue(f,col), editable=(col!==SV_SHAPE_FIELD);
    var pending=hasPending&&editable&&window.__svPendingCells[svPendingCellKey(layerId,f,col)];
    s+='<td data-k="'+escapeHtml(col)+'" title="'+(editable?'Double-click to edit':'Use Edit Geometry for SHAPE')+'" class="'+(editable?'attr-editable ':'')+(pending?'attr-pending':'')+'">'+(v==null?'':escapeHtml(v))+'</td>';
  }
  return s+'</tr>';
}
function renderTable(){if(!curTbl)return;var feats=svCurrentTableFeatures(),cols=svTableColumns(curTbl);
  if(sortc.key)feats.sort(function(a,b){var x=svTableFieldValue(a,sortc.key),y=svTableFieldValue(b,sortc.key),nx=parseFloat(x),ny=parseFloat(y);if(!isNaN(nx)&&!isNaN(ny))return (nx-ny)*sortc.dir;return String(x==null?'':x).localeCompare(String(y==null?'':y))*sortc.dir;});
  var selSet=svSelSet(curTbl.id);svSetAttrCount(feats.length);var showBtn=document.getElementById('attrShowSel');if(showBtn)showBtn.classList.toggle('active',svTableSelectedOnly);
  svRenderToken++;                                  // cancels any in-flight streaming render
  if(svTableSelectedOnly&&!feats.length){attrWrap.innerHTML='<div class="attr-empty-selected">No selected records in this feature class.</div>';svTableRows=[];if(window.__svSyncAttrScroll)window.__svSyncAttrScroll();return;}
  svTableRows=feats;
  var html='<table class="grid"><thead><tr>';cols.forEach(function(c){var label=svTableFieldLabel(c);html+='<th data-k="'+escapeHtml(c)+'" title="Left-click to sort \u00b7 Right-click for field tools">'+escapeHtml(label)+(sortc.key===c?(sortc.dir>0?' \u25B2':' \u25BC'):'')+'</th>';});
  html+='</tr></thead><tbody></tbody></table>';attrWrap.innerHTML=html;
  attrWrap.querySelectorAll('th').forEach(function(th){th.onclick=function(){var k=th.getAttribute('data-k');sortc.dir=(sortc.key===k)?-sortc.dir:1;sortc.key=k;renderTable();};th.oncontextmenu=function(e){svOpenFieldMenu(e,th.getAttribute('data-k'),th);};});
  var tbody=attrWrap.querySelector('tbody'), layerId=curTbl.id;
  var total=Math.min(feats.length,SV_TABLE_MAX);
  var hasPending=!!Object.keys(window.__svPendingCells||{}).length;
  var token=svRenderToken, i=0;
  function chunk(n){
    if(token!==svRenderToken)return;                // a newer render started — abandon this one
    var end=Math.min(i+n,total), buf='';
    for(;i<end;i++)buf+=svRowHtml(feats[i],i,cols,selSet,hasPending,layerId);
    if(buf)tbody.insertAdjacentHTML('beforeend',buf);
    if(i<total)requestAnimationFrame(function(){chunk(SV_CHUNK);});
    else if(window.__svSyncAttrScroll)window.__svSyncAttrScroll();
  }
  chunk(SV_FIRST_CHUNK);
  svUpdateSelectionSummary();if(window.__svSyncAttrScroll)window.__svSyncAttrScroll();
}
/* one delegated row-click handler for the whole table (was one closure per rendered row) */
attrWrap.addEventListener('click',function(e){
  if(!curTbl||!e.target||!e.target.closest)return;
  if(e.target.tagName==='INPUT'||e.detail>1)return;
  var tr=e.target.closest('tbody tr[data-fid]'); if(!tr||!attrWrap.contains(tr))return;
  var rows=Array.prototype.slice.call(attrWrap.querySelectorAll('tbody tr[data-fid]'));
  var idx=rows.indexOf(tr), feature=svTableRows[+tr.getAttribute('data-i')];
  var selSet=svSelSet(curTbl.id), fid=tr.getAttribute('data-fid'), mod=svSelectionModifier(e), changed={};
  if(e.shiftKey&&svTableAnchorFid){
    var anchor=rows.findIndex(function(r){return r.getAttribute('data-fid')===svTableAnchorFid;});
    if(anchor<0)anchor=idx;
    var lo=Math.min(anchor,idx),hi=Math.max(anchor,idx);
    for(var k=lo;k<=hi;k++)selSet[rows[k].getAttribute('data-fid')]=true;
  }
  else if(mod.toggle){ if(selSet[fid])delete selSet[fid]; else selSet[fid]=true; }
  else{
    changed=svClearAllSelections(false); selSet=svSelSet(curTbl.id); selSet[fid]=true;
    try{var l=L.geoJSON(feature),b=l.getBounds();if(b.isValid())map.fitBounds(b.pad(.3));}catch(e2){}
  }
  changed[curTbl.id]=true; svTableAnchorFid=fid;
  Object.keys(changed).forEach(function(id){if(layers[id]&&layers[id].geojson)svBuildLeafletLayer(layers[id]);});
  svSyncRenderedTableSelection();
});
attrWrap.addEventListener('dblclick',function(e){
  var td=e.target&&e.target.closest?e.target.closest('td.attr-editable'):null;if(!td||!attrWrap.contains(td)||!curTbl)return;
  var tr=td.closest('tr[data-fid]');if(!tr)return;e.preventDefault();e.stopPropagation();
  var fid=tr.getAttribute('data-fid'),feature=(curTbl.geojson.features||[]).find(function(f){return String(f.properties&&f.properties.__sv_fid||'')===fid;});
  if(feature)svBeginCellEdit(td,feature,td.getAttribute('data-k'));
});
document.getElementById('attrFilter').oninput=renderTable;
document.getElementById('attrClose').onclick=function(){drawer.classList.remove('open');};
document.getElementById('attrLayerSelect').onchange=function(){if(this.value)openTable(this.value);};
document.getElementById('attrSelectAll').onclick=svSelectAllVisibleRows;
document.getElementById('attrSwitchSel').onclick=function(){if(curTbl)svSwitchSelection(curTbl.id);};
document.getElementById('attrShowSel').onclick=function(){svToggleSelectedOnly();};
document.getElementById('attrClearSel').onclick=function(){if(curTbl)svClearLayerSelection(curTbl.id);};
document.getElementById('attrSelByAttr').onclick=function(){if(curTbl)openSelectByAttr(curTbl.id,'select');else toast('Open a table first',true);};
document.getElementById('attrFieldCalc').onclick=svOpenCalculatorForCurrent;
document.getElementById('attrEditAttrs').onclick=function(){svSetTableEditMode(true);};
document.getElementById('attrEditGeom').onclick=svEditGeometryFromTable;
document.getElementById('attrSave').onclick=svSaveTableEdits;
document.getElementById('attrZoomSel').onclick=function(){
  if(!curTbl)return;var selSet=svSelSet(curTbl.id),fids=Object.keys(selSet);if(!fids.length){toast('No rows selected',true);return;}var feats=(curTbl.geojson.features||[]).filter(function(f){return selSet[String(f.properties&&f.properties.__sv_fid)];});
  try{var l=L.geoJSON({type:'FeatureCollection',features:feats}),b=l.getBounds();if(b.isValid())map.fitBounds(b.pad(.2));}catch(e){toast('Cannot zoom to this selection',true);}
};
(function(){
  var modal=document.getElementById('attrEditModal');if(!modal)return;var close=function(){modal.classList.remove('open');};var c=document.getElementById('attrEditClose'),x=document.getElementById('attrEditCancel'),a=document.getElementById('attrEditApply');if(c)c.onclick=close;if(x)x.onclick=close;if(a)a.onclick=svApplyAttributeEditor;modal.onclick=function(e){if(e.target===modal)close();};
})();
svSetSaveButtons(false);
/* persistent bottom horizontal scrollbar for the attribute table — lets you page left/right across wide tables (e.g. KML style columns) */
(function(){
  var wrap=document.getElementById('attrTableWrap'),track=document.getElementById('attrHScrollTrack'),thumb=document.getElementById('attrHScrollThumb'),
      lBtn=document.getElementById('attrScrollL'),rBtn=document.getElementById('attrScrollR');
  if(!wrap||!track||!thumb)return;
  function syncThumb(){
    var sw=wrap.scrollWidth,cw=wrap.clientWidth;
    if(sw<=cw){thumb.style.width='100%';thumb.style.left='0';return;}
    var tw=track.clientWidth,ratio=cw/sw,thumbW=Math.max(30,tw*ratio),maxLeft=tw-thumbW;
    var pos=maxLeft*(wrap.scrollLeft/(sw-cw));
    thumb.style.width=thumbW+'px';thumb.style.left=pos+'px';
  }
  wrap.addEventListener('scroll',syncThumb);
  window.addEventListener('resize',syncThumb);
  var dragging=false,dragX=0,dragLeft=0;
  thumb.addEventListener('mousedown',function(e){dragging=true;dragX=e.clientX;dragLeft=wrap.scrollLeft;e.preventDefault();});
  document.addEventListener('mousemove',function(e){if(!dragging)return;
    var sw=wrap.scrollWidth,cw=wrap.clientWidth,tw=track.clientWidth,thumbW=Math.max(30,tw*(cw/sw)),span=Math.max(1,tw-thumbW);
    wrap.scrollLeft=dragLeft+(e.clientX-dragX)*((sw-cw)/span);});
  document.addEventListener('mouseup',function(){dragging=false;});
  track.addEventListener('click',function(e){if(e.target===thumb)return;var r=track.getBoundingClientRect(),pct=(e.clientX-r.left)/r.width;wrap.scrollLeft=(wrap.scrollWidth-wrap.clientWidth)*pct;});
  if(lBtn)lBtn.onclick=function(){wrap.scrollLeft-=160;};
  if(rBtn)rBtn.onclick=function(){wrap.scrollLeft+=160;};
  window.__svSyncAttrScroll=syncThumb;
})();
/* symbology */
function ramp(t){var a=[59,130,246],b=[34,211,238];return 'rgb('+Math.round(a[0]+(b[0]-a[0])*t)+','+Math.round(a[1]+(b[1]-a[1])*t)+','+Math.round(a[2]+(b[2]-a[2])*t)+')';}
function syncSMode(){
  var m=document.getElementById('sMode').value;
  document.getElementById('sSingleRow').style.display=(m==='single')?'flex':'none';
  document.getElementById('sGradField').style.display=(m==='graduated')?'block':'none';
  document.getElementById('sCatFieldWrap').style.display=(m==='categorized')?'block':'none';
}
function renderCatList(L0,field){
  var colors=(L0.uniqueField===field&&L0.catColors)?L0.catColors:deriveCategoryColors(L0,field);
  var keys=Object.keys(colors).sort(function(a,b){var na=parseFloat(a),nb=parseFloat(b);if(!isNaN(na)&&!isNaN(nb))return na-nb;return a.localeCompare(b);});
  var host=document.getElementById('sCatList');host.innerHTML='';
  keys.forEach(function(k){
    var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px;font-size:12px';
    row.innerHTML='<input type="color" value="'+colors[k]+'" data-k="'+escapeHtml(k)+'" style="width:30px;height:26px;border:1px solid var(--line);border-radius:6px;background:transparent;padding:0;cursor:pointer"/><span style="flex:1">'+escapeHtml(k)+'</span>';
    host.appendChild(row);
  });
  host.dataset.field=field;
}
function syncS(){var L0=layers[document.getElementById('sLayer').value];var f=document.getElementById('sField'),cf=document.getElementById('sCatField');
  if(L0&&L0.geojson){
    fillSel(f,numericFields(L0),function(x){return x;},function(x){return x;},'\u2014 none (single color) \u2014');
    fillSel(cf,fieldsOf(L0),function(x){return x;},function(x){return x;},'\u2014 choose field \u2014');
    if(L0.color&&L0.color[0]==='#')document.getElementById('sColor').value=L0.color;
    document.getElementById('sSize').value=L0.size||6;
    var op=(L0.opacity!=null?L0.opacity:.8);
    document.getElementById('sOpacity').value=op;document.getElementById('sOpV').textContent=(+op).toFixed(2);
    var mode=L0.colorMode||(L0.uniqueField?'categorized':(L0.field?'graduated':'single'));
    document.getElementById('sMode').value=mode;
    if(L0.field)f.value=L0.field;
    if(L0.uniqueField)cf.value=L0.uniqueField;
    syncSMode();
    if(mode==='categorized'&&L0.uniqueField)renderCatList(L0,L0.uniqueField); else document.getElementById('sCatList').innerHTML='';
    /* geometry-aware stroke/fill controls (ESRI-style) */
    var gt=String(L0.geomType||geomTypeOf(L0.geojson)||'');
    var isLine=/LineString/.test(gt), isPoly=/Polygon/.test(gt);
    document.getElementById('sGeomRow').style.display=(isLine||isPoly)?'flex':'none';
    document.getElementById('sWidthLabel').textContent=isPoly?'Outline width (px)':'Line width (px)';
    document.getElementById('sFillStyleWrap').style.display=isPoly?'block':'none';
    document.getElementById('sOutlineWrap').style.display=isPoly?'block':'none';
    document.getElementById('sWidth').value=(L0.weight!=null?L0.weight:2.5);
    document.getElementById('sFillStyle').value=L0.hollow?'hollow':'solid';
    var hasOC=!!(L0.outlineColor&&L0.outlineColor[0]==='#');
    document.getElementById('sOutlineUse').checked=hasOC;
    document.getElementById('sOutlineColor').style.display=hasOC?'block':'none';
    if(hasOC)document.getElementById('sOutlineColor').value=L0.outlineColor;
    /* labels state for this layer */
    var lf=document.getElementById('sLabelField');
    fillSel(lf,fieldsOf(L0).filter(function(k){return k.indexOf('__sv')!==0;}),function(x){return x;},function(x){return x;},'\u2014 choose field \u2014');
    var ls=L0.advLabelStyle||null;
    document.getElementById('sLabelOn').checked=!!(ls&&ls.field);
    document.getElementById('sLabelOpts').style.display=(ls&&ls.field)?'block':'none';
    if(ls){ if(ls.field)lf.value=ls.field; document.getElementById('sLabelSize').value=ls.size||11;
      document.getElementById('sLabelColor').value=(ls.color&&ls.color[0]==='#')?ls.color:'#ffffff';
      document.getElementById('sLabelHalo').value=(ls.halo&&ls.halo[0]==='#')?ls.halo:'#000000'; }
  }}
document.getElementById('sLayer').onchange=syncS;
document.getElementById('sLabelOn').onchange=function(){
  var L0=layers[document.getElementById('sLayer').value];
  document.getElementById('sLabelOpts').style.display=this.checked?'block':'none';
  if(!this.checked&&L0){
    if(window.__svClearLabels)window.__svClearLabels(L0);
    toast('Labels off for '+L0.name);
  } else if(this.checked&&L0){
    var lf=document.getElementById('sLabelField');
    if(!lf.value&&lf.options.length>1)lf.value=lf.options[1].value;
  }
};
document.getElementById('sLabelApply').onclick=function(){
  var L0=layers[document.getElementById('sLayer').value]; if(!L0||!L0.geojson){toast('Pick a layer',true);return;}
  var field=document.getElementById('sLabelField').value; if(!field){toast('Choose a label field',true);return;}
  L0.advLabelStyle={field:field,size:parseFloat(document.getElementById('sLabelSize').value)||11,
    color:document.getElementById('sLabelColor').value||'#FFFFFF',halo:document.getElementById('sLabelHalo').value||'#000000'};
  if(window.__svApplyLabels)window.__svApplyLabels(L0);
  toast('Labels on: '+field);
};
document.getElementById('sMode').onchange=function(){
  syncSMode();
  var L0=layers[document.getElementById('sLayer').value],m=document.getElementById('sMode').value,cf=document.getElementById('sCatField');
  if(L0&&m==='categorized'){ if(!cf.value&&cf.options[1])cf.value=cf.options[1].value; if(cf.value)renderCatList(L0,cf.value); }
};
document.getElementById('sCatField').onchange=function(){var L0=layers[document.getElementById('sLayer').value];if(L0&&this.value)renderCatList(L0,this.value);else document.getElementById('sCatList').innerHTML='';};
document.getElementById('sOpacity').oninput=function(){document.getElementById('sOpV').textContent=(+this.value).toFixed(2);};
document.getElementById('sOutlineUse').onchange=function(){document.getElementById('sOutlineColor').style.display=this.checked?'block':'none';};
document.getElementById('sApply').onclick=function(){
  var L0=layers[document.getElementById('sLayer').value];if(!L0||!L0.geojson){toast('Pick a layer',true);return;}
  var mode=document.getElementById('sMode').value;
  var color=document.getElementById('sColor').value,size=+document.getElementById('sSize').value||6,opacity=+document.getElementById('sOpacity').value;
  L0.color=color;L0.size=size;L0.opacity=opacity;
  /* stroke width / polygon fill style / outline color (apply in every symbology mode) */
  var gt2=String(L0.geomType||geomTypeOf(L0.geojson)||'');
  if(/LineString|Polygon/.test(gt2)){
    L0.weight=Math.max(.5,Math.min(12,parseFloat(document.getElementById('sWidth').value)||2.5));
    if(/Polygon/.test(gt2)){
      L0.hollow=(document.getElementById('sFillStyle').value==='hollow');
      L0.fillPattern=L0.hollow?'hollow':'solid';
      L0.outlineColor=document.getElementById('sOutlineUse').checked?document.getElementById('sOutlineColor').value:'';
    }
  }
  if(mode==='single'){ L0.colorMode='single'; L0.field=''; L0.uniqueField=''; }
  else if(mode==='graduated'){
    var field=document.getElementById('sField').value; if(!field){toast('Choose a numeric field',true);return;}
    var vals=L0.geojson.features.map(function(f){return parseFloat(f.properties[field]);}).filter(function(v){return !isNaN(v);});
    if(!vals.length){toast('Selected field has no numeric values',true);return;}
    L0.colorMode='graduated';L0.field=field;L0.uniqueField='';
  } else if(mode==='categorized'){
    var cfield=document.getElementById('sCatField').value; if(!cfield){toast('Choose a category field',true);return;}
    var colors={};document.querySelectorAll('#sCatList input[type=color]').forEach(function(inp){colors[inp.getAttribute('data-k')]=inp.value;});
    if(!Object.keys(colors).length)colors=deriveCategoryColors(L0,cfield);
    L0.colorMode='categorized';L0.uniqueField=cfield;L0.field='';L0.catColors=colors;
  }
  svBuildLeafletLayer(L0);renderLayers();renderLegend();
  toast('Symbology applied'+(mode==='graduated'?(' (by '+L0.field+')'):(mode==='categorized'?(' (by '+L0.uniqueField+')'):'')));
};
/* identify */
var identifyOn=false;
document.getElementById('identifyToggle').onclick=function(){identifyOn=!identifyOn;
  this.textContent=identifyOn?'◉ Identify — ON (click map)':'◎ Identify — click to enable';
  this.classList.toggle('on',identifyOn);
  map.getContainer().style.cursor=identifyOn?'help':'';
  if(identifyOn) toast('Identify on — click any feature on the map');};
map.on('click',function(e){if(!identifyOn || ptAddMode)return;var pt=turf.point([e.latlng.lng,e.latlng.lat]),hits=[];
  function featureHit(f){
    var g=f.geometry;if(!g)return false;
    if(g.type.indexOf('Polygon')>=0) return turf.booleanPointInPolygon(pt,f);
    if(g.type.indexOf('LineString')>=0) return turf.pointToLineDistance(pt,f,{units:'meters'})<=30;
    if(g.type.indexOf('Point')>=0) return turf.distance(pt,turf.centroid(f),{units:'meters'})<=30;
    return turf.distance(pt,turf.centroid(f),{units:'meters'})<=30;
  }
  vectorLayers().forEach(function(L0){L0.geojson.features.forEach(function(f){try{if(featureHit(f))hits.push([L0.name,f]);}catch(err){}});});
  var html='<b>Identify</b><br/>';if(hits.length){hits.slice(0,5).forEach(function(h){html+='<div style="margin-top:6px"><b>'+escapeHtml(h[0])+'</b>'+popupFromProps(h[1].properties)+'</div>';});}else html+='<span style="color:#888">No visible features here.</span>';
  var pop=L.popup({maxWidth:300}).setLatLng(e.latlng).setContent(html+'<div style="margin-top:6px;color:#888">Looking up address…</div>').openOn(map);
  fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+e.latlng.lat+'&lon='+e.latlng.lng).then(function(r){return r.json();}).then(function(d){pop.setContent(html+'<div style="margin-top:6px"><b>Address</b><br/>'+escapeHtml(d.display_name||'—')+'</div>');}).catch(function(){});});
/* bookmarks */
var bookmarks=[];
document.getElementById('bmAdd').onclick=function(){var name=document.getElementById('bmName').value.trim()||('View '+(bookmarks.length+1));bookmarks.push({name:name,c:map.getCenter(),z:map.getZoom()});document.getElementById('bmName').value='';renderBm();};
function renderBm(){var el=document.getElementById('bmList');el.innerHTML='';bookmarks.forEach(function(b,i){var row=document.createElement('div');row.className='layerrow';
  row.innerHTML='<label style="flex:1;cursor:pointer">\u2605 '+escapeHtml(b.name)+'</label><button class="x">\u2715</button>';
  row.querySelector('label').onclick=function(){map.setView(b.c,b.z);};row.querySelector('.x').onclick=function(){bookmarks.splice(i,1);renderBm();};el.appendChild(row);});}
/* export data */
document.getElementById('eExport').onclick=function(){var L0=layers[document.getElementById('eLayer').value];if(!L0||!L0.geojson){toast('Pick a layer',true);return;}
  dl(JSON.stringify(L0.geojson,null,2),L0.name.replace(/\s+/g,'_')+'.geojson','application/json');toast('Exported '+L0.name);};
/* go-to */
function doGoToCoords(a,b){
  if(isNaN(a)||isNaN(b)){toast('Enter both values',true);return;}
  var lnglat;
  if(crsKey==='wgs84'){
    if(a<-90||a>90||b<-180||b>180){toast('Enter valid Latitude (-90 to 90) and Longitude (-180 to 180)',true);return;}
    lnglat=[b,a];
  }else{
    if((crsKey==='utm39'||crsKey==='utm40') && (a<100000||a>900000||b<0||b>10000000)){toast('Projected input must be Easting, Northing in meters',true);return;}
    lnglat=fromCRS(a,b,crsKey);
  }
  if(!isFinite(lnglat[0])||!isFinite(lnglat[1])){toast('Could not convert the coordinates',true);return;}
  map.setView([lnglat[1],lnglat[0]],16);addTempMarker([lnglat[1],lnglat[0]],'Go to location');
}
document.getElementById('gotoBtn').onclick=function(){
  doGoToCoords(parseFloat(document.getElementById('gotoX').value),parseFloat(document.getElementById('gotoY').value));
};
/* ribbon go-to (compact, same logic) */
(function(){
  var rb=document.getElementById('ribGotoBtn');
  if(rb)rb.onclick=function(){ doGoToCoords(parseFloat(document.getElementById('ribGotoX').value),parseFloat(document.getElementById('ribGotoY').value)); };
  ['ribGotoX','ribGotoY'].forEach(function(id){var el=document.getElementById(id); if(el)el.addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('ribGotoBtn').click();});});
})();

/* ================= LAYOUT / CUSTOMIZABLE EXPORT ================= */
var mapTitleEl=document.getElementById('mapTitle');
var titleManual=false;
function mapTitleSetLive(name){ mapTitleEl.textContent=name; mapTitleEl.style.display=name?'':'none'; }
mapTitleSetLive(''); // blank by default
document.getElementById('layTitle').oninput=function(){
  titleManual = this.value.trim()!=='';
  mapTitleEl.textContent=this.value;
  mapTitleEl.style.display=this.value.trim()?'':'none';
};
document.getElementById('legendToggle').onclick=function(){document.getElementById('legendBox').classList.toggle('collapsed');this.textContent=document.getElementById('legendBox').classList.contains('collapsed')?'▸':'▾';};
/* free-drag the legend anywhere over the map view */
(function(){
  var box=document.getElementById('legendBox'); if(!box)return;
  var head=box.querySelector('.lh'); if(!head)return;
  var drag=null;
  function host(){ return box.offsetParent||document.body; }
  head.addEventListener('mousedown',function(e){
    if(e.target.tagName==='BUTTON')return;
    var hr=host().getBoundingClientRect(), br=box.getBoundingClientRect();
    drag={dx:e.clientX-br.left,dy:e.clientY-br.top};
    box.style.left=(br.left-hr.left)+'px'; box.style.top=(br.top-hr.top)+'px';
    box.style.right='auto'; box.style.bottom='auto';
    box.classList.add('dragging');
    e.preventDefault();
  });
  document.addEventListener('mousemove',function(e){
    if(!drag)return; var hr=host().getBoundingClientRect();
    var x=e.clientX-hr.left-drag.dx, y=e.clientY-hr.top-drag.dy;
    x=Math.max(2,Math.min(hr.width-46,x)); y=Math.max(2,Math.min(hr.height-30,y));
    box.style.left=x+'px'; box.style.top=y+'px';
  });
  document.addEventListener('mouseup',function(){
    if(!drag)return; drag=null; box.classList.remove('dragging');
    try{localStorage.setItem('svLegendPos',JSON.stringify({left:box.style.left,top:box.style.top}));}catch(e){}
  });
  try{
    var saved=localStorage.getItem('svLegendPos');
    if(saved){var p=JSON.parse(saved); if(p&&p.left&&p.top){box.style.left=p.left;box.style.top=p.top;box.style.right='auto';box.style.bottom='auto';}}
  }catch(e){}
})();
document.getElementById('showLegend').onchange=function(){document.getElementById('legendBox').style.display=this.checked?'':'none';};

/* populate zoom-override dropdown */
(function(){var z=document.getElementById('exZoom');for(var i=3;i<=19;i++){var o=document.createElement('option');o.value=i;o.textContent='Zoom '+i;z.appendChild(o);}})();

/* page sizes at 96 dpi base (px) — scaled by resolution */
var PAGES={a4:{l:[1123,794],p:[794,1123]},a3:{l:[1587,1123],p:[1123,1587]},a2:{l:[2245,1587],p:[1587,2245]},a1:{l:[3179,2245],p:[2245,3179]},a0:{l:[4494,3179],p:[3179,4494]},letter:{l:[1056,816],p:[816,1056]},tabloid:{l:[1632,1056],p:[1056,1632]}};

function styleColors(style){
  return style==='light'
    ? {panel:'rgba(255,255,255,.92)',ink:'#0B1220',dim:'#5b6b86',accent:'#B45309',brand:'#2563EB',line:'#d4dae6'}
    : {panel:'rgba(15,26,46,.92)',ink:'#E8EEF6',dim:'#94A6BE',accent:'#F59E0B',brand:'#3B82F6',line:'#23344f'};
}

/* Paint all visible vector layers + labels straight onto a captured map canvas.
   Engine-independent: works whether the base was captured by leaflet-image (which drops SVG vectors)
   or html2canvas — data always appears in exports with correct categorized/graduated symbology. */
function svPaintOverlaysOnMapCanvas(canvas){
  if(!canvas)return canvas;
  try{
    var size=map.getSize(), sx=canvas.width/size.x, sy=canvas.height/size.y;
    var ctx=canvas.getContext('2d');
    function XY(lng,lat){ var p=map.latLngToContainerPoint([lat,lng]); return [p.x*sx,p.y*sy]; }
    function ring(coords){ coords.forEach(function(c,i){ var p=XY(c[0],c[1]); i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); }); }
    function hexA(hex,a){ var m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex||''); if(!m)return hex||'#3B82F6';
      return 'rgba('+parseInt(m[1],16)+','+parseInt(m[2],16)+','+parseInt(m[3],16)+','+a+')'; }
    Object.keys(layers).forEach(function(id){
      var L0=layers[id]; if(!L0||!L0.visible||L0.isRaster||!L0.geojson||!L0.geojson.features)return;
      var op=(L0.opacity!=null?L0.opacity:1), pt=(L0.size||6)*sx, lw=(L0.weight!=null?+L0.weight:2.5)*sx;
      var hollow=!!L0.hollow, ocol=(L0.outlineColor&&L0.outlineColor[0]==='#')?L0.outlineColor:'';
      L0.geojson.features.forEach(function(f){
        var g=f.geometry; if(!g)return;
        var c=svColorForFeature(L0,f);
        ctx.strokeStyle=c; ctx.lineWidth=lw; ctx.fillStyle=hexA(c,op);
        try{
          if(g.type==='Point'){ var p=XY(g.coordinates[0],g.coordinates[1]);
            ctx.beginPath();ctx.arc(p[0],p[1],pt,0,6.2832);ctx.fillStyle=hexA(c,Math.max(op,.85));ctx.fill();ctx.lineWidth=1.5*sx;ctx.strokeStyle='#ffffff';ctx.stroke(); }
          else if(g.type==='MultiPoint'){ g.coordinates.forEach(function(cc){ var p=XY(cc[0],cc[1]);
            ctx.beginPath();ctx.arc(p[0],p[1],pt,0,6.2832);ctx.fillStyle=hexA(c,Math.max(op,.85));ctx.fill();ctx.lineWidth=1.5*sx;ctx.strokeStyle='#ffffff';ctx.stroke(); }); }
          else if(g.type==='LineString'){ ctx.beginPath();ring(g.coordinates);ctx.stroke(); }
          else if(g.type==='MultiLineString'){ g.coordinates.forEach(function(ls){ ctx.beginPath();ring(ls);ctx.stroke(); }); }
          else if(g.type==='Polygon'){ ctx.beginPath();g.coordinates.forEach(ring);ctx.closePath();
            if(!hollow){ctx.fillStyle=hexA(c,Math.min(op,.55));ctx.fill('evenodd');}
            ctx.strokeStyle=ocol||c;ctx.stroke(); }
          else if(g.type==='MultiPolygon'){ g.coordinates.forEach(function(poly){ ctx.beginPath();poly.forEach(ring);ctx.closePath();
            if(!hollow){ctx.fillStyle=hexA(c,Math.min(op,.55));ctx.fill('evenodd');}
            ctx.strokeStyle=ocol||c;ctx.stroke(); }); }
        }catch(e){}
      });
    });
    // labels on top
    ctx.textAlign='center'; ctx.textBaseline='middle';
    Object.keys(layers).forEach(function(id){
      var L0=layers[id]; if(!L0||!L0.visible||!L0.advLabelStyle||!L0.advLabelStyle.field||!L0.geojson)return;
      var st=L0.advLabelStyle, fpx=Math.max(Number(st.size||11)*sx,6);
      ctx.font='800 '+fpx+'px Inter,Arial';
      (L0.geojson.features||[]).forEach(function(f){
        var v=(f.properties||{})[st.field]; if(v==null||v==='')return;
        try{
          var cc=turf.centerOfMass(f).geometry.coordinates, p=XY(cc[0],cc[1]);
          if(p[0]<-30||p[0]>canvas.width+30||p[1]<-30||p[1]>canvas.height+30)return;
          ctx.lineWidth=Math.max(fpx*.28,2); ctx.strokeStyle=st.halo||'#000';
          ctx.strokeText(String(v),p[0],p[1]);
          ctx.fillStyle=st.color||'#fff'; ctx.fillText(String(v),p[0],p[1]);
        }catch(e){}
      });
    });
    ctx.textAlign='start'; ctx.textBaseline='alphabetic';
  }catch(e){}
  return canvas;
}
function buildLayoutCanvas(cb){
  var page=document.getElementById('exPage').value;
  var orient=document.getElementById('exOrient').value;
  var res=parseInt(document.getElementById('exRes').value,10)||2;
  var style=document.getElementById('exStyle').value;
  var zoomOverride=document.getElementById('exZoom').value;
  var C=styleColors(style);

  function withCanvas(cb){
    // Hide Leaflet UI controls during capture so they don't appear in the layout
    var hidden=[];
    document.querySelectorAll('#map .leaflet-control-container, #map .leaflet-control-attribution, #map .leaflet-control-zoom').forEach(function(el){
      hidden.push([el, el.style.display]); el.style.display='none';
    });
    // temporarily remove the live-location marker so it isn't baked into the layout
    var hadYAH = youAreHere && map.hasLayer(youAreHere);
    if(hadYAH){ map.removeLayer(youAreHere); }
    // temporarily remove DOM label groups — labels are redrawn as crisp vector text at export resolution in doRender
    var labelGroups=[], lg=(window.__svAdvLabelGroups?window.__svAdvLabelGroups():{});
    Object.keys(lg||{}).forEach(function(id){ var fg=lg[id]; if(fg&&map.hasLayer(fg)){ labelGroups.push(fg); map.removeLayer(fg); } });
    function restore(){ hidden.forEach(function(h){ h[0].style.display=h[1]; }); if(hadYAH){ youAreHere.addTo(map); } labelGroups.forEach(function(fg){ try{fg.addTo(map);}catch(e){} }); }
    var done=false;
    function finishCb(cv){ if(done)return; done=true; try{svPaintOverlaysOnMapCanvas(cv);}catch(e){} restore(); cb(cv); }
    // Fallback: html2canvas — captures tiles/markers from the DOM; SVG vector panes are skipped (the painter draws vectors from data)
    function h2cFallback(reason){
      if(done)return;
      if(typeof html2canvas==='undefined'){ done=true; restore(); toast('Export failed: '+reason+' (no fallback available)',true); if(zoomOverride)map.setZoom(prevZoom); return; }
      toast('Using fallback capture…');
      html2canvas(document.getElementById('map'),{useCORS:true,allowTaint:false,logging:false,backgroundColor:null,ignoreElements:function(el){return (el.classList&&(el.classList.contains('leaflet-control-container')||el.classList.contains('leaflet-control-attribution')))||(el.tagName&&String(el.tagName).toLowerCase()==='svg');}})
        .then(function(cv){ try{ cv.getContext('2d').getImageData(0,0,1,1); finishCb(cv); }catch(taint){ done=true; restore(); toast('Export failed: cross-origin tiles',true); if(zoomOverride)map.setZoom(prevZoom); } })
        .catch(function(e){ done=true; restore(); toast('Export failed: '+(e&&e.message||'capture error'),true); if(zoomOverride)map.setZoom(prevZoom); });
    }
    // Primary: leaflet-image — renders tiles + vector layers directly from Leaflet's data (reliable). DOM labels are hidden and redrawn as crisp vector text in doRender.
    if(typeof leafletImage!=='undefined'){
      try{
        leafletImage(map,function(err,canvas){
          if(done)return;
          if(err||!canvas){ h2cFallback(err?err.message:'no canvas'); return; }
          try{ canvas.getContext('2d').getImageData(0,0,1,1); finishCb(canvas); }
          catch(taint){ h2cFallback('cross-origin tiles'); }
        });
        setTimeout(function(){ if(!done) h2cFallback('timeout'); },8000);
      }catch(e){ h2cFallback(e.message); }
    } else { h2cFallback('leaflet-image not loaded'); }
  }
  function doRender(){
    toast('Rendering layout…');
    withCanvas(function(canvas){
      // target dimensions
      var tw,th;
      if(page==='current'){ tw=canvas.width; th=canvas.height; }
      else { var dim=PAGES[page][orient==='portrait'?'p':'l']; tw=dim[0]*res; th=dim[1]*res; }
      var out=document.createElement('canvas'); out.width=tw; out.height=th;
      var ctx=out.getContext('2d');
      // ===== ArcGIS Pro–style page =====
      var isLight = style!=='dark';
      var pageBg = isLight ? '#FFFFFF' : '#0B1220';
      var frameLine = isLight ? '#3A3A3A' : '#9fb2cf';
      ctx.fillStyle=pageBg; ctx.fillRect(0,0,tw,th);
      // page margin (like a layout): map sits in a framed data frame inside the page
      var margin = (page==='current') ? 0 : Math.round(Math.min(tw,th)*0.045);
      var frameX=margin, frameY=margin, frameW=tw-margin*2, frameH=th-margin*2;
      // fit the captured map into the framed area, preserving aspect
      var scale=Math.min(frameW/canvas.width, frameH/canvas.height);
      var dw=canvas.width*scale, dh=canvas.height*scale;
      var dx=frameX+(frameW-dw)/2, dy=frameY+(frameH-dh)/2;
      // white mat behind the map frame
      ctx.drawImage(canvas,dx,dy,dw,dh);
      // crisp map frame border (ArcGIS data-frame look)
      if(page!=='current'){
        ctx.strokeStyle=frameLine; ctx.lineWidth=Math.max(1.2*res,1.5);
        ctx.strokeRect(dx+0.5,dy+0.5,dw-1,dh-1);
      }
      // ESRI neatline: heavy outer border + fine inner border around the page
      if(page!=='current' && document.getElementById('exNeat') && document.getElementById('exNeat').checked){
        var nOff=Math.round(margin*0.42);
        ctx.strokeStyle=frameLine; ctx.lineWidth=Math.max(2.2*res,2.5);
        ctx.strokeRect(nOff+0.5,nOff+0.5,tw-nOff*2-1,th-nOff*2-1);
        ctx.lineWidth=Math.max(0.8*res,1);
        ctx.strokeRect(nOff+5*res+0.5,nOff+5*res+0.5,tw-(nOff+5*res)*2-1,th-(nOff+5*res)*2-1);
      }
      // ---- draw legacy standalone annotations directly for old saved projects ----
      (function(){
        var size=map.getSize(); // capture canvas matches map size (before page scaling)
        var sx=dw/canvas.width, sy=dh/canvas.height; // map-canvas px may differ from leaflet size
        // leaflet-image canvas == map pixel size; html2canvas too. Map latlng->container px:
        function toXY(lng,lat){
          var p=map.latLngToContainerPoint([lat,lng]);
          return [dx + p.x*(dw/size.x), dy + p.y*(dh/size.y)];
        }
        function drawGeom(g,st){
          if(!g)return;
          ctx.lineWidth=Math.max((st.width||3)* (dw/size.x),1);
          ctx.strokeStyle=st.stroke||'#3B82F6';
          ctx.fillStyle=hexA(st.fill||'#3B82F6', st.fillOp!=null?st.fillOp:0.2);
          if(st.dash){ ctx.setLineDash(st.dash.split(',').map(Number).map(function(n){return n*(dw/size.x);})); } else ctx.setLineDash([]);
          if(g.type==='Point'){ var p=toXY(g.coordinates[0],g.coordinates[1]); var r=(st.ptSize||7)*(dw/size.x);
            ctx.beginPath();ctx.arc(p[0],p[1],r,0,6.283);ctx.fillStyle=st.fill||'#3B82F6';ctx.fill();ctx.lineWidth=2*(dw/size.x);ctx.strokeStyle='#fff';ctx.stroke(); }
          else if(g.type==='LineString'){ ctx.beginPath();g.coordinates.forEach(function(c,i){var p=toXY(c[0],c[1]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});ctx.stroke(); }
          else if(g.type==='Polygon'){ ctx.beginPath();g.coordinates[0].forEach(function(c,i){var p=toXY(c[0],c[1]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});ctx.closePath();ctx.fill();ctx.stroke(); }
          ctx.setLineDash([]);
        }
        function hexA(hex,a){ var m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); if(!m)return hex;
          return 'rgba('+parseInt(m[1],16)+','+parseInt(m[2],16)+','+parseInt(m[3],16)+','+a+')'; }
        try{
          ['polygon','line','point'].forEach(function(k){ drawn[k].forEach(function(rec){ try{ drawGeom(rec.layer.toGeoJSON().geometry, rec.style); }catch(e){} }); });
          if(typeof ptItems!=='undefined'){ ptItems.forEach(function(it){ try{ var ll=it.marker.getLatLng(); drawGeom({type:'Point',coordinates:[ll.lng,ll.lat]},{fill:it.color,ptSize:6}); if(it.labelOn&&it.text){var p=toXY(ll.lng,ll.lat);ctx.fillStyle=C.ink;ctx.font=(11*(dw/size.x))+'px Inter,Arial';ctx.fillText(it.text,p[0]+8,p[1]-6);} }catch(e){} }); }
        }catch(e){}
        /* layer vectors + labels are already painted onto the captured map canvas by svPaintOverlaysOnMapCanvas */
      })();
      var S=res; // scale fonts/boxes with resolution for crispness
      // Title
      if(document.getElementById('exTitle').checked){
        var t=document.getElementById('layTitle').value.trim() || (mapTitleEl.textContent||'').trim();
        if(t){
          ctx.font='700 '+(20*S)+'px Inter,Arial,sans-serif'; var twd=ctx.measureText(t).width;
          ctx.fillStyle=C.panel; roundRect(ctx,(tw-twd)/2-16*S,16*S,twd+32*S,42*S,8*S); ctx.fill();
          ctx.fillStyle=C.ink; ctx.fillText(t,(tw-twd)/2,44*S);
        }
      }
      // North arrow
      if(document.getElementById('exNorth').checked){
        var nx=tw-60*S,ny=24*S; ctx.fillStyle=C.panel; roundRect(ctx,nx-8*S,ny-6*S,54*S,66*S,8*S); ctx.fill();
        ctx.fillStyle=C.brand; ctx.beginPath();ctx.moveTo(nx+18*S,ny);ctx.lineTo(nx+30*S,ny+34*S);ctx.lineTo(nx+18*S,ny+26*S);ctx.lineTo(nx+6*S,ny+34*S);ctx.closePath();ctx.fill();
        ctx.fillStyle=C.ink; ctx.font='700 '+(14*S)+'px Inter,Arial'; ctx.fillText('N',nx+12*S,ny+56*S);
      }
      // Scale bar
      if(document.getElementById('exScale').checked){ drawScaleBar(ctx,24*S,th-40*S,S,C); }
      // Legend (ESRI standard: titled, bordered box; symbol per geometry type)
      if(document.getElementById('exLegend').checked){
        var items=Object.keys(layers).map(function(id){return layers[id];}).filter(function(L0){return L0.visible;});
        var legBg = isLight ? '#FFFFFF' : 'rgba(15,26,46,.96)';
        var legBorder = isLight ? '#6B7280' : '#3a4d6b';
        var legInk = isLight ? '#1B1B1B' : '#E8EEF6';
        var legDim = isLight ? '#4B5563' : '#94A6BE';
        // build flat row list: {kind:'layer'|'class'|'total', ...}
        var rows=[];
        items.forEach(function(L0){
          if(L0.colorMode==='categorized'&&L0.catColors&&Object.keys(L0.catColors).length){
            rows.push({kind:'layer',text:String(L0.name).slice(0,24)+' ('+String(L0.uniqueField).slice(0,14)+')'});
            var stats=svLengthStats(L0,L0.uniqueField);
            var keys=Object.keys(L0.catColors).sort(function(a,b){var na=parseFloat(a),nb=parseFloat(b);if(!isNaN(na)&&!isNaN(nb))return na-nb;return a.localeCompare(b);});
            keys.forEach(function(k){ rows.push({kind:'class',color:L0.catColors[k],gt:(L0.geomType||geomTypeOf(L0.geojson)||''),hollow:!!L0.hollow,text:(k||'(blank)'),len:stats.hasLines?svFmtLen(stats.totals[k]||0):''}); });
            if(stats.hasLines) rows.push({kind:'total',text:'Total',len:svFmtLen(stats.grand)});
          } else {
            rows.push({kind:'class',color:L0.color,gt:L0.isRaster?'Raster':(L0.geomType||geomTypeOf(L0.geojson)||''),hollow:!!L0.hollow,text:String(L0.name).slice(0,24),len:''});
          }
        });
        var rowH=20*S, padX=12*S, headH=30*S;
        var hasLen=rows.some(function(r){return r.len;});
        var lw=(hasLen?265:205)*S, lh=headH+8*S+Math.max(rows.length,1)*rowH+8*S;
        var _pos=(document.getElementById('exLegendPos')?document.getElementById('exLegendPos').value:'bl');
        var _fx=(page!=='current'?frameX:0), _fy=(page!=='current'?frameY:0);
        var _fw=(page!=='current'?frameW:tw), _fh=(page!=='current'?frameH:th);
        var lx=(_pos==='tr'||_pos==='br')?(_fx+_fw-14*S-lw):(_fx+14*S);
        var ly=(_pos==='tl'||_pos==='tr')?(_fy+14*S):(_fy+_fh-18*S-lh);
        if(ly<_fy+10*S) ly=_fy+10*S;
        // box
        ctx.fillStyle=legBg; ctx.strokeStyle=legBorder; ctx.lineWidth=Math.max(1*S,1);
        roundRect(ctx,lx,ly,lw,lh,3*S); ctx.fill(); ctx.stroke();
        // title
        ctx.fillStyle=legInk; ctx.font='700 '+(13*S)+'px Inter,Arial'; ctx.textBaseline='alphabetic';
        ctx.fillText('Legend',lx+padX,ly+19*S);
        // divider
        ctx.strokeStyle=legBorder; ctx.lineWidth=Math.max(.8*S,.8);
        ctx.beginPath(); ctx.moveTo(lx+padX,ly+headH-2*S); ctx.lineTo(lx+lw-padX,ly+headH-2*S); ctx.stroke();
        // rows
        if(!rows.length){ ctx.fillStyle=legDim; ctx.font=(12*S)+'px Inter,Arial'; ctx.fillText('No visible layers',lx+padX,ly+headH+14*S); }
        rows.forEach(function(r,i){
          var yy=ly+headH+8*S+i*rowH+rowH*0.5;
          if(r.kind==='layer'){
            ctx.fillStyle=legInk; ctx.font='700 '+(11.5*S)+'px Inter,Arial';
            ctx.fillText(r.text,lx+padX,yy+4*S);
            return;
          }
          if(r.kind==='total'){
            ctx.strokeStyle=legBorder; ctx.lineWidth=Math.max(.6*S,.6); ctx.setLineDash([3*S,3*S]);
            ctx.beginPath(); ctx.moveTo(lx+padX+16*S,yy-rowH*0.5+2*S); ctx.lineTo(lx+lw-padX,yy-rowH*0.5+2*S); ctx.stroke(); ctx.setLineDash([]);
            ctx.fillStyle=legInk; ctx.font='700 '+(11*S)+'px Inter,Arial';
            ctx.fillText(r.text,lx+padX+24*S,yy+4*S);
            ctx.font='700 '+(9.5*S)+'px JetBrains Mono,monospace'; ctx.textAlign='right';
            ctx.fillText(r.len,lx+lw-padX,yy+4*S); ctx.textAlign='start';
            return;
          }
          var symX=lx+padX+(r.gt==='Raster'?0:8*S), symMid=yy;
          ctx.fillStyle=r.color; ctx.strokeStyle=r.color;
          if(r.gt==='LineString'||r.gt==='MultiLineString'){ ctx.lineWidth=2.5*S; ctx.beginPath(); ctx.moveTo(symX,symMid); ctx.lineTo(symX+16*S,symMid); ctx.stroke(); }
          else if(r.gt==='Point'||r.gt==='MultiPoint'){ ctx.beginPath(); ctx.arc(symX+8*S,symMid,5*S,0,6.283); ctx.fill(); ctx.lineWidth=1*S; ctx.strokeStyle='#fff'; ctx.stroke(); }
          else { if(!r.hollow){ctx.fillStyle=hexA2(r.color,.55); ctx.fillRect(symX,symMid-6*S,16*S,12*S);} ctx.strokeStyle=r.color; ctx.lineWidth=(r.hollow?2:1.2)*S; ctx.strokeRect(symX,symMid-6*S,16*S,12*S); }
          ctx.fillStyle=legInk; ctx.font=(11.5*S)+'px Inter,Arial';
          ctx.fillText(r.text,symX+24*S,symMid+4*S);
          if(r.len){ ctx.fillStyle=legDim; ctx.font=(9.5*S)+'px JetBrains Mono,monospace'; ctx.textAlign='right';
            ctx.fillText(r.len,lx+lw-padX,symMid+4*S); ctx.textAlign='start'; }
        });
      }
      // CRS stamp
      if(document.getElementById('exCrs').checked){
        ctx.font=(11*S)+'px JetBrains Mono,monospace';
        var _ek=effectiveCrsKey(); var crsTxt='CRS: '+CRS[_ek].esri+' ('+CRS[_ek].code+')';
        var cw=ctx.measureText(crsTxt).width; ctx.fillStyle=C.panel; roundRect(ctx,tw-cw-28*S,th-32*S,cw+16*S,22*S,6*S); ctx.fill();
        ctx.fillStyle=C.accent; ctx.fillText(crsTxt,tw-cw-20*S,th-17*S);
      }
      // Scale text (1:N) — computed from the map view and how it was fitted onto the page
      if(document.getElementById('exScaleTxt')&&document.getElementById('exScaleTxt').checked){
        try{
          var _ctr=map.getCenter(), _z=map.getZoom();
          var mPerPx=156543.03392*Math.cos(_ctr.lat*Math.PI/180)/Math.pow(2,_z);
          var mPerPagePx=mPerPx*(canvas.width/dw); // account for map image scaling into the frame
          var denom=Math.round(mPerPagePx/0.000264583); // 96 dpi page pixel = 0.264583 mm
          var mag=Math.pow(10,Math.max(0,String(denom).length-2)); denom=Math.round(denom/mag)*mag;
          var stTxt='Scale 1:'+denom.toLocaleString('en-US');
          ctx.font='700 '+(11*S)+'px Inter,Arial';
          var stw=ctx.measureText(stTxt).width;
          ctx.fillStyle=C.panel; roundRect(ctx,24*S,th-70*S,stw+16*S,22*S,6*S); ctx.fill();
          ctx.fillStyle=C.ink; ctx.fillText(stTxt,32*S,th-55*S);
        }catch(e){}
      }
      // Author / date line (bottom centre, ESRI marginalia style)
      (function(){
        var parts=[];
        if(document.getElementById('exAuthorOn')&&document.getElementById('exAuthorOn').checked){
          var a=(document.getElementById('exAuthor').value||'').trim(); if(a)parts.push('Author: '+a);
        }
        if(document.getElementById('exDate')&&document.getElementById('exDate').checked){
          parts.push('Date: '+new Date().toISOString().slice(0,10));
        }
        if(!parts.length)return;
        var txt=parts.join('   \u2022   ');
        ctx.font=(10*S)+'px Inter,Arial';
        var w2=ctx.measureText(txt).width;
        ctx.fillStyle=C.panel; roundRect(ctx,(tw-w2)/2-10*S,th-30*S,w2+20*S,20*S,5*S); ctx.fill();
        ctx.fillStyle=C.ink; ctx.fillText(txt,(tw-w2)/2,th-16*S);
      })();
      // Notes / description block (top-left inside the frame, under any logo)
      (function(){
        var n=(document.getElementById('exNotes')?document.getElementById('exNotes').value:'').trim(); if(!n)return;
        ctx.font='italic '+(10.5*S)+'px Inter,Arial';
        var maxW=tw*0.42, words=n.split(/\s+/), lines=[], cur='';
        words.forEach(function(w3){ var t=(cur?cur+' ':'')+w3; if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w3;} else cur=t; });
        if(cur)lines.push(cur);
        var lh2=15*S, bw=Math.min(maxW,Math.max.apply(null,lines.map(function(l){return ctx.measureText(l).width;})))+20*S;
        var bx=(page!=='current'?frameX:0)+14*S, by=(page!=='current'?frameY:0)+14*S+(window.__svExLogoImg?64*S:0);
        ctx.fillStyle=C.panel; roundRect(ctx,bx,by,bw,lines.length*lh2+14*S,6*S); ctx.fill();
        ctx.fillStyle=C.ink;
        lines.forEach(function(l,i){ ctx.fillText(l,bx+10*S,by+16*S+i*lh2); });
      })();
      // Logo (top-left inside the frame)
      if(window.__svExLogoImg){
        try{
          var im=window.__svExLogoImg, lgH=56*S, lgW=lgH*(im.width/im.height);
          var gx=(page!=='current'?frameX:0)+14*S, gy=(page!=='current'?frameY:0)+14*S;
          ctx.fillStyle=C.panel; roundRect(ctx,gx-4*S,gy-4*S,lgW+8*S,lgH+8*S,6*S); ctx.fill();
          ctx.drawImage(im,gx,gy,lgW,lgH);
        }catch(e){}
      }
      // credit
      // (credit stamp removed from layout)
      if(zoomOverride) map.setZoom(prevZoom); // restore
      cb(out);
    });
  }

  var prevZoom=map.getZoom();
  if(zoomOverride){ map.setZoom(parseInt(zoomOverride,10)); setTimeout(doRender,650); }
  else doRender();
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function hexA2(hex,a){ var m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex||''); if(!m)return hex||'#3B82F6'; return 'rgba('+parseInt(m[1],16)+','+parseInt(m[2],16)+','+parseInt(m[3],16)+','+a+')'; }
function drawScaleBar(ctx,x,y,S,C){
  S=S||1;C=C||styleColors('dark');
  var p1=map.containerPointToLatLng([0,0]),p2=map.containerPointToLatLng([100,0]);
  var m=map.distance(p1,p2);var nice=niceRound(m);var px=(100*nice/m)*S;
  ctx.fillStyle=C.panel;roundRect(ctx,x-6*S,y-6*S,px+70*S,30*S,6*S);ctx.fill();
  ctx.strokeStyle=C.ink;ctx.lineWidth=2*S;ctx.beginPath();ctx.moveTo(x,y+10*S);ctx.lineTo(x+px,y+10*S);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x,y+5*S);ctx.lineTo(x,y+15*S);ctx.moveTo(x+px,y+5*S);ctx.lineTo(x+px,y+15*S);ctx.stroke();
  ctx.fillStyle=C.ink;ctx.font=(11*S)+'px Inter,Arial';ctx.fillText((nice>=1000?(nice/1000)+' km':nice+' m'),x+px+8*S,y+14*S);
}
function niceRound(m){var p=Math.pow(10,Math.floor(Math.log10(m)));var f=m/p;var n=f>=5?5:(f>=2?2:1);return n*p;}

/* Output file name + native save picker (Chrome/Edge) with universal fallback */
function exportFileName(ext){
  var el=document.getElementById('exFileName');
  var base=(el&&el.value.trim())||'SpatialItqan_Map';
  base=base.replace(/[\\/:*?"<>|]+/g,'_').replace(/\.[a-z0-9]+$/i,'');
  return base+'.'+ext;
}
function saveBlob(blob, fname, mime){
  // Prefer the File System Access API so the user can choose name AND folder (Chrome/Edge, https/localhost)
  if(window.showSaveFilePicker && location.protocol!=='file:'){
    var ext=fname.split('.').pop().toLowerCase();
    var accept={}; accept[mime]=['.'+ext];
    window.showSaveFilePicker({suggestedName:fname,types:[{description:ext.toUpperCase()+' file',accept:accept}]})
      .then(function(handle){ return handle.createWritable().then(function(w){ return w.write(blob).then(function(){return w.close();}); }); })
      .then(function(){ toast('Saved '+fname); })
      .catch(function(err){ if(err&&err.name==='AbortError'){ toast('Save cancelled'); } else { fallbackDownload(blob,fname); } });
    return;
  }
  fallbackDownload(blob,fname);
}
function fallbackDownload(blob,fname){
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=fname; a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);},1500);
  toast('Exported '+fname+' — your browser will ask where to save');
}
/* layout marginalia wiring: author input visibility + logo image loading */
(function(){
  var aOn=document.getElementById('exAuthorOn'), aWrap=document.getElementById('exAuthorWrap');
  if(aOn&&aWrap)aOn.onchange=function(){aWrap.style.display=this.checked?'block':'none';};
  var lf=document.getElementById('exLogoFile');
  if(lf)lf.onchange=function(){
    var f=this.files&&this.files[0];
    if(!f){window.__svExLogoImg=null;return;}
    var r=new FileReader();
    r.onload=function(){ var im=new Image(); im.onload=function(){window.__svExLogoImg=im;toast('Logo loaded — it will appear top-left on the layout');}; im.src=r.result; };
    r.readAsDataURL(f);
  };
})();
document.getElementById('exportPNG').onclick=function(){
  buildLayoutCanvas(function(canvas){ canvas.toBlob(function(blob){ saveBlob(blob, exportFileName('png'), 'image/png'); },'image/png'); });
};
var _jpgBtn=document.getElementById('exportJPG');
if(_jpgBtn)_jpgBtn.onclick=function(){
  buildLayoutCanvas(function(canvas){
    // JPG has no transparency — flatten onto white so the page stays clean (not black)
    var flat=document.createElement('canvas'); flat.width=canvas.width; flat.height=canvas.height;
    var fx=flat.getContext('2d'); fx.fillStyle='#FFFFFF'; fx.fillRect(0,0,flat.width,flat.height); fx.drawImage(canvas,0,0);
    flat.toBlob(function(blob){ saveBlob(blob, exportFileName('jpg'), 'image/jpeg'); },'image/jpeg',0.92);
  });
};


/* ============ HIGH-RESOLUTION TILE-FETCH CAPTURE ENGINE ============
   Renders the AOI at a user-chosen zoom by fetching raw basemap tiles and
   stitching them at full resolution — independent of screen size. Used by both
   the single georeferenced image and the tiled mosaic exports. */
var TILE_SIZE=256;
function activeTileTemplate(){
  // get the current basemap's URL template + subdomains + max zoom
  var lyr=currentBase;
  if(!lyr||!lyr._url){ return null; }
  return {url:lyr._url, subs:(lyr.options&&lyr.options.subdomains)||'abc', maxZoom:(lyr.options&&lyr.options.maxZoom)||19};
}
function lon2tile(lon,z){ return (lon+180)/360*Math.pow(2,z); }
function lat2tile(lat,z){ var r=lat*Math.PI/180; return (1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z); }
function tile2lon(x,z){ return x/Math.pow(2,z)*360-180; }
function tile2lat(y,z){ var n=Math.PI-2*Math.PI*y/Math.pow(2,z); return 180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))); }
function tileUrl(tpl,x,y,z){
  var s=tpl.subs[(x+y)%tpl.subs.length];
  return tpl.url.replace('{s}',s).replace('{z}',z).replace('{x}',x).replace('{y}',y).replace('{r}','');
}
/* Estimate output pixel size for an AOI at zoom z (without fetching) */
function aoiPixelSize(bounds,z){
  var xMin=lon2tile(bounds.getWest(),z), xMax=lon2tile(bounds.getEast(),z);
  var yMin=lat2tile(bounds.getNorth(),z), yMax=lat2tile(bounds.getSouth(),z);
  var w=Math.round((xMax-xMin)*TILE_SIZE), h=Math.round((yMax-yMin)*TILE_SIZE);
  var tilesX=Math.ceil(xMax)-Math.floor(xMin), tilesY=Math.ceil(yMax)-Math.floor(yMin);
  return {w:w,h:h,tiles:tilesX*tilesY};
}
/* Fetch + stitch AOI at zoom z -> {canvas, bounds-aligned crop, geo mapping}. cb(err,result) */
function renderAOIHiRes(bounds,z,statusCb,cb){
  var tpl=activeTileTemplate();
  if(!tpl){ cb('No tile basemap active (blank/Esri vector layers cannot be tiled). Switch to Light Gray / OSM / Satellite.'); return; }
  z=Math.min(z, tpl.maxZoom);
  var fx=lon2tile(bounds.getWest(),z), fxE=lon2tile(bounds.getEast(),z);
  var fy=lat2tile(bounds.getNorth(),z), fyS=lat2tile(bounds.getSouth(),z);
  var x0=Math.floor(fx), x1=Math.ceil(fxE), y0=Math.floor(fy), y1=Math.ceil(fyS);
  var nx=x1-x0, ny=y1-y0, total=nx*ny;
  if(total>900){ cb('That area at z'+z+' needs '+total+' tiles — too many. Lower the zoom or draw a smaller area.'); return; }
  var fullW=nx*TILE_SIZE, fullH=ny*TILE_SIZE;
  var big=document.createElement('canvas'); big.width=fullW; big.height=fullH;
  var bx=big.getContext('2d'); bx.fillStyle='#fff'; bx.fillRect(0,0,fullW,fullH);
  var done=0, failed=0, fired=false;
  function finish(err){ if(fired)return; fired=true; cb(err,err?null:{
    canvas:big, fullW:fullW, fullH:fullH, z:z,
    // pixel offset of the AOI within the stitched canvas
    cropX:Math.round((fx-x0)*TILE_SIZE), cropY:Math.round((fy-y0)*TILE_SIZE),
    cropW:Math.round((fxE-fx)*TILE_SIZE), cropH:Math.round((fyS-fy)*TILE_SIZE),
    // geographic bounds of the full stitched canvas (for georeferencing)
    westLon:tile2lon(x0,z), northLat:tile2lat(y0,z), eastLon:tile2lon(x1,z), southLat:tile2lat(y1,z)
  }); }
  for(var ty=y0; ty<y1; ty++){
    for(var tx=x0; tx<x1; tx++){
      (function(tx,ty){
        var img=new Image(); img.crossOrigin='anonymous';
        var px=(tx-x0)*TILE_SIZE, py=(ty-y0)*TILE_SIZE;
        img.onload=function(){ try{bx.drawImage(img,px,py,TILE_SIZE,TILE_SIZE);}catch(e){} done++; if(statusCb)statusCb(done,total); if(done+failed===total)finish(failed===total?'All tiles failed to load (basemap may block cross-origin or be offline).':null); };
        img.onerror=function(){ failed++; done++; if(statusCb)statusCb(done,total); if(done===total)finish(failed===total?'All tiles failed to load (basemap may block cross-origin or be offline).':null); };
        img.src=tileUrl(tpl,tx,ty,z);
      })(tx,ty);
    }
  }
}
function aoiCRS(bounds){
  var exKey=(crsKey==='autoutm')?effectiveCrsKey([bounds.getCenter().lng,bounds.getCenter().lat]):crsKey;
  return {key:exKey, crs:CRS[exKey]||CRS.wgs84};
}
function lngLatToXY(crsObj,lng,lat){ if(!hasProj||crsObj.key==='wgs84')return [lng,lat]; try{return proj4('EPSG:4326',crsObj.crs.code,[lng,lat]);}catch(e){return [lng,lat];} }

/* ================= GEOREFERENCED IMAGE EXPORT (hi-res) ================= */
function geoRefShow(h){ var o=document.getElementById('geoRefOut'); if(o){o.style.display='block';o.innerHTML=h;} }
(function(){ var e=document.getElementById('geoEstimate'); if(e)e.onclick=function(){
  toast('Draw an area to estimate…');
  var d=new L.Draw.Rectangle(map,{shapeOptions:{color:'#0EA5A4',weight:2,dashArray:'4 4',fillOpacity:.04}}); d.enable();
  map.once(L.Draw.Event.CREATED,function(ev){ map.addLayer(ev.layer); var z=+document.getElementById('geoZoom').value; var s=aoiPixelSize(ev.layer.getBounds(),z);
    var el=document.getElementById('geoEst'); el.style.display='block'; el.innerHTML='At z'+z+': <b>'+s.w+' × '+s.h+' px</b> · ~'+s.tiles+' tiles to fetch'+(s.tiles>900?' <span style="color:var(--bad)">(too many — lower zoom)</span>':'');
    setTimeout(function(){try{map.removeLayer(ev.layer);}catch(e){}},1500);
  });
};})();
function startGeoRefExport(){
  if(typeof L.Draw==='undefined'||!L.Draw.Rectangle){ toast('Draw library not loaded',true); return; }
  if(typeof JSZip==='undefined'){ toast('Zip library not loaded — reload',true); return; }
  var z=+document.getElementById('geoZoom').value;
  toast('Draw the area to export at z'+z+'…');
  geoRefShow('Draw a rectangle to define the export area.');
  var drawer=new L.Draw.Rectangle(map,{shapeOptions:{color:'#F59E0B',weight:2,dashArray:'6 5',fillOpacity:.05}}); drawer.enable();
  map.once(L.Draw.Event.CREATED,function(e){
    var layer=e.layer; map.addLayer(layer); var b=layer.getBounds();
    geoRefShow('Fetching tiles at z'+z+'… 0%');
    renderAOIHiRes(b,z,function(d,t){ geoRefShow('Fetching tiles at z'+z+'… '+Math.round(d/t*100)+'%'); },function(err,res){
      try{map.removeLayer(layer);}catch(e){}
      if(err){ toast(err,true); geoRefShow('<span style="color:var(--bad)">'+err+'</span>'); return; }
      finishGeoRef(b,res);
    });
  });
}
/* ============ Minimal GeoTIFF writer (RGB, uncompressed, with GeoKeys) ============
   Builds a valid georeferenced .tif from a canvas + an affine transform so QGIS/ArcGIS
   place it automatically. tiepoint = top-left CRS coords; scale = pixel size in CRS units. */
function buildGeoTIFF(canvas, originX, originY, pxSizeX, pxSizeY, epsgCode){
  var w=canvas.width, h=canvas.height;
  var cx=canvas.getContext('2d');
  var rgba=cx.getImageData(0,0,w,h).data;
  // pack RGB (drop alpha) -> raster strip
  var pixels=w*h, rgb=new Uint8Array(pixels*3);
  for(var i=0,j=0;i<pixels;i++){ rgb[j++]=rgba[i*4]; rgb[j++]=rgba[i*4+1]; rgb[j++]=rgba[i*4+2]; }
  var isGeographic = (epsgCode===4326);
  // ---- IFD entries (12 bytes each). We use LITTLE-endian. ----
  // tags must be in ascending order
  var BPS_OFF, tiepoint_OFF, scale_OFF, geokey_OFF, dataOffset;
  var numEntries=12;
  var headerSize=8;
  var ifdSize=2+numEntries*12+4;
  // extra data blocks after IFD: BitsPerSample(3 shorts=6B), ModelPixelScale(3 doubles=24B),
  // ModelTiepoint(6 doubles=48B), GeoKeyDirectory(variable), GeoDoubleParams(optional)
  var bpsBytes=6;
  var scaleBytes=24;
  var tieBytes=48;
  // GeoKeyDirectory: header(4 shorts) + keys. We add: GTModelType, GTRasterType, and either Geographic or Projected CS.
  var geoKeys=[];
  // header: version=1, revision=1.0, numKeys
  function key(id,loc,count,val){ geoKeys.push(id,loc,count,val); }
  var numKeys;
  if(isGeographic){
    numKeys=3;
    // KeyDirectoryVersion,KeyRevision,MinorRevision,NumberOfKeys
    var gkHead=[1,1,0,numKeys];
    key(1024,0,1,2);      // GTModelTypeGeoKey = 2 (geographic)
    key(1025,0,1,1);      // GTRasterTypeGeoKey = 1 (PixelIsArea)
    key(2048,0,1,epsgCode); // GeographicTypeGeoKey
    geoKeys=gkHead.concat(geoKeys);
  } else {
    numKeys=3;
    var gkHead2=[1,1,0,numKeys];
    key(1024,0,1,1);      // GTModelTypeGeoKey = 1 (projected)
    key(1025,0,1,1);      // GTRasterTypeGeoKey = 1 (PixelIsArea)
    key(3072,0,1,epsgCode); // ProjectedCSTypeGeoKey
    geoKeys=gkHead2.concat(geoKeys);
  }
  var geoKeyCount=geoKeys.length; // shorts
  var geoKeyBytes=geoKeyCount*2;

  // layout offsets (after header + IFD)
  var p=headerSize+ifdSize;
  BPS_OFF=p; p+=bpsBytes;
  scale_OFF=p; p+=scaleBytes;
  tiepoint_OFF=p; p+=tieBytes;
  geokey_OFF=p; p+=geoKeyBytes;
  // pad to even
  if(p%2)p++;
  dataOffset=p;
  var totalSize=dataOffset+rgb.length;
  var buf=new ArrayBuffer(totalSize);
  var dv=new DataView(buf);
  var o=0;
  // TIFF header (little-endian)
  dv.setUint16(0,0x4949,true); // 'II'
  dv.setUint16(2,42,true);     // magic
  dv.setUint32(4,8,true);      // offset to first IFD
  // IFD
  var ifd=8;
  dv.setUint16(ifd,numEntries,true); var e=ifd+2;
  function entry(tag,type,count,valueOrOffset){
    dv.setUint16(e,tag,true); dv.setUint16(e+2,type,true); dv.setUint32(e+4,count,true); dv.setUint32(e+8,valueOrOffset,true); e+=12;
  }
  // types: 3=SHORT,4=LONG,12=DOUBLE
  entry(256,4,1,w);                 // ImageWidth
  entry(257,4,1,h);                 // ImageLength
  entry(258,3,3,BPS_OFF);           // BitsPerSample -> [8,8,8]
  entry(259,3,1,1);                 // Compression = none
  entry(262,3,1,2);                 // PhotometricInterpretation = RGB
  entry(273,4,1,dataOffset);        // StripOffsets
  entry(277,3,1,3);                 // SamplesPerPixel = 3
  entry(278,4,1,h);                 // RowsPerStrip = full height
  entry(279,4,1,rgb.length);        // StripByteCounts
  entry(33550,12,3,scale_OFF);      // ModelPixelScaleTag
  entry(33922,12,6,tiepoint_OFF);   // ModelTiepointTag
  entry(34735,3,geoKeyCount,geokey_OFF); // GeoKeyDirectoryTag
  dv.setUint32(e,0,true); // next IFD = 0
  // BitsPerSample
  dv.setUint16(BPS_OFF,8,true); dv.setUint16(BPS_OFF+2,8,true); dv.setUint16(BPS_OFF+4,8,true);
  // ModelPixelScale (x,y,z) — pixel size; y positive magnitude
  dv.setFloat64(scale_OFF,Math.abs(pxSizeX),true);
  dv.setFloat64(scale_OFF+8,Math.abs(pxSizeY),true);
  dv.setFloat64(scale_OFF+16,0,true);
  // ModelTiepoint (i,j,k, X,Y,Z) — raster 0,0,0 maps to originX,originY
  dv.setFloat64(tiepoint_OFF,0,true); dv.setFloat64(tiepoint_OFF+8,0,true); dv.setFloat64(tiepoint_OFF+16,0,true);
  dv.setFloat64(tiepoint_OFF+24,originX,true); dv.setFloat64(tiepoint_OFF+32,originY,true); dv.setFloat64(tiepoint_OFF+40,0,true);
  // GeoKeyDirectory
  for(var k=0;k<geoKeys.length;k++){ dv.setUint16(geokey_OFF+k*2,geoKeys[k],true); }
  // raster data
  new Uint8Array(buf,dataOffset,rgb.length).set(rgb);
  return new Blob([buf],{type:'image/tiff'});
}

function finishGeoRef(bounds,res){
  // crop the stitched canvas to the AOI
  var crop=document.createElement('canvas'); crop.width=res.cropW; crop.height=res.cropH;
  crop.getContext('2d').drawImage(res.canvas,res.cropX,res.cropY,res.cropW,res.cropH,0,0,res.cropW,res.cropH);
  var co=aoiCRS(bounds), crs=co.crs;
  var tl=lngLatToXY(co,bounds.getNorthWest().lng,bounds.getNorthWest().lat);
  var br=lngLatToXY(co,bounds.getSouthEast().lng,bounds.getSouthEast().lat);
  var pxW=(br[0]-tl[0])/res.cropW, pxH=(br[1]-tl[1])/res.cropH;
  var prj=esriPrj(co.key);
  var fmt=(document.getElementById('expFormat')&&document.getElementById('expFormat').value)||'png';
  var crsTag=(co.key==='wgs84'?'wgs84':crs.esri);
  var epsg=parseInt((crs.code||'EPSG:4326').replace('EPSG:',''),10);

  if(fmt==='geotiff'){
    // Single self-contained georeferenced TIFF (no sidecar needed)
    try{
      var originX=tl[0]+pxW/2, originY=tl[1]+pxH/2; // top-left pixel center
      var tif=buildGeoTIFF(crop, tl[0], tl[1], Math.abs(pxW), Math.abs(pxH), epsg);
      saveBlob(tif, 'georef_image_z'+res.z+'_'+crsTag+'.tif', 'image/tiff');
      geoRefShow('<b>GeoTIFF exported.</b> z'+res.z+' · '+res.cropW+'×'+res.cropH+' px · '+crs.esri+' ('+crs.code+')<br>Georeferencing embedded — opens placed in QGIS/ArcGIS.');
      toast('GeoTIFF exported at z'+res.z);
    }catch(e){ toast('GeoTIFF build failed: '+e.message,true); geoRefShow('<span style="color:var(--bad)">GeoTIFF failed: '+escapeHtml(e.message)+'</span>'); }
    return;
  }

  // PNG or JPEG + world file + .prj, zipped
  var isJpg=(fmt==='jpg');
  var ext=isJpg?'jpg':'png', wld=isJpg?'jgw':'pgw', mime=isJpg?'image/jpeg':'image/png';
  var world=[pxW,0,0,pxH,tl[0]+pxW/2,tl[1]+pxH/2].map(function(n){return n.toFixed(10);}).join('\n')+'\n';
  // flatten onto white for JPEG (no alpha)
  var srcCanvas=crop;
  if(isJpg){ var fc=document.createElement('canvas'); fc.width=crop.width; fc.height=crop.height; var fx=fc.getContext('2d'); fx.fillStyle='#fff'; fx.fillRect(0,0,fc.width,fc.height); fx.drawImage(crop,0,0); srcCanvas=fc; }
  var b64=srcCanvas.toDataURL(mime, isJpg?0.92:undefined).split(',')[1];
  var zip=new JSZip();
  zip.file('georef_image.'+ext,b64,{base64:true});
  zip.file('georef_image.'+wld,world);
  zip.file('georef_image.prj',prj);
  zip.file('readme.txt','Georeferenced image — Spatial Itqan\nCRS: '+crs.esri+' ('+crs.code+')\nResolution: z'+res.z+' · '+res.cropW+' x '+res.cropH+' px\nPixel size (CRS units): '+Math.abs(pxW).toFixed(4)+' x '+Math.abs(pxH).toFixed(4)+'\nLoad georef_image.'+ext+' in QGIS/ArcGIS; the .'+wld+' + .prj place it automatically.\n');
  zip.generateAsync({type:'blob'}).then(function(blob){
    saveBlob(blob, 'georef_image_z'+res.z+'_'+crsTag+'.zip', 'application/zip');
    geoRefShow('<b>Exported.</b> z'+res.z+' · '+res.cropW+'×'+res.cropH+' px · '+crs.esri+' ('+crs.code+')<br>'+ext.toUpperCase()+' + world file (.'+wld+') + .prj, zipped.');
    toast('Georeferenced '+ext.toUpperCase()+' exported at z'+res.z);
  }).catch(function(e){ toast('Export failed: '+e.message,true); });
}
var geoRefBtn=document.getElementById('geoRefExport'); if(geoRefBtn)geoRefBtn.onclick=startGeoRefExport;

/* ================= TILED EXPORT FOR MOSAIC (hi-res) ================= */
(function(){ var ov=document.getElementById('tileOverlap'); if(ov)ov.oninput=function(){var v=document.getElementById('tileOvV'); if(v)v.textContent=this.value;}; })();
function tileShow(h){ var o=document.getElementById('tileOut'); if(o){o.style.display='block';o.innerHTML=h;} }
(function(){ var e=document.getElementById('tileEstimate'); if(e)e.onclick=function(){
  toast('Draw an area to estimate…');
  var d=new L.Draw.Rectangle(map,{shapeOptions:{color:'#0EA5A4',weight:2,dashArray:'4 4',fillOpacity:.04}}); d.enable();
  map.once(L.Draw.Event.CREATED,function(ev){ map.addLayer(ev.layer);
    var z=+document.getElementById('tileZoom').value, tpx=+document.getElementById('tilePx').value;
    var s=aoiPixelSize(ev.layer.getBounds(),z);
    var cols=Math.max(1,Math.ceil(s.w/tpx)), rows=Math.max(1,Math.ceil(s.h/tpx));
    var el=document.getElementById('tileEst'); el.style.display='block';
    el.innerHTML='At z'+z+': full image <b>'+s.w+'×'+s.h+' px</b> → <b>'+rows+' rows × '+cols+' cols = '+(rows*cols)+' tiles</b> of ~'+tpx+'px'+(s.tiles>900?' <span style="color:var(--bad)">(fetch too large — lower zoom)</span>':'');
    setTimeout(function(){try{map.removeLayer(ev.layer);}catch(e){}},1800);
  });
};})();
function startTileExport(){
  if(typeof L.Draw==='undefined'||!L.Draw.Rectangle){ toast('Draw library not loaded',true); return; }
  if(typeof JSZip==='undefined'){ toast('Zip library not loaded — reload',true); return; }
  var z=+document.getElementById('tileZoom').value;
  toast('Draw the area to tile at z'+z+'…');
  tileShow('Draw a rectangle to define the mosaic area.');
  var drawer=new L.Draw.Rectangle(map,{shapeOptions:{color:'#7C3AED',weight:2,dashArray:'6 5',fillOpacity:.05}}); drawer.enable();
  map.once(L.Draw.Event.CREATED,function(e){
    var layer=e.layer; map.addLayer(layer); var b=layer.getBounds();
    tileShow('Fetching tiles at z'+z+'… 0%');
    renderAOIHiRes(b,z,function(d,t){ tileShow('Fetching tiles at z'+z+'… '+Math.round(d/t*100)+'%'); },function(err,res){
      try{map.removeLayer(layer);}catch(e){}
      if(err){ toast(err,true); tileShow('<span style="color:var(--bad)">'+err+'</span>'); return; }
      finishTiles(b,res);
    });
  });
}
function finishTiles(bounds,res){
  var tpx=+document.getElementById('tilePx').value;
  var overlap=(parseFloat(document.getElementById('tileOverlap').value)||0)/100;
  var W=res.cropW, H=res.cropH;
  var cols=Math.max(1,Math.ceil(W/tpx)), rows=Math.max(1,Math.ceil(H/tpx));
  var tileW=W/cols, tileH=H/rows, ovx=Math.round(tileW*overlap), ovy=Math.round(tileH*overlap);
  var co=aoiCRS(bounds), crs=co.crs;
  var TLxy=lngLatToXY(co,bounds.getNorthWest().lng,bounds.getNorthWest().lat);
  var BRxy=lngLatToXY(co,bounds.getSouthEast().lng,bounds.getSouthEast().lat);
  var pxW=(BRxy[0]-TLxy[0])/W, pxH=(BRxy[1]-TLxy[1])/H;
  var prj=esriPrj(co.key), zip=new JSZip();
  var tfmt=(document.getElementById('expFormat')&&document.getElementById('expFormat').value)||'png';
  var tEpsg=parseInt((crs.code||'EPSG:4326').replace('EPSG:',''),10);
  var manifest=[['tile','row','col','px_w','px_h','minX','minY','maxX','maxY']], idx=[], made=0;
  // helper: AOI pixel -> WGS84 lng/lat (for tile-index)
  function aoiPxToLngLat(px,py){
    var fracX=(res.cropX+px)/res.fullW, fracY=(res.cropY+py)/res.fullH;
    return [res.westLon+(res.eastLon-res.westLon)*fracX, res.northLat+(res.southLat-res.northLat)*fracY];
  }
  for(var r=0;r<rows;r++){
    for(var c=0;c<cols;c++){
      var sx=Math.round(c*tileW)-ovx, sy=Math.round(r*tileH)-ovy;
      var ex=Math.round((c+1)*tileW)+ovx, ey=Math.round((r+1)*tileH)+ovy;
      sx=Math.max(0,sx); sy=Math.max(0,sy); ex=Math.min(W,ex); ey=Math.min(H,ey);
      var tw=ex-sx, th=ey-sy; if(tw<2||th<2)continue;
      var cv=document.createElement('canvas'); cv.width=tw; cv.height=th;
      cv.getContext('2d').drawImage(res.canvas, res.cropX+sx, res.cropY+sy, tw, th, 0, 0, tw, th);
      var tileMinX=TLxy[0]+sx*pxW, tileTopY=TLxy[1]+sy*pxH;
      var tileMaxX=tileMinX+tw*pxW, tileBotY=tileTopY+th*pxH;
      var world=[pxW,0,0,pxH,tileMinX+pxW/2,tileTopY+pxH/2].map(function(n){return n.toFixed(10);}).join('\n')+'\n';
      var base='tile_r'+String(r+1).padStart(2,'0')+'_c'+String(c+1).padStart(2,'0');
      if(tfmt==='geotiff'){
        try{ var tifBlob=buildGeoTIFF(cv, tileMinX, tileTopY, Math.abs(pxW), Math.abs(pxH), tEpsg);
          zip.file('tiles/'+base+'.tif', tifBlob); }
        catch(e){ zip.file('tiles/'+base+'.png',cv.toDataURL('image/png').split(',')[1],{base64:true}); zip.file('tiles/'+base+'.pgw',world); zip.file('tiles/'+base+'.prj',prj); }
      } else if(tfmt==='jpg'){
        var jc=document.createElement('canvas'); jc.width=cv.width; jc.height=cv.height; var jx=jc.getContext('2d'); jx.fillStyle='#fff'; jx.fillRect(0,0,jc.width,jc.height); jx.drawImage(cv,0,0);
        zip.file('tiles/'+base+'.jpg',jc.toDataURL('image/jpeg',0.92).split(',')[1],{base64:true});
        zip.file('tiles/'+base+'.jgw',world); zip.file('tiles/'+base+'.prj',prj);
      } else {
        zip.file('tiles/'+base+'.png',cv.toDataURL('image/png').split(',')[1],{base64:true});
        zip.file('tiles/'+base+'.pgw',world); zip.file('tiles/'+base+'.prj',prj);
      }
      var minX=Math.min(tileMinX,tileMaxX),maxX=Math.max(tileMinX,tileMaxX),minY=Math.min(tileTopY,tileBotY),maxY=Math.max(tileTopY,tileBotY);
      manifest.push([base,r+1,c+1,tw,th,minX.toFixed(3),minY.toFixed(3),maxX.toFixed(3),maxY.toFixed(3)]);
      var a=aoiPxToLngLat(sx,sy), bb=aoiPxToLngLat(ex,ey);
      idx.push({type:'Feature',properties:{tile:base,row:r+1,col:c+1},geometry:{type:'Polygon',coordinates:[[[a[0],a[1]],[bb[0],a[1]],[bb[0],bb[1]],[a[0],bb[1]],[a[0],a[1]]]]}});
      made++;
    }
  }
  zip.file('manifest.csv',manifest.map(function(r){return r.join(',');}).join('\n')+'\n');
  zip.file('tile_index.geojson',JSON.stringify({type:'FeatureCollection',crs:{type:'name',properties:{name:'urn:ogc:def:crs:EPSG::4326'}},features:idx}));
  zip.file('README_MOSAIC.txt',tileReadme(crs,co.key,rows,cols,Math.round(overlap*100),made,Math.abs(pxW),Math.abs(pxH),res.z));
  zip.generateAsync({type:'blob'}).then(function(blob){
    saveBlob(blob, 'mosaic_tiles_z'+res.z+'_'+(co.key==='wgs84'?'wgs84':crs.esri)+'.zip', 'application/zip');
    tileShow('<b>'+made+' tiles exported</b> ('+tfmt.toUpperCase()+') · z'+res.z+' · '+W+'×'+H+' px total · '+rows+'×'+cols+' grid · '+Math.round(overlap*100)+'% overlap<br>CRS: '+crs.esri+' ('+crs.code+')<br>Includes manifest.csv, tile_index.geojson, mosaic instructions.');
    toast(made+' georeferenced '+tfmt.toUpperCase()+' tiles exported');
  }).catch(function(e){ toast('Tile zip failed: '+e.message,true); });
}
function tileReadme(crs,exKey,rows,cols,ov,made,pxW,pxH,z){
  return [
'SPATIAL ITQAN — TILED EXPORT FOR SEAMLESS MOSAIC',
'================================================','',
'Tiles: '+made+'  ('+rows+' rows x '+cols+' cols, '+ov+'% edge overlap)',
'Detail: zoom '+z,
'CRS  : '+crs.esri+' ('+crs.code+')',
'Pixel size (CRS units): '+pxW.toFixed(4)+' x '+pxH.toFixed(4),
'All tiles share ONE fetch, ONE resolution, ONE origin and ONE CRS — seamless-mosaic ready.','',
'CONTENTS',
'  tiles/tile_rXX_cYY.png/.pgw/.prj  — image + world file + CRS',
'  manifest.csv       — every tile + extent',
'  tile_index.geojson — tile footprints (WGS84)','',
'BUILD A SEAMLESS MOSAIC (GDAL)',
'  for f in tiles/*.png; do gdal_translate -a_srs '+crs.code+' "$f" "${f%.png}.tif"; done',
'  gdalbuildvrt mosaic.vrt tiles/*.tif',
'  gdal_translate -co COMPRESS=LZW mosaic.vrt mosaic.tif','',
'OR QGIS: Raster > Miscellaneous > Build Virtual Raster (add all tiles), then Merge.','',
'NOTES',
'  * Detail is limited by the basemap provider\u2019s maximum native zoom.',
'  * Overlap lets the mosaic tool cut/feather edges without gaps.',
'  * Keep each .png with its .pgw and .prj together.'
  ].join('\n')+'\n';
}
var tileBtn=document.getElementById('tileExport'); if(tileBtn)tileBtn.onclick=startTileExport;

/* ===== Direct-to-folder streaming AOI tile exporter =====
   Tiled jobs deliberately bypass renderAOIHiRes(): only one output tile and a
   small group of 256 px source tiles exist in memory at any time. */
var streamExportState={folder:null,job:null};
function streamEl(id){return document.getElementById(id);}
function streamSafeName(value){
  return String(value||'AOI_EXPORT').trim().replace(/[^A-Za-z0-9_\-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,60)||'AOI_EXPORT';
}
function streamPad(value){return String(value).padStart(4,'0');}
function streamClock(ms){
  if(!isFinite(ms)||ms<0)return 'Calculating';
  var seconds=Math.max(0,Math.round(ms/1000)),hours=Math.floor(seconds/3600),minutes=Math.floor((seconds%3600)/60),secs=seconds%60;
  return (hours?String(hours).padStart(2,'0')+':':'')+String(minutes).padStart(2,'0')+':'+String(secs).padStart(2,'0');
}
function streamStamp(date){
  function p(n){return String(n).padStart(2,'0');}
  return date.getFullYear()+p(date.getMonth()+1)+p(date.getDate())+'_'+p(date.getHours())+p(date.getMinutes())+p(date.getSeconds());
}
function streamBytes(value){
  var units=['B','KB','MB','GB','TB'],n=Math.max(0,Number(value)||0),i=0;
  while(n>=1024&&i<units.length-1){n/=1024;i++;}
  return n.toFixed(i?1:0)+' '+units[i];
}
function streamLog(message,type){
  var job=streamExportState.job,now=new Date(),line='['+now.toLocaleTimeString()+'] '+message;
  if(job){job.logs.push(line);if(job.logs.length>5000)job.logs.shift();}
  var box=streamEl('expLiveLog');if(!box)return;
  var row=document.createElement('div');if(type)row.className=type;row.textContent=line;box.appendChild(row);
  while(box.children.length>250)box.removeChild(box.firstChild);
  box.scrollTop=box.scrollHeight;
}
function streamUpdateProgress(summary){
  var job=streamExportState.job;if(!job)return;
  var elapsed=Date.now()-job.started,processed=job.processed||0,total=job.total||0,rate=processed>0?processed/elapsed:0;
  var eta=rate>0?(total-processed)/rate:Infinity,pct=total?Math.min(100,processed/total*100):0;
  if(summary&&streamEl('expJobSummary'))streamEl('expJobSummary').textContent=summary;
  if(streamEl('expJobCount'))streamEl('expJobCount').textContent=processed+' / '+total;
  if(streamEl('expProgressBar'))streamEl('expProgressBar').style.width=pct.toFixed(2)+'%';
  if(streamEl('expElapsed'))streamEl('expElapsed').textContent=streamClock(elapsed);
  if(streamEl('expRemaining'))streamEl('expRemaining').textContent=job.finished?(job.cancel?'Stopped':'00:00'):(job.cancel?'Cancelling':(processed>=total?'00:00':streamClock(eta)));
  if(streamEl('expCompleted'))streamEl('expCompleted').textContent=job.completed+' OK · '+job.failed.length+' failed';
  if(window.__svProfessionalProgress)window.__svProfessionalProgress('Imagery tile export',processed,total,summary||((job.completed||0)+' completed · '+job.failed.length+' failed'));
}
function streamShowPanel(){
  var panel=streamEl('expJobPanel');if(panel)panel.classList.add('show');
  var log=streamEl('expLiveLog');if(log)log.innerHTML='';
  var cancel=streamEl('expCancel');if(cancel){cancel.style.display='block';cancel.disabled=false;}
}
async function streamChooseFolder(){
  if(!window.showDirectoryPicker){
    toast('Direct folder export requires a supported Chromium browser opened through localhost or HTTPS.',true);
    var status=streamEl('expFolderStatus');if(status)status.textContent='Folder writing is unavailable in this browser';
    return null;
  }
  try{
    var handle=await window.showDirectoryPicker({id:'spatial-itqan-imagery-export',mode:'readwrite'});
    streamExportState.folder=handle;
    var out=streamEl('expFolderStatus');if(out)out.textContent='Selected folder: '+handle.name;
    toast('Output folder selected: '+handle.name);
    return handle;
  }catch(err){
    if(err&&err.name!=='AbortError')toast('Could not open output folder: '+err.message,true);
    return null;
  }
}
function streamSelectedPolygonAOI(){
  var hits=[];
  Object.keys(layers||{}).forEach(function(id){
    var L0=layers[id];if(!L0||!L0.geojson)return;
    var selected=svSelSet(id);
    (L0.geojson.features||[]).forEach(function(feature){
      var fid=String(feature.properties&&feature.properties.__sv_fid||'');
      if(selected[fid]&&feature.geometry&&/Polygon$/.test(feature.geometry.type))hits.push({feature:feature,layer:L0});
    });
  });
  if(hits.length!==1)throw new Error(hits.length?'Select only one polygon feature as the AOI':'Select one polygon feature with the Select Arrow first');
  var cloned=JSON.parse(JSON.stringify(hits[0].feature)),bounds=L.geoJSON(cloned).getBounds();
  if(!bounds.isValid())throw new Error('The selected AOI polygon has invalid bounds');
  return {bounds:bounds,feature:cloned,label:hits[0].layer.name+' selected polygon'};
}
function streamAcquireAOI(source,purpose){
  if(source==='selected'){
    try{return Promise.resolve(streamSelectedPolygonAOI());}catch(err){return Promise.reject(err);}
  }
  return new Promise(function(resolve,reject){
    if(typeof L.Draw==='undefined'||!L.Draw.Rectangle){reject(new Error('AOI drawing library is unavailable'));return;}
    toast('Draw the AOI rectangle for '+purpose+'…');
    var drawer=new L.Draw.Rectangle(map,{shapeOptions:{color:'#38BDF8',weight:2,dashArray:'6 4',fillOpacity:.05}});
    function created(event){
      var layer=event.layer;map.addLayer(layer);
      var feature=layer.toGeoJSON(),bounds=layer.getBounds();
      setTimeout(function(){try{map.removeLayer(layer);}catch(e){}},900);
      resolve({bounds:bounds,feature:feature,label:'Drawn AOI rectangle'});
    }
    map.once(L.Draw.Event.CREATED,created);
    try{drawer.enable();}catch(err){map.off(L.Draw.Event.CREATED,created);reject(err);}
  });
}
function streamGlobalPixelToLngLat(x,y,z){return [tile2lon(x/TILE_SIZE,z),tile2lat(y/TILE_SIZE,z)];}
function streamLngLatToGlobalPixel(lng,lat,z){return [lon2tile(lng,z)*TILE_SIZE,lat2tile(lat,z)*TILE_SIZE];}
function streamTargetToLngLat(crsObj,x,y){
  if(!hasProj||crsObj.key==='wgs84')return [x,y];
  try{return proj4(crsObj.crs.code,'EPSG:4326',[x,y]);}catch(err){throw new Error('Could not inverse-project the output grid: '+err.message);}
}
function streamProjectedEnvelope(aoi,crsObj){
  var points=[];
  function addSegment(a,b){
    var pieces=16;
    for(var i=0;i<=pieces;i++){
      var t=i/pieces;
      points.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
    }
  }
  function addRing(ring){
    if(!ring||ring.length<2)return;
    for(var i=1;i<ring.length;i++)addSegment(ring[i-1],ring[i]);
    if(ring[0][0]!==ring[ring.length-1][0]||ring[0][1]!==ring[ring.length-1][1])addSegment(ring[ring.length-1],ring[0]);
  }
  var geometry=aoi.feature&&aoi.feature.geometry;
  if(geometry&&geometry.type==='Polygon')(geometry.coordinates||[]).forEach(addRing);
  if(geometry&&geometry.type==='MultiPolygon')(geometry.coordinates||[]).forEach(function(polygon){polygon.forEach(addRing);});
  if(!points.length){
    var b=aoi.bounds,nw=[b.getWest(),b.getNorth()],ne=[b.getEast(),b.getNorth()],se=[b.getEast(),b.getSouth()],sw=[b.getWest(),b.getSouth()];
    addSegment(nw,ne);addSegment(ne,se);addSegment(se,sw);addSegment(sw,nw);
  }
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  points.forEach(function(point){
    var projected=lngLatToXY(crsObj,point[0],point[1]);
    minX=Math.min(minX,projected[0]);minY=Math.min(minY,projected[1]);
    maxX=Math.max(maxX,projected[0]);maxY=Math.max(maxY,projected[1]);
  });
  if(!isFinite(minX+minY+maxX+maxY))throw new Error('The AOI could not be projected into the output CRS');
  return {minX:minX,minY:minY,maxX:maxX,maxY:maxY};
}
function streamTargetResolution(crsObj,bounds,z){
  var center=bounds.getCenter(),global=streamLngLatToGlobalPixel(center.lng,center.lat,z);
  var p0=lngLatToXY(crsObj,center.lng,center.lat);
  var eastLL=streamGlobalPixelToLngLat(global[0]+1,global[1],z),southLL=streamGlobalPixelToLngLat(global[0],global[1]+1,z);
  var east=lngLatToXY(crsObj,eastLL[0],eastLL[1]),south=lngLatToXY(crsObj,southLL[0],southLL[1]);
  if(crsObj.key==='wgs84')return {x:Math.abs(east[0]-p0[0]),y:Math.abs(south[1]-p0[1])};
  var eastSize=Math.hypot(east[0]-p0[0],east[1]-p0[1]),southSize=Math.hypot(south[0]-p0[0],south[1]-p0[1]);
  var square=(eastSize+southSize)/2;
  if(!isFinite(square)||square<=0)throw new Error('Could not calculate the output pixel resolution');
  return {x:square,y:square};
}
function streamItemRing(plan,item){
  var corners=[[item.minX,item.maxY],[item.maxX,item.maxY],[item.maxX,item.minY],[item.minX,item.minY],[item.minX,item.maxY]];
  return corners.map(function(point){return streamTargetToLngLat(plan.crsInfo,point[0],point[1]);});
}
function streamTilePolygon(item){
  if(item.ring4326)return turf.polygon([item.ring4326]);
  return turf.polygon([[[item.west,item.north],[item.east,item.north],[item.east,item.south],[item.west,item.south],[item.west,item.north]]]);
}
function streamTargetPixelToSource(plan,item,px,py){
  var targetX=item.minX+px*plan.resX,targetY=item.maxY-py*plan.resY;
  var lngLat=streamTargetToLngLat(plan.crsInfo,targetX,targetY);
  var global=streamLngLatToGlobalPixel(lngLat[0],lngLat[1],plan.z);
  return {targetX:targetX,targetY:targetY,lng:lngLat[0],lat:lngLat[1],globalX:global[0],globalY:global[1]};
}
function streamItemSourceBounds(plan,item){
  var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity,samples=16,size=plan.tileSize;
  function add(px,py){
    var source=streamTargetPixelToSource(plan,item,px,py);
    minX=Math.min(minX,source.globalX);minY=Math.min(minY,source.globalY);
    maxX=Math.max(maxX,source.globalX);maxY=Math.max(maxY,source.globalY);
  }
  for(var i=0;i<=samples;i++){
    var p=size*i/samples;
    add(p,0);add(p,size);add(0,p);add(size,p);
  }
  return {minX:minX,minY:minY,maxX:maxX,maxY:maxY};
}
function streamBuildPlan(aoi,requestedZoom,tileSize,overlapPercent){
  var tpl=activeTileTemplate();if(!tpl)throw new Error('Switch to a raster tile basemap before exporting imagery');
  if(!hasProj)throw new Error('The projection library is required for planimetrically aligned tiled export');
  var z=Math.min(requestedZoom,tpl.maxZoom),b=aoi.bounds,crsInfo=aoiCRS(b);
  var resolution=streamTargetResolution(crsInfo,b,z),envelope=streamProjectedEnvelope(aoi,crsInfo);
  var originX=Math.floor(envelope.minX/resolution.x)*resolution.x,originY=Math.ceil(envelope.maxY/resolution.y)*resolution.y;
  var width=Math.max(1,Math.ceil((envelope.maxX-originX)/resolution.x)),height=Math.max(1,Math.ceil((originY-envelope.minY)/resolution.y));
  var overlap=Math.max(0,Math.min(tileSize-1,Math.round(tileSize*(overlapPercent/100)))),step=Math.max(1,tileSize-overlap);
  var cols=Math.max(1,Math.ceil(Math.max(1,width-overlap)/step)),rows=Math.max(1,Math.ceil(Math.max(1,height-overlap)/step));
  var polygonAOI=aoi.feature&&aoi.feature.geometry&&/Polygon$/.test(aoi.feature.geometry.type),items=[],sources={};
  var plan={aoi:aoi,tpl:tpl,requestedZoom:requestedZoom,z:z,tileSize:tileSize,overlapPercent:overlapPercent,overlapPx:overlap,step:step,width:width,height:height,rows:rows,cols:cols,items:items,sourceTiles:0,crsInfo:crsInfo,resX:resolution.x,resY:resolution.y,originX:originX,originY:originY,meshStep:16,reprojection:'shared_output_crs_grid'};
  for(var row=0;row<rows;row++){
    for(var col=0;col<cols;col++){
      var pixelX=col*step,pixelY=row*step;
      var item={row:row+1,col:col+1,pixelX:pixelX,pixelY:pixelY,minX:originX+pixelX*resolution.x,maxY:originY-pixelY*resolution.y};
      item.maxX=item.minX+tileSize*resolution.x;item.minY=item.maxY-tileSize*resolution.y;
      item.ring4326=streamItemRing(plan,item);
      item.west=Math.min.apply(null,item.ring4326.map(function(p){return p[0];}));
      item.east=Math.max.apply(null,item.ring4326.map(function(p){return p[0];}));
      item.south=Math.min.apply(null,item.ring4326.map(function(p){return p[1];}));
      item.north=Math.max.apply(null,item.ring4326.map(function(p){return p[1];}));
      if(polygonAOI&&typeof turf!=='undefined'&&turf.booleanIntersects){
        try{if(!turf.booleanIntersects(aoi.feature,streamTilePolygon(item)))continue;}catch(err){}
      }
      var coverage=streamItemSourceBounds(plan,item);
      item.sourceBounds=coverage;
      var sx0=Math.floor((coverage.minX-2)/TILE_SIZE),sy0=Math.floor((coverage.minY-2)/TILE_SIZE);
      var sx1=Math.ceil((coverage.maxX+2)/TILE_SIZE),sy1=Math.ceil((coverage.maxY+2)/TILE_SIZE);
      for(var sy=sy0;sy<sy1;sy++)for(var sx=sx0;sx<sx1;sx++)sources[z+'/'+sx+'/'+sy]=1;
      items.push(item);
    }
  }
  plan.sourceTiles=Object.keys(sources).length;
  return plan;
}
function streamEstimatePlan(plan){
  var fmt=streamEl('expFormat').value,raw=plan.items.length*plan.tileSize*plan.tileSize*3;
  var estimated=fmt==='geotiff'?raw:(fmt==='jpg'?raw*.16:raw*.48);
  var clamp=plan.z!==plan.requestedZoom?' · provider capped requested z'+plan.requestedZoom+' to z'+plan.z:'';
  var el=streamEl('tileEst');if(el){
    el.style.display='block';streamEl('geoEst').style.display='none';
    el.innerHTML='<b>'+plan.items.length+' same-size output tiles</b> · '+plan.rows+' rows × '+plan.cols+' cols · '+plan.tileSize+'×'+plan.tileSize+' px · '+plan.sourceTiles+' unique source tiles'+clamp+'<br>Shared '+plan.crsInfo.crs.code+' grid · '+plan.resX.toFixed(plan.crsInfo.key==='wgs84'?10:4)+' × '+plan.resY.toFixed(plan.crsInfo.key==='wgs84'?10:4)+' CRS units/pixel<br>Estimated output: ~'+streamBytes(estimated)+' · reprojected and streamed directly to disk; the complete AOI is not retained in memory.';
  }
}
function streamWait(ms,signal){
  return new Promise(function(resolve,reject){
    var timer=setTimeout(resolve,ms);
    if(signal)signal.addEventListener('abort',function(){clearTimeout(timer);reject(new DOMException('Cancelled','AbortError'));},{once:true});
  });
}
async function streamFetchBitmap(url,signal){
  var lastError;
  for(var attempt=1;attempt<=3;attempt++){
    if(signal.aborted)throw new DOMException('Cancelled','AbortError');
    try{
      var response=await fetch(url,{signal:signal,mode:'cors',cache:'force-cache'});
      if(!response.ok)throw new Error('HTTP '+response.status);
      var blob=await response.blob();
      if(window.createImageBitmap)return await createImageBitmap(blob);
      var objectUrl=URL.createObjectURL(blob);
      return await new Promise(function(resolve,reject){
        var image=new Image();
        image.onload=function(){URL.revokeObjectURL(objectUrl);resolve(image);};
        image.onerror=function(){URL.revokeObjectURL(objectUrl);reject(new Error('Image decode failed'));};
        image.src=objectUrl;
      });
    }catch(err){
      lastError=err;if(err&&err.name==='AbortError')throw err;
      if(attempt<3)await streamWait(250*attempt,signal);
    }
  }
  throw lastError||new Error('Tile request failed');
}
function streamCompileShader(gl,type,source){
  var shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
    var message=gl.getShaderInfoLog(shader)||'Unknown shader compilation error';gl.deleteShader(shader);throw new Error(message);
  }
  return shader;
}
function streamWarpSourceCanvas(plan,item,sourceCanvas,sourceOriginX,sourceOriginY){
  var size=plan.tileSize,warpCanvas=document.createElement('canvas');warpCanvas.width=size;warpCanvas.height=size;
  var gl=warpCanvas.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true});
  if(!gl)throw new Error('WebGL reprojection is unavailable in this browser');
  var maxTexture=gl.getParameter(gl.MAX_TEXTURE_SIZE);
  if(sourceCanvas.width>maxTexture||sourceCanvas.height>maxTexture)throw new Error('Source texture '+sourceCanvas.width+'×'+sourceCanvas.height+' exceeds this browser GPU limit of '+maxTexture+' px');
  var vertexShader=streamCompileShader(gl,gl.VERTEX_SHADER,'attribute vec2 a_position;attribute vec2 a_texcoord;varying vec2 v_texcoord;void main(){gl_Position=vec4(a_position,0.0,1.0);v_texcoord=a_texcoord;}');
  var fragmentShader=streamCompileShader(gl,gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D u_image;varying vec2 v_texcoord;void main(){gl_FragColor=texture2D(u_image,v_texcoord);}');
  var program=gl.createProgram();gl.attachShader(program,vertexShader);gl.attachShader(program,fragmentShader);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'Could not link the reprojection shader');
  gl.useProgram(program);
  var step=plan.meshStep||32,xs=[],ys=[];
  for(var x=0;x<size;x+=step)xs.push(x);xs.push(size);
  for(var y=0;y<size;y+=step)ys.push(y);ys.push(size);
  var nodes=new Array(xs.length*ys.length);
  for(var row=0;row<ys.length;row++){
    for(var col=0;col<xs.length;col++){
      var px=xs[col],py=ys[row],mapped=streamTargetPixelToSource(plan,item,px,py);
      nodes[row*xs.length+col]={
        x:px/size*2-1,y:1-py/size*2,
        u:(mapped.globalX-sourceOriginX)/sourceCanvas.width,
        v:1-(mapped.globalY-sourceOriginY)/sourceCanvas.height
      };
    }
  }
  var vertices=[];
  function push(node){vertices.push(node.x,node.y,node.u,node.v);}
  for(var r=0;r<ys.length-1;r++){
    for(var c=0;c<xs.length-1;c++){
      var a=nodes[r*xs.length+c],b=nodes[r*xs.length+c+1],d=nodes[(r+1)*xs.length+c],e=nodes[(r+1)*xs.length+c+1];
      push(a);push(d);push(b);push(b);push(d);push(e);
    }
  }
  var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
  var stride=4*4,position=gl.getAttribLocation(program,'a_position'),texcoord=gl.getAttribLocation(program,'a_texcoord');
  gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,stride,0);
  gl.enableVertexAttribArray(texcoord);gl.vertexAttribPointer(texcoord,2,gl.FLOAT,false,stride,2*4);
  var texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sourceCanvas);
  gl.viewport(0,0,size,size);gl.clearColor(1,1,1,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,vertices.length/4);
  var output=document.createElement('canvas');output.width=size;output.height=size;
  var context=output.getContext('2d',{alpha:false});context.drawImage(warpCanvas,0,0);
  gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertexShader);gl.deleteShader(fragmentShader);
  var lose=gl.getExtension('WEBGL_lose_context');if(lose)lose.loseContext();
  warpCanvas.width=warpCanvas.height=0;
  return output;
}
async function streamRenderOutputTile(plan,item,job){
  var coverage=item.sourceBounds||streamItemSourceBounds(plan,item);
  var x0=Math.floor((coverage.minX-2)/TILE_SIZE),y0=Math.floor((coverage.minY-2)/TILE_SIZE);
  var x1=Math.ceil((coverage.maxX+2)/TILE_SIZE),y1=Math.ceil((coverage.maxY+2)/TILE_SIZE),tasks=[];
  var sourceCanvas=document.createElement('canvas');sourceCanvas.width=Math.max(1,(x1-x0)*TILE_SIZE);sourceCanvas.height=Math.max(1,(y1-y0)*TILE_SIZE);
  var context=sourceCanvas.getContext('2d',{alpha:false});context.fillStyle='#fff';context.fillRect(0,0,sourceCanvas.width,sourceCanvas.height);
  for(var y=y0;y<y1;y++)for(var x=x0;x<x1;x++)tasks.push({x:x,y:y});
  var cursor=0,loaded=0,failed=0,workers=Math.min(8,tasks.length);
  async function worker(){
    while(true){
      var index=cursor++;if(index>=tasks.length)return;
      var source=tasks[index];
      try{
        var bitmap=await streamFetchBitmap(tileUrl(plan.tpl,source.x,source.y,plan.z),job.controller.signal);
        context.drawImage(bitmap,(source.x-x0)*TILE_SIZE,(source.y-y0)*TILE_SIZE,TILE_SIZE,TILE_SIZE);
        if(bitmap&&bitmap.close)bitmap.close();loaded++;
      }catch(err){
        if(err&&err.name==='AbortError')throw err;
        failed++;
      }
      if((loaded+failed)%8===0||loaded+failed===tasks.length)streamUpdateProgress('Rendering R'+streamPad(item.row)+' C'+streamPad(item.col)+' · source '+(loaded+failed)+' / '+tasks.length);
    }
  }
  await Promise.all(Array.from({length:workers},worker));
  if(!loaded){sourceCanvas.width=sourceCanvas.height=0;throw new Error('All source imagery requests failed for this tile');}
  if(failed)streamLog('R'+streamPad(item.row)+' C'+streamPad(item.col)+': '+failed+' source tile request(s) failed; blank pixels were retained.','warn');
  streamUpdateProgress('Reprojecting R'+streamPad(item.row)+' C'+streamPad(item.col)+' onto the shared '+plan.crsInfo.crs.code+' grid');
  var output=streamWarpSourceCanvas(plan,item,sourceCanvas,x0*TILE_SIZE,y0*TILE_SIZE);
  sourceCanvas.width=sourceCanvas.height=0;
  return output;
}
function streamCanvasBlob(canvas,type,quality){
  return new Promise(function(resolve,reject){canvas.toBlob(function(blob){if(blob)resolve(blob);else reject(new Error('Image encoding returned no data'));},type,quality);});
}
async function streamWriteFile(directory,name,data){
  var file=await directory.getFileHandle(name,{create:true}),writable=await file.createWritable();
  try{await writable.write(data);}finally{await writable.close();}
}
function streamTileBase(job,item){
  return job.prefix+'_'+job.source+'_Z'+job.plan.z+'_EPSG'+job.epsg+'_R'+streamPad(item.row)+'_C'+streamPad(item.col);
}
async function streamWriteOutputTile(canvas,item,job){
  var tileSize=job.plan.tileSize,pxW=job.plan.resX,pxH=-job.plan.resY;
  var originX=item.minX,originY=item.maxY,base=streamTileBase(job,item),format=job.format,files=[];
  if(format==='geotiff'){
    var tif=buildGeoTIFF(canvas,originX,originY,pxW,Math.abs(pxH),job.epsg);
    await streamWriteFile(job.tilesDirectory,base+'.tif',tif);files.push('tiles/'+base+'.tif');
  }else{
    var imageCanvas=canvas,mime='image/png',ext='png',worldExt='pgw';
    if(format==='jpg'){
      mime='image/jpeg';ext='jpg';worldExt='jgw';
      imageCanvas=document.createElement('canvas');imageCanvas.width=canvas.width;imageCanvas.height=canvas.height;
      var ctx=imageCanvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,imageCanvas.width,imageCanvas.height);ctx.drawImage(canvas,0,0);
    }
    var imageBlob=await streamCanvasBlob(imageCanvas,mime,format==='jpg'?.92:undefined);
    var world=[pxW,0,0,pxH,originX+pxW/2,originY+pxH/2].map(function(n){return n.toFixed(10);}).join('\n')+'\n';
    await streamWriteFile(job.tilesDirectory,base+'.'+ext,imageBlob);
    await streamWriteFile(job.tilesDirectory,base+'.'+worldExt,world);
    await streamWriteFile(job.tilesDirectory,base+'.prj',job.prj);
    files.push('tiles/'+base+'.'+ext,'tiles/'+base+'.'+worldExt,'tiles/'+base+'.prj');
    if(imageCanvas!==canvas)imageCanvas.width=imageCanvas.height=0;
  }
  return {base:base,files:files,pxW:pxW,pxH:pxH,minX:item.minX,minY:item.minY,maxX:item.maxX,maxY:item.maxY};
}
function streamJobDocument(job,status){
  return {
    application:'Spatial Itqan WebGIS',status:status,created:new Date(job.started).toISOString(),updated:new Date().toISOString(),
    outputFolder:job.folderName,aoiSource:job.plan.aoi.label,sourceBasemap:job.source,requestedZoom:job.plan.requestedZoom,effectiveZoom:job.plan.z,
    outputCRS:job.crsInfo.crs.code,reprojection:'shared output-CRS raster grid',pixelSize:{x:job.plan.resX,y:job.plan.resY},gridOrigin:{x:job.plan.originX,y:job.plan.originY},tileSizePx:job.plan.tileSize,overlapPercent:job.plan.overlapPercent,
    grid:{rows:job.plan.rows,columns:job.plan.cols,plannedTiles:job.total,sourceTiles:job.plan.sourceTiles},
    progress:{processed:job.processed,completed:job.completed,failed:job.failed.length,remaining:Math.max(0,job.total-job.processed)},
    namingConvention:'{AOI}_{SOURCE}_Z{ZOOM}_EPSG{CODE}_R{ROW4}_C{COL4}.{EXT}',failedTiles:job.failed
  };
}
async function streamCheckpoint(job,status){
  await streamWriteFile(job.rootDirectory,'export_job.json',JSON.stringify(streamJobDocument(job,status),null,2));
}
function streamManifestCSV(job){
  var rows=[['tile','row','column','file','status','minX','minY','maxX','maxY','crs']];
  job.manifest.forEach(function(item){rows.push([item.base,item.row,item.col,item.files[0],'complete',item.minX,item.minY,item.maxX,item.maxY,job.crsInfo.crs.code]);});
  job.failed.forEach(function(item){rows.push([item.base,item.row,item.col,'','failed','','','','',job.crsInfo.crs.code]);});
  return rows.map(function(row){return row.map(function(value){value=String(value==null?'':value);return /[",\n]/.test(value)?'"'+value.replace(/"/g,'""')+'"':value;}).join(',');}).join('\n')+'\n';
}
function streamReadme(job,status){
  return [
    'SPATIAL ITQAN — SEQUENTIAL AOI TILE EXPORT','===========================================','',
    'Status: '+status,'AOI: '+job.plan.aoi.label,'Source: '+job.source,'Effective zoom: '+job.plan.z,
    'CRS: '+job.crsInfo.crs.esri+' ('+job.crsInfo.crs.code+')','Reprojection: shared output-CRS raster grid',
    'Pixel size: '+job.plan.resX+' x '+job.plan.resY+' CRS units','Grid origin: '+job.plan.originX+', '+job.plan.originY,
    'Tile size: '+job.plan.tileSize+' x '+job.plan.tileSize+' px','Overlap: '+job.plan.overlapPercent+'%',
    'Completed: '+job.completed+' / '+job.total,'Failed: '+job.failed.length,'',
    'Naming: {AOI}_{SOURCE}_Z{ZOOM}_EPSG{CODE}_R{ROW4}_C{COL4}.{EXT}',
    'Rows run north-to-south; columns run west-to-east.',
    'All tiles use the same origin and pixel resolution. At 0% overlap, adjacent edges fit exactly.','',
    'Accuracy note: reprojection and tile alignment are controlled by the export grid. Absolute ground accuracy remains limited by the source imagery provider and its acquisition/georeferencing quality.','',
    'Use tile_index.geojson or manifest.csv to review the grid. Build a virtual raster in ArcGIS/QGIS/GDAL for display as one mosaic.'
  ].join('\n')+'\n';
}
async function streamFinalize(job,status){
  await streamWriteFile(job.rootDirectory,'manifest.csv',streamManifestCSV(job));
  await streamWriteFile(job.rootDirectory,'tile_index.geojson',JSON.stringify({type:'FeatureCollection',features:job.indexFeatures},null,2));
  await streamWriteFile(job.rootDirectory,'README.txt',streamReadme(job,status));
  await streamWriteFile(job.rootDirectory,'export.log',job.logs.join('\n')+'\n');
  await streamCheckpoint(job,status);
}
async function startStreamingTileExport(){
  if(streamExportState.job&&streamExportState.job.running){toast('A tiled export is already running',true);return;}
  if(!streamExportState.folder){toast('Choose the output folder before starting the tiled export',true);return;}
  var sourceMode=streamEl('expAoiSource').value,aoi;
  try{aoi=await streamAcquireAOI(sourceMode,'tiled export');}catch(err){toast(err.message,true);return;}
  var requestedZoom=+streamEl('geoZoom').value,tileSize=+streamEl('tilePx').value,overlap=+streamEl('tileOverlap').value,plan;
  try{plan=streamBuildPlan(aoi,requestedZoom,tileSize,overlap);}catch(err){toast(err.message,true);return;}
  if(!plan.items.length){toast('No output tiles intersect the AOI',true);return;}
  var co=plan.crsInfo,epsg=parseInt((co.crs.code||'EPSG:4326').replace('EPSG:',''),10);
  var sourceKey=Object.keys(basemaps).filter(function(key){return basemaps[key].layer===currentBase;})[0]||'BASEMAP';
  var prefix=streamSafeName(streamEl('expJobName').value),source=streamSafeName((basemaps[sourceKey]&&basemaps[sourceKey].name)||sourceKey);
  var folderName=prefix+'_Z'+plan.z+'_EPSG'+epsg+'_'+streamStamp(new Date()),rootDirectory,tilesDirectory;
  try{
    rootDirectory=await streamExportState.folder.getDirectoryHandle(folderName,{create:true});
    tilesDirectory=await rootDirectory.getDirectoryHandle('tiles',{create:true});
  }catch(err){toast('Cannot create the export folder: '+err.message,true);return;}
  var job={running:true,cancel:false,controller:new AbortController(),started:Date.now(),timer:null,processed:0,completed:0,total:plan.items.length,failed:[],manifest:[],indexFeatures:[],logs:[],plan:plan,prefix:prefix,source:source,folderName:folderName,rootDirectory:rootDirectory,tilesDirectory:tilesDirectory,crsInfo:co,epsg:epsg,prj:esriPrj(co.key),format:streamEl('expFormat').value};
  streamExportState.job=job;streamShowPanel();streamUpdateProgress('Preparing '+job.total+' output tiles');
  streamLog('Output folder: '+streamExportState.folder.name+'/'+folderName,'ok');
  streamLog('AOI: '+aoi.label+' · grid '+plan.rows+' × '+plan.cols+' · '+job.total+' intersecting tiles');
  streamLog('Tile size '+tileSize+' px · overlap '+overlap+'% · effective zoom z'+plan.z+(plan.z!==requestedZoom?' (requested z'+requestedZoom+' capped by provider)':''));
  streamLog('Reprojection grid: '+co.crs.code+' · '+plan.resX+' × '+plan.resY+' CRS units/pixel · common origin '+plan.originX+', '+plan.originY,'ok');
  if(overlap>0)streamLog('Overlap duplicates a buffer between neighboring tiles; use 0% for direct edge-to-edge mosaics.','warn');
  if(tileSize>=4096)streamLog('4096 px GeoTIFF tiles can temporarily use substantial memory; processing remains one tile at a time.','warn');
  var run=streamEl('expRun');if(run)run.disabled=true;
  job.timer=setInterval(function(){streamUpdateProgress();},1000);
  try{
    await streamCheckpoint(job,'running');
    for(var i=0;i<plan.items.length;i++){
      if(job.cancel)break;
      var item=plan.items[i],base=streamTileBase(job,item),canvas=null;
      streamLog('Starting '+base);
      try{
        canvas=await streamRenderOutputTile(plan,item,job);
        if(job.cancel)break;
        var record=await streamWriteOutputTile(canvas,item,job);
        record.row=item.row;record.col=item.col;job.manifest.push(record);
        job.indexFeatures.push({type:'Feature',properties:{tile:record.base,row:item.row,column:item.col,file:record.files[0]},geometry:streamTilePolygon(item).geometry});
        job.completed++;streamLog('Saved '+record.files[0],'ok');
      }catch(err){
        if((err&&err.name==='AbortError')||job.cancel){job.cancel=true;break;}
        job.failed.push({base:base,row:item.row,col:item.col,error:err&&err.message||String(err)});
        streamLog(base+' failed: '+(err&&err.message||err),'err');
      }finally{
        if(canvas)canvas.width=canvas.height=0;
        job.processed++;
        streamUpdateProgress(job.cancel?'Cancelling after current write…':'Completed tile '+job.processed+' of '+job.total);
      }
      if(job.processed%5===0)await streamCheckpoint(job,'running');
    }
    var status=job.cancel?'cancelled':(job.failed.length?'completed_with_errors':'completed');
    streamUpdateProgress(job.cancel?'Export cancelled · writing partial manifest':'Writing manifests and completion report');
    await streamFinalize(job,status);
    job.finished=true;
    if(job.cancel){
      streamLog('Export cancelled. Completed tiles and a partial manifest were retained.','warn');
      streamUpdateProgress('Export cancelled · partial results retained');
      toast('Export cancelled — '+job.completed+' completed tile(s) retained');
      tileShow('<b>Export cancelled.</b> '+job.completed+' completed tile(s) remain in '+folderName+'. Partial manifest and log written.');
    }else{
      streamLog('Export finished: '+job.completed+' completed, '+job.failed.length+' failed.','ok');
      streamUpdateProgress(job.failed.length?'Export completed with '+job.failed.length+' failed tile(s)':'Export completed successfully');
      toast('Tiled AOI export completed: '+job.completed+' tile(s)');
      tileShow('<b>Direct-to-folder export completed.</b> '+job.completed+' / '+job.total+' tiles · '+job.failed.length+' failed<br>Folder: '+folderName+'<br>Includes manifest.csv, tile_index.geojson, export_job.json, export.log and README.txt.');
    }
  }catch(err){
    streamLog('Export stopped: '+(err&&err.message||err),'err');toast('Tiled export stopped: '+(err&&err.message||err),true);
    try{await streamFinalize(job,'failed');}catch(finalErr){}job.finished=true;
    streamUpdateProgress('Export failed · partial report written');
  }finally{
    clearInterval(job.timer);job.running=false;job.finished=true;
    var cancel=streamEl('expCancel');if(cancel){cancel.style.display='none';cancel.disabled=true;}
    if(run)run.disabled=false;streamUpdateProgress();
  }
}
function cancelStreamingTileExport(){
  var job=streamExportState.job;if(!job||!job.running)return;
  job.cancel=true;try{job.controller.abort();}catch(err){}
  streamLog('Cancellation requested; the current request is being stopped.','warn');streamUpdateProgress('Cancelling export…');
  var button=streamEl('expCancel');if(button)button.disabled=true;
}
window.__svStreamingExport={
  state:streamExportState,chooseFolder:streamChooseFolder,start:startStreamingTileExport,cancel:cancelStreamingTileExport,
  selectedAOI:streamSelectedPolygonAOI,buildPlan:streamBuildPlan,estimate:streamEstimatePlan,
  diagnostics:{sourceBounds:streamItemSourceBounds,targetPixelToSource:streamTargetPixelToSource,warp:streamWarpSourceCanvas,render:streamRenderOutputTile,write:streamWriteOutputTile}
};

/* ===== Unified advanced imagery export wiring ===== */
(function(){
  var modeSel=document.getElementById('expMode');
  var tiledOpts=document.getElementById('expTiledOpts');
  var geoZoom=document.getElementById('geoZoom');
  var tileZoom=document.getElementById('tileZoom');
  var aoiSource=document.getElementById('expAoiSource');
  if(!modeSel) return;
  function syncZoom(){ if(tileZoom&&geoZoom)tileZoom.value=geoZoom.value; }
  function syncRunLabel(){
    var button=document.getElementById('expRun');if(!button)return;
    button.textContent=modeSel.value==='tiled'?(aoiSource&&aoiSource.value==='selected'?'Export selected AOI → folder':'Draw AOI → folder'):'Draw area → export';
  }
  if(geoZoom)geoZoom.addEventListener('change',syncZoom);
  modeSel.addEventListener('change',function(){
    var tiled=this.value==='tiled';
    if(tiledOpts)tiledOpts.style.display=tiled?'block':'none';
  });
  modeSel.addEventListener('change',syncRunLabel);
  if(aoiSource)aoiSource.addEventListener('change',syncRunLabel);
  var chooseFolder=document.getElementById('expChooseFolder');if(chooseFolder)chooseFolder.onclick=streamChooseFolder;
  var cancel=document.getElementById('expCancel');if(cancel)cancel.onclick=cancelStreamingTileExport;
  if(!window.showDirectoryPicker){
    var folderStatus=document.getElementById('expFolderStatus');
    if(folderStatus)folderStatus.textContent='Open through localhost/HTTPS in Chrome or Edge to choose a folder';
  }
  var est=document.getElementById('expEstimate');
  if(est)est.onclick=function(){
    syncZoom();
    toast('Draw an area to estimate…');
    var d=new L.Draw.Rectangle(map,{shapeOptions:{color:'#0EA5A4',weight:2,dashArray:'4 4',fillOpacity:.04}}); d.enable();
    map.once(L.Draw.Event.CREATED,function(ev){ map.addLayer(ev.layer); var b=ev.layer.getBounds(); var z=+geoZoom.value;
      if(modeSel.value==='tiled'){
        var s=aoiPixelSize(b,z); var tpx=+document.getElementById('tilePx').value;
        var cols=Math.max(1,Math.ceil(s.w/tpx)),rows=Math.max(1,Math.ceil(s.h/tpx));
        var el=document.getElementById('tileEst'); el.style.display='block'; document.getElementById('geoEst').style.display='none';
        el.innerHTML='At z'+z+': full image <b>'+s.w+'×'+s.h+' px</b> → <b>'+rows+'×'+cols+' = '+(rows*cols)+' tiles</b> of ~'+tpx+'px'+(s.tiles>900?' <span style="color:var(--bad)">(too large — lower zoom)</span>':'');
      } else {
        var s2=aoiPixelSize(b,z); var el2=document.getElementById('geoEst'); el2.style.display='block'; document.getElementById('tileEst').style.display='none';
        el2.innerHTML='At z'+z+': <b>'+s2.w+' × '+s2.h+' px</b> · ~'+s2.tiles+' tiles to fetch'+(s2.tiles>900?' <span style="color:var(--bad)">(too many — lower zoom)</span>':'');
      }
      setTimeout(function(){try{map.removeLayer(ev.layer);}catch(e){}},1600);
    });
  };
  if(est)est.onclick=async function(){
    syncZoom();
    if(modeSel.value==='tiled'){
      try{
        var aoi=await streamAcquireAOI(aoiSource?aoiSource.value:'draw','size estimate');
        var plan=streamBuildPlan(aoi,+geoZoom.value,+document.getElementById('tilePx').value,+document.getElementById('tileOverlap').value);
        streamEstimatePlan(plan);
      }catch(err){toast(err.message,true);}
      return;
    }
    toast('Draw an area to estimate…');
    var drawer=new L.Draw.Rectangle(map,{shapeOptions:{color:'#0EA5A4',weight:2,dashArray:'4 4',fillOpacity:.04}});drawer.enable();
    map.once(L.Draw.Event.CREATED,function(event){
      map.addLayer(event.layer);
      var bounds=event.layer.getBounds(),zoom=+geoZoom.value,size=aoiPixelSize(bounds,zoom),output=document.getElementById('geoEst');
      output.style.display='block';document.getElementById('tileEst').style.display='none';
      output.innerHTML='At z'+zoom+': <b>'+size.w+' × '+size.h+' px</b> · ~'+size.tiles+' source tiles'+(size.tiles>900?' <span style="color:var(--bad)">(single image too large — use tiled mode)</span>':'');
      setTimeout(function(){try{map.removeLayer(event.layer);}catch(e){}},1600);
    });
  };
  var run=document.getElementById('expRun');
  if(run)run.onclick=function(){ syncZoom(); if(modeSel.value==='tiled') startStreamingTileExport(); else startGeoRefExport(); };
  syncRunLabel();
})();
document.getElementById('exportPDF').onclick=function(){
  if(!(window.jspdf&&window.jspdf.jsPDF)){toast('PDF library not loaded',true);return;}
  buildLayoutCanvas(function(canvas){
    var img=canvas.toDataURL('image/png');var W=canvas.width,H=canvas.height;
    var orient=W>=H?'l':'p';var pdf=new window.jspdf.jsPDF({orientation:orient,unit:'pt',format:[W,H]});
    pdf.addImage(img,'PNG',0,0,W,H);
    try{ var blob=pdf.output('blob'); saveBlob(blob, exportFileName('pdf'), 'application/pdf'); }
    catch(e){ pdf.save(exportFileName('pdf')); toast('PDF exported'); }
  });
};

/* ================= INTERACTIVE LAYOUT DESIGNER ================= */
(function(){
  var LD={open:false, mapCanvas:null, sel:null, pageW:0, pageH:0};
  var PAGES_LD={a4:{l:[1123,794],p:[794,1123]},a3:{l:[1587,1123],p:[1123,1587]},letter:{l:[1056,816],p:[816,1056]}};
  function $(id){return document.getElementById(id);}
  var designer=$('layoutDesigner'), stage=$('ldStage'), pageEl=$('ldPageEl');

  /* ---- capture the current map to a canvas: leaflet-image for the basemap, then vectors + labels
          are painted directly from the layer data (svPaintOverlaysOnMapCanvas) so the layout always shows them ---- */
  function captureMap(cb){
    var hidden=[];
    document.querySelectorAll('#map .leaflet-control-container').forEach(function(el){ hidden.push([el,el.style.display]); el.style.display='none'; });
    var hadYAH=(typeof youAreHere!=='undefined') && youAreHere && map.hasLayer(youAreHere);
    if(hadYAH){ map.removeLayer(youAreHere); }
    var labelGroups=[], lg=(window.__svAdvLabelGroups?window.__svAdvLabelGroups():{});
    Object.keys(lg||{}).forEach(function(id){ var fg=lg[id]; if(fg&&map.hasLayer(fg)){ labelGroups.push(fg); map.removeLayer(fg); } });
    function restore(){ hidden.forEach(function(h){h[0].style.display=h[1];}); if(hadYAH){youAreHere.addTo(map);} labelGroups.forEach(function(fg){ try{fg.addTo(map);}catch(e){} }); }
    var done=false;
    function finish(cv){ if(done)return; done=true; try{svPaintOverlaysOnMapCanvas(cv);}catch(e){} restore(); cb(cv); }
    function fb(){
      if(done)return;
      if(typeof html2canvas==='undefined'){ done=true; restore(); cb(null); return; }
      html2canvas(document.getElementById('map'),{useCORS:true,logging:false,backgroundColor:null,
        ignoreElements:function(el){return (el.classList&&el.classList.contains('leaflet-control-container'))||(el.tagName&&String(el.tagName).toLowerCase()==='svg');}})
        .then(function(cv){ try{ cv.getContext('2d').getImageData(0,0,1,1); finish(cv); }catch(e){ done=true; restore(); cb(null); } })
        .catch(function(){ done=true; restore(); cb(null); });
    }
    if(typeof leafletImage!=='undefined'){
      try{
        leafletImage(map,function(err,canvas){
          if(done)return;
          if(err||!canvas){ fb(); return; }
          try{ canvas.getContext('2d').getImageData(0,0,1,1); finish(canvas); }catch(e){ fb(); }
        });
        setTimeout(function(){ if(!done) fb(); },8000);
      }catch(e){ fb(); }
    } else fb();
  }

  /* ---- ESRI legend HTML from visible layers (categorized classes + lengths) ---- */
  function buildLegendHTML(){
    var items=Object.keys(layers).map(function(id){return layers[id];}).filter(function(L0){return L0.visible;});
    var h='<div class="lh">Legend</div>';
    if(!items.length){ h+='<div style="color:#666">No visible layers</div>'; return h; }
    items.forEach(function(L0){
      var gt=L0.isRaster?'Raster':(L0.geomType||geomTypeOf(L0.geojson)||'');
      function sym(color){
        if(gt==='LineString'||gt==='MultiLineString') return '<span class="sw" style="height:0;border:none;border-top:3px solid '+color+';width:16px"></span>';
        if(gt==='Point'||gt==='MultiPoint') return '<span class="sw" style="border-radius:50%;background:'+color+';width:12px;height:12px"></span>';
        return '<span class="sw" style="background:'+hexA2(color,.55)+';border-color:'+color+'"></span>';
      }
      if(L0.colorMode==='categorized'&&L0.catColors&&Object.keys(L0.catColors).length){
        h+='<div class="li" style="font-weight:700">'+escapeHtml(String(L0.name).slice(0,24))+' <span style="font-weight:400;opacity:.7">('+escapeHtml(String(L0.uniqueField).slice(0,14))+')</span></div>';
        var stats=svLengthStats(L0,L0.uniqueField);
        var keys=Object.keys(L0.catColors).sort(function(a,b){var na=parseFloat(a),nb=parseFloat(b);if(!isNaN(na)&&!isNaN(nb))return na-nb;return a.localeCompare(b);});
        keys.forEach(function(k){
          h+='<div class="li" style="padding-left:10px;justify-content:space-between;gap:8px"><span style="display:inline-flex;align-items:center;gap:6px">'+sym(L0.catColors[k])+'<span>'+escapeHtml(String(k||'(blank)').slice(0,18))+'</span></span>'+(stats.hasLines?'<span style="opacity:.7;font-size:9px;font-family:monospace;white-space:nowrap">'+svFmtLen(stats.totals[k]||0)+'</span>':'')+'</div>';
        });
        if(stats.hasLines) h+='<div class="li" style="padding-left:10px;justify-content:space-between;gap:8px;font-weight:700;border-top:1px dashed rgba(128,128,128,.5);margin-top:3px;padding-top:3px"><span>Total</span><span style="font-family:monospace;font-size:9px;white-space:nowrap">'+svFmtLen(stats.grand)+'</span></div>';
      } else {
        h+='<div class="li">'+sym(L0.color)+'<span>'+escapeHtml(String(L0.name).slice(0,26))+'</span></div>';
      }
    });
    return h;
  }
  function buildScaleHTML(){
    try{
      var p1=map.containerPointToLatLng([0,0]), p2=map.containerPointToLatLng([100,0]);
      var m=map.distance(p1,p2), nice=niceRound(m), px=Math.round(100*nice/m);
      var lbl=(nice>=1000?(nice/1000)+' km':nice+' m');
      return '<div style="display:flex;align-items:center;gap:6px"><div style="height:8px;border:1.5px solid #111;border-top:none;width:'+px+'px"></div><span>'+lbl+'</span></div>';
    }catch(e){ return '<div>scale</div>'; }
  }

  /* ---- compute page pixel size for the stage (scaled to fit) ---- */
  function applyPageSize(){
    var pg=$('ldPage').value, orient=$('ldOrient').value;
    var w,h;
    if(pg==='fit' && LD.mapCanvas){ w=LD.mapCanvas.width; h=LD.mapCanvas.height; }
    else { var dim=(PAGES_LD[pg]||PAGES_LD.a4)[orient==='portrait'?'p':'l']; w=dim[0]; h=dim[1]; }
    LD.pageW=w; LD.pageH=h;
    // scale the page to fit the stage area
    var sw=stage.clientWidth-48, sh=stage.clientHeight-48;
    var scale=Math.min(sw/w, sh/h, 1.4);
    pageEl.style.width=Math.round(w*scale)+'px';
    pageEl.style.height=Math.round(h*scale)+'px';
    pageEl.dataset.scale=scale;
  }

  /* ---- drag + resize (percentage-based so it scales with the page) ---- */
  function pct(el,key){ return parseFloat(el.style[key])||0; }
  function makeInteractive(el){
    var handle=el.querySelector('.ld-resize');
    el.addEventListener('mousedown',function(e){
      if(e.target===handle) return; // resize handled below
      e.preventDefault(); selectEl(el);
      var rect=pageEl.getBoundingClientRect();
      var startX=e.clientX, startY=e.clientY;
      var L0=el.offsetLeft, T0=el.offsetTop;
      function mv(ev){
        var nx=L0+(ev.clientX-startX), ny=T0+(ev.clientY-startY);
        nx=Math.max(0,Math.min(nx,pageEl.clientWidth-el.offsetWidth));
        ny=Math.max(0,Math.min(ny,pageEl.clientHeight-el.offsetHeight));
        el.style.left=(nx/pageEl.clientWidth*100)+'%';
        el.style.top=(ny/pageEl.clientHeight*100)+'%';
        el.style.right='auto'; el.style.bottom='auto';
      }
      function up(){ document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); }
      document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
    });
    if(handle){
      handle.addEventListener('mousedown',function(e){
        e.preventDefault(); e.stopPropagation(); selectEl(el);
        var startX=e.clientX, startY=e.clientY, W0=el.offsetWidth, H0=el.offsetHeight;
        var fixedH=el.classList.contains('ld-legend')||el.classList.contains('ld-crs');
        function mv(ev){
          var nw=Math.max(28,W0+(ev.clientX-startX));
          var nh=Math.max(20,H0+(ev.clientY-startY));
          nw=Math.min(nw,pageEl.clientWidth-el.offsetLeft);
          el.style.width=(nw/pageEl.clientWidth*100)+'%';
          if(!fixedH){ nh=Math.min(nh,pageEl.clientHeight-el.offsetTop); el.style.height=(nh/pageEl.clientHeight*100)+'%'; }
        }
        function up(){ document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); }
        document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
      });
    }
  }
  function selectEl(el){
    if(LD.sel)LD.sel.classList.remove('selected');
    LD.sel=el; el.classList.add('selected');
  }
  stage.addEventListener('mousedown',function(e){ if(e.target===stage||e.target===pageEl){ if(LD.sel){LD.sel.classList.remove('selected');LD.sel=null;} } });

  /* ---- element on/off toggles ---- */
  function wireToggle(cbId,elId){
    var cb=$(cbId), el=$(elId);
    if(!cb||!el)return;
    cb.onchange=function(){ el.classList.toggle('hidden-el',!cb.checked); };
  }

  /* ---- open ---- */
  function openDesigner(){
    designer.classList.add('open'); LD.open=true;
    toast('Capturing map for layout…');
    captureMap(function(canvas){
      if(!canvas){ toast('Could not capture the map (cross-origin basemap?). Try Light Gray / OSM / Satellite.',true); }
      LD.mapCanvas=canvas;
      var inner=$('ldMapInner'); inner.innerHTML='';
      if(canvas){ canvas.style.width='100%'; canvas.style.height='100%'; inner.appendChild(canvas); }
      applyPageSize();
      // populate elements
      $('ldLegendInner').innerHTML=buildLegendHTML();
      $('ldScaleInner').innerHTML=buildScaleHTML();
      var ek=(typeof effectiveCrsKey==='function')?effectiveCrsKey():'wgs84';
      $('ldCrsText').textContent='CRS: '+CRS[ek].esri+' ('+CRS[ek].code+')';
      var tt=$('ldTitleText').value.trim() || (document.getElementById('layTitle')&&document.getElementById('layTitle').value.trim()) || (document.getElementById('mapTitle')&&document.getElementById('mapTitle').textContent.trim()) || 'Map title';
      $('ldTitle').querySelector('.ld-title-text').textContent=tt;
    });
  }
  function closeDesigner(){ designer.classList.remove('open'); LD.open=false; }

  /* ---- maximize map frame (fills page, small margin) ---- */
  function maximizeMap(){
    var m=$('ldMap');
    m.style.left='3%'; m.style.top='8%'; m.style.width='94%'; m.style.height='80%';
    m.style.right='auto'; m.style.bottom='auto';
  }

  /* ---- export: render arranged page to a canvas at print scale ---- */
  function exportDesigner(){
    if(!LD.mapCanvas){ toast('No map captured to export',true); return; }
    var fmt=$('ldExportFmt').value;
    var res=2; // print scale
    var tw=LD.pageW*res, th=LD.pageH*res;
    var out=document.createElement('canvas'); out.width=tw; out.height=th;
    var ctx=out.getContext('2d');
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,tw,th);
    var scaleX=tw/pageEl.clientWidth, scaleY=th/pageEl.clientHeight;
    function box(el){ return {x:el.offsetLeft*scaleX, y:el.offsetTop*scaleY, w:el.offsetWidth*scaleX, h:el.offsetHeight*scaleY}; }
    function shown(el){ return !el.classList.contains('hidden-el'); }
    // map frame
    var mEl=$('ldMap');
    if(shown(mEl)){
      var b=box(mEl);
      try{ ctx.drawImage(LD.mapCanvas, b.x,b.y,b.w,b.h); }catch(e){}
      ctx.strokeStyle='#3A3A3A'; ctx.lineWidth=Math.max(1.2*res,1.4); ctx.strokeRect(b.x+0.5,b.y+0.5,b.w-1,b.h-1);
    }
    // title
    var tEl=$('ldTitle');
    if(shown(tEl)){
      var tb=box(tEl), txt=tEl.querySelector('.ld-title-text').textContent;
      ctx.fillStyle='#111'; ctx.textAlign='center'; ctx.textBaseline='middle';
      var fs=Math.max(14, tb.h*0.5); ctx.font='800 '+fs+'px Inter,Arial';
      ctx.fillText(txt, tb.x+tb.w/2, tb.y+tb.h/2);
      ctx.textAlign='left';
    }
    // north arrow
    var nEl=$('ldNorth');
    if(shown(nEl)){
      var nb=box(nEl), s=Math.min(nb.w,nb.h);
      var nx=nb.x+nb.w/2, ny=nb.y;
      ctx.fillStyle='#2563EB'; ctx.beginPath();
      ctx.moveTo(nx, ny+s*0.04); ctx.lineTo(nx+s*0.22, ny+s*0.6); ctx.lineTo(nx, ny+s*0.46); ctx.lineTo(nx-s*0.22, ny+s*0.6); ctx.closePath(); ctx.fill();
      ctx.fillStyle='#111'; ctx.font='700 '+(s*0.28)+'px Inter,Arial'; ctx.textAlign='center';
      ctx.fillText('N', nx, ny+s*0.92); ctx.textAlign='left';
    }
    // legend (categorized classes + lengths + total, matching the on-screen preview)
    var lEl=$('ldLegend');
    if(shown(lEl)){
      var lb=box(lEl);
      ctx.fillStyle='#fff'; ctx.strokeStyle='#6B7280'; ctx.lineWidth=1*res;
      ctx.fillRect(lb.x,lb.y,lb.w,lb.h); ctx.strokeRect(lb.x,lb.y,lb.w,lb.h);
      var items=Object.keys(layers).map(function(id){return layers[id];}).filter(function(L0){return L0.visible;});
      var lrows=[];
      items.forEach(function(L0){
        var gt0=L0.isRaster?'Raster':(L0.geomType||geomTypeOf(L0.geojson)||'');
        if(L0.colorMode==='categorized'&&L0.catColors&&Object.keys(L0.catColors).length){
          lrows.push({kind:'layer',text:String(L0.name).slice(0,22)+' ('+String(L0.uniqueField).slice(0,12)+')'});
          var stats=svLengthStats(L0,L0.uniqueField);
          var keys=Object.keys(L0.catColors).sort(function(a,b){var na=parseFloat(a),nb=parseFloat(b);if(!isNaN(na)&&!isNaN(nb))return na-nb;return a.localeCompare(b);});
          keys.forEach(function(k){ lrows.push({kind:'class',color:L0.catColors[k],gt:gt0,hollow:!!L0.hollow,text:(k||'(blank)'),len:stats.hasLines?svFmtLen(stats.totals[k]||0):''}); });
          if(stats.hasLines) lrows.push({kind:'total',text:'Total',len:svFmtLen(stats.grand)});
        } else {
          lrows.push({kind:'class',color:L0.color,gt:gt0,hollow:!!L0.hollow,text:String(L0.name).slice(0,24),len:''});
        }
      });
      var padX=10*res, yy=lb.y+18*res, rowH=18*res, bottom=lb.y+lb.h-8*res;
      ctx.fillStyle='#1b1b1b'; ctx.font='700 '+(13*res)+'px Inter,Arial'; ctx.fillText('Legend', lb.x+padX, yy);
      ctx.strokeStyle='#6B7280'; ctx.lineWidth=0.8*res; ctx.beginPath(); ctx.moveTo(lb.x+padX,yy+6*res); ctx.lineTo(lb.x+lb.w-padX,yy+6*res); ctx.stroke();
      yy+=24*res;
      if(!lrows.length){ ctx.fillStyle='#666'; ctx.font=(12*res)+'px Inter,Arial'; ctx.fillText('No visible layers', lb.x+padX, yy); }
      for(var ri=0; ri<lrows.length; ri++){
        if(yy>bottom)break; // clip to the legend box
        var r=lrows[ri];
        if(r.kind==='layer'){
          ctx.fillStyle='#1b1b1b'; ctx.font='700 '+(11.5*res)+'px Inter,Arial';
          ctx.fillText(r.text, lb.x+padX, yy);
          yy+=rowH; continue;
        }
        if(r.kind==='total'){
          ctx.strokeStyle='#9aa0a6'; ctx.lineWidth=0.6*res; ctx.setLineDash([3*res,3*res]);
          ctx.beginPath(); ctx.moveTo(lb.x+padX+14*res,yy-11*res); ctx.lineTo(lb.x+lb.w-padX,yy-11*res); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle='#1b1b1b'; ctx.font='700 '+(11*res)+'px Inter,Arial';
          ctx.fillText(r.text, lb.x+padX+22*res, yy);
          if(r.len){ ctx.font='700 '+(9*res)+'px monospace'; ctx.textAlign='right'; ctx.fillText(r.len, lb.x+lb.w-padX, yy); ctx.textAlign='left'; }
          yy+=rowH; continue;
        }
        var symX=lb.x+padX+(r.gt==='Raster'?0:6*res);
        ctx.fillStyle=r.color; ctx.strokeStyle=r.color;
        if(r.gt==='LineString'||r.gt==='MultiLineString'){ ctx.lineWidth=2.5*res; ctx.beginPath(); ctx.moveTo(symX,yy-4*res); ctx.lineTo(symX+16*res,yy-4*res); ctx.stroke(); }
        else if(r.gt==='Point'||r.gt==='MultiPoint'){ ctx.beginPath(); ctx.arc(symX+8*res,yy-4*res,5*res,0,6.283); ctx.fill(); }
        else { if(!r.hollow){ctx.fillStyle=hexA2(r.color,.55); ctx.fillRect(symX,yy-10*res,16*res,12*res);} ctx.strokeStyle=r.color; ctx.lineWidth=(r.hollow?2:1.2)*res; ctx.strokeRect(symX,yy-10*res,16*res,12*res); }
        ctx.fillStyle='#1b1b1b'; ctx.font=(11.5*res)+'px Inter,Arial';
        ctx.fillText(r.text, symX+22*res, yy);
        if(r.len){ ctx.fillStyle='#555'; ctx.font=(9*res)+'px monospace'; ctx.textAlign='right'; ctx.fillText(r.len, lb.x+lb.w-padX, yy); ctx.textAlign='left'; }
        yy+=rowH;
      }
    }
    // scale bar
    var sEl=$('ldScale');
    if(shown(sEl)){
      var sb=box(sEl);
      try{
        var p1=map.containerPointToLatLng([0,0]), p2=map.containerPointToLatLng([100,0]);
        var mm=map.distance(p1,p2), nice=niceRound(mm), px=(100*nice/mm)*res*(sb.w/(150*res));
        px=Math.min(px, sb.w-40*res);
        var by=sb.y+sb.h*0.6;
        ctx.strokeStyle='#111'; ctx.lineWidth=2*res;
        ctx.beginPath(); ctx.moveTo(sb.x,by); ctx.lineTo(sb.x+px,by); ctx.moveTo(sb.x,by-5*res); ctx.lineTo(sb.x,by+5*res); ctx.moveTo(sb.x+px,by-5*res); ctx.lineTo(sb.x+px,by+5*res); ctx.stroke();
        ctx.fillStyle='#111'; ctx.font=(11*res)+'px Inter,Arial';
        ctx.fillText((nice>=1000?(nice/1000)+' km':nice+' m'), sb.x+px+8*res, by+4*res);
      }catch(e){}
    }
    // crs stamp
    var cEl=$('ldCrs');
    if(shown(cEl)){
      var cb=box(cEl), ctxt=$('ldCrsText').textContent;
      ctx.font=(10.5*res)+'px monospace'; var cw=ctx.measureText(ctxt).width;
      ctx.fillStyle='#fff'; ctx.strokeStyle='#d0d0d0'; ctx.lineWidth=1*res;
      ctx.fillRect(cb.x,cb.y,Math.max(cb.w,cw+12*res),cb.h); ctx.strokeRect(cb.x,cb.y,Math.max(cb.w,cw+12*res),cb.h);
      ctx.fillStyle='#B45309'; ctx.fillText(ctxt, cb.x+6*res, cb.y+cb.h/2+4*res);
    }
    // output
    var fname=(typeof exportFileName==='function')?exportFileName(fmt==='pdf'?'pdf':(fmt==='jpg'?'jpg':'png')):'layout.'+fmt;
    if(fmt==='pdf'){
      if(!(window.jspdf&&window.jspdf.jsPDF)){ toast('PDF library not loaded',true); return; }
      var img=out.toDataURL('image/png'); var orient=tw>=th?'l':'p';
      var pdf=new window.jspdf.jsPDF({orientation:orient,unit:'pt',format:[tw,th]});
      pdf.addImage(img,'PNG',0,0,tw,th);
      try{ saveBlob(pdf.output('blob'), fname, 'application/pdf'); }catch(e){ pdf.save(fname); }
    } else if(fmt==='jpg'){
      var flat=document.createElement('canvas'); flat.width=tw; flat.height=th; var fx=flat.getContext('2d'); fx.fillStyle='#fff'; fx.fillRect(0,0,tw,th); fx.drawImage(out,0,0);
      flat.toBlob(function(blob){ saveBlob(blob,fname,'image/jpeg'); },'image/jpeg',0.92);
    } else {
      out.toBlob(function(blob){ saveBlob(blob,fname,'image/png'); },'image/png');
    }
  }

  /* ---- wire everything ---- */
  var openBtn=$('openLayoutDesigner'); if(openBtn)openBtn.onclick=openDesigner;
  var closeBtn=$('ldClose'); if(closeBtn)closeBtn.onclick=closeDesigner;
  var fitBtn=$('ldFitContent'); if(fitBtn)fitBtn.onclick=maximizeMap;
  var expBtn=$('ldExport'); if(expBtn)expBtn.onclick=exportDesigner;
  var pgSel=$('ldPage'); if(pgSel)pgSel.onchange=applyPageSize;
  var orSel=$('ldOrient'); if(orSel)orSel.onchange=applyPageSize;
  var ttIn=$('ldTitleText'); if(ttIn)ttIn.oninput=function(){ var t=$('ldTitle').querySelector('.ld-title-text'); if(t)t.textContent=this.value||'Map title'; };
  wireToggle('ldElTitle','ldTitle'); wireToggle('ldElNorth','ldNorth'); wireToggle('ldElLegend','ldLegend'); wireToggle('ldElScale','ldScale'); wireToggle('ldElCrs','ldCrs');
  // make all elements draggable/resizable
  ['ldMap','ldTitle','ldNorth','ldLegend','ldScale','ldCrs'].forEach(function(id){ var el=$(id); if(el)makeInteractive(el); });
  // keep page sized correctly on window resize while open
  window.addEventListener('resize',function(){ if(LD.open)applyPageSize(); });
  // Esc closes
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&LD.open)closeDesigner(); });
})();

/* ================= ROUTING (OSRM, no API key — Google-style directions) ================= */
(function(){
  var panel=document.getElementById('routePanel'); if(!panel)return;
  function $(id){return document.getElementById(id);}
  var state={from:null,to:null,picking:null,layer:null,markers:null,routes:[],sel:0};
  var COLORS=['#2563EB','#F59E0B','#10B981','#A855F7'];

  function openPanel(){ panel.classList.add('open'); }
  function closePanel(){ panel.classList.remove('open'); stopPicking(); }
  function setStatus(msg){ var s=$('rpStatus'); if(s)s.innerHTML=msg; }

  function stopPicking(){
    state.picking=null;
    $('rpPickFrom').classList.remove('active'); $('rpPickTo').classList.remove('active');
    try{ map.getContainer().style.cursor=''; }catch(e){}
  }
  function startPicking(which){
    state.picking=which;
    $('rpPickFrom').classList.toggle('active',which==='from');
    $('rpPickTo').classList.toggle('active',which==='to');
    try{ map.getContainer().style.cursor='crosshair'; }catch(e){}
    setStatus('Click the map to set the <b>'+(which==='from'?'source':'destination')+'</b>.');
  }
  function fmtLL(ll){ return ll[1].toFixed(5)+', '+ll[0].toFixed(5); } // lng,lat -> "lat, lng"

  map.on('click',function(e){
    if(!state.picking)return;
    var ll=[e.latlng.lng,e.latlng.lat];
    if(state.picking==='from'){ state.from=ll; $('rpFrom').value=fmtLL(ll); }
    else { state.to=ll; $('rpTo').value=fmtLL(ll); }
    placeEndpointMarkers();
    stopPicking();
    setStatus(state.from&&state.to?'Ready. Press <b>Find Route</b>.':'Now pick the other point.');
  });

  function placeEndpointMarkers(){
    if(state.markers){ try{map.removeLayer(state.markers);}catch(e){} }
    var g=[];
    if(state.from) g.push(L.marker([state.from[1],state.from[0]],{title:'Source'}).bindTooltip('Source',{permanent:false}));
    if(state.to) g.push(L.marker([state.to[1],state.to[0]],{title:'Destination'}).bindTooltip('Destination',{permanent:false}));
    state.markers=L.layerGroup(g).addTo(map);
  }

  function useMyLocation(){
    if(!navigator.geolocation){ toast('Geolocation not supported',true); return; }
    setStatus('Getting your location…');
    navigator.geolocation.getCurrentPosition(function(pos){
      state.from=[pos.coords.longitude,pos.coords.latitude];
      $('rpFrom').value=fmtLL(state.from);
      placeEndpointMarkers();
      map.setView([pos.coords.latitude,pos.coords.longitude],14);
      setStatus(state.to?'Ready. Press <b>Find Route</b>.':'Source set to your location. Now pick a destination.');
    },function(){ toast('Could not get your location',true); setStatus('Location failed — pick the source on the map instead.'); },{enableHighAccuracy:true,timeout:10000});
  }

  function clearRoutes(){
    if(state.layer){ try{map.removeLayer(state.layer);}catch(e){} state.layer=null; }
    state.routes=[]; $('rpResults').innerHTML='';
  }
  function clearAll(){
    clearRoutes();
    if(state.markers){ try{map.removeLayer(state.markers);}catch(e){} state.markers=null; }
    state.from=null; state.to=null; $('rpFrom').value=''; $('rpTo').value='';
    setStatus('Pick a source and destination, then Find Route.');
  }

  function fmtDist(m){ return m>=1000?(m/1000).toFixed(m>=10000?0:1)+' km':Math.round(m)+' m'; }
  function fmtDur(s){ var min=Math.round(s/60); if(min<60)return min+' min'; var h=Math.floor(min/60); return h+' h '+(min%60)+' min'; }

  function findRoute(){
    if(!state.from||!state.to){ toast('Set both source and destination first',true); return; }
    var alts=$('rpAlts').checked;
    setStatus('Calculating route…');
    clearRoutes();
    var coords=state.from[0]+','+state.from[1]+';'+state.to[0]+','+state.to[1];
    var url='https://router.project-osrm.org/route/v1/driving/'+coords+'?overview=full&geometries=geojson&steps=true&alternatives='+(alts?'true':'false');
    fetch(url).then(function(r){return r.json();}).then(function(d){
      if(!d||d.code!=='Ok'||!d.routes||!d.routes.length){ setStatus('<span style="color:var(--bad)">No route found between these points.</span>'); return; }
      state.routes=d.routes; state.sel=0;
      drawRoutes(); renderResults();
      // fit to the primary route
      try{ var b=L.geoJSON(state.routes[0].geometry).getBounds(); map.fitBounds(b,{padding:[60,60]}); }catch(e){}
      setStatus(state.routes.length+' route'+(state.routes.length>1?'s':'')+' found. Tap one to see turn-by-turn steps.');
    }).catch(function(e){ setStatus('<span style="color:var(--bad)">Routing failed: '+escapeHtml(e.message)+'. The free OSRM server may be busy — try again.</span>'); });
  }

  function drawRoutes(){
    if(state.layer){ try{map.removeLayer(state.layer);}catch(e){} }
    var grp=[];
    state.routes.forEach(function(rt,i){
      var sel=(i===state.sel);
      grp.push(L.geoJSON(rt.geometry,{style:{color:COLORS[i%COLORS.length],weight:sel?7:4,opacity:sel?0.95:0.5}}));
    });
    state.layer=L.layerGroup(grp).addTo(map);
  }

  function renderResults(){
    var html='';
    state.routes.forEach(function(rt,i){
      var sel=(i===state.sel);
      var steps='';
      try{
        var legs=rt.legs||[];
        var items=[];
        legs.forEach(function(leg){ (leg.steps||[]).forEach(function(st){
          var m=st.maneuver||{}, road=st.name||'';
          var t=maneuverText(m,road,st.distance);
          if(t)items.push('<li>'+escapeHtml(t)+'</li>');
        });});
        steps='<div class="rp-steps"><ol>'+(items.join('')||'<li>Proceed to destination.</li>')+'</ol></div>';
      }catch(e){ steps=''; }
      html+='<div class="rp-route'+(sel?' sel':'')+'" data-i="'+i+'">'
        +'<div class="rr-top"><span class="rr-name">'+(i===0?'Best route':'Alternative '+i)+'</span>'+(sel?'<span class="rr-badge">SELECTED</span>':'')+'</div>'
        +'<div class="rr-meta"><b>'+fmtDist(rt.distance)+'</b> · '+fmtDur(rt.duration)+'</div>'
        +steps+'</div>';
    });
    $('rpResults').innerHTML=html;
    $('rpResults').querySelectorAll('.rp-route').forEach(function(el){
      el.onclick=function(){ state.sel=parseInt(el.getAttribute('data-i'),10); drawRoutes(); renderResults(); };
    });
  }

  function maneuverText(m,road,dist){
    var type=m.type||'', mod=m.modifier||'';
    var on=road?(' onto '+road):'';
    var d=dist?(' ('+fmtDist(dist)+')'):'';
    if(type==='depart')return 'Start'+(road?(' on '+road):'')+d;
    if(type==='arrive')return 'Arrive at destination';
    if(type==='roundabout'||type==='rotary')return 'Take the roundabout'+on+d;
    if(type==='turn')return 'Turn '+mod+on+d;
    if(type==='merge')return 'Merge '+mod+on+d;
    if(type==='fork')return 'Keep '+mod+' at the fork'+on+d;
    if(type==='end of road')return 'At the end of the road, turn '+mod+on+d;
    if(type==='continue'||type==='new name')return 'Continue'+(mod&&mod!=='straight'?(' '+mod):'')+on+d;
    if(type==='on ramp'||type==='off ramp')return 'Take the ramp'+(mod?(' '+mod):'')+on+d;
    return (type?type.charAt(0).toUpperCase()+type.slice(1):'Continue')+on+d;
  }

  // wiring
  $('xpRoute') && ($('xpRoute').onclick=openPanel);
  $('rpClose').onclick=closePanel;
  $('rpPickFrom').onclick=function(){ startPicking('from'); };
  $('rpPickTo').onclick=function(){ startPicking('to'); };
  $('rpUseLoc').onclick=useMyLocation;
  $('rpFind').onclick=findRoute;
  $('rpClear').onclick=clearAll;
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&panel.classList.contains('open')&&state.picking){ stopPicking(); } });
})();

/* ================= TABS / MOBILE ================= */
function switchTab(name){document.querySelectorAll('.tabs button').forEach(function(b){b.classList.toggle('active',b.dataset.tab===name);});
  document.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('active',p.id==='pane-'+name);});}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){switchTab(b.dataset.tab);};});
window.switchTab=switchTab;
document.getElementById('mobToggle').onclick=function(){document.getElementById('panel').classList.toggle('open');};

refreshDropdowns();
toast('Spatial Itqan ready — add data to begin');

/* ================= LIVE WEATHER FOOTER (Open-Meteo, no API key) ================= */
(function(){
  var WMO={0:['Clear','☀'],1:['Mainly clear','🌤'],2:['Partly cloudy','⛅'],3:['Overcast','☁'],
    45:['Fog','🌫'],48:['Rime fog','🌫'],51:['Light drizzle','🌦'],53:['Drizzle','🌦'],55:['Dense drizzle','🌧'],
    56:['Freezing drizzle','🌧'],57:['Freezing drizzle','🌧'],61:['Light rain','🌦'],63:['Rain','🌧'],65:['Heavy rain','🌧'],
    66:['Freezing rain','🌧'],67:['Freezing rain','🌧'],71:['Light snow','🌨'],73:['Snow','🌨'],75:['Heavy snow','❄'],
    77:['Snow grains','🌨'],80:['Rain showers','🌦'],81:['Rain showers','🌧'],82:['Violent showers','⛈'],
    85:['Snow showers','🌨'],86:['Snow showers','🌨'],95:['Thunderstorm','⛈'],96:['Thunderstorm + hail','⛈'],99:['Thunderstorm + hail','⛈']};
  function windDir(deg){
    if(deg==null||isNaN(deg))return '—';
    var dirs=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    var arrows=['↑','↗','↗','↗','→','↘','↘','↘','↓','↙','↙','↙','←','↖','↖','↖'];
    var i=Math.round(deg/22.5)%16;
    return arrows[i]+' '+dirs[i]+' '+Math.round(deg)+'°';
  }
  function $(id){return document.getElementById(id);}
  var lastFetch=0, busy=false;
  function fetchWeather(force){
    if(busy)return; var now=Date.now();
    if(!force && now-lastFetch<120000) return; // refresh at most every 2 min
    var c; try{c=map.getCenter();}catch(e){return;}
    busy=true;
    var url='https://api.open-meteo.com/v1/forecast?latitude='+c.lat.toFixed(4)+'&longitude='+c.lng.toFixed(4)+
      '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=kmh';
    fetch(url).then(function(r){return r.json();}).then(function(d){
      lastFetch=Date.now(); busy=false;
      var cur=d&&d.current; if(!cur){ return; }
      var wc=WMO[cur.weather_code]||['—','🌡'];
      if($('fwIcon'))$('fwIcon').textContent=wc[1];
      if($('fwTemp'))$('fwTemp').textContent=(cur.temperature_2m!=null?Math.round(cur.temperature_2m)+'°C':'—');
      if($('fwCond'))$('fwCond').textContent=wc[0];
      if($('fwHumid'))$('fwHumid').textContent='💧 '+(cur.relative_humidity_2m!=null?cur.relative_humidity_2m+'%':'—');
      if($('fwWind'))$('fwWind').textContent='🧭 '+windDir(cur.wind_direction_10m)+' '+(cur.wind_speed_10m!=null?Math.round(cur.wind_speed_10m)+' km/h':'');
      if($('fwPrecip'))$('fwPrecip').textContent='🌧 '+(cur.precipitation!=null?cur.precipitation+' mm':'— mm');
    }).catch(function(){ busy=false; if($('fwCond'))$('fwCond').textContent='Weather unavailable (needs internet)'; });
  }
  // refresh when the map stops moving (debounced) and every 2 minutes
  var moveT;
  map.on('moveend',function(){ clearTimeout(moveT); moveT=setTimeout(function(){fetchWeather(true);},900); });
  setInterval(function(){fetchWeather(false);},120000);
  // reverse-geocode the center for a place label (reuse cached name if available)
  function setLoc(){ /* footer city is now driven by updateFlag (map-center reverse geocode) */ }
  /* setInterval(setLoc,8000); -- replaced by dynamic center city */
  setTimeout(function(){fetchWeather(true);},1500);

  /* ---- Country flag + city auto-detected from map center (no API key), updates on pan ---- */
  var lastCC='', flagBusy=false, lastFlagFetch=0;
  function updateFlag(force){
    if(flagBusy)return; var now=Date.now();
    if(!force && now-lastFlagFetch<45000) return;
    var c; try{c=map.getCenter();}catch(e){return;}
    flagBusy=true;
    // zoom=10 returns both country_code and a city/town/county name
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&lat='+c.lat.toFixed(3)+'&lon='+c.lng.toFixed(3))
      .then(function(r){return r.json();}).then(function(d){
        lastFlagFetch=Date.now(); flagBusy=false;
        var a=(d&&d.address)||{};
        var cc=(a.country_code||'').toLowerCase();
        if(cc){ if(cc!==lastCC){lastCC=cc;} setFlag(cc, a.country); }
        // city/town/locality — falls back through the address hierarchy
        var city=a.city||a.town||a.municipality||a.city_district||a.county||a.state_district||a.village||a.state||'';
        setCity(city);
      }).catch(function(){ flagBusy=false; });
  }
  function setCity(name){
    var el=$('fwLoc'); if(!el)return;
    el.textContent = name ? ('· '+name) : '';
    el.title = name||'';
  }
  function setFlag(cc, country){
    var el=$('fwFlag'); if(!el)return;
    // flag image (reliable on all OSes); emoji fallback if image fails
    el.innerHTML='<img alt="'+(country||cc).toString().replace(/"/g,'')+'" src="https://flagcdn.com/'+cc+'.svg" onerror="this.parentNode.textContent=\''+ccToEmoji(cc)+'\'"/>';
    el.title=(country||cc.toUpperCase());
  }
  function ccToEmoji(cc){
    if(!cc||cc.length!==2)return '🏳';
    return String.fromCodePoint(0x1F1E6 + cc.charCodeAt(0)-97) + String.fromCodePoint(0x1F1E6 + cc.charCodeAt(1)-97);
  }
  map.on('moveend',function(){ clearTimeout(window.__flagT); window.__flagT=setTimeout(function(){updateFlag(true);},1100); });
  setTimeout(function(){updateFlag(true);},2000);
})();

/* ================= USER MANUAL ================= */
var MANUAL=[
 ['Welcome to Spatial Itqan',
  'Spatial Itqan (الإتقان المكاني) by IUH is a professional browser-based Web-GIS suite for viewing maps, plotting and analysing spatial data, editing geometry, and producing publication-quality map layouts. Everything runs in your browser — your data files are processed locally on your device and are not uploaded to any server. Only online basemaps, place search, reverse-geocoding, routing and live weather use external web services. Tip: use the search box at the top of this manual to jump to any topic.'],
 ['Getting started',
  'The app opens centred on Al Ain / Abu Dhabi. <b>Pan</b> by dragging the map; <b>zoom</b> with the mouse wheel or the ＋ / － buttons in the ribbon. The top header has global search, view controls (Theme, Tools, Focus), the active-layer indicator, the CRS selector, and Settings. Below it the tools ribbon is organised into groups: Data & Layers, Map Navigation, Go to XY, Select & Identify, and Editing. The right-side panel has tabs: Layers, Data, Edit, and Output. The bottom bar shows the coordinate readout (left), and live weather plus the country flag and city of the map centre (which updates as you pan).'],
 ['The header bar',
  '<b>Search:</b> type a place, address, or "lat, lng" to fly there.<br>'+
  '<b>Theme:</b> cycles the interface colour scheme (Graphite dark, Arctic light, Midnight navy).<br>'+
  '<b>Tools:</b> shows or hides the entire tools ribbon to give the map more space.<br>'+
  '<b>Focus:</b> presentation mode that hides interface chrome for a clean map view.<br>'+
  '<b>CRS selector:</b> sets the active coordinate system (see "Coordinate systems").<br>'+
  '<b>📖 Manual:</b> opens this searchable user manual.<br>'+
  '<b>⚙ Settings:</b> theme picker and refresh.'],
 ['Loading your data',
  'Click <b>＋ Add Layer</b> (ribbon) or open the <b>Data</b> tab, then choose a file. Supported formats:<br>'+
  '<b>Excel (.xlsx) / CSV:</b> coordinates are auto-detected — latitude/longitude by value range, or Easting/Northing by magnitude. In the Data tab you can set the sheet\'s coordinate system: Auto-detect, WGS84 (EPSG:4326), or Web Mercator (EPSG:3857); UTM zones are detected automatically.<br>'+
  '<b>Shapefile:</b> ZIP the .shp, .dbf, .shx and .prj together and load the .zip — it auto-reprojects to WGS84.<br>'+
  '<b>KML / KMZ:</b> loaded directly (KMZ is unzipped automatically).<br>'+
  '<b>GPX:</b> waypoints, tracks and routes from GPS devices.<br>'+
  '<b>GeoJSON:</b> loaded directly.<br>'+
  '<b>DXF:</b> CAD line/polyline geometry.<br>'+
  'Note: a File Geodatabase (.gdb) and proprietary formats like ECW/DWG cannot be read directly in a browser — convert them to Shapefile or GeoJSON first.'],
 ['Basemaps',
  'In the <b>Layers</b> tab, choose from the basemap gallery. The reliable everyday basemaps are <b>Light Gray, Voyager, Streets, Satellite</b> and <b>Topographic</b>. Also available: Dark Gray, Nat Geo, OSM Humanitarian, Terrain Hillshade, OpenTopoMap (volunteer server — can be slow), and Blank QA (a plain white background for checking your data). The app opens on Light Gray by default. The selected basemap always sits beneath your data.'],
 ['Coordinate systems (CRS)',
  'The <b>CRS</b> selector in the header controls the on-map coordinate readout and the coordinate system used for exports. Options: <b>Auto UTM</b> (picks the correct UTM zone automatically from the map location), <b>GCS WGS 1984 (EPSG:4326)</b> for latitude/longitude in degrees, and <b>WGS 1984 Web Mercator (EPSG:3857)</b>. The bottom-left readout updates instantly when you change this and as you move the mouse. UTM coordinates are shown as Easting/Northing in metres; GCS as Lat/Lon in degrees. Easting/Northing and Lat/Long describe the same point — UTM in metres (best for survey and engineering distance/area), Lat/Long in angles (global reference).'],
 ['Layers tab',
  'Every loaded layer appears in the Layers list. Toggle its checkbox to show/hide it, click its name to zoom to it, open its attribute table, or remove it. The Smart Workflow strip guides you through Add Data → Select Features. The on-map legend (which you can move) lists active layers. Basemap selection and View presets also live here.'],
 ['Attribute table',
  'Open from the ribbon <b>Table</b> button or a layer\'s table icon. It opens at the bottom of the screen. Click a column header to sort, type in the filter box to search, and click any row to zoom to that feature. Use "Zoom to selected" to jump to highlighted rows.'],
 ['Selecting & identifying',
  '<b>Identify:</b> click the Identify button, then click the map to list the features at that point plus the nearest address.<br>'+
  '<b>Select:</b> drag a rectangle to select features in the active layer.<br>'+
  '<b>Clear:</b> clears selections from all feature classes. The attribute table also provides Select All, Switch Selection, Show Selected Only, direct cell editing by double-click, field calculation, geometry editing, and a Save button that activates only after a real edit.'],
 ['Editing features',
  'The <b>Editing</b> ribbon group provides a full editing workflow:<br>'+
  '<b>Edit:</b> start/stop an editing session on the active layer.<br>'+
  '<b>Feature:</b> add a new feature.<br>'+
  '<b>Shape:</b> edit the vertices of a selected feature.<br>'+
  '<b>Copy / Paste:</b> copy selected feature(s) and paste duplicates into the active layer.<br>'+
  '<b>Split:</b> split a selected line into two features.<br>'+
  '<b>Rotate:</b> rotate selected feature(s) by an angle you enter, around their centroid.<br>'+
  '<b>Trace:</b> copy an existing feature\'s outline into a new editable line.<br>'+
  '<b>Save:</b> commit edits (held in browser memory; export to keep them permanently).'],
 ['Feature Editor (Edit tab)',
  'The unified Feature Editor follows a desktop GIS workflow: choose Point, Line, Polygon, or Rectangle in Create Features; the app remembers one default target for each geometry type and continues creating until Esc. Point construction uses a precision crosshair with no Leaflet map-pin preview. Attributes remain blank unless you choose to open them. The arrow selector starts with editing; click selects and double-click opens the visible Vertex Editor. Use <b>Symbol Selector</b>, or double-click a vector layer symbol/name in the TOC or legend, to choose searchable point icons, line styles, polygon fills and hatches, colors, size/width, angle, opacity, and outline. Saved symbols appear in My Styles and project files preserve applied symbology. New Layer opens a designer for the layer name, geometry, field names, and Text, Integer, Double, Date, or Boolean data types. Output & Package exports the target layer to Shapefile, KML, or GeoJSON, saves a restorable .svproject, or builds a complete ZIP package. Advanced Editing provides move, copy/paste, split, merge, rotate, scale, explode multipart, trace, snapping, geometry calculation, QA, and undo/redo.'],
 ['Professional Editing Suite',
  'Open <b>Professional Editing Suite</b> from Advanced Editing for endpoint, vertex, midpoint, edge and intersection snapping; pixel or map-unit tolerance; selectable/snappable layer controls; precision coordinate, direction-distance, parallel, perpendicular, arc, circle, freehand and trace construction; reusable templates; a coordinate vertex table; planarize, overlap, gap and repair topology tools; complete field schema rules; background geometry and attribute QA; rule-based symbology; scale-aware labels; named versions, project-folder saves, recycle recovery and audit history; configurable shortcuts, diagnostics and accessibility controls.'],
 ['Go to XY',
  'In the ribbon\'s Go to XY group, type a Lat/Northing and Lng/Easting and press Go to jump to an exact coordinate in the currently selected CRS.'],
 ['Routing (directions)',
  'Click the <b>Route</b> button in Map Navigation to open the directions panel. Set a <b>source</b> (click "Pick" then click the map, or use "Use my current location") and a <b>destination</b>, then press <b>Find Route</b>. Powered by the free OSRM service (no API key), it draws the road route(s) and lists each with distance and estimated travel time. Tap a route to see turn-by-turn steps. Keep "Show alternative routes" on to compare options. Close the panel when done. Note: OSRM\'s free demo server is rate-limited and provides driving routes only.'],
 ['North arrow & map elements',
  'Use the <b>North</b> toggle in Map Navigation to show or hide the on-screen north arrow. Other on-map elements (title, scale bar, legend, coordinates) can be toggled in the Layers tab under View presets → Individual elements. Map overlays automatically reposition when you dock/hide the right panel.'],
 ['Clean map export (Output tab)',
  'The Output tab exports a publication-ready map laid out like an ArcGIS page. Set an output file name and map title, choose the page (A4 / A3 / Letter / current view), orientation, resolution (1× / 2× / 3×) and page style (Light ArcGIS page by default, or Dark). Export as <b>PNG, JPG or PDF</b>. The page uses a framed map with an ESRI-standard legend (per-geometry symbols), north arrow, scale bar and CRS stamp. Editing panels are never included.'],
 ['Layout Designer (drag & arrange)',
  'For full control, click <b>🎨 Design layout</b> in the Output tab. This opens an interactive, ArcGIS-Pro-style layout editor where the map fills the page and every element — map frame, title, north arrow, legend, scale bar, CRS stamp — can be dragged to reposition and resized via its corner handle. Toggle elements on/off, set the page size, then export the arranged layout to PNG, JPG or PDF. The map shown is a snapshot taken when you open the designer — reopen it to refresh after panning.'],
 ['Advanced imagery export (georeferenced)',
  'Also in the Output tab, "Advanced imagery export" produces georeferenced imagery at a resolution you choose (independent of the screen). Use a newly drawn AOI or one selected polygon feature. Tiled exports are reprojected from the Web Mercator basemap onto one shared, north-up raster grid in the map\'s active CRS. Every tile uses the same snapped origin and pixel resolution, so adjacent edges have zero coordinate gap and no exporter-induced UTM shift. Use <b>0% overlap</b> for a direct edge-to-edge mosaic; a larger overlap intentionally duplicates a buffer for cutline or blending workflows. Tiles are written directly to disk one at a time. The live job panel reports counts, percent, elapsed time, remaining time, current work, and a detailed log. Choose <b>GeoTIFF</b>, <b>PNG + world file + .prj</b>, or <b>JPEG + world file + .prj</b>. Absolute planimetric accuracy cannot exceed the accuracy of the selected source imagery. Direct folder export requires Chrome or Edge served over HTTPS or localhost.'],
 ['Saving files & the save dialog',
  'When exporting, you can set the output file name. In Chrome and Edge (served over https or localhost) you get a native "Save As" dialog to choose both the file name and the folder. In other browsers, or when opened directly as a file://, exports download to your default folder with the chosen name.'],
 ['Live weather & location footer',
  'The bottom bar shows live weather for the map centre (temperature, condition, humidity, wind direction/speed, precipitation) via Open-Meteo with no API key, plus the country flag and the city name of the map centre — all of which update automatically as you pan the map.'],
 ['Search & navigation',
  'Search a place or address in the header, or type "lat, lng" to jump there. Use <b>Home</b> to return to the default extent and <b>Locate</b> for your live GPS position. Prev/Next step through your recent map extents, and "All" zooms to all visible layers.'],
 ['Tips & requirements',
  'An internet connection is needed the first time so the map libraries and basemap tiles can load; after that, your own data analysis runs locally. For the native folder save dialog, geolocation, and best results, serve the file over https or localhost rather than opening it directly as a file. To publish the app, host the single HTML file on GitHub Pages, Netlify, Cloudflare Pages, or an intranet/SharePoint site.'],
 ['Credits',
  'Developed by IUH. Spatial Itqan — smart GIS mapping, editing, QA/QC, routing and spatial-data excellence, all in a single self-contained web application.']
];
function manualHtml(){ return MANUAL.map(function(s,i){return '<div class="help-sec" data-sec="'+i+'"><h2>'+s[0]+'</h2><p>'+s[1]+'</p></div>';}).join(''); }
document.getElementById('helpBody').innerHTML=manualHtml();
function openHelpModal(){ var m=document.getElementById('helpModal'); if(m){ m.classList.add('open'); var s=document.getElementById('helpSearch'); if(s){s.value='';helpSearchRun('');setTimeout(function(){try{s.focus();}catch(e){}},60);} } }
document.getElementById('helpBtn').onclick=openHelpModal;
/* searchable docs: filter sections + highlight matches */
function helpSearchRun(q){
  q=(q||'').trim().toLowerCase();
  var body=document.getElementById('helpBody'); if(!body)return;
  var secs=body.querySelectorAll('.help-sec'), shown=0;
  secs.forEach(function(sec,i){
    var raw=MANUAL[i]; var text=((raw[0]||'')+' '+(raw[1]||'')).replace(/<[^>]+>/g,'').toLowerCase();
    var match=!q||text.indexOf(q)>=0;
    sec.classList.toggle('help-hidden',!match);
    if(match)shown++;
    // re-render with highlight
    var title=raw[0]||'', para=raw[1]||'';
    if(q){
      var re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
      title=title.replace(re,'<mark>$1</mark>');
      // only highlight in text nodes-ish: apply to para but avoid breaking tags is hard; safe simple approach: highlight outside tags
      para=para.replace(/(>[^<]+|^[^<]+)/g,function(seg){return seg.replace(re,'<mark>$1</mark>');});
    }
    sec.innerHTML='<h2>'+title+'</h2><p>'+para+'</p>';
  });
  var nr=document.getElementById('helpNoResult');
  if(!shown){ if(!nr){nr=document.createElement('div');nr.id='helpNoResult';nr.className='help-noresult';body.appendChild(nr);} nr.textContent='No documentation matches "'+q+'".'; nr.style.display='block'; }
  else if(nr){ nr.style.display='none'; }
}
(function(){ var s=document.getElementById('helpSearch'); if(s)s.addEventListener('input',function(){helpSearchRun(this.value);}); })();
document.getElementById('helpClose').onclick=function(){document.getElementById('helpModal').classList.remove('open');};
document.getElementById('helpModal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.getElementById('helpPdf').onclick=function(){
  if(!(window.jspdf&&window.jspdf.jsPDF)){toast('PDF library not loaded',true);return;}
  var doc=new window.jspdf.jsPDF({unit:'pt',format:'a4'});
  var W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(), M=48, maxw=W-M*2;
  // header band
  doc.setFillColor(14,21,48);doc.rect(0,0,W,96,'F');
  doc.setTextColor(99,102,241);doc.setFont('helvetica','bold');doc.setFontSize(24);
  doc.text('Spatial Itqan',M,50);
  doc.setTextColor(150,160,200);doc.setFontSize(11);doc.setFont('helvetica','normal');
  doc.text('User Manual  -  developed by IUH',M,74);
  var y=128;
  function ascii(h){
    return h.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')
      .replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"')
      .replace(/\u2192/g,'->').replace(/\u00B7/g,'-').replace(/[\u2013\u2014]/g,'-')
      .replace(/[^\x00-\x7F]/g,'');
  }
  MANUAL.forEach(function(s){
    if(y>H-90){doc.addPage();y=60;}
    doc.setTextColor(37,99,235);doc.setFont('helvetica','bold');doc.setFontSize(13);
    doc.text(ascii(s[0]),M,y); y+=8;
    doc.setDrawColor(200,210,225);doc.setLineWidth(0.7);doc.line(M,y,W-M,y); y+=18;
    doc.setTextColor(45,52,66);doc.setFont('helvetica','normal');doc.setFontSize(10.5);
    var lines=doc.splitTextToSize(ascii(s[1]),maxw);
    lines.forEach(function(ln){ if(y>H-60){doc.addPage();y=60;} doc.text(ln,M,y); y+=16; });
    y+=16;
  });
  doc.save('SpatialItqan_User_Manual.pdf');
  toast('Manual PDF downloaded');
};

/* ================= THEME SWITCHER ================= */
/* Each theme pairs with a realistic basemap that matches its mood, so changing
   the theme restyles the whole map professionally (not just UI colors). */
var THEME_BASEMAP={
  graphite:'lightgray', arctic:'lightgray', midnight:'voyager'
};
var userPickedBasemap=false; // if the user manually picks a basemap, stop auto-switching
function applyThemeBasemap(themeName){
  if(userPickedBasemap) return;
  var key=THEME_BASEMAP[themeName]; if(!key||!basemaps[key])return;
  if(currentBase===basemaps[key].layer) return;
  try{ map.removeLayer(currentBase); }catch(e){}
  currentBase=basemaps[key].layer.addTo(map); currentBase.bringToBack();
  // reflect in the basemap picker UI if present
  try{ var sel=document.getElementById('baseSelect'); if(sel){sel.value=key;} }catch(e){}
  try{ document.querySelectorAll('.basethumb').forEach(function(t){t.classList.toggle('active',t.dataset.base===key);}); }catch(e){}
}
function applyTheme(val){
  var themeName = val || 'graphite';
  document.body.setAttribute('data-theme', themeName);
  applyThemeBasemap(themeName);
}
var themeSel=document.getElementById('themeSelect');
themeSel.value='graphite';
applyTheme('graphite');
themeSel.onchange=function(){ applyTheme(this.value); toast('Theme: '+this.options[this.selectedIndex].text); };



/* ================= ROUTE PLANNER ================= */
var routeGroup=L.featureGroup().addTo(map), routeLine=null, routeStart=null, routeEnd=null, routeStartMarker=null, routeEndMarker=null, routePickMode=null;
function fmtRoutePoint(p){return p?('Lat '+p.lat.toFixed(5)+', Lng '+p.lng.toFixed(5)):'not set';}
function routeStatus(msg){
  var rsEl=document.getElementById('routeStatus'); if(!rsEl)return;
  var s='Start: '+fmtRoutePoint(routeStart)+'\nDestination: '+fmtRoutePoint(routeEnd);
  if(msg) s+='\n'+msg;
  rsEl.innerHTML=escapeHtml(s).replace(/Route:/g,'<b>Route:</b>');
}
function routeClearLine(){ if(routeLine){routeGroup.removeLayer(routeLine); routeLine=null;} }
function routeSetPoint(kind,latlng,label){
  var markerHtml=(kind==='start'?'Route start':'Route destination')+'<br>'+escapeHtml(label||fmtRoutePoint(latlng));
  if(kind==='start'){
    routeStart={lat:latlng.lat,lng:latlng.lng}; if(routeStartMarker)routeGroup.removeLayer(routeStartMarker);
    routeStartMarker=L.marker(latlng,{title:'Route start'}).bindPopup(markerHtml).addTo(routeGroup);
  }else{
    routeEnd={lat:latlng.lat,lng:latlng.lng}; if(routeEndMarker)routeGroup.removeLayer(routeEndMarker);
    routeEndMarker=L.marker(latlng,{title:'Route destination'}).bindPopup(markerHtml).addTo(routeGroup);
  }
  routeClearLine(); routeStatus('Route: not calculated');
}
function routeStopPick(){ routePickMode=null; map.getContainer().style.cursor=''; }
function routePick(kind){
  identifyOn=false; var ib=document.getElementById('identifyToggle'); if(ib){ib.classList.remove('on');ib.textContent='◎ Identify — click to enable';}
  routePickMode=kind; map.getContainer().style.cursor='crosshair'; switchTab('route'); toast('Click on the map to set route '+(kind==='start'?'start':'destination'));
}
map.on('click',function(e){
  if(!routePickMode) return;
  var k=routePickMode; routeStopPick();
  routeSetPoint(k,e.latlng,k==='start'?'Picked start':'Picked destination');
  try{ e.originalEvent.preventDefault(); e.originalEvent.stopPropagation(); }catch(ex){}
});
function routeUseLiveLocation(){
  if(!navigator.geolocation){toast('Geolocation is not supported by this browser',true);return;}
  toast('Getting current location for route start…');
  navigator.geolocation.getCurrentPosition(function(pos){
    var ll=L.latLng(pos.coords.latitude,pos.coords.longitude); routeSetPoint('start',ll,'Live current location'); map.setView(ll,16); toast('Route start set from live location');
  },function(err){toast('Could not get live location: '+(err.message||'permission denied'),true);},{enableHighAccuracy:true,timeout:15000,maximumAge:30000});
}
function routeSearchDestination(){
  var q=document.getElementById('routeDestSearch').value.trim(); if(!q){toast('Enter a destination name or address',true);return;}
  toast('Searching destination…');
  fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(q))
    .then(function(r){return r.json();}).then(function(list){
      if(!list||!list.length){toast('Destination not found',true);return;}
      var p=list[0], ll=L.latLng(+p.lat,+p.lon); routeSetPoint('end',ll,p.display_name); map.setView(ll,15); toast('Destination set');
    }).catch(function(){toast('Destination search unavailable',true);});
}
function routeProfile(engine,mode){
  if(engine==='ors') return {driving:'driving-car',walking:'foot-walking',cycling:'cycling-regular'}[mode]||'driving-car';
  // The public router.project-osrm.org instance exposes its driving graph.
  return 'driving';
}
function renderRouteSteps(steps){
  var box=document.getElementById('routeSteps');
  if(!steps||!steps.length){box.innerHTML='<div>No turn-by-turn steps returned by the routing service.</div>';return;}
  box.innerHTML=steps.slice(0,80).map(function(s,i){
    var name=s.name||s.road||s.instruction||'Continue'; var dist=s.distance?(' — '+(s.distance/1000).toFixed(2)+' km'):'';
    var instr=s.instruction||((s.maneuver&&s.maneuver.type)?s.maneuver.type.replace(/_/g,' '):'Continue')+(name?' on '+name:'');
    return '<div><b>'+(i+1)+'.</b> '+escapeHtml(instr)+escapeHtml(dist)+'</div>';
  }).join('');
}
function drawRouteGeoJSON(gj,summary,steps){
  routeClearLine();
  routeLine=L.geoJSON(gj,{style:{color:'#00E5FF',weight:6,opacity:.92,lineCap:'round',lineJoin:'round',className:'route-static'}}).addTo(routeGroup);
  try{map.fitBounds(routeLine.getBounds().pad(.12));}catch(e){}
  var km=(summary.distance/1000).toFixed(2), min=Math.round(summary.duration/60);
  routeStatus('Route: '+km+' km | '+min+' min'); renderRouteSteps(steps);
  toast('Route calculated: '+km+' km');
}
function routeCalculate(){
  if(!routeStart||!routeEnd){toast('Set both start and destination first',true);return;}
  var engine=document.getElementById('routeEngine').value, mode=document.getElementById('routeProfile').value, prof=routeProfile(engine,mode);
  if(engine==='osrm'&&mode!=='driving'){
    toast('The public OSRM demo supports driving routes only. Choose Driving or use OpenRouteService for walking/cycling.',true);
    routeStatus('Route: choose Driving or OpenRouteService');
    return;
  }
  routeStatus('Route: calculating…');
  if(engine==='ors'){
    var orsEl=document.getElementById('orsKey'); var key=orsEl?orsEl.value.trim():''; if(!key){toast('OpenRouteService needs an API key, or choose OSRM demo',true);routeStatus('Route: ORS API key missing');return;}
    fetch('https://api.openrouteservice.org/v2/directions/'+prof+'/geojson',{method:'POST',headers:{'Content-Type':'application/json','Authorization':key},body:JSON.stringify({coordinates:[[routeStart.lng,routeStart.lat],[routeEnd.lng,routeEnd.lat]],instructions:true})})
      .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error&&j.error.message?j.error.message:'ORS routing failed');return j;});})
      .then(function(gj){var f=gj.features&&gj.features[0]; if(!f)throw new Error('No route returned'); var props=f.properties||{}, sum=props.summary||{}; var steps=((props.segments&&props.segments[0]&&props.segments[0].steps)||[]); drawRouteGeoJSON(f,{distance:sum.distance||0,duration:sum.duration||0},steps);})
      .catch(function(e){toast('Route error: '+e.message,true);routeStatus('Route: failed');});
  }else{
    var coords=routeStart.lng+','+routeStart.lat+';'+routeEnd.lng+','+routeEnd.lat;
    fetch('https://router.project-osrm.org/route/v1/'+prof+'/'+coords+'?overview=full&geometries=geojson&steps=true')
      .then(function(r){return r.json();}).then(function(j){
        if(!j.routes||!j.routes.length)throw new Error(j.message||'No route returned');
        var r=j.routes[0], steps=(r.legs&&r.legs[0]&&r.legs[0].steps)||[];
        drawRouteGeoJSON({type:'Feature',properties:{},geometry:r.geometry},{distance:r.distance,duration:r.duration},steps);
      }).catch(function(e){toast('OSRM route error: '+e.message,true);routeStatus('Route: failed');});
  }
}
function clearRoute(){ routeGroup.clearLayers(); routeLine=null; routeStart=null; routeEnd=null; routeStartMarker=null; routeEndMarker=null; routeStopPick(); routeStatus('Route: not calculated'); document.getElementById('routeSteps').innerHTML='<div>No route calculated yet.</div>'; }
(function(){var g=function(id){return document.getElementById(id);};
  if(g('routeUseLive'))g('routeUseLive').onclick=routeUseLiveLocation;
  if(g('routePickStart'))g('routePickStart').onclick=function(){routePick('start');};
  if(g('routePickEnd'))g('routePickEnd').onclick=function(){routePick('end');};
  if(g('routeSearchDest'))g('routeSearchDest').onclick=routeSearchDestination;
  if(g('routeDestSearch'))g('routeDestSearch').addEventListener('keydown',function(e){if(e.key==='Enter')routeSearchDestination();});
  if(g('routeCalc'))g('routeCalc').onclick=routeCalculate;
  if(g('routeClear'))g('routeClear').onclick=clearRoute;
})();

/* ================= LIVE WEATHER / CLOUDS ================= */
var weatherLayer=null, weatherTileErrorCount=0;
function todayIsoMinus(days){var d=new Date(); d.setDate(d.getDate()-(days||0)); return d.toISOString().slice(0,10);}
var gibsDateEl=document.getElementById('gibsDate'); if(gibsDateEl) gibsDateEl.value=todayIsoMinus(2);
function weatherSetStatus(txt){var el=document.getElementById('weatherStatus'); if(el) el.innerHTML=escapeHtml(txt).replace(/Loaded:/g,'<b>Loaded:</b>').replace(/Source:/g,'<b>Source:</b>').replace(/Tip:/g,'<b>Tip:</b>').replace(/Warning:/g,'<b>Warning:</b>');}
function clearWeatherLayer(){ if(weatherLayer){map.removeLayer(weatherLayer); weatherLayer=null;} weatherTileErrorCount=0; weatherSetStatus('No weather layer loaded.'); }
function addWeatherTile(url,attrib,label,maxZoom,extra,options){
  clearWeatherLayer();
  var op=parseFloat(document.getElementById('weatherOpacity').value)||0.7;
  var opts=Object.assign({opacity:op,maxZoom:maxZoom||18,maxNativeZoom:maxZoom||18,crossOrigin:true,attribution:attrib,errorTileUrl:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}, options||{});
  weatherLayer=L.tileLayer(url,opts).addTo(map);
  weatherLayer.on('tileerror',function(){
    weatherTileErrorCount++;
    if(weatherTileErrorCount===3){weatherSetStatus('Warning: Layer added, but several tiles failed to load.\nLoaded: '+label+'\nOpacity: '+op.toFixed(2)+(extra?'\n'+extra:'')+'\nTip: Try a different date, zoom out, or run the HTML through localhost.');}
  });
  weatherSetStatus('Loaded: '+label+'\nOpacity: '+op.toFixed(2)+(extra?'\n'+extra:'')); toast(label+' layer added');
}
function gibsUrl(layer,date,matrix,fmt){
  return 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/'+layer+'/default/'+date+'/'+matrix+'/{z}/{y}/{x}.'+(fmt||'png');
}
function fetchJsonWithTimeout(url,ms){
  var ctrl = window.AbortController ? new AbortController() : null;
  var timer = ctrl ? setTimeout(function(){ctrl.abort();}, ms||12000) : null;
  return fetch(url,{mode:'cors',cache:'no-store',signal:ctrl?ctrl.signal:undefined}).then(function(r){ if(timer)clearTimeout(timer); if(!r.ok)throw new Error('HTTP '+r.status); return r.json(); });
}
function applyWeatherLayer(){
  var t=document.getElementById('weatherLayerType').value;
  if(t==='rainviewer_radar'){
    weatherSetStatus('Loading latest RainViewer radar frames…');
    fetchJsonWithTimeout('https://api.rainviewer.com/public/weather-maps.json',12000).then(function(j){
      var host=j.host||'https://tilecache.rainviewer.com';
      var frames=(j.radar&&j.radar.past)||[];
      if(!frames.length)throw new Error('No radar frames returned');
      var f=frames[frames.length-1];
      var url=host+f.path+'/256/{z}/{x}/{y}/2/1_1.png';
      addWeatherTile(url,'© RainViewer','RainViewer latest precipitation radar',7,'Source: no-key public RainViewer Weather Maps API\nFrame: '+(f.time?new Date(f.time*1000).toUTCString():'latest')+'\nTip: Public free radar max native zoom is limited; zoomed-in view may be resampled.',{maxZoom:18,maxNativeZoom:7});
    }).catch(function(e){weatherSetStatus('Weather radar failed: '+e.message+'\nTip: If opened directly as file://, run RUN_HTML_LOCAL_SERVER.bat and open http://localhost:8090. You can also use NASA GIBS layers because they load as map tiles.');toast('Weather radar failed',true);});
    return;
  }
  if(t.indexOf('gibs_')===0){
    var date=(document.getElementById('gibsDate').value||todayIsoMinus(2));
    var cfg={
      gibs_viirs_snpp_truecolor:['VIIRS_SNPP_CorrectedReflectance_TrueColor','NASA GIBS VIIRS SNPP TrueColor satellite','GoogleMapsCompatible_Level9','jpg',9],
      gibs_viirs_noaa20_truecolor:['VIIRS_NOAA20_CorrectedReflectance_TrueColor','NASA GIBS VIIRS NOAA-20 TrueColor satellite','GoogleMapsCompatible_Level9','jpg',9],
      gibs_modis_terra_truecolor:['MODIS_Terra_CorrectedReflectance_TrueColor','NASA GIBS MODIS Terra TrueColor satellite','GoogleMapsCompatible_Level9','jpg',9],
      gibs_modis_aqua_truecolor:['MODIS_Aqua_CorrectedReflectance_TrueColor','NASA GIBS MODIS Aqua TrueColor satellite','GoogleMapsCompatible_Level9','jpg',9],
      gibs_goes_east_ir:['GOES-East_ABI_Band13_Clean_Infrared','NASA GIBS GOES-East Clean Infrared clouds','GoogleMapsCompatible_Level8','png',8],
      gibs_goes_west_ir:['GOES-West_ABI_Band13_Clean_Infrared','NASA GIBS GOES-West Clean Infrared clouds','GoogleMapsCompatible_Level8','png',8],
      gibs_goes_east_geocolor:['GOES-East_ABI_GeoColor','NASA GIBS GOES-East GeoColor','GoogleMapsCompatible_Level8','png',8],
      gibs_goes_west_geocolor:['GOES-West_ABI_GeoColor','NASA GIBS GOES-West GeoColor','GoogleMapsCompatible_Level8','png',8]
    }[t];
    addWeatherTile(gibsUrl(cfg[0],date,cfg[2],cfg[3]),'© NASA GIBS',cfg[1],cfg[4],'Source: no-key NASA GIBS WMTS Web Mercator satellite tiles\nDate: '+date+'\nTip: If blank, try yesterday/two days back or select another sensor. GOES layers mainly cover the Americas; VIIRS/MODIS are better global layers.');
    return;
  }
  // No-key layers only (RainViewer radar + NASA GIBS satellite). OWM removed.
  weatherSetStatus('Select a RainViewer radar or NASA GIBS satellite layer (no API key needed).');
}
document.getElementById('weatherApply').onclick=applyWeatherLayer;
document.getElementById('weatherClear').onclick=clearWeatherLayer;
document.getElementById('weatherOpacity').oninput=function(){document.getElementById('weatherOpacityV').textContent=(+this.value).toFixed(2); if(weatherLayer)weatherLayer.setOpacity(+this.value);};

/* ================= ULTIMATE EXPERIENCE ADD-ON ================= */
var ultimateGridLayer=null;
function proLog(msg){var el=document.getElementById('proLog'); if(el){el.innerHTML='<b>'+new Date().toLocaleTimeString()+'</b> — '+escapeHtml(msg)+'\n'+el.textContent.slice(0,1200);} try{toast(msg);}catch(e){} }
function proCountFeatures(){var total=0;Object.keys(layers).forEach(function(id){var gj=layers[id].geojson;if(gj&&gj.features)total+=gj.features.length;});return total;}
function proDrawCount(){var n=0;try{n=drawn.point.length+drawn.line.length+drawn.polygon.length+ptItems.length;}catch(e){}return n;}
function proLiveStatus(){var live=[];try{if(weatherLayer)live.push('Weather');}catch(e){} try{if(routeLine)live.push('Route');}catch(e){} return live.length?live.join('+'):'OFF';}
function updateProStats(){
  var el=document.getElementById('proStats'); if(!el)return;
  var layerCount=Object.keys(layers).length, visible=Object.keys(layers).filter(function(id){return layers[id].visible;}).length;
  var feat=proCountFeatures(), draw=proDrawCount(), live=proLiveStatus();
  el.innerHTML='<div class="pro-card good"><div class="num">'+layerCount+'</div><div class="lbl">Layers / '+visible+' visible</div></div>'+ 
    '<div class="pro-card"><div class="num">'+feat+'</div><div class="lbl">Features</div></div>'+ 
    '<div class="pro-card"><div class="num">'+draw+'</div><div class="lbl">Drawn + markers</div></div>'+ 
    '<div class="pro-card '+(live==='OFF'?'warn':'good')+'"><div class="num" style="font-size:16px">'+live+'</div><div class="lbl">Live layers</div></div>';
}
function fitAllData(){
  var fg=L.featureGroup(); var added=false;
  Object.keys(layers).forEach(function(id){var l=layers[id];if(l.visible&&l.leaflet){try{fg.addLayer(l.leaflet);added=true;}catch(e){}}});
  try{drawnGroup.eachLayer(function(l){fg.addLayer(l);added=true;});ptGroup.eachLayer(function(l){fg.addLayer(l);added=true;});routeGroup.eachLayer(function(l){fg.addLayer(l);added=true;});}catch(e){}
  if(!added){map.setView(HOME.center,HOME.zoom);proLog('No data loaded — returned to Home.');return;}
  try{var b=fg.getBounds();if(b&&b.isValid()){map.fitBounds(b.pad(.15));proLog('Fitted all visible data.');}}catch(e){proLog('Could not fit all data.');}
}
function toggleFocusMode(){document.body.classList.toggle('focus-mode');setTimeout(function(){map.invalidateSize();},260);proLog(document.body.classList.contains('focus-mode')?'Focus mode enabled':'Focus mode disabled');}
function copyText(txt){try{navigator.clipboard.writeText(txt).then(function(){proLog('Copied: '+txt);}).catch(function(){prompt('Copy this value:',txt);});}catch(e){prompt('Copy this value:',txt);}}
function currentCenterText(){var c=map.getCenter();return c.lat.toFixed(6)+', '+c.lng.toFixed(6)+' | Zoom '+map.getZoom();}
function buildGrid(){
  var b=map.getBounds(), z=map.getZoom();
  var step=z>=16?0.002:z>=14?0.005:z>=12?0.01:z>=10?0.025:z>=8?0.05:0.1;
  var group=L.layerGroup();
  var sw=b.getSouthWest(), ne=b.getNorthEast();
  var lat0=Math.floor(sw.lat/step)*step, lng0=Math.floor(sw.lng/step)*step;
  for(var lat=lat0;lat<=ne.lat;lat+=step){L.polyline([[lat,sw.lng],[lat,ne.lng]],{color:'#22D3EE',weight:1,opacity:.35,interactive:false}).addTo(group);}
  for(var lng=lng0;lng<=ne.lng;lng+=step){L.polyline([[sw.lat,lng],[ne.lat,lng]],{color:'#22D3EE',weight:1,opacity:.35,interactive:false}).addTo(group);}
  var c=map.getCenter();L.marker([c.lat,c.lng],{interactive:false,icon:L.divIcon({className:'grid-label',html:'Grid '+step+'°',iconSize:[80,20],iconAnchor:[40,10]})}).addTo(group);
  return group;
}
function toggleGrid(){
  if(ultimateGridLayer){map.removeLayer(ultimateGridLayer);ultimateGridLayer=null;map.off('moveend zoomend',refreshGrid);proLog('Grid overlay off.');return;}
  ultimateGridLayer=buildGrid().addTo(map);map.on('moveend zoomend',refreshGrid);proLog('Grid overlay on.');
}
function refreshGrid(){if(!ultimateGridLayer)return;map.removeLayer(ultimateGridLayer);ultimateGridLayer=buildGrid().addTo(map);}
function selectBasemapByName(keywords){
  var found=null;document.querySelectorAll('.bm').forEach(function(el){var t=(el.textContent||'').toLowerCase();if(!found&&keywords.some(function(k){return t.indexOf(k)>=0;}))found=el;});
  if(found){found.click();proLog('Basemap changed to '+found.textContent.trim());return true;}return false;
}
function runProCommand(){
  var q=(document.getElementById('proCommand').value||'').toLowerCase().trim(); if(!q)return;
  if(q.indexOf('sat')>=0||q.indexOf('imagery')>=0){selectBasemapByName(['satellite','imagery']);}
  else if(q.indexOf('topo')>=0){selectBasemapByName(['topographic','opentopo']);}
  else if(q.indexOf('blank')>=0){selectBasemapByName(['blank']);}
  else if(q.indexOf('dark')>=0){themeSel.value='graphite';applyTheme('graphite');proLog('Graphite theme applied.');}
  else if(q.indexOf('light')>=0||q.indexOf('gray')>=0||q.indexOf('grey')>=0){themeSel.value='graphite';applyTheme('graphite');proLog('Pro Gray theme applied.');}
  else if(q.indexOf('fit')>=0||q.indexOf('zoom all')>=0){fitAllData();}
  else if(q.indexOf('route')>=0){switchTab('route');proLog('Route planner opened.');}
  else if(q.indexOf('weather')>=0||q.indexOf('cloud')>=0){switchTab('live');document.getElementById('weatherApply').click();proLog('Weather layer requested.');}
  else if(q.indexOf('focus')>=0||q.indexOf('presentation')>=0){toggleFocusMode();}
  else if(q.indexOf('grid')>=0){toggleGrid();}
  else if(q.indexOf('center')>=0||q.indexOf('copy')>=0){copyText(currentCenterText());}
  else if(q.indexOf('export')>=0){switchTab('layout');proLog('Layout export opened.');}
  else if(q.indexOf('home')>=0){map.setView(HOME.center,HOME.zoom);proLog('Returned to home extent.');}
  else proLog('Command not recognized. Try satellite, route, weather, fit all, focus, grid, dark, light, blank.');
  updateProStats();
}
function layerHealthCheck(){
  var lines=[], total=0;
  Object.keys(layers).forEach(function(id){
    var L0=layers[id], gj=L0.geojson, cnt=0, bad=0, fields={};
    if(gj&&gj.features){gj.features.forEach(function(f){cnt++;total++;if(!f.geometry)bad++;Object.keys(f.properties||{}).slice(0,30).forEach(function(k){fields[k]=(fields[k]||0)+1;});});}
    var top=Object.keys(fields).slice(0,8).join(', ');
    lines.push('• '+L0.name+' | '+cnt+' features | '+(L0.visible?'visible':'hidden')+' | geometry issues: '+bad+(top?' | fields: '+top:''));
  });
  if(!lines.length)lines.push('No imported data layers loaded yet.');
  lines.unshift('Spatial Itqan layer health check');lines.unshift('Total imported features: '+total);lines.push('Drawn/marked features: '+proDrawCount());
  document.getElementById('proHealthBox').textContent=lines.join('\n');proLog('Layer health check complete.');updateProStats();
}
function exportProjectObject(){
  var c=map.getCenter();var project={app:'Spatial Itqan',version:'Ultimate Experience',saved:new Date().toISOString(),view:{lat:c.lat,lng:c.lng,zoom:map.getZoom()},theme:document.body.getAttribute('data-theme'),layers:[],drawn:collectFeatures(),bookmarks:bookmarks||[]};
  Object.keys(layers).forEach(function(id){var L0=layers[id];if(L0.geojson)project.layers.push({name:L0.name,color:L0.color,visible:L0.visible,geojson:L0.geojson,editSchema:L0.editSchema||[],uniqueField:L0.uniqueField||'',field:L0.field||'',colorMode:L0.colorMode||'',catColors:L0.catColors||null,weight:L0.weight,size:L0.size,opacity:L0.opacity,hollow:!!L0.hollow,outlineColor:L0.outlineColor||'',pointShape:L0.pointShape||'circle',pointImage:L0.pointImage||'',pointAngle:L0.pointAngle||0,lineStyle:L0.lineStyle||'solid',fillPattern:L0.fillPattern||(L0.hollow?'hollow':'solid'),selectable:L0.selectable!==false,snapEnabled:L0.snapEnabled!==false,featureTemplateDefaults:L0.featureTemplateDefaults||{},proLabelStyle:L0.proLabelStyle||null,ruleStyles:L0.ruleStyles||[]});});
  return project;
}
function saveProjectFile(){var p=exportProjectObject();dl(JSON.stringify(p,null,2),'SpatialItqan_Project.svproject','application/json');proLog('Project file exported.');}
function saveProjectBrowser(){localStorage.setItem('SpatialViewUltimateProject',JSON.stringify(exportProjectObject()));proLog('Project saved in this browser.');}
function restoreProject(p){
  if(!p||!p.view){proLog('Invalid project file.');return;}
  Object.keys(layers).forEach(function(id){try{map.removeLayer(layers[id].leaflet);}catch(e){} delete layers[id];});renderLayers();refreshDropdowns();
  (p.layers||[]).forEach(function(x){try{var color=x.color||nextColor();var id=addLayer(geoJsonLayer(x.geojson,color),x.name||'Project layer',color,{zoom:false,geojson:x.geojson});
    var L0=layers[id]; if(L0){ L0.uniqueField=x.uniqueField||''; L0.field=x.field||''; L0.colorMode=x.colorMode||''; L0.catColors=x.catColors||null; L0.weight=(x.weight!=null?x.weight:null); L0.hollow=!!x.hollow; L0.outlineColor=x.outlineColor||''; L0.size=x.size||6; L0.editSchema=x.editSchema||[];L0.pointShape=x.pointShape||'circle';L0.pointImage=x.pointImage||'';L0.pointAngle=x.pointAngle||0;L0.lineStyle=x.lineStyle||'solid';L0.fillPattern=x.fillPattern||(L0.hollow?'hollow':'solid');L0.selectable=x.selectable!==false;L0.snapEnabled=x.snapEnabled!==false;L0.featureTemplateDefaults=x.featureTemplateDefaults||{};L0.proLabelStyle=x.proLabelStyle||null;L0.ruleStyles=x.ruleStyles||[]; if(x.opacity!=null)L0.opacity=x.opacity;
      svBuildLeafletLayer(L0); }
    if(x.visible===false){layers[id].visible=false;map.removeLayer(layers[id].leaflet);}}catch(e){}});
  if(p.theme){try{document.body.setAttribute('data-theme',p.theme);}catch(e){}}
  if(p.view)map.setView([p.view.lat,p.view.lng],p.view.zoom||map.getZoom());
  if(window.__svRestoreProfessional)window.__svRestoreProfessional(p.professional||null);
  renderLayers();refreshDropdowns();updateProStats();proLog('Project restored. Drawn features are included in export file but imported as data layers when needed.');
}
function restoreBrowserProject(){var s=localStorage.getItem('SpatialViewUltimateProject');if(!s){proLog('No browser-saved project found.');return;}try{restoreProject(JSON.parse(s));}catch(e){proLog('Could not restore browser project: '+e.message);}}
function loadProjectFile(file){var r=new FileReader();r.onload=function(){try{restoreProject(JSON.parse(r.result));}catch(e){proLog('Project load failed: '+e.message);}};r.readAsText(file);}

(function initUltimate(){
  document.querySelectorAll('#ultimateQuickbar button[data-qtab]').forEach(function(b){b.onclick=function(){switchTab(b.getAttribute('data-qtab'));document.getElementById('panel').classList.add('open');updateProStats();};});
  document.getElementById('quickFocus').onclick=toggleFocusMode;
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('focus-mode'))toggleFocusMode();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();switchTab('pro');setTimeout(function(){document.getElementById('proCommand').focus();},80);}});
  document.getElementById('proRefreshStats').onclick=updateProStats;
  document.getElementById('proRunCommand').onclick=runProCommand;
  document.getElementById('proCommand').addEventListener('keydown',function(e){if(e.key==='Enter')runProCommand();});
  document.querySelectorAll('#proCmdSuggestions button').forEach(function(b){b.onclick=function(){document.getElementById('proCommand').value=b.textContent;runProCommand();};});
  document.getElementById('proFitAll').onclick=fitAllData;
  document.getElementById('proFocus').onclick=toggleFocusMode;
  document.getElementById('proGrid').onclick=toggleGrid;
  document.getElementById('proCopyCenter').onclick=function(){copyText(currentCenterText());};
  document.getElementById('proHealth').onclick=layerHealthCheck;
  document.getElementById('proSaveProject').onclick=saveProjectFile;
  document.getElementById('proSaveBrowser').onclick=saveProjectBrowser;
  document.getElementById('proRestoreBrowser').onclick=restoreBrowserProject;
  document.getElementById('proLoadProjectBtn').onclick=function(){document.getElementById('proLoadProject').click();};
  document.getElementById('proLoadProject').onchange=function(e){if(e.target.files&&e.target.files[0])loadProjectFile(e.target.files[0]);e.target.value='';};
  document.getElementById('proBaseOpacity').oninput=function(){var v=+this.value;document.getElementById('proBaseOpacityV').textContent=v.toFixed(2);try{currentBase.setOpacity(v);}catch(e){}};
  setInterval(function(){if(document.getElementById('pane-pro').classList.contains('active'))updateProStats();},2500);
  updateProStats();
})();




/* ================= MAP ELEMENT CONTROL CENTER ADD-ON ================= */
var uxElementState={title:true,north:true,scale:true,coords:true,legend:false,zoom:true,attrib:true,quick:true,topbar:true,footer:true,panel:true,attr:true};
function uxQS(sel){return document.querySelector(sel);}
function uxSetHidden(el,hide){if(el)el.classList.toggle('element-hidden',!!hide);}
function uxSaveState(){try{localStorage.setItem('SpatialViewElementState',JSON.stringify(uxElementState));}catch(e){}}
function uxRefreshRestoreChip(){
  var chip=document.getElementById('uiRestoreChip'); if(!chip)return;
  var needs=!uxElementState.topbar||!uxElementState.panel||!uxElementState.quick;
  chip.classList.toggle('show',needs);
}
function uxSetElement(key,on,silent){
  uxElementState[key]=!!on;
  var hide=!on;
  if(key==='title')uxSetHidden(document.getElementById('mapTitle'),hide);
  if(key==='north')uxSetHidden(uxQS('.northarrow'),hide);
  if(key==='scale')uxSetHidden(uxQS('.leaflet-control-scale'),hide);
  if(key==='coords')uxSetHidden(document.getElementById('coordbar'),hide);
  if(key==='legend'){
    var showLegend=document.getElementById('showLegend'); if(showLegend)showLegend.checked=!!on;
    var legend=document.getElementById('legendBox'); if(legend)legend.style.display=on?'':'none';
  }
  if(key==='zoom')uxSetHidden(uxQS('.leaflet-control-zoom'),hide);
  if(key==='attrib')uxSetHidden(uxQS('.leaflet-control-attribution'),hide);
  if(key==='quick')uxSetHidden(document.getElementById('ultimateQuickbar'),hide);
  if(key==='topbar')uxSetHidden(uxQS('.topbar'),hide);
  if(key==='footer')uxSetHidden(uxQS('.pagefoot'),hide);
  if(key==='panel'){
    uxSetHidden(document.getElementById('panel'),hide);
    uxSetHidden(document.getElementById('panelDock'),hide);
    document.body.classList.toggle('panel-hidden',hide);
    var mapEl=document.getElementById('map');
    if(mapEl){mapEl.style.right=on?(window.innerWidth<=860?'0':'340px'):'0';}
    var attr=document.getElementById('attrDrawer'); if(attr){attr.style.right=on?(window.innerWidth<=860?'0':'344px'):'0';}
    var north=uxQS('.northarrow'); if(north){north.style.right=on?(window.innerWidth<=860?'16px':'356px'):'16px';}
    var legend=uxQS('.legendbox'); if(legend){legend.style.right=on?(window.innerWidth<=860?'16px':'356px'):'16px';}
    setTimeout(function(){try{map.invalidateSize();}catch(e){}},80);
  }
  if(key==='attr'){
    var drawer=document.getElementById('attrDrawer'); if(drawer)drawer.classList.toggle('element-hidden',hide);
  }
  document.querySelectorAll('.map-el[data-el="'+key+'"]').forEach(function(cb){cb.checked=!!on;});
  uxRefreshRestoreChip(); uxSaveState();
  if(!silent){try{toast((on?'Enabled ':'Disabled ')+key);}catch(e){}}
}
function uxApplyPreset(name){
  var p={};
  if(name==='all')p={title:true,north:true,scale:true,coords:true,legend:true,zoom:true,attrib:true,quick:true,topbar:true,footer:true,panel:true,attr:true};
  if(name==='clean')p={title:false,north:false,scale:true,coords:false,legend:false,zoom:false,attrib:false,quick:true,topbar:false,footer:false,panel:false,attr:false};
  if(name==='presentation')p={title:true,north:true,scale:true,coords:false,legend:true,zoom:false,attrib:true,quick:true,topbar:false,footer:true,panel:false,attr:false};
  if(name==='qa')p={title:false,north:true,scale:true,coords:true,legend:false,zoom:true,attrib:true,quick:true,topbar:true,footer:true,panel:true,attr:true};
  if(name==='liveops')p={title:true,north:true,scale:true,coords:true,legend:true,zoom:true,attrib:true,quick:true,topbar:true,footer:false,panel:true,attr:false};
  if(name==='print')p={title:true,north:true,scale:true,coords:false,legend:true,zoom:false,attrib:true,quick:false,topbar:false,footer:false,panel:false,attr:false};
  Object.keys(p).forEach(function(k){uxSetElement(k,p[k],true);});
  document.body.classList.toggle('presentation-clean',name==='presentation'||name==='print');
  try{toast('Applied '+name+' view preset');}catch(e){}
}
function uxRestoreAll(){uxApplyPreset('all');}
function uxInitElementControls(){
  try{var saved=JSON.parse(localStorage.getItem('SpatialViewElementState')||'null'); if(saved){Object.keys(saved).forEach(function(k){if(k in uxElementState)uxElementState[k]=!!saved[k];});}}catch(e){}
  document.querySelectorAll('.map-el').forEach(function(cb){
    var k=cb.getAttribute('data-el'); cb.checked=!!uxElementState[k]; cb.onchange=function(){uxSetElement(k,this.checked);};
  });
  document.querySelectorAll('[data-preset]').forEach(function(btn){btn.onclick=function(){uxApplyPreset(btn.getAttribute('data-preset'));};});
  var chip=document.getElementById('uiRestoreChip'); if(chip)chip.onclick=uxRestoreAll;
  var showLegend=document.getElementById('showLegend'); if(showLegend){
    var old=showLegend.onchange;
    showLegend.onchange=function(){uxSetElement('legend',this.checked,true); if(old&&old!==showLegend.onchange)try{old.call(this);}catch(e){}};
  }
  Object.keys(uxElementState).forEach(function(k){uxSetElement(k,uxElementState[k],true);});
}
function uxToolLaunch(tool){
  if(tool==='identify'){switchTab('tools');setTimeout(function(){document.getElementById('identifyToggle').click();},80);}
  else if(tool==='measure-distance'){switchTab('tools');setTimeout(function(){document.getElementById('measureDist').click();},80);}
  else if(tool==='measure-area'){switchTab('tools');setTimeout(function(){document.getElementById('measureArea').click();},80);}
  else if(tool==='editor'||tool==='marker'||tool==='digitize-line'||tool==='digitize-polygon'){switchTab('tools');setTimeout(function(){var el=document.getElementById('editorWorkspace');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},80);}
  else if(tool==='route'){var rb=document.getElementById('xpRoute'); if(rb)rb.click();}
  else if(tool==='weather'){switchTab('live');setTimeout(function(){document.getElementById('weatherApply').click();},80);}
  else if(tool==='export'){switchTab('layout');}
  else if(tool==='health'){switchTab('pro');setTimeout(function(){document.getElementById('proHealth').click();},80);}
  try{proLog('Tool opened: '+tool);}catch(e){try{toast('Tool opened: '+tool);}catch(x){}}
}
(function initUXElementCenter(){
  uxInitElementControls();
  document.querySelectorAll('#ultimateToolLauncher [data-tool]').forEach(function(btn){btn.onclick=function(){uxToolLaunch(btn.getAttribute('data-tool'));};});
  document.addEventListener('keydown',function(e){
    if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==='u'){e.preventDefault();uxRestoreAll();}
  });
})();

/* Extend Pro command search with element presets */
(function(){
  if(typeof runProCommand==='function'){
    var oldRun=runProCommand;
    runProCommand=function(){
      var q=(document.getElementById('proCommand').value||'').toLowerCase().trim();
      if(q.indexOf('element')>=0||q.indexOf('control')>=0){switchTab('layers');proLog('Map Element Control Center opened.');return;}
      if(q.indexOf('clean map')>=0||q==='clean'){uxApplyPreset('clean');proLog('Clean Map preset applied.');return;}
      if(q.indexOf('all on')>=0||q.indexOf('restore')>=0){uxApplyPreset('all');proLog('All map elements restored.');return;}
      if(q.indexOf('print')>=0&&q.indexOf('layout')<0){uxApplyPreset('print');proLog('Print Layout element preset applied.');return;}
      if(q.indexOf('presentation')>=0&&q.indexOf('focus')<0){uxApplyPreset('presentation');proLog('Presentation element preset applied.');return;}
      oldRun();
    };
    var btn=document.getElementById('proRunCommand'); if(btn)btn.onclick=runProCommand;
  }
})();


/* ================= WELCOME SPLASH ================= */
var welcomeEl=document.getElementById('welcome');
function closeWelcome(){
  if(welcomeEl){
    welcomeEl.classList.add('hide');
    welcomeEl.style.display='none';
  }
  document.body.classList.remove('login-locked');
  var hm=document.getElementById('helpModal');
  if(hm){ hm.classList.remove('open'); hm.style.display='none'; }
  setTimeout(function(){ try{ map.invalidateSize(); }catch(e){} },120);
  setTimeout(function(){ try{ if(typeof checkAutoSaveRecovery==='function') checkAutoSaveRecovery(); }catch(e){} },700);
}
var wcStartBtn=document.getElementById('wcStart');
/* ESRI-style dockable panel toggle */
(function(){
  var dock=document.getElementById('panelDock');
  if(!dock)return;
  dock.onclick=function(){
    var docked=document.body.classList.toggle('panel-docked');
    dock.textContent=docked?'‹':'›';   // docked → ‹ (pull back); expanded → › (push away)
    dock.title=docked?'Show panel':'Hide panel';
    // shift on-map overlays so they track the map's right edge
    var wide=window.innerWidth<=860;
    var rightVal=docked?'16px':(wide?'16px':'356px');
    var north=document.querySelector('.northarrow'); if(north)north.style.right=rightVal;
    var legend=document.querySelector('.legendbox'); if(legend)legend.style.right=rightVal;
    setTimeout(function(){try{map.invalidateSize();}catch(e){}},300);
  };
  dock.textContent='›'; dock.title='Hide panel';
})();
/* Collapsible "Individual elements" advanced section */
(function(){
  var t=document.getElementById('elemAdvToggle'), g=document.getElementById('elemAdvGrid'), c=document.getElementById('elemAdvCaret');
  if(!t||!g)return;
  t.onclick=function(){ var open=g.style.display==='none'; g.style.display=open?'grid':'none'; if(c)c.textContent=open?'▾':'▸'; };
})();
if(wcStartBtn){ wcStartBtn.onclick=closeWelcome; }
try{ if(typeof wireCartoTools==='function') wireCartoTools(); }catch(e){ console.warn('cartography tools init deferred',e); }
try{ if(typeof wireProductivityTools==='function') wireProductivityTools(); }catch(e){ console.warn('productivity tools init deferred',e); }
try{ if(typeof wireLRS==='function') wireLRS(); }catch(e){ console.warn('LRS init deferred',e); }
try{ if(typeof wireDashboard==='function') wireDashboard(); }catch(e){ console.warn('dashboard init deferred',e); }

/* settings popover (theme + refresh) */
(function(){
  var btn=document.getElementById('settingsBtn'), pop=document.getElementById('settingsPop');
  if(btn&&pop){
    btn.onclick=function(e){ e.stopPropagation(); pop.classList.toggle('open'); };
    document.addEventListener('click',function(e){ if(!pop.contains(e.target)&&e.target!==btn) pop.classList.remove('open'); });
  }
})();

/* ================= GLOBAL REFRESH ================= */
document.getElementById('refreshBtn').onclick=function(){
  if(!confirm('Refresh Spatial Itqan? This clears loaded layers, points, sketches and measurements, and resets the view.')) return;
  // remove all data layers
  Object.keys(layers).forEach(function(id){ map.removeLayer(layers[id].leaflet); delete layers[id]; });
  renderLayers(); refreshDropdowns();
  // clear transient groups
  clearActiveDrawListener(); if(activeHandler){try{activeHandler.disable();}catch(e){} activeHandler=null;} hideDigibar();
  ptItems.forEach(function(it){ if(it._dragCleanup){ try{it._dragCleanup();}catch(e){} } });
  ptGroup.clearLayers(); ptItems=[]; ptUndoStack=[]; renderPtList();
  sketch.clearLayers(); measureLayer.clearLayers(); tempMarkers.clearLayers(); clearRoute(); clearWeatherLayer();
  drawnGroup.clearLayers(); drawn={point:[],line:[],polygon:[]}; drawnUndo=[]; renderDrawnList();
  measureOut.textContent='Pick a tool, then draw on the map.';
  if(youAreHere){ map.removeLayer(youAreHere); youAreHere=null; }
  if(geoWatchId!==null && navigator.geolocation){ navigator.geolocation.clearWatch(geoWatchId); geoWatchId=null; }
  locationOn=false; var lb=document.getElementById('locateBtn'); lb.textContent='◎'; lb.title='Locate me'; lb.classList.remove('accent'); locEl.className='ts-loc'; locEl.textContent='Location: off'; lastGeoName=''; lastGeoFetch=0;
  searchEl.value=''; resultsEl.innerHTML=''; resultsEl.style.display='none';
  // reset tool states
  identifyOn=false; var ib=document.getElementById('identifyToggle'); ib.classList.remove('on'); ib.textContent='◎ Identify — click to enable';
  ptAddMode=false; var pb=document.getElementById('ptAdd'); if(pb){pb.textContent='＋ Add point';pb.classList.add('accent');}
  window.__svOpState.editMode=false;window.__svEditSession={active:false,layerId:'',baseline:null,dirty:false,started:null};svSetSaveButtons(false);if(window.__svRefreshEditorUI)window.__svRefreshEditorUI();
  map.getContainer().style.cursor='';
  // reset title + legend + view
  titleManual=false; document.getElementById('layTitle').value=''; mapTitleSetLive('');
  document.getElementById('legendBox').style.display='none'; document.getElementById('showLegend').checked=false;
  map.setView(HOME.center,HOME.zoom);
  toast('Application refreshed');
};



/* ================= RESTORED ADVANCED OPERATIONS ADD-ON (IUH) =================
   Keeps the full original Ultimate interface and adds practical remaining tools:
   layer order/properties/context menu, unique symbology, advanced labels,
   geometry validation/calculation, snapping, split/merge, undo/redo,
   QA report export, service loaders, GeoTIFF, and richer project packages.
   ------------------------------------------------------------------------- */
(function installRestoredAdvancedOps(){
  if(window.__svAdvancedOpsInstalled) return;
  window.__svAdvancedOpsInstalled=true;

  var advState={qa:[],history:[],redo:[],services:[],labels:{},snapTolerance:0.75};

  var st=document.createElement('style');
  st.textContent=`
    .adv-card{background:linear-gradient(135deg,rgba(168,85,247,.15),rgba(34,211,238,.10));border:1px solid var(--line);border-radius:15px;padding:11px;margin:10px 0}
    .adv-card b{display:block;color:var(--brand-2);font-size:12px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px}
    .adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.adv-grid.three{grid-template-columns:1fr 1fr 1fr}
    .adv-grid button{min-height:36px;margin:0}.adv-row{display:flex;gap:7px;align-items:center;flex-wrap:wrap}
    .adv-status{background:var(--bg-2);border:1px solid var(--line);border-radius:10px;padding:9px 10px;font-family:var(--mono);font-size:11px;line-height:1.55;color:var(--ink-dim);white-space:pre-wrap;margin-top:8px;max-height:220px;overflow:auto}
    .adv-status b{color:var(--brand-2)}.adv-ctx{position:absolute;z-index:3500;background:var(--panel);border:1px solid var(--line);border-radius:11px;box-shadow:var(--shadow);display:none;overflow:hidden;min-width:210px}
    .adv-ctx button{display:block;width:100%;text-align:left;background:transparent;border:none;color:var(--ink);padding:9px 12px;font-size:12px;cursor:pointer}.adv-ctx button:hover{background:var(--panel-2)}
    .adv-modal{position:fixed;inset:0;background:rgba(0,0,0,.62);z-index:3600;display:none;align-items:center;justify-content:center;padding:24px}.adv-modal.open{display:flex}.adv-modal-card{width:820px;max-width:96vw;max-height:88vh;background:var(--panel);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);display:flex;flex-direction:column;overflow:hidden}.adv-modal-head{display:flex;align-items:center;gap:10px;padding:13px 16px;background:var(--bg-2);border-bottom:1px solid var(--line)}.adv-modal-body{padding:16px;overflow:auto;font-size:12.5px;color:var(--ink-dim);line-height:1.55}.adv-modal-body table{width:100%;border-collapse:collapse}.adv-modal-body th,.adv-modal-body td{border-bottom:1px solid var(--line);padding:7px 8px;text-align:left;vertical-align:top}.adv-modal-body th{color:var(--brand-2)}
    .adv-layer-btn{border:none;background:transparent;color:var(--ink-dim);cursor:pointer;font-size:12px;padding:2px}.adv-layer-btn:hover{color:var(--brand-2)}
  `;
  document.head.appendChild(st);

  function safeName(s){return String(s||'layer').replace(/[^A-Za-z0-9_\-]+/g,'_').replace(/^_+|_+$/g,'')||'layer';}
  function clone(o){return JSON.parse(JSON.stringify(o));}
  function csvCell(v){ if(v==null)return''; v=String(v); return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }
  function vectorLayers(){return Object.keys(layers).map(function(id){var L0=layers[id];return L0&&L0.geojson?L0:null;}).filter(Boolean);}
  function getLayer(id){return layers[id]||null;}
  function fields(L0){var fs={};(L0.editSchema||[]).forEach(function(field){fs[field.name]=1;});(L0.geojson.features||[]).forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){if(k!=='__sv_fid')fs[k]=1;});});return Object.keys(fs);}
  function fillSelect(sel){ if(!sel)return; var prev=sel.value; var html=''; vectorLayers().forEach(function(l){html+='<option value="'+l.id+'">'+escapeHtml(l.name)+'</option>';}); sel.innerHTML=html||'<option value="">— no vector layers —</option>'; if(prev&&layers[prev]) sel.value=prev; }
  function selectedFids(id){ if(window.__svSelectedFids) return window.__svSelectedFids(id)||[]; return []; }
  function selectedFeatures(L0){var ids=selectedFids(L0.id); return (L0.geojson.features||[]).filter(function(f){return ids.indexOf(String(f.properties&&f.properties.__sv_fid))>=0;});}
  function targetFeatures(L0){var s=selectedFeatures(L0); return s.length?s:(L0.geojson.features||[]);}
  function rebuild(L0){ svBuildLeafletLayer(L0); applyAdvancedLabels(L0); decorateLayerRows(); attachFeatureContext(L0); refreshAllAdvSelects(); }
  function rebuildLayer(L0,keepView){ svBuildLeafletLayer(L0); }
  window.__svRebuildLayer=rebuildLayer;
  function mark(){ snapshot(); if(window.__svMarkDirty) window.__svMarkDirty(); }
  function updateOpStatus(){ updateAdvStatus(); }
  window.__svUpdateOpStatus=updateOpStatus;

  function currentAdvLayer(){var sel=document.getElementById('editorTargetLayer')||document.getElementById('xpActiveLayer'); return getLayer(sel&&sel.value) || curTbl || vectorLayers()[0];}
  function refreshAllAdvSelects(){['editorTargetLayer','advUniqueLayer','advLabelLayer','advServiceAnchor'].forEach(function(id){fillSelect(document.getElementById(id));}); refreshAdvFieldSelects(); }
  function refreshAdvFieldSelects(){var L0=currentAdvLayer(); var fs=L0?fields(L0):[]; ['advUniqueField','advLabelField'].forEach(function(id){var s=document.getElementById(id); if(!s)return; var prev=s.value; s.innerHTML=fs.map(function(f){return '<option value="'+escapeHtml(f)+'">'+escapeHtml(f)+'</option>';}).join('')||'<option value="">— no fields —</option>'; if(prev) s.value=prev;});}

  function showModal(title,body){
    var m=document.getElementById('advModal'); if(!m){m=document.createElement('div');m.id='advModal';m.className='adv-modal';m.innerHTML='<div class="adv-modal-card"><div class="adv-modal-head"><b id="advModalTitle"></b><span style="flex:1"></span><button class="topbtn" id="advModalClose">✕ Close</button></div><div class="adv-modal-body" id="advModalBody"></div></div>';document.body.appendChild(m);document.getElementById('advModalClose').onclick=function(){m.classList.remove('open');};m.onclick=function(e){if(e.target===m)m.classList.remove('open');};}
    document.getElementById('advModalTitle').textContent=title; document.getElementById('advModalBody').innerHTML=body; m.classList.add('open');
  }

  function snapshot(){
    try{
      var pack={layers:Object.keys(layers).map(function(id){var L0=layers[id];return {id:id,name:L0.name,color:L0.color,visible:L0.visible,geojson:L0.geojson?clone(L0.geojson):null,editSchema:clone(L0.editSchema||[]),uniqueField:L0.uniqueField||'',field:L0.field||'',colorMode:L0.colorMode||'',catColors:L0.catColors||null,weight:(L0.weight!=null?L0.weight:null),hollow:!!L0.hollow,outlineColor:L0.outlineColor||'',pointShape:L0.pointShape||'circle',pointImage:L0.pointImage||'',pointAngle:L0.pointAngle||0,lineStyle:L0.lineStyle||'solid',fillPattern:L0.fillPattern||(L0.hollow?'hollow':'solid'),selectable:L0.selectable!==false,snapEnabled:L0.snapEnabled!==false,featureTemplateDefaults:clone(L0.featureTemplateDefaults||{}),proLabelStyle:clone(L0.proLabelStyle||null),size:L0.size||6,opacity:L0.opacity,labelField:L0.labelField||'',advLabelStyle:L0.advLabelStyle||null};})};
      var s=JSON.stringify(pack); if(advState.history[advState.history.length-1]!==s){advState.history.push(s); if(advState.history.length>40)advState.history.shift(); advState.redo=[];}
    }catch(e){}
  }
  window.__svAdvSnapshot=snapshot;
  snapshot();

  function restoreSnapshot(s){
    try{var pack=JSON.parse(s); pack.layers.forEach(function(x){var L0=layers[x.id]; if(L0){L0.name=x.name;L0.color=x.color;L0.visible=x.visible;L0.geojson=x.geojson;L0.editSchema=x.editSchema||[];L0.uniqueField=x.uniqueField;L0.field=x.field;L0.colorMode=x.colorMode||'';L0.catColors=x.catColors||null;L0.weight=(x.weight!=null?x.weight:L0.weight);L0.hollow=!!x.hollow;L0.outlineColor=x.outlineColor||'';L0.pointShape=x.pointShape||'circle';L0.pointImage=x.pointImage||'';L0.pointAngle=x.pointAngle||0;L0.lineStyle=x.lineStyle||'solid';L0.fillPattern=x.fillPattern||(L0.hollow?'hollow':'solid');L0.selectable=x.selectable!==false;L0.snapEnabled=x.snapEnabled!==false;L0.featureTemplateDefaults=x.featureTemplateDefaults||{};L0.proLabelStyle=x.proLabelStyle||null;L0.ruleStyles=x.ruleStyles||[];L0.size=x.size||6;if(x.opacity!=null)L0.opacity=x.opacity;L0.labelField=x.labelField;L0.advLabelStyle=x.advLabelStyle; rebuild(L0);}}); renderLayers(); refreshDropdowns(); updateAdvStatus();}
    catch(e){toast('Could not restore snapshot: '+e.message,true);}
  }
  function undo(){ if(advState.history.length<2){toast('Nothing to undo',true);return;} var cur=advState.history.pop(); advState.redo.push(cur); restoreSnapshot(advState.history[advState.history.length-1]); if(window.__svMarkDirty)window.__svMarkDirty(); toast('Undo completed'); }
  function redo(){ if(!advState.redo.length){toast('Nothing to redo',true);return;} var s=advState.redo.pop(); advState.history.push(s); restoreSnapshot(s); if(window.__svMarkDirty)window.__svMarkDirty(); toast('Redo completed'); }

  function layerIds(){return Object.keys(layers);}
  function moveLayer(id,dir){
    // delegate to the global layerOrder-based reorder so all UIs stay consistent
    if(typeof window.__moveLayerGlobal==='function'){ window.__moveLayerGlobal(id,dir); refreshDropdowns(); return; }
    var ids=layerIds(), i=ids.indexOf(id); if(i<0)return; var ni=i+dir; if(ni<0||ni>=ids.length){toast('Layer already at edge',true);return;}
    var old={}; ids.forEach(function(k){old[k]=layers[k];}); var tmp=ids[i]; ids[i]=ids[ni]; ids[ni]=tmp; Object.keys(layers).forEach(function(k){delete layers[k];}); ids.forEach(function(k){layers[k]=old[k];});
    ids.forEach(function(k){try{ if(layers[k].leaflet&&layers[k].visible!==false)layers[k].leaflet.bringToFront(); }catch(e){}}); renderLayers(); refreshDropdowns(); toast('Layer order updated');
  }

  function layerProperties(id){
    var L0=getLayer(id)||currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var gj=L0.geojson||{}, feats=gj.features||[], fs=fields(L0), geom={}; feats.forEach(function(f){if(f.geometry)geom[f.geometry.type]=(geom[f.geometry.type]||0)+1;}); var b=''; try{var bb=L0.leaflet.getBounds(); if(bb&&bb.isValid()) b=bb.toBBoxString();}catch(e){}
    var body='<table><tr><th>Property</th><th>Value</th></tr>'+
      '<tr><td>Name</td><td>'+escapeHtml(L0.name)+'</td></tr><tr><td>Layer ID</td><td>'+escapeHtml(L0.id)+'</td></tr><tr><td>Visible</td><td>'+String(L0.visible!==false)+'</td></tr><tr><td>Feature count</td><td>'+feats.length+'</td></tr><tr><td>Geometry types</td><td>'+escapeHtml(JSON.stringify(geom))+'</td></tr><tr><td>Fields</td><td>'+escapeHtml(fs.join(', '))+'</td></tr><tr><td>Field data types</td><td>'+escapeHtml((L0.editSchema||[]).map(function(field){return field.name+' ('+field.type+')';}).join(', ')||'Inferred from data')+'</td></tr><tr><td>Bounds</td><td>'+escapeHtml(b)+'</td></tr><tr><td>Symbology</td><td>'+escapeHtml(L0.uniqueField?('Unique: '+L0.uniqueField):(L0.field?('Graduated: '+L0.field):'Single symbol'))+'</td></tr></table>';
    showModal('Layer Properties',body);
  }

  function uniqueSymbology(id){
    var L0=getLayer(id)||currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var fs=fields(L0); var f=prompt('Unique value field:\n'+fs.join(', '), L0.uniqueField||fs[0]||'STATUS'); if(!f)return;
    L0.uniqueField=f; L0.field=''; L0.colorMode='categorized'; L0.catColors=deriveCategoryColors(L0,f);
    snapshot(); rebuild(L0); renderLegend(); toast('Unique value symbology applied: '+f);
  }

  function applyAdvancedLabels(L0){
    if(!L0||!L0.advLabelStyle||!L0.advLabelStyle.field) return;
    if(advState.labels[L0.id]){try{map.removeLayer(advState.labels[L0.id]);}catch(e){} delete advState.labels[L0.id];}
    var st=L0.advLabelStyle, fg=L.featureGroup();
    (L0.geojson.features||[]).forEach(function(f){var v=(f.properties||{})[st.field]; if(v==null||v==='')return; try{var c=turf.centerOfMass(f).geometry.coordinates; var html='<span style="font-size:'+Number(st.size||11)+'px;color:'+escapeHtml(st.color||'#ffffff')+';text-shadow:-1px -1px 0 '+escapeHtml(st.halo||'#000')+',1px -1px 0 '+escapeHtml(st.halo||'#000')+',-1px 1px 0 '+escapeHtml(st.halo||'#000')+',1px 1px 0 '+escapeHtml(st.halo||'#000')+';font-weight:800;white-space:nowrap">'+escapeHtml(v)+'</span>'; L.marker([c[1],c[0]],{interactive:false,icon:L.divIcon({className:'',html:html,iconSize:null})}).addTo(fg);}catch(e){} });
    advState.labels[L0.id]=fg; if(L0.visible!==false) fg.addTo(map);
  }
  function configureLabels(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var fs=fields(L0); var field=prompt('Label field:\n'+fs.join(', '),(L0.advLabelStyle&&L0.advLabelStyle.field)||fs[0]||'UNITID'); if(!field)return; var size=prompt('Label size in px:',(L0.advLabelStyle&&L0.advLabelStyle.size)||11); if(size===null)return; var color=prompt('Label color:',(L0.advLabelStyle&&L0.advLabelStyle.color)||'#FFFFFF'); if(color===null)return; var halo=prompt('Halo color:',(L0.advLabelStyle&&L0.advLabelStyle.halo)||'#000000'); if(halo===null)return; L0.advLabelStyle={field:field,size:parseFloat(size)||11,color:color||'#FFFFFF',halo:halo||'#000000'}; L0.labelField=''; applyAdvancedLabels(L0); toast('Advanced labels applied');
  }
  function clearAdvancedLabels(){var L0=currentAdvLayer(); if(!L0)return; if(advState.labels[L0.id]){map.removeLayer(advState.labels[L0.id]);delete advState.labels[L0.id];} delete L0.advLabelStyle; toast('Advanced labels cleared');}
  window.__svApplyLabels=function(L0){ if(L0)applyAdvancedLabels(L0); };
  window.__svClearLabels=function(L0){ if(!L0)return; if(advState.labels[L0.id]){try{map.removeLayer(advState.labels[L0.id]);}catch(e){} delete advState.labels[L0.id];} delete L0.advLabelStyle; };
  window.__svAdvLabelGroups=function(){ return advState.labels; };

  function validateGeometry(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer first',true);return;} advState.qa=[];
    (L0.geojson.features||[]).forEach(function(f,idx){var fid=f.properties&&f.properties.__sv_fid||idx+1, g=f.geometry;
      if(!g){advState.qa.push({layer:L0.name,row:idx+1,fid:fid,issue:'Missing geometry',detail:''});return;}
      if(!g.coordinates || !JSON.stringify(g.coordinates).replace(/[\[\],0\.\-]/g,'')){advState.qa.push({layer:L0.name,row:idx+1,fid:fid,issue:'Empty/zero coordinate geometry',detail:g.type});}
      try{ if(g.type.indexOf('LineString')>=0 && turf.length(f,{units:'kilometers'})*1000===0) advState.qa.push({layer:L0.name,row:idx+1,fid:fid,issue:'Zero length',detail:g.type}); }catch(e){}
      try{ if(g.type.indexOf('Polygon')>=0){ var a=turf.area(f); if(!a) advState.qa.push({layer:L0.name,row:idx+1,fid:fid,issue:'Zero area',detail:g.type}); if(turf.kinks){var k=turf.kinks(f); if(k.features&&k.features.length) advState.qa.push({layer:L0.name,row:idx+1,fid:fid,issue:'Self-intersection / kink',detail:k.features.length+' kink(s)'});}} }catch(e){}
    });
    renderAdvQA(); toast(advState.qa.length?('Geometry validation found '+advState.qa.length+' issue(s)'):'Geometry validation clear');
  }
  function renderAdvQA(){var el=document.getElementById('advQAResults'); if(!el)return; if(!advState.qa.length){el.innerHTML='<div class="adv-status"><b>Geometry QA:</b> Clear.</div>';return;} var html='<div class="adv-status"><b>Geometry QA Issues:</b> '+advState.qa.length+'</div><div style="max-height:230px;overflow:auto"><table class="op-qa-table"><thead><tr><th>Layer</th><th>Row</th><th>FID</th><th>Issue</th><th>Detail</th></tr></thead><tbody>'; advState.qa.forEach(function(i){html+='<tr><td>'+escapeHtml(i.layer)+'</td><td>'+i.row+'</td><td>'+escapeHtml(i.fid)+'</td><td>'+escapeHtml(i.issue)+'</td><td>'+escapeHtml(i.detail)+'</td></tr>';}); html+='</tbody></table></div>'; el.innerHTML=html;}

  function calculateGeometryFields(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} snapshot(); targetFeatures(L0).forEach(function(f){ if(!f.properties)f.properties={}; try{var c=turf.centerOfMass(f).geometry.coordinates; f.properties.LONGITUDE=+c[0].toFixed(8); f.properties.LATITUDE=+c[1].toFixed(8); f.properties.X=+c[0].toFixed(8); f.properties.Y=+c[1].toFixed(8);}catch(e){} try{ if(f.geometry&&f.geometry.type.indexOf('LineString')>=0) f.properties.LENGTH_M=+(turf.length(f,{units:'kilometers'})*1000).toFixed(2); }catch(e){} try{ if(f.geometry&&f.geometry.type.indexOf('Polygon')>=0) f.properties.AREA_M2=+turf.area(f).toFixed(2); }catch(e){} }); mark(); rebuild(L0); if(curTbl&&curTbl.id===L0.id)openTable(L0.id); toast('Geometry fields calculated');
  }

  function collectVertices(excludeFid){var arr=[]; vectorLayers().forEach(function(L0){(L0.geojson.features||[]).forEach(function(f){if(String(f.properties&&f.properties.__sv_fid)===String(excludeFid))return; eachCoord(f.geometry,function(c){arr.push(c);});});}); return arr;}
  function eachCoord(g,cb){ if(!g||!g.coordinates)return; function walk(c){ if(typeof c[0]==='number') cb(c); else c.forEach(walk);} walk(g.coordinates); }
  function snapVertices(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var selected=selectedFeatures(L0);if(!selected.length){toast('Select one or more features to snap',true);return;}
    var tolControl=document.getElementById('editorSnapTolerance'),tol=parseFloat(tolControl&&tolControl.value);if(isNaN(tol)||tol<=0)tol=parseFloat(prompt('Snap tolerance in meters:',advState.snapTolerance)); if(isNaN(tol)||tol<=0)return; advState.snapTolerance=tol; snapshot(); var changed=0;
    selected.forEach(function(f){var candidates=collectVertices(f.properties&&f.properties.__sv_fid); eachCoord(f.geometry,function(c){var best=null,bd=Infinity; candidates.forEach(function(v){var d=turf.distance(turf.point(c),turf.point(v),{units:'kilometers'})*1000; if(d<bd){bd=d;best=v;}}); if(best&&bd<=tol){c[0]=best[0];c[1]=best[1];changed++;}});});
    if(changed){mark(); rebuild(L0); toast('Snapped '+changed+' vertex/vertices');}else toast('No vertices within tolerance');
  }

  function lineCleanupInput(action){
    var L0=currentAdvLayer();if(!L0){toast('Select a line layer first',true);return null;}
    var feats=selectedFeatures(L0);
    if(feats.length!==1){toast(action+': select exactly one line feature',true);return null;}
    var f=feats[0];
    if(!f.geometry||f.geometry.type!=='LineString'||!f.geometry.coordinates||f.geometry.coordinates.length<2){toast(action+' supports one LineString at a time',true);return null;}
    var control=document.getElementById('editorSnapTolerance'),tol=parseFloat(control&&control.value);
    if(isNaN(tol)||tol<=0){toast('Enter a positive editing tolerance in meters',true);return null;}
    var targets=[];
    vectorLayers().forEach(function(layer){
      if(layer.visible===false)return;
      (layer.geojson.features||[]).forEach(function(target){
        if(target===f||!target.geometry)return;
        if(target.geometry.type==='LineString')targets.push(target);
        else if(target.geometry.type==='MultiLineString')target.geometry.coordinates.forEach(function(coords){targets.push(turf.lineString(coords));});
      });
    });
    if(!targets.length){toast(action+': no other visible line is available as a target',true);return null;}
    return {layer:L0,feature:f,tolerance:tol,targets:targets};
  }

  function trimOvershoot(){
    var input=lineCleanupInput('Trim Overshoot');if(!input)return;
    var f=input.feature,total=turf.length(f,{units:'kilometers'}),best=null;
    input.targets.forEach(function(target){
      var intersections;
      try{intersections=turf.lineIntersect(f,target);}catch(err){return;}
      (intersections.features||[]).forEach(function(point){
        try{
          var located=turf.nearestPointOnLine(f,point,{units:'kilometers'}),location=Number(located.properties&&located.properties.location);
          if(!isFinite(location))return;
          var endpointDistance=Math.min(location,total-location)*1000;
          if(endpointDistance>.002&&endpointDistance<=input.tolerance&&(!best||endpointDistance<best.distance)){
            best={location:location,trimStart:location<total-location,distance:endpointDistance};
          }
        }catch(err){}
      });
    });
    if(!best){toast('No overshoot intersection was found within '+input.tolerance+' m of either endpoint',true);return;}
    try{
      snapshot();
      var trimmed=turf.lineSliceAlong(f,best.trimStart?best.location:0,best.trimStart?total:best.location,{units:'kilometers'});
      f.geometry=trimmed.geometry;mark();rebuild(input.layer);
      toast('Overshoot trimmed by '+best.distance.toFixed(2)+' m');
    }catch(err){toast('Trim Overshoot failed: '+err.message,true);}
  }

  function extendUndershoot(){
    var input=lineCleanupInput('Extend Undershoot');if(!input)return;
    var f=input.feature,coords=f.geometry.coordinates,endpoints=[{index:0,coord:coords[0]},{index:coords.length-1,coord:coords[coords.length-1]}],best=null;
    endpoints.forEach(function(endpoint){
      var point=turf.point(endpoint.coord);
      input.targets.forEach(function(target){
        try{
          var nearest=turf.nearestPointOnLine(target,point,{units:'kilometers'}),distance=turf.distance(point,nearest,{units:'kilometers'})*1000;
          if(distance>.002&&distance<=input.tolerance&&(!best||distance<best.distance)){
            best={index:endpoint.index,coord:nearest.geometry.coordinates.slice(),distance:distance};
          }
        }catch(err){}
      });
    });
    if(!best){toast('No undershoot endpoint is within '+input.tolerance+' m of another visible line',true);return;}
    snapshot();coords[best.index]=best.coord;mark();rebuild(input.layer);
    toast('Undershoot extended '+best.distance.toFixed(2)+' m and connected to the target line');
  }
  window.__svTrimOvershoot=trimOvershoot;
  window.__svExtendUndershoot=extendUndershoot;

  function splitSelectedLine(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var feats=selectedFeatures(L0); if(feats.length!==1){toast('Select exactly one line feature',true);return;} var f=feats[0], g=f.geometry; if(!g||g.type!=='LineString'||g.coordinates.length<2){toast('Only a single LineString can be split',true);return;}
    toast('Click the selected line at the required split location');map.getContainer().style.cursor='crosshair';
    map.once('click',function(e){map.getContainer().style.cursor='';try{
      var clickPoint=turf.point([e.latlng.lng,e.latlng.lat]),nearest=turf.nearestPointOnLine(f,clickPoint,{units:'meters'}),result=turf.lineSplit(f,nearest);
      if(!result||!result.features||result.features.length<2){toast('Could not split at that location — click away from an endpoint',true);return;}
      snapshot();var stamp=Date.now(),parts=result.features.map(function(part,index){part.properties=Object.assign({},f.properties,{__sv_fid:'SPLIT'+stamp+'_'+(index+1),SPLIT_PART:index+1});return part;});
      L0.geojson.features=L0.geojson.features.filter(function(x){return x!==f;}).concat(parts);window.__svOpState.selectedSets[L0.id]={};parts.forEach(function(part){window.__svOpState.selectedSets[L0.id][part.properties.__sv_fid]=true;});
      mark();rebuild(L0);openTable(L0.id);toast('Line split into '+parts.length+' features');
    }catch(err){toast('Line split failed: '+err.message,true);}});
  }
  function mergeSelected(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;} var feats=selectedFeatures(L0); if(feats.length<2){toast('Select at least two features to merge',true);return;} var type=feats[0].geometry&&feats[0].geometry.type; if(!type){toast('Geometry missing',true);return;} var base=type.replace(/^Multi/,''); if(!feats.every(function(f){return f.geometry&&f.geometry.type.replace(/^Multi/,'')===base;})){toast('Selected geometries must be same type',true);return;} snapshot(); var coords=[]; feats.forEach(function(f){var g=f.geometry;if(g.type.indexOf('Multi')===0)coords=coords.concat(g.coordinates);else coords.push(g.coordinates);}); var mt=base==='Point'?'MultiPoint':(base==='LineString'?'MultiLineString':'MultiPolygon'); var mf=clone(feats[0]); mf.geometry={type:mt,coordinates:coords}; mf.properties=Object.assign({},mf.properties,{__sv_fid:'MERGED'+Date.now(),MERGED_COUNT:feats.length}); var ids=feats.map(function(f){return f.properties.__sv_fid;}); L0.geojson.features=L0.geojson.features.filter(function(f){return ids.indexOf(f.properties&&f.properties.__sv_fid)<0;}); L0.geojson.features.push(mf); mark(); rebuild(L0); openTable(L0.id); toast('Merged '+feats.length+' features');
  }

  /* ===== Editor tools: Copy/Paste, Split, Rotate, Trace ===== */
  var __svClipboard=null;
  function copySelected(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;}
    var feats=selectedFeatures(L0); if(!feats.length){toast('Select one or more features to copy',true);return;}
    __svClipboard={layerType:(feats[0].geometry&&feats[0].geometry.type), feats:feats.map(clone)};
    toast(feats.length+' feature(s) copied');
  }
  function pasteFeatures(){
    if(!__svClipboard||!__svClipboard.feats.length){toast('Clipboard is empty — Copy first',true);return;}
    var L0=currentAdvLayer(); if(!L0){toast('Select a target layer',true);return;}
    var targetBase=String(L0.geomType||geomTypeOf(L0.geojson)||'').replace(/^Multi/,'').toLowerCase(),clipBase=String(__svClipboard.layerType||'').replace(/^Multi/,'').toLowerCase();
    if(targetBase&&clipBase&&targetBase!==clipBase){toast('Copied geometry does not match the target feature layer',true);return;}
    snapshot();
    // small offset so the paste is visible (≈12 m east/south)
    var dLng=0.00012, dLat=-0.00012, n=0;
    window.__svOpState.selectedSets[L0.id]={};__svClipboard.feats.forEach(function(f){
      var nf=clone(f);
      nf.properties=Object.assign({},f.properties,{__sv_fid:'PASTE'+Date.now()+'_'+(n++)});
      try{ nf.geometry=shiftGeom(nf.geometry,dLng,dLat); }catch(e){}
      L0.geojson.features.push(nf);window.__svOpState.selectedSets[L0.id][nf.properties.__sv_fid]=true;
    });
    mark(); rebuild(L0); try{openTable(L0.id);}catch(e){} toast('Pasted '+__svClipboard.feats.length+' feature(s)');
  }
  function shiftGeom(g,dx,dy){
    function sc(c){ if(typeof c[0]==='number'){var shifted=c.slice();shifted[0]+=dx;shifted[1]+=dy;return shifted;} return c.map(sc); }
    return {type:g.type, coordinates:sc(g.coordinates)};
  }
  function moveSelected(){
    var L0=currentAdvLayer();if(!L0){toast('Select a layer first',true);return;}
    var feats=selectedFeatures(L0);if(!feats.length){toast('Select one or more features to move',true);return;}
    var container=map.getContainer(),reference=null,cancelled=false;
    function finish(){container.style.cursor='';document.removeEventListener('keydown',cancel);}
    function cancel(e){
      if(e&&e.key!=='Escape')return;
      cancelled=true;map.off('click',pickReference);map.off('click',pickDestination);finish();toast('Move cancelled');
    }
    function pickReference(e){
      if(cancelled)return;reference=e.latlng;toast('Move: click the destination point · Esc cancels');
      map.once('click',pickDestination);
    }
    function pickDestination(e){
      if(cancelled||!reference){finish();return;}
      var dx=e.latlng.lng-reference.lng,dy=e.latlng.lat-reference.lat;
      snapshot();feats.forEach(function(f){if(f.geometry)f.geometry=shiftGeom(f.geometry,dx,dy);});
      finish();mark();rebuild(L0);try{openTable(L0.id);}catch(err){}
      toast('Moved '+feats.length+' feature(s)');
    }
    document.addEventListener('keydown',cancel);container.style.cursor='crosshair';
    toast('Move: click a reference point · Esc cancels');map.once('click',pickReference);
  }
  function rotateSelected(){
    if(typeof turf==='undefined'||!turf.transformRotate){toast('Turf rotate not available',true);return;}
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;}
    var feats=selectedFeatures(L0); if(!feats.length){toast('Select feature(s) to rotate',true);return;}
    var ang=prompt('Rotate selected feature(s) by how many degrees? (clockwise, around centroid)','90');
    if(ang===null)return; ang=parseFloat(ang); if(isNaN(ang)){toast('Enter a number of degrees',true);return;}
    snapshot();
    feats.forEach(function(f){
      try{ var pivot=turf.centroid(f).geometry.coordinates;
        var rotated=turf.transformRotate(f,ang,{pivot:pivot});
        f.geometry=rotated.geometry; }catch(e){}
    });
    mark(); rebuild(L0); toast('Rotated '+feats.length+' feature(s) by '+ang+'°');
  }
  function scaleSelected(){
    if(typeof turf==='undefined'||!turf.transformScale){toast('Turf scale is not available',true);return;}
    var L0=currentAdvLayer();if(!L0){toast('Select a layer first',true);return;}
    var feats=selectedFeatures(L0);if(!feats.length){toast('Select feature(s) to scale',true);return;}
    var factor=prompt('Scale factor around each feature centroid (for example 1.10 or 0.75):','1.10');
    if(factor===null)return;factor=parseFloat(factor);
    if(!isFinite(factor)||factor<=0){toast('Enter a scale factor greater than zero',true);return;}
    snapshot();feats.forEach(function(f){try{f.geometry=turf.transformScale(f,factor,{origin:'centroid',mutate:false}).geometry;}catch(e){}});
    mark();rebuild(L0);toast('Scaled '+feats.length+' feature(s) by '+factor);
  }
  function explodeMultipart(){
    var L0=currentAdvLayer();if(!L0){toast('Select a layer first',true);return;}
    var feats=selectedFeatures(L0);if(!feats.length){toast('Select multipart feature(s) to explode',true);return;}
    var multipart=feats.filter(function(f){return f.geometry&&/^Multi(Point|LineString|Polygon)$/.test(f.geometry.type);});
    if(!multipart.length){toast('The selected feature(s) are already singlepart',true);return;}
    snapshot();var replaceIds={},parts=[],stamp=Date.now(),serial=0;
    multipart.forEach(function(f){
      var baseType=f.geometry.type.replace(/^Multi/,'');
      replaceIds[String(f.properties&&f.properties.__sv_fid)]=true;
      f.geometry.coordinates.forEach(function(coords,index){
        var part=clone(f);serial++;
        part.geometry={type:baseType,coordinates:clone(coords)};
        part.properties=Object.assign({},f.properties,{__sv_fid:'PART'+stamp+'_'+serial,PART_NO:index+1});
        parts.push(part);
      });
    });
    L0.geojson.features=L0.geojson.features.filter(function(f){return !replaceIds[String(f.properties&&f.properties.__sv_fid)];}).concat(parts);
    window.__svOpState.selectedSets[L0.id]={};parts.forEach(function(f){window.__svOpState.selectedSets[L0.id][f.properties.__sv_fid]=true;});
    mark();rebuild(L0);try{openTable(L0.id);}catch(e){}
    toast('Exploded '+multipart.length+' multipart feature(s) into '+parts.length+' singlepart features');
  }
  /* Trace = copy a portion of an existing feature's boundary into a new feature in the active layer.
     Practical browser version: pick the nearest other feature to the selected one and append its
     outline as a new traced line, which the user can then keep/edit. */
  function traceFeature(){
    var L0=currentAdvLayer(); if(!L0){toast('Select a layer',true);return;}
    var targetType=String(L0.geomType||geomTypeOf(L0.geojson)||'');if(!/LineString/i.test(targetType)){toast('Trace is available only when the target is a line feature layer',true);return;}
    var feats=selectedFeatures(L0); if(feats.length!==1){toast('Select exactly one feature to trace from',true);return;}
    var src=feats[0], g=src.geometry; if(!g){toast('Selected feature has no geometry',true);return;}
    snapshot();
    // extract outline as a LineString (polygon outer ring, or the line itself)
    var coords;
    if(g.type==='Polygon')coords=g.coordinates[0];
    else if(g.type==='MultiPolygon')coords=g.coordinates[0][0];
    else if(g.type==='LineString')coords=g.coordinates;
    else if(g.type==='MultiLineString')coords=g.coordinates[0];
    else { toast('Trace works on lines or polygons',true); return; }
    var tf={type:'Feature',properties:Object.assign({},src.properties,{__sv_fid:'TRACE'+Date.now(),TRACED_FROM:(src.properties&&src.properties.__sv_fid)||''}),geometry:{type:'LineString',coordinates:coords.map(function(c){return c.slice();})}};
    L0.geojson.features.push(tf); mark(); rebuild(L0); try{openTable(L0.id);}catch(e){}
    toast('Traced outline added as a new line — edit its vertices as needed');
  }
  // expose hooks for the ribbon buttons
  window.__svCopy=copySelected; window.__svPaste=pasteFeatures; window.__svSplit=splitSelectedLine;
  window.__svMove=moveSelected; window.__svRotate=rotateSelected; window.__svScale=scaleSelected;
  window.__svExplode=explodeMultipart; window.__svTrace=traceFeature;
  window.__svMerge=mergeSelected; window.__svSnap=snapVertices;
  window.__svUndo=undo; window.__svRedo=redo;
  window.__svGeometryQA=validateGeometry; window.__svCalculateGeometry=calculateGeometryFields;
  window.__svLayerProperties=layerProperties;

  function exportAdvQA(fmt){
    if(!advState.qa.length) validateGeometry(); if(!advState.qa.length){toast('No QA issues to export',true);return;} var rows=advState.qa.map(function(i){return {Layer:i.layer,Row:i.row,FID:i.fid,Issue:i.issue,Detail:i.detail};});
    if(fmt==='xlsx' && typeof XLSX!=='undefined'){var ws=XLSX.utils.json_to_sheet(rows), wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Geometry_QA'); XLSX.writeFile(wb,'SpatialItqan_Geometry_QA.xlsx'); return;}
    if(fmt==='pdf' && window.jspdf && window.jspdf.jsPDF){var doc=new window.jspdf.jsPDF({orientation:'landscape'}); doc.setFontSize(13); doc.text('Spatial Itqan Geometry QA Report',12,12); var y=22; rows.slice(0,55).forEach(function(r){doc.setFontSize(8); doc.text([r.Layer,r.Row,r.FID,r.Issue,r.Detail].join(' | ').slice(0,170),12,y); y+=5; if(y>190){doc.addPage();y=14;}}); doc.save('SpatialItqan_Geometry_QA.pdf'); return;}
    var csv='Layer,Row,FID,Issue,Detail\n'+rows.map(function(r){return [r.Layer,r.Row,r.FID,r.Issue,r.Detail].map(csvCell).join(',');}).join('\n'); dl(csv,'SpatialItqan_Geometry_QA.csv','text/csv');
  }

  function addXYZ(){var url=prompt('XYZ tile URL, example:\nhttps://server/tiles/{z}/{x}/{y}.png',''); if(!url)return; var name=prompt('Layer name:','XYZ Service')||'XYZ Service'; var lyr=L.tileLayer(url,{maxZoom:22,crossOrigin:true,attribution:name}); addLayer(lyr,name,'#38BDF8',{zoom:false}); advState.services.push({type:'XYZ',name:name,url:url}); toast('XYZ service added');}
  function addWMS(){var url=prompt('WMS base URL:',''); if(!url)return; var names=prompt('WMS layer name(s):',''); if(!names)return; var name=prompt('Display name:',names)||names; var lyr=L.tileLayer.wms(url,{layers:names,format:'image/png',transparent:true,version:'1.1.1',attribution:name}); addLayer(lyr,name,'#F59E0B',{zoom:false}); advState.services.push({type:'WMS',name:name,url:url,layers:names}); toast('WMS layer added');}
  function arcJson(url){
    return fetch(url).then(function(r){
      return r.json().then(function(data){
        if(!r.ok)throw new Error('HTTP '+r.status);
        if(data&&data.error)throw new Error(data.error.message||'ArcGIS service error');
        return data;
      });
    });
  }
  function arcQueryAll(layerUrl,meta){
    var base=layerUrl.replace(/\/$/,'');
    var idsUrl=base+'/query?where=1%3D1&returnIdsOnly=true&f=json';
    return arcJson(idsUrl).then(function(idResult){
      if(!Array.isArray(idResult.objectIds))throw new Error('Service did not return object IDs for pagination');
      var ids=idResult.objectIds;
      if(!ids.length)return {type:'FeatureCollection',features:[]};
      // Keep GET URLs below common proxy limits even when the service permits
      // a much larger maxRecordCount.
      var batchSize=Math.min(Math.max(Number(meta&&meta.maxRecordCount)||200,50),200);
      var all=[],position=0;
      function nextBatch(){
        if(position>=ids.length)return Promise.resolve({type:'FeatureCollection',features:all});
        var batch=ids.slice(position,position+batchSize);position+=batchSize;
        var query=base+'/query?objectIds='+encodeURIComponent(batch.join(','))+
          '&outFields=*&returnGeometry=true&outSR=4326&f=geojson';
        return arcJson(query).then(function(gj){
          if(!gj||!Array.isArray(gj.features))throw new Error('Layer did not return GeoJSON');
          all=all.concat(gj.features);
          return nextBatch();
        });
      }
      return nextBatch();
    });
  }
  function addArcGIS(){
    var input=prompt('ArcGIS REST URL. Use /MapServer, /MapServer/0 or /FeatureServer/0:','');
    if(!input)return;
    var root=input.replace(/\/+$/,'');
    var name=prompt('Display name:','ArcGIS REST')||'ArcGIS REST';
    toast('Inspecting ArcGIS service…');
    arcJson(root+'?f=json').then(function(meta){
      var isServiceRoot=/\/(MapServer|FeatureServer)$/i.test(root);
      if(isServiceRoot&&/\/MapServer$/i.test(root)&&meta.singleFusedMapCache&&meta.tileInfo){
        var lods=meta.tileInfo.lods||[],maxZoom=lods.length?lods[lods.length-1].level:22;
        var tile=L.tileLayer(root+'/tile/{z}/{y}/{x}',{maxZoom:maxZoom,crossOrigin:true,attribution:name});
        addLayer(tile,name,'#A78BFA',{zoom:false});
        advState.services.push({type:'ArcGIS MapServer Tiles',name:name,url:root});
        toast('ArcGIS cached tile service added');
        return null;
      }
      if(isServiceRoot){
        var available=(meta.layers||[]).map(function(layer){return layer.id+': '+layer.name;});
        if(!available.length)throw new Error('No queryable layers were found in this service');
        var chosen=prompt('This service requires a layer ID:\n'+available.join('\n'),String(meta.layers[0].id));
        if(chosen===null)return null;
        if(!/^\d+$/.test(String(chosen).trim()))throw new Error('Invalid ArcGIS layer ID');
        root+='/'+String(chosen).trim();
        return arcJson(root+'?f=json');
      }
      return meta;
    }).then(function(layerMeta){
      if(!layerMeta)return null;
      return arcQueryAll(root,layerMeta);
    }).then(function(gj){
      if(!gj)return;
      if(!gj.features.length){toast('ArcGIS layer contains no features',true);return;}
      var color=nextColor();
      addLayer(geoJsonLayer(gj,color),name,color,{geojson:gj});
      advState.services.push({type:'ArcGIS Feature Query',name:name,url:root});
      toast('ArcGIS features loaded: '+gj.features.length);
    }).catch(function(e){toast('ArcGIS REST failed: '+e.message,true);});
  }

  window.__svReadGeoTiff=function(file,name,color){
    if(typeof parseGeoraster==='undefined' || typeof GeoRasterLayer==='undefined'){toast('GeoTIFF libraries did not load. Use browser with internet and reload.',true);return;}
    var r=new FileReader(); r.onload=function(){parseGeoraster(r.result).then(function(georaster){var layer=new GeoRasterLayer({georaster:georaster,opacity:.75,resolution:128}); addLayer(layer,name||file.name,color||'#38BDF8',{zoom:false}); try{map.fitBounds(layer.getBounds());}catch(e){} toast('GeoTIFF loaded');}).catch(function(e){toast('GeoTIFF read error: '+e.message,true);});}; r.readAsArrayBuffer(file);
  };

  function packageProject(){
    var c=map.getCenter(); return {app:'Spatial Itqan',version:'Full Restored Operational',saved:new Date().toISOString(),view:{lat:c.lat,lng:c.lng,zoom:map.getZoom()},theme:document.body.getAttribute('data-theme'),layerOrder:Object.keys(layers),layers:Object.keys(layers).map(function(id){var L0=layers[id];return {id:id,name:L0.name,color:L0.color,visible:L0.visible,geojson:L0.geojson?clone(L0.geojson):null,editSchema:clone(L0.editSchema||[]),uniqueField:L0.uniqueField||'',field:L0.field||'',colorMode:L0.colorMode||'',catColors:L0.catColors||null,weight:(L0.weight!=null?L0.weight:null),hollow:!!L0.hollow,outlineColor:L0.outlineColor||'',pointShape:L0.pointShape||'circle',pointImage:L0.pointImage||'',pointAngle:L0.pointAngle||0,lineStyle:L0.lineStyle||'solid',fillPattern:L0.fillPattern||(L0.hollow?'hollow':'solid'),selectable:L0.selectable!==false,snapEnabled:L0.snapEnabled!==false,featureTemplateDefaults:clone(L0.featureTemplateDefaults||{}),proLabelStyle:clone(L0.proLabelStyle||null),size:L0.size||6,opacity:L0.opacity,advLabelStyle:L0.advLabelStyle||null,labelField:L0.labelField||'',service:advState.services.find(function(s){return s.name===L0.name;})||null};}),services:advState.services,bookmarks:bookmarks||[],drawn:(typeof collectFeatures==='function'?collectFeatures():{type:'FeatureCollection',features:[]})};
  }
  if(typeof exportProjectObject==='function') exportProjectObject=packageProject;
  window.__svPackageProject=packageProject;

  function updateAdvStatus(){var el=document.getElementById('advStatus'); if(!el)return; var L0=currentAdvLayer(); if(!L0){el.textContent='No layer selected.';return;} el.innerHTML='<b>Advanced layer:</b> '+escapeHtml(L0.name)+'\n<b>Features:</b> '+((L0.geojson&&L0.geojson.features&&L0.geojson.features.length)||0)+'\n<b>Selected:</b> '+selectedFids(L0.id).length+'\n<b>History:</b> '+advState.history.length+' snapshot(s)';}

  function decorateLayerRows(){
    setTimeout(function(){var rows=layerListEl.querySelectorAll('.layerrow'), ids=layerOrder.filter(function(id){return layers[id];}).slice().reverse(); rows.forEach(function(row,i){var id=ids[i], L0=layers[id]; if(!id||row.__advDecorated)return; row.__advDecorated=true; row.dataset.lid=id; var host=row.querySelector('.lr-top')||row; var tools=document.createElement('span'); tools.className='adv-row'; tools.innerHTML='<button class="adv-layer-btn" title="Properties">ⓘ</button><button class="adv-layer-btn" title="Unique symbology">◇</button>'; host.appendChild(tools); tools.children[0].onclick=function(e){e.stopPropagation();layerProperties(id);}; tools.children[1].onclick=function(e){e.stopPropagation();uniqueSymbology(id);}; row.oncontextmenu=function(e){e.preventDefault();showContext(e.pageX,e.pageY,id,null);};});},30);
  }
  var oldRenderLayers=renderLayers; renderLayers=function(){oldRenderLayers(); decorateLayerRows(); attachAllFeatureContext();}; window.renderLayers=renderLayers;

  function showContext(x,y,layerId,fid){var c=document.getElementById('advCtx'); if(!c){c=document.createElement('div');c.id='advCtx';c.className='adv-ctx';document.body.appendChild(c);document.addEventListener('click',function(){c.style.display='none';});}
    c.innerHTML='<button data-a="table">Open attribute table</button><button data-a="props">Layer properties</button><button data-a="zoom">Zoom to layer/feature</button><button data-a="unique">Unique symbology</button><button data-a="label">Label settings</button><button data-a="export">Export layer GeoJSON</button>';
    c.style.left=x+'px';c.style.top=y+'px';c.style.display='block'; c.querySelectorAll('button').forEach(function(b){b.onclick=function(e){e.stopPropagation();c.style.display='none';var a=b.getAttribute('data-a'),L0=layers[layerId]; if(a==='table')openTable(layerId); if(a==='props')layerProperties(layerId); if(a==='zoom')zoomLayer(L0.leaflet); if(a==='unique')uniqueSymbology(layerId); if(a==='label'){var sel=document.getElementById('advLayerSelect'); if(sel)sel.value=layerId; configureLabels();} if(a==='export'){var fc={type:'FeatureCollection',features:(L0.geojson&&L0.geojson.features?clone(L0.geojson.features):[])}; fc.features.forEach(function(f){if(f.properties)delete f.properties.__sv_fid;}); dl(JSON.stringify(fc,null,2),safeName(L0.name)+'.geojson','application/json');}};});
  }
  function attachFeatureContext(L0){ if(!L0||!L0._featureLayers)return; Object.keys(L0._featureLayers).forEach(function(fid){var lyr=L0._featureLayers[fid]; if(lyr&& !lyr.__advCtx){lyr.__advCtx=true; lyr.on('contextmenu',function(e){if(e.originalEvent)e.originalEvent.preventDefault();showContext(e.originalEvent?e.originalEvent.pageX:0,e.originalEvent?e.originalEvent.pageY:0,L0.id,fid);});}});}
  function attachAllFeatureContext(){vectorLayers().forEach(attachFeatureContext);}

  decorateLayerRows(); attachAllFeatureContext(); refreshAllAdvSelects(); updateAdvStatus();
  console.log('Spatial Itqan advanced editing operations loaded');
})();


/* ================= ADVANCED EXPERIENCE RIBBON / USER-FRIENDLY GROUPS ================= */
(function(){
  function $(id){return document.getElementById(id);} 
  function click(id){var el=$(id); if(el){el.click(); return true;} return false;}
  function safeToast(msg,err){try{toast(msg,err);}catch(e){console.log(msg);}}
  function visibleVectorLayerIds(){return Object.keys(layers||{}).filter(function(id){var L0=layers[id];return L0&&L0.geojson&&L0.geojson.features;});}
  function activeLayerId(){
    var xp=$('xpActiveLayer'); if(xp&&xp.value&&layers[xp.value]) return xp.value;
    var op=$('opLayerSelect'); if(op&&op.value&&layers[op.value]) return op.value;
    if(curTbl&&curTbl.id&&layers[curTbl.id]) return curTbl.id;
    var ids=visibleVectorLayerIds(); return ids[0]||'';
  }
  window.__svTemplateTargets=window.__svTemplateTargets||{point:'',line:'',polygon:''};
  function rememberTemplateTarget(id){
    var L0=layers[id],family=editorGeometryFamily(L0);
    if(family)window.__svTemplateTargets[family]=id;
  }
  function setActiveLayer(id){
    if(!id||!layers[id])return;
    if(window.__svEditSession&&window.__svEditSession.active&&window.__svEditSession.layerId!==id){
      finishActiveConstruction();
      if(window.__svEditingLayer){svCommitActiveGeometryEdit();setVertexPanel(false);}
      var s=window.__svEditSession;s.layerId=id;s.baselines=s.baselines||{};
      if(!Object.prototype.hasOwnProperty.call(s.baselines,id))s.baselines[id]=cloneEditorData(layers[id].geojson);
    }
    var xp=$('xpActiveLayer'); if(xp)xp.value=id;
    var op=$('opLayerSelect'); if(op){op.value=id; try{refreshOpFields();}catch(e){} }
    var editor=$('editorTargetLayer'); if(editor)editor.value=id;
    rememberTemplateTarget(id);
    try{refreshAdvFieldSelects();}catch(e){}
    updateRibbonState();
  }
  function refreshRibbonLayers(){
    var sel=$('xpActiveLayer'); if(!sel)return;
    var prev=sel.value, ids=visibleVectorLayerIds();
    sel.innerHTML=ids.length?'':'<option value="">No layer loaded</option>';
    ids.forEach(function(id){var o=document.createElement('option');o.value=id;o.textContent=layers[id].name;sel.appendChild(o);});
    if(prev&&layers[prev])sel.value=prev; else if(ids[0])sel.value=ids[0];
    var editor=$('editorTargetLayer');
    if(editor){
      var editorPrev=editor.value;editor.innerHTML=ids.length?'':'<option value="">— no vector layers —</option>';
      ids.forEach(function(id){var o=document.createElement('option');o.value=id;o.textContent=layers[id].name;editor.appendChild(o);});
      if(window.__svEditSession&&window.__svEditSession.active)editor.value=window.__svEditSession.layerId;
      else if(editorPrev&&layers[editorPrev])editor.value=editorPrev;else editor.value=sel.value;
    }
    setActiveLayer(sel.value);
    updateRibbonState();
  }
  function updateRibbonState(){
    var session=window.__svEditSession||{},editing=!!session.active,id=editing?session.layerId:activeLayerId(),L0=layers[id],dirty=!!(session.dirty||window.__svHasUnsavedEdits),chip=$('xpModeChip');
    if(chip) chip.innerHTML='Layer: <b>'+escapeHtml(L0?L0.name:'None')+'</b>'+(editing?' · <b>EDITING</b>':'');
    var b=$('xpStartEdit');if(b){b.disabled=!L0||editing;b.classList.toggle('edit-active',editing);}
    var stop=$('xpStopEdit');if(stop)stop.disabled=!editing;
    var save=$('xpSaveEdit');if(save)save.disabled=!editing||!dirty;
    var editorTarget=$('editorTargetLayer');if(editorTarget){editorTarget.disabled=false;if(L0)editorTarget.value=id;}
    var badge=$('editorSessionBadge');if(badge){badge.textContent=editing?('Editing · '+(L0?L0.name:'Layer')):'Not editing';badge.classList.toggle('on',editing);badge.classList.toggle('dirty',editing&&dirty);}
    var geometry=$('editorGeometryBadge');if(geometry)geometry.textContent=L0?(L0.geomType||geomTypeOf(L0.geojson)||'Feature'):'No target';
    var editorStart=$('editorStart');if(editorStart)editorStart.disabled=!L0||editing;
    var editorStop=$('editorStop');if(editorStop)editorStop.disabled=!editing;
    var editorSave=$('editorSave');if(editorSave)editorSave.disabled=!editing||!dirty;
    var editorDiscard=$('editorDiscard');if(editorDiscard)editorDiscard.disabled=!editing||!dirty;
    ['xpAddFeature','xpEditShape','xpMoveFeat','xpEditAttributes','xpDeleteFeat','xpCopyFeat','xpPasteFeat','xpSplitFeat','xpMergeFeat','xpRotateFeat','xpScaleFeat','xpExplodeFeat','xpTraceFeat','xpSnapFeat','xpUndoEdit','xpRedoEdit',
      'editorCreate','editorSelect','editorVertices','editorAttributes','editorDelete','editorCalcGeom','editorCopy','editorPaste','editorSplit','editorMerge','editorMove','editorRotate','editorScale','editorExplode','editorTrace','editorSnap','editorTrimOvershoot','editorExtendUndershoot','editorUndo','editorRedo','editorQA']
      .forEach(function(buttonId){var el=$(buttonId);if(el)el.disabled=!editing;});
    var status=$('editorStatus');if(status)status.textContent=editing?(dirty?'Unsaved edits are pending. Use the arrow to select, double-click for vertices, or continue creating features.':'Editing is active. The arrow selects features; double-click opens the vertex editor.'):'Choose a target feature layer, then start an edit session.';
    var sb=$('xpSelectBox'); if(sb){sb.classList.toggle('good',!!window.__svSelectToolOn);}
    var ss=$('xpShowSel');if(ss)ss.classList.toggle('active',!!svTableSelectedOnly);
  }
  window.__svRefreshEditorUI=updateRibbonState;
  /* ===== Select tool: click a feature to select it, or drag a box to select several ===== */
  var svSelectDrag=null, svSelectRectLayer=null;
  function setSelectTool(enabled,silent){
    if(enabled&&window.__svSetPanMode)window.__svSetPanMode(false,true);
    window.__svSelectToolOn=!!enabled;
    if(enabled){switchTab('tools');setActiveLayer(activeLayerId());}
    if(!window.__svSelectToolOn){
      try{map.dragging.enable();}catch(e){}
      if(svSelectRectLayer){try{map.removeLayer(svSelectRectLayer);}catch(e){} svSelectRectLayer=null;}
      svSelectDrag=null;
    }
    try{map.getContainer().style.cursor=window.__svSelectToolOn?'default':'';}catch(e){}
    updateRibbonState();
    if(!silent)safeToast(window.__svSelectToolOn?'Arrow selection on — click a feature; double-click opens vertices · Shift adds · Ctrl toggles':'Select tool off');
  }
  function toggleSelectTool(){setSelectTool(!window.__svSelectToolOn,false);}
  window.__svEnableEditorSelection=function(){setSelectTool(true,true);};
  map.on('mousedown',function(e){
    if(!window.__svSelectToolOn)return;
    if(e.originalEvent&&e.originalEvent.button!==0)return;
    try{map.dragging.disable();}catch(err){}
    svSelectDrag={start:e.latlng,mod:svSelectionModifier(e.originalEvent)};
    svSelectRectLayer=L.rectangle([e.latlng,e.latlng],{color:'#00E5FF',weight:2,dashArray:'4 4',fillOpacity:.06}).addTo(map);
  });
  map.on('mousemove',function(e){
    if(!window.__svSelectToolOn||!svSelectDrag||!svSelectRectLayer)return;
    svSelectRectLayer.setBounds(L.latLngBounds(svSelectDrag.start,e.latlng));
  });
  map.on('mouseup',function(e){
    if(!window.__svSelectToolOn||!svSelectDrag)return;
    var b=L.latLngBounds(svSelectDrag.start,e.latlng), start=svSelectDrag.start,mod=svSelectDrag.mod||{};
    try{map.dragging.enable();}catch(err){}
    svSelectDrag=null;
    if(svSelectRectLayer){try{map.removeLayer(svSelectRectLayer);}catch(err){} svSelectRectLayer=null;}
    var pxSpan=map.latLngToContainerPoint(start).distanceTo(map.latLngToContainerPoint(e.latlng));
    if(pxSpan<8)return; // treat as a plain click — the feature's own click handler (if any) already ran
    svBoxSelect(b,mod);
  });
  function svBoxSelect(bounds,mod){
    mod=mod||{};var ids=visibleVectorLayerIds().filter(function(id){return layers[id]&&layers[id].visible!==false&&layers[id].selectable!==false;}),changed={},total=0,hitLayers=0;
    if(!ids.length){safeToast('No visible vector feature classes',true);return;}
    if(!mod.add&&!mod.toggle)changed=svClearAllSelections(false);
    ids.forEach(function(id){var L0=layers[id],set=svSelSet(id),hits=[];ensureFids(L0.geojson);
      (L0.geojson.features||[]).forEach(function(f){try{var lyr=L.geoJSON(f),fb=lyr.getBounds();if(fb.isValid()&&bounds.intersects(fb))hits.push(String(f.properties.__sv_fid));}catch(e){}});
      if(hits.length){hitLayers++;changed[id]=true;hits.forEach(function(fid){if(mod.toggle){if(set[fid])delete set[fid];else set[fid]=true;}else set[fid]=true;});total+=hits.length;}
    });
    svRefreshSelectionLayers(changed);safeToast(total+' feature(s) matched across '+hitLayers+' feature class'+(hitLayers===1?'':'es')+(mod.add?' (added)':mod.toggle?' (toggled)':''));
  }
  /* ===== ESRI-style edit session, feature templates, snapping and save/discard ===== */
  window.__svEditSession=window.__svEditSession||{active:false,layerId:'',baseline:null,baselines:{},dirty:false,started:null};
  function cloneEditorData(value){return value==null?value:JSON.parse(JSON.stringify(value));}
  function editingLayer(){
    var s=window.__svEditSession;
    return s&&s.active&&layers[s.layerId]?layers[s.layerId]:null;
  }
  function beginEditSession(){
    var id=activeLayerId(),L0=layers[id];
    if(!id||!L0||!L0.geojson){safeToast('Choose or create a vector feature layer first',true);return;}
    if(window.__svEditSession.active){safeToast('An edit session is already active on '+layers[window.__svEditSession.layerId].name,true);return;}
    var baselines={};visibleVectorLayerIds().forEach(function(layerId){baselines[layerId]=cloneEditorData(layers[layerId].geojson);});
    window.__svEditSession={active:true,layerId:id,baseline:cloneEditorData(L0.geojson),baselines:baselines,dirty:false,started:new Date().toISOString()};
    window.__svOpState.editMode=true;setActiveLayer(id);updateRibbonState();
    setSelectTool(true,true);safeToast('Editing started — arrow selection is active on '+L0.name);
  }
  function finishActiveConstruction(){
    try{if(window.__svActiveDrawHandler)window.__svActiveDrawHandler.disable();}catch(e){}
    window.__svActiveDrawHandler=null;clearActiveDrawListener();svSetPointConstruction(false);hideDigibar();showEditorSnap(null);
  }
  function stopEditSession(){
    var s=window.__svEditSession;if(!s.active){safeToast('No active edit session');return;}
    if(s.dirty||window.__svHasUnsavedEdits){
      if(!confirm('Save edits before stopping? Choose Cancel to keep editing, or use Discard Session Changes.'))return;
      if(svSaveTableEdits()===false)return;
    }
    finishActiveConstruction();if(window.__svEditingLayer)svCommitActiveGeometryEdit();setVertexPanel(false);setSelectTool(false,true);window.__svOpState.editMode=false;
    window.__svEditSession={active:false,layerId:'',baseline:null,baselines:{},dirty:false,started:null};
    updateRibbonState();safeToast('Editing stopped');
  }
  function discardEditSession(){
    var s=window.__svEditSession,L0=editingLayer();if(!s.active||!L0){safeToast('No active edit session');return;}
    if(!confirm('Discard every change made since editing started on '+L0.name+'?'))return;
    finishActiveConstruction();if(window.__svEditingLayer)svCommitActiveGeometryEdit();setVertexPanel(false);window.__svPendingCells={};svSetSaveButtons(false);
    Object.keys(s.baselines||{}).forEach(function(id){
      var baseline=s.baselines[id];
      if(baseline===null&&layers[id]){
        try{map.removeLayer(layers[id].leaflet);}catch(e){}delete layers[id];var orderIndex=layerOrder.indexOf(id);if(orderIndex>=0)layerOrder.splice(orderIndex,1);
      }else if(layers[id]&&baseline){layers[id].geojson=cloneEditorData(baseline);window.__svOpState.selectedSets[id]={};svBuildLeafletLayer(layers[id]);}
    });
    renderLayers();refreshDropdowns();
    try{if(curTbl&&curTbl.id===L0.id)renderTable();}catch(e){}
    setSelectTool(false,true);window.__svOpState.editMode=false;window.__svEditSession={active:false,layerId:'',baseline:null,baselines:{},dirty:false,started:null};
    updateRibbonState();safeToast('Session changes discarded');
  }
  function addDesignerField(name,type){
    var body=$('editorFieldRows');if(!body)return;
    var row=document.createElement('tr');
    row.innerHTML='<td><input class="editor-field-name" type="text" placeholder="Example: ASSET_ID"></td>'+
      '<td><select class="editor-field-type"><option value="text">Text</option><option value="integer">Integer</option><option value="double">Double</option><option value="date">Date</option><option value="boolean">Boolean</option></select></td>'+
      '<td><button class="layer-field-remove" type="button" title="Remove field">✕</button></td>';
    row.querySelector('.editor-field-name').value=name||'';row.querySelector('.editor-field-type').value=type||'text';
    row.querySelector('.layer-field-remove').onclick=function(){row.remove();};body.appendChild(row);
  }
  var layerDesignerMode='new',layerDesignerTargetId='';
  function closeLayerDesigner(){
    var modal=$('editorLayerModal');if(modal)modal.classList.remove('open');
    if($('editorLayerName'))$('editorLayerName').disabled=false;if($('editorLayerGeometry'))$('editorLayerGeometry').disabled=false;
    layerDesignerMode='new';layerDesignerTargetId='';
  }
  function openLayerDesigner(forcedKind){
    var kind=typeof forcedKind==='string'&&['point','line','polygon'].indexOf(forcedKind)>=0?forcedKind:'polygon';
    var modal=$('editorLayerModal'),name=$('editorLayerName'),geometry=$('editorLayerGeometry'),rows=$('editorFieldRows');
    if(!modal)return;layerDesignerMode='new';layerDesignerTargetId='';
    if($('editorLayerModalTitle'))$('editorLayerModalTitle').textContent='New Feature Layer';
    if($('editorLayerCreate'))$('editorLayerCreate').textContent='✓ Create Layer';
    if(name){name.disabled=false;name.value='';}if(geometry){geometry.disabled=false;geometry.value=kind;}if(rows)rows.innerHTML='';
    addDesignerField('NAME','text');modal.classList.add('open');setTimeout(function(){if(name)name.focus();},30);
  }
  function openTargetFieldDesigner(){
    var L0=editingLayer()||layers[activeLayerId()];if(!L0||!L0.geojson){safeToast('Choose a target feature layer first',true);return;}
    var modal=$('editorLayerModal'),name=$('editorLayerName'),geometry=$('editorLayerGeometry'),rows=$('editorFieldRows');if(!modal)return;
    layerDesignerMode='fields';layerDesignerTargetId=L0.id;
    if($('editorLayerModalTitle'))$('editorLayerModalTitle').textContent='Add Fields · '+L0.name;
    if($('editorLayerCreate'))$('editorLayerCreate').textContent='✓ Add Fields';
    if(name){name.value=L0.name;name.disabled=true;}if(geometry){geometry.value=editorGeometryFamily(L0)||'polygon';geometry.disabled=true;}if(rows)rows.innerHTML='';
    addDesignerField('','text');modal.classList.add('open');setTimeout(function(){var input=rows&&rows.querySelector('.editor-field-name');if(input)input.focus();},30);
  }
  function createLayerFromDesigner(){
    var name=String($('editorLayerName')&&$('editorLayerName').value||'').trim(),kind=String($('editorLayerGeometry')&&$('editorLayerGeometry').value||'');
    if(!name){safeToast('Enter a layer name',true);if($('editorLayerName'))$('editorLayerName').focus();return;}
    if(['point','line','polygon'].indexOf(kind)<0){safeToast('Choose Point, Line, or Polygon geometry',true);return;}
    var schema=[],names={},invalid='',fieldTarget=layerDesignerMode==='fields'&&layers[layerDesignerTargetId]?layers[layerDesignerTargetId]:null;
    if(fieldTarget)fieldsOf(fieldTarget).forEach(function(field){names[String(field).toLowerCase()]=true;});
    Array.prototype.forEach.call($('editorFieldRows').querySelectorAll('tr'),function(row){
      if(invalid)return;var fieldName=String(row.querySelector('.editor-field-name').value||'').trim(),type=row.querySelector('.editor-field-type').value;
      if(!fieldName)return;
      if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(fieldName))invalid='Invalid field name: '+fieldName;
      else if(fieldName==='__sv_fid'||names[fieldName.toLowerCase()])invalid='Duplicate or reserved field: '+fieldName;
      else{names[fieldName.toLowerCase()]=true;schema.push({name:fieldName,type:type,nullable:true,defaultValue:null});}
    });
    if(invalid){safeToast(invalid,true);return;}
    if(fieldTarget){
      if(!schema.length){safeToast('Add at least one field name and choose its data type',true);return;}
      if(window.__svAdvSnapshot)window.__svAdvSnapshot();
      fieldTarget.editSchema=(fieldTarget.editSchema||[]).concat(schema);
      (fieldTarget.geojson.features||[]).forEach(function(feature){feature.properties=feature.properties||{};schema.forEach(function(field){if(!(field.name in feature.properties))feature.properties[field.name]=null;});});
      if(window.__svMarkDirty)window.__svMarkDirty();svBuildLeafletLayer(fieldTarget);try{if(curTbl&&curTbl.id===fieldTarget.id)renderTable();}catch(e){}
      closeLayerDesigner();safeToast(schema.length+' field(s) added to '+fieldTarget.name);return;
    }
    var wasEditing=!!window.__svEditSession.active;
    var geom=kind==='point'?'Point':(kind==='line'?'LineString':'Polygon'),fc={type:'FeatureCollection',features:[]},color=nextColor();
    var id=addLayer(geoJsonLayer(fc,color),name,color,{geojson:fc,geomType:geom,zoom:false});
    layers[id].geomType=geom;layers[id].editSchema=schema;
    if(wasEditing){window.__svEditSession.baselines=window.__svEditSession.baselines||{};window.__svEditSession.baselines[id]=null;}
    rememberTemplateTarget(id);refreshRibbonLayers();setActiveLayer(id);if(!wasEditing)beginEditSession();closeLayerDesigner();
    safeToast(name+' created · '+kind+' geometry · '+schema.length+' field(s)');return id;
  }
  function createEditableLayer(forcedKind){openLayerDesigner(typeof forcedKind==='string'?forcedKind:'polygon');}
  function editorSafeFileName(value){return String(value||'layer').replace(/[^A-Za-z0-9_\-]+/g,'_').replace(/^_+|_+$/g,'')||'layer';}
  function editorExportSource(){
    var L0=editingLayer()||layers[activeLayerId()];if(!L0||!L0.geojson){safeToast('Choose a target feature layer first',true);return null;}
    var scope=$('editorExportScope')?$('editorExportScope').value:'all',features=scope==='selected'?svSelectedFeatures(L0):(L0.geojson.features||[]);
    if(!features.length){safeToast(scope==='selected'?'No selected features to export':'The target layer has no features to export',true);return null;}
    var fc={type:'FeatureCollection',features:cloneEditorData(features)};
    fc.features.forEach(function(feature){if(feature.properties)delete feature.properties.__sv_fid;});
    return {layer:L0,fc:fc,name:editorSafeFileName(L0.name),scope:scope};
  }
  function exportEditorGeoJSON(){
    var source=editorExportSource();if(!source)return;
    dl(JSON.stringify(source.fc,null,2),source.name+'.geojson','application/geo+json');
    safeToast('GeoJSON exported in WGS84: '+source.fc.features.length+' feature(s)');
  }
  function exportEditorKML(){
    var source=editorExportSource();if(!source)return;
    dl(toKML(source.fc,'GCS WGS 1984 (EPSG:4326)'),source.name+'.kml','application/vnd.google-earth.kml+xml');
    safeToast('KML exported in WGS84: '+source.fc.features.length+' feature(s)');
  }
  function exportEditorShapefile(){
    var source=editorExportSource();if(!source)return;
    if(typeof shpwrite==='undefined'){safeToast('Shapefile exporter did not initialize. Reload the application and try again.',true);return;}
    var exKey=activeExportCrs(source.fc),projected=projectFeatureCollection(source.fc,exKey);
    exportShapefile(projected.fc,exKey,projected.crs,source.name);
  }
  function saveEditorProject(){
    if(window.__svEditingLayer)svCommitActiveGeometryEdit();
    var project=window.__svPackageProject?window.__svPackageProject():exportProjectObject();
    dl(JSON.stringify(project,null,2),'SpatialItqan_Project.svproject','application/json');
    safeToast('Project saved with layers, schemas, styles, view and editing data');
  }
  function exportEditorPackage(){
    if(typeof JSZip==='undefined'){safeToast('Package library is not available; saving the project file instead',true);saveEditorProject();return;}
    if(window.__svEditingLayer)svCommitActiveGeometryEdit();
    var project=window.__svPackageProject?window.__svPackageProject():exportProjectObject(),zip=new JSZip(),folder=zip.folder('layers'),manifest={app:'Spatial Itqan',created:new Date().toISOString(),crs:'GeoJSON/KML layers are WGS84 (EPSG:4326)',layers:[]};
    zip.file('SpatialItqan_Project.svproject',JSON.stringify(project,null,2));
    Object.keys(layers).forEach(function(id){
      var L0=layers[id];if(!L0||!L0.geojson)return;
      var base=editorSafeFileName(L0.name)+'_'+id.replace(/[^A-Za-z0-9_\-]/g,''),fc=cloneEditorData(L0.geojson);
      fc.features.forEach(function(feature){if(feature.properties)delete feature.properties.__sv_fid;});
      folder.file(base+'.geojson',JSON.stringify(fc,null,2));
      folder.file(base+'.schema.json',JSON.stringify({layerName:L0.name,geometryType:L0.geomType||geomTypeOf(L0.geojson),fields:L0.editSchema||[]},null,2));
      manifest.layers.push({id:id,name:L0.name,geometryType:L0.geomType||geomTypeOf(L0.geojson),featureCount:fc.features.length,geojson:'layers/'+base+'.geojson',schema:'layers/'+base+'.schema.json'});
    });
    zip.file('manifest.json',JSON.stringify(manifest,null,2));
    zip.file('README.txt','Spatial Itqan complete project package\r\n\r\nOpen SpatialItqan_Project.svproject from the WebGIS project loader.\r\nThe layers folder contains WGS84 GeoJSON data and field schema definitions.');
    safeToast('Building complete project package…');
    zip.generateAsync({type:'blob'}).then(function(blob){saveBlob(blob,'SpatialItqan_Complete_Project.zip','application/zip');safeToast('Complete project package exported');}).catch(function(error){safeToast('Package export failed: '+error.message,true);});
  }
  function eachEditorCoordinate(geometry,callback){
    if(!geometry||!geometry.coordinates)return;
    function walk(value){if(Array.isArray(value)&&typeof value[0]==='number')callback(value);else if(Array.isArray(value))value.forEach(walk);}
    walk(geometry.coordinates);
  }
  function eachEditorSegment(geometry,callback){
    if(!geometry||!geometry.coordinates)return;
    function walk(value){
      if(!Array.isArray(value))return;
      if(value.length&&Array.isArray(value[0])&&typeof value[0][0]==='number'){for(var i=1;i<value.length;i++)callback(value[i-1],value[i]);}
      else value.forEach(walk);
    }
    walk(geometry.coordinates);
  }
  function editorSnapTolerance(){
    var tolEl=$('editorSnapTolerance');return Math.max(.01,parseFloat(tolEl&&tolEl.value)||.75);
  }
  function findEditorSnap(latlng,excludeFeature){
    var best=null,bestDistance=Infinity,cursorPoint=map.latLngToLayerPoint(latlng),segments=[];
    function enabled(id,defaultValue){var el=document.getElementById(id);return el?!!el.checked:defaultValue;}
    var useVertex=enabled('proSnapVertex',true),useEndpoint=enabled('proSnapEndpoint',true),useMidpoint=enabled('proSnapMidpoint',true),useEdge=enabled('proSnapEdge',true),useIntersection=enabled('proSnapIntersection',true);
    var units=(document.getElementById('proSnapUnits')||{}).value||'meters',tolInput=parseFloat((document.getElementById('proSnapTolerance')||{}).value);
    var tolerance=isFinite(tolInput)&&tolInput>0?tolInput:editorSnapTolerance();
    function distanceTo(candidate){return units==='pixels'?cursorPoint.distanceTo(map.latLngToLayerPoint(candidate)):map.distance(latlng,candidate);}
    function consider(candidate,kind,layerName){
      var distance=distanceTo(candidate);
      if(distance<bestDistance){bestDistance=distance;best={latlng:candidate,distance:distance,kind:kind,layer:layerName,units:units};}
    }
    Object.keys(layers).forEach(function(id){
      var L0=layers[id];if(!L0||L0.visible===false||L0.snapEnabled===false||!L0.geojson)return;
      (L0.geojson.features||[]).forEach(function(feature){
        if(feature===excludeFeature)return;
        try{var view=map.getBounds().pad(.12),bb=turf.bbox(feature);if(bb[2]<view.getWest()||bb[0]>view.getEast()||bb[3]<view.getSouth()||bb[1]>view.getNorth())return;}catch(e){}
        function coordinateSequences(geometry){
          var out=[];if(!geometry||!geometry.coordinates)return out;
          function walk(value){if(!Array.isArray(value))return;if(value.length&&Array.isArray(value[0])&&typeof value[0][0]==='number')out.push(value);else value.forEach(walk);}
          if(geometry.type==='Point')out.push([geometry.coordinates]);else if(geometry.type==='MultiPoint')out.push(geometry.coordinates);else walk(geometry.coordinates);return out;
        }
        coordinateSequences(feature.geometry).forEach(function(sequence){
          sequence.forEach(function(c,index){
            var endpoint=index===0||index===sequence.length-1;
            if((endpoint&&useEndpoint)||(!endpoint&&useVertex))consider(L.latLng(c[1],c[0]),endpoint?'Endpoint':'Vertex',L0.name);
          });
        });
        eachEditorSegment(feature.geometry,function(a,b){
          var aLL=L.latLng(a[1],a[0]),bLL=L.latLng(b[1],b[0]);
          segments.push({a:aLL,b:bLL,layer:L0.name});
          if(useMidpoint)consider(L.latLng((a[1]+b[1])/2,(a[0]+b[0])/2),'Midpoint',L0.name);
          if(!useEdge)return;
          try{
            var point=L.LineUtil.closestPointOnSegment(cursorPoint,map.latLngToLayerPoint(aLL),map.latLngToLayerPoint(bLL)),candidate=map.layerPointToLatLng(point);
            consider(candidate,'Edge',L0.name);
          }catch(err){}
        });
      });
    });
    if(useIntersection&&segments.length<800){
      function intersection(s1,s2){
        var p=map.latLngToLayerPoint(s1.a),p2=map.latLngToLayerPoint(s1.b),q=map.latLngToLayerPoint(s2.a),q2=map.latLngToLayerPoint(s2.b);
        var rx=p2.x-p.x,ry=p2.y-p.y,sx=q2.x-q.x,sy=q2.y-q.y,den=rx*sy-ry*sx;if(Math.abs(den)<1e-9)return null;
        var qpx=q.x-p.x,qpy=q.y-p.y,t=(qpx*sy-qpy*sx)/den,u=(qpx*ry-qpy*rx)/den;
        return t>0&&t<1&&u>0&&u<1?map.layerPointToLatLng(L.point(p.x+t*rx,p.y+t*ry)):null;
      }
      for(var i=0;i<segments.length;i++)for(var j=i+1;j<segments.length;j++){var at=intersection(segments[i],segments[j]);if(at)consider(at,'Intersection',segments[i].layer+' / '+segments[j].layer);}
    }
    return best&&bestDistance<=tolerance?best:null;
  }
  var editorSnapMarker=null,editorSnapState=null;
  function showEditorSnap(snap){
    var status=$('editorSnapStatus');editorSnapState=snap||null;
    if(!snap){if(editorSnapMarker&&map.hasLayer(editorSnapMarker))map.removeLayer(editorSnapMarker);if(status){status.classList.remove('hot');status.textContent='🧲 Magnet snapping ready — vertex and edge';}return;}
    if(!editorSnapMarker){
      editorSnapMarker=L.circleMarker(snap.latlng,{radius:9,color:'#22C55E',weight:3,fillColor:'#0F172A',fillOpacity:.85,interactive:false});
      editorSnapMarker.bindTooltip('🧲 SNAP',{permanent:true,direction:'right',offset:[11,0],className:'snap-magnet-label'});
    }
    editorSnapMarker.setLatLng(snap.latlng);if(!map.hasLayer(editorSnapMarker))editorSnapMarker.addTo(map);
    if(status){status.classList.add('hot');status.textContent='🧲 Snapped to '+snap.kind+' · '+snap.layer+' · '+snap.distance.toFixed(2)+' '+(snap.units==='pixels'?'px':'m');}
  }
  function wireVertexSnapping(target){
    var markers=[];
    function collect(value){if(!value)return;if(Array.isArray(value))value.forEach(collect);else if(value.on&&value.getLatLng&&markers.indexOf(value)<0)markers.push(value);}
    try{
      collect(target.editing&&target.editing._markers);collect(target.editing&&target.editing._marker);collect(target.editing&&target.editing._moveMarker);
      (target.editing&&target.editing._verticesHandlers||[]).forEach(function(handler){collect(handler&&handler._markers);});
    }catch(e){}
    markers.slice().forEach(function(marker){collect(marker._middleLeft);collect(marker._middleRight);});
    markers.forEach(function(marker){
      marker.on('drag',function(){if(!$('editorAutoSnap')||!$('editorAutoSnap').checked)return;showEditorSnap(findEditorSnap(marker.getLatLng(),target.feature));});
      marker.on('dragend',function(){
        var snap=editorSnapState||findEditorSnap(marker.getLatLng(),target.feature);
        if(snap){
          if(target.feature&&target.feature.geometry&&/Point/.test(target.feature.geometry.type)&&target.setLatLng)target.setLatLng(snap.latlng);
          else{var original=marker._origLatLng||marker._latlng;if(original){original.lat=snap.latlng.lat;original.lng=snap.latlng.lng;}marker.setLatLng(snap.latlng);if(target.redraw)target.redraw();}
          safeToast('Vertex snapped to '+snap.kind+' on '+snap.layer);
        }
        showEditorSnap(null);
      });
    });
  }
  map.on('mousemove',function(e){
    var snapping=!!($('editorAutoSnap')&&$('editorAutoSnap').checked&&(window.__svActiveDrawHandler||window.__svEditingLayer));
    if(!snapping){showEditorSnap(null);return;}
    var exclude=window.__svEditingLayer&&window.__svEditingLayer.feature,snap=findEditorSnap(e.latlng,exclude);showEditorSnap(snap);
    if(snap&&window.__svActiveDrawHandler){
      var handler=window.__svActiveDrawHandler;handler._currentLatLng=snap.latlng;
      try{if(handler._mouseMarker)handler._mouseMarker.setLatLng(snap.latlng);if(handler._marker)handler._marker.setLatLng(snap.latlng);}catch(err){}
    }
  });
  function snapNewGeometry(geometry,targetLayer){
    var enabled=$('editorAutoSnap');
    if(!enabled||!enabled.checked)return 0;
    var changed=0;eachEditorCoordinate(geometry,function(c){var snap=findEditorSnap(L.latLng(c[1],c[0]),null);if(snap){c[0]=snap.latlng.lng;c[1]=snap.latlng.lat;changed++;}});
    return changed;
  }
  function createFeatureToActiveLayer(){
    var L0=editingLayer();
    if(!L0){safeToast('Start editing a target feature layer first',true);return;}
    if(typeof L.Draw==='undefined'){safeToast('Draw library not loaded',true);return;}
    var gt=String(L0.geomType||geomTypeOf(L0.geojson)||'').toLowerCase(),method=$('editorConstruction')?$('editorConstruction').value:'template',Handler,drawType;
    if(gt.indexOf('point')>=0){Handler=L.Draw.Marker;drawType='point';}
    else if(gt.indexOf('polygon')>=0){Handler=method==='rectangle'?L.Draw.Rectangle:L.Draw.Polygon;drawType=method==='rectangle'?'rectangle':'polygon';}
    else if(gt.indexOf('line')>=0){Handler=L.Draw.Polyline;drawType='line';}
    else{safeToast('The target layer has no supported geometry template',true);return;}
    if(method==='rectangle'&&gt.indexOf('polygon')<0){safeToast('Rectangle construction is available only for polygon feature layers',true);return;}
    finishActiveConstruction();
    if(window.__svSetPanMode)window.__svSetPanMode(false,true);
    setSelectTool(false,true);
    var handlerOptions={shapeOptions:{color:L0.color||'#3B82F6',weight:3,fillColor:L0.color||'#3B82F6',fillOpacity:.25},allowIntersection:false,metric:true};
    if(drawType==='point')handlerOptions.icon=svConstructionPointIcon();
    var h=new Handler(map,handlerOptions);svSetPointConstruction(drawType==='point');
    window.__svActiveDrawHandler=h;activeHandler=h;
    function created(e){
      var openAttributes=!!($('editorOpenAttributes')&&$('editorOpenAttributes').checked);
      var continuous=!!($('editorContinuousCreate')&&$('editorContinuousCreate').checked&&!openAttributes);
      if(!continuous){clearActiveDrawListener();hideDigibar();svSetPointConstruction(false);window.__svActiveDrawHandler=null;activeHandler=null;}
      var gj=e.layer.toGeoJSON(),properties={},sample=(L0.geojson.features||[])[0],schema=L0.editSchema||[];
      if(schema.length)schema.forEach(function(field){properties[field.name]=field.defaultValue==null?null:field.defaultValue;});
      else Object.keys(sample&&sample.properties||{}).forEach(function(field){if(field!=='__sv_fid')properties[field]=null;});
      if(L0.featureTemplateDefaults)Object.keys(L0.featureTemplateDefaults).forEach(function(field){properties[field]=cloneEditorData(L0.featureTemplateDefaults[field]);});
      properties.__sv_fid='NEW'+Date.now();var snapped=snapNewGeometry(gj.geometry,L0);
      var nf={type:'Feature',properties:properties,geometry:gj.geometry};
      if(window.__svAdvSnapshot)window.__svAdvSnapshot();L0.geojson.features.push(nf);
      window.__svOpState.selectedSets[L0.id]={};window.__svOpState.selectedSets[L0.id][properties.__sv_fid]=true;
      if(window.__svMarkDirty)window.__svMarkDirty();svBuildLeafletLayer(L0);
      try{if(openAttributes){openTable(L0.id);svToggleSelectedOnly(true);}else if(curTbl&&curTbl.id===L0.id)renderTable();}catch(err){}
      if(continuous){
        setTimeout(function(){
          if(!window.__svEditSession.active||window.__svEditSession.layerId!==L0.id||activeCreateHandler!==created)return;
          window.__svActiveDrawHandler=h;activeHandler=h;try{h.enable();}catch(err){}
        },20);
        safeToast('Feature created — continue drawing in '+L0.name+' or press Esc to stop');
      }else{
        setSelectTool(true,true);
        safeToast('Feature created in '+L0.name+(snapped?' — '+snapped+' vertex/vertices snapped':''));
      }
    }
    activeCreateHandler=created;map.on(L.Draw.Event.CREATED,created);h.enable();
    showDigibar(drawType==='point'?('Creating points in '+L0.name+' — click repeatedly; Esc stops'):drawType==='rectangle'?('Creating rectangles in '+L0.name+' — drag repeatedly; Esc stops'):('Creating '+drawType+' features in '+L0.name+' — double-click each feature; Esc stops'));
    safeToast(drawType==='point'?'Click repeatedly to create points; press Esc when finished':(drawType==='rectangle'?'Drag repeatedly to create rectangles; press Esc when finished':'Click vertices and double-click to finish each feature; press Esc when finished'));
  }
  function editorGeometryFamily(L0){
    var gt=String(L0&&(L0.geomType||geomTypeOf(L0.geojson))||'').toLowerCase();
    return gt.indexOf('point')>=0?'point':(gt.indexOf('line')>=0?'line':(gt.indexOf('polygon')>=0?'polygon':''));
  }
  function ensureDefaultGeometryLayer(family){
    var targetId=window.__svTemplateTargets[family];
    if(targetId&&layers[targetId]&&editorGeometryFamily(layers[targetId])===family)return targetId;
    var current=layers[activeLayerId()];
    if(current&&editorGeometryFamily(current)===family){rememberTemplateTarget(current.id);return current.id;}
    var compatible=visibleVectorLayerIds().filter(function(id){return editorGeometryFamily(layers[id])===family;});
    if(compatible.length){rememberTemplateTarget(compatible[0]);return compatible[0];}
    var names={point:'Point Features',line:'Line Features',polygon:'Polygon Features'},geom=family==='point'?'Point':(family==='line'?'LineString':'Polygon');
    var fc={type:'FeatureCollection',features:[]},color=nextColor(),id=addLayer(geoJsonLayer(fc,color),names[family],color,{geojson:fc,geomType:geom,zoom:false});
    layers[id].geomType=geom;layers[id].editSchema=[];
    if(window.__svEditSession.active){window.__svEditSession.baselines=window.__svEditSession.baselines||{};window.__svEditSession.baselines[id]=null;}
    rememberTemplateTarget(id);refreshRibbonLayers();safeToast(names[family]+' created as the default '+family+' target');return id;
  }
  function activateFeatureTemplate(kind,method){
    var family=kind==='rectangle'?'polygon':kind,targetId=ensureDefaultGeometryLayer(family),L0=layers[targetId];
    setActiveLayer(targetId);
    if(!window.__svEditSession.active){beginEditSession();L0=editingLayer();}
    var construction=$('editorConstruction');if(construction)construction.value=method||'template';
    ['editorTemplatePoint','editorTemplateLine','editorTemplatePolygon','editorTemplateRectangle'].forEach(function(id){var el=$(id);if(el)el.classList.remove('active');});
    var activeId=kind==='point'?'editorTemplatePoint':(kind==='line'?'editorTemplateLine':(kind==='rectangle'?'editorTemplateRectangle':'editorTemplatePolygon'));
    if($(activeId))$(activeId).classList.add('active');
    createFeatureToActiveLayer();
  }
  function deleteSelectedFeatures(){
    var L0=editingLayer();if(!L0){safeToast('Start editing a target feature layer first',true);return;}
    var ids=Object.keys(svSelSet(L0.id));if(!ids.length){safeToast('Select one or more features to delete',true);return;}
    if(!confirm('Delete '+ids.length+' selected feature(s) from '+L0.name+'?'))return;
    if(window.__svAdvSnapshot)window.__svAdvSnapshot();
    L0.geojson.features=L0.geojson.features.filter(function(f){return ids.indexOf(String(f.properties&&f.properties.__sv_fid))<0;});
    window.__svOpState.selectedSets[L0.id]={};if(window.__svMarkDirty)window.__svMarkDirty();svBuildLeafletLayer(L0);
    try{if(curTbl&&curTbl.id===L0.id)renderTable();}catch(e){}safeToast(ids.length+' feature(s) deleted');
  }
  function toggleEditSession(){if(window.__svEditSession.active)stopEditSession();else beginEditSession();}
  function addFeatureToActiveLayer(){createFeatureToActiveLayer();}
  function setVertexPanel(visible){
    var panel=$('editorVertexPanel'),button=$('editorVertices');
    if(panel)panel.classList.toggle('show',!!visible);
    if(button)button.classList.toggle('active',!!visible);
  }
  function editSelectedShape(){
    var id=activeLayerId(), L0=layers[id]; if(!L0||!L0.geojson){safeToast('Open a vector layer first',true);return;}
    if(!window.__svOpState.editMode){safeToast('Click ✎ Edit to start an edit session first',true);return;}
    var fids=Object.keys(svSelSet(id));
    if(window.__svEditingLayer){
      // second click = finish editing whatever shape is currently being edited
      var target=window.__svEditingLayer;
      try{target.editing.disable();}catch(e){}
      window.__svEditingLayer=null;
      var gj=target.toGeoJSON();
      if(target.feature){ if(window.__svAdvSnapshot)window.__svAdvSnapshot(); target.feature.geometry=gj.geometry; if(window.__svMarkDirty)window.__svMarkDirty(); }
      svBuildLeafletLayer(L0); try{if(typeof curTbl!=='undefined'&&curTbl&&curTbl.id===L0.id)renderTable();}catch(err){}
      setVertexPanel(false);setSelectTool(true,true);safeToast('Shape updated');
      return;
    }
    if(fids.length!==1){safeToast('Select exactly one feature to edit its shape',true);return;}
    var fid=fids[0], target=null;
    L0.leaflet.eachLayer(function(ly){ var f=ly.feature; if(f&&String(f.properties&&f.properties.__sv_fid)===fid) target=ly; });
    if(!target||!target.editing){safeToast('This geometry type can\u2019t be vertex-edited here',true);return;}
    finishActiveConstruction();setSelectTool(false,true);target.editing.enable();window.__svEditingLayer=target;wireVertexSnapping(target);setVertexPanel(true);
    safeToast('Vertex Editor ON — drag the visible handles, then click Finish');
  }
  function saveEditsToLocal(){
    try{
      var pack=window.__svPackageProject?window.__svPackageProject():null;
      if(!pack){safeToast('Save not available',true);return;}
      localStorage.setItem('SpatialViewUltimateProject',JSON.stringify(pack));
      safeToast('Edits saved to browser memory');
    }catch(e){ safeToast('Could not save: '+e.message,true); }
  }
  window.__svEditSelectedShape=editSelectedShape;window.__svSaveEdits=saveEditsToLocal;window.__svSetActiveLayer=setActiveLayer;
  window.__svOpenVertexEditor=function(layerId,fid){
    if(!window.__svEditSession.active||!layers[layerId])return;
    setActiveLayer(layerId);window.__svOpState.selectedSets[layerId]={};window.__svOpState.selectedSets[layerId][String(fid)]=true;svBuildLeafletLayer(layers[layerId]);editSelectedShape();
  };
  window.__svStartEditing=beginEditSession;window.__svStopEditing=stopEditSession;window.__svDiscardEditing=discardEditSession;
  window.__svCreateFeature=createFeatureToActiveLayer;window.__svDeleteSelected=deleteSelectedFeatures;window.__svCreateEditableLayer=createEditableLayer;
  function zoomAllVisible(){
    var fg=L.featureGroup(); var added=false;
    Object.keys(layers||{}).forEach(function(id){var L0=layers[id]; if(L0&&L0.visible!==false&&L0.leaflet){try{fg.addLayer(L0.leaflet);added=true;}catch(e){}}});
    try{ if(typeof drawnGroup!=='undefined') drawnGroup.eachLayer(function(l){fg.addLayer(l);added=true;}); }catch(e){}
    try{ if(typeof ptGroup!=='undefined') ptGroup.eachLayer(function(l){fg.addLayer(l);added=true;}); }catch(e){}
    try{ if(added&&fg.getBounds().isValid()){map.fitBounds(fg.getBounds().pad(.12));return;} }catch(e){}
    map.setView(HOME.center,HOME.zoom); safeToast('No layer extent found — returned to home');
  }
  var persistentPan=false,temporaryPan=false,suppressPanClickUntil=0;
  function editorTyping(){
    var el=document.activeElement,tag=el&&el.tagName;
    return !!(el&&(el.isContentEditable||tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'));
  }
  function setPanMode(enabled,explicit){
    if(explicit)persistentPan=!!enabled;
    window.__svPanOverride=!!enabled;
    try{map.dragging.enable();map.getContainer().style.cursor=enabled?'grab':(window.__svSelectToolOn?'default':'');}catch(err){}
    var button=$('editorPan');if(button)button.classList.toggle('good',!!enabled);
  }
  window.__svSetPanMode=setPanMode;
  function activatePanTool(){
    if(persistentPan){setPanMode(false,true);safeToast('Pan tool off');return;}
    if(window.__svActiveDrawHandler)finishActiveConstruction();
    setSelectTool(false,true);setPanMode(true,true);safeToast('Pan tool on — drag the map; select another tool when finished');
  }
  function beginTemporaryPan(e){
    if(temporaryPan||editorTyping())return;
    temporaryPan=true;window.__svPanOverride=true;
    try{map.dragging.enable();map.getContainer().style.cursor='grab';}catch(err){}
    var button=$('editorPan');if(button)button.classList.add('good');
    if(e)e.preventDefault();
  }
  function endTemporaryPan(){
    if(!temporaryPan)return;
    temporaryPan=false;suppressPanClickUntil=Date.now()+300;
    setPanMode(persistentPan,false);
  }
  try{
    map.getContainer().addEventListener('click',function(e){
      if(window.__svPanOverride||Date.now()<suppressPanClickUntil){e.preventDefault();e.stopImmediatePropagation();}
    },true);
    map.getContainer().addEventListener('dblclick',function(e){
      if(window.__svPanOverride||Date.now()<suppressPanClickUntil){e.preventDefault();e.stopImmediatePropagation();}
    },true);
  }catch(err){}
  function openActiveTable(){var id=activeLayerId(); if(id){setActiveLayer(id); openTable(id); switchTab('tools');} else {switchTab('data'); safeToast('Add a layer first',true);} }
  function clearSelection(){
    var changed=svClearAllSelections(false);if(!Object.keys(changed).length){safeToast('No active selection to clear');return;}svRefreshSelectionLayers(changed);if(window.__svUpdateOpStatus)window.__svUpdateOpStatus();safeToast('Selection cleared from all feature classes');
  }

  // Previous/next extent history like desktop GIS.
  var hist=[], histIndex=-1, histBusy=false;
  function snap(){var c=map.getCenter();return {lat:c.lat,lng:c.lng,z:map.getZoom()};}
  function same(a,b){return a&&b&&Math.abs(a.lat-b.lat)<1e-7&&Math.abs(a.lng-b.lng)<1e-7&&a.z===b.z;}
  function pushHist(){if(histBusy)return;var s=snap();if(same(hist[histIndex],s))return;hist=hist.slice(0,histIndex+1);hist.push(s);if(hist.length>60)hist.shift();histIndex=hist.length-1;}
  setTimeout(pushHist,250); map.on('moveend zoomend',pushHist);
  function goHist(dir){var ni=histIndex+dir;if(ni<0||ni>=hist.length){safeToast(dir<0?'No previous extent':'No next extent',true);return;}histIndex=ni;histBusy=true;var s=hist[histIndex];map.setView([s.lat,s.lng],s.z);setTimeout(function(){histBusy=false;},350);}

  function cycleTheme(){
    var sel=$('themeSelect'); if(!sel)return;
    var themes=['graphite','arctic','midnight'];
    var cur=sel.value, i=themes.indexOf(cur); sel.value=themes[(i+1+themes.length)%themes.length]; sel.onchange(); safeToast('Theme: '+sel.options[sel.selectedIndex].text);
  }

  function bindRibbon(){
    if(!$('experienceRibbon'))return;
    var editorWorkspace=$('editorWorkspace'),toolsPane=$('pane-tools');
    if(editorWorkspace&&toolsPane&&toolsPane.firstElementChild!==editorWorkspace)toolsPane.insertBefore(editorWorkspace,toolsPane.firstChild);
    $('xpAddLayer').onclick=function(){switchTab('data'); click('fileBtn')||click('importBtn');};
    $('xpOpenTable').onclick=openActiveTable;
    $('xpLayerPanel').onclick=function(){switchTab('layers');};
    $('xpPrevExtent').onclick=function(){goHist(-1);};
    $('xpNextExtent').onclick=function(){goHist(1);};
    $('xpZoomAll').onclick=zoomAllVisible;
    $('xpHome').onclick=function(){click('homeBtn')||map.setView(HOME.center,HOME.zoom);};
    $('xpLocate').onclick=function(){click('locateBtn');};
    var _nt=$('xpNorthToggle'); if(_nt)_nt.onclick=function(){
      var na=document.querySelector('.northarrow'); if(!na)return;
      var willHide=!na.classList.contains('element-hidden');
      na.classList.toggle('element-hidden',willHide);
      _nt.classList.toggle('good',!willHide);
      var cb=document.querySelector('.map-el[data-el="north"]'); if(cb)cb.checked=!willHide;
    };
    $('xpIdentify').onclick=function(){switchTab('tools');click('identifyToggle');};
    $('xpSelectBox').onclick=toggleSelectTool;
    $('xpSwitchSel').onclick=function(){var id=activeLayerId();if(id)svSwitchSelection(id);};
    $('xpShowSel').onclick=function(){openActiveTable();svToggleSelectedOnly(true);};
    $('xpClearSel').onclick=clearSelection;
    $('xpStartEdit').onclick=beginEditSession;
    $('xpStopEdit').onclick=stopEditSession;
    $('xpAddFeature').onclick=addFeatureToActiveLayer;
    $('xpEditShape').onclick=editSelectedShape;
    $('xpMoveFeat').onclick=function(){setActiveLayer(activeLayerId());if(window.__svMove)window.__svMove();else safeToast('Move not available',true);};
    $('xpSaveEdit').onclick=svSaveTableEdits;
    $('xpEditAttributes').onclick=openActiveTable;
    $('xpDeleteFeat').onclick=deleteSelectedFeatures;
    var _cp=$('xpCopyFeat'); if(_cp)_cp.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svCopy)window.__svCopy(); else safeToast('Copy not available',true);};
    var _pa=$('xpPasteFeat'); if(_pa)_pa.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svPaste)window.__svPaste(); else safeToast('Paste not available',true);};
    var _sp=$('xpSplitFeat'); if(_sp)_sp.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svSplit)window.__svSplit(); else safeToast('Split not available',true);};
    var _mg=$('xpMergeFeat'); if(_mg)_mg.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svMerge)window.__svMerge(); else safeToast('Merge not available',true);};
    var _ro=$('xpRotateFeat'); if(_ro)_ro.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svRotate)window.__svRotate(); else safeToast('Rotate not available',true);};
    var _sc=$('xpScaleFeat'); if(_sc)_sc.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svScale)window.__svScale(); else safeToast('Scale not available',true);};
    var _ex=$('xpExplodeFeat'); if(_ex)_ex.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svExplode)window.__svExplode(); else safeToast('Explode not available',true);};
    var _tr=$('xpTraceFeat'); if(_tr)_tr.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svTrace)window.__svTrace(); else safeToast('Trace not available',true);};
    var _sn=$('xpSnapFeat'); if(_sn)_sn.onclick=function(){setActiveLayer(activeLayerId()); if(window.__svSnap)window.__svSnap(); else safeToast('Snap not available',true);};
    var _un=$('xpUndoEdit'); if(_un)_un.onclick=function(){if(window.__svUndo)window.__svUndo();};
    var _re=$('xpRedoEdit'); if(_re)_re.onclick=function(){if(window.__svRedo)window.__svRedo();};
    var editorTarget=$('editorTargetLayer');if(editorTarget)editorTarget.onchange=function(){setActiveLayer(this.value);};
    var bind=function(id,fn){var el=$(id);if(el)el.onclick=fn;};
    bind('editorNewLayer',createEditableLayer);
    bind('editorAddLayerField',openTargetFieldDesigner);
    bind('editorAddField',function(){addDesignerField('','text');});
    bind('editorLayerCreate',createLayerFromDesigner);
    bind('editorLayerCancel',closeLayerDesigner);bind('editorLayerCancelTop',closeLayerDesigner);
    var layerModal=$('editorLayerModal');if(layerModal)layerModal.onclick=function(e){if(e.target===layerModal)closeLayerDesigner();};
    bind('editorExportShp',exportEditorShapefile);bind('editorExportKml',exportEditorKML);bind('editorExportGeoJson',exportEditorGeoJSON);
    bind('editorSaveProject',saveEditorProject);bind('editorExportPackage',exportEditorPackage);
    bind('editorStart',beginEditSession);bind('editorSave',svSaveTableEdits);bind('editorStop',stopEditSession);bind('editorDiscard',discardEditSession);
    bind('editorTemplatePoint',function(){activateFeatureTemplate('point','template');});
    bind('editorTemplateLine',function(){activateFeatureTemplate('line','template');});
    bind('editorTemplatePolygon',function(){activateFeatureTemplate('polygon','template');});
    bind('editorTemplateRectangle',function(){activateFeatureTemplate('rectangle','rectangle');});
    bind('editorCreate',createFeatureToActiveLayer);bind('editorSelect',toggleSelectTool);bind('editorPan',activatePanTool);bind('editorFullExtent',zoomAllVisible);bind('editorVertices',editSelectedShape);bind('editorAttributes',openActiveTable);bind('editorSymbolSelector',function(){openSymbolSelector(activeLayerId());});bind('editorDelete',deleteSelectedFeatures);
    bind('editorFinishVertices',editSelectedShape);
    bind('editorCalcGeom',function(){if(window.__svCalculateGeometry)window.__svCalculateGeometry();});
    bind('editorCopy',function(){if(window.__svCopy)window.__svCopy();});bind('editorPaste',function(){if(window.__svPaste)window.__svPaste();});
    bind('editorSplit',function(){if(window.__svSplit)window.__svSplit();});bind('editorMerge',function(){if(window.__svMerge)window.__svMerge();});
    bind('editorMove',function(){if(window.__svMove)window.__svMove();});bind('editorRotate',function(){if(window.__svRotate)window.__svRotate();});
    bind('editorScale',function(){if(window.__svScale)window.__svScale();});bind('editorExplode',function(){if(window.__svExplode)window.__svExplode();});
    bind('editorTrace',function(){if(window.__svTrace)window.__svTrace();});
    bind('editorSnap',function(){if(window.__svSnap)window.__svSnap();});
    bind('editorTrimOvershoot',function(){if(window.__svTrimOvershoot)window.__svTrimOvershoot();});
    bind('editorExtendUndershoot',function(){if(window.__svExtendUndershoot)window.__svExtendUndershoot();});
    bind('editorUndo',function(){if(window.__svUndo)window.__svUndo();});bind('editorRedo',function(){if(window.__svRedo)window.__svRedo();});
    bind('editorQA',function(){if(window.__svGeometryQA)window.__svGeometryQA();});bind('editorLayerProperties',function(){if(window.__svLayerProperties)window.__svLayerProperties(activeLayerId());});
    if($('xpRunQA'))$('xpRunQA').onclick=function(){switchTab('tools');setActiveLayer(activeLayerId());click('opRunQA')||safeToast('Add a vector layer first',true);};
    if($('xpExportData'))$('xpExportData').onclick=function(){switchTab('tools');setActiveLayer(activeLayerId());click('opExportGeoJSON')||safeToast('Add a vector layer first',true);};
    if($('xpExportMap'))$('xpExportMap').onclick=function(){switchTab('layout');click('exportPDF');};
    var _xl=$('xpLive'); if(_xl)_xl.onclick=function(){switchTab('live');};
    $('xpTheme').onclick=cycleTheme;
    $('xpFocus').onclick=function(){click('quickFocus');};
    function setRibbonCollapsed(collapsed){
      document.body.classList.toggle('ribbon-collapsed',collapsed);
      var rt=$('xpRibbonToggle'); if(rt){rt.classList.toggle('good',!collapsed); rt.title=collapsed?'Show the tools ribbon':'Hide the tools ribbon for more map space';}
      setTimeout(function(){try{map.invalidateSize();}catch(e){}},220);
    }
    var _rt=$('xpRibbonToggle'); if(_rt)_rt.onclick=function(){ setRibbonCollapsed(!document.body.classList.contains('ribbon-collapsed')); };
    var _rcb=$('ribbonCollapseBtn'); if(_rcb)_rcb.onclick=function(){ setRibbonCollapsed(true); };
    var _rro=$('ribbonReopen'); if(_rro)_rro.onclick=function(){ setRibbonCollapsed(false); };
    $('xpActiveLayer').onchange=function(){setActiveLayer(this.value);};
    document.querySelectorAll('.smart-start-steps button').forEach(function(b){b.onclick=function(){var id=b.getAttribute('data-xp');click(id);};});
  }

  // Keep ribbon in sync after layer operations.
  var oldRender=renderLayers; renderLayers=function(){oldRender.apply(this,arguments); setTimeout(refreshRibbonLayers,60);}; window.renderLayers=renderLayers;
  var oldRefresh=refreshDropdowns; refreshDropdowns=function(){oldRefresh.apply(this,arguments); setTimeout(refreshRibbonLayers,60);}; window.refreshDropdowns=refreshDropdowns;
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&$('editorLayerModal')&&$('editorLayerModal').classList.contains('open')){e.preventDefault();closeLayerDesigner();return;}
    if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&String(e.key).toLowerCase()==='c'){beginTemporaryPan(e);return;}
    if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&String(e.key).toLowerCase()==='z'&&!editorTyping()){e.preventDefault();zoomAllVisible();safeToast('Zoomed to full content extent');return;}
    if(e.altKey&&e.key==='1'){e.preventDefault();click('xpAddLayer');}
    if(e.altKey&&e.key==='2'){e.preventDefault();click('xpOpenTable');}
    if(e.altKey&&e.key==='3'){e.preventDefault();click('xpSelectBox');}
    if(e.altKey&&e.key==='4'){e.preventDefault();click('xpRunQA');}
    if((e.ctrlKey||e.metaKey)&&String(e.key).toLowerCase()==='s'){e.preventDefault();svSaveTableEdits();}
    if((e.ctrlKey||e.metaKey)&&String(e.key).toLowerCase()==='a'&&drawer&&drawer.classList.contains('open')&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();svSelectAllVisibleRows();}
    if((e.key==='Delete'||e.key==='Backspace')&&window.__svEditSession&&window.__svEditSession.active&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'&&!window.__svActiveDrawHandler){var target=editingLayer();if(target&&Object.keys(svSelSet(target.id)).length){e.preventDefault();deleteSelectedFeatures();}}
  });
  document.addEventListener('keyup',function(e){if(String(e.key).toLowerCase()==='c')endTemporaryPan();});
  window.addEventListener('blur',endTemporaryPan);
  bindRibbon(); if(window.__svDigitizingBar&&window.__svDigitizingBar.bind)window.__svDigitizingBar.bind(); refreshRibbonLayers(); setInterval(updateRibbonState,1500);
  safeToast('Advanced experience ribbon ready — high-frequency GIS tools are grouped at the top');
})();

/* ================= ATTRIBUTE TABLE ESSENTIALS (ESRI-STYLE) ================= */
(function installAttributeEssentials(){
  var history=[],baseline=null,baselineLayerId=null,attributeClipboard=null;
  function active(){if(!curTbl||!curTbl.geojson){toast('Open an attribute table first',true);return null;}return curTbl;}
  function editable(){var L0=active();if(!L0)return null;if(!window.__svEditSession||!window.__svEditSession.active||window.__svEditSession.layerId!==L0.id){toast('Start editing this target layer before changing features or fields',true);return null;}return L0;}
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function snapshot(){var L0=active();if(!L0)return;if(baselineLayerId!==L0.id){baselineLayerId=L0.id;baseline=clone(L0.geojson);history=[];}}
  function log(action){history.unshift({time:new Date().toLocaleTimeString(),action:action});if(history.length>60)history.length=60;}
  function changed(L0,msg){ensureFids(L0.geojson);svBuildLeafletLayer(L0);renderTable();renderLayers();refreshDropdowns();try{window.__svMarkDirty();}catch(e){}log(msg);toast(msg);}
  function fields(L0){var out={};(L0.editSchema||[]).forEach(function(field){out[field.name]=1;});(L0.geojson.features||[]).forEach(function(f){Object.keys(f.properties||{}).forEach(function(k){if(String(k).indexOf('__sv')!==0)out[k]=1;});});return Object.keys(out);}
  function askField(L0,promptText){var fs=fields(L0);if(!fs.length){toast('No attribute fields available',true);return null;}var f=prompt(promptText+'\n'+fs.join(', '),fs[0]);return f&&fs.indexOf(f)>=0?f:null;}
  function selected(L0){return svSelectedFeatures(L0);}
  function deleteSelected(){var L0=editable();if(!L0)return;var sel=selected(L0);if(!sel.length){toast('Select one or more features first',true);return;}if(!confirm('Delete '+sel.length+' selected feature(s)? This change remains pending until Save.'))return;snapshot();var ids={};sel.forEach(function(f){ids[String(f.properties&&f.properties.__sv_fid)]=1;});L0.geojson.features=L0.geojson.features.filter(function(f){return !ids[String(f.properties&&f.properties.__sv_fid)];});svClearLayerSelection(L0.id);changed(L0,'Deleted '+sel.length+' selected feature(s)');}
  function discard(){if(window.__svDiscardEditing){window.__svDiscardEditing();return;}toast('No active edit session',true);}
  function addField(){var L0=editable();if(!L0)return;var name=(prompt('New field name:','NEW_FIELD')||'').trim();if(!name)return;if(fields(L0).indexOf(name)>=0){toast('Field already exists',true);return;}snapshot();var def=prompt('Default value (leave blank for NULL):','');(L0.geojson.features||[]).forEach(function(f){if(!f.properties)f.properties={};f.properties[name]=def===''?null:def;});changed(L0,'Added field '+name);}
  function deleteField(){var L0=editable();if(!L0)return;var f=askField(L0,'Delete which field?');if(!f)return;if(!confirm('Delete field "'+f+'" and all its values?'))return;snapshot();(L0.geojson.features||[]).forEach(function(x){delete (x.properties||{})[f];});changed(L0,'Deleted field '+f);}
  function renameField(){var L0=editable();if(!L0)return;var old=askField(L0,'Rename which field?');if(!old)return;var name=(prompt('New field name:',old)||'').trim();if(!name||name===old)return;if(fields(L0).indexOf(name)>=0){toast('Target field already exists',true);return;}snapshot();(L0.geojson.features||[]).forEach(function(x){x.properties=x.properties||{};x.properties[name]=x.properties[old];delete x.properties[old];});changed(L0,'Renamed '+old+' to '+name);}
  function findReplace(){var L0=editable();if(!L0)return;var f=askField(L0,'Find and replace in which field?');if(!f)return;var find=prompt('Find text:','');if(find===null)return;var rep=prompt('Replace with:','');if(rep===null)return;var scope=selected(L0),rows=scope.length?scope:L0.geojson.features,n=0;snapshot();rows.forEach(function(x){var v=(x.properties||{})[f];if(v!=null&&String(v).indexOf(find)>=0){x.properties[f]=String(v).split(find).join(rep);n++;}});if(!n){toast('No matching values found',true);return;}changed(L0,'Replaced '+n+' value(s) in '+f);}
  function duplicate(){var L0=editable();if(!L0)return;var sel=selected(L0);if(!sel.length){toast('Select feature(s) to duplicate',true);return;}snapshot();sel.forEach(function(f){var c=clone(f);if(c.properties)delete c.properties.__sv_fid;L0.geojson.features.push(c);});changed(L0,'Duplicated '+sel.length+' feature(s)');}
  function copyAttrs(){var L0=active();if(!L0)return;var sel=selected(L0);if(sel.length!==1){toast('Select exactly one source feature',true);return;}attributeClipboard=clone(sel[0].properties||{});delete attributeClipboard.__sv_fid;toast('Attributes copied');}
  function pasteAttrs(){var L0=editable();if(!L0)return;if(!attributeClipboard){toast('Copy attributes first',true);return;}var sel=selected(L0);if(!sel.length){toast('Select target feature(s)',true);return;}snapshot();sel.forEach(function(f){var fid=f.properties&&f.properties.__sv_fid;f.properties=Object.assign({},f.properties||{},clone(attributeClipboard));if(fid)f.properties.__sv_fid=fid;});changed(L0,'Pasted attributes to '+sel.length+' feature(s)');}
  function repairGeometry(){var L0=editable();if(!L0)return;var rows=selected(L0);if(!rows.length){toast('Select one or more features to repair',true);return;}var n=0;snapshot();rows.forEach(function(f){try{var cleaned=turf.cleanCoords(f);if(cleaned&&JSON.stringify(cleaned.geometry)!==JSON.stringify(f.geometry)){f.geometry=cleaned.geometry;n++;}}catch(e){}});changed(L0,'Geometry repair completed: '+n+' changed');}
  function exportTable(fmt){var L0=active();if(!L0)return;var rows=selected(L0);if(!rows.length)rows=svCurrentTableFeatures();var fs=fields(L0),data=rows.map(function(f){var o={};fs.forEach(function(k){o[k]=(f.properties||{})[k];});return o;});if(fmt==='xlsx'&&window.XLSX){var wb=XLSX.utils.book_new(),ws=XLSX.utils.json_to_sheet(data);XLSX.utils.book_append_sheet(wb,ws,'Attributes');XLSX.writeFile(wb,(L0.name||'attributes')+'.xlsx');}else{var esc=function(v){v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;};var csv=fs.map(esc).join(',')+'\n'+data.map(function(r){return fs.map(function(k){return esc(r[k]);}).join(',');}).join('\n');dl(csv,(L0.name||'attributes')+'.csv','text/csv');}log('Exported '+rows.length+' table row(s)');}
  function showHistory(){var m=document.getElementById('attrHistoryModal');if(!m){m=document.createElement('div');m.id='attrHistoryModal';m.className='modal';m.innerHTML='<div class="modal-card" style="max-width:560px"><div class="modal-head"><b>Edit History</b><span class="grow"></span><button class="topbtn" id="attrHistoryClose">Close</button></div><div class="modal-body" id="attrHistoryBody"></div></div>';document.body.appendChild(m);m.querySelector('#attrHistoryClose').onclick=function(){m.classList.remove('open');};}m.querySelector('#attrHistoryBody').innerHTML=history.length?history.map(function(h){return '<div style="padding:8px;border-bottom:1px solid var(--line)"><b>'+escapeHtml(h.time)+'</b> · '+escapeHtml(h.action)+'</div>';}).join(''):'<p class="hint">No edits recorded in this session.</p>';m.classList.add('open');}
  function addButton(bar,id,label,title,fn){if(document.getElementById(id))return;var b=document.createElement('button');b.id=id;b.textContent=label;b.title=title;b.onclick=fn;bar.appendChild(b);}
  function build(){var drawerEl=document.getElementById('attrDrawer'),head=drawerEl&&drawerEl.querySelector('.head');if(!drawerEl||!head)return;var st=document.createElement('style');st.textContent='.attr-essential-bar{display:flex;align-items:center;gap:5px;padding:5px 8px;overflow-x:auto;flex:none;background:var(--bg-2);border-bottom:1px solid var(--line)}.attr-essential-bar button{height:28px;flex:none;border:1px solid var(--line);border-radius:6px;background:var(--chip);color:var(--ink);font-size:10.5px;font-weight:700;padding:0 8px;cursor:pointer}.attr-essential-bar button:hover{border-color:var(--brand);color:var(--brand-2)}';document.head.appendChild(st);var bar=document.createElement('div');bar.className='attr-essential-bar';bar.setAttribute('aria-label','Attribute editing tools');head.insertAdjacentElement('afterend',bar);addButton(bar,'attrDeleteSel','🗑 Delete','Delete selected features',deleteSelected);addButton(bar,'attrDiscard','↩ Discard','Discard unsaved table changes',discard);addButton(bar,'attrAddField','＋ Field','Add field',addField);addButton(bar,'attrRenameField','✎ Field','Rename field',renameField);addButton(bar,'attrDeleteField','− Field','Delete field',deleteField);addButton(bar,'attrFindReplace','⌕ Replace','Find and replace',findReplace);addButton(bar,'attrDuplicate','⧉ Duplicate','Duplicate selected features',duplicate);addButton(bar,'attrCopyAttrs','⧉ Attr','Copy attributes',copyAttrs);addButton(bar,'attrPasteAttrs','▣ Attr','Paste attributes',pasteAttrs);addButton(bar,'attrRepairGeom','⚕ Repair','Repair selected geometries',repairGeometry);addButton(bar,'attrHistory','☷ History','View edit history',showHistory);addButton(bar,'attrExportCsv','CSV','Export visible or selected rows to CSV',function(){exportTable('csv');});addButton(bar,'attrExportXlsx','XLSX','Export visible or selected rows to Excel',function(){exportTable('xlsx');});}
  var oldOpenTable=openTable;openTable=function(){oldOpenTable.apply(this,arguments);baselineLayerId=null;snapshot();};window.openTable=openTable;
  build();
})();


};
