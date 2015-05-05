var Rx = require('rx');
var React = require('react');

var FixedScrollElement = React.createClass({

  getDefaultProps: function () {
    return {
      elementConstructor: 'table',
      containerHeight: 400,
      rowHeight: 40
    };
  },

  getInitialState: function () {
    return {
      visibleIndices: []
    };
  },

  render: function () {
    var rows = this.state.visibleIndices.map(function (itemIndex, keyIndex) {
      var top = itemIndex * this.props.rowHeight;
      return this.props.rowGetter(itemIndex, keyIndex, top);
    }.bind(this));

    var containerStyle = {
      position: 'relative',
      height: this.props.containerHeight,
      overflowX: 'hidden'
    };

    var Constructor = this.props.elementConstructor;

    return (
      <div
        ref="Container"
        className="fixed-scroll-element"
        style={containerStyle}
        {...this.props.containerOverrides}>
        <Constructor
          style={{height: this.props.rowCount * this.props.rowHeight}}
          {...this.props.elementOverrides}>
          {rows}
        </Constructor>
      </div>
    );
  },

  componentDidMount: function () {
    var containerHeight = this.props.containerHeight;
    var rowHeight = this.props.rowHeight;
    var rowCount = this.props.rowCount;
    var tableNode = React.findDOMNode(this.refs.Container);

    var visibleRows = Math.ceil(containerHeight/ rowHeight);

    var getScrollTop = function () {
      return tableNode.scrollTop;
    };

    var initialScrollSubject = new Rx.ReplaySubject(1);
    initialScrollSubject.onNext(getScrollTop());

    var scrollTopStream = initialScrollSubject.merge(
      Rx.Observable.fromEvent(tableNode, 'scroll').map(getScrollTop)
    );

    var firstVisibleRowStream = scrollTopStream.map(function (scrollTop) {
      return Math.floor(scrollTop / rowHeight);
    }).distinctUntilChanged();

    var visibleIndicesStream = firstVisibleRowStream.map(function (firstRow) {
      var visibleIndices = [];
      var lastRow = firstRow + visibleRows + 1;

      if (lastRow > rowCount) {
        firstRow -= lastRow - rowCount;
      }

      for (var i = 0; i <= visibleRows; i++) {
        visibleIndices.push(i + firstRow);
      }
      return visibleIndices;
    });

    this.visibleIndicesSubscription = visibleIndicesStream.subscribe(function (indices) {
      this.setState({
        visibleIndices: indices
      });
    }.bind(this));
  }
});

module.exports = FixedScrollElement;
