import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class TwoUpView extends React.Component {
  render() {
    let paths = this.props.paths;
    return <div className="simple">
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <img className="baseline"
                 ref="baseline"
                 src={paths.baseline}
                 key={paths.baseline} />
          </Col>
          <Col xs={12} md={6}>
            <img className="screenshot"
                 ref="screenshot"
                 src={paths.screenshot}
                 key={paths.screenshot} />
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

TwoUpView.displayName = 'TwoUpView';

export default TwoUpView;
