# Admin Panel Documentation

## Overview

A simple admin panel has been created for managing tests with access restricted to phone number `09198718211`. The panel provides comprehensive test management functionality including creating, editing, deleting tests and managing their questions.

## Access Control

### Authentication
- **Admin Phone**: `09198718211`
- **Access Method**: Phone number verification through user profile
- **Fallback**: Admin/superadmin role check for future use

### Access Validation
The admin panel checks access through:
1. User phone number matching `09198718211`
2. User role being `admin` or `superadmin` (for future use)

## Admin Panel Structure

### Routes
- `/admin/tests-management` - Main test management page
- `/admin/tests` - Existing tests list (legacy)

### Menu Structure
The admin menu now includes a submenu for tests:
- **آزمون‌ها** (Tests)
  - لیست آزمون‌ها (Tests List) - `/admin/tests`
  - مدیریت آزمون‌ها (Tests Management) - `/admin/tests-management`

## Features

### 1. Test Management (`AdminTests.jsx`)

#### Dashboard Statistics
- Total tests count
- Active tests count
- Pending tests count

#### Test Operations
- **View Tests**: Complete table view with test details
- **Add Test**: Create new tests with comprehensive form
- **Edit Test**: Modify existing test details
- **Delete Test**: Remove tests with confirmation
- **Manage Questions**: Access question management for each test

#### Test Table Columns
- Test title and description
- Category
- Status (Active/Inactive)
- Creation date
- Action buttons (Questions, Edit, Delete)

### 2. Test Form (`TestFormModal.jsx`)

#### Basic Information
- **Title**: Test title (required)
- **Description**: Test description (required)
- **Category**: Learning disability, attention disorder, behavioral, cognitive, developmental
- **Target Audience**: Children, parents, family, teachers, professionals

#### Test Settings
- **Duration**: Test duration in minutes
- **Difficulty**: Easy, medium, hard
- **Passing Score**: Percentage required to pass (0-100)
- **Max Attempts**: Maximum number of attempts allowed
- **Status**: Active, inactive, draft

#### Additional Options
- **Tags**: Comma-separated tags
- **Instructions**: Test instructions
- **Image URL**: Test cover image
- **Public Test**: Whether test is public
- **Requires Login**: Whether login is required

### 3. Questions Management (`QuestionsManagementModal.jsx`)

#### Question Operations
- **View Questions**: List all questions for a test
- **Add Question**: Create new questions
- **Edit Question**: Modify existing questions
- **Delete Question**: Remove questions with confirmation

#### Question Display
- Question number and type
- Question text
- Options (for multiple choice)
- Correct answer indication
- Points and difficulty
- Explanation (if available)

### 4. Question Form (`QuestionFormModal.jsx`)

#### Question Types
- **Multiple Choice**: 2-6 options with correct answer selection
- **True/False**: Simple true/false questions
- **Short Answer**: Text-based answers
- **Essay**: Long-form answers

#### Question Settings
- **Question Text**: The actual question (required)
- **Type**: Question type selection
- **Options**: For multiple choice questions (2-6 options)
- **Correct Answer**: Selection of correct option
- **Points**: Question weight/points
- **Difficulty**: Easy, medium, hard
- **Category**: Question categorization
- **Explanation**: Answer explanation

#### Multiple Choice Features
- Dynamic option management (add/remove)
- Correct answer radio button selection
- Option validation (minimum 2 options)
- Visual indication of correct answer

## API Integration

### Test Management APIs
- `POST /api/v1/tests` - Create new test
- `GET /api/v1/tests` - Get all tests
- `GET /api/v1/tests/{id}` - Get test details
- `DELETE /api/v1/tests/{id}` - Delete test
- `POST /api/v1/tests/{id}/questions` - Add question to test
- `GET /api/v1/tests/{id}/questions` - Get test questions

### Authentication
All admin operations require authentication token from the logged-in user.

## Usage Examples

### Accessing Admin Panel
1. Login with phone number `09198718211`
2. Navigate to `/admin/tests-management`
3. Admin panel will load with full functionality

### Creating a New Test
1. Click "افزودن آزمون جدید" (Add New Test)
2. Fill in required fields (title, description, category, target audience)
3. Configure test settings (duration, passing score, etc.)
4. Set additional options (tags, instructions, image)
5. Click "افزودن" (Add) to save

### Managing Questions
1. Click the question icon next to any test
2. View existing questions
3. Add new questions using "افزودن سوال جدید" (Add New Question)
4. Configure question type, options, and settings
5. Save question

### Editing Tests
1. Click the edit icon next to any test
2. Modify test details in the form
3. Click "ویرایش" (Edit) to save changes

### Deleting Tests
1. Click the delete icon next to any test
2. Confirm deletion in the modal
3. Test will be permanently removed

## Error Handling

### Form Validation
- Required field validation
- Data type validation (numbers, URLs)
- Range validation (scores, attempts)
- Option validation for multiple choice questions

### API Error Handling
- Network error handling
- Authentication error handling
- Server error handling with Persian messages
- User-friendly error messages

### Access Control
- Unauthorized access prevention
- Clear error messages for non-admin users
- Graceful fallback for missing permissions

## Security Features

### Access Restriction
- Phone number verification
- Role-based access control
- Token-based authentication
- Admin-only operations

### Data Validation
- Client-side form validation
- Server-side API validation
- Input sanitization
- XSS prevention

## Future Enhancements

### Planned Features
- Bulk operations (bulk delete, bulk edit)
- Test templates
- Question banks
- Advanced analytics
- Export/import functionality
- Test scheduling
- User management for admin panel

### API Extensions
- Update test API (`PUT /api/v1/tests/{id}`)
- Update question API (`PUT /api/v1/tests/{id}/questions/{questionId}`)
- Delete question API (`DELETE /api/v1/tests/{id}/questions/{questionId}`)
- Bulk operations APIs

## Technical Details

### Dependencies
- React Redux for state management
- React Router for navigation
- React Icons for UI icons
- Custom API service for backend communication

### File Structure
```
src/
├── services/
│   ├── adminAuth.js          # Admin authentication service
│   └── testsApi.js           # Tests API service
├── pages/admin/
│   ├── AdminTests.jsx        # Main admin tests page
│   └── components/
│       ├── TestFormModal.jsx         # Test creation/edit form
│       ├── QuestionsManagementModal.jsx  # Questions management
│       └── QuestionFormModal.jsx     # Question creation/edit form
├── routes/
│   └── AdminRoutes.jsx       # Admin routes configuration
└── config/
    └── adminMenu.js          # Admin menu configuration
```

### State Management
- Uses existing Redux store
- Integrates with existing test slices
- Maintains admin-specific state locally
- Leverages existing authentication state

This admin panel provides a complete solution for test management with proper access control, comprehensive functionality, and user-friendly interface.
