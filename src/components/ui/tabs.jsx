import React, { useState } from "react";

export function Tabs({ children, className = "" }) {
  return <div className={`w-full ${className}`}>{children}</div>
}

export function TabsList({ children, tabClassName }) {
  return <div className={`flex border-b border-gray-200 ${tabClassName}`}>{children}</div>
}

export function TabTrigger({ isActive, onClick, children, activeClassName, inactiveClassName }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm border-b-2 transition-colors
        ${
          isActive
            ? `border-primary text-primary ${activeClassName}`
            : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${inactiveClassName}`
        }`}
    >
      {children}
    </button>
  )
}
export function TabContent({ isActive, children }) {
    if (!isActive) return null
    return <div className="py-4">{children}</div>
  }

export function CustomTab({TABS, activeTab, setActiveTab, children, className, tabClassName, activeClassName, inactiveClassName}) {
  return (
    <div className="space-y-6">
      <Tabs className={className}>
          <TabsList 
            tabClassName={tabClassName}
          >
            {TABS.map((tab) => (
                <TabTrigger
                  activeClassName={activeClassName}
                  inactiveClassName={inactiveClassName}
                  key={tab.value}
                  isActive={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </TabTrigger>
            ))}
          </TabsList>
          {TABS.map((tab) => (
              <TabContent key={tab.value} isActive={activeTab === tab.value}>
                  {children}
              </TabContent>
          ))}
      </Tabs>
  </div>
  );
}
