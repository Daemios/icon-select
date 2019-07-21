# icon-select
Tiny standalone icon selector. Just add the .icon-select class on an element to show the picker and instantiate the class with an optional config object.

## Configuration: 

### General Options

- **place**: (string) *[default: 'attached']* 

  attached, top, center, bottom
  
- **attachTo**: (string) *[default: '.icon-select']* 

  class or id of element on page

- **attachPosition**: *(string) [default: 'bottom-left']* 

  bottom-left, bottom-middle, bottom-right, top-left, top-middle, top-right

- **displayType**: *(string) [default: 'hover']* 

  hover, click

- **chevronShow**: *(bool) [default: false]* 

  true, false

- **addIcons**: *(bool) [default: null]* 

  true, false

- **debug**: *(bool) [default: false]* 

  true, false

### Display Options
**offset**: *(int) [default: 6]* 

  distance in pixels from attachTo element that the selector spawns

**mouseover**: *(int) [default: 16]* 

  width in pixels of container element that has no background to facilitate more forgiving hovering

## Example usage:
```
let iconSelect = new IconSelect({
  place: top,
  attachTo: '.custom-id'
  addIcons: 'additional',
  icons: [
    {
        classes: "fab fa-acquisitions-incorporated"",
        searchTerms: ['dnd', 'game', 'dungeon']
    },
    {
        classes: "fa fa-plane",
        searchTerms: ['flying', 'jet']
    }
  ]
});
```
