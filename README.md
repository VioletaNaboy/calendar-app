# Calendar Task Manager

A calendar-based task management application built with React, Redux Toolkit, and custom hooks. This app focuses on a clean and intuitive user experience with powerful functionalities.

[Live page](https://violetanaboy.github.io/calendar-app/)

![Calendar](/src/assets/calendar-screenshot.png)

## Features

### Calendar Functionality
- **Custom Calendar Hook (`useCalendar`)**: The calendar is implemented without any external libraries, providing full control and customization of its behavior.
- **Worldwide Holidays Display**: Each calendar cell (day) shows worldwide holidays at the top. Holiday names are fixed and do not drag and drop.

### Task Management
- **CRUD Operations**: Tasks can be created, read, updated, and deleted efficiently using Redux Toolkit for state management.
- **Inline Task Editing**: Edit task descriptions and tags directly by clicking on a task. Changes are automatically saved when the cursor moves away from the task.
- **Drag and Drop (`useDragAndDrop`)**:
  - Reassign tasks between days (calendar cells) by dragging and dropping.
  - Reorder tasks within a single cell using drag and drop.
- **Colored Tags and Filtering**:
  - Assign colored tags to tasks for better organization.
  - Filter tasks in the calendar using a search bar.

## Checklist of Functionalities
- [x] Create and edit tasks inside calendar cells (days) in an inline manner.
- [x] Reassign tasks between days (calendar cells) using drag and drop.
- [x] Reorder tasks in one cell using drag and drop.
- [x] Filter tasks in the calendar by searching text.
- [x] Show worldwide holidays (upcoming 7 days) and your local holidays (entire year) for each day in the calendar.
- [x] Holiday names are fixed.

## Technologies Used
- **React**: For building the user interface.
- **Redux Toolkit**: For state management and CRUD operations.
- **TypeScript**: For type safety and better code maintainability.
- **Custom Hooks**: 
  - `useCalendar` for rendering the calendar.
  - `useDragAndDrop` for handling task drag-and-drop functionality.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calendar-task-manager.git
