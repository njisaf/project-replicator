import { type ActorData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/_types.mjs';

// Extending the base ActorData to accommodate Character Sheet specifics
export interface AttributesData {
    focus: number;
    grace: number;
    intellect: number;
    might: number;
}

export interface SkillsData {
    combat: number;
    social: number;
    investigative: number;
    magical: number;
}

export interface HealthData {
    current: number;
    max: number;
}

// Updating CharacterSheetProps to use the new interfaces
export interface CharacterSheetProps extends ActorData {
    characterName: string;
    level: number;
    attributes: AttributesData;
    skills: SkillsData;
    health: HealthData;
    actionPoints: number;
}
