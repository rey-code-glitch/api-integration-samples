/**
 * @OnlyCurrentDoc
 */


function doPost(params) {
  let result;
  try {
    let body = JSON.parse(params.postData.contents);

    result = submitForm(body);
  } catch (error) {
    result = {
      submitted: false,
      error: error.toString()
    }
  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function submitForm(fields) {

  // Get the active form
  let form = FormApp.getActiveForm();

  // Get fields from form
  let items = form.getItems();

  // Create a response for the form
  let formResponse = form.createResponse();

  for (let item of items) {
    let title = item.getTitle();

    if (fields[title]) {
      // Add the field as part of the form response
      let response = getItemResponse(item, fields[title]);

      if (response === null) {
        throw new Error('Invalid field type or value')
      }

      formResponse.withItemResponse(response);
    }
  }

  formResponse = formResponse.submit();

  return {
    submitted: true,
    timestamp: formResponse.getTimestamp(),
    id: formResponse.getId()
  }
}


/**
 * Converts generic field into specific type
 */
function getItemResponse(item, value) {
  let type = item.getType().name();

  switch (type) {
    case 'TEXT':
      if (typeof value !== 'string') {
        return null;
      }
      item = item.asTextItem();
      return item.createResponse(value);

    case 'PARAGRAPH_TEXT':
      if (typeof value != 'string') {
        return null;
      }
      item = item.asParagraphTextItem();
      return item.createResponse(value);

    case 'MULTIPLE_CHOICE':
      if (typeof value != 'string') {
        return null;
      }
      item = item.asMultipleChoiceItem();
      return item.createResponse(value);

    case 'CHECKBOX':
      if (!Array.isArray(value)) {
        return null;
      }
      if (!value.every(i => typeof i === "string")) {
        return null;
      }
      item = item.asCheckboxItem();
      return item.createResponse(value);

    case 'LIST':
      if (typeof value != 'string') {
        return null;
      }
      item = item.asListItem();
      return item.createResponse(value);

    case 'DATE':
      let date = new Date(value);
      if (date === 'Invalid Date') {
        return null;
      }
      item = item.asDateItem();
      return item.createResponse(date);

    case 'TIME':
      if (!Array.isArray(value)) {
        return null;
      }
      if (!value.every(i => Number.isInteger(i))) {
        return null;
      }
      item = item.asTimeItem();
      return item.createResponse(value[0], value[1]);

    default:
      return null;
  }
}
