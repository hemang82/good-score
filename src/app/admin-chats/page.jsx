"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AdminChatsPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Check for stored passcode on mount
  useEffect(() => {
    const storedPasscode = sessionStorage.getItem('upscore_admin_passcode');
    if (storedPasscode) {
      verifyAndFetch(storedPasscode);
    }
  }, []);

  const verifyAndFetch = async (codeToVerify) => {
    setVerifying(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/chats?passcode=${encodeURIComponent(codeToVerify)}`);
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
        setIsAuthenticated(true);
        sessionStorage.setItem('upscore_admin_passcode', codeToVerify);
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.error || 'Invalid passcode or database configuration issue.');
        setIsAuthenticated(false);
        sessionStorage.removeItem('upscore_admin_passcode');
      }
    } catch (err) {
      setError('Network error. Failed to connect to server.');
    } finally {
      setVerifying(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('upscore_admin_passcode');
    setIsAuthenticated(false);
    setSessions([]);
    setActiveSessionId(null);
    setPasscode('');
  };

  const handleRefresh = () => {
    const storedPasscode = sessionStorage.getItem('upscore_admin_passcode');
    if (storedPasscode) {
      verifyAndFetch(storedPasscode);
    }
  };

  const activeSession = sessions.find(s => s.session_id === activeSessionId);

  // Formatter helper for dates
  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return isoString;
    }
  };

  // Lock screen view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-premium p-6 sm:p-8 shadow-premium border border-border-light">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark-green text-sm font-black mx-auto mb-3">
              US
            </div>
            <h1 className="text-xl font-bold text-dark-green">UPSCORE</h1>
            <p className="text-xs text-text-secondary mt-1">Admin Conversation Dashboard</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border-light rounded-xl outline-none focus:border-dark-green text-center text-lg tracking-widest"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 p-2.5 rounded-lg text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={verifying}
              className="w-full bg-dark-green text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-secondary-green transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {verifying ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Verifying...
                </>
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="h-screen bg-bg-light flex flex-col font-sans overflow-hidden">
      {/* Navigation Header */}
      <header className="bg-white border-b border-border-light px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-dark-green text-xs font-black">
            US
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-dark-green leading-tight">
              UPSCORE Support Console
            </h1>
            <p className="text-[10px] text-text-secondary">
              Chatbot Sessions Backup Logs ({sessions.length})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={verifying}
            className="p-2 border border-border-light hover:border-dark-green rounded-lg text-text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold bg-white cursor-pointer"
            title="Refresh logs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${verifying ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="p-2 border border-red-200 hover:bg-red-50 rounded-lg text-red-600 transition-colors flex items-center gap-1.5 text-xs font-semibold bg-white cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Conversations List */}
        <aside className={`w-full md:w-96 border-r border-border-light h-full overflow-y-auto bg-white flex flex-col ${activeSessionId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3.5 border-b border-border-light bg-bg-light font-bold text-xs text-text-secondary uppercase tracking-wider shrink-0">
            Active Chat Sessions ({sessions.length})
          </div>
          
          <div className="flex-1 divide-y divide-border-light overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="p-8 text-center text-text-secondary text-sm">
                No chat logs found in database.
              </div>
            ) : (
              sessions.map((session) => {
                const messagesList = session.messages || [];
                const lastMsg = messagesList[messagesList.length - 1];
                const lastMsgText = lastMsg ? lastMsg.content : 'Empty session';
                const isActive = session.session_id === activeSessionId;

                return (
                  <div
                    key={session.session_id}
                    onClick={() => setActiveSessionId(session.session_id)}
                    className={`p-4 transition-all cursor-pointer border-l-4 ${
                      isActive
                        ? 'bg-primary/10 border-dark-green'
                        : 'hover:bg-bg-light border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="font-bold text-xs text-dark-green truncate max-w-[180px]" title={session.session_id}>
                        {session.session_id.replace('session_', '')}
                      </span>
                      <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">
                        {formatDate(session.created_at)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-text-secondary truncate pr-2 mb-2">
                      {lastMsgText}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-text-secondary">
                      <span className="bg-bg-light border border-border-light px-1.5 py-0.5 rounded font-bold">
                        {messagesList.length} Messages
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Panel: Selected Chat Messages Viewer */}
        <section className={`flex-1 flex flex-col h-full bg-bg-light ${activeSessionId ? 'flex' : 'hidden md:flex'}`}>
          {activeSession ? (
            <>
              {/* Active Conversation Header */}
              <div className="bg-white px-4 py-3 border-b border-border-light flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-2 overflow-hidden">
                  <button
                    onClick={() => setActiveSessionId(null)}
                    className="md:hidden p-1.5 hover:bg-bg-light rounded-lg mr-1 text-dark-green cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-xs sm:text-sm text-dark-green truncate" title={activeSession.session_id}>
                      Session: {activeSession.session_id}
                    </h3>
                    <p className="text-[10px] text-text-secondary">
                      Last active: {formatDate(activeSession.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(activeSession.messages || []).map((msg, index) => {
                  const isUser = msg.role === 'user';
                  
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-xl px-4 py-3 text-xs sm:text-sm shadow-sm ${
                          isUser
                            ? 'bg-dark-green text-white rounded-br-none'
                            : 'bg-white text-text-primary border border-border-light rounded-bl-none'
                        }`}
                      >
                        <div className="font-bold text-[10px] mb-1 opacity-70 uppercase tracking-wider">
                          {isUser ? 'User' : 'UPSCORE Assistant'}
                        </div>
                        
                        <div className="prose prose-sm prose-invert max-w-none break-words">
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          ) : (
                            <ReactMarkdown
                              components={{
                                p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-0.5" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-0.5" {...props} />,
                                li: ({node, ...props}) => <li className="pl-0" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-extrabold text-primary" {...props} />
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-bg-light">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-premium border border-border-light mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-text-primary">No Active Conversation</h3>
              <p className="text-xs text-text-secondary max-w-xs mt-1">
                Select a chat session from the left sidebar list to inspect the complete user dialog transcripts.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
