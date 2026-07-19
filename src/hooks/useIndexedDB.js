function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('arb_hero', 2);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      if (!db.objectStoreNames.contains('tiles')) db.createObjectStore('tiles');
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

export function dbGet(k) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readonly');
    const rq = tx.objectStore('kv').get(k);
    rq.onsuccess = () => res(rq.result || null);
    rq.onerror = () => rej(rq.error);
  }));
}

export function dbPut(k, v) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite');
    tx.objectStore('kv').put(v, k);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  }));
}

export function dbDelete(storeName, k) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(k);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  }));
}

export function dbPut2(storeName, k, v) {
  return openDB().then(db => new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(v, k);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  }));
}

export function tilesGetAll() {
  return openDB().then(db => new Promise(res => {
    const tx = db.transaction('tiles', 'readonly');
    const store = tx.objectStore('tiles');
    const keysRq = store.getAllKeys();
    const valsRq = store.getAll();
    tx.oncomplete = () => {
      const out = {};
      const keys = keysRq.result || [];
      const vals = valsRq.result || [];
      keys.forEach((k, i) => { out[k] = vals[i]; });
      res(out);
    };
    tx.onerror = () => res({});
  }));
}
