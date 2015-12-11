var googleSpreadSheetJSON = "https://sheetsu.com/apis/4fc355dc";
var obj;
var split;
var FJS;
var map;
var markers;
var personsListGUI = [];
var institutesListGUI = [];
var partnersListGUI = [];
var sponsorsListGUI = [];
var disciplineListGUI = [];
var periodListGUI = [];
var spaceListGUI = [];

$(document).ready(function() {
	// init
	$.ajaxSetup({
		async: false
	});
	// set leaflet map baselayer
	map = L.map('map').setView([51.505, -0.09], 1);
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
	}).addTo(map);
	// get data from google spreadsheet
	$.getJSON(googleSpreadSheetJSON, function(response) {
		try {
			response = JSON.parse(response);
		} catch (e) {}
		obj = response.result;
		for (var i = 0; i < obj.length; i++) {
			// Personen
			// projektleitung
			split = obj[i].projektleitung.split(";");
			var personsList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					personsListGUI.push(split[j]);
					personsList_tmp.push(split[j]);
				}
			}
			// mitwirkende
			split = obj[i].mitwirkende.split(";");
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					personsListGUI.push(split[j]);
					personsList_tmp.push(split[j]);
				}
			}
			obj[i].personsList = personsList_tmp;
			// Einrichtung
			split = obj[i].institut.split(";");
			var institutesList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					institutesListGUI.push(split[j]);
					institutesList_tmp.push(split[j]);
				}
			}
			obj[i].institutesList = institutesList_tmp;
			// Projektpartner
			split = obj[i].projektpartner.split(";");
			var partnersList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					partnersListGUI.push(split[j]);
					partnersList_tmp.push(split[j]);
				}
			}
			obj[i].partnersList = partnersList_tmp;
			// Förderer
			split = obj[i].förderer.split(";");
			var sponsorsList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					sponsorsListGUI.push(split[j]);
					sponsorsList_tmp.push(split[j]);
				}
			}
			// Disziplin
			split = obj[i].disziplin.split(";");
			var disciplineList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					disciplineListGUI.push(split[j]);
					disciplineList_tmp.push(split[j]);
				}
			}
			// Epoche
			split = obj[i].epoche.split(";");
			var periodList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					periodListGUI.push(split[j]);
					periodList_tmp.push(split[j]);
				}
			}
			// geogr. Raum
			split = obj[i].geografischerRaum.split(";");
			var spaceList_tmp = [];
			for (var j = 0; j < split.length; j++) {
				if (split[j] != "") {
					spaceListGUI.push(split[j]);
					spaceList_tmp.push(split[j]);
				}
			}
			obj[i].spaceList = spaceList_tmp;
			// Laufzeit
			var beginn = Number(obj[i].beginn);
			var ende = Number(obj[i].ende);
			var tr = "";
			if (beginn != "") {
				while (beginn <= ende) {
					tr += ',"years":"' + beginn + '"';
					beginn++;
				}
			}
			//
			var a = JSON.stringify(obj[i]);
			a = a.substring(0, a.length - 1);
			a += tr + "}";
			//console.log(a);
			obj[i] = JSON.parse(a);
		}
		console.info(obj);
		// get single elements in array
		function remDoub(arr) {
			var temp = new Array();
			arr.sort();
			for (i = 0; i < arr.length; i++) {
				if (arr[i] == arr[i + 1]) {
					continue
				}
				temp[temp.length] = arr[i];
			}
			return temp;
		}
		personsListGUI = remDoub(personsListGUI);
		for (var i = 0; i < personsListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + personsListGUI[i] + "' id='persons_criteria-" + i + "'><span>" + personsListGUI[i] + "</span></label></div>";
			$(string).appendTo("#persons_criteria");
		}
		//console.log(personsListGUI);
		institutesListGUI = remDoub(institutesListGUI);
		for (var i = 0; i < institutesListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + institutesListGUI[i] + "' id='institutes_criteria-" + i + "'><span>" + institutesListGUI[i] + "</span></label></div>";
			$(string).appendTo("#institutes_criteria");
		}
		//console.log(institutesListGUI);
		partnersListGUI = remDoub(partnersListGUI);
		for (var i = 0; i < partnersListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + partnersListGUI[i] + "' id='partners_criteria-" + i + "'><span>" + partnersListGUI[i] + "</span></label></div>";
			$(string).appendTo("#partners_criteria");
		}
		//console.log(partnersListGUI);
		sponsorsListGUI = remDoub(sponsorsListGUI);
		for (var i = 0; i < sponsorsListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + sponsorsListGUI[i] + "' id='sponsors_criteria-" + i + "'><span>" + sponsorsListGUI[i] + "</span></label></div>";
			$(string).appendTo("#sponsors_criteria");
		}
		//console.log(sponsorsListGUI);
		disciplineListGUI = remDoub(disciplineListGUI);
		for (var i = 0; i < disciplineListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + disciplineListGUI[i] + "' id='discipline_criteria-" + i + "'><span>" + disciplineListGUI[i] + "</span></label></div>";
			$(string).appendTo("#discipline_criteria");
		}
		//console.log(disciplineListGUI);
		periodListGUI = remDoub(periodListGUI);
		for (var i = 0; i < periodListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + periodListGUI[i] + "' id='period_criteria-" + i + "'><span>" + periodListGUI[i] + "</span></label></div>";
			$(string).appendTo("#period_criteria");
		}
		//console.log(periodListGUI);
		spaceListGUI = remDoub(spaceListGUI);
		for (var i = 0; i < spaceListGUI.length; i++) {
			var string = "<div class='checkbox'><label><input type='checkbox' value='" + spaceListGUI[i] + "' id='period_criteria-" + i + "'><span>" + spaceListGUI[i] + "</span></label></div>";
			$(string).appendTo("#space_criteria");
		}
		//console.log(spaceListGUI);
		// show number of elements
		$('#total_data').text(obj.length);
		// init
		initFiltersHTML();
	});
});

