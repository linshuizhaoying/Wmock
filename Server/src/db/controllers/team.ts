import { FindUserById } from "./user";
import { FindProjectListByUserId } from "./project";
const Team = require("../models/team");
export const FindTeamByProjectId = async (id: string) => {
  const result = await Team.findOne({ projectId: id })
    .populate("member")
    .populate({ path: "masterAvatar", select: "-_id avatar" })
    .populate({ path: "masterName", select: "-_id userName" })
    .populate({ path: "projectName", select: "-_id projectName" });
  result.masterAvatar = result.masterAvatar.avatar;
  result.masterName = result.masterName.userName;
  result.projectName = result.projectName.projectName;
  return result;
};

export const TeamList = async (userId: string) => {
  // return await Team.find({ masterId: id }).populate('member')
  const projectMap = await FindProjectListByUserId(userId);
  const teamList = [];
  for (const projectId in projectMap) {
    const temp = await FindTeamByProjectId(projectId);
    teamList.push(temp);
  }
  return teamList;
};

export const AddTeam = async (team: TeamData) => {
  const newTeam = new Team(team);
  let result = "";
  await newTeam
    .save(async (error: Error) => {
      if (error) {
        result = error.toString();
      }
    })
    .then(async (team: TeamData) => {
      result = team._id;
    });
  return result;
};

export const UpdateTeamMember = async (team: TeamData) => {
  return await Team.update(
    {
      _id: team._id
    },
    {
      $set: {
        member: team.member
      }
    }
  );
};

export const UpdateTeamName = async (projectId: string, teamName: string) => {
  return await Team.update(
    {
      projectId: projectId
    },
    {
      $set: {
        projectName: teamName
      }
    }
  );
};

export const AddUserToTeam = async (projectId: string, userId: string) => {
  const originTeam: TeamData = await Team.findOne({ projectId: projectId });
  const user: UserData = await FindUserById(userId);
  originTeam.member.push(user);
  console.log(originTeam);
  return await UpdateTeamMember(originTeam);
};

export const RemoveGroupMember = async (projectId: string, userId: string) => {
  const originTeam: TeamData = await FindTeamByProjectId(projectId);
  for (let i = 0; i < originTeam.member.length; i++) {
    if (originTeam.member[i]._id == userId) {
      originTeam.member.splice(i, 1);
    }
  }
  return await UpdateTeamMember(originTeam);
};
export const RemoveTeamByProjectId = async (projectId: string) => {
  return Team.remove({
    _id: projectId
  });
};
