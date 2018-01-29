import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Reg from './Reg';
import { userToken } from '../../actions';
import LoadingBar from '../../components/LoadingBar';
import DashBoard from '../../containers/App/DashBoard/index';
import './index.less';


class App extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {
      progress: 0,
      error: false,
      login: false
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { history, dispatch } = this.props;
    console.log('token查询中')
    const token = localStorage.getItem('token')
    if(token ){
       dispatch(userToken({'token':token}))
    }else{
      history.push('/login')
    }
    // if(!this.props.isLogin){
    //   history.push('/login')
    // }
  }
  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    // 处理loading bar 状态
    if (nextProps.loadingState === 'start'){
      this.setState({
        progress: 75,
        error: false
      })
    }
    if (nextProps.loadingState === 'error'){
      this.setState({ error: true })
    }
    if (nextProps.loadingState === 'success'){
      this.setState({
        progress: 100
      })
    }
    if(!this.state.login && nextProps.username.length > 0 && nextProps.isLogin && nextProps.loadingState === 'success'){
      const { history } = this.props;
      this.setState({
        login: true
      })
      console.log(history)
      history.push(history.location.pathname)
    }

  }
  errorDone(){
    this.setState({ error: true })
  }

  progressDone() {
    this.setState({ progress: 0 })
  }

  render() {
    return (
      <div className="App">

        <LoadingBar
          progress={ this.state.progress }
          error={ this.state.error }
          onErrorDone={ this.errorDone.bind(this) }
          onProgressDone={ this.progressDone.bind(this) } 
          direction='right'
        />

        <Switch>
          <Route path="/wmock" component={DashBoard} />
          <Route path="/login" component={ Login }/> 
          <Route path="/reg" component={ Reg }/> 
        </Switch>
        
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
   username: state.user.username,
   isLogin:state.user.isLogin,
   loadingState: state.loading.loadingState
})
let AppWrapper = App
AppWrapper = connect(mapStateToProps)(App);

export default AppWrapper;