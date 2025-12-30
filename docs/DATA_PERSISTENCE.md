# Data Persistence Guide for Botaqiy

This guide explains how user data is persisted in the Botaqiy application using Lovable Cloud.

## Architecture Overview

Botaqiy uses Lovable Cloud for backend data persistence with Row Level Security (RLS) ensuring each user can only access their own data.

## Database Tables

### 1. `profiles`
Stores user profile information.
- **Primary Key**: `id` (UUID, references `auth.users`)
- **Fields**: `username`, `avatar_url`, `country`, `description`, `created_at`, `updated_at`
- **RLS**: Users can view all profiles, but only update their own

### 2. `user_progress`
Tracks user gamification data.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `coins`, `level`, `streak_days`, `last_activity_date`
- **RLS**: Users can only view/update their own progress

### 3. `flashcard_sessions`
Stores generated flashcard sessions.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `title`, `original_text`, `flashcard_count`, `flashcards` (JSONB)
- **RLS**: Users can only CRUD their own sessions

### 4. `scenarios` (for AI-generated scenarios)
Stores dynamically generated scenarios.
- **Primary Key**: `id` (UUID)
- **Foreign Keys**: `user_id`, `session_id`
- **Fields**: `title`, `description`, `difficulty`, `questions` (JSONB)
- **RLS**: Users can only view/create their own scenarios

### 5. `user_scores`
Tracks scenario test scores.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` (references `auth.users`)
- **Fields**: `scenario_id` (TEXT), `difficulty`, `score`, `correct_answers`, `total_questions`
- **RLS**: Users can only view/insert their own scores

## Coin System

Coins are the primary currency in Botaqiy. Here's how they work:

### Earning Coins

| Action | Coins |
|--------|-------|
| Flashcard - Easy rating | +5 |
| Flashcard - Good rating | +1 |
| Scenario completion | Points based on accuracy × difficulty |

### Losing Coins

| Action | Coins |
|--------|-------|
| Flashcard - Difficult rating | -10 |
| Reward purchases | Variable cost |

### Implementation Details

**FlashcardReview.tsx** - Difficulty rating buttons:
```typescript
const handleDifficultyRating = async (rating: 'easy' | 'good' | 'difficult') => {
  switch (rating) {
    case 'easy': await addCoins(5); break;
    case 'good': await addCoins(1); break;
    case 'difficult': await deductCoins(10); break;
  }
};
```

**useUserProgress hook** - Manages coin updates:
- `addCoins(amount)` - Adds coins and syncs to database
- `deductCoins(amount)` - Removes coins (fails if insufficient balance)
- `refresh()` - Reloads progress from database

## Profile Persistence

Profile data is saved to the `profiles` table when users edit their profile:

**EditProfileDialog.tsx**:
```typescript
const { error } = await supabase
  .from('profiles')
  .update({
    username: formData.username,
    description: formData.description,
    country: formData.country,
  })
  .eq('id', user.id);
```

## Authentication Flow

1. User signs up/logs in via `/auth` page
2. Auth creates a record in `auth.users`
3. A database trigger `handle_new_user()` automatically creates:
   - A record in `profiles` with default username
   - A record in `user_progress` with default values (0 coins, level 1, 0 streak)

## Database Trigger

The `handle_new_user` function runs on every new user registration:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'User'));
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Edge Functions

### `purchase-reward`
- Validates user authentication
- Checks sufficient coin balance
- Deducts coins atomically
- Records purchase (optional)

### `generate-flashcards`
- Accepts text input
- Uses AI to generate flashcards
- Returns structured flashcard data

### `extract-text`
- Cleans and processes raw text input
- Prepares text for flashcard generation

## Setting Up for Development

1. **Ensure Lovable Cloud is enabled** in project settings

2. **Tables and RLS policies** are managed automatically via migrations

3. **Configure Auth**:
   - Email auto-confirm should be enabled for development

## Complete Schema Reference

See `docs/SCHEMA.sql` for the complete database schema including:
- All table definitions
- Foreign key relationships
- RLS policies
- Triggers and functions
- Indexes for performance

## Offline Support

The app includes offline support via IndexedDB (`src/lib/offline/db.ts`):
- Caches user data locally
- Syncs when back online
- Queue operations for later sync

## Troubleshooting

### Coins not updating
1. Ensure user is authenticated
2. Check `user_progress` record exists for user
3. Verify sufficient balance for deductions
4. Check browser console for errors

### Profile not saving
1. Verify user is logged in
2. Check RLS policy allows update for user's own profile
3. Check network requests for errors

### Data not persisting
1. Check if user is authenticated: `supabase.auth.getUser()`
2. Verify RLS policies allow the operation
3. Check browser console for Supabase errors
