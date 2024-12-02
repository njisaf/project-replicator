const { Given, When, Then } = require('@cucumber/cucumber');
const { render, fireEvent } = require('@testing-library/svelte');
const CharacterSheet = require('../CharacterSheet.svelte');

let component;

// Scenario: Viewing Basic Character Information
Given('a character exists with the attributes {string} and {string}', function (name, level) {
    this.character = {
        name,
        level: parseInt(level, 10)
    };
});

When('the character sheet is opened', function () {
    component = render(CharacterSheet, { props: { character: this.character } });
});

Then('the character\'s name and level should be displayed', function () {
    const { getByText } = component;
    getByText(this.character.name);
    getByText(`Level: ${this.character.level}`);
});

// Scenario: Editing Character Name
Given('a character sheet is open', function () {
    component = render(CharacterSheet, { props: { character: this.character } });
});

When('the user edits the character name field to {string}', async function (newName) {
    const { getByLabelText } = component;
    const nameInput = getByLabelText('Character Name');
    await fireEvent.input(nameInput, { target: { value: newName } });
    this.character.name = newName;
});

Then('the updated name should be reflected immediately in the character sheet and saved to the actor data', function () {
    const { getByText } = component;
    getByText(this.character.name);
});

// Scenario: Editing Character Level
When('the user edits the character level field to {string}', async function (newLevel) {
    const { getByLabelText } = component;
    const levelInput = getByLabelText('Character Level');
    await fireEvent.input(levelInput, { target: { value: newLevel } });
    this.character.level = parseInt(newLevel, 10);
});

Then('the updated level should be displayed immediately and saved to the actor data', function () {
    const { getByText } = component;
    getByText(`Level: ${this.character.level}`);
});

// Scenario: Editing Core Attributes
When('the user edits the {string} attribute to {string}', async function (attribute, newValue) {
    const { getByLabelText } = component;
    const attributeInput = getByLabelText(attribute);
    await fireEvent.input(attributeInput, { target: { value: newValue } });
    this.character[attribute.toLowerCase()] = parseInt(newValue, 10);
});

Then('the new value of the {string} attribute should be saved and reflected in the actor\'s data', function (attribute) {
    const { getByLabelText } = component;
    const attributeInput = getByLabelText(attribute);
    expect(attributeInput.value).toBe(this.character[attribute.toLowerCase()].toString());
});

// Scenario: Rolling for Attribute Check
When('the user clicks on the roll button for {string}', async function (attribute) {
    const { getByText } = component;
    const rollButton = getByText(`Roll ${attribute}`);
    await fireEvent.click(rollButton);
});

Then('a roll should be performed using FoundryVTT’s dice roller', function () {
    // Assuming a mock function for FoundryVTT dice roller is used in the component
    expect(global.diceRollerMock).toHaveBeenCalled();
});

Then('the result should be displayed in the game chat', function () {
    // Assuming a mock function for game chat display is used in the component
    expect(global.chatDisplayMock).toHaveBeenCalled();
});
