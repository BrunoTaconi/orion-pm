import {
    projectsMock,
    teamsMock,
    teamMembersMock,
} from "./mock";

export const getTeamsByUser = (userId: string) => {
    const memberships = teamMembersMock.filter(
        (teamMember) => teamMember.userId === userId
    );

    return teamsMock.filter((team) => 
    memberships.some((m) => m.teamId === team.id)
    );
};

export const getProjectsByUser = (userId: string) => {
    return projectsMock.filter(
        (project) => project.ownerId === userId
    );
};

export const getTeamMembersCount = (teamId: string) => {
    return teamMembersMock.filter(
        (teamMember) => teamMember.teamId === teamId
    ).length;
};