function initFiltersHTML() {
	$('#persons_criteria :checkbox').prop('checked', false);
	$('#institutes_criteria :checkbox').prop('checked', false);
	$('#partners_criteria :checkbox').prop('checked', false);
	$('#sponsors_criteria :checkbox').prop('checked', false);
	$('#discipline_criteria :checkbox').prop('checked', false);
	$('#period_criteria :checkbox').prop('checked', false);
	$('#space_criteria :checkbox').prop('checked', false);
	$("#years_slider").slider({
		min: 2010,
		max: 2030,
		values: [2010, 2030],
		step: 1,
		range: true,
		slide: function(event, ui) {
			$("#years_range_label").html(ui.values[0] + ' - ' + ui.values[1]);
			$('#years_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
		}
	});
	initFilters();
}

function initFilters() {
	FJS = FilterJS(obj, '#data', {
		template: '#main_template',
		criterias: [{
			field: 'years',
			ele: '#years_filter',
			type: 'range',
			delimiter: '-'
		}, {
			field: 'personsList',
			ele: '#persons_criteria input:checkbox'
		}, {
			field: 'institutesList',
			ele: '#institutes_criteria input:checkbox'
		}, {
			field: 'partnersList',
			ele: '#partners_criteria input:checkbox'
		}, {
			field: 'sponsorsList',
			ele: '#sponsors_criteria input:checkbox'
		}, {
			field: 'disciplineList',
			ele: '#discipline_criteria input:checkbox'
		}, {
			field: 'periodList',
			ele: '#period_criteria input:checkbox'
		}, {
			field: 'spaceList',
			ele: '#space_criteria input:checkbox'
		}],
		search: {
			ele: '#searchbox'
		},
		callbacks: {
			afterFilter: function(result, jQ) {
				//console.log(result);
				console.log(result.length);
				$('#total_data').text(result.length);
				// set numbers
				/*var checkboxes1 = $("#persons_criteria :input");
				checkboxes1.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'personsList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				var checkboxes2 = $("#institutes_criteria :input");
				checkboxes2.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'institutesList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				var checkboxes3 = $("#partners_criteria :input");
				console.log(checkboxes3);
				checkboxes3.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'partnersList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				var checkboxes4 = $("#sponsors_criteria :input");
				console.log(checkboxes4);
				checkboxes4.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'sponsorsList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				/*var checkboxes5 = $("#discipline_criteria :input");
				checkboxes5.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'disciplineList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				var checkboxes6 = $("#period_criteria :input");
				checkboxes6.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'periodList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");
				var checkboxes7 = $("#space_criteria :input");
				checkboxes7.each(function() {
					var c = $(this);
					var count = 0;
					if (result.length > 0) {
						count = jQ.where({
							'spaceList': c.val()
						}).count;
					}
					c.next().text(c.val() + ' (' + count + ')')
				});
				console.log("ok");*/
				// set marker
				try {
					map.removeLayer(markers);
				} catch (e) {}
				markers = new L.FeatureGroup();
				for (var i = 0; i < result.length; i++) {
					var lat = Number(result[i].lat);
					var lon = Number(result[i].lon);
					var marker = L.marker([lat, lon]);
					marker.bindPopup(result[i].akronym, {
						showOnMouseOver: true
					});
					markers.addLayer(marker);
				}
				map.addLayer(markers);
			}
		}
	});
	window.FJS = FJS;
	// init filters
	$("#years_filter").val('2011' + '-' + '2029').trigger('change');
	$("#years_filter").val('2010' + '-' + '2030').trigger('change');
}