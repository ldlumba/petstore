import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useShopping } from '../AppProviders';

export function AppShell({ children }) {
  const { cartItems, wishlistItems } = useShopping();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(14px)', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit" sx={{ textTransform: 'none' }}>
            <Typography variant="h6" fontWeight={800}>Petstore</Typography>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/cart"
              color="inherit"
              sx={{
                textTransform: 'none',
                p: 1,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="body2">Cart ({cartItems.length})</Typography>
            </Button>
            <Button
              component={RouterLink}
              to="/wishlist"
              color="inherit"
              sx={{
                textTransform: 'none',
                p: 1,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="body2">Wishlist ({wishlistItems.length})</Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
}
