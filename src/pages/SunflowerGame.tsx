import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LovebirdIllustration from '../components/LovebirdIllustration';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';

type GamePhase = 'idle' | 'showing' | 'shuffling' | 'selecting' | 'correct' | 'gameover' | 'cleared';

type BirdColor = 'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime';

const ALL_COLORS: BirdColor[] = ['pepe-green', 'violet-butter', 'pepe-yellow', 'yellowface-green', 'pepe-lime'];

interface SunflowerGameProps {
    onRestart: () => void;
}

const SunflowerGame: React.FC<SunflowerGameProps> = ({ onRestart }) => {
    const [phase, setPhase] = useState<GamePhase>('idle');
    const [round, setRound] = useState(1);
    const [positions, setPositions] = useState<number[]>([]);
    const [targetBird, setTargetBird] = useState(0);
    const [timer, setTimer] = useState(15);
    const [selectedBird, setSelectedBird] = useState<number | null>(null);
    const [swappingPair, setSwappingPair] = useState<[number, number] | null>(null);
    const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const birdCount = round <= 2 ? 3 : 5;
    const colors = ALL_COLORS.slice(0, birdCount);

    const clearAllTimers = useCallback(() => {
        if (shuffleTimerRef.current) {
            clearTimeout(shuffleTimerRef.current);
            shuffleTimerRef.current = null;
        }
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }
    }, []);

    const initRound = useCallback((roundNum: number) => {
        const count = roundNum <= 2 ? 3 : 5;
        const initialPositions = Array.from({ length: count }, (_, i) => i);
        const target = Math.floor(Math.random() * count);
        setPositions(initialPositions);
        setTargetBird(target);
        setSelectedBird(null);
        setSwappingPair(null);
        setTimer(15);
        setRound(roundNum);
        setPhase('showing');
    }, []);

    useEffect(() => {
        return () => clearAllTimers();
    }, [clearAllTimers]);

    useEffect(() => {
        if (phase === 'showing') {
            const timeout = setTimeout(() => setPhase('shuffling'), 2000);
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    useEffect(() => {
        if (phase !== 'shuffling') return;

        setTimer(15);
        const startTime = Date.now();
        const SHUFFLE_DURATION = 15000;
        const SWAP_INTERVAL = round <= 2 ? 1400 : 1200;

        countdownRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((SHUFFLE_DURATION - elapsed) / 1000));
            setTimer(remaining);
            if (remaining <= 0) {
                if (countdownRef.current) clearInterval(countdownRef.current);
            }
        }, 200);

        let swapCount = 0;
        const maxSwaps = Math.floor(SHUFFLE_DURATION / SWAP_INTERVAL);

        const doSwap = () => {
            if (swapCount >= maxSwaps) {
                setSwappingPair(null);
                setPhase('selecting');
                return;
            }

            setPositions(prev => {
                const count = prev.length;
                let a = Math.floor(Math.random() * count);
                let b = Math.floor(Math.random() * count);
                while (b === a) b = Math.floor(Math.random() * count);

                setSwappingPair([prev[a], prev[b]]);

                const next = [...prev];
                [next[a], next[b]] = [next[b], next[a]];
                return next;
            });

            swapCount++;
            shuffleTimerRef.current = setTimeout(doSwap, SWAP_INTERVAL);
        };

        shuffleTimerRef.current = setTimeout(doSwap, 600);

        return () => {
            clearAllTimers();
        };
    }, [phase, round, clearAllTimers]);

    const handleSelect = (birdIndex: number) => {
        if (phase !== 'selecting') return;
        setSelectedBird(birdIndex);

        if (birdIndex === targetBird) {
            if (round >= 5) {
                setPhase('cleared');
            } else {
                setPhase('correct');
            }
        } else {
            setPhase('gameover');
        }
    };

    const handleNextRound = () => {
        initRound(round + 1);
    };

    const handlePlayAgain = () => {
        clearAllTimers();
        setPhase('idle');
        setRound(1);
        setPositions([]);
        setSelectedBird(null);
    };

    const getSlotX = (slotIndex: number, total: number): number => {
        const spacing = total === 3 ? 33.33 : 20;
        const offset = total === 3 ? 16.67 : 10;
        return offset + slotIndex * spacing;
    };

    const renderBirds = () => {
        return positions.map((birdId, slotIndex) => {
            const isTarget = birdId === targetBird;
            const isHighlighted = phase === 'showing' && isTarget;
            const isSelected = phase !== 'shuffling' && phase !== 'showing' && selectedBird === birdId;
            const isSwapping = swappingPair?.includes(birdId) ?? false;
            const xPos = getSlotX(slotIndex, positions.length);

            const isRevealed = (phase === 'gameover' || phase === 'correct' || phase === 'cleared') && isTarget;

            return (
                <motion.div
                    key={birdId}
                    animate={{
                        x: `${xPos}%`,
                        rotate: isSwapping ? [0, 360] : 0,
                        y: isSwapping ? [0, -30, 0] : 0,
                    }}
                    transition={{
                        x: { duration: 0.5, ease: 'easeInOut' },
                        rotate: { duration: 0.5, ease: 'easeInOut' },
                        y: { duration: 0.5, ease: 'easeInOut' },
                    }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: phase === 'selecting' ? 'pointer' : 'default',
                        zIndex: isSwapping ? 10 : 1,
                    }}
                    onClick={() => handleSelect(birdId)}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transform: 'translate(-50%, -50%)',
                            position: 'relative',
                        }}
                    >
                        {/* Sunflower seed indicator */}
                        {(isHighlighted || isRevealed) && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: { xs: -22, sm: -28 },
                                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                    animation: 'bounce 0.6s ease-in-out infinite alternate',
                                    zIndex: 20,
                                }}
                            >
                                🌻
                            </Box>
                        )}

                        {/* Highlight ring */}
                        {(isHighlighted || isRevealed) && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: { xs: 68, sm: 90 },
                                    height: { xs: 68, sm: 90 },
                                    borderRadius: '50%',
                                    border: '3px solid #FFD700',
                                    boxShadow: '0 0 16px rgba(255, 215, 0, 0.5)',
                                    animation: 'pulse-glow 1.5s ease-in-out infinite',
                                }}
                            />
                        )}

                        {/* Selection ring */}
                        {isSelected && !isTarget && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: { xs: 68, sm: 90 },
                                    height: { xs: 68, sm: 90 },
                                    borderRadius: '50%',
                                    border: '3px solid #FF4444',
                                    boxShadow: '0 0 16px rgba(255, 68, 68, 0.5)',
                                }}
                            />
                        )}

                        <LovebirdIllustration
                            variant="sitting"
                            color={colors[birdId]}
                            size={{ xs: 55, sm: 72 }}
                            animated={isHighlighted || phase === 'selecting'}
                        />
                    </Box>
                </motion.div>
            );
        });
    };

    // Idle screen
    if (phase === 'idle') {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: { xs: 3, sm: 4 },
                px: 2, textAlign: 'center',
            }}>
                <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>🌻</Typography>
                <Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 800, fontSize: { xs: '1.4rem', sm: '2rem' },
                        background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                        backgroundClip: 'text', WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent', mb: 1,
                    }}>
                        해바라기씨 먹은 로또
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888', fontSize: { xs: '0.8rem', sm: '0.95rem' }, lineHeight: 1.6 }}>
                        해바라기씨를 먹은 앵무새를 잘 지켜보세요!{'\n'}
                        셔플이 끝나면 해바라기씨를 먹은 앵무새를 맞춰보세요!
                    </Typography>
                </Box>
                <Paper elevation={0} sx={{
                    p: { xs: 2, sm: 2.5 }, borderRadius: '16px',
                    backgroundColor: 'rgba(255, 140, 0, 0.06)',
                    border: '1px solid rgba(255, 140, 0, 0.15)', width: '100%', maxWidth: 320,
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, textAlign: 'left' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#FF8C00', fontSize: { xs: '0.78rem', sm: '0.88rem' } }}>
                            게임 규칙
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.72rem', sm: '0.82rem' }, lineHeight: 1.6 }}>
                            · 총 5라운드 (1-2라운드: 3마리, 3-5라운드: 5마리){'\n'}
                            · 15초 동안 앵무새들이 셔플됩니다{'\n'}
                            · 셔플 후 해바라기씨 먹은 앵무새를 찾으세요{'\n'}
                            · 틀리면 게임 오버!
                        </Typography>
                    </Box>
                </Paper>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => initRound(1)}
                    sx={{
                        px: 5, py: 1.5, fontWeight: 700,
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                        color: '#fff', borderRadius: '50px',
                        boxShadow: '0 8px 24px rgba(255, 140, 0, 0.35)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                            boxShadow: '0 12px 32px rgba(255, 140, 0, 0.5)',
                        },
                    }}
                >
                    게임 시작!
                </Button>
            </Box>
        );
    }

    // Game over screen
    if (phase === 'gameover') {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: { xs: 2.5, sm: 3 },
                px: 2, textAlign: 'center',
            }}>
                <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>😵</Typography>
                <Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 800, fontSize: { xs: '1.3rem', sm: '1.8rem' },
                        color: '#FF4444', mb: 0.5,
                    }}>
                        게임 오버!
                    </Typography>
                    <Typography variant="h5" sx={{
                        fontWeight: 700, fontSize: { xs: '1rem', sm: '1.3rem' },
                        color: '#FF8C00', mb: 1,
                    }}>
                        {round > 1 ? `${round - 1}라운드까지 성공!` : '아쉽게도 1라운드에서 실패!'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        다시 도전해보세요!
                    </Typography>
                </Box>

                {/* Show the birds with answer revealed */}
                <Box sx={{
                    position: 'relative', width: '100%', maxWidth: 400,
                    height: { xs: 100, sm: 130 }, my: 1,
                }}>
                    {renderBirds()}
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<ReplayIcon />}
                        onClick={handlePlayAgain}
                        sx={{
                            fontWeight: 700, borderRadius: '50px',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                            color: '#fff', px: 3,
                            boxShadow: '0 6px 20px rgba(255, 140, 0, 0.3)',
                        }}
                    >
                        다시 하기
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        onClick={onRestart}
                        sx={{
                            fontWeight: 700, borderRadius: '50px',
                            borderColor: 'rgba(255, 140, 0, 0.4)', color: '#FF8C00', px: 3,
                            '&:hover': { borderColor: '#FF8C00', backgroundColor: 'rgba(255, 140, 0, 0.06)' },
                        }}
                    >
                        테스트 선택
                    </Button>
                </Box>
            </Box>
        );
    }

    // Cleared screen
    if (phase === 'cleared') {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: { xs: 2.5, sm: 3 },
                px: 2, textAlign: 'center',
            }}>
                <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>🎉</Typography>
                <Box>
                    <Typography variant="h4" sx={{
                        fontWeight: 800, fontSize: { xs: '1.3rem', sm: '1.8rem' },
                        background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                        backgroundClip: 'text', WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent', mb: 0.5,
                    }}>
                        전 라운드 클리어!
                    </Typography>
                    <Typography variant="body1" sx={{
                        color: '#FF8C00', fontWeight: 600,
                        fontSize: { xs: '0.9rem', sm: '1.1rem' },
                    }}>
                        대단해요! 5라운드 모두 성공했습니다! 🌻
                    </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                    <LovebirdIllustration variant="couple" size={{ xs: 50, sm: 70 }} animated />
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<ReplayIcon />}
                        onClick={handlePlayAgain}
                        sx={{
                            fontWeight: 700, borderRadius: '50px',
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                            color: '#fff', px: 3,
                            boxShadow: '0 6px 20px rgba(255, 140, 0, 0.3)',
                        }}
                    >
                        다시 하기
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        onClick={onRestart}
                        sx={{
                            fontWeight: 700, borderRadius: '50px',
                            borderColor: 'rgba(255, 140, 0, 0.4)', color: '#FF8C00', px: 3,
                            '&:hover': { borderColor: '#FF8C00', backgroundColor: 'rgba(255, 140, 0, 0.06)' },
                        }}
                    >
                        테스트 선택
                    </Button>
                </Box>
            </Box>
        );
    }

    // Main game UI (showing / shuffling / selecting / correct)
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            height: '100%', gap: { xs: 1.5, sm: 2.5 },
            px: 2, py: { xs: 2, sm: 3 }, position: 'relative',
        }}>
            {/* Header: Round + Timer */}
            <Box sx={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', width: '100%', maxWidth: 400,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{
                        fontWeight: 700, fontSize: { xs: '0.85rem', sm: '1rem' }, color: '#FF8C00',
                    }}>
                        라운드 {round}/5
                    </Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }, color: '#999',
                    }}>
                        ({birdCount}마리)
                    </Typography>
                </Box>

                {/* Timer */}
                <AnimatePresence mode="wait">
                    {(phase === 'shuffling' || phase === 'showing') && (
                        <motion.div
                            key="timer"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <Box sx={{
                                width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 },
                                borderRadius: '50%',
                                background: timer <= 3
                                    ? 'linear-gradient(135deg, #FF4444, #FF6B6B)'
                                    : 'linear-gradient(135deg, #FFD700, #FF8C00)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: timer <= 3
                                    ? '0 4px 12px rgba(255, 68, 68, 0.4)'
                                    : '0 4px 12px rgba(255, 140, 0, 0.3)',
                                animation: timer <= 3 ? 'pulse-glow 0.5s ease-in-out infinite' : 'none',
                            }}>
                                <Typography sx={{
                                    fontWeight: 800, color: '#fff',
                                    fontSize: { xs: '1rem', sm: '1.2rem' },
                                }}>
                                    {phase === 'showing' ? '👀' : timer}
                                </Typography>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            {/* Round progress dots */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(r => (
                    <Box
                        key={r}
                        sx={{
                            width: { xs: 8, sm: 10 }, height: { xs: 8, sm: 10 },
                            borderRadius: '50%',
                            backgroundColor: r < round ? '#FFD700'
                                : r === round ? '#FF8C00'
                                : 'rgba(255, 140, 0, 0.15)',
                            transition: 'all 0.3s ease',
                            boxShadow: r === round ? '0 0 8px rgba(255, 140, 0, 0.4)' : 'none',
                        }}
                    />
                ))}
            </Box>

            {/* Status message */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <Paper elevation={0} sx={{
                        px: { xs: 2.5, sm: 3 }, py: { xs: 0.8, sm: 1 },
                        borderRadius: '50px', textAlign: 'center',
                        backgroundColor: phase === 'showing' ? 'rgba(255, 215, 0, 0.12)'
                            : phase === 'shuffling' ? 'rgba(255, 140, 0, 0.1)'
                            : phase === 'correct' ? 'rgba(126, 200, 80, 0.12)'
                            : 'rgba(255, 140, 0, 0.08)',
                        border: `1px solid ${
                            phase === 'showing' ? 'rgba(255, 215, 0, 0.3)'
                            : phase === 'shuffling' ? 'rgba(255, 140, 0, 0.2)'
                            : phase === 'correct' ? 'rgba(126, 200, 80, 0.3)'
                            : 'rgba(255, 140, 0, 0.15)'
                        }`,
                    }}>
                        <Typography sx={{
                            fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.95rem' },
                            color: phase === 'correct' ? '#5CA632' : '#FF8C00',
                        }}>
                            {phase === 'showing' && '🌻 이 앵무새를 잘 지켜보세요!'}
                            {phase === 'shuffling' && '👀 눈을 크게 뜨고 잘 따라가세요!'}
                            {phase === 'selecting' && '🤔 해바라기씨를 먹은 앵무새는 누구?'}
                            {phase === 'correct' && '🎉 정답! 다음 라운드로!'}
                        </Typography>
                    </Paper>
                </motion.div>
            </AnimatePresence>

            {/* Bird arena */}
            <Box sx={{
                position: 'relative', width: '100%', maxWidth: 400,
                height: { xs: 140, sm: 180 },
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                my: { xs: 2, sm: 3 },
            }}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    borderRadius: '24px',
                    background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 140, 0, 0.08) 100%)',
                    border: '1.5px solid rgba(255, 140, 0, 0.12)',
                }} />
                {renderBirds()}
            </Box>

            {/* Correct phase - next round button */}
            {phase === 'correct' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Button
                        variant="contained"
                        onClick={handleNextRound}
                        sx={{
                            fontWeight: 700, borderRadius: '50px', px: 4, py: 1.2,
                            fontSize: { xs: '0.95rem', sm: '1.1rem' },
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                            color: '#fff',
                            boxShadow: '0 6px 20px rgba(255, 140, 0, 0.35)',
                        }}
                    >
                        다음 라운드 →
                    </Button>
                </motion.div>
            )}

            {/* Selecting phase hint */}
            {phase === 'selecting' && (
                <Typography variant="body2" sx={{
                    color: '#999', fontSize: { xs: '0.72rem', sm: '0.82rem' },
                    animation: 'pulse-glow 2s ease-in-out infinite',
                }}>
                    앵무새를 터치하세요!
                </Typography>
            )}

            <style>{`
                @keyframes bounce {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-6px); }
                }
            `}</style>
        </Box>
    );
};

export default SunflowerGame;
