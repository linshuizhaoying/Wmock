// var spawn = require('child_process').spawn
var http = require('http')
var spawn = require('child_process').execFile
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/pushCode', secret: 'qianyuhui' })
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(7788)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

// 监听 push 事件
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
    init()
}
)
function rumCommand( cmd, args, cwd, callback ) {
  var child = spawn( cmd, args, {cwd: cwd} )
  var response = ''
  child.stdout.on('data', function( buffer ){ response += buffer.toString(); })
  child.stdout.on('end', function(){ callback( response ) })
}

function init() {
  rumCommand('sh', ['../clean.sh'], './' ,function( result ) { // 清理缓存
    console.log(result)
  })

  rumCommand('sh', ['../Server/autoServer.sh'], '../Server' ,function( result ) { // cLient端更新
    console.log(result)
  })
  
  rumCommand('sh', ['../Client/autoClient.sh'], '../Client' ,function( result ) { // server端更新
    console.log(result)
  })

}
init()
