
export function Tabs({ children, className = "" }) {
  return <div className={`w-full ${className}`}>{children}</div>
}

export function TabsList({ children, tabClassName }) {
  return <div className={`flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 ${tabClassName}`}>{children}</div>
}

export function TabTrigger({ isActive, onClick, children, activeClassName, inactiveClassName }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg border transition-colors
        ${
          isActive
            ? `border-primary text-white bg-primary ${activeClassName}`
            : `border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${inactiveClassName}`
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
