import '../../styles/components/views.less';
import React from 'react';
import ImageDiff from 'react-image-diff';
import {Clearfix} from 'react-bootstrap';

class FadeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0.5
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  render() {
    const paths = this.props.paths,
          value = this.state.value;

    return <div className="special">
      <ImageDiff before={paths.screenshot}
                 after={paths.baseline}
                 type="fade"
                 value={value} />
      <Clearfix />
      <input type="range"
             min={0}
             max={1}
             step={.01}
             defaultValue={value}
             onChange={this.onValueChange} />
    </div>;
  }

  onValueChange(element) {
    this.setState({
      value: parseFloat(element.target.value)
    });
  }
}

FadeView.displayName = 'FadeView';

export default FadeView;
