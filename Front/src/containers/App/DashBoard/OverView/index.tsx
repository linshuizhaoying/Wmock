import * as React from "react";
import Avatar from "antd/lib/avatar";
import Card from "antd/lib/card";
import Col from "antd/lib/col";
import Icon from "antd/lib/icon";
import TimeAgo from "timeago-react";
import Timeline from "antd/lib/timeline";
import { isEqual } from "../../../../util/helper";
import { Link } from "react-router-dom";
import { imgBaseUrl } from "../../../../service/api/index";
import "./index.less";
const { Meta } = Card;

export class Overview extends React.Component<OverviewProps, OverviewState> {
  constructor(props: OverviewProps) {
    super(props);
    this.state = {
      importProject: false,
      exportProject: false,
      messagesListData: []
    };
  }
  componentWillReceiveProps(nextProps: OverviewProps) {
    if (
      nextProps.messagesList.length >= 0 &&
      !isEqual(nextProps.messagesList, this.state.messagesListData)
    ) {
      this.setState({
        messagesListData: nextProps.messagesList
      });
    }
  }

  render() {
    return (
      <div id="Overview">
        <div className="content-left">
          <div className="base">
            <h4>概况</h4>
            <ul>
              <Link to="/wmock/myProject">
                <li>
                  <Col span={8}>
                    <Card hoverable={true}>
                      <Meta
                        title={this.props.projectNum + " 个项目"}
                        avatar={<Icon type="database" />}
                        description="项目总数"
                      />
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to="/wmock/teamManage">
                <li>
                  <Col span={8}>
                    <Card hoverable={true}>
                      <Meta
                        title={this.props.teamNum + " 个团队"}
                        avatar={<Icon type="team" />}
                        description="加入的团队总数"
                      />
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to="/wmock/projectSpec">
                <li>
                  <Col span={8}>
                    <Card hoverable={true}>
                      <Meta
                        title={this.props.documentNum + " 个文档"}
                        avatar={<Icon type="file-text" />}
                        description="项目文档总数"
                      />
                    </Card>
                  </Col>
                </li>
              </Link>

              <Link to="/wmock/mockModel">
                <li>
                  <Col span={8}>
                    <Card hoverable={true}>
                      <Meta
                        title={this.props.modelNum + " 个模型"}
                        avatar={<Icon type="paper-clip" />}
                        description="Mock模型总数"
                      />
                    </Card>
                  </Col>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="content-right">
          <h4>动态</h4>
          <Timeline pending={<Link to="/wmock/messages"> 查看更多 </Link>}>
            {this.state.messagesListData.length > 0
              ? this.state.messagesListData.map(
                  (item: Message, index: number) => {
                    if (index < 6) {
                      return (
                        <Timeline.Item
                          dot={<Avatar src={imgBaseUrl + "/" + item.avatar} />}
                          color="red"
                          key={index}
                        >
                          <div className="timeline">
                            <p className="date">
                              {" "}
                              <TimeAgo
                                datetime={item.time}
                                locale="zh_CN"
                              />{" "}
                            </p>
                            <div>
                              <div className="content">{item.desc}</div>
                            </div>
                          </div>
                        </Timeline.Item>
                      );
                    } else {
                      return null;
                    }
                  }
                )
              : null}
          </Timeline>
        </div>
      </div>
    );
  }
}

export default Overview;
