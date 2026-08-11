# Workspace Customizations

## UI Component Rules
- **Matrix and Vector Visualization**: Whenever you need to display, render, or visualize a matrix or 3D vectors in `.mdx` documentation for this project, you MUST use the custom `MatrixVectorVisualizer` React component located at `@site/src/components/MatrixVectorVisualizer`.
  - It supports `initialMatrix`, `tokens`, and `colors` props.
  - It supports `showMatrix` (boolean) and `showVector` (boolean) to conditionally render the matrix table or the 3D space.
  - NEVER use standard markdown tables or inline math blocks if the intent is to visualize the matrix structure or 3D vectors. Use this component instead.
