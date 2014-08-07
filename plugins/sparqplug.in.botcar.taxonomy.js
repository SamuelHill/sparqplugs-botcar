sparqplug.in.botcartaxonomy = {type:"in","title":"BC Taxonomy","description":"Use a tree to search through family, genus and species.","icon":"&#xf0e8;","css":"sparqplug.in.botcar.taxonomy.css"};

sparqplug.in.botcartaxonomy.load = function () {
	console.log("Load BC Tax");
	var family = $("<div/>",{
		id:'bc-tax-family',
		'class': 'bc-tax-column'
	});
	
	var families = $(document).query('SELECT ?o WHERE { <urn:cite:botcar:family> cite:possesses ?o }');
	console.log(families);
	
	$.each(families,function (index,value) {
		urn = value.o.value;
		urn_components = urn.split('.');
		family_name = urn_components[urn_components.length-1];
		li = $('<li/>',{
			id: 'family-'+family_name,
			text: family_name
		}).data('urn',urn).click(function () {
			sparqplug.in.botcartaxonomy.selectedFamily($(this).data('urn'));
		});
			
		$(family).append(li);
		
	});
	
	var genus = $("<div/>",{
		id:'bc-tax-genus',
		'class': 'bc-tax-column'
	});
	
	var species = $("<div/>",{
		id:'bc-tax-specie',
		'class': 'bc-tax-column'
	});
	
	$("#sparqplug-in-botcar-taxonomy").append(family);
	$("#sparqplug-in-botcar-taxonomy").append(genus);
	$("#sparqplug-in-botcar-taxonomy").append(species);
}

sparqplug.in.botcartaxonomy.error = function (error) {
	alert('There was an Error!');
}

sparqplug.in.botcartaxonomy.updateUI = function () {
	console.log("updateUI in.botcar.taxonomy");
	//$('#sp-in-text-textarea').val(environment.latestQuery);
}

//Plugin Specific

sparqplug.in.botcartaxonomy.selectedFamily = function (family) {
	console.log('Selected Family: '+family);
	
	urn_components = family.split('.');
	family_name = urn_components[urn_components.length-1];
	
	$('#bc-tax-family').children().removeClass('selected');
	$('#family-'+family_name).addClass('selected');
	
	var genera = $(document).query('SELECT ?o WHERE { <'+family+'> <http://folio.furman.edu/datans/bctaxon/hasChild> ?o }');
	console.log(genera);
	
	$('#bc-tax-genus').children().remove();
	$('#bc-tax-specie').children().remove();
	$.each(genera,function (index,value) {
		urn = value.o.value;
		urn_components = urn.split('.');
		genus_name = urn_components[urn_components.length-1];
		li = $('<li/>',{
			id: 'genus-'+genus_name,
			text: genus_name
		}).data('urn',urn).click(function () {
			sparqplug.in.botcartaxonomy.selectedGenus($(this).data('urn'));
		});
			
		$('#bc-tax-genus').append(li);
	});
}

sparqplug.in.botcartaxonomy.selectedGenus = function (genus) {
	console.log('Selected Genus: '+genus);
	
	urn_components = genus.split('.');
	genus_name = urn_components[urn_components.length-1];
	
	$('#bc-tax-genus').children().removeClass('selected');
	$('#genus-'+genus_name).addClass('selected');
	
	var specie = $(document).query('SELECT ?o WHERE { <'+genus+'> <http://folio.furman.edu/datans/bctaxon/hasChild> ?o }');
	console.log(specie);
	
	$('#bc-tax-specie').children().remove();
	$.each(specie,function (index,value) {
		urn = value.o.value;
		urn_components = urn.split('.');
		specie_name = urn_components[urn_components.length-1];
		li = $('<li/>',{
			id: 'specie-'+specie_name,
			text: specie_name
		}).data('urn',urn).click(function () {
			sparqplug.in.botcartaxonomy.selectedSpecie($(this).data('urn'));
		});
			
		$('#bc-tax-specie').append(li);
	});
} 

plugins['sparqplug-in-botcar-taxonomy'] = sparqplug.in.botcartaxonomy;