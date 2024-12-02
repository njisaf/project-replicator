<script lang="ts">
    import type { CharacterSheetProps } from "./CharacterSheet.types.js";
    import { onMount } from "svelte";

    export let actorData: CharacterSheetProps;

    // Edit handler for attributes
    function handleEdit(attributePath: string, value: any) {
        if (value !== null && value !== undefined) {
            const editEvent = new CustomEvent("edit", {
                detail: { [attributePath]: value },
            });
            dispatchEvent(editEvent);
        }
    }

    function safeGetValue(event: Event): string | number {
        const target = event.target as HTMLInputElement | null;
        if (target) {
            return target.type === "number" ? +target.value : target.value;
        }
        return "";
    }

    onMount(() => {
        console.log("Character Sheet Mounted:", actorData);
    });
</script>

<div class="character-sheet">
    <h2>Character Sheet</h2>
    <div class="field">
        <label for="characterName"> Character Name: </label>
        <input
            id="characterName"
            type="text"
            bind:value={actorData.characterName}
            on:input={(e) => handleEdit("characterName", safeGetValue(e))}
        />
    </div>

    <div class="field">
        <label for="level"> Level: </label>
        <input
            id="level"
            type="number"
            bind:value={actorData.level}
            on:input={(e) => handleEdit("level", safeGetValue(e))}
        />
    </div>

    <div class="attributes">
        <h3>Attributes</h3>
        {#each Object.entries(actorData.attributes) as [attribute, value]}
            <div class="field">
                <label for={attribute}>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
                </label>
                <input
                    id={attribute}
                    type="number"
                    bind:value={actorData.attributes[
                        attribute as keyof typeof actorData.attributes
                    ]}
                    on:input={(e) =>
                        handleEdit(`attributes.${attribute}`, safeGetValue(e))}
                />
            </div>
        {/each}
    </div>

    <div class="skills">
        <h3>Skills</h3>
        {#each Object.entries(actorData.skills) as [skill, value]}
            <div class="field">
                <label for={skill}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}:
                </label>
                <input
                    id={skill}
                    type="number"
                    bind:value={actorData.skills[
                        skill as keyof typeof actorData.skills
                    ]}
                    on:input={(e) =>
                        handleEdit(`skills.${skill}`, safeGetValue(e))}
                />
            </div>
        {/each}
    </div>

    <div class="health">
        <h3>Health</h3>
        <div class="field">
            <label for="healthCurrent"> Current Health: </label>
            <input
                id="healthCurrent"
                type="number"
                bind:value={actorData.health.current}
                on:input={(e) => handleEdit("health.current", safeGetValue(e))}
            />
        </div>
        <div class="field">
            <label for="healthMax"> Max Health: </label>
            <input
                id="healthMax"
                type="number"
                bind:value={actorData.health.max}
                on:input={(e) => handleEdit("health.max", safeGetValue(e))}
            />
        </div>
    </div>

    <div class="action-points">
        <h3>Action Points</h3>
        <div class="field">
            <label for="actionPoints"> Action Points: </label>
            <input
                id="actionPoints"
                type="number"
                bind:value={actorData.actionPoints}
                on:input={(e) => handleEdit("actionPoints", safeGetValue(e))}
            />
        </div>
    </div>
</div>

<style>
    .character-sheet {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .field {
        margin-bottom: 10px;
    }
    label {
        display: block;
        font-weight: bold;
    }
    input {
        width: 100%;
        padding: 5px;
        margin-top: 5px;
    }
</style>
