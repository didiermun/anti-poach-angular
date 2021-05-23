export class Patrouille{
    date: Date | undefined;
    id!: string;
    type: string | undefined;
    sector: number | undefined;
    family: string | undefined;
    path: string | undefined;
    composition: string | undefined;
    nTeamMembers: number | undefined;
    names: [string] | undefined;
    teamLeader: string | undefined;
    gpsNO: number | undefined;
    feuilleNO: number | undefined;
}