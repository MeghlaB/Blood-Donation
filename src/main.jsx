import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ThemeProvider from './Context/ThemeProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
<ThemeProvider>
 <AuthProvider>

 <React.StrictMode>
    
      {/* Pass the queryClient as a prop to QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    
  </React.StrictMode>
  </AuthProvider>
  </ThemeProvider>
);
