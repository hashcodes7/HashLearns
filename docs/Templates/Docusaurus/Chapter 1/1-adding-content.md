---
sidebar_position: 1
---

# How to Add Content: A Step-by-Step Walkthrough

Adding new content to your platform is now incredibly simple. Because of the dynamic architecture we built, you no longer need to touch any complex Docusaurus configuration files (like `sidebars.ts`) to wire things up.

Here is your exact workflow for adding new content.

---

## Step 1: Create the Folder Structure in `docs/`

Everything is driven by your folder structure. 

### To add a new Course to an existing Field:
Let's say you want to add a course called **"React Basics"** to the **"Web Development"** field.
1. Navigate into `docs/Web Development/` (create this folder if the field doesn't exist yet).
2. Create a new folder for your course: `docs/Web Development/React Basics/`.

### To add Chapters and Subchapters:
Inside your course folder (`React Basics`), you group your markdown files into chapter folders.

```text
docs/
 └── Web Development/                 <- The Field
      └── React Basics/               <- The Course
           ├── Chapter 1: Setup/      <- A Chapter Folder
           │    ├── 1-installation.md <- A Subchapter
           │    └── 2-first-app.md    <- A Subchapter
           └── Chapter 2: Components/ <- A Chapter Folder
                └── 1-props.md        <- A Subchapter
```

> [!TIP]
> **Ordering Chapters & Subchapters**
> To ensure your chapters appear in the correct order in the sidebar, add this frontmatter to the top of every `.md` file and `_category_.json` file:
> ```yaml
> ---
> sidebar_position: 1
> ---
> ```

---

## Step 2: Understand Your Automated URL

Our system automatically converts your folder names into clean URLs (slugs). It does this by converting everything to lowercase and replacing spaces with hyphens.

For example, your **"React Basics"** course inside **"Web Development"** will automatically generate this URL:
`/docs/web-development/react-basics`

*You will need this exact URL for Step 3!*

---

## Step 3: Add the Course to the Homepage Tiles

Finally, you need to expose your new course to the users on the homepage tiles.

1. Open `src/components/HomepageFeatures/index.tsx`.
2. Locate the `FeatureList` array. Find the dictionary for your field (e.g., `Web Development`).
3. Add your new course to its `courses` array, using the URL you figured out in Step 2:

```tsx
  {
    title: 'Web Development',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn the latest frameworks and practices for building modern web applications.
      </>
    ),
    courses: [
      // Add your new course here!
      { title: 'React Basics', link: '/docs/web-development/react-basics' },
    ],
  },
```

### That's it! 🎉
Save your files. Docusaurus will automatically:
1. Add the course to the main sidebar tree.
2. Generate an isolated, clean sidebar specifically for "React Basics" when a user clicks on it.
3. Make the course clickable directly from the homepage tile.

