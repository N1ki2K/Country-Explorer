// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Navbar from '@/components/Navbar';

// const PlayIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
// const PauseIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
// const RefreshCwIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>;

// const Button = ({ children, onClick, variant = 'default', size = 'default', className = '' }) => {
//   const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
//   const variantStyles = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//     outline: "border border-input hover:bg-accent hover:text-accent-foreground",
//     secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//     link: "underline-offset-4 hover:underline text-primary",
//   };
//   const sizeStyles = {
//     default: "h-10 py-2 px-4",
//     sm: "h-9 px-3 rounded-md",
//     lg: "h-11 px-8 rounded-md",
//     icon: "h-10 w-10"
//   };
//   return (
//     <button
//       onClick={onClick}
//       className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// const Card = ({ children, className = '' }) => (
//   <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
//     {children}
//   </div>
// );
// const CardHeader = ({ children, className = '' }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
// const CardTitle = ({ children, className = '' }) => <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
// const CardContent = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
// const CardFooter = ({ children, className = '' }) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

// // Game Constants
// const NUM_LANES = 4;
// const LANE_WIDTH = 80;
// const PLAYFIELD_HEIGHT = 500;
// const NOTE_HEIGHT = 20;
// const NOTE_SPEED = 3;
// const HIT_WINDOW = 40;
// const JUDGMENT_LINE_POSITION = PLAYFIELD_HEIGHT - 80;

// const KEY_MAPPINGS = ['f', 'g', 'k', 'l'];

// type NoteProps = {
//   id: number;
//   lane: number;
//   top: number;
//   spawnTime: number;
// };

// const Note = React.memo(({ id, lane, top, spawnTime }: NoteProps) => {
//   const laneColors = [
//     'hsl(0, 70%, 60%)',    
//     'hsl(120, 70%, 60%)',  
//     'hsl(240, 70%, 60%)',  
//     'hsl(300, 70%, 60%)'  
//   ];

//   return (
    
//     <div
//       style={{
//         position: 'absolute',
//         left: lane * LANE_WIDTH + 2,
//         top: top,
//         width: `${LANE_WIDTH - 4}px`,
//         height: `${NOTE_HEIGHT}px`,
//         backgroundColor: laneColors[lane],
//         border: '2px solid rgba(255,255,255,0.3)',
//         borderRadius: '4px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
//       }}
//     />
//   );
// });

// type LaneProps = {
//   laneIndex: number;
//   isPressed: boolean;
// };

// const Lane = React.memo(({ laneIndex, isPressed }: LaneProps) => {
//   return (
//     <div
//       className={`h-full border-x border-gray-600 transition-all duration-75 ${
//         isPressed ? 'bg-white/20' : 'bg-gray-800/50'
//       }`}
//       style={{ width: `${LANE_WIDTH}px` }}
//     />
//   );
// });

// const Playfield = ({ notes, setNotes, score, setScore, gameRunning, combo, setCombo, onMiss }) => {
//   const [pressedLanes, setPressedLanes] = useState(Array(NUM_LANES).fill(false));
//   const [hitEffects, setHitEffects] = useState([]);

//   useEffect(() => {
//     const missedNotes = notes.filter(note => note.top > PLAYFIELD_HEIGHT + NOTE_HEIGHT);
//     if (missedNotes.length > 0) {
//       setNotes(prevNotes => prevNotes.filter(note => note.top <= PLAYFIELD_HEIGHT + NOTE_HEIGHT));
//       missedNotes.forEach(() => {
//         setCombo(0);
//         onMiss();
//       });
//     }
//   }, [notes, setNotes, setCombo, onMiss]);

//   const addHitEffect = useCallback((lane) => {
//     const effectId = Date.now() + Math.random();
//     setHitEffects(prev => [...prev, { id: effectId, lane, opacity: 1 }]);
    
//     setTimeout(() => {
//       setHitEffects(prev => prev.filter(effect => effect.id !== effectId));
//     }, 200);
//   }, []);

//   const handleKeyDown = useCallback((e) => {
//     if (!gameRunning) return;
//     const key = e.key.toLowerCase();
//     const laneIndex = KEY_MAPPINGS.indexOf(key);

//     if (laneIndex !== -1 && !pressedLanes[laneIndex]) {
//       setPressedLanes(prev => {
//         const newPressed = [...prev];
//         newPressed[laneIndex] = true;
//         return newPressed;
//       });

//       setNotes(prevNotes => {
//         let hitNote = null;
//         let minDistance = Infinity;
        
