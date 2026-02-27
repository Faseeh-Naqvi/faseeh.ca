import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import './FaseehDashboard.css';

// Local storage keys (all local-only)
const LS_KEYS = {
  tasks: 'faseeh.tasks.v1',           // habit templates
  quotes: 'faseeh.quotes.v1',
  entries: 'faseeh.entries.v1',       // map date -> entry {todos, completions, ratings}
  visionStart: 'faseeh.visionStart.v1',   // ISO date string
};

// Helpers
const todayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Removed passphrase security; fully local usage.

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function MiniLineChart({ data, height = 48, color = '#0d6efd' }) {
  const width = 200;
  if (!data || data.length === 0) return <svg width={width} height={height} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / Math.max(1, data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} className="ms-2">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  );
}

// Gate removed.

// Hardcoded content: fill these with your picks
const TODAY_QUOTES = [
  'Hardcode your favorite quote here.',
  'Another quote for today if desired.'
];

const DEFAULT_HABITS = [
  { id: 'thyroid', label: 'Thyroid meds', spiritual: false },
  { id: 'fajr', label: 'Fajr', spiritual: true },
  { id: 'dhuhr', label: 'Dhuhr', spiritual: true },
  { id: 'asr', label: 'Asr', spiritual: true },
  { id: 'maghrib', label: 'Maghrib', spiritual: true },
  { id: 'isha', label: 'Isha', spiritual: true },
];

const TODAY_FAMILY = [
  { name: 'Hardcoded Person', years: '19xx-20xx', note: 'A short inspiring story to keep you going.' }
];

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, BarElement, Tooltip, Legend);

// Time monitor categories
const TIME_CATEGORIES = [
  { id: 'sleep', label: 'Sleep', color: '#6c757d', excludeWaste: true },
  { id: 'work', label: 'Work', color: '#0d6efd', excludeWaste: true },
  { id: 'study', label: 'Study', color: '#6610f2', excludeWaste: true },
  { id: 'exercise', label: 'Exercise', color: '#198754', excludeWaste: true },
  { id: 'prayer', label: 'Prayer', color: '#20c997', excludeWaste: true },
  { id: 'chores', label: 'Chores', color: '#fd7e14', excludeWaste: true },
  { id: 'travel', label: 'Travel', color: '#17a2b8', excludeWaste: true },
  { id: 'washroom', label: 'Washroom', color: '#adb5bd', excludeWaste: true },
  { id: 'social', label: 'Social', color: '#d63384', excludeWaste: false },
  { id: 'leisure', label: 'Leisure', color: '#dc3545', excludeWaste: false },
  { id: 'unplanned', label: 'Unplanned', color: '#ffc107', excludeWaste: false },
  { id: 'other', label: 'Other', color: '#343a40', excludeWaste: false },
];

export default function FaseehDashboard() {
  // eslint-disable-next-line no-console
  console.log('[Dashboard] Export wrapper render');
  return <DashboardInner />;
}

