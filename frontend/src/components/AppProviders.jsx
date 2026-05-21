import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readCart, saveCart } from '../features/cart/cartStorage';
import { readWishlist, saveWishlist } from '../features/wishlist/wishlistStorage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e5e7eb',
      contrastText: '#09090b'
    },
    secondary: {
      main: '#ef4444',
      contrastText: '#ffffff'
    },
    success: {
      main: '#22c55e'
    },
    warning: {
      main: '#f59e0b'
    },
    error: {
      main: '#ef4444'
    },
    background: {
      default: '#09090b',
      paper: '#18181b'
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa'
    },
    divider: 'rgba(255,255,255,0.1)',
    action: {
      hover: 'rgba(255,255,255,0.08)',
      selected: 'rgba(255,255,255,0.12)',
      disabledBackground: '#27272a',
      disabled: '#71717a'
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(9, 9, 11, 0.88)',
          color: '#f4f4f5'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#18181b',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 18px 50px rgba(0,0,0,0.35)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#18181b'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700
        }
      }
    }
  }
});

const ShoppingContext = createContext(null);

export function AppProviders({ children }) {
  const [cartItems, setCartItems] = useState(() => readCart());
  const [wishlistItems, setWishlistItems] = useState(() => readWishlist());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveWishlist(wishlistItems);
  }, [wishlistItems]);

  const value = useMemo(() => ({
    cartItems,
    wishlistItems,
    addToCart(pet) {
      setCartItems((current) => current.some((item) => item.id === pet.id) ? current : [...current, pet]);
    },
    removeFromCart(id) {
      setCartItems((current) => current.filter((item) => item.id !== id));
    },
    addToWishlist(pet) {
      setWishlistItems((current) => current.some((item) => item.id === pet.id) ? current : [...current, pet]);
    },
    removeFromWishlist(id) {
      setWishlistItems((current) => current.filter((item) => item.id !== id));
    }
  }), [cartItems, wishlistItems]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>
    </ThemeProvider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within AppProviders');
  }
  return context;
}
