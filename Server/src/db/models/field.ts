module.exports = {
  projectField: ['_id', 'projectName', 'projectUrl', 'projectDesc', 'version', 'transferUrl', 'status', 'type', 'masterId'],
  pureInterfaceField: ['projectId', 'interfaceName', 'url', 'method', 'desc', 'mode'],
  interfaceField: ['_id', 'projectId', 'interfaceName', 'url', 'method', 'desc', 'mode'],
  memberField: ['_id', 'avatar', 'role', 'userName'],
  teamField: ['_id', 'member', 'masterAvatar', 'masterId', 'masterName', 'projectId', 'projectName', 'role']
}
