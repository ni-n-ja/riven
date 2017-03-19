function getData(id, sheetName) {
    var sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
    var rows = sheet.getDataRange().getValues();
    var keys = rows.splice(0, 1)[0];
    return rows.map(function(row) {
        var obj = {}
        row.map(function(item, index) {
            obj[keys[index]] = item;
        });
        return obj;
    });
}

function doGet(e) {
    var weapon = null;
    var name = null;
    var data = getData('1ngptIN-h2WF48RiwO-FMCXFsAYsgnnzKesz9SWBvSwg', 'Sheet1');
    if (e.parameter.alias) {
        name = e.parameter.alias;
        data = data.filter(function(e, i, arr) {
            return (e.alias == name);
        });
    } else if (e.parameter.search) {
        weapon = e.parameter.search;
        data = data.filter(function(e, i, arr) {
            return (e.weapon == weapon);
        });
    }
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    var test;
    if (e.parameter.uuid === undefined) {
        e.parameter.uuid = Utilities.getUuid();
    }
    if (e.parameter.action) {
        var action = e.parameter.action.toLowerCase();
        delete e.parameter.action;
        if (action === 'create') {
            var sheet = SpreadsheetApp.openById('1ngptIN-h2WF48RiwO-FMCXFsAYsgnnzKesz9SWBvSwg').getSheetByName('Sheet1');
            var keys = sheet.getDataRange().getValues()[0];
            var row = [];
            keys.map(function(key) {
                var value = e.parameter[key];
                if (value) {
                    row.push(value);
                }
            });
            sheet.appendRow(row);
        } else if (action === 'delete') {
            var sheet = SpreadsheetApp.openById('1ngptIN-h2WF48RiwO-FMCXFsAYsgnnzKesz9SWBvSwg').getSheetByName('Sheet1');
            var data = getData('1ngptIN-h2WF48RiwO-FMCXFsAYsgnnzKesz9SWBvSwg', 'Sheet1');
            var uuid = e.parameter.uuid;
            data.forEach(function(e, i, arr) {
                if (e.uuid == uuid) {
                    sheet.deleteRow(i+2);
                }
            });
        }
    }
    return ContentService.createTextOutput(JSON.stringify(e.parameter)).setMimeType(ContentService.MimeType.JSON);
}
