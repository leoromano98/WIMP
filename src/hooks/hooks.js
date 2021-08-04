import { useMemo, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
//import { KEYS, PROBLEM_STATUS, PROBLEMS, SCENARIOS } from 'helpers/'

// Ejemplos abajo:

// const MOBILE_MATCH_AGENTS = [
//   /Android/i,
//   /webOS/i,
//   /iPhone/i,
//   /iPad/i,
//   /iPod/i,
//   /BlackBerry/i,
//   /Windows Phone/i,
//   /PlayBook/i,
//   /Silk/i
// ]

// export const useIsMobile = () => {
//   return useMemo(() => {
//     return !!(
//       MOBILE_MATCH_AGENTS.some((toMatchItem) => {
//         return navigator.userAgent.match(toMatchItem)
//       }) ||
//       window.innerWidth <= 800 ||
//       (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
//     )
//   }, [])
// }

// export const useGameComplete = () => {
//   const scenarioPipe = useSelector((state) => state.game[KEYS.PIPE_SCENARIO].isComplete)
//   const scenarioPower = useSelector((state) => state.game[KEYS.POWER_SCENARIO].isComplete)

//   return useMemo(() => {
//     if (scenarioPipe) return SCENARIOS.PIPE
//     if (scenarioPower) return SCENARIOS.POWER

//     return undefined
//   }, [scenarioPipe, scenarioPower])
// }

// export const useScenarioSelected = () => {
//   const scenarioPipe = useSelector((state) => state.game[KEYS.PIPE_SCENARIO].isSelected)
//   const scenarioPower = useSelector((state) => state.game[KEYS.POWER_SCENARIO].isSelected)

//   return useMemo(() => {
//     if (scenarioPipe) {
//       return KEYS.PIPE_SCENARIO
//     } else if (scenarioPower) {
//       return KEYS.POWER_SCENARIO
//     }

//     return undefined
//   }, [scenarioPipe, scenarioPower])
// }

// export const useProblemShown = () => {
//   const pipeProblem1 = useSelector((state) => state.game[SCENARIOS.PIPE].problems.problem1)
//   const pipeProblem2 = useSelector((state) => state.game[SCENARIOS.PIPE].problems.problem2)
//   const powerProblem1 = useSelector((state) => state.game[SCENARIOS.POWER].problems.problem1)
//   const powerProblem2 = useSelector((state) => state.game[SCENARIOS.POWER].problems.problem2)

//   return useMemo(() => {
//     if (pipeProblem1 === PROBLEM_STATUS.ONGOING || powerProblem1 === PROBLEM_STATUS.ONGOING) {
//       return PROBLEMS.PROBLEM1
//     } else if (
//       pipeProblem2 === PROBLEM_STATUS.ONGOING ||
//       powerProblem2 === PROBLEM_STATUS.ONGOING
//     ) {
//       return PROBLEMS.PROBLEM2
//     }

//     return undefined
//   }, [pipeProblem1, pipeProblem2, powerProblem1, powerProblem2])
// }

// export const useGameRestarts = () => {
//   const [currentRestarts, setCurrentRestarts] = useState(0)
//   const gameRestarts = useSelector((state) => state.game[KEYS.RESTARTS])

//   const shouldRestart = useMemo(() => currentRestarts !== gameRestarts, [
//     gameRestarts,
//     currentRestarts
//   ])

//   const countRestart = useCallback(() => {
//     setCurrentRestarts((val) => val + 1)
//   }, [])

//   return [shouldRestart, countRestart]
// }

// export const useGetDimensions = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined
//   })

//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       })

//       const vh = window.innerHeight * 0.01
//       document.documentElement.style.setProperty('--vh', `${vh}px`)
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return windowSize
// }
