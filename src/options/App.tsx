import React, { useEffect, useState } from 'react';

export default function OptionsApp() {
  const [name, setName] = useState('');

  useEffect(() => {
    chrome.storage.sync.get({ name: '' }, (res) => setName(res.name));
  }, []);

  const save = () => {
    chrome.storage.sync.set({ name });
  };

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ margin: 0 }}>Options</h3>
      <label>
        名称：
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名称"
          style={{ marginLeft: 6 }}
        />
      </label>
      <button onClick={save} style={{ marginTop: 8 }}>保存</button>
    </div>
  );
}


