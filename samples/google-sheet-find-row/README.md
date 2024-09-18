# Getting started with this sample

## Customizing the column headers

Let’s assume your sheet has headers like this:

| SKU | Name | Description |
|-----|------|-------------|
| ... | ...  | ...         |

The goal is to reference these columns in both your script `Code.gs` and your schema `spec.yml`, allowing you to perform searches or other operations using these headers.

1. **Define `columnKeys` in the Code.gs**:

The `columnKeys` object in the script maps each header (or column) to a corresponding position in the sheet. For example:

```javascript
columnKeys: {
'code': 1, // 1 represents the first column 'SKU'
'name': 2, // 2 represents the second column 'Name'
'description': 3 // 3 represents the third column 'Description'
}
```

2. **Define `properties` in the spec.yml**:

In the schema, you need to match these same custom keys (`code`, `name`, and `description`) under `properties` to describe the structure of the data. For example:

```yaml
properties:
  code:
    type: string
    example: "A123" // Example SKU value
  name:
    type: string
    example: "Example Name" // Example Name value
  description:
    type: string
    example: "Product A123 is very awesome" // Example Description value
```

The keys you use in `columnKeys` (such as `'code'`, `'name'`, and `'description'`) **must match** the property names you use in the schema. This ensures consistency and allows you to map your sheet’s data correctly between the script and the schema. The `type` in the schema can be `string` or `number` depending on the type of data in the column.

## Other customizations

You may notice that there are additional values you can customize in the `findInSheet` function. These values control how Google Sheets performs searches within your sheet. Below are the definitions and default settings, which you can adjust to fit your specific needs:

| Name | Definition | Default |
|------|------------|---------|
| searchColumnIndex | Number of column to search (column numbering starts from 1) | 1 |
| limit | Number of entries to return | 10 |
| headerRow | Whether data includes header row | true |
| fullMatch | Should a full match be performed | false |
| caseSensitive | Whether to match in sensitive manner | false |
