// Create the dc.js chart objects and link to div
var timeBubble = dc.bubbleChart('#dc-time-bubble');
var timeChart = dc.barChart('#dc-time-chart');
var account_groupChart = dc.rowChart('#dc-account_group-chart');
var countryChart = dc.rowChart('#dc-country-chart');
var search_termChart = dc.rowChart('#dc-search_term-chart');
var languChart = dc.rowChart('#dc-langu-chart');
var regionChart = dc.rowChart('#dc-region-chart');
var cityChart = dc.rowChart('#dc-city-chart');
var city_postal_codeChart = dc.rowChart('#dc-city_postal_code-chart');
var streetChart = dc.rowChart('#dc-street-chart');
var longitudeChart = dc.rowChart('#dc-longitude-chart');
var latitudeChart = dc.rowChart('#dc-latitude-chart');
var telephone_numberChart = dc.rowChart('#dc-telephone_number-chart');
var smtp_addressChart = dc.rowChart('#dc-smtp_address-chart');
var tax_numberChart = dc.rowChart('#dc-tax_number-chart');
var tax_jurisdictionChart = dc.rowChart('#dc-tax_jurisdiction-chart');
var dataTable = dc.dataTable('#dc-table-graph');

//load data from csv file
d3.csv("adresses.csv", function(error, data) {

  //format our data
  var dateFormat = d3.time.format("%Y-%m-%d").parse;

  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(data);

  // Declaration of var that includes all of our data.
  var all = facts.groupAll();

  // Create timeBubble dimension and group;
  var creationsTimeBubble = facts.dimension(function(d) {
    return dateFormat(d.creation_date);
  });
  var creationsTimeBubbleGroup = creationsTimeBubble.group()
    .reduceCount(function(d) { return dateFormat(d.creation_date); });

  // Create timeChart dimension and group
  var creationsByDay = facts.dimension(function(d) {
    return dateFormat(d.creation_date);
  });
  var creationsByDayGroup = creationsByDay.group()
    .reduceCount(function(d) { return dateFormat(d.creation_date); });

  // Create account_groupChart dimension and group
  var creationsByaccount_group = facts.dimension(function(d) {
    return(d.account_group);
  });
  var creationsByaccount_groupGroup = creationsByaccount_group.group()
    .reduceCount(function(d) { return d.account_group; });

  // Create countryChart dimension and group
  var creationsByCountry = facts.dimension(function(d) {
    if (d.country == "")
      return "null";
    else
      return d.country;
  });
  var creationsByCountryGroup = creationsByCountry.group();

  // Create search_termChart dimension and group
  var search_term = facts.dimension(function(d) {
    if (d.search_term == "")
      return "null";
    else
      return "filled";
  });
  var search_termGroup = search_term.group();

  // Create languChart dimension and group
  var langu = facts.dimension(function(d) {
    if (d.langu == "")
      return "null";
    else
      return "filled";
  });
  var languGroup = langu.group();

  // Create regionChart dimension and group
  var region = facts.dimension(function(d) {
    if (d.region == "")
      return "null";
    else
      return "filled";
  });
  var regionGroup = region.group();

  // Create cityChart dimension and group
  var city = facts.dimension(function(d) {
    if (d.city == "")
      return "null";
    else
      return "filled";
  });
  var cityGroup = city.group();

  // Create city_postal_codeChart dimension and group
  var city_postal_code = facts.dimension(function(d) {
    if (d.city_postal_code == "")
      return "null";
    else
      return "filled";
  });
  var city_postal_codeGroup = city_postal_code.group();

  // Create streetChart dimension and group
  var street = facts.dimension(function(d) {
    if (d.street != "")
      return "filled";
    else
      return "null";
  });
  var streetGroup = street.group();

  // Create longitudeChart dimension and group
  var longitude = facts.dimension(function(d) {
    if (d.longitude != "")
      return "filled";
    else
      return "null";
  });
  var longitudeGroup = longitude.group();

  // Create latitudeChart dimension and group
  var latitude = facts.dimension(function(d) {
    if (d.latitude == "")
      return "null";
    else
      return "filled";
  });
  var latitudeGroup = latitude.group();

  // Create telephone_numberChart dimension and group
  var telephone_number = facts.dimension(function(d) {
    if (d.telephone_number != "")
      return "filled";
    else
      return "null";
  });
  var telephone_numberGroup = telephone_number.group();

  // Create smtp_addressChart dimension and group
  var smtp_address = facts.dimension(function(d) {
    if (d.smtp_address != "")
      return "filled";
    else
      return "null";
  });
  var smtp_addressGroup = smtp_address.group();

  // Create tax_numberChart dimension and group
  var tax_number = facts.dimension(function(d) {
    if (d.tax_number != "")
      return "filled";
    else
      return "null";
  });
  var tax_numberGroup = tax_number.group();

  // Create tax_jurisdictionChart dimension and group
  var tax_jurisdiction = facts.dimension(function(d) {
    if (d.tax_jurisdiction != "")
      return "filled";
    else
      return "null";
  });
  var tax_jurisdictionGroup = tax_jurisdiction.group();

  // Create dataTable dimension
  var timeDimension = facts.dimension(function(d) {
    return dateFormat(d.creation_date);
  });

  // * * * * * S E T  U P  T H E  C H A R T S  * * * * *

  // Count all the 'facts'
  dc.dataCount(".dc-data-count")
    .dimension(facts)
    .group(all);

  // timeBubble
  timeBubble.width(960).height(110)
    .margins({top: 0, right: 10, bottom: -1, left:9})
    .transitionDuration(1500)
    .dimension(creationsTimeBubble)
    .group(creationsTimeBubbleGroup)//    .colors(colorbrewer.RdYlGn[9])
    .colors(d3.scale.category10())
    .colorDomain([-500, 500])
    .colorAccessor(function(d) {
      return d.value;
    })
    .keyAccessor(function (d) {
      return d.key;
    })
    .valueAccessor(function(d) {
      return d.value;
    })
    .radiusValueAccessor(function(d) {
      return d.value;
    })
    .maxBubbleRelativeSize(0.05)
    .x(d3.time.scale().domain(d3.extent(data, function(d) { return dateFormat(d.creation_date); })))
    .y(d3.scale.linear().domain([0, 485]))
    .r(d3.scale.log().domain([1,485]))
    .elasticY(true)
    .elasticX(true)
    .yAxisPadding(14)    //.xAxisPadding(500)
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)    //.xAxisLabel('Creation Date')    //.yAxisLabel('Creation Count')
    .renderLabel(false)    //.label(function(d) {    //  return d.key;    //})    //.renderTitle(true)
    .title(function(d) {
      return "Vendors created/extended: " + d.value + "\n" + d.key;
    })
    .yAxis().ticks(2);    //.renderlet(function(d) {      //timeBubble.selectAll('g.x text')        //.attr('transform', 'translate(-10,10) rotate(315)')    //});

  // timeChart
  timeChart.width(960).height(35)
    .margins({top: 0, right: 10, bottom: 20, left: 9})
    .dimension(creationsByDay)
    .group(creationsByDayGroup)    //.mouseZoomable(true)
    .transitionDuration(500)
    //.centerBar(true)    //.brushOn(false)
    .title(function(d) { return d.key + "\n" + d.value + " vendors created/extended"; })
    .gap(1)    //.elasticY(true)
    .filter([dateFormat("2015-10-06"), dateFormat("2017-10-02")])
    .renderVerticalGridLines(true)
    .x(d3.time.scale().domain(d3.extent(data, function(d) { return dateFormat(d.creation_date); })))
    .y(d3.scale.linear().domain([0,528]))
    .yAxis().ticks(0);


  var account_groupAndCountryChartHeight = 105; // width for the account_group and country charts

  // account_groupChart
  account_groupChart.width(480).height(account_groupAndCountryChartHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(creationsByaccount_group)
    .group(creationsByaccount_groupGroup)//.colors(d3.scale.category20())
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis()
    .ticks(4);

  // countryhart
  countryChart.width(480).height(account_groupAndCountryChartHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(creationsByCountry)
    .group(creationsByCountryGroup)//.colors(d3.scale.category20())
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis()
    .ticks(4);

  var fieldFilterWidth = 160; // width for the charts of fields used for filtering
  var fieldFilterHeight = 45; // height for the charts of fields used for filtering

  // search_termChart
  search_termChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(search_term)
    .group(search_termGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // languChart
  languChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(langu)
    .group(languGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // regionChart
  regionChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(region)
    .group(regionGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // cityChart
  cityChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(city)
    .group(cityGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // city_postal_codeChart
  city_postal_codeChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(city_postal_code)
    .group(city_postal_codeGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // streetChart
  streetChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(street)
    .group(streetGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // longitudeChart
  longitudeChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(longitude)
    .group(longitudeGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // latitudeChart
  latitudeChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(latitude)
    .group(latitudeGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a square checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // telephone_numberChart
  telephone_numberChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(telephone_number)
    .group(telephone_numberGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // smtp_addressChart
  smtp_addressChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(smtp_address)
    .group(smtp_addressGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });
  // tax_numberChart
  tax_numberChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(tax_number)
    .group(tax_numberGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // tax_jurisdictionChart
  tax_jurisdictionChart.width(fieldFilterWidth).height(fieldFilterHeight)
    .margins({top: 0, left: 0, right: 10, bottom: -1})
    .dimension(tax_jurisdiction)
    .group(tax_jurisdictionGroup)
    .colors(d3.scale.category10())
    .valueAccessor(function(d) { return 5; }) // fixed size to make a rectangular checkbox
    .label(function(d) { return d.key + ": " + d.value; })
    .title(function(d) { return d.key + "\n" + d.value; })
    .elasticX(true)
    .xAxis().tickFormat(function(v) { return ""; });

  // Table of vendor data
  dataTable.width(960).height(800)
    .dimension(timeDimension)
    .group(function(d) { return ""; })
    .size(100)
    .columns([
      function(d) { return d.address_number; },
      function(d) { return d.creation_date; },
      function(d) { return d.name1; },
      function(d) { return d.search_term; },
      function(d) { return d.account_group; },
      function(d) { return d.langu; },
      function(d) { return d.country; },
      function(d) { return d.region; },
      function(d) { return d.city; },
      function(d) { return d.city_postal_code; },
      function(d) { return d.street; },
      function(d) { return d.longitude; },
      function(d) { return d.latitude; },
      function(d) { return d.telephone_number; },
      function(d) { return d.smtp_address; },
      function(d) { return d.tax_number; },
      function(d) { return d.tax_jurisdiction; }
    ])
    .sortBy(function(d) { return d.creation_date; })
    .order(d3.descending);

  // Render the charts

  dc.renderAll();

})
