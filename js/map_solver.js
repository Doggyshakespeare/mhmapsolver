function csvToArray(t,o){o=",";for(var a=new RegExp("(\\"+o+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+o+"\\r\\n]*))","gi"),n=[[]],e=a.exec(t);e;){var r=e[1];r.length&&r!=o&&n.push([]);var i;i=e[2]?e[2].replace(new RegExp('""',"g"),'"'):e[3],n[n.length-1].push(i),e=a.exec(t)}return n}function processPopulationData(t){for(var o in t){var a=t[o],n=parseFloat(a[8]);if(n>0){var e=a[0].capitalise(),r=a[1],i="",s=a[3],p=a[4];void 0===populationData[e]&&(populationData[e]=[]),void 0===populationData[e][r]&&(populationData[e][r]=[]),void 0===populationData[e][r][i]&&(populationData[e][r][i]=[]),void 0===populationData[e][r][i][s]&&(populationData[e][r][i][s]=[]),populationData[e][r][i][s][p]=n}}loadMouseDropdown()}function loadMouseDropdown(){var t=[];for(var o in populationData)t.push(o),t.push(o.toLowerCase());$("#map").asuggest(t)}function amendMouseName(t){return t=t.capitalise().trim(),t.indexOf(" Mouse")>=0&&(t=t.slice(0,indexOfMouse)),t}function processMap(t){var o=t.split("\n").map(amendMouseName).filter(function(t){return t.length>0}).sort();o=jQuery.unique(o);for(var a=[],n=[],e=[],r=0;r<o.length;r++){var i=o[r];if(void 0===populationData[i])e.push(i);else{var s=[];for(var p in populationData[i])for(var u in populationData[i][p])for(var c in populationData[i][p][u])for(var l in populationData[i][p][u][c]){var h=p;""!==u&&(h+="#"+u),""!==c&&(h+="#"+c),""!==l&&(h+="#"+l);var d=populationData[i][p][u][c][l],v={name:i,rate:d};void 0===n[h]?n[h]={location:p,cheese:c,charm:l,phase:u,totalRate:d,mice:[v]}:(n[h].totalRate+=d,n[h].mice.push(v)),s[h]=d}a.push({name:i,locations:sortMouseLocations(s)})}}printUnknownMice(e),printBestLocations(sortBestLocations(n)),printMouseLocations(a),$("#mousecount").text(o.length-e.length+" mice")}function sortBestLocations(t){var o=[];for(var a in t)o.push(t[a]);return o.sort(function(t,o){return o.totalRate-t.totalRate}),o}function sortMouseLocations(t){var o=[];for(var a in t)o.push([a,t[a]]);return o.sort(function(t,o){return o[1]-t[1]}),o}function printUnknownMice(t){t.length>0?($("#unknownmice").html(t.reduce(function(t,o){return t+"<p>"+o+"</p>"},"")),$("#unknownmicecontainer").show()):($("#unknownmice").html(""),$("#unknownmicecontainer").hide())}function printMouseLocations(t){var o="";t.sort(function(t,o){return o.locations[0][1]-t.locations[0][1]});for(var a in t){var n=t[a];o+='<tr><td rowspan="2" class="mousename">'+n.name+"</td>";for(var e="<tr>",r=n.locations.length>10?10:n.locations.length,i=0;r>i;i++){var s=n.locations[i][0].split("#");o+='<td class="text"><p><strong>'+s[0]+"</strong></p><p>"+s.slice(1).join("</p><p>")+"</p></td>",e+='<td class="rate">'+n.locations[i][1].toFixed(2)+"%</td>"}n.locations.length>10&&(o+='<td class="text">('+(n.locations.length-10)+" more)</td>",e+='<td class="rate"></td>'),o+="</tr>",e+="</tr>",o+=e}o.length>0?($("#mouselist tbody").html(o),$("#mouselistcontainer").show()):$("#mouselistcontainer").hide()}function printBestLocations(t){var o="";o=t.reduce(function(t,o){return t+'<tr><td data-value="'+o.totalRate.toFixed(2)+'"><p><strong>'+o.location+"</strong> ("+o.totalRate.toFixed(2)+"%)</p>"+(o.phase.length>0?"<p>"+o.phase+"</p>":"")+(o.cheese.length>0?"<p>"+o.cheese+"</p>":"")+(o.charm.length>0?"<p>"+o.charm+"</p>":"")+'</td><td data-value="'+o.mice.length+'">'+o.mice.sort(function(t,o){return o.rate-t.rate}).reduce(function(t,o){return t+"<p>"+o.name+" ("+o.rate.toFixed(2)+"%)</p>"},"")+"</td></tr>"},""),o.length>0?($("#bestlocations tbody").html(o),$("#bestlocationscontainer").show()):$("#bestlocationscontainer").hide()}var populationData=[],ajax=new XMLHttpRequest;ajax.open("get","http://olf.github.io/mhmapsolver/data/attractionrates.csv",!0),ajax.onreadystatechange=function(){if(4==ajax.readyState){var t=csvToArray(ajax.responseText);processPopulationData(t),processMap($("#map").val())}},ajax.send(),$(document).ready(function(){$("#map").val($.cookie("mouselist")),$("#map").keyup(function(){var t=$("#map").val();processMap(t),$.cookie("mouselist",t,{expires:14})})}),String.prototype.capitalise=function(){return this.replace(/(?:^|\s)\S/g,function(t){return t.toUpperCase()})};