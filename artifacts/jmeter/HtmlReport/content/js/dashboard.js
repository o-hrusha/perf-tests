/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6633006347374495, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.6862464183381088, 500, 1500, "S01_T02_Open_Tables_Category"], "isController": false}, {"data": [0.6572871572871573, 500, 1500, "S01_T05_Open_Chairs_Category"], "isController": false}, {"data": [0.005050505050505051, 500, 1500, "S01_T010_Confirm_An_Order"], "isController": false}, {"data": [0.005772005772005772, 500, 1500, "S01_T010_Confirm_An_Order-0"], "isController": false}, {"data": [0.9581529581529582, 500, 1500, "S01_T010_Confirm_An_Order-1"], "isController": false}, {"data": [0.8737373737373737, 500, 1500, "S01_T09_Click_On_Plce_An_Order"], "isController": false}, {"data": [0.6332378223495702, 500, 1500, "S01_T01_Open_Main_Page"], "isController": false}, {"data": [0.9432471264367817, 500, 1500, "S01_T04_Add_Table_To_Cart"], "isController": false}, {"data": [0.6753246753246753, 500, 1500, "S01_T06_Select_Chair"], "isController": false}, {"data": [0.6353868194842407, 500, 1500, "S01_T03_Select_Table"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - prepearing body for placing an order"], "isController": false}, {"data": [0.9213564213564214, 500, 1500, "S01_T08_Open_Cart"], "isController": false}, {"data": [0.9386724386724387, 500, 1500, "S01_T07_Add_Chair_To_Cart"], "isController": false}, {"data": [1.0, 500, 1500, "JSR223 Sampler - preparing variable as part of request body for confirming an order"], "isController": false}, {"data": [7.374631268436578E-4, 500, 1500, "Place an order"], "isController": true}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9720, 0, 0.0, 2630.2919753086253, 0, 34241, 425.0, 14904.399999999998, 17066.699999999993, 21373.79, 10.74668450409911, 311.92284812361453, 10.922066584251462], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["S01_T02_Open_Tables_Category", 698, 0, 0.0, 544.4111747850999, 60, 2219, 554.0, 848.1, 935.05, 1155.0, 0.7787649323712946, 38.87284689068617, 0.41371887032225024], "isController": false}, {"data": ["S01_T05_Open_Chairs_Category", 693, 0, 0.0, 577.5079365079365, 57, 1289, 627.0, 865.2, 953.3, 1120.199999999999, 0.7761714252433796, 34.576770532562236, 0.3971814715112606], "isController": false}, {"data": ["S01_T010_Confirm_An_Order", 693, 0, 0.0, 16257.805194805198, 665, 34241, 16312.0, 20948.8, 22403.299999999985, 26596.499999999996, 0.7677088156900628, 26.689332629577173, 3.59498169733163], "isController": false}, {"data": ["S01_T010_Confirm_An_Order-0", 693, 0, 0.0, 15953.275613275611, 626, 33680, 15976.0, 20710.0, 22093.69999999999, 26419.44, 0.7677589967949108, 0.3808869312850159, 3.137110484175634], "isController": false}, {"data": ["S01_T010_Confirm_An_Order-1", 693, 0, 0.0, 304.3795093795096, 38, 862, 317.0, 450.0, 538.5999999999999, 740.06, 0.7706062102187053, 26.40776086736844, 0.4598050726988564], "isController": false}, {"data": ["S01_T09_Click_On_Plce_An_Order", 693, 0, 0.0, 390.160173160173, 42, 1374, 406.0, 603.6000000000001, 647.0, 836.5999999999995, 0.7751174979699303, 48.88052826969839, 0.5749220653190286], "isController": false}, {"data": ["S01_T01_Open_Main_Page", 698, 0, 0.0, 699.8982808022922, 69, 2209, 750.5, 1105.3000000000002, 1197.3499999999997, 1487.5099999999995, 0.7792909568755122, 39.45240278819809, 0.2732084507014735], "isController": false}, {"data": ["S01_T04_Add_Table_To_Cart", 696, 0, 0.0, 307.69396551724174, 24, 1612, 311.0, 516.0, 537.15, 811.8999999999937, 0.7746838655389229, 0.5227635646894419, 0.45467285467665297], "isController": false}, {"data": ["S01_T06_Select_Chair", 693, 0, 0.0, 546.4213564213557, 50, 1464, 538.0, 835.2, 880.3, 1153.199999999999, 0.7754800590841949, 35.04325750931583, 0.4093248539680408], "isController": false}, {"data": ["S01_T03_Select_Table", 698, 0, 0.0, 627.4326647564474, 61, 2274, 625.0, 948.2, 1101.05, 1451.2199999999998, 0.7770699786027435, 34.95763592671162, 0.4125683728343906], "isController": false}, {"data": ["JSR223 Sampler - prepearing body for placing an order", 693, 0, 0.0, 0.7676767676767672, 0, 159, 0.0, 1.0, 1.0, 2.0599999999999454, 0.7751686523139288, 0.0, 0.0], "isController": false}, {"data": ["S01_T08_Open_Cart", 693, 0, 0.0, 355.59595959596004, 40, 1166, 334.0, 535.6, 618.0, 867.0999999999954, 0.7745136936926869, 28.536486594095592, 0.39482045713631103], "isController": false}, {"data": ["S01_T07_Add_Chair_To_Cart", 693, 0, 0.0, 311.56565656565647, 26, 1345, 299.0, 511.0, 593.8999999999999, 826.2399999999998, 0.7749684085749751, 0.5229566830541359, 0.45408305189939946], "isController": false}, {"data": ["JSR223 Sampler - preparing variable as part of request body for confirming an order", 693, 0, 0.0, 0.6551226551226558, 0, 57, 1.0, 1.0, 1.0, 2.0, 0.775200735601737, 0.0, 0.0], "isController": false}, {"data": ["Place an order", 678, 0, 0.0, 20674.821533923292, 1356, 39118, 21243.5, 25047.4, 26837.35, 31811.620000000003, 0.7596340759746116, 282.0454454342127, 7.261637498809571], "isController": true}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 9720, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
