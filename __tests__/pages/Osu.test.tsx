// __tests__/osu.test.tsx (or your preferred test file location)

import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// If Playfield, Note, Lane are exported from osu.tsx:
// import OsuApp, { Playfield, Note, Lane } from '../pages/osu';
// If only the default App is exported:
import OsuApp from '../../src/pages/osu';
// For this example, I'll assume Playfield might be made exportable for some tests.
// If not, Playfield tests need to be adapted or integrated into App tests.

// Mock Navbar as it's not the focus of these tests
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar-mock">Navbar</div>);

// Game constants from osu.tsx (ensure these match or are imported if made exportable)
const JUDGMENT_LINE_POSITION = 500 - 80; // PLAYFIELD_HEIGHT - 80
const NOTE_HEIGHT = 20;
const HIT_WINDOW = 40;
const KEY_MAPPINGS = ['f', 'g', 'k', 'l'];
const NOTE_SPEED = 3;
const PLAYFIELD_HEIGHT = 500;

// Helper to get the Playfield component for direct testing (requires export from osu.tsx)
// If Playfield is not exported, these tests would need to be significantly refactored
// to test through OsuApp interactions.

const PlayfieldComponent = ({ children }) => <div data-testid="playfield-placeholder">{children}</div>;


describe('OsuApp (Main Game Component)', () => {
  beforeEach(() => {
    jest.useRealTimers(); // Default to real timers
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up any fake timers
  });

  test('renders initial UI correctly', () => {
    render(<OsuApp />);
    expect(screen.getByText('React Mania')).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toHaveTextContent('Score: 0');
    expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 0');
    expect(screen.getByText(/Misses:/)).toHaveTextContent('Misses: 0');
    expect(screen.getByText(/Accuracy:/)).toHaveTextContent('Accuracy: 100%');
    expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByText(/Use keys: F, G, K, L/i)).toBeInTheDocument();
  });

  test('Start Game button initiates the game state', () => {
    render(<OsuApp />);
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    fireEvent.click(startButton);

    expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Start Game/i })).not.toBeInTheDocument();
  });

  test('Pause and Resume buttons toggle game state', () => {
    render(<OsuApp />);
    fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

    const pauseButton = screen.getByRole('button', { name: /Pause/i });
    fireEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: /Resume/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Pause/i })).not.toBeInTheDocument();

    const resumeButton = screen.getByRole('button', { name: /Resume/i });
    fireEvent.click(resumeButton);
    expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Resume/i })).not.toBeInTheDocument();
  });

  test('Reset button resets game to initial state', () => {
    render(<OsuApp />);
    const startButton = screen.getByRole('button', { name: /Start Game/i });
    fireEvent.click(startButton); // Start the game

    // Simulate some interactions or state change if needed before reset
    const pauseButton = screen.getByRole('button', { name: /Pause/i });
    fireEvent.click(pauseButton); // Pause it

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toHaveTextContent('Score: 0');
    expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 0');
    expect(screen.getByText(/Misses:/)).toHaveTextContent('Misses: 0');
    expect(screen.getByText(/Accuracy:/)).toHaveTextContent('Accuracy: 100%');
    expect(screen.queryByRole('button', { name: /Pause/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Resume/i })).not.toBeInTheDocument();
  });

  describe('Game Loop and Note Spawning (using fake timers)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test('notes start spawning after game starts and time advances', () => {
      render(<OsuApp />);
      fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

      // The first note in the default beatmap is at time: 1000ms.
      // Notes are spawned if `currentTime >= beatmap.time - 1000`.
      // So, the first note should try to spawn when `currentTime >= 0`.
      // Let's advance time slightly to ensure the interval for spawning runs.
      act(() => {
        jest.advanceTimersByTime(50); // Advance by ~3 frames
      });
      
      // This is an indirect way to check for notes.
      // A better way would be to add data-testid to Note components.
      // `document.querySelectorAll` can be used but is less idiomatic with RTL.
      // For now, we'll check that the game is running and hasn't crashed.
      // A more robust test would query for elements representing notes.
      expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
    });

    test('game stops after beatmap finishes and sufficient time passes', () => {
      render(<OsuApp />);
      fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

      // Beatmap's last note is at 21000ms. Game ends 3000ms after the last note's time.
      // Note spawn logic: currentTime >= beatmap_time - 1000
      // So, last note spawns around gameTime 20000ms.
      // Game end condition: beatmapIndex >= beatmap.length AND currentTime > lastNoteTime + 3000
      // lastNoteTime in beatmap.current is 21000.
      // So, game should end after gameTime > 21000 + 3000 = 24000ms.
      act(() => {
        jest.advanceTimersByTime(24100); // Advance well past the end time
      });

      expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Pause/i })).not.toBeInTheDocument();
    });
  });

  describe('Gameplay Interactions (hitting notes - requires fake timers and precise control)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test('hitting a note correctly updates score and combo', () => {
      render(<OsuApp />);
      fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

      // First note: { time: 1000, lane: 0 }
      // Spawns at gameTime approx 0, top: -NOTE_HEIGHT (-20)
      // Reaches judgment line (top: JUDGMENT_LINE_POSITION - NOTE_HEIGHT = 420 - 20 = 400)
      // Distance to travel: 400 - (-20) = 420px
      // Frames to travel: 420px / NOTE_SPEED (3px/frame) = 140 frames
      // Time in ms: 140 frames * (1000ms / 60fps) = ~2333ms
      
      act(() => {
        jest.advanceTimersByTime(2333); // Advance time to when the first note is at judgment line
      });

      fireEvent.keyDown(window, { key: KEY_MAPPINGS[0] }); // 'f' for lane 0

      // Score calculation: Math.round(100 * accuracy_percentage)
      // For a perfect hit (minDistance = 0), accuracy = 1, points = 100
      expect(screen.getByText(/Score:/)).toHaveTextContent('Score: 100'); // Or a range if timing isn't perfect
      expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 1');
      expect(screen.getByText(/Misses:/)).toHaveTextContent('Misses: 0');
      // Accuracy: (1 / (1 + 0)) * 100 = 100%
      expect(screen.getByText(/Accuracy:/)).toHaveTextContent('Accuracy: 100%');

      fireEvent.keyUp(window, { key: KEY_MAPPINGS[0] });
    });

    test('missing a note updates misses and resets combo', () => {
      render(<OsuApp />);
      fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

      // Let the first note pass completely
      // Time for note to reach judgment line: ~2333ms
      // Time for note to pass judgment line + NOTE_HEIGHT + some buffer:
      // Total travel to disappear: (PLAYFIELD_HEIGHT + NOTE_HEIGHT) - (-NOTE_HEIGHT) = 500 + 20 + 20 = 540
      // Frames: 540 / 3 = 180 frames
      // Time: 180 * (1000/60) = 3000ms
      act(() => {
        jest.advanceTimersByTime(3100); // Advance time so the first note is missed
      });

      expect(screen.getByText(/Score:/)).toHaveTextContent('Score: 0');
      expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 0'); // Combo reset
      expect(screen.getByText(/Misses:/)).toHaveTextContent('Misses: 1');
      // Accuracy: (0 / (0 + 1)) * 100 = 0%
      expect(screen.getByText(/Accuracy:/)).toHaveTextContent('Accuracy: 0%');
    });

     test('pressing wrong key for a note (or when no note is hittable) resets combo', () => {
      render(<OsuApp />);
      fireEvent.click(screen.getByRole('button', { name: /Start Game/i }));

      act(() => {
        jest.advanceTimersByTime(2333); // First note (lane 0) is at judgment
      });
      
      // Initial combo is 0. Hit one note to get combo > 0.
      fireEvent.keyDown(window, { key: KEY_MAPPINGS[0] }); // Hit 'f' for lane 0 note
      expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 1');

      // Press a wrong key or a key when no note is there for that lane
      fireEvent.keyDown(window, { key: KEY_MAPPINGS[1] }); // 'g' for lane 1 (empty)
      
      expect(screen.getByText(/Combo:/)).toHaveTextContent('Combo: 0'); // Combo should reset
    });
  });
});

