# Considerations and assumptions

-   All filters, search, pagination and selected service are stored in the URL. This allows for easy sharing of the current state of the application.
-   I've used a modal to show service details instead of a separate page because there wasn't much data to show for the service details. This also allows for a better user experience as the user doesn't have to navigate back and forth between pages when viewing multiple services.
-   This modal can be closed by either pressing the escape key or clicking outside the modal. This is a common pattern for modals and is expected by the user.
-   The modal opens from the bottom on smaller screens, making it easier to scroll through on mobile.
-   Every developer avatar has the developer's name and email in it's title attribute. This is useful for the user to know who the developer is and to contact them if needed. In case of overflowed avatars (more than 3), the details of all overflow developers are added in the title attribute on the extra avatar count element.

2 libraries were also added to the project:

-   `date-fns` for getting the relative time of the last updated date. I could've written a custom function to do this by extracting the diff of days, months and years from last updated date and current date, but `date-fns` is a well tested and widely used library which accomodates for edge cases like leap years, better approximation, etc. It's also tree-shakable so it doesn't add much to the bundle size since I'm only using one util method from it.
-   `vue-router-mock` to mock vue router in the tests. This is a simple library that allows for easy mocking of the router in the tests. This is used to mock the router in the tests for the `ServiceCatalog` component.

## Composables

-   `usePagination` is a separate composable so that it can be easliy dropped in any component that needs pagination. This allows for reusability and separation of concerns.
-   `useQueryParams` is a composable that allows for easy updation of the URL query parameters. This allows for easy sharing of the current state of the application.
-   `useServices` is a composable that fetches the services from the API and allows search via the `q` query parameter. This composable then passes the services to the `usePagination` composable to paginate the services, which is finally consumed to show the list of services.

## Components

All components are built without any business logic and are only responsible for rendering the UI. All data is passed via props. This makes understanding flow of data easier.

The main component is `ServiceCatalog` which is responsible for showing the list of services. All data fetching happens inside it and all state is also stored in it. This makes it the single source of truth for all data on the page.

Tests for all common components are under the `components/common/tests` directory and tests for the `service` components are under the `components/service/tests` directory. I've used snapshot testing and unit testing.

Common components:

-   `KModal` is a base component for creating modals.
-   `KAvatar` is a base component for using avatars.
-   `KAvatarGroup` uses `KAvatar` to show a group of avatars and also handles the overflow of avatars.
-   `KPagination` is a drop in component to show pagination.
-   `AppHeader` is for the navbar at the top of the page.

`Service` components:

-   `ServiceDetailsModal` is the modal component that shows the details and versions of the selected service. Can be closed via escape key or clicking outside the modal.
-   `ServiceVersionCard` are the card components used inside `ServiceDetailsModal` to show the versions of a service.
-   `ServiceCard` is the card component used on the service catalog page to show the details of a service.
-   `ServiceMetrics` are used inside `ServiceCard` to show the metrics of a service.

## Previews

### Demo


https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/df9952a6-02b6-4e62-be0c-7b74b699e6d6



### List of services

<img width="1436" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/086fd370-c812-4dc6-a694-6bc5740f5f55">

### Search empty state

<img width="1436" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/714f5da2-f965-4651-aa01-b3ae6b86c755">

### Error state

<img width="1438" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/47fd4e41-aba4-47c0-92e5-dd2b071b9dba">

### Service details with versions

<img width="1436" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/73d22092-2f5f-43f3-8f79-53035ad9ef49">

### Mobile views

<img width="323" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/f97c645d-7a55-4f69-8bb9-4172eb77ea93">

<img width="325" alt="image" src="https://github.com/vaibhavrajsingh2001/konnect-team-interview-frontend-exercise/assets/47082523/020a4f94-b331-403d-b82a-9c75996ad5d2">



# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

-   The provided exercise files are a starting point and they have room for improvement; feel free to modify
-   Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
-   In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

-   Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

-   [Vue 3](https://vuejs.org/) and TypeScript
-   User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
-   User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
-   User should be able to click on a service to view more details
-   User should be able to paginate through services (client-side implementation)
-   The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
-   Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

-   The UI should be responsive and look great at different browser viewport sizes
-   Pixel-perfect implementation
-   Routing and views (e.g. navigating to a given service from its card)
-   State management with [Pinia](https://pinia.vuejs.org/)
-   [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
-   Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

-   How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
-   Code quality, including appropriate componentization and modularity
-   TypeScript usage
-   Coding (and Vue) best-practices
-   The project should pass type checking and build successfully
-   How you dedicate the allotted time to focus on your strengths
-   Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
    id: string;
    name: string;
    description: string;
    type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
