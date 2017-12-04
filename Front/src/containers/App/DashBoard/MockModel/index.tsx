import * as React from 'react';
import './index.less';

export class MockModel extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
     
    };
  }
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps: any) {
  }


  render () {
    return(
      <div id="MockModel">
        MockModel
      </div>
    )
  }
}




export default MockModel;
