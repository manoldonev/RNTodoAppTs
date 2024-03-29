![license](https://img.shields.io/github/license/manoldonev/RNTodoAppTs?style=plastic) ![ci workflow](https://github.com/manoldonev/RNTodoAppTs/workflows/ci/badge.svg) ![npm](https://img.shields.io/badge/maintained%20with-npm-cb0000.svg?logo=npm)

# React Todo App

- TypeScript
- ESLint
- Prettier
- pre-commit hooks
- CI GitHub workflow
- Dependency management via [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)

## UX & Theming

- Material Design System powered by Tailwind and React Native Paper (with custom "branding" color palettes)
- Dark Mode Support

## Data (Async State Management)

- GraphQL
- `@tanstack/react-query` with [automatic hooks generation](https://www.graphql-code-generator.com/) based on the GraphQL schema

## Navigation

- React Navigation v6

## Testing

- Unit & Integration testing: Jest with React Native Testing Library setup
- Static Analysis: TypeScript & ESLint
- [MSW](https://mswjs.io/) (Mock Service Worker) API mocking (intercepting requests on the network level)
