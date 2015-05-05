var React = require('react');
var Rx = require('rx');

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

React.render(
  <ExampleTable/>,
  document.getElementById('app')
);