//         prevNotes.forEach(note => {
//           if (note.lane === laneIndex) {
//             const noteBottom = note.top + NOTE_HEIGHT;
//             const distance = Math.abs(noteBottom - JUDGMENT_LINE_POSITION);
            
//             if (distance < HIT_WINDOW && distance < minDistance) {
//               minDistance = distance;
//               hitNote = note;
//             }
//           }
//         });

//         if (hitNote) {
//           const accuracy = 1 - (minDistance / HIT_WINDOW);
//           const points = Math.round(100 * accuracy);
          
//           setScore(s => s + points);
//           setCombo(c => c + 1);
//           addHitEffect(laneIndex);
          
//           return prevNotes.filter(note => note.id !== hitNote.id);
//         } else {
//           setCombo(0);
//           return prevNotes;
//         }
//       });
//     }
//   }, [gameRunning, setNotes, setScore, setCombo, pressedLanes, addHitEffect]);

//   const handleKeyUp = useCallback((e) => {
//     if (!gameRunning) return;
//     const key = e.key.toLowerCase();
//     const laneIndex = KEY_MAPPINGS.indexOf(key);

//     if (laneIndex !== -1) {
//       setPressedLanes(prev => {
//         const newPressed = [...prev];
//         newPressed[laneIndex] = false;
//         return newPressed;
//       });
//     }
//   }, [gameRunning]);

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, [handleKeyDown, handleKeyUp]);

//   return (
//     <div
//       className="relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden shadow-2xl rounded-lg"
//       style={{
//         width: NUM_LANES * LANE_WIDTH,
//         height: PLAYFIELD_HEIGHT,
//       }}
//     >
//       {/* Lanes */}
//       <div className="absolute inset-0 flex">
//         {Array(NUM_LANES).fill(0).map((_, i) => (
//           <Lane key={i} laneIndex={i} isPressed={pressedLanes[i]} />
//         ))}
//       </div>

//       {/* Notes */}
//       {notes.map(note => (
//         <Note key={note.id} {...note} />
//       ))}

//       {/* Hit Effects */}
//       {hitEffects.map(effect => (
//         <div
//           key={effect.id}
//           className="absolute pointer-events-none"
//           style={{
//             left: effect.lane * LANE_WIDTH,
//             top: JUDGMENT_LINE_POSITION - 20,
//             width: LANE_WIDTH,
//             height: 40,
//             background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
//             animation: 'fadeOut 0.2s ease-out forwards'
//           }}
//         />
//       ))}

//       {/* Judgment Line */}
//       <div
//         className="absolute bg-gradient-to-r from-red-500 to-orange-500 shadow-lg"
//         style={{
//           width: '100%',
//           height: '4px',
//           top: `${JUDGMENT_LINE_POSITION - 2}px`,
//           boxShadow: '0 0 15px 3px rgba(239, 68, 68, 0.5)',
//         }}
//       />

