# react-fixed-scroll-element

A fixed-height scrolling element for React using RxJS.

# Installation

`npm install --save-dev react-fixed-scroll-element`, hopefully.

# Usage

```js
var FixedScrollElement = require('../../lib/fixed-scroll-table.js');

var ExampleTable = React.createClass({

  getRow: function (itemIndex, keyIndex, top) {
    var style = {
      position: 'absolute',
      top: top,
      width: '100%',
      borderBottom: '1px solid grey'
    };
    return (
      <tr key={keyIndex} style={style}>
        <td>{itemIndex}</td>
        <td>5 * itemIndex === {5 * itemIndex}</td>
      </tr>
    );
  },

  render: function () {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Content</th>
            </tr>
          </thead>
        </table>

        <FixedScrollElement
          elementConstructor={'table'}
          containerHeight={500}
          rowHeight={50}
          rowCount={10000}
          rowGetter={this.getRow}
        />

      </div>
    );
  }

});
```

* `elementConstructor` - constructor for the rows (e.g. 'table', 'ul')

* `containerHeight` - height for the container

* `rowHeight` - height of a row

* `rowCount` - total count of rows

* `rowGetter` - getter takes the item index, key index (for rendering in the outlet), top (for absolute positioning)

# Notes

As you can see, the rows are absolutely positioned, and the container is relatively positioned.

Works by similar way that fixed-data-table does, by only displaying a few items that are visible to the user.

Original method by simple.gy: http://www.simple.gy/blog/infinite-bacon/

# Comments

The source is only 94 lines, so copy paste away.
