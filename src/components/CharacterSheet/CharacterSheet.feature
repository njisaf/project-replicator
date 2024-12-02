Feature: Minimal Character Sheet for FoundryVTT

  The character sheet allows players and GMs to view and edit core character information, serving as an interactive interface for managing game-related attributes and stats. This feature supports editing character attributes, managing skills, and interacting with core game mechanics such as health and action points.

  Scenario: Viewing Basic Character Information
    Given a character exists with the attributes "John Doe" and "5"
    When the character sheet is opened
    Then the character's name and level should be displayed

  Scenario: Editing Character Name
    Given a character sheet is open
    When the user edits the character name field to "Jane Doe"
    Then the updated name should be reflected immediately in the character sheet and saved to the actor data

  Scenario: Editing Character Level
    Given a character sheet is open
    When the user edits the character level field to "10"
    Then the updated level should be displayed immediately and saved to the actor data

  Scenario: Editing Core Attributes
    Given a character sheet is open
    When the user edits the "Focus" attribute to "8"
    Then the new value of the "Focus" attribute should be saved and reflected in the actor's data

  Scenario: Displaying Skills and Aptitude Points
    Given a character has skill categories (Combat, Social, Investigative, Magical)
    When the character sheet is opened
    Then each skill category should be displayed with editable aptitude points for tracking improvements

  Scenario: Editing Health Points
    Given a character sheet is open
    When the user edits the health points (current or maximum) to "25"
    Then the new health value should be saved and updated in the actor data

  Scenario: Editing Action Points
    Given a character sheet is open
    When the user edits the action points (AP) to "2"
    Then the updated action points value should be saved and reflected in the actor's data

  Scenario: Rolling for Attribute Check
    Given a character sheet is open
    When the user clicks on the roll button for "Focus"
    Then a roll should be performed using FoundryVTT’s dice roller
    And the result should be displayed in the game chat
