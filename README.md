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
