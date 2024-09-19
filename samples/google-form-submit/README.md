# Getting started with this sample

## Customizing the input fields

This sample includes examples of all the common question types you may use in a Google Form. To customize it, simply edit the `spec.yml` file to match the fields in your Google Form. Make sure to update the `properties` section to accurately reflect each question type. Below is a list of question types and their corresponding format in `spec.yml`:

<table>

<tr>
<th>
Question Type
</th>
<th>
Format/Example
</th>
</tr>

<tr>
<td>
Short Answer
</td>
<td>

```yaml
'Full Name':
  type: string
  description: Customer's full name
```

</td>
</tr>

<tr>
<td>
Paragraph
</td>
<td>

```yaml
'Address':
  type: string
  description: Customer's address
```

</td>
</tr>

<tr>
<td>
Dropdown
</td>
<td>

```yaml
'Gender':
  type: string
  description: Customer's gender
  enum:
    - 'Male'
    - 'Female'
```

</td>
</tr>

<tr>
<td>
Multiple Choice
</td>
<td>

```yaml
'Type of Customer':
  type: string
  description: New or existing customer
  enum:
    - 'New'
    - 'Existing'
```

</td>
</tr>

<tr>
<td>
Checkboxes
</td>
<td>

```yaml
'Email Preferences':
  type: array
  items:
    type: string
    enum:
      - 'Deals and Promotions'
      - 'Announcements'
  description: Customer's email preferences
```

</td>
</tr>

<tr>
<td>
Date
</td>
<td>

```yaml
'Birthday':
  type: string
  format: date
  description: Customer's birthday
```

</td>
</tr>

<tr>
<td>
Time
</td>
<td>

```yaml
'Preferred Delivery Time':
  type: string
  format: date-time
  description: Customer's preferred delivery time
```

</td>
</tr>

</table>