// --- Tests for Playfield (if exported and testable in isolation) ---
if (PlayfieldComponent && PlayfieldComponent.name !== 'PlayfieldComponentPlaceholder') {
  describe('Playfield Component (Direct Testing - Requires Export)', () => {
    let mockSetNotes;
    let mockSetScore;
    let mockSetCombo;
    let mockOnMiss;

    const initialNote = { id: 1, lane: 0, top: JUDGMENT_LINE_POSITION - NOTE_HEIGHT, spawnTime: 0 }; // Note at judgment line

    beforeEach(() => {
      mockSetNotes = jest.fn();
      mockSetScore = jest.fn(currentScore => currentScore + 100); // Simulate score update
      mockSetCombo = jest.fn();
      mockOnMiss = jest.fn();
    });

    const renderPlayfield = (props = {}) => {
      const defaultProps = {
        notes: [],
        setNotes: mockSetNotes,
        score: 0,
        setScore: mockSetScore,
        gameRunning: true,
        combo: 0,
        setCombo: mockSetCombo,
        onMiss: mockOnMiss,
      };
      return render(<PlayfieldComponent {...defaultProps} {...props}>{props.children}</PlayfieldComponent>);
    };

    test('renders correct number of lanes and key indicators', () => {
      renderPlayfield();
      const keyIndicators = KEY_MAPPINGS.map(key => screen.getByText(key.toUpperCase()));
      expect(keyIndicators.length).toBe(KEY_MAPPINGS.length);
      // Further checks for lane elements could be done if they have specific identifiers
    });

    test('handles key press and correctly hits a note', () => {
      renderPlayfield({ notes: [initialNote] });
      
      fireEvent.keyDown(window, { key: KEY_MAPPINGS[0] }); // 'f'

      expect(mockSetScore).toHaveBeenCalled();
      expect(mockSetCombo).toHaveBeenCalledWith(expect.any(Function)); // For c => c + 1
      expect(mockSetNotes).toHaveBeenCalledWith(expect.any(Function)); // To filter the note
      // Check that the function passed to setNotes correctly removes the hit note:
      const setNotesFn = mockSetNotes.mock.calls[0][0];
      expect(setNotesFn([initialNote])).toEqual([]); // If initialNote was hit
    });

    test('handles key press but misses (no note in window)', () => {
      renderPlayfield({ notes: [{ ...initialNote, top: 0 }] }); // Note is far from judgment
      
      fireEvent.keyDown(window, { key: KEY_MAPPINGS[0] });

      expect(mockSetScore).not.toHaveBeenCalled();
      expect(mockSetCombo).toHaveBeenCalledWith(0); // Combo resets on miss
    });

    test('lane visual state changes on key press/release', () => {
      renderPlayfield();
      const keyIndicator = screen.getByText(KEY_MAPPINGS[0].toUpperCase());
      // Check initial style (e.g., not pressed)
      expect(keyIndicator).not.toHaveClass('scale-90'); // Example class for pressed

      fireEvent.keyDown(window, { key: KEY_MAPPINGS[0] });
      expect(keyIndicator).toHaveClass('scale-90'); // Check pressed style

      fireEvent.keyUp(window, { key: KEY_MAPPINGS[0] });
      expect(keyIndicator).not.toHaveClass('scale-90'); // Check released style
    });

    test('calls onMiss for notes passing the playfield height', () => {
      // This useEffect is in Playfield
      const missedNote = { id: 2, lane: 1, top: PLAYFIELD_HEIGHT + NOTE_HEIGHT + 5, spawnTime: 0 };
      renderPlayfield({ notes: [missedNote] });

      // The useEffect should run on render/update
      expect(mockOnMiss).toHaveBeenCalled();
      expect(mockSetCombo).toHaveBeenCalledWith(0);
      const setNotesFn = mockSetNotes.mock.calls[0][0];
      expect(setNotesFn([missedNote])).toEqual([]);
    });
  });
}