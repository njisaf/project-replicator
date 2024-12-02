**Character Sheet Specification for FoundryVTT**

### Requirements

#### 1. Overview
The character sheet is an interface that allows players and GMs to view and edit core character information. This version aims to be minimal, serving as a foundational example for integration into FoundryVTT. The sheet will include core attributes and basic skills from the defined game system, with focus on core gameplay mechanics.

#### 2. Functional Requirements

##### 2.1 Basic Information Display
- The character sheet must display basic character information, including:
  - **Character Name**: An editable text field that allows users to input and change the character name.
  - **Character Level**: Display the character's level, which should be editable.

##### 2.2 Core Attributes
- The character sheet must display the four core attributes that influence gameplay:
  - **Focus**: Represents mental acuity and perception. Editable by the user.
  - **Grace**: Represents physical agility and finesse. Editable by the user.
  - **Intellect**: Represents knowledge and reasoning. Editable by the user.
  - **Might**: Represents physical power and resilience. Editable by the user.

##### 2.3 Skills and Aptitude Points
- The character sheet must include a display of skills and their respective categories:
  - **Combat Skills**: Represent physical conflict abilities.
  - **Social Skills**: Represent interaction and influence abilities.
  - **Investigative Skills**: Represent information gathering abilities.
  - **Magical Skills**: Represent supernatural abilities.
- Skills should include an editable field for **Aptitude Points**, allowing users to track improvements.

##### 2.4 Health and Action Points
- The character sheet must include:
  - **Health Points (HP)**: Show current and maximum HP values, both of which are editable.
  - **Action Points (AP)**: Display the number of action points available per round (default 3 AP). Editable by the user.

##### 2.5 Interactivity
- The character sheet must include basic interactive elements:
  - **Editable Fields**: Core attributes, skills, health points, and action points must be editable.
  - **Roll Button**: Include a button to perform a roll for a specific stat (e.g., Focus or Might). The result of the roll should be sent to the game chat in FoundryVTT.

##### 2.6 Data Binding
- The character sheet must bind the displayed values to FoundryVTT’s character (actor) data model:
  - Changes in the sheet should reflect immediately in the FoundryVTT actor data.
  - The character sheet must read from and write to the actor’s data to ensure consistency.

### BDD Scenarios

**Feature: Minimal Character Sheet for FoundryVTT**

The character sheet allows players and GMs to view and edit core character information, serving as an interactive interface for managing game-related attributes and stats. This feature supports editing character attributes, managing skills, and interacting with core game mechanics such as health and action points.

#### Scenario: Viewing Basic Character Information
**Given** a character exists with the attributes "name" and "level"
- **When** the character sheet is opened
- **Then** the character's name and level should be displayed

#### Scenario: Editing Character Name
**Given** a character sheet is open
- **When** the user edits the character name field
- **Then** the updated name should be reflected immediately in the character sheet and saved to the actor data

#### Scenario: Editing Character Level
**Given** a character sheet is open
- **When** the user edits the character level field
- **Then** the updated level should be displayed immediately and saved to the actor data

#### Scenario: Editing Core Attributes
**Given** a character sheet is open
- **When** the user edits any of the four core attributes (Focus, Grace, Intellect, Might)
- **Then** the new value of the attribute should be saved and reflected in the actor's data

#### Scenario: Displaying Skills and Aptitude Points
**Given** a character has skill categories (Combat, Social, Investigative, Magical)
- **When** the character sheet is opened
- **Then** each skill category should be displayed with editable aptitude points for tracking improvements

#### Scenario: Editing Health Points
**Given** a character sheet is open
- **When** the user edits the health points (current or maximum)
- **Then** the new health value should be saved and updated in the actor data

#### Scenario: Editing Action Points
**Given** a character sheet is open
- **When** the user edits the action points (AP)
- **Then** the updated action points value should be saved and reflected in the actor's data

#### Scenario: Rolling for Attribute Check
**Given** a character sheet is open
- **When** the user clicks on the roll button for an attribute (e.g., Focus or Might)
- **Then** a roll should be performed using FoundryVTT’s dice roller
- **And** the result should be displayed in the game chat

#### Scenario: Saving Changes to Actor Data
**Given** a character sheet is open
- **When** the user makes changes to any editable field (name, level, attributes, skills, health, AP)
- **Then** those changes should be automatically saved and reflected in the FoundryVTT actor data model

### Future Scenarios (For Future Considerations)
- **Scenario: Adding New Attributes**: Users should be able to add custom attributes such as inventory or spells.
- **Scenario: Enhanced Interactivity**: Conditional fields and rollable abilities should become available based on gameplay phases.
- **Scenario: Tabbed Sections for Gameplay Phases**: Users should be able to switch between different sections of the sheet for combat, narrative, and other game phases.

