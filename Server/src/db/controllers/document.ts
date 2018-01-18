
export const AllDocument = async() => {
    const data = [{
      _id: 'document001',
      name: '前端编码规范',
      type: 'spec', // spec project other
      ownerId: 'user001',
      ownerName: '001',
      assign: [{
        projectId: 'project001',
        projectName: '项目1'
      }, {
        projectId: 'project002',
        projectName: '项目3'
      }
    ],
      content: '<p>2333<h1>666</h1></p>',
      desc: '2018年全新前端编码规范'
    },
    {
      _id: 'document002',
      name: '后端编码规范',
      type: 'spec', // spec project other
      ownerId: 'user002',
      ownerName: '噢噢001',
      assign: [{
        projectId: 'project001',
        projectName: '项目1'
      }, {
        projectId: 'project002',
        projectName: '项目3'
      }
    ],
      content: '<p>后端规范<h2>666</h2></p>',
      desc: '2018年后端编码规范'
    }
  ]
    return await data


}