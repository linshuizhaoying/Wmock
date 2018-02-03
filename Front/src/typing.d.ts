interface Id{
  id: String
}

interface Project{
  _id? : String,
  projectName?: String,
  projectUrl?: String,
  projectDesc?: String,
  version?: String,
  transferUrl?: String,
  status?: String,
  type?: String,
  teamMember?: Array<any>,
  interfaceList?: Array<any>,
}

declare module '*.less' {
  const content: any;
  export default content;
}
declare var foo: number;
declare module 'components'

declare module 'actions'

declare module 'util'

declare module 'classnames'

declare module 'react-redux'
declare module 'redux-logger'
declare module 'react-router'
declare module 'history'
declare module 'react-router-dom'
declare module 'react-router-redux'
declare module 'react-loadingbar'
declare module 'timeago-react'
declare module 'lodash/differenceWith'
declare module 'lodash/isEqual'
declare module 'md5'
declare module 'js-beautify/js/lib/beautify'
declare module 'react-draft-wysiwyg'
declare module 'draft-js'
declare module 'draftjs-to-html'
declare module 'html-to-draftjs'
declare module 'lodash'
declare module 'react-fileupload'
declare module 'mockjs'