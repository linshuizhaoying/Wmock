
const Team = require('../models/team')


export const FindTeamByProjectId = async (id: string) => {
  const result = await Team.findOne({ projectId: id })
  return result
}


export const TeamList = async (id: string) => {
  return await Team.find({ masterId: id })
}

export const AddTeam = async (team: TeamData) => {
  const newTeam = new Team(team)
  let result = ''
  await newTeam.save(async (error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then(async (team: TeamData) => {
    result = team._id
  })
  return result
}