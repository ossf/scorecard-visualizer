import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';

const queryClient = new QueryClient()

function App() {  
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
