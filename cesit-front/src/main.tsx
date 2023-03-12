import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { initAuthService } from './services';
import { LocalizationProvider } from '@mui/x-date-pickers';

initAuthService();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </BrowserRouter>
);
