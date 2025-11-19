import { useEffect, useState } from 'react';
// import browser from 'webextension-polyfill';

export default function OptionsApp() {
  const [name, setName] = useState('');

  useEffect(() => {
    // browser.storage.sync.get({ name: '' });
  }, []);

  const save = () => {
    // browser.storage.sync.set({ name });
  };

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ margin: 0 }}>Options</h3>
      <label>
        名称：
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='输入名称'
          style={{ marginLeft: 6 }}
        />
      </label>
      <button onClick={save} style={{ marginTop: 8 }}>
        保存
      </button>
    </div>
  );
}
