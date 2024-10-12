import React, { useState } from 'react';

// Tabs.js - Main Compound Component
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab, setActiveTab }),
  );
};

// Tabs.List - Component to show Tab list
Tabs.List = ({ children, activeTab, setActiveTab }) => (
  <div className="tab-list">
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        isActive: activeTab === index,
        onClick: () => setActiveTab(index),
      }),
    )}
  </div>
);

// Tabs.List.Item - Individual Tab
Tabs.List.Item = ({ isActive, onClick, children }) => (
  <button onClick={onClick} className={`tab-item ${isActive ? 'active' : ''}`}>
    {children}
  </button>
);

// Tabs.Panel - Component to show content based on active tab
Tabs.Panel = ({ children, activeTab, index }) =>
  activeTab === index ? <div className="tab-panel">{children}</div> : null;

// Usage of the Tabs Compound Component
const App = () => (
  <Tabs>
    <Tabs.List>
      <Tabs.List.Item>Tab 1</Tabs.List.Item>
      <Tabs.List.Item>Tab 2</Tabs.List.Item>
      <Tabs.List.Item>Tab 3</Tabs.List.Item>
    </Tabs.List>

    <Tabs.Panel index={0}>Content for Tab 1</Tabs.Panel>
    <Tabs.Panel index={1}>Content for Tab 2</Tabs.Panel>
    <Tabs.Panel index={2}>Content for Tab 3</Tabs.Panel>
  </Tabs>
);

export default App;