//       {/* Key indicators */}
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
//         {KEY_MAPPINGS.map((key, i) => (
//           <div
//             key={key}
//             className={`flex items-center justify-center text-white font-bold text-lg border-2 rounded transition-all duration-75 ${
//               pressedLanes[i] 
//                 ? 'border-white bg-white/30 scale-90' 
//                 : 'border-gray-500 bg-gray-700/50'
//             }`}
//             style={{
//               width: `${LANE_WIDTH - 8}px`,
//               height: '36px',
//             }}
//           >
//             {key.toUpperCase()}
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @keyframes fadeOut {
//           from { opacity: 1; transform: scale(1); }
//           to { opacity: 0; transform: scale(1.5); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default function App() {
//   const [notes, setNotes] = useState([]);
//   const [score, setScore] = useState(0);
//   const [combo, setCombo] = useState(0);
//   const [gameRunning, setGameRunning] = useState(false);
//   const [gameTime, setGameTime] = useState(0);
//   const [misses, setMisses] = useState(0);
  
//   const gameIntervalRef = useRef(null);
//   const noteIdCounterRef = useRef(0);
//   const beatmapIndexRef = useRef(0);
//   const gameStartTimeRef = useRef(0);

//   const beatmap = useRef([
//     { time: 1000, lane: 0 }, { time: 1200, lane: 1 }, { time: 1400, lane: 2 }, { time: 1600, lane: 3 },
    
//     { time: 2000, lane: 0 }, { time: 2000, lane: 2 },
//     { time: 2400, lane: 1 }, { time: 2400, lane: 3 },
    
//     // Fast section
//     { time: 3000, lane: 0 }, { time: 3150, lane: 1 }, { time: 3300, lane: 2 }, { time: 3450, lane: 3 },
//     { time: 3600, lane: 3 }, { time: 3750, lane: 2 }, { time: 3900, lane: 1 }, { time: 4050, lane: 0 },
    
//     { time: 4500, lane: 0 }, { time: 4500, lane: 3 },
//     { time: 4650, lane: 1 }, { time: 4800, lane: 2 },
//     { time: 4950, lane: 0 }, { time: 4950, lane: 2 },
    
//     { time: 5500, lane: 0 }, { time: 5500, lane: 1 }, { time: 5500, lane: 2 }, { time: 5500, lane: 3 },
//     { time: 6000, lane: 1 }, { time: 6100, lane: 2 }, { time: 6200, lane: 1 }, { time: 6300, lane: 0 },
    
//     { time: 7000, lane: 0 }, { time: 7200, lane: 1 }, { time: 7400, lane: 2 }, { time: 7600, lane: 3 },
//     { time: 8000, lane: 0 }, { time: 8000, lane: 1 }, { time: 8000, lane: 2 }, { time: 8000, lane: 3 },

//     { time: 8400, lane: 0 },
//     { time: 8800, lane: 3 },
//     { time: 9200, lane: 1 },
//     { time: 9600, lane: 2 },

//     { time: 10000, lane: 0 }, { time: 10150, lane: 1 }, { time: 10300, lane: 0 }, { time: 10450, lane: 1 },
//     { time: 10600, lane: 3 }, { time: 10750, lane: 2 }, { time: 10900, lane: 3 }, { time: 11050, lane: 2 },
    
//     { time: 11500, lane: 0 }, { time: 11500, lane: 1 },
//     { time: 11800, lane: 2 }, { time: 11800, lane: 3 },
//     { time: 12100, lane: 0 }, { time: 12100, lane: 3 },

//     { time: 12500, lane: 0 }, { time: 12600, lane: 0 }, { time: 12700, lane: 0 }, 
//     { time: 12900, lane: 1 },
//     { time: 13100, lane: 2 }, { time: 13200, lane: 2 }, 
//     { time: 13400, lane: 3 },
//     { time: 13600, lane: 0 }, { time: 13700, lane: 1 }, { time: 13800, lane: 2 }, { time: 13900, lane: 3 }, 
//     { time: 14000, lane: 3 }, { time: 14100, lane: 2 }, { time: 14200, lane: 1 }, { time: 14300, lane: 0 },

//     { time: 15000, lane: 0 }, { time: 15000, lane: 2 },
//     { time: 15300, lane: 1 }, { time: 15300, lane: 3 },

//      { time: 16000, lane: 0 }, { time: 16000, lane: 1 }, { time: 16000, lane: 2 }, { time: 16000, lane: 3 },

//     { time: 16500, lane: 0 }, { time: 16600, lane: 1 }, { time: 16700, lane: 0 }, { time: 16800, lane: 1 },
//     { time: 16900, lane: 0 }, { time: 17000, lane: 1 },
//     { time: 17200, lane: 2 }, { time: 17300, lane: 3 }, { time: 17400, lane: 2 }, { time: 17500, lane: 3 },

//     { time: 18000, lane: 3 }, { time: 18150, lane: 2 }, { time: 18300, lane: 1 }, { time: 18450, lane: 0 },
//     { time: 18600, lane: 0 }, { time: 18600, lane: 3 }, 
//     { time: 18750, lane: 1 }, { time: 18900, lane: 2 },
//     { time: 19050, lane: 1 }, { time: 19050, lane: 2 }, 

//     { time: 19500, lane: 0 },
//     { time: 19700, lane: 1 }, { time: 19700, lane: 0 },
//     { time: 19900, lane: 2 }, { time: 19900, lane: 1 }, { time: 19900, lane: 0 },
//     { time: 20100, lane: 3 }, { time: 20100, lane: 2 }, { time: 20100, lane: 1 }, { time: 20100, lane: 0 },
//     { time: 17600, lane: 2 }, { time: 17700, lane: 3 },
//     { time: 21000, lane: 0 }, { time: 21000, lane: 1 }, { time: 21000, lane: 2 }, { time: 21000, lane: 3 }
    
//   ].sort((a, b) => a.time - b.time));

//   const handleMiss = useCallback(() => {
//     setMisses(prev => prev + 1);
//   }, []);

//   // Game Loop
//   useEffect(() => {
//     if (gameRunning) {
//       gameIntervalRef.current = setInterval(() => {
//         const currentTime = Date.now() - gameStartTimeRef.current;
//         setGameTime(currentTime);

//         // Move existing notes down
//         setNotes(prevNotes =>
//           prevNotes.map(note => ({
//             ...note,
//             top: note.top + NOTE_SPEED,
//           }))
//         );

//         // Spawn new notes from beatmap
//         while (
//           beatmapIndexRef.current < beatmap.current.length &&
//           currentTime >= beatmap.current[beatmapIndexRef.current].time - 1000 // Spawn 1 second early
//         ) {
//           const noteData = beatmap.current[beatmapIndexRef.current];
//           const spawnTime = currentTime;
          
//           setNotes(prev => [
//             ...prev,
//             {
//               id: noteIdCounterRef.current++,
//               lane: noteData.lane,
//               top: -NOTE_HEIGHT,
//               spawnTime: spawnTime,
//             },
//           ]);
//           beatmapIndexRef.current++;
//         }

//         // End game condition
//         if (
//           beatmapIndexRef.current >= beatmap.current.length &&
//           currentTime > (beatmap.current[beatmap.current.length - 1]?.time || 0) + 3000
//         ) {
//           setGameRunning(false);
//         }
//       }, 1000 / 60); // 60 FPS
//     } else {
//       if (gameIntervalRef.current) {
//         clearInterval(gameIntervalRef.current);
//       }
//     }

//     return () => {
//       if (gameIntervalRef.current) {
//         clearInterval(gameIntervalRef.current);
//       }
//     };
//   }, [gameRunning]);

//   const startGame = () => {
//     setNotes([]);
//     setScore(0);
//     setCombo(0);
//     setMisses(0);
//     setGameTime(0);
//     noteIdCounterRef.current = 0;
//     beatmapIndexRef.current = 0;
//     gameStartTimeRef.current = Date.now();
//     setGameRunning(true);
//   };

//   const togglePause = () => {
//     if (gameRunning) {
//       setGameRunning(false);
//     } else {
//       gameStartTimeRef.current = Date.now() - gameTime;
//       setGameRunning(true);
//     }
//   };

//   const resetGame = () => {
//     setGameRunning(false);
//     setNotes([]);
//     setScore(0);
//     setCombo(0);
//     setMisses(0);
//     setGameTime(0);
//     noteIdCounterRef.current = 0;
//     beatmapIndexRef.current = 0;
//   };

//   const accuracy = notes.length + score/100 + misses > 0 ? 
//     Math.round((score/100) / (score/100 + misses) * 100) : 100;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900 text-white p-4 font-sans">
        
//       <Card className="w-full max-w-lg bg-gray-800/70 border-gray-600 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             React Mania
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center space-y-4">
//           <div className="flex justify-between w-full text-lg font-semibold">
//             <div>Score: <span className="text-yellow-400">{score.toLocaleString()}</span></div>
//             <div>Combo: <span className="text-green-400">{combo}</span></div>
//           </div>
//           <div className="flex justify-between w-full text-sm text-gray-300">
//             <div>Misses: <span className="text-red-400">{misses}</span></div>
//             <div>Accuracy: <span className="text-blue-400">{accuracy}%</span></div>
//           </div>
//           <Playfield 
//             notes={notes} 
//             setNotes={setNotes} 
//             score={score} 
//             setScore={setScore} 
//             gameRunning={gameRunning}
//             combo={combo}
//             setCombo={setCombo}
//             onMiss={handleMiss}
//           />
//         </CardContent>
//         <CardFooter className="flex justify-center space-x-3">
//           {!gameRunning && gameTime === 0 ? (
//             <Button onClick={startGame} variant="secondary" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
//               <PlayIcon className="mr-2 h-5 w-5" /> Start Game
//             </Button>
//           ) : (
//             <Button onClick={togglePause} variant="secondary" size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
//               {gameRunning ? <PauseIcon className="mr-2 h-5 w-5" /> : <PlayIcon className="mr-2 h-5 w-5" />}
//               {gameRunning ? 'Pause' : 'Resume'}
//             </Button>
//           )}
//           <Button onClick={resetGame} variant="outline" size="lg" className="border-red-500 text-red-400 hover:bg-red-500/20">
//             <RefreshCwIcon className="mr-2 h-5 w-5" /> Reset
//           </Button>
//         </CardFooter>
//       </Card>
//       <div className="mt-6 text-center text-gray-300 text-sm max-w-md">
//         <p className="mb-2">Use keys: <span className="font-mono text-purple-300 font-bold">F, G, K, L</span> to hit the notes when they reach the red line.</p>
//         <p className="text-xs text-gray-400">Hit notes accurately to build combo and maximize your score!</p>
//       </div>
//     </div>
//   );
// }