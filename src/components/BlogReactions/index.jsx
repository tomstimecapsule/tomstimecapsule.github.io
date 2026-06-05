import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { firestore } from '@site/src/firebase/firebase';
import styles from './styles.module.css';

// The set of reactions offered on every post.
const REACTIONS = ['🫶', '🙏', '👏', '📸', '👌', '🙌'];
const LS_PREFIX = 'ttc-reactions-';

function readLocal(slug) {
  try {
    return JSON.parse(localStorage.getItem(LS_PREFIX + slug) || '{}');
  } catch {
    return {};
  }
}

function writeLocal(slug, state) {
  try {
    localStorage.setItem(LS_PREFIX + slug, JSON.stringify(state));
  } catch {
    /* localStorage unavailable (private mode) — counts still work, just no memory */
  }
}

export default function BlogReactions({ slug }) {
  // Live counts from Firestore, keyed by emoji.
  const [counts, setCounts] = useState({});
  // Which reactions THIS browser has toggled on (from localStorage).
  const [mine, setMine] = useState({});

  useEffect(() => {
    setMine(readLocal(slug));
    const ref = doc(firestore, 'reactions', slug);
    // Real-time subscription: updates the moment anyone reacts.
    const unsubscribe = onSnapshot(ref, (snap) => {
      setCounts(snap.exists() ? snap.data() : {});
    });
    return unsubscribe;
  }, [slug]);

  async function toggle(emoji) {
    const active = !!mine[emoji];
    const delta = active ? -1 : 1;

    // Optimistic local update so the UI feels instant.
    const nextMine = { ...mine, [emoji]: !active };
    setMine(nextMine);
    writeLocal(slug, nextMine);
    setCounts((c) => ({ ...c, [emoji]: Math.max(0, (c[emoji] || 0) + delta) }));

    try {
      await setDoc(
        doc(firestore, 'reactions', slug),
        { [emoji]: increment(delta) },
        { merge: true },
      );
    } catch (e) {
      // Roll back the local toggle if the write failed.
      const reverted = { ...nextMine, [emoji]: active };
      setMine(reverted);
      writeLocal(slug, reverted);
    }
  }

  return (
    <div className={styles.reactions}>
      {REACTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={clsx(styles.reaction, mine[emoji] && styles.active)}
          onClick={() => toggle(emoji)}
          aria-pressed={!!mine[emoji]}
          aria-label={`React with ${emoji}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.count}>{counts[emoji] || 0}</span>
        </button>
      ))}
    </div>
  );
}
