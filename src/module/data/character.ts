import BaseActor from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/actor.mjs';

type CharacterSchema = ReturnType<typeof CharacterDataModel.defineSchema>;

/**
 * Defines the data model for Character actors in the Avant system
 * @extends {foundry.abstract.TypeDataModel}
 */
export class CharacterDataModel extends foundry.abstract.TypeDataModel<CharacterSchema, BaseActor> {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            type: new fields.StringField({required: true, initial: "character"}),
            characterName: new fields.StringField({required: true, initial: ""}),
            level: new fields.NumberField({required: true, initial: 1, integer: true, min: 1}),
            attributes: new fields.SchemaField({
                focus: new fields.NumberField({required: true, initial: 0}),
                grace: new fields.NumberField({required: true, initial: 0}),
                intellect: new fields.NumberField({required: true, initial: 0}),
                might: new fields.NumberField({required: true, initial: 0})
            }),
            skills: new fields.SchemaField({
                combat: new fields.NumberField({required: true, initial: 0}),
                social: new fields.NumberField({required: true, initial: 0}),
                investigative: new fields.NumberField({required: true, initial: 0}),
                magical: new fields.NumberField({required: true, initial: 0})
            }),
            health: new fields.SchemaField({
                current: new fields.NumberField({required: true, initial: 10}),
                max: new fields.NumberField({required: true, initial: 10})
            }),
            actionPoints: new fields.NumberField({required: true, initial: 3})
        };
    }
}
