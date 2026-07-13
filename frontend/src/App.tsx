import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PageTransition } from './components/layout/PageTransition';

// Import Pages
import { Landing } from './pages/Landing';
import { Scanner } from './pages/Scanner';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Chat } from './pages/Chat';
import { ReviewQueue } from './pages/ReviewQueue';
import { Learn } from './pages/Learn';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <Landing />
              </PageTransition>
            }
          />
          <Route
            path="/scan"
            element={
              <PageTransition>
                <Scanner />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />
          <Route
            path="/history"
            element={
              <PageTransition>
                <History />
              </PageTransition>
            }
          />
          <Route
            path="/chat"
            element={
              <PageTransition>
                <Chat />
              </PageTransition>
            }
          />
          <Route
            path="/admin/review"
            element={
              <PageTransition>
                <ReviewQueue />
              </PageTransition>
            }
          />
          <Route
            path="/learn"
            element={
              <PageTransition>
                <Learn />
              </PageTransition>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