function DashboardInner() {
  // Basic lifecycle logging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[Dashboard] Mounted');
    return () => {
      // eslint-disable-next-line no-console
      console.log('[Dashboard] Unmounted');
    };
  }, []);
  const now = useNow(1000);
  // Quotes hardcoded for today
  const quotes = TODAY_QUOTES;
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.tasks);
      return raw ? JSON.parse(raw) : DEFAULT_HABITS;
    } catch { return DEFAULT_HABITS; }
  });
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.entries);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  // Background photos removed per request
  // Family stories hardcoded
  const family = TODAY_FAMILY;
  // Default todos removed per request; seed none
  const [visionStart, setVisionStart] = useState(() => {
    const raw = localStorage.getItem(LS_KEYS.visionStart);
    if (raw) return raw;
    const today = todayKey();
    localStorage.setItem(LS_KEYS.visionStart, today);
    return today;
  });
  const dateKey = todayKey();
  // Seed entry for today without default todos
  let entry = entries[dateKey] || {};
  if (!entries[dateKey]) {
    entry = { ...entry, todos: [] };
    const seeded = { ...entries, [dateKey]: entry };
    setEntries(seeded);
    localStorage.setItem(LS_KEYS.entries, JSON.stringify(seeded));
  }

  // ===== Shabih ur Raza Time Monitor (Vertical) =====
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const blocks = useMemo(
    () => entry.timeBlocks || [],
    [entry.timeBlocks]
  ); // [{id,startMin,endMin,label,category,prod(0..10),feeling:string}]
  const setBlocks = (next) => updateToday({ timeBlocks: next });
  const [snapTo15, setSnapTo15] = useState(true);

  const scheduleRef = useRef(null);
  const dragState = useRef(null); // {type:'create'|'move'|'resizeL'|'resizeR', id, startMin, endMin, offset}

  const minutesFromEventY = (e) => {
    const el = scheduleRef.current; if(!el) return 0;
    const rect = el.getBoundingClientRect();
    const y = (e.clientY ?? (e.touches?.[0]?.clientY||0)) - rect.top;
    const pct = clamp(y / rect.height, 0, 1);
    return Math.round(pct * 24 * 60);
  };
  const snapMinutes = (m) => {
    if (!snapTo15) return clamp(m, 0, 1440);
    const snapped = Math.round(m / 15) * 15;
    return clamp(snapped, 0, 1440);
  };

  const onScheduleMouseDown = (e) => {
    if (e.button !== 0) return;
    const m = minutesFromEventY(e);
    // Avoid creating if clicked on existing block (handled by block handlers)
    const hit = blocks.find(b => m >= b.startMin && m <= b.endMin);
    if (hit) return;
    const id = crypto.randomUUID();
    const start = snapMinutes(m);
    const end = snapMinutes(start + 30);
    const newBlock = { id, startMin: start, endMin: end, label: 'New Block', category: 'other', prod: 5, feeling: '' };
    const sanitized = { ...newBlock, endMin: Math.min(1440, Math.max(newBlock.startMin + 5, newBlock.endMin)) };
    setBlocks([...blocks, sanitized]);
    setSelectedBlockId(id);
    dragState.current = { type: 'resizeR', id };
    window.addEventListener('mousemove', onScheduleMouseMove);
    window.addEventListener('mouseup', onScheduleMouseUp, { once: true });
  };

  const onScheduleMouseMove = (e) => {
    if (!dragState.current) return;
    const m = minutesFromEventY(e);
    const idx = blocks.findIndex(b => b.id === dragState.current.id);
    if (idx < 0) return;
    const b = blocks[idx];
    let start = b.startMin, end = b.endMin;
    if (dragState.current.type === 'move') {
      const dur = end - start;
      const rawStart = m - dragState.current.offset;
      const targetStart = snapTo15 ? snapMinutes(rawStart) : clamp(rawStart, 0, 1440 - dur);
      start = targetStart; end = targetStart + dur;
    } else if (dragState.current.type === 'resizeL') {
      start = snapTo15 ? snapMinutes(m) : clamp(m, 0, end - 5);
      start = clamp(start, 0, end - 5);
    } else if (dragState.current.type === 'resizeR') {
      end = snapTo15 ? snapMinutes(m) : clamp(m, start + 5, 1440);
      end = clamp(end, start + 5, 1440);
    }
    const next = [...blocks]; next[idx] = { ...b, startMin: start, endMin: end };
    setBlocks(next);
  };
  const onScheduleMouseUp = () => { dragState.current = null; window.removeEventListener('mousemove', onScheduleMouseMove); };

  const onBlockMouseDown = (e, id) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setSelectedBlockId(id);
    const m = minutesFromEventY(e);
    const b = blocks.find(x => x.id === id); if (!b) return;
    dragState.current = { type: 'move', id, offset: m - b.startMin };
    window.addEventListener('mousemove', onScheduleMouseMove);
    window.addEventListener('mouseup', onScheduleMouseUp, { once: true });
  };
  const onHandleMouseDown = (e, id, which) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setSelectedBlockId(id);
    dragState.current = { type: which, id };
    window.addEventListener('mousemove', onScheduleMouseMove);
    window.addEventListener('mouseup', onScheduleMouseUp, { once: true });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteBlock = (id) => setBlocks(blocks.filter(b => b.id !== id));
  const updateBlock = (id, patch) => setBlocks(blocks.map(b => b.id === id ? { ...b, ...patch } : b));

  const minutesToLabel = (m) => {
    const hh = Math.floor(m / 60).toString().padStart(2,'0');
    const mm = (m % 60).toString().padStart(2,'0');
    return `${hh}:${mm}`;
  };

  const categoryById = (id) => TIME_CATEGORIES.find(c => c.id === id) || TIME_CATEGORIES.find(c => c.id==='other');
  const distributionToday = useMemo(() => {
    const map = new Map();
    TIME_CATEGORIES.forEach(c => map.set(c.id, 0));
    for (const b of blocks) {
      const dur = Math.max(0, b.endMin - b.startMin);
      map.set(b.category || 'other', (map.get(b.category || 'other') || 0) + dur);
    }
    return map; // minutes per category
  }, [blocks]);

  const wastedMinutesToday = useMemo(() => {
    let total = 0;
    for (const b of blocks) {
      const cat = categoryById(b.category || 'other');
      const dur = Math.max(0, b.endMin - b.startMin);
      const isExcluded = cat.excludeWaste || false; // travel, washroom, sleep, work, etc. marked as exclude
      const lowProductive = (b.prod ?? 5) <= 3;
      const defaultWaste = (!isExcluded) && (['leisure','unplanned','social','other'].includes(cat.id));
      if ((defaultWaste || lowProductive) && !['travel','washroom'].includes(cat.id)) total += dur;
    }
    return total;
  }, [blocks]);

  // History keys need to be defined before any history-based computations
  const historyKeys = useMemo(() => {
    const keys = [];
    const base = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      keys.push(d.toISOString().slice(0,10));
    }
    return keys;
  }, []);

  // Across days arrays (waste & overlays)
  const wasteHistory = historyKeys.map(k => {
    const e = entries[k]; if (!e || !e.timeBlocks) return 0;
    return e.timeBlocks.reduce((acc, b) => {
      const cat = (TIME_CATEGORIES.find(c=>c.id===b.category)||{});
      const dur = Math.max(0, (b.endMin - b.startMin));
      const exclude = cat.excludeWaste;
      const lowProd = (b.prod ?? 5) <= 3;
      const defaultWaste = (!exclude) && (['leisure','unplanned','social','other'].includes(b.category));
      if ((defaultWaste || lowProd) && !['travel','washroom'].includes(b.category)) return acc + dur;
      return acc;
    }, 0);
  });

  const overlayOptions = [
    { id:'productive', label:'Productive Minutes', color:'#198754', series: historyKeys.map(k=>{
      const e = entries[k]; if(!e||!e.timeBlocks) return 0; return e.timeBlocks.reduce((s,b)=> s + ((b.prod??5) >=7 ? (b.endMin-b.startMin):0), 0);
    })},
    { id:'sleep', label:'Sleep', color:'#6c757d', series: historyKeys.map(k=>{ const e=entries[k]; if(!e||!e.timeBlocks) return 0; return e.timeBlocks.filter(b=>b.category==='sleep').reduce((s,b)=>s+(b.endMin-b.startMin),0); })},
    { id:'work', label:'Work', color:'#0d6efd', series: historyKeys.map(k=>{ const e=entries[k]; if(!e||!e.timeBlocks) return 0; return e.timeBlocks.filter(b=>b.category==='work').reduce((s,b)=>s+(b.endMin-b.startMin),0); })},
    { id:'waste', label:'Wasted Minutes', color:'#dc3545', series: wasteHistory },
  ];
  const [overlayShown, setOverlayShown] = useState(overlayOptions.map(o=>o.id));
  const toggleOverlay = (id) => setOverlayShown(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  // Keyboard delete for selected block
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId) {
        deleteBlock(selectedBlockId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedBlockId, deleteBlock]);

  // Save helpers
  const persistEntries = (next) => {
    setEntries(next);
    localStorage.setItem(LS_KEYS.entries, JSON.stringify(next));
  };
  const updateToday = (patch) => {
    const next = { ...entries, [dateKey]: { ...entry, ...patch } };
    persistEntries(next);
  };

  // Habits completion
  const completions = entry.completions || {}; // {habitId: true}
  const doneCountSpiritual = habits.filter(h => (h.spiritual ?? true) && completions[h.id]).length;
  const totalSpiritual = Math.max(1, habits.filter(h=> (h.spiritual ?? true)).length);

  // To-Dos (free tasks)
  const todos = entry.todos || []; // [{id,text,done,due,category,effortMin}]
  const todoDone = todos.filter(t => t.done).length;

  // Scores
  const autoSpirituality = Math.round((doneCountSpiritual / totalSpiritual) * 10);
  const totalEffort = todos.reduce((s,t)=> s + Math.max(0, Number(t.effortMin||0)), 0) || 1;
  const weightedDone = todos.reduce((s,t)=> s + (t.done ? Math.max(0, Number(t.effortMin||0)) : 0), 0);
  const autoProductivity = Math.round((weightedDone / totalEffort) * 10);
  const spirituality = entry.spirituality ?? autoSpirituality;
  const productivity = entry.productivity ?? autoProductivity;
  const mood = entry.mood || { happy: 0, energized: 0, calm: 0, social: 0 }; // -5..+5

  const dayQuote = quotes[0] || '';

  // History arrays (last 30 days)
  const histSpirituality = historyKeys.map(k => entries[k]?.spirituality ?? 0);
  const histProductivity = historyKeys.map(k => entries[k]?.productivity ?? 0);
  const histMoodDelta = historyKeys.map(k => {
    const m = entries[k]?.mood || { happy:0, energized:0, calm:0, social:0 };
    const avg = ([m.happy, m.energized, m.calm, m.social].reduce((a,b)=>a+b,0) / 4);
    return avg; // -5..+5 baseline 0
  });
  // Weights for composite productivity score
  const WEIGHTS = { tasks: 0.45, habits: 0.25, blocks: 0.20, focus: 0.10 };
  // Summary analytics (last 7 days)
  const last7Keys = historyKeys.slice(-7);
  const average = (arr) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  const last7Spirituality = average(last7Keys.map(k => entries[k]?.spirituality ?? 0));
  const last7Productivity = average(last7Keys.map(k => entries[k]?.productivity ?? 0));
  const last7Mood = average(last7Keys.map(k => {
    const m = entries[k]?.mood || { happy:0, energized:0, calm:0, social:0 };
    const vals = [m.happy, m.energized, m.calm, m.social].map(v => ((v + 5) / 10) * 10);
    return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  }));
  const last7HabitCompletionPct = (() => {
    let done = 0, total = 0;
    last7Keys.forEach(k => { const e = entries[k]; if(!e) return; const c = e.completions||{}; done += Object.values(c).filter(Boolean).length; total += habits.length; });
    return total? Math.round((done/total)*100):0;
  })();
  const last7TodoCompletionPct = (() => {
    let done = 0, total = 0;
    last7Keys.forEach(k => { const e = entries[k]; if(!e) return; const t = e.todos||[]; done += t.filter(x=>x.done).length; total += t.length; });
    return total? Math.round((done/total)*100):0;
  })();
  // Composite productivity score (0-100) including time-block productivity
  // Focus hours: manual input or derived from 'work' blocks
  const useTrackerFocus = !!(entry.useTrackerFocus);
  const workBlockMinutes = (entries[dateKey]?.timeBlocks || []).filter(b=>b.category==='work'||b.category==='study').reduce((s,b)=> s + Math.max(0,(b.endMin-b.startMin)), 0);
  const focusHours = useTrackerFocus ? (workBlockMinutes/60) : (entry.focusHoursManual || 0);
  const todaysBlocks = (entries[dateKey]?.timeBlocks) || [];
  const blocksTotalMin = todaysBlocks.reduce((s,b)=> s + Math.max(0,(b.endMin-b.startMin)), 0);
  const blocksAvgProd10 = blocksTotalMin ? (
    todaysBlocks.reduce((s,b)=> s + Math.max(0,(b.endMin-b.startMin)) * ((b.prod ?? 0) + 5), 0) / blocksTotalMin
  ) : 0;
  const tasksPct = (weightedDone/Math.max(1,totalEffort));
  const habitsPct = (doneCountSpiritual/totalSpiritual);
  const blocksPct = (blocksAvgProd10/10);
  const focusPct = Math.min(focusHours/8, 1);
  const productivityScore = Math.round(
    (tasksPct*100)*WEIGHTS.tasks +
    (habitsPct*100)*WEIGHTS.habits +
    (blocksPct*100)*WEIGHTS.blocks +
    (focusPct*100)*WEIGHTS.focus
  );

  // Targeted state snapshot to console for debugging
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[Dashboard] dateKey:', dateKey, 'todos:', todos.length, 'habits:', habits.length, 'blocks:', blocks.length);
  }, [dateKey, todos.length, habits.length, blocks.length]);

  // Quotes are hardcoded: no add/remove UI

  // Habit add/remove/toggle
  const [habitName, setHabitName] = useState('');
  const addHabit = () => {
    const name = habitName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const next = [...habits, { id, label: name }];
    setHabits(next);
    localStorage.setItem(LS_KEYS.tasks, JSON.stringify(next));
    setHabitName('');
  };
  const removeHabit = (id) => {
    const next = habits.filter(h => h.id !== id);
    setHabits(next);
    localStorage.setItem(LS_KEYS.tasks, JSON.stringify(next));
    // also cleanup completions
    const nc = { ...(entry.completions || {}) };
    delete nc[id];
    updateToday({ completions: nc });
  };
  const toggleHabit = (id) => {
    const nc = { ...(entry.completions || {}) };
    nc[id] = !nc[id];
    updateToday({ completions: nc });
  };

  // Todos
  const [todoText, setTodoText] = useState('');
  const [todoDue, setTodoDue] = useState(''); // HH:MM
  const [todoCat, setTodoCat] = useState('work');
  const [todoEffort, setTodoEffort] = useState(30);
  const addTodo = () => {
    const text = todoText.trim();
    if (!text) return;
    const id = crypto.randomUUID();
    const next = [...todos, { id, text, done: false, due: todoDue, category: todoCat, effortMin: Number(todoEffort)||0 }];
    updateToday({ todos: next });
    setTodoText('');
    setTodoDue('');
    setTodoEffort(30);
  };

    // Family stories are hardcoded; no editor UI
    const [familyIndex, setFamilyIndex] = useState(0);
    useEffect(() => {
      if (!family.length) return;
      const id = setInterval(() => setFamilyIndex(i => (i + 1) % family.length), 20000);
      return () => clearInterval(id);
    }, [family]);

    // Reorder helpers
    const moveItem = (list, setList, storageKey, id, dir) => {
      const idx = list.findIndex(x=>x.id===id); if(idx<0) return;
      const target = dir==='up'? idx-1: idx+1;
      if(target<0 || target>=list.length) return;
      const copy=[...list]; const tmp = copy[idx]; copy[idx]=copy[target]; copy[target]=tmp;
      setList(copy); localStorage.setItem(storageKey, JSON.stringify(copy));
    };
    const moveHabit = (id, dir) => moveItem(habits, setHabits, LS_KEYS.tasks, id, dir);

    // Vision dots (20 years)
    const startDate = new Date(visionStart);
    const endDate = new Date(startDate); endDate.setFullYear(startDate.getFullYear() + 20);
    const diffDaysTotal = Math.ceil((endDate - startDate) / 86400000);
    const today = new Date();
    const diffDaysPassed = Math.floor((today - startDate) / 86400000);
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today - yearStart) / 86400000) + 1;
    const daysInYear = (new Date(today.getFullYear(), 11, 31) - yearStart) / 86400000 + 1;
    const yearPct = Math.round((dayOfYear / daysInYear) * 100);
    const visionDots = useMemo(() => {
      // Generate a compact array (limit to first 2000 rendered for performance, but show counts)
      const arr = [];
      for (let i = 0; i < diffDaysTotal; i++) {
        arr.push(i);
      }
      return arr;
    }, [diffDaysTotal]);
  const toggleTodo = (id) => {
    const next = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    updateToday({ todos: next });
  };
  const removeTodo = (id) => {
    const next = todos.filter(t => t.id !== id);
    updateToday({ todos: next });
  };

  // Export / Import
  const onExport = () => {
    const payload = {
      habits, entries, visionStart
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `faseeh-dashboard-${todayKey()}.json`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const fileRef = useRef();
  const onImport = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const txt = await f.text();
      const obj = JSON.parse(txt);
      if (obj.habits) { setHabits(obj.habits); localStorage.setItem(LS_KEYS.tasks, JSON.stringify(obj.habits)); }
      if (obj.entries) { setEntries(obj.entries); localStorage.setItem(LS_KEYS.entries, JSON.stringify(obj.entries)); }
      // photos/defaultTodos removed per request; ignore if present
      if (obj.visionStart) { setVisionStart(obj.visionStart); localStorage.setItem(LS_KEYS.visionStart, obj.visionStart); }
    } catch (err) {
      console.error('Import failed', err);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="bg-overlay" />
      <SeasonalSnow date={now} />
      <div className="container py-4 position-relative">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="fw-bold mb-0">Faseeh Dashboard</h1>
        <div className="text-end">
          <div className="fs-5 fw-semibold">{now.toLocaleTimeString()}</div>
          <div className="text-muted small">{now.toLocaleDateString()}</div>
        </div>
      </div>
      {/* Weekly Summary */}
      <div className="row g-3 mb-3">
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-2">Weekly Summary</h5>
              <div className="row small g-2">
                <div className="col-6 col-md-4"><strong>Avg Spirituality:</strong> {last7Spirituality}/10</div>
                <div className="col-6 col-md-4"><strong>Avg Productivity:</strong> {last7Productivity}/10</div>
                <div className="col-6 col-md-4"><strong>Avg Mood:</strong> {last7Mood}/10</div>
                <div className="col-6 col-md-4"><strong>Habit Complete:</strong> {last7HabitCompletionPct}%</div>
                <div className="col-6 col-md-4"><strong>Task Complete:</strong> {last7TodoCompletionPct}%</div>
                <div className="col-6 col-md-4"><strong>Focus Hours Today:</strong> {focusHours.toFixed(1)}h</div>
                <div className="col-6 col-md-4"><strong>Composite Productivity:</strong> {productivityScore}/100</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Display</h5>
              <button className="btn btn-outline-secondary mb-2" onClick={()=>document.body.classList.toggle('minimal-mode')}>Toggle Minimalistic</button>
              <SeasonalIndicator date={now} />
            </div>
          </div>
        </div>
      </div>

      {/* Top row: Focus Summary and Quote */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Focus Summary</h5>
              <div className="d-flex align-items-center gap-3">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="useTrackerFocus" checked={useTrackerFocus} onChange={(e)=>updateToday({ useTrackerFocus: e.target.checked })} />
                  <label className="form-check-label" htmlFor="useTrackerFocus">Use tracker (work blocks)</label>
                </div>
                {!useTrackerFocus && (
                  <div className="d-flex align-items-center gap-2">
                    <label className="form-label m-0">Hours today</label>
                    <input type="number" step="0.25" min="0" className="form-control" style={{maxWidth:120}} value={entry.focusHoursManual||0} onChange={(e)=>updateToday({ focusHoursManual: Number(e.target.value||0) })} />
                  </div>
                )}
                {useTrackerFocus && <span className="badge bg-primary">From tracker: {(workBlockMinutes/60).toFixed(2)}h</span>}
              </div>
              <div className="text-muted small mt-2">Composite uses this value (manual or from schedule).</div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Today’s Quote</h5>
              <p className="flex-grow-1 fs-6">“{dayQuote}”</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top: Schedule + To-Dos & Today's Breakdown */}
      <div className="row g-3 mb-3">
        <div className="col-lg-8">
          {/* Shabih ur Raza Time Monitor (Vertical Day Schedule) */}
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-baseline justify-content-between mb-2">
                <h5 className="card-title mb-0">Shabih ur Raza Time Monitor</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button className="btn btn-sm btn-outline-primary" onClick={()=>{
                    const now = new Date();
                    const mins = now.getHours()*60 + now.getMinutes();
                    const start = snapMinutes(mins);
                    const id = crypto.randomUUID();
                    const newBlock = { id, startMin: start, endMin: Math.min(1440, start+60), label: 'Startup Work', category: 'work', prod: 0, feeling: '' };
                    setBlocks([...(entry.timeBlocks||[]), newBlock]);
                    setSelectedBlockId(id);
                  }}>+ Startup Work 1h</button>
                  <div className="form-check form-switch m-0">
                    <input className="form-check-input" type="checkbox" id="snap15" checked={snapTo15} onChange={(e)=>setSnapTo15(e.target.checked)} />
                    <label className="form-check-label" htmlFor="snap15">Snap 15m</label>
                  </div>
                  <span className="badge bg-secondary">Wasted: {Math.round(wastedMinutesToday/60)}h {wastedMinutesToday%60}m</span>
                </div>
              </div>
              <div className="day-schedule" ref={scheduleRef} onMouseDown={onScheduleMouseDown}>
                {Array.from({length:25}, (_,i)=> {
                  const hour12 = ((i+11)%12)+1; const ampm = i<12?'AM':'PM';
                  return (
                    <div key={i} className="hour-row" style={{top: `${(i/24)*100}%`}}>
                      <span className="hour-label">{hour12} {ampm}</span>
                    </div>
                  );
                })}
                {blocks.map(b => {
                  const top = (b.startMin/1440)*100;
                  const height = ((b.endMin-b.startMin)/1440)*100;
                  const cat = categoryById(b.category||'other');
                  return (
                    <div key={b.id} className={`vblock ${selectedBlockId===b.id?'selected':''}`} style={{top:`${top}%`, height:`${height}%`, background:cat.color}} onMouseDown={(e)=>onBlockMouseDown(e,b.id)}>
                      <div className="handle top" onMouseDown={(e)=>onHandleMouseDown(e,b.id,'resizeL')} />
                      <div className="label">{b.label}</div>
                      <div className="handle bottom" onMouseDown={(e)=>onHandleMouseDown(e,b.id,'resizeR')} />
                    </div>
                  );
                })}
              </div>
              {selectedBlockId && (()=>{
                const b = blocks.find(x=>x.id===selectedBlockId); if(!b) return null;
                return (
                  <div className="row g-3 mt-3">
                    <div className="col-md-3">
                      <label className="form-label">Label</label>
                      <input className="form-control" value={b.label} onChange={(e)=>updateBlock(b.id,{label:e.target.value})} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Category</label>
                      <select className="form-select" value={b.category} onChange={(e)=>updateBlock(b.id,{category:e.target.value})}>
                        {TIME_CATEGORIES.map(c=> <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Start</label>
                      <input className="form-control" type="time" value={`${String(Math.floor(b.startMin/60)).padStart(2,'0')}:${String(b.startMin%60).padStart(2,'0')}`} onChange={(e)=>{
                        const [hh,mm]=e.target.value.split(':').map(Number); let mins=hh*60+mm; mins = snapMinutes(mins); updateBlock(b.id,{startMin: clamp(mins,0,Math.max(0,b.endMin-5))});
                      }} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">End</label>
                      <input className="form-control" type="time" value={`${String(Math.floor(b.endMin/60)).padStart(2,'0')}:${String(b.endMin%60).padStart(2,'0')}`} onChange={(e)=>{
                        const [hh,mm]=e.target.value.split(':').map(Number); let mins=hh*60+mm; mins = snapMinutes(mins); updateBlock(b.id,{endMin: clamp(mins,Math.min(b.startMin+5,1435),1440)});
                      }} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label d-flex justify-content-between"><span>Productivity</span><strong>{b.prod}</strong></label>
                      <input type="range" min={-5} max={5} value={b.prod} className="form-range" onChange={(e)=>updateBlock(b.id,{prod:Number(e.target.value)})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Feeling/Notes</label>
                      <textarea className="form-control" rows={2} value={b.feeling} onChange={(e)=>updateBlock(b.id,{feeling:e.target.value})} />
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                      <div className="small text-muted">Duration: {minutesToLabel(b.endMin - b.startMin)} (hh:mm)</div>
                      <button className="btn btn-outline-danger" onClick={()=>deleteBlock(b.id)}>Delete Block</button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          {/* To-Dos and Today Breakdown */}
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-baseline justify-content-between">
                <h5 className="card-title mb-0">To‑Dos (Today)</h5>
                <span className="badge bg-success">{todoDone}/{todos.length || 0}</span>
              </div>
              <ul className="list-group list-group-flush mt-3">
                {todos.map(t => {
                  const overdue = t.due && !t.done && (() => {
                    try {
                      const [hh, mm] = t.due.split(':').map(Number);
                      const dueDate = new Date(); dueDate.setHours(hh||0, mm||0, 0, 0);
                      return now > dueDate;
                    } catch { return false; }
                  })();
                  return (
                  <li key={t.id} className={`list-group-item ${overdue ? 'overdue' : ''}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id={`t-${t.id}`} checked={t.done} onChange={() => toggleTodo(t.id)} />
                        <label className="form-check-label" htmlFor={`t-${t.id}`}>{t.text}{t.due && <span className="ms-2 badge bg-secondary">{t.due}</span>}</label>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeTodo(t.id)}>Remove</button>
                    </div>
                    <div className="d-flex gap-2 mt-2 align-items-center small">
                      <select className="form-select form-select-sm" style={{maxWidth: '45%'}} value={t.category||'work'} onChange={(e)=>{
                        const next = todos.map(x=> x.id===t.id? { ...x, category: e.target.value }: x); updateToday({ todos: next });
                      }}>
                        {TIME_CATEGORIES.map(c=> <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                      <input className="form-control form-control-sm" style={{maxWidth:'30%'}} type="number" min="0" step="5" value={t.effortMin||0} onChange={(e)=>{
                        const next = todos.map(x=> x.id===t.id? { ...x, effortMin: Number(e.target.value||0) }: x); updateToday({ todos: next });
                      }} />
                      <span className="text-muted">min</span>
                    </div>
                  </li>
                );})}
              </ul>
              <div className="d-flex gap-2 mt-3">
                <input className="form-control" placeholder="Add task" value={todoText} onChange={(e)=>setTodoText(e.target.value)} />
                <input className="form-control" type="time" value={todoDue} onChange={(e)=>setTodoDue(e.target.value)} />
              </div>
              <div className="d-flex gap-2 mt-2 align-items-center">
                <select className="form-select" style={{maxWidth:'45%'}} value={todoCat} onChange={(e)=>setTodoCat(e.target.value)}>
                  {TIME_CATEGORIES.map(c=> <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <input className="form-control" style={{maxWidth:'30%'}} type="number" min="0" step="5" value={todoEffort} onChange={(e)=>setTodoEffort(e.target.value)} />
                <span className="text-muted small">min</span>
                <button className="btn btn-outline-success ms-auto" onClick={addTodo}>Add</button>
              </div>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="mb-2">Today’s Breakdown</h6>
              <Doughnut data={{
                labels: Array.from(distributionToday.entries()).filter(([,v])=>v>0).map(([cat])=>categoryById(cat).label),
                datasets:[{ data: Array.from(distributionToday.entries()).filter(([,v])=>v>0).map(([,mins])=>mins/60), backgroundColor: Array.from(distributionToday.entries()).filter(([,v])=>v>0).map(([cat])=>categoryById(cat).color) }]
              }} options={{ plugins:{legend:{position:'bottom'}} }} />
            </div>
          </div>
        </div>
          </div>

          {/* Habits */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h5 className="card-title mb-0">Daily Habits</h5>
                    <span className="badge bg-primary">{doneCountSpiritual}/{totalSpiritual}</span>
                  </div>
                  <ul className="list-group list-group-flush mt-3">
                    {habits.map(h => (
                      <li key={h.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id={`h-${h.id}`} checked={!!completions[h.id]} onChange={() => toggleHabit(h.id)} />
                          <label className="form-check-label" htmlFor={`h-${h.id}`}>{h.label}</label>
                        </div>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={()=>moveHabit(h.id,'up')} title="Up">↑</button>
                          <button className="btn btn-outline-secondary" onClick={()=>moveHabit(h.id,'down')} title="Down">↓</button>
                          <button className="btn btn-outline-danger" onClick={() => removeHabit(h.id)} title="Remove">×</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex gap-2 mt-3">
                    <input className="form-control" placeholder="Add habit (e.g., Walk)" value={habitName} onChange={(e)=>setHabitName(e.target.value)} />
                    <button className="btn btn-outline-primary" onClick={addHabit}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Ratings */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Ratings</h5>
              <div className="mb-3">
                <label className="form-label d-flex justify-content-between">
                  <span>Spirituality</span>
                  <strong>{spirituality}/10</strong>
                </label>
                <input type="range" min={0} max={10} value={spirituality} className="form-range" onChange={(e)=>updateToday({ spirituality: Number(e.target.value) })} />
                <div className="form-text">Auto from prayers: {autoSpirituality}/10 (you can override)</div>
              </div>
              <div className="mb-3">
                <label className="form-label d-flex justify-content-between">
                  <span>Productivity</span>
                  <strong>{productivity}/10</strong>
                </label>
                <input type="range" min={0} max={10} value={productivity} className="form-range" onChange={(e)=>updateToday({ productivity: Number(e.target.value) })} />
                <div className="form-text">Auto from to‑dos: {autoProductivity}/10 (you can override)</div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label d-flex justify-content-between"><span>Happy ←→ Depressed</span><strong>{mood.happy}</strong></label>
                  <input type="range" min={-5} max={5} value={mood.happy} className="form-range" onChange={(e)=>updateToday({ mood: { ...mood, happy: Number(e.target.value) } })} />
                </div>
                <div className="col-12">
                  <label className="form-label d-flex justify-content-between"><span>Tired ←→ Energized</span><strong>{mood.energized}</strong></label>
                  <input type="range" min={-5} max={5} value={mood.energized} className="form-range" onChange={(e)=>updateToday({ mood: { ...mood, energized: Number(e.target.value) } })} />
                </div>
                <div className="col-12">
                  <label className="form-label d-flex justify-content-between"><span>Anxious ←→ Calm</span><strong>{mood.calm}</strong></label>
                  <input type="range" min={-5} max={5} value={mood.calm} className="form-range" onChange={(e)=>updateToday({ mood: { ...mood, calm: Number(e.target.value) } })} />
                </div>
                <div className="col-12">
                  <label className="form-label d-flex justify-content-between"><span>Isolated ←→ Social</span><strong>{mood.social}</strong></label>
                  <input type="range" min={-5} max={5} value={mood.social} className="form-range" onChange={(e)=>updateToday({ mood: { ...mood, social: Number(e.target.value) } })} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">History (30 days)</h5>
              <div className="d-flex align-items-center mb-2">
                <span className="badge rounded-pill text-bg-primary">Spirituality</span>
                <MiniLineChart data={histSpirituality} color="#0d6efd" />
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="badge rounded-pill text-bg-success">Productivity</span>
                <MiniLineChart data={histProductivity} color="#198754" />
              </div>
              <div className="d-flex align-items-center">
                <span className="badge rounded-pill text-bg-warning text-dark">Mood</span>
                <MiniLineChart data={histMoodDelta} color="#ffc107" />
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Overlays & Waste History */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h5 className="card-title">Time Analytics (Last 30 Days)</h5>
          <div className="d-flex flex-wrap gap-2 mb-2">
            {overlayOptions.map(opt => (
              <label key={opt.id} className="form-check-label me-2">
                <input type="checkbox" className="form-check-input me-1" checked={overlayShown.includes(opt.id)} onChange={()=>toggleOverlay(opt.id)} />
                <span style={{color:opt.color}}>{opt.label}</span>
              </label>
            ))}
          </div>
          <Line data={{
            labels: historyKeys,
            datasets: overlayOptions.filter(o=>overlayShown.includes(o.id)).map(o=>({ label:o.label, data:o.series.map(v=>v/60), borderColor:o.color, backgroundColor:o.color, tension:0.3 }))
          }} options={{ responsive:true, plugins:{legend:{position:'bottom'}, tooltip:{mode:'index', intersect:false}}, scales:{ x:{ grid:{display:true}}, y:{ title:{display:true, text:'Hours'}, beginAtZero:true, grid:{display:true} } } }} />
          <div className="small text-muted">Units shown in hours per day.</div>
        </div>
      </div>

      {/* Motivation */}
      <div className="row g-3 mb-3">
        <div className="col-md-12">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Motivation</h5>
              {family.length ? (
                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">{family[familyIndex].name} {family[familyIndex].years && <small className="text-muted">({family[familyIndex].years})</small>}</h6>
                  <p className="small mb-0">{family[familyIndex].note || '—'}</p>
                </div>
              ) : <p className="text-muted">Add stories in code (TODAY_FAMILY).</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="row g-3 mb-3">
        <div className="col-md-12">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">20-Year Vision</h5>
              <p className="small mb-1">Start: {visionStart} • Days passed: {diffDaysPassed} / {diffDaysTotal}</p>
              <div className="progress mb-2" style={{height:10}}>
                <div className="progress-bar" style={{width:`${Math.min(100, Math.round((diffDaysPassed/diffDaysTotal)*100))}%`}} />
              </div>
              <p className="small mb-1">Year progress: Day {dayOfYear} / {Math.round(daysInYear)} ({yearPct}%)</p>
              <div className="progress mb-3" style={{height:10}}>
                <div className="progress-bar bg-success" style={{width:`${yearPct}%`}} />
              </div>
              <div className="vision-dots">
                {visionDots.slice(0, 2000).map(i => {
                  const past = i <= diffDaysPassed;
                  const isToday = i === diffDaysPassed;
                  return <div key={i} className={`vdot ${past?'past':''} ${isToday?'today':''}`}/>;
                })}
              </div>
              {visionDots.length > 2000 && <div className="small text-muted mt-2">Showing first 2000 of {visionDots.length} days.</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="card shadow-sm">
        <div className="card-body d-flex flex-wrap gap-2">
          <button className="btn btn-outline-secondary" onClick={onExport}>Export Data</button>
          <label className="btn btn-outline-secondary mb-0">
            Import Data
            <input ref={fileRef} type="file" accept="application/json" className="d-none" onChange={onImport} />
          </label>
        </div>
      </div>
      <div className="small text-muted mt-2">Local-only: load your JSON in morning, export updated in evening.</div>
      </div>
    </div>
  );
}

// Seasonal indicator (text)
function SeasonalIndicator({ date }) {
  const month = date.getMonth();
  const season = month===11||month<=1 ? 'Winter' : month<=4 ? 'Spring' : month<=7 ? 'Summer' : 'Autumn';
  return <div className="small text-muted">Season: {season}</div>;
}

// Snow effect only in winter months
function SeasonalSnow({ date }) {
  const month = date.getMonth();
  const isWinter = month===11 || month<=1;
  const flakes = useMemo(()=> Array.from({length: isWinter? 40:0}, (_,i)=>({
    id:i,
    size: Math.random()*3+2,
    left: Math.random()*100,
    duration: Math.random()*10+8,
    delay: Math.random()*10
  })), [isWinter]);
  if(!isWinter) return null;
  return (
    <div className="snow-layer">
      {flakes.map(f => (
        <span key={f.id} className="flake" style={{
          left: f.left+'%',
          width: f.size,
          height: f.size,
          animationDuration: f.duration+'s',
          animationDelay: f.delay+'s'
        }} />
      ))}
    </div>
  );
}

// Removed custom SVG charts in favor of Chart.js
