(function () {
    var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
		var cols = [{id:"end_of_month", dataType: tableau.dataTypeEnum.string }
,{id:"fc_swap_deposits", dataType: tableau.dataTypeEnum.float }
,{id:"deposits_hkd", dataType: tableau.dataTypeEnum.float }
,{id:"deposits_usd", dataType: tableau.dataTypeEnum.float }
,{id:"deposits_nonusd_fc", dataType: tableau.dataTypeEnum.float }
,{id:"deposits_all_fc", dataType: tableau.dataTypeEnum.float }
,{id:"deposits_all", dataType: tableau.dataTypeEnum.float }

];

		var tableSchema = {
			id: "earthquakeFeed",
			alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
			columns: cols
		};

		schemaCallback([tableSchema]);
	};

	myConnector.getData = function(table, doneCallback) {
		$.getJSON("https://api.hkma.gov.hk/public/market-data-and-statistics/monthly-statistical-bulletin/banking/customer-deposits-by-currency", function(resp) {
			var feat = resp.result.records,
				tableData = [];

			// Iterate over the JSON object
			for (var i = 0, len = feat.length; i < len; i++) {
				tableData.push({
"end_of_month": feat[i].end_of_month
,"fc_swap_deposits": feat[i].fc_swap_deposits
,"deposits_hkd": feat[i].deposits_hkd
,"deposits_usd": feat[i].deposits_usd
,"deposits_nonusd_fc": feat[i].deposits_nonusd_fc
,"deposits_all_fc": feat[i].deposits_all_fc
,"deposits_all": feat[i].deposits_all
				});
			}

			table.appendRows(tableData);
			doneCallback();
		});
	};

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
		$("#submitButton").click(function () {
			tableau.connectionName = "HKMA Connector";
			tableau.submit();
		});
	});
})();