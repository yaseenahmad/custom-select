# Custom-select

Custom-select jQuery plugin

Custom-select is a jQuery plugin using this plugin you will be able to create your own HTML CSS select dropdown to support all browsers. Custom-select require jQuery 2.0 or higher versions.

# Installation

```
<script src="js/custom-select.js"></script>
```

# Full Documentation with Examples

To create fancy look dropdown add `data` attributes with select options. for example dropdown with flags and country name

Example HTML
```
<select name="country" id="country">
   <option value="US" data-flag="images/flag-us.jpg" data-country="US" data-valselected="US">US</option>
</select>
```

Example JS
```
$('#country').customSelect({
  html: '<div class="county-flg"><img src="#flag#"> #country#</div>'
});
```

Using the `data` attribute and html option for select you can create any type of dropdown in case if you want to show only country name when user select it from dropdown need to use the `appendHtml` option

```
$('#country').customSelect({
  html: '<div class="county-flg"><img src="#flag#"> #country#</div>',
  appendHtml: '<div class="county-flg">#country#</div>',
});
```

# Options list

| Options | Description | Required |
| --- | --- | --- |
| html | HTML string that will loop to show the dropdown list | Yes |
| appendHtml | When user select from the dropdown it will show the selected entries | Optional |
| after | Provide unique element `.class` or `#id` this is where you want to append the dropdown html | Optional |
| data-valselected | This should unique string withou spaces with `select` `option` | Yes |



# Events list

| event | Description |
| --- | --- |
| onfocus | When user click inside the input this event will be triggered
| onfocusout | When user click outside of the input this event will be triggered
| onSelect | When user select from the list this event will be triggered
| onSearch | When user type text in input this event will be triggered you can ajax on this event to show the data from data base

# Functions list

| Function | Description |
| --- | --- |
| customSelect | Need to call this function to initiate the dropdown thi function requried options you can also add the call back function on it.
| update | Need to call this function when you want to update the data in dropdown this function required the data array with same object that used with select options.

