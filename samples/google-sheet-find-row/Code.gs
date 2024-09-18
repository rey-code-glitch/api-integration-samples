/**
 * @OnlyCurrentDoc
 */

function doPost(params) {

  const query = params.parameter.query

  const {
    entries,
    total
  } = findInSheet({
    searchColumnIndex : 1,
    query,
    limit : 10,
    hasHeaderRow : true,
    fullMatch : false,
    caseSensitive : false,
    columnKeys : {
      code : 1,
      name : 2,
      description : 3
    }
  })

  const result = {
    total,
    entries : entries
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}


/**
 * Finds values in sheet and formats them
 * @param {Object} params
 * @param {number} params.searchColumnIndex Number of column to search (column numbering starts from 1)
 * @param {string} params.query Query to search for
 * @param {number} params.limit Number of entries to return.
 * @param {boolean} params.headerRow Whether data includes header row
 * @param {boolean} params.fullMatch Should a full match be performed.
 * @param {boolean} params.caseSensitive Whether to match in sensitive manner,
 * @param {Record<string, number>} params.columnKeys Object containing column keys in `title : column` format. Column numbers start from 1 for the first column
 */
function findInSheet(params) {
  const {
    searchColumnIndex,
    query,
    hasHeaderRow,
    fullMatch,
    caseSensitive,
    columnKeys,
    limit
  } = params;
  // Get the active spreadsheet and the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the range of the specified column
  var columnRange = sheet.getRange(hasHeaderRow ? 1 : 2, searchColumnIndex, sheet.getLastRow(), 1);

  var finder = columnRange.createTextFinder(query);

  // Do a full match (set to `false` to do partial matches)
  finder.matchEntireCell(fullMatch);

  // Do a case-insensitive matchin
  finder.matchCase(caseSensitive);

  // Get the values of the specified column
  var matches = finder.findAll();

  const entries = []

  // Find range we need to find
  const dataColumnLenght = Math.max(...Object.values(columnKeys));

  const columnDefs = Array.from(Object.entries(columnKeys))

  const total = matches.length;

  for (const foundValue of matches) {
    var rowRange = sheet.getRange(foundValue.getRow(), 1, 1, dataColumnLenght);

    // Get the values of the specified row
    var rowValues = rowRange.getValues();

    const rowObject = {};

    for (const [key, column] of columnDefs) {
      rowObject[key] = rowValues[0][column - 1];
    }

    entries.push(rowObject);

    if (entries.length >= limit) {
      break
    }
  }

  return {
    total : total,
    entries: entries
  };
}
