
export const AllProject = async(username: string) => {
  if (username === 'demo') {
    const data = [ 'demo' ]
    return await data
  } else {
    const data = [ username, '2333' ]
    return await data
  }

}