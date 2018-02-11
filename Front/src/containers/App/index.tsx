import * as React from 'react';
import DashBoard from '../../containers/App/DashBoard/index';
import LoadingBar from '../../components/LoadingBar';
import Login from './Login';
import Reg from './Reg';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { tokenOut, userToken } from '../../actions';
import './index.less';

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      progress: 0,
      error: false,
      login: false
    }
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(userToken({ 'token': token }))
    } else {
      dispatch(tokenOut())
      history.push('/login')
    }
  }
  componentWillReceiveProps(nextProps: AppProps) {
    // 处理loading bar 状态
    if (nextProps.loadingState === 'start') {
      this.setState({
        progress: 75,
        error: false
      })
    }
    if (nextProps.loadingState === 'error') {
      this.setState({ error: true })
    }
    if (nextProps.loadingState === 'success') {
      this.setState({
        progress: 100
      })
    }
    if (!this.state.login &&
      nextProps.userName.length > 0 &&
      nextProps.isLogin &&
      nextProps.loadingState === 'success') {
      const { history } = this.props;
      this.setState({
        login: true
      })
      if (history.location.pathname === '/' || history.location.pathname.length < 8) {
        history.push('/wmock/OverView')
      } else {
        history.push(history.location.pathname)
      }
    }

  }
  errorDone = () => {
    this.setState({ error: true })
  }

  progressDone = () => {
    this.setState({ progress: 0 })
  }

  render() {
    return (
      <div className="App">

        <LoadingBar
          progress={this.state.progress}
          error={this.state.error}
          onErrorDone={this.errorDone}
          onProgressDone={this.progressDone}
          direction="right"
        />

        <Switch>
          <Route path="/wmock" component={DashBoard} />
          <Route path="/login" component={Login} />
          <Route path="/reg" component={Reg} />
        </Switch>

      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  userName: state.user.userName,
  isLogin: state.user.isLogin,
  loadingState: state.loading.loadingState
})
const AppWrapper = connect(mapStateToProps)(App);

export default AppWrapper;