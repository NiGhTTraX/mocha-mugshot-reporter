import '../../styles/components/views.less';
import React from 'react';

class DefaultView extends React.Component {
  render() {
    let paths = this.props.paths;
    return <div className="simple">
      <img className="diff"
           ref="diff"
           src={paths.diff}
           key={paths.diff} />
    </div>;
  }
}

DefaultView.displayName = 'DefaultView';

export default DefaultView;
