# Project Replicator

## Overview

**Project Replicator** is a development framework designed to simplify the creation of modular, dynamic systems for FoundryVTT. It leverages modern tooling such as Webpack, Svelte, and TypeScript to enable the creation of highly customizable and reusable components. The project's primary goal is to provide an efficient, automated workflow for generating system-specific files, enabling rapid prototyping and deployment of custom TTRPG systems.

## Features

- **Component-Based Architecture:** Uses Svelte for creating dynamic, reusable UI components.
- **Automated File Generation:**
  - Dynamically generates `system.json`, `main.js`, and `template.json`.
  - Automates the creation of HTML templates, CSS stylesheets, and JavaScript modules.
- **Support for FoundryVTT Requirements:**
  - Ensures compliance with FoundryVTT's system file structure.
  - Registers custom sheets and actors dynamically.
- **TypeScript Integration:** Provides strong typing for both Svelte components and FoundryVTT-specific objects.
- **Dynamic Asset Management:** Automatically resolves and includes all generated assets (scripts, styles, templates) into the system configuration.
- **Webpack Build Pipeline:** Streamlined build process with support for live reloading and modular output.

## File Structure

```
project-replicator/
├── dist/                     # Generated output files
│   ├── scripts/              # JavaScript files for components and main system logic
│   ├── styles/               # Extracted CSS stylesheets
│   ├── templates/            # HTML templates for FoundryVTT sheets
│   ├── assets.json           # Asset manifest generated by Webpack
│   └── system.json           # FoundryVTT system configuration file
├── src/                      # Source files for components and configuration
│   ├── components/           # Svelte components (UI elements)
│   │   ├── CharacterSheet/   # Example component for a character sheet
│   │   │   ├── CharacterSheet.svelte
│   │   │   └── CharacterSheet.types.ts
│   │   ├── Button/           # Example reusable button component
│   │   │   ├── Button.svelte
│   │   │   └── Button.types.ts
├── templates/                # Scripts for generating system-specific files
│   ├── generate-main-js.js   # Generates the main.js entry file
│   ├── generate-system-json.js # Generates system.json configuration
│   └── generate-template-json.js # Generates template.json for actor sheet templates
├── webpack.config.js         # Webpack configuration file
├── package.json              # Node.js package configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

To use Project Replicator, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [FoundryVTT](https://foundryvtt.com/) (v12+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/project-replicator.git
   cd project-replicator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Workflow

1. **Start Development Server:**
   ```bash
   npm run dev
   ```
   This command runs Webpack in development mode with live reloading.

2. **Build for Production:**
   ```bash
   npm run build
   ```
   This generates optimized files in the `dist/` directory.

3. **Deploy to FoundryVTT:**
   - Create a symbolic link between `dist/` and your FoundryVTT `Data/systems/` directory:
     ```bash
     ln -s /path/to/project-replicator/dist /path/to/FoundryVTT/Data/systems/avant
     ```

### File Generation

- `generate-main-js.js`: Registers custom sheets and components dynamically.
- `generate-system-json.js`: Creates the `system.json` configuration file.
- `generate-template-json.js`: Maps components to their corresponding templates.

## Contributing

Contributions are welcome! If you encounter issues or have feature suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:
- **Developer:** Nassir Isaf